import "server-only";
import { createHash } from "crypto";
import { headers } from "next/headers";
import { createAdminClient } from "./supabase/admin";

// IP tamu di-hash (SHA-256 + salt) — TIDAK menyimpan IP mentah (privasi).
const SALT = process.env.IP_HASH_SALT ?? "undangan-kiki-antispam-v1";

export async function getClientIpHash(): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  return createHash("sha256").update(`${SALT}:${ip}`).digest("hex");
}

type Table = "rsvps" | "wishes";

type Limits = {
  cooldownSec: number; // jeda minimum antar kiriman
  maxPerHour: number; // maks kiriman per jam per IP
};

export type LimitResult = { ok: true } | { ok: false; error: string };

// Cek rate-limit per IP pakai service-role (bypass RLS, hitung baris).
export async function checkRateLimit(
  table: Table,
  ipHash: string,
  { cooldownSec, maxPerHour }: Limits,
): Promise<LimitResult> {
  const admin = createAdminClient();
  const now = Date.now();

  // Cooldown: ada kiriman dalam N detik terakhir?
  const coolSince = new Date(now - cooldownSec * 1000).toISOString();
  const cool = await admin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", coolSince);
  if ((cool.count ?? 0) > 0) {
    return { ok: false, error: "Terlalu cepat. Tunggu sebentar lalu coba lagi." };
  }

  // Batas per jam
  const hourSince = new Date(now - 3600 * 1000).toISOString();
  const hour = await admin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", hourSince);
  if ((hour.count ?? 0) >= maxPerHour) {
    return { ok: false, error: "Batas kiriman tercapai. Coba lagi nanti." };
  }

  return { ok: true };
}

// Tolak isian identik berturut dari IP yang sama (dalam windowMin menit).
export async function isDuplicate(
  table: Table,
  ipHash: string,
  column: "message" | "name",
  value: string,
  windowMin = 30,
): Promise<boolean> {
  const admin = createAdminClient();
  const since = new Date(Date.now() - windowMin * 60 * 1000).toISOString();
  const res = await admin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .eq(column, value)
    .gte("created_at", since);
  return (res.count ?? 0) > 0;
}
