/* eslint-disable @next/next/no-img-element */
import { wedding } from "@/data/wedding";
import { LaurelFrame } from "./Ornament";
import Reveal from "./Reveal";

function Profile({
  person,
  label,
}: {
  person: typeof wedding.bride | typeof wedding.groom;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="h-52 w-40 overflow-hidden rounded-t-full rounded-b-full border-2 border-gold/70 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
          {/* placeholder SVG — ganti dengan foto asli di data/wedding.ts */}
          <img
            src={person.photo}
            alt={`Foto ${person.nickname}`}
            className="h-full w-full object-cover"
          />
        </div>
        <LaurelFrame className="absolute -bottom-5 left-1/2 w-40 -translate-x-1/2" />
      </div>
      <h3
        className="gold-text mt-10 text-2xl leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {person.fullName}
      </h3>
      <p className="mt-1 text-sm italic text-cream-dim">({person.nickname})</p>
      <p className="mt-3 max-w-56 text-xs leading-relaxed text-cream-dim">
        {person.parents}
      </p>
      <a
        href={`https://instagram.com/${person.instagram}`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-4 py-1.5 text-xs text-gold transition-colors hover:bg-gold/10"
        aria-label={`Instagram ${label}`}
      >
        <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
        @{person.instagram}
      </a>
    </div>
  );
}

export default function Couple() {
  return (
    <Reveal id="mempelai" className="px-6 pt-20">
      <h2 className="section-title">The Couple</h2>
      <div className="mt-8 space-y-8">
        <div className="gold-panel px-6 py-12">
          <Profile person={wedding.bride} label="mempelai wanita" />
        </div>
        <div
          className="gold-text text-center text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden
        >
          ♥
        </div>
        <div className="gold-panel px-6 py-12">
          <Profile person={wedding.groom} label="mempelai pria" />
        </div>
      </div>
    </Reveal>
  );
}
