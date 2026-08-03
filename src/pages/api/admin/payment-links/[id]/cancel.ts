import type { APIRoute } from "astro";
import { supabaseAdmin } from "@lib/supabase-admin";

export const POST: APIRoute = async ({ params }) => {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id } = params;

  const { error } = await supabaseAdmin
    .from("payment_links")
    .update({ status: "cancelled" })
    .eq("id", id)
    .eq("status", "pending");

  if (error) {
    return new Response(JSON.stringify({ error: "Failed to cancel payment link" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
