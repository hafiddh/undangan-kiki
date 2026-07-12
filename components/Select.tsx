"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Option<T> = { value: T; label: string };
type Rect = { left: number; top: number; width: number };

// Dropdown custom bertema emas — pengganti <select> native yang tampil
// abu-abu bawaan OS. Panel di-portal ke body + posisi fixed supaya tak
// terpotong oleh section (overflow-hidden). Tutup saat klik luar / Escape.
export default function Select<T extends string | number>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => setMounted(true), []);

  const measure = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setRect({ left: r.left, top: r.bottom + 8, width: r.width });
  };

  useLayoutEffect(() => {
    if (open) measure();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        !btnRef.current?.contains(t) &&
        !listRef.current?.contains(t)
      )
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onReflow = () => measure();
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onReflow);
    window.addEventListener("scroll", onReflow, true);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onReflow);
      window.removeEventListener("scroll", onReflow, true);
    };
  }, [open]);

  const pick = (v: T) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-left text-sm text-cream transition-colors focus:border-gold focus:outline-none"
      >
        <span>{current?.label ?? label ?? "Pilih"}</span>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 text-gold transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {mounted &&
        open &&
        rect &&
        createPortal(
          <ul
            ref={listRef}
            role="listbox"
            style={{ left: rect.left, top: rect.top, width: rect.width }}
            className="animate-select-in fixed z-[60] max-h-56 overflow-auto rounded-xl border border-gold/40 bg-panel-2 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            {options.map((o) => {
              const selected = o.value === value;
              return (
                <li key={String(o.value)} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => pick(o.value)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      selected
                        ? "bg-gold/15 text-gold-bright"
                        : "text-cream hover:bg-gold/10 hover:text-gold-bright"
                    }`}
                  >
                    {o.label}
                    {selected && (
                      <svg viewBox="0 0 24 24" className="w-4 text-gold" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}
