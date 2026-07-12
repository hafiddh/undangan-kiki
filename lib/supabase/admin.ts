import "server-only";
import { createClient } from "@supabase/supabase-js";

// Klien service-role — BYPASS RLS. Server-only. Hanya dipakai setelah
// requireAdmin() memverifikasi email session ∈ ADMIN_EMAILS.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
