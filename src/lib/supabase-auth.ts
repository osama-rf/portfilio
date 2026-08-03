import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.SUPABASE_URL;
const anonKey = import.meta.env.SUPABASE_ANON_KEY;

// Anon-key client used only to exchange email/password for a session
// during login. Not used for any data access.
export const supabaseAnon = url && anonKey ? createClient(url, anonKey) : null;

export const ACCESS_TOKEN_COOKIE = "sb-access-token";
export const REFRESH_TOKEN_COOKIE = "sb-refresh-token";
