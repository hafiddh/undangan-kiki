"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "home", label: "Home", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { id: "mempelai", label: "Mempelai", icon: "M16 11a4 4 0 10-8 0M4 21c0-4 4-6 8-6s8 2 8 6" },
  { id: "acara", label: "Acara", icon: "M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" },
  { id: "gallery", label: "Gallery", icon: "M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM8 11a2 2 0 100-4 2 2 0 000 4zM21 15l-5-5-11 11" },
  { id: "rsvp", label: "RSVP", icon: "M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zM3 7l9 6 9-6" },
  { id: "gift", label: "Gift", icon: "M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7c2 0 4-1 4-3a2 2 0 00-4 0M12 7c-2 0-4-1-4-3a2 2 0 014 0" },
  { id: "wishes", label: "Wishes", icon: "M21 12a8 8 0 01-8 8H4l2-3a8 8 0 1115-5z" },
];

export default function BottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of ITEMS) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      aria-label="Navigasi undangan"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-gold/25 bg-void/90 backdrop-blur"
    >
      <ul className="flex justify-between px-3 py-2">
        {ITEMS.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                onClick={() => go(id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1 text-[0.6rem] transition-colors ${
                  isActive ? "text-gold" : "text-cream-dim hover:text-cream"
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d={icon} />
                </svg>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
