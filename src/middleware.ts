import { defineMiddleware } from "astro:middleware";
import { supabaseAdmin } from "@lib/supabase-admin";
import { ACCESS_TOKEN_COOKIE } from "@lib/supabase-auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const langParam = context.url.searchParams.get("lang");
  if (langParam === "en" || langParam === "ar") {
    context.cookies.set("lang", langParam, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  }

  const isProtectedAdminPage =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isProtectedAdminApi =
    pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isProtectedAdminPage && !isProtectedAdminApi) {
    return next();
  }

  const token = context.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!token || !supabaseAdmin) {
    if (isProtectedAdminApi) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return context.redirect("/admin/login");
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data?.user) {
    if (isProtectedAdminApi) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return context.redirect("/admin/login");
  }

  context.locals.adminUser = data.user;
  return next();
});
