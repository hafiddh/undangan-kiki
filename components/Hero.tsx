import Image from "next/image";
import { wedding } from "@/data/wedding";
import { Divider } from "./Ornament";
import Section from "./Section";
import RandomSparkles from "./RandomSparkles";

export default function Hero() {
  return (
    <Section
      id="home"
      tone="void"
      divider={false}
      corner="bungakorner"
      topPad="pt-8"
      className="px-6 pb-14 text-center"
    >
      {/* Sparkle acak khusus Hero */}
      <RandomSparkles count={22} className="z-0 opacity-90 sparkle-dense" />

      {/* Kaligrafi Bismillah */}
      <Image
        src="/images/bismillah.webp"
        alt="Bismillahirrahmanirrahim"
        width={320}
        height={110}
        className="mx-auto w-44 opacity-95"
      />

      {/* Salam pembuka */}
      <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">
        {wedding.intro.salam}
      </p>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-cream-dim">
        {wedding.intro.text}
      </p>

      {/* Logo monogram */}
      <Image
        src="/images/logo.webp"
        alt={`Logo ${wedding.bride.nickname} & ${wedding.groom.nickname}`}
        width={480}
        height={480}
        priority
        className="mx-auto mt-6 w-44 drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]"
      />

      {/* <h2
        className="gold-text mt-4 text-5xl leading-snug"
        style={{ fontFamily: "var(--font-script)" }}
      >
        {wedding.bride.nickname} <span className="italic">&amp;</span>{" "}
        {wedding.groom.nickname}
      </h2> */}
      <Divider className="mx-auto mt-4 w-40" />
      <p className="mt-3 text-sm tracking-widest text-cream-dim">
        {wedding.dateLong}
      </p>
    </Section>
  );
}
