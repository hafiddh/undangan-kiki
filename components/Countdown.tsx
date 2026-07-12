"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import Reveal from "./Reveal";

type Parts = { hari: number; jam: number; menit: number; detik: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    hari: Math.floor(ms / 86_400_000),
    jam: Math.floor(ms / 3_600_000) % 24,
    menit: Math.floor(ms / 60_000) % 60,
    detik: Math.floor(ms / 1_000) % 60,
  };
}

export default function Countdown() {
  const target = new Date(wedding.date).getTime();
  // null sebelum mount — hindari hydration mismatch karena Date.now()
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items: [string, number | null][] = [
    ["Hari", parts?.hari ?? null],
    ["Jam", parts?.jam ?? null],
    ["Menit", parts?.menit ?? null],
    ["Detik", parts?.detik ?? null],
  ];

  return (
    <Reveal className="px-6 pt-16">
      <h2 className="section-title">Countdown</h2>
      <div className="gold-panel mt-6 grid grid-cols-4 divide-x divide-gold/20 py-6">
        {items.map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span
              className="gold-text text-4xl tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value ?? "–"}
            </span>
            <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-cream-dim">
              {label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
