import type { APIRoute } from "astro";
import { supabaseAdmin } from "@lib/supabase-admin";
import { getAppUrl } from "@lib/site-url";

export const POST: APIRoute = async ({ request }) => {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const {
    title,
    description,
    client_name,
    client_phone,
    amount,
    currency,
    moyasar_enabled,
    tamara_enabled,
  } = body;

  if (!title?.trim()) {
    return new Response(JSON.stringify({ error: "Title is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return new Response(JSON.stringify({ error: "Amount must be a positive number" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!moyasar_enabled && !tamara_enabled) {
    return new Response(JSON.stringify({ error: "Enable at least one payment method" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (tamara_enabled && !client_phone?.trim()) {
    return new Response(
      JSON.stringify({ error: "Client phone number is required when Tamara is enabled" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("payment_links")
    .insert({
      title: title.trim(),
      description: description?.trim() || null,
      client_name: client_name?.trim() || null,
      client_phone: client_phone?.trim() || null,
      amount: numericAmount.toFixed(2),
      currency: (currency || "SAR").toUpperCase(),
      moyasar_enabled: !!moyasar_enabled,
      tamara_enabled: !!tamara_enabled,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Create payment link error:", error);
    return new Response(JSON.stringify({ error: "Failed to create payment link" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ id: data.id, url: `${getAppUrl()}/pay/${data.id}` }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
