import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.SUPABASE_URL;
const key = import.meta.env.SUPABASE_ANON_KEY;

// Returns a Supabase client when env vars are set, or null for demo mode.
// All API routes check for null and fall back to localStorage-only behaviour.
export const supabase = url && key ? createClient(url, key) : null;

export const isDemoMode = !supabase;
