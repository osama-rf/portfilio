import type { APIRoute } from "astro";
import { supabaseAnon, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@lib/supabase-auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!supabaseAnon) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return new Response(JSON.stringify({ error: "Invalid email or password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const isProd = import.meta.env.PROD;

  cookies.set(ACCESS_TOKEN_COOKIE, data.session.access_token, {
    path: "/",
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: data.session.expires_in,
  });
  cookies.set(REFRESH_TOKEN_COOKIE, data.session.refresh_token, {
    path: "/",
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
