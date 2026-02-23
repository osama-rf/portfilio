import type { APIRoute } from "astro";
import { supabase, isDemoMode } from "@lib/supabase";
import { getRandomCoupon } from "@lib/coupons";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { displayName, names, paymentId } = body as {
      displayName: string;
      names: string[];
      paymentId?: string;
    };

    // Validate input
    if (!displayName?.trim()) {
      return new Response(JSON.stringify({ error: "الاسم مطلوب" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!Array.isArray(names) || names.length === 0) {
      return new Response(
        JSON.stringify({ error: "يجب إضافة مستلم واحد على الأقل" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (names.length > 50) {
      return new Response(
        JSON.stringify({ error: "الحد الأقصى 50 مستلماً" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Assign random coupons to each recipient
    const recipientsWithCoupons = names
      .map((n) => n.trim())
      .filter(Boolean)
      .map((name) => {
        const coupon = getRandomCoupon();
        return { name, ...coupon };
      });

    let hasPaymentIdColumn = true;

    // ── PAYMENT VERIFICATION (optional) ──────────────────────────────────────
    const moyasarSecret = import.meta.env.MOYASAR_SECRET;
    if (moyasarSecret && !isDemoMode && paymentId) {
      // Verify with Moyasar API (with short retries to avoid callback race)
      let payData: { status?: string; amount?: number; id?: string } = {};
      let lastHttpStatus = 0;
      try {
        const auth = `Basic ${Buffer.from(`${moyasarSecret}:`).toString("base64")}`;
        const terminalStatuses = new Set(["paid", "failed"]);
        const acceptedSuccessStatuses = new Set(["paid"]);

        for (let attempt = 0; attempt < 6; attempt++) {
          const payRes = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
            headers: { Authorization: auth },
          });

          lastHttpStatus = payRes.status;
          const parsed = await payRes.json().catch(() => ({}));
          payData = parsed || {};

          // Config issue or wrong account keys.
          if (payRes.status === 401 || payRes.status === 403) {
            return new Response(
              JSON.stringify({ error: "إعدادات الدفع غير صحيحة في الخادم (Moyasar Secret)" }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

          // Payment id not found in this Moyasar account.
          if (payRes.status === 404) {
            return new Response(
              JSON.stringify({ error: "عملية الدفع غير موجودة أو تتبع حساب Moyasar مختلف" }),
              { status: 402, headers: { "Content-Type": "application/json" } }
            );
          }

          const payStatus = String(payData.status || "").toLowerCase();
          if (payRes.ok && acceptedSuccessStatuses.has(payStatus)) break;

          // Stop early for final non-paid states.
          if (terminalStatuses.has(payStatus)) {
            return new Response(
              JSON.stringify({ error: "لم يتم الدفع أو العملية غير مكتملة" }),
              { status: 402, headers: { "Content-Type": "application/json" } }
            );
          }

          // Wait 1s and retry (payment can still be processing right after redirect).
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        if (String(payData.status || "").toLowerCase() !== "paid") {
          return new Response(
            JSON.stringify({ error: "تم استلام الدفع لكن حالته لم تكتمل بعد، أعد المحاولة خلال ثوانٍ" }),
            { status: 402, headers: { "Content-Type": "application/json" } }
          );
        }

        if ((payData.amount ?? 0) < 500) {
          return new Response(
            JSON.stringify({ error: "المبلغ المدفوع غير صحيح" }),
            { status: 402, headers: { "Content-Type": "application/json" } }
          );
        }
      } catch (err) {
        console.error("Moyasar verification error:", err);
        return new Response(
          JSON.stringify({ error: "تعذر التحقق من الدفع، حاول مرة أخرى" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      if (String(payData.id || "") !== String(paymentId)) {
        console.warn("Moyasar payment id mismatch", {
          requestPaymentId: paymentId,
          returnedPaymentId: payData.id,
          httpStatus: lastHttpStatus,
        });
      }

      // Prevent reusing the same payment twice
      try {
        const { data: usedPayment, error: usedPaymentError } = await supabase!
          .from("eid_creators")
          .select("id")
          .eq("payment_id", paymentId)
          .maybeSingle();

        if (usedPaymentError) {
          const missingPaymentCol =
            usedPaymentError.code === "PGRST204" &&
            String(usedPaymentError.message || "").includes("payment_id");
          if (missingPaymentCol) {
            hasPaymentIdColumn = false;
            console.warn("payment_id column missing in eid_creators; duplicate-payment guard disabled");
          } else {
            throw usedPaymentError;
          }
        }

        if (usedPayment) {
          return new Response(
            JSON.stringify({ error: "تم استخدام هذه العملية من قبل" }),
            { status: 409, headers: { "Content-Type": "application/json" } }
          );
        }
      } catch (checkErr) {
        console.error("Payment reuse check error:", checkErr);
        return new Response(
          JSON.stringify({ error: "تعذر التحقق من العملية، حاول مرة أخرى" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // ── DEMO MODE (no Supabase configured) ──────────────────────────────────
    if (isDemoMode) {
      const batchId = crypto.randomUUID();
      const recipients = recipientsWithCoupons.map((r) => ({
        id: crypto.randomUUID(),
        name: r.name,
        coupon_code: r.code,
        coupon_type: r.type,
        coupon_description: r.description,
        opened: false,
      }));

      return new Response(
        JSON.stringify({
          success: true,
          batchId,
          displayName: displayName.trim(),
          recipients,
          demo: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── SUPABASE MODE ────────────────────────────────────────────────────────
    // Step 1: Create the creator batch
    let creator: { id: string } | null = null;
    let creatorError: { code?: string; message?: string } | null = null;

    ({ data: creator, error: creatorError } = await supabase!
      .from("eid_creators")
      .insert(
        hasPaymentIdColumn
          ? { display_name: displayName.trim(), payment_id: paymentId || null }
          : { display_name: displayName.trim() }
      )
      .select("id")
      .single());

    if (creatorError) {
      const missingPaymentCol =
        creatorError.code === "PGRST204" &&
        String(creatorError.message || "").includes("payment_id");

      if (missingPaymentCol) {
        hasPaymentIdColumn = false;
        ({ data: creator, error: creatorError } = await supabase!
          .from("eid_creators")
          .insert({ display_name: displayName.trim() })
          .select("id")
          .single());
      }
    }

    if (creatorError || !creator) {
      console.error("Creator insert error:", creatorError);
      return new Response(
        JSON.stringify({ error: "حدث خطأ، حاول مرة أخرى" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // // PAYMENT HOOK: charge the creator here before inserting recipients
    // // e.g. verify payment intent, check subscription, etc.
    // // const paid = await verifyPayment(creator.id);
    // // if (!paid) return 402 response

    // Step 2: Insert all recipients
    const { data: recipients, error: recipientsError } = await supabase!
      .from("eid_recipients")
      .insert(
        recipientsWithCoupons.map((r) => ({
          creator_id: creator.id,
          name: r.name,
          coupon_code: r.code,
          coupon_type: r.type,
          coupon_description: r.description,
        }))
      )
      .select("id, name, coupon_code, coupon_type, coupon_description, opened");

    if (recipientsError || !recipients) {
      console.error("Recipients insert error:", recipientsError);
      return new Response(
        JSON.stringify({ error: "حدث خطأ أثناء إنشاء البطاقات" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        batchId: creator.id,
        displayName: displayName.trim(),
        recipients,
        demo: false,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Create EID batch error:", err);
    return new Response(JSON.stringify({ error: "حدث خطأ غير متوقع" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
