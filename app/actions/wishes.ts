"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";
import { checkRateLimit, getClientIpHash, isDuplicate } from "@/lib/ratelimit";

export type SubmitWishInput = { name: string; message: string; hp?: string };

export type SubmitWishResult =
  | { ok: true; approved: boolean }
  | { ok: false; error: string };

export async function submitWish(
  input: SubmitWishInput,
): Promise<SubmitWishResult> {
  // Honeypot: field tersembunyi. Terisi = bot → pura-pura sukses, tak simpan.
  if (input.hp && input.hp.trim() !== "") {
    return { ok: true, approved: true };
  }

  const name = input.name?.trim();
  const message = input.message?.trim();
  if (!name || !message) {
    return { ok: false, error: "Nama & ucapan wajib diisi." };
  }
  if (message.length > 500) {
    return { ok: false, error: "Ucapan terlalu panjang (maks 500 karakter)." };
  }

  const ipHash = await getClientIpHash();

  const limit = await checkRateLimit("wishes", ipHash, {
    cooldownSec: 15,
    maxPerHour: 5,
  });
  if (!limit.ok) return { ok: false, error: limit.error };

  if (await isDuplicate("wishes", ipHash, "message", message)) {
    return { ok: false, error: "Ucapan ini sudah terkirim." };
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
    ip_hash: ipHash,
  });

  if (error) return { ok: false, error: "Gagal mengirim. Coba lagi." };
  return { ok: true, approved };
}
