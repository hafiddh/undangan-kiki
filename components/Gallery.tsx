/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { wedding } from "@/data/wedding";
import Section from "./Section";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // tutup lightbox pakai Escape
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Section id="gallery" tone="void" divider="pembatas-3" flower={3} flowerSide="left" className="px-6">
      <h2 className="section-title">Galeri</h2>
      <p
        className="mt-4 text-center text-sm italic text-cream-dim"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Precious moments, creating memories
      </p>
      {/* Scroll horizontal — geser ke kanan, tak memanjangkan halaman */}
      <div className="-mx-6 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {wedding.gallery.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            className="group relative w-44 shrink-0 snap-start overflow-hidden rounded-xl border border-gold/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            aria-label={`Perbesar foto ${i + 1}`}
          >
            <img
              src={src}
              alt={`Galeri ${i + 1}`}
              className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Duotone emas gelap saat belum di-hover/klik; hilang saat interaksi */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gold-dim mix-blend-color transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-void/70 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
            />
          </button>
        ))}
      </div>

      {mounted &&
        open !== null &&
        createPortal(
          <div
            className="animate-lightbox-fade fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-6 backdrop-blur-sm"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Pratinjau foto"
          >
            <img
              src={wedding.gallery[open]}
              alt={`Galeri ${open + 1}`}
              className="animate-lightbox-zoom max-h-[85vh] w-auto max-w-full rounded-2xl border border-gold/50"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-5 top-5 z-10 rounded-full border border-gold/50 bg-void/80 px-3 py-1 text-sm text-gold backdrop-blur"
              onClick={() => setOpen(null)}
            >
              Tutup ✕
            </button>
          </div>,
          document.body,
        )}
    </Section>
  );
}
