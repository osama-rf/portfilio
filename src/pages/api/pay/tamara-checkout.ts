import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import { supabaseAdmin } from "@lib/supabase-admin";
import { getAppUrl } from "@lib/site-url";

const TAMARA_API = import.meta.env.TAMARA_API_URL;
const TAMARA_TOKEN = import.meta.env.TAMARA_API_TOKEN;
const NOTIF_SECRET = import.meta.env.TAMARA_NOTIFICATION_SECRET;

function generateNotificationToken(linkId: string) {
  return jwt.sign({ linkId }, NOTIF_SECRET, { algorithm: "HS256", expiresIn: "1h" });
}

export const POST: APIRoute = async ({ request }) => {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { linkId } = await request.json();
  if (!linkId) {
    return new Response(JSON.stringify({ error: "Missing linkId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: link, error } = await supabaseAdmin
    .from("payment_links")
    .select("id, title, description, amount, currency, status, tamara_enabled, client_name")
    .eq("id", linkId)
    .single();

  if (error || !link) {
    return new Response(JSON.stringify({ error: "Payment link not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!link.tamara_enabled) {
    return new Response(JSON.stringify({ error: "Tamara is not enabled for this link" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (link.status !== "pending") {
    return new Response(JSON.stringify({ error: "This payment link is no longer payable" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const appUrl = getAppUrl();
  const amount = Number(link.amount).toFixed(2);
  const [firstName, ...rest] = (link.client_name || "Client").split(" ");
  const lastName = rest.join(" ") || firstName;

  const payload = {
    order_reference_id: link.id,
    order_number: link.id,
    total_amount: { amount, currency: link.currency },
    shipping_amount: { amount: "0.00", currency: link.currency },
    tax_amount: { amount: "0.00", currency: link.currency },
    country_code: "SA",
    description: link.description || link.title,
    items: [
      {
        name: link.title,
        sku: link.id,
        reference_id: link.id,
        type: "Digital",
        quantity: 1,
        unit_price: { amount, currency: link.currency },
        total_amount: { amount, currency: link.currency },
        discount_amount: { amount: "0.00", currency: link.currency },
        tax_amount: { amount: "0.00", currency: link.currency },
        description: link.description || link.title,
      },
    ],
    consumer: {
      first_name: firstName,
      last_name: lastName,
      phone_number: "0500000000",
      email: "client@example.com",
    },
    billing_address: {
      first_name: firstName,
      last_name: lastName,
      line1: "N/A",
      city: "Riyadh",
      country_code: "SA",
      phone_number: "0500000000",
    },
    shipping_address: {
      first_name: firstName,
      last_name: lastName,
      line1: "N/A",
      city: "Riyadh",
      country_code: "SA",
      phone_number: "0500000000",
    },
    payment_type: "PAY_BY_INSTALMENTS",
    merchant_url: {
      success: `${appUrl}/pay/${link.id}?gateway=tamara&status=success`,
      failure: `${appUrl}/pay/${link.id}?gateway=tamara&status=failed`,
      cancel: `${appUrl}/pay/${link.id}?gateway=tamara&status=cancelled`,
      notification: `${appUrl}/api/pay/tamara-webhook?token=${generateNotificationToken(link.id)}`,
    },
    locale: "en_US",
    is_mobile: false,
    platform: "osama-lab.com",
  };

  const resp = await fetch(`${TAMARA_API}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TAMARA_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await resp.json();
  if (!resp.ok) {
    console.error("Tamara checkout error:", data);
    return new Response(JSON.stringify({ error: "Failed to create Tamara checkout" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ redirect_url: data.checkout_url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
