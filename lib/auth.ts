import "server-only";
import { createClient } from "./supabase/server";
import type { User } from "@supabase/supabase-js";

// Profil ringkas tamu dari session Google (untuk prefill nama/avatar/badge).
export type SessionProfile = {
  id: string;
  email: string | null;
  name: string;
  avatarUrl: string | null;
};

function toProfile(user: User): SessionProfile {
  const m = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? null,
    name: (m.full_name || m.name || user.email || "Tamu") as string,
    avatarUrl: (m.avatar_url || m.picture || null) as string | null,
  };
}

// User session saat ini (null bila anonim).
export async function getSessionUser(): Promise<SessionProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? toProfile(user) : null;
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

// Pastikan pemanggil adalah admin. Lempar error kalau bukan — dipakai di
// server actions admin (yang reachable via POST langsung).
export async function requireAdmin(): Promise<SessionProfile> {
  const user = await getSessionUser();
  if (!user || !isAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }
  return user;
}
