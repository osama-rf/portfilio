import type { APIRoute } from "astro";
import { supabaseAdmin } from "@lib/supabase-admin";

export const GET: APIRoute = async ({ url }) => {
  const linkId = url.searchParams.get("link");

  if (!linkId || !supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Missing link or Supabase not configured" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabaseAdmin
    .from("payment_links")
    .select("status")
    .eq("id", linkId)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ status: data.status }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
