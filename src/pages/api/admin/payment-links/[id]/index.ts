import type { APIRoute } from "astro";
import { supabaseAdmin } from "@lib/supabase-admin";

export const PATCH: APIRoute = async ({ params, request }) => {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id } = params;
  const { client_name, client_phone } = await request.json();

  if (!client_name?.trim()) {
    return new Response(JSON.stringify({ error: "Client name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error } = await supabaseAdmin
    .from("payment_links")
    .update({
      client_name: client_name.trim(),
      client_phone: client_phone?.trim() || null,
    })
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: "Failed to update payment link" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id } = params;

  const { error } = await supabaseAdmin.from("payment_links").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: "Failed to delete payment link" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
