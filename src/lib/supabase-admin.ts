import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.SUPABASE_URL;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

// Server-only client: uses the service_role key, bypasses RLS.
// Never import this from client-side code.
export const supabaseAdmin =
  url && serviceKey
    ? createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;
