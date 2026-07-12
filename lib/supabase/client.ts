import { createBrowserClient } from "@supabase/ssr";

// Klien browser (anon key). Dipakai komponen client: baca ucapan publik,
// trigger login Google. RLS tetap berlaku.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
