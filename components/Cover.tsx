"use client";

import Image from "next/image";
import { wedding } from "@/data/wedding";

export default function Cover({
  guest,
  onOpen,
}: {
  guest: string;
  onOpen: () => void;
}) {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden text-center">
      {/* Foto couple full-bleed — judul & nama sudah menyatu di foto */}
      <Image
        src="/images/bg-depan.webp"
        alt={`${wedding.bride.nickname} & ${wedding.groom.nickname}`}
        fill
        priority
        sizes="(max-width: 448px) 100vw, 448px"
        className="object-cover"
      />

      {/* Scrim gelap: atas tipis, bawah pekat agar teks & tombol terbaca */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/95" />

      {/* Ornamen floral atas */}
      <Image
        src="/images/ornamen-atas.webp"
        alt=""
        width={320}
        height={110}
        aria-hidden
        className="animate-fade-up pointer-events-none relative z-10 mx-auto mt-6 w-44 opacity-90"
      />

      {/* Bunga sudut bawah — membingkai area tombol */}
      <Image
        src="/images/bunga-kiri.webp"
        alt=""
        width={190}
        height={640}
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-0 z-10 w-24 opacity-70"
      />
      <Image
        src="/images/bunga-kanan.webp"
        alt=""
        width={190}
        height={640}
        aria-hidden
        className="pointer-events-none absolute -bottom-2 right-0 z-10 w-24 opacity-70"
      />

      {/* Konten bawah */}
      <div className="relative z-20 mt-auto flex flex-col items-center px-6 pb-12">
        <p
          className="animate-fade-up text-2xl tracking-[0.35em] text-gold-bright"
          style={{ fontFamily: "var(--font-display)", animationDelay: "0.2s" }}
        >
          {wedding.dateDisplay}
        </p>

        <Image
          src="/images/pembatas-bawah.webp"
          alt=""
          width={320}
          height={40}
          aria-hidden
          className="animate-fade-up pointer-events-none mt-4 w-40 opacity-80"
        />

        <div
          className="animate-fade-up mt-6"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-gold">
            Kepada Yth.
          </p>
          <p className="mt-1 text-base text-cream">{guest}</p>
        </div>

        <button
          onClick={onOpen}
          className="shimmer animate-fade-up mt-7 rounded-full px-9 py-3 text-sm font-bold tracking-widest text-void shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          style={{ animationDelay: "0.7s" }}
        >
          BUKA UNDANGAN ♥
        </button>
      </div>
    </section>
  );
}
