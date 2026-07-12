"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth";
import type { RsvpStats } from "@/lib/supabase/types";

export type SubmitRsvpInput = {
  name: string;
  attending: boolean;
  guest_count: number;
};

export type SubmitRsvpResult =
  | { ok: true; verified: boolean }
  | { ok: false; error: string };

export async function submitRsvp(
  input: SubmitRsvpInput,
): Promise<SubmitRsvpResult> {
  const name = input.name?.trim();
  if (!name) return { ok: false, error: "Nama wajib diisi." };

  const attending = Boolean(input.attending);
  const guest_count = attending
    ? Math.min(Math.max(Number(input.guest_count) || 1, 1), 20)
    : 1;

  const user = await getSessionUser();
  const supabase = await createClient();

  const { error } = await supabase.from("rsvps").insert({
    name: user?.name ?? name,
    attending,
    guest_count,
    user_id: user?.id ?? null,
  });

  if (error) return { ok: false, error: "Gagal menyimpan. Coba lagi." };
  return { ok: true, verified: Boolean(user) };
}

export async function getRsvpStats(): Promise<RsvpStats> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_rsvp_stats");
  const row = Array.isArray(data) ? data[0] : data;
  if (error || !row) {
    return { total_attending: 0, total_guests: 0, total_declined: 0 };
  }
  return {
    total_attending: Number(row.total_attending) || 0,
    total_guests: Number(row.total_guests) || 0,
    total_declined: Number(row.total_declined) || 0,
  };
}
