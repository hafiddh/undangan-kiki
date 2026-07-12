"use client";

import Image from "next/image";
import { wedding } from "@/data/wedding";
import Sparkles from "./Sparkles";

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
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 448px) 100vw, 448px"
        className="object-cover"
      />

      {/* Scrim gelap: atas & bawah pekat (vignette) agar teks & tombol terbaca */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/85 via-transparent to-void/95" />

      {/* Bintang sparkle latar — tipis */}
      <Sparkles />

      {/* Ornamen bunga sudut — 4 pojok. Sumber: bunga padat di kanan-bawah. */}
      <Image
        src="/images/bunga-atas-korner.webp"
        alt=""
        width={340}
        height={420}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 w-28 -scale-100 opacity-60"
      />
      <Image
        src="/images/bunga-atas-korner.webp"
        alt=""
        width={340}
        height={420}
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-20 w-28 -scale-y-100 opacity-60"
      />
      <Image
        src="/images/bunga-atas-korner.webp"
        alt=""
        width={340}
        height={420}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-20 w-36 -scale-x-100 opacity-60"
      />
      <Image
        src="/images/bunga-atas-korner.webp"
        alt=""
        width={340}
        height={420}
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-20 w-36 opacity-60"
      />

      {/* Kaligrafi Bismillah atas */}
      <Image
        src="/images/bismillah.webp"
        alt="Bismillahirrahmanirrahim"
        width={320}
        height={110}
        loading="eager"
        className="animate-fade-up pointer-events-none relative z-20 mx-auto mt-6 w-48 opacity-95"
      />

      {/* Judul atas — The Wedding Of + nama + tanggal */}
      <div className="relative z-20 mt-5 flex flex-col items-center px-6">
        <p
          className="animate-fade-up text-[0.7rem] uppercase tracking-[0.4em] text-cream/85"
          style={{ animationDelay: "0.1s" }}
        >
          The Wedding Of
        </p>
        <h1
          className="gold-text animate-fade-up mt-0.5 flex items-baseline justify-center gap-1 overflow-visible px-4 pt-6 pb-2 leading-[1.35]"
          style={{ fontFamily: "var(--font-script)", animationDelay: "0.2s" }}
        >
          <span className="px-1 text-[3.5rem]">{wedding.bride.nickname}</span>
          <span className="text-3xl">&amp;</span>
          <span className="px-1 text-[3.5rem]">{wedding.groom.nickname}</span>
        </h1>
        <p
          className="animate-fade-up -mt-1 text-xl tracking-[0.4em] text-gold"
          style={{ fontFamily: "var(--font-display)", animationDelay: "0.3s" }}
        >
          {wedding.dateDisplay}
        </p>
      </div>

      {/* Bunga sudut bawah — membingkai area tombol */}
      {/* <Image
        src="/images/bunga-kiri.webp"
        alt=""
        width={190}
        height={640}
        loading="eager"
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-0 z-10 w-24 opacity-70"
      />
      <Image
        src="/images/bunga-kanan.webp"
        alt=""
        width={190}
        height={640}
        loading="eager"
        aria-hidden
        className="pointer-events-none absolute -bottom-2 right-0 z-10 w-24 opacity-70"
      /> */}

      {/* Konten bawah */}
      <div className="relative z-20 mt-auto flex flex-col items-center px-6 pb-12">
        <Image
          src="/images/pembatas-bawah.webp"
          alt=""
          width={320}
          height={40}
          aria-hidden
          className="animate-fade-up pointer-events-none w-40 opacity-80"
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
