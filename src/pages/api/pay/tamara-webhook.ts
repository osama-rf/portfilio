import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@lib/supabase-admin";

export const prerender = false;

const NOTIF_SECRET = import.meta.env.TAMARA_NOTIFICATION_SECRET;
const TAMARA_API = import.meta.env.TAMARA_API_URL;
const TAMARA_TOKEN = import.meta.env.TAMARA_API_TOKEN;

async function authoriseOrder(orderId: string) {
  try {
    const resp = await fetch(`${TAMARA_API}/orders/${orderId}/authorise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TAMARA_TOKEN}`,
      },
    });
    if (!resp.ok) {
      console.error("Tamara authorise failed:", await resp.text().catch(() => ""));
    }
  } catch (err) {
    console.error("Tamara authorise request failed:", err);
  }
}

export const POST: APIRoute = async ({ request, url }) => {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let linkId: string;
  try {
    const token = (url.searchParams.get("token") || "").trim();
    if (!token) throw new Error("Missing token");
    const decoded = jwt.verify(token, NOTIF_SECRET, { algorithms: ["HS256"] }) as { linkId: string };
    linkId = decoded.linkId;
  } catch (err) {
    console.error("Tamara webhook token invalid:", err);
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const { order_id: paymentId, order_status, status } = body;
  const normalizedStatus = (order_status || status || "").toLowerCase();

  await supabaseAdmin.from("payment_events").insert({
    payment_link_id: linkId,
    gateway: "tamara",
    raw_payload: body,
  });

  if (normalizedStatus !== "approved") {
    return new Response(JSON.stringify({ received: true, processed: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (paymentId) {
    await authoriseOrder(paymentId);
  }

  const { error } = await supabaseAdmin
    .from("payment_links")
    .update({
      status: "paid",
      payment_gateway: "tamara",
      gateway_payment_id: paymentId ?? null,
      paid_at: new Date().toISOString(),
    })
    .eq("id", linkId)
    .eq("status", "pending");

  if (error) {
    console.error("Failed to update payment link after Tamara webhook:", error);
  }

  return new Response(JSON.stringify({ received: true, processed: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
