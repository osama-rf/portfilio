import type { APIRoute } from "astro";
import { supabaseAdmin } from "@lib/supabase-admin";

const MOYASAR_SECRET = import.meta.env.MOYASAR_SECRET;

export const GET: APIRoute = async ({ url }) => {
  const paymentId = url.searchParams.get("id");
  const linkId = url.searchParams.get("link");

  if (!paymentId || !linkId) {
    return new Response(JSON.stringify({ error: "Missing id or link" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: link, error: linkError } = await supabaseAdmin
    .from("payment_links")
    .select("id, amount, currency, status")
    .eq("id", linkId)
    .single();

  if (linkError || !link) {
    return new Response(JSON.stringify({ error: "Payment link not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (link.status === "paid") {
    return new Response(JSON.stringify({ verified: true, alreadyPaid: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resp = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${MOYASAR_SECRET}:`).toString("base64")}`,
    },
  });

  const paymentDetails = await resp.json();

  if (!resp.ok || paymentDetails.status !== "paid") {
    return new Response(JSON.stringify({ verified: false, error: "Payment not valid or not paid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Amount is admin-defined here (not server-computed from a cart), so we must
  // check the gateway's captured amount matches the link's amount exactly to
  // prevent a client paying less than requested and still marking as paid.
  const expectedMinorUnits = Math.round(Number(link.amount) * 100);
  if (paymentDetails.amount !== expectedMinorUnits || paymentDetails.currency !== link.currency) {
    return new Response(JSON.stringify({ verified: false, error: "Amount mismatch" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error: updateError } = await supabaseAdmin
    .from("payment_links")
    .update({
      status: "paid",
      payment_gateway: "moyasar",
      gateway_payment_id: paymentId,
      paid_at: new Date().toISOString(),
    })
    .eq("id", linkId)
    .eq("status", "pending");

  if (updateError) {
    console.error("Failed to update payment link after Moyasar verify:", updateError);
  }

  await supabaseAdmin.from("payment_events").insert({
    payment_link_id: linkId,
    gateway: "moyasar",
    raw_payload: paymentDetails,
  });

  return new Response(JSON.stringify({ verified: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
