import { wedding } from "@/data/wedding";
import Section from "./Section";

export default function LoveStory() {
  return (
    <Section tone="panel" texture divider="pembatas-2" flower={1} flowerSide="right" className="px-6">
      <h2 className="section-title">Love Story</h2>
      <div className="gold-panel mt-8 px-6 py-8">
        <ol className="relative space-y-8 border-l border-gold/30 pl-6">
          {wedding.story.map((item) => (
            <li key={item.title} className="relative">
              <span
                className="absolute -left-[1.85rem] top-2 h-3 w-3 rounded-full border border-gold bg-void"
                aria-hidden
              />
              <h3
                className="gold-text text-2xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-cream-dim">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
