"use client";

import { useEffect, useState } from "react";
import Section from "./Section";

type RsvpEntry = { name: string; attending: boolean; count: number };

const KEY = "undangan-rsvp";

export default function Rsvp() {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [count, setCount] = useState(1);
  const [sent, setSent] = useState(false);

  // load setelah mount — hindari hydration mismatch
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const next = [...entries, { name: name.trim(), attending, count }];
    setEntries(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    setName("");
    setSent(true);
  };

  const totalHadir = entries
    .filter((e) => e.attending)
    .reduce((sum, e) => sum + e.count, 0);

  return (
    <Section id="rsvp" tone="panel" texture divider="svg" className="px-6">
      <h2 className="section-title">RSVP</h2>
      <div className="gold-panel mt-8 px-6 py-8">
        <p className="text-center text-sm text-cream-dim">
          Mohon konfirmasi kehadiran Anda
        </p>
        <p className="mt-2 text-center text-xs text-gold">
          {totalHadir} tamu terkonfirmasi hadir
        </p>

        {sent ? (
          <p className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-4 text-center text-sm text-gold-bright">
            Terima kasih, konfirmasi Anda tersimpan ♥
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs tracking-wider text-cream-dim">Nama</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nama Anda"
                className="mt-1 w-full rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-gold focus:outline-none"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                aria-pressed={attending}
                className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                  attending
                    ? "border-gold bg-gold/15 text-gold-bright"
                    : "border-gold/25 text-cream-dim"
                }`}
              >
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                aria-pressed={!attending}
                className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                  !attending
                    ? "border-gold bg-gold/15 text-gold-bright"
                    : "border-gold/25 text-cream-dim"
                }`}
              >
                Berhalangan
              </button>
            </div>

            {attending && (
              <label className="block">
                <span className="text-xs tracking-wider text-cream-dim">
                  Jumlah tamu
                </span>
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream focus:border-gold focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button
              type="submit"
              className="shimmer w-full rounded-xl px-4 py-3 text-sm font-bold tracking-widest text-void"
            >
              Kirim Konfirmasi
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
