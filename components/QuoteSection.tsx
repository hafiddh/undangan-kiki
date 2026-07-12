import { wedding } from "@/data/wedding";
import Section from "./Section";

export default function QuoteSection() {
  return (
    <Section tone="panel" texture divider="pembatas-1" className="px-6">
      <figure className="gold-panel relative px-7 py-10 text-center">
        <span
          className="gold-text absolute -top-5 left-1/2 -translate-x-1/2 text-6xl leading-none"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote
          className="text-[0.95rem] italic leading-relaxed text-cream"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {wedding.quote.text}
        </blockquote>
        <figcaption className="mt-4 text-xs font-semibold tracking-[0.25em] text-gold">
          {wedding.quote.source}
        </figcaption>
      </figure>
    </Section>
  );
}
