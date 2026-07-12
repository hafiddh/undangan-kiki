import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Klien server (anon key + cookies). Dipakai server actions & server
// components untuk baca session tamu. RLS berlaku.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Dipanggil dari Server Component — abaikan; refresh session
            // ditangani oleh route handler / server action.
          }
        },
      },
    },
  );
}
