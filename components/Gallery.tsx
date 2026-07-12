/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import Section from "./Section";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  // tutup lightbox pakai Escape
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Section id="gallery" tone="void" divider="webp" className="px-6">
      <h2 className="section-title">Galeri</h2>
      <p
        className="mt-4 text-center text-sm italic text-cream-dim"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Precious moments, creating memories
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {wedding.gallery.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            className="group overflow-hidden rounded-xl border border-gold/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            aria-label={`Perbesar foto ${i + 1}`}
          >
            <img
              src={src}
              alt={`Galeri ${i + 1}`}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-6 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto"
        >
          <img
            src={wedding.gallery[open]}
            alt={`Galeri ${open + 1}`}
            className="max-h-[80vh] w-auto max-w-full rounded-2xl border border-gold/50"
          />
          <button
            className="absolute right-5 top-5 rounded-full border border-gold/50 px-3 py-1 text-sm text-gold"
            onClick={() => setOpen(null)}
          >
            Tutup ✕
          </button>
        </div>
      )}
    </Section>
  );
}
