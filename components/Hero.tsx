import { wedding } from "@/data/wedding";
import { Divider } from "./Ornament";
import Section from "./Section";

export default function Hero() {
  return (
    <Section id="home" tone="void" divider={false} className="px-6 pt-4 text-center">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-gold">
        Kami Mengundang Anda
      </p>
      <h2
        className="gold-text mt-4 text-5xl leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {wedding.bride.nickname} <span className="italic">&amp;</span>{" "}
        {wedding.groom.nickname}
      </h2>
      <Divider className="mx-auto mt-4 w-40" />
      <p className="mt-3 text-sm tracking-widest text-cream-dim">
        {wedding.dateLong}
      </p>
    </Section>
  );
}
