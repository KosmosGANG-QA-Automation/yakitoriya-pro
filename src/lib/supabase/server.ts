import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireEnv } from "@/lib/env";

let client: SupabaseClient | null = null;

/** Серверный клиент с service role. Не импортировать в клиентские компоненты. */
export function db(): SupabaseClient {
  client ??= createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
  return client;
}
