"use server";

import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Rsvp, Wish } from "@/lib/supabase/types";

export type AdminData = {
  rsvps: Rsvp[];
  wishes: Wish[];
};

export async function getAdminData(): Promise<AdminData> {
  await requireAdmin();
  const supabase = createAdminClient();

  const [rsvpRes, wishRes] = await Promise.all([
    supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
    supabase.from("wishes").select("*").order("created_at", { ascending: false }),
  ]);

  return {
    rsvps: (rsvpRes.data as Rsvp[]) ?? [],
    wishes: (wishRes.data as Wish[]) ?? [],
  };
}

export async function deleteRsvp(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("rsvps").delete().eq("id", id);
  return { ok: !error };
}

export async function deleteWish(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("wishes").delete().eq("id", id);
  return { ok: !error };
}

export async function approveWish(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("wishes")
    .update({ approved: true })
    .eq("id", id);
  return { ok: !error };
}

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.join(",")];
  for (const row of rows) lines.push(row.map(csvCell).join(","));
  return lines.join("\n");
}

export async function exportCsv(kind: "rsvps" | "wishes"): Promise<string> {
  await requireAdmin();
  const supabase = createAdminClient();

  if (kind === "rsvps") {
    const { data } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });
    const rows = ((data as Rsvp[]) ?? []).map((r) => [
      r.created_at,
      r.name,
      r.attending ? "Hadir" : "Berhalangan",
      r.guest_count,
      r.verified ? "Ya" : "Tidak",
    ]);
    return toCsv(
      ["Waktu", "Nama", "Kehadiran", "Jumlah Tamu", "Terverifikasi"],
      rows,
    );
  }

  const { data } = await supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = ((data as Wish[]) ?? []).map((w) => [
    w.created_at,
    w.name,
    w.message,
    w.verified ? "Ya" : "Tidak",
    w.approved ? "Ya" : "Tidak",
  ]);
  return toCsv(
    ["Waktu", "Nama", "Ucapan", "Terverifikasi", "Disetujui"],
    rows,
  );
}
