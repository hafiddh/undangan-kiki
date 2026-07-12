"use client";

import { useEffect, useState } from "react";
import Section from "./Section";

type Wish = { name: string; message: string; time: number };

const KEY = "undangan-wishes";

// Seed demo saat kosong — akan tergantikan data pengunjung
const SEED: Wish[] = [
  {
    name: "Keluarga Besar",
    message:
      "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah, mawaddah, warahmah.",
    time: Date.parse("2026-07-01T10:00:00+07:00"),
  },
  {
    name: "Sahabat Kampus",
    message: "Akhirnya! Bahagia selalu untuk kalian berdua ♥",
    time: Date.parse("2026-07-02T14:30:00+07:00"),
  },
  {
    name: "Rekan Kerja",
    message: "Barakallahu laka wa baraka 'alaika. Lancar sampai hari H!",
    time: Date.parse("2026-07-03T09:15:00+07:00"),
  },
];

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(KEY);
      setWishes(raw ? JSON.parse(raw) : SEED);
    } catch {
      setWishes(SEED);
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const next = [
      { name: name.trim(), message: message.trim(), time: Date.now() },
      ...wishes,
    ];
    setWishes(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    setName("");
    setMessage("");
  };

  return (
    <Section id="wishes" tone="panel" texture divider="pembatas-4" flower={1} flowerSide="left" className="px-6">
      <h2 className="section-title">Wishes</h2>
      <div className="gold-panel mt-8 px-6 py-8">
        <form onSubmit={submit} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nama Anda"
            className="w-full rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-gold focus:outline-none"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            placeholder="Tulis doa & ucapan terbaik Anda…"
            className="w-full resize-none rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="shimmer w-full rounded-xl px-4 py-3 text-sm font-bold tracking-widest text-void"
          >
            Kirim Ucapan
          </button>
        </form>

        <ul className="mt-8 max-h-80 space-y-4 overflow-y-auto pr-1">
          {mounted &&
            wishes.map((wish) => (
              <li
                key={wish.time + wish.name}
                className="rounded-xl border border-gold/20 bg-void/40 p-4"
              >
                <p className="text-sm font-semibold text-gold-bright">
                  {wish.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-cream-dim">
                  {wish.message}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </Section>
  );
}
