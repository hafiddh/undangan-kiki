"use client";

import { useMemo, useState, useTransition } from "react";
import type { Rsvp, Wish } from "@/lib/supabase/types";
import VerifiedBadge from "@/components/VerifiedBadge";
import {
  approveWish,
  deleteRsvp,
  deleteWish,
  exportCsv,
  getAdminData,
  type AdminData,
} from "./actions";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-gold/20 bg-void/40 px-4 py-3">
      <p className="gold-text text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-[0.7rem] text-cream-dim">{label}</p>
    </div>
  );
}

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard({ initial }: { initial: AdminData }) {
  const [data, setData] = useState<AdminData>(initial);
  const [tab, setTab] = useState<"rsvp" | "wishes">("rsvp");
  const [pending, startTransition] = useTransition();

  const refresh = () =>
    startTransition(async () => setData(await getAdminData()));

  const stats = useMemo(() => {
    const attending = data.rsvps.filter((r) => r.attending);
    const guests = attending.reduce((s, r) => s + r.guest_count, 0);
    const declined = data.rsvps.length - attending.length;
    const verifiedWishes = data.wishes.filter((w) => w.verified).length;
    const pendingWishes = data.wishes.filter((w) => !w.approved).length;
    return {
      attending: attending.length,
      guests,
      declined,
      wishes: data.wishes.length,
      verifiedWishes,
      anonWishes: data.wishes.length - verifiedWishes,
      pendingWishes,
    };
  }, [data]);

  const act = (fn: () => Promise<{ ok: boolean }>) =>
    startTransition(async () => {
      await fn();
      setData(await getAdminData());
    });

  const pendingList = data.wishes.filter((w) => !w.approved);
  const approvedList = data.wishes.filter((w) => w.approved);

  return (
    <div className={pending ? "opacity-70 transition-opacity" : ""}>
      {/* Statistik */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Hadir" value={stats.attending} />
        <Stat label="Total tamu" value={stats.guests} />
        <Stat label="Berhalangan" value={stats.declined} />
        <Stat label="Antrian moderasi" value={stats.pendingWishes} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total ucapan" value={stats.wishes} />
        <Stat label="Ucapan verified" value={stats.verifiedWishes} />
        <Stat label="Ucapan anonim" value={stats.anonWishes} />
        <button
          onClick={refresh}
          className="rounded-xl border border-gold/30 bg-void/40 px-4 py-3 text-sm text-gold hover:bg-gold/10"
        >
          ↻ Muat ulang
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 border-b border-gold/20">
        {(["rsvp", "wishes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t
                ? "border-gold text-gold"
                : "border-transparent text-cream-dim hover:text-cream"
            }`}
          >
            {t === "rsvp" ? "Kehadiran" : "Ucapan"}
          </button>
        ))}
      </div>

      {tab === "rsvp" ? (
        <section className="mt-4">
          <div className="mb-3 flex justify-end">
            <button
              onClick={() =>
                startTransition(async () =>
                  download("kehadiran.csv", await exportCsv("rsvps")),
                )
              }
              className="rounded-lg border border-gold/40 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gold/20">
            <table className="w-full text-left text-sm">
              <thead className="bg-void/50 text-[0.7rem] uppercase tracking-wider text-cream-dim">
                <tr>
                  <th className="px-3 py-2">Nama</th>
                  <th className="px-3 py-2">Hadir</th>
                  <th className="px-3 py-2">Jml</th>
                  <th className="px-3 py-2">Waktu</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {data.rsvps.map((r: Rsvp) => (
                  <tr key={r.id} className="border-t border-gold/10">
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1.5 text-cream">
                        {r.name}
                        {r.verified && <VerifiedBadge showLabel={false} />}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {r.attending ? (
                        <span className="text-gold">Hadir</span>
                      ) : (
                        <span className="text-cream-dim">Tidak</span>
                      )}
                    </td>
                    <td className="px-3 py-2 tabular-nums">{r.guest_count}</td>
                    <td className="px-3 py-2 text-xs text-cream-dim">
                      {fmt(r.created_at)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => act(() => deleteRsvp(r.id))}
                        className="text-xs text-red-300 hover:text-red-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {data.rsvps.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-6 text-center text-sm text-cream-dim"
                    >
                      Belum ada konfirmasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="mt-4 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() =>
                startTransition(async () =>
                  download("ucapan.csv", await exportCsv("wishes")),
                )
              }
              className="rounded-lg border border-gold/40 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
            >
              Export CSV
            </button>
          </div>

          {/* Antrian moderasi (anonim) */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gold">
              Menunggu persetujuan ({pendingList.length})
            </h3>
            <ul className="space-y-2">
              {pendingList.map((w: Wish) => (
                <li
                  key={w.id}
                  className="rounded-xl border border-gold/20 bg-void/40 p-3"
                >
                  <p className="text-sm font-semibold text-cream">{w.name}</p>
                  <p className="mt-1 text-sm text-cream-dim">{w.message}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <button
                      onClick={() => act(() => approveWish(w.id))}
                      className="rounded-md border border-gold/40 px-2.5 py-1 text-gold hover:bg-gold/10"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => act(() => deleteWish(w.id))}
                      className="text-red-300 hover:text-red-200"
                    >
                      Hapus
                    </button>
                    <span className="ml-auto text-cream-dim">
                      {fmt(w.created_at)}
                    </span>
                  </div>
                </li>
              ))}
              {pendingList.length === 0 && (
                <li className="rounded-xl border border-gold/10 p-4 text-center text-sm text-cream-dim">
                  Tidak ada antrian.
                </li>
              )}
            </ul>
          </div>

          {/* Sudah tampil */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-cream">
              Tampil publik ({approvedList.length})
            </h3>
            <ul className="space-y-2">
              {approvedList.map((w: Wish) => (
                <li
                  key={w.id}
                  className="rounded-xl border border-gold/20 bg-void/40 p-3"
                >
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-gold-bright">
                    {w.name}
                    {w.verified && <VerifiedBadge showLabel={false} />}
                  </p>
                  <p className="mt-1 text-sm text-cream-dim">{w.message}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <button
                      onClick={() => act(() => deleteWish(w.id))}
                      className="text-red-300 hover:text-red-200"
                    >
                      Hapus
                    </button>
                    <span className="ml-auto text-cream-dim">
                      {fmt(w.created_at)}
                    </span>
                  </div>
                </li>
              ))}
              {approvedList.length === 0 && (
                <li className="rounded-xl border border-gold/10 p-4 text-center text-sm text-cream-dim">
                  Belum ada ucapan tampil.
                </li>
              )}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
