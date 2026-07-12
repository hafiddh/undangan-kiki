import { wedding, type WeddingEvent } from "@/data/wedding";
import Reveal from "./Reveal";

function RingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="14" r="6" />
      <path d="M9 5l3 3 3-3-1.5-2h-3z" />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 22v-8" />
      <path d="M12 14c-4 0-5-3-5-3s2-2 5-1c3-1 5 1 5 1s-1 3-5 3z" />
      <circle cx="12" cy="7" r="3" />
      <path d="M12 2v2M8.5 4.5l1 1M15.5 4.5l-1 1" />
    </svg>
  );
}

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <div className="gold-panel flex flex-col items-center px-6 py-10 text-center">
      {event.icon === "ring" ? <RingIcon /> : <FlowerIcon />}
      <h3
        className="gold-text mt-3 text-3xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {event.name}
      </h3>
      <p className="mt-3 text-sm text-cream">{event.date}</p>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1 text-xs text-gold-bright">
        <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        {event.time}
      </p>
      <p className="mt-4 text-sm font-semibold text-cream">{event.venue}</p>
      <p className="mt-1 text-xs leading-relaxed text-cream-dim">{event.address}</p>
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-5 py-2 text-xs font-semibold tracking-wider text-gold transition-colors hover:bg-gold/10"
      >
        <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 21s-7-6.5-7-11a7 7 0 0114 0c0 4.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        Lihat Lokasi
      </a>
    </div>
  );
}

export default function Events() {
  return (
    <Reveal id="acara" className="px-6 pt-20">
      <h2 className="section-title">Detail Acara</h2>
      <div className="mt-8 space-y-6">
        {wedding.events.map((event) => (
          <EventCard key={event.name} event={event} />
        ))}
      </div>
    </Reveal>
  );
}
