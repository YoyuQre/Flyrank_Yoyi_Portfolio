import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client for API routes.
 *
 * Uses the service-role key so RLS policies don't need to be opened for
 * public inserts. These values are only ever read server-side — never expose
 * SUPABASE_SERVICE_ROLE_KEY in a NEXT_PUBLIC_* variable.
 *
 * Configure in `.env.local`:
 *   SUPABASE_URL=https://<project-ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<service_role key from Project Settings → API>
 */
const SUPABASE_URL = (process.env.SUPABASE_URL ?? "").trim();
const SUPABASE_SERVICE_ROLE_KEY = (
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
).trim();

function hasCredentials(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient | undefined {
  if (!hasCredentials()) return undefined;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
