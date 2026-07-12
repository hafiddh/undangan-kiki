/* eslint-disable @next/next/no-img-element */
import { wedding } from "@/data/wedding";
import { WayangGunungan, FrameCorner } from "./Ornament";
import Section from "./Section";

function ProfileCard({
  person,
  label,
}: {
  person: typeof wedding.bride | typeof wedding.groom;
  label: string;
}) {
  return (
    <div className="relative">
      {/* Bingkai emas ornate */}
      <div
        className="relative overflow-hidden rounded-[1.75rem] border border-gold/55 p-1.5 shadow-[0_0_45px_rgba(212,175,55,0.18)]"
        style={{
          background: "linear-gradient(180deg, var(--panel-2), var(--panel))",
        }}
      >
        {/* Sudut bingkai */}
        <FrameCorner className="pointer-events-none absolute left-1 top-1 z-30 w-8" />
        <FrameCorner className="pointer-events-none absolute right-1 top-1 z-30 w-8 -scale-x-100" />
        <FrameCorner className="pointer-events-none absolute bottom-1 left-1 z-30 w-8 -scale-y-100" />
        <FrameCorner className="pointer-events-none absolute bottom-1 right-1 z-30 w-8 -scale-100" />

        <div className="overflow-hidden rounded-[1.35rem] border border-gold/30">
          {/* Foto */}
          <div className="relative aspect-[3/4] w-full">
            <img
              src={person.photo}
              alt={`Foto ${person.nickname}`}
              className="h-full w-full object-cover"
            />
            {/* fade lembut menuju panel bawah */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-panel to-transparent" />
          </div>

          {/* Panel nama */}
          <div className="relative px-6 pb-6 pt-4 text-center">
            {/* garis emas atas panel */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            {/* Wayang gunungan di kiri, sedikit naik ke area foto */}
            <WayangGunungan className="animate-float pointer-events-none absolute -left-1 bottom-2 z-20 w-14 opacity-75" />

            <a
              href={`https://instagram.com/${person.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gold transition-colors hover:text-gold-bright"
              aria-label={`Instagram ${label}`}
            >
              <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              @{person.instagram}
            </a>

            <h3
              className="gold-text mt-2 text-2xl uppercase leading-snug tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {person.fullName}
            </h3>

            <p className="mt-2 text-xs font-semibold italic text-gold-bright">
              {person.relation}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-cream">
              {person.parents}
            </p>
            {person.location && (
              <p className="mt-0.5 text-xs text-cream-dim">{person.location}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Couple() {
  return (
    <Section id="mempelai" tone="void" divider="svg" className="px-6">
      <h2 className="section-title">The Couple</h2>
      <div className="mt-8 space-y-8">
        <ProfileCard person={wedding.bride} label="mempelai wanita" />
        <div
          className="gold-text text-center text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden
        >
          &amp;
        </div>
        <ProfileCard person={wedding.groom} label="mempelai pria" />
      </div>
    </Section>
  );
}
