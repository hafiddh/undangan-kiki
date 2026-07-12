import { wedding } from "@/data/wedding";
import Section from "./Section";

function RingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="14" r="6" />
      <path d="M9 5l3 3 3-3-1.5-2h-3z" />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 22v-8" />
      <path d="M12 14c-4 0-5-3-5-3s2-2 5-1c3-1 5 1 5 1s-1 3-5 3z" />
      <circle cx="12" cy="7" r="3" />
      <path d="M12 2v2M8.5 4.5l1 1M15.5 4.5l-1 1" />
    </svg>
  );
}

export default function Events() {
  const a = wedding.acara;

  return (
    <Section id="acara" tone="void" divider="pembatas-2" corner="bunga" className="px-6">
      <h2 className="section-title">Detail Acara</h2>

      <div className="gold-panel mt-8 px-5 py-9">
        {/* Baris utama: Akad | Resepsi */}
        <div className="grid grid-cols-2 items-start text-center">
          {/* Akad */}
          <div className="px-2">
            <RingIcon />
            <h3
              className="gold-text mt-2 text-xl leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Akad Nikah
            </h3>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-gold-dim">
              Pukul
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-cream">{a.akad}</p>
          </div>

          {/* Resepsi */}
          <div className="border-l border-gold/25 px-2">
            <FlowerIcon />
            <h3
              className="gold-text mt-2 text-xl leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Resepsi
            </h3>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-gold-dim">
              Pukul
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-cream">
              {a.resepsi}
            </p>
          </div>
        </div>

        {/* Lokasi bersama */}
        <div className="mt-7 border-t border-gold/20 pt-6 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-gold-dim">
            Bertempat di
          </p>
          <p className="mt-1.5 text-base font-semibold text-cream">{a.venue}</p>
          <p className="mt-1 text-xs leading-relaxed text-cream-dim">
            {a.address}
          </p>
          <a
            href={a.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-6 py-2 text-xs font-semibold tracking-wider text-gold transition-colors hover:bg-gold/10"
          >
            <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 21s-7-6.5-7-11a7 7 0 0114 0c0 4.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Lihat Lokasi
          </a>
        </div>
      </div>
    </Section>
  );
}
