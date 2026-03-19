import type { APIRoute } from "astro";
import { supabase, isDemoMode } from "@lib/supabase";

const DEFAULT_MESSAGE =
  "عيدك مبارك وكل عام وأنت بخير، أسأل الله أن يديم علينا وعليك نعمة الصحة والعافية ويعيدنا وإياك بكل خير ✨";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { displayName, entries } = body as {
      displayName: string;
      entries: { name: string; message?: string }[];
    };

    if (!displayName?.trim()) {
      return new Response(JSON.stringify({ error: "الاسم مطلوب" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!Array.isArray(entries) || entries.length === 0) {
      return new Response(
        JSON.stringify({ error: "يجب إضافة مستلم واحد على الأقل" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const creatorName = displayName.trim();
    const normalize = (v: string) => v.trim().toLowerCase();

    // Ensure creator has their own card
    const prepared = entries
      .map((e) => ({ name: e.name.trim(), message: (e.message || "").trim() || DEFAULT_MESSAGE }))
      .filter((e) => e.name);

    if (!prepared.some((e) => normalize(e.name) === normalize(creatorName))) {
      prepared.unshift({ name: creatorName, message: DEFAULT_MESSAGE });
    }

    if (prepared.length > 50) {
      return new Response(
        JSON.stringify({ error: "الحد الأقصى 50 مستلماً (شاملاً اسمك)" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── DEMO MODE ────────────────────────────────────────────────────────────
    if (isDemoMode) {
      const batchId = crypto.randomUUID();
      const recipients = prepared.map((r) => ({
        id: crypto.randomUUID(),
        name: r.name,
        message: r.message,
        opened: false,
      }));

      return new Response(
        JSON.stringify({ success: true, batchId, displayName: creatorName, recipients, demo: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // ── SUPABASE MODE ────────────────────────────────────────────────────────
    const { data: creator, error: creatorError } = await supabase!
      .from("eid_creators")
      .insert({ display_name: creatorName })
      .select("id")
      .single();

    if (creatorError || !creator) {
      console.error("Creator insert error:", creatorError);
      return new Response(
        JSON.stringify({ error: "حدث خطأ، حاول مرة أخرى" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data: recipients, error: recipientsError } = await supabase!
      .from("eid_recipients")
      .insert(
        prepared.map((r) => ({
          creator_id: creator.id,
          name: r.name,
          message: r.message,
        }))
      )
      .select("id, name, message, opened");

    if (recipientsError || !recipients) {
      console.error("Recipients insert error:", recipientsError);
      return new Response(
        JSON.stringify({ error: "حدث خطأ أثناء إنشاء البطاقات" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, batchId: creator.id, displayName: creatorName, recipients, demo: false }),
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
