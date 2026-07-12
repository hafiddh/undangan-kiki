import Image from "next/image";
import InvitationShell from "@/components/InvitationShell";
import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import QuoteSection from "@/components/QuoteSection";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import LoveStory from "@/components/LoveStory";
import Rsvp from "@/components/Rsvp";
import Gift from "@/components/Gift";
import Wishes from "@/components/Wishes";
import { wedding } from "@/data/wedding";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) {
  const { to } = await searchParams;
  const guest = to?.trim() || "Bapak/Ibu/Saudara/i";

  return (
    <InvitationShell guest={guest}>
      <Hero />
      <QuoteSection />
      <Couple />
      <LoveStory />
      <Gallery />
      <Countdown />
      <Events />
      <Rsvp />
      <Gift />
      <Wishes />
      <footer className="px-6 pb-10 pt-20 text-center">
        <Image
          src="/images/logo.webp"
          alt={`Logo ${wedding.bride.nickname} & ${wedding.groom.nickname}`}
          width={480}
          height={480}
          className="mx-auto mb-4 w-32 opacity-90 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        />
        <p
          className="gold-text text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {wedding.bride.nickname} &amp; {wedding.groom.nickname}
        </p>
        <p className="mt-2 text-xs tracking-widest text-cream-dim">
          Terima kasih atas doa &amp; restu Anda
        </p>
      </footer>
    </InvitationShell>
  );
}
