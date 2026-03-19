import type { APIRoute } from "astro";
import { supabase, isDemoMode } from "@lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { recipientId } = body as { recipientId: string };

    if (!recipientId) {
      return new Response(JSON.stringify({ error: "recipientId مطلوب" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (isDemoMode) {
      return new Response(
        JSON.stringify({ success: true, demo: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data: recipient, error: fetchError } = await supabase!
      .from("eid_recipients")
      .select("id, name, message, opened")
      .eq("id", recipientId)
      .single();

    if (fetchError || !recipient) {
      return new Response(JSON.stringify({ error: "البطاقة غير موجودة" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (recipient.opened) {
      return new Response(
        JSON.stringify({ success: true, already: true, name: recipient.name, message: recipient.message }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const { error: updateError } = await supabase!
      .from("eid_recipients")
      .update({ opened: true, opened_at: new Date().toISOString() })
      .eq("id", recipientId);

    if (updateError) {
      console.error("Open recipient error:", updateError);
      return new Response(
        JSON.stringify({ error: "حدث خطأ أثناء فتح البطاقة" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, already: false, name: recipient.name, message: recipient.message }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Open EID card error:", err);
    return new Response(JSON.stringify({ error: "حدث خطأ غير متوقع" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
