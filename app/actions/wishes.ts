"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";

export type SubmitWishInput = { name: string; message: string };

export type SubmitWishResult =
  | { ok: true; approved: boolean }
  | { ok: false; error: string };

export async function submitWish(
  input: SubmitWishInput,
): Promise<SubmitWishResult> {
  const name = input.name?.trim();
  const message = input.message?.trim();
  if (!name || !message) {
    return { ok: false, error: "Nama & ucapan wajib diisi." };
  }

  const user = await getSessionUser();
  const supabase = await createClient();

  // Verified (login Google) → auto-approve. Anonim → antre moderasi.
  const approved = Boolean(user);

  const { error } = await supabase.from("wishes").insert({
    name: user?.name ?? name,
    message,
    user_id: user?.id ?? null,
    avatar_url: user?.avatarUrl ?? null,
    approved,
  });

  if (error) return { ok: false, error: "Gagal mengirim. Coba lagi." };
  return { ok: true, approved };
}
