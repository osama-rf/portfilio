import type { APIRoute } from "astro";
import { supabase, isDemoMode } from "@lib/supabase";
import { getRandomCoupon } from "@lib/coupons";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { displayName, names } = body as {
      displayName: string;
      names: string[];
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
    const recipientsWithCoupons = await Promise.all(
      names
        .map((n) => n.trim())
        .filter(Boolean)
        .map(async (name) => {
          const coupon = await getRandomCoupon();
          return { name, ...coupon };
        })
    );

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
    const { data: creator, error: creatorError } = await supabase!
      .from("eid_creators")
      .insert({ display_name: displayName.trim() })
      .select("id")
      .single();

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
