import type { APIRoute } from "astro";
import { supabase, isDemoMode } from "@lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { batchId, paymentId } = body as { batchId?: string; paymentId?: string };

    if (!batchId || !paymentId) {
      return new Response(JSON.stringify({ error: "batchId و paymentId مطلوبان" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (isDemoMode) {
      return new Response(JSON.stringify({ success: true, demo: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const moyasarSecret = import.meta.env.MOYASAR_SECRET;
    if (!moyasarSecret) {
      return new Response(JSON.stringify({ error: "إعدادات الدفع غير مكتملة" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: creator, error: creatorError } = await supabase!
      .from("eid_creators")
      .select("id, payment_id")
      .eq("id", batchId)
      .single();

    if (creatorError || !creator) {
      return new Response(JSON.stringify({ error: "الرابط غير صالح" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (creator.payment_id) {
      return new Response(JSON.stringify({ success: true, already: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const auth = `Basic ${Buffer.from(`${moyasarSecret}:`).toString("base64")}`;
    const payRes = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
      headers: { Authorization: auth },
    });
    const payData = await payRes.json().catch(() => ({} as { status?: string; amount?: number; id?: string }));

    if (!payRes.ok) {
      return new Response(JSON.stringify({ error: "تعذر التحقق من عملية الدفع" }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }

    const status = String(payData.status || "").toLowerCase();
    if (status !== "paid") {
      return new Response(JSON.stringify({ error: "عملية الدفع غير مكتملة" }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }

    if ((payData.amount ?? 0) < 500) {
      return new Response(JSON.stringify({ error: "المبلغ المدفوع غير صحيح" }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { error: updateError } = await supabase!
      .from("eid_creators")
      .update({ payment_id: paymentId })
      .eq("id", batchId)
      .is("payment_id", null);

    if (updateError) {
      console.error("Activate payment update error:", updateError);
      return new Response(JSON.stringify({ error: "تعذر تفعيل الهدايا" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Activate EID payment error:", err);
    return new Response(JSON.stringify({ error: "حدث خطأ غير متوقع" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
