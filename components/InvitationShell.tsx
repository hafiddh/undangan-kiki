"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { wedding } from "@/data/wedding";
import Cover from "./Cover";
import MusicPlayer from "./MusicPlayer";
import BottomNav from "./BottomNav";
import Sparkles from "./Sparkles";

// Gate undangan: sebelum dibuka hanya cover yang tampil + scroll lock.
// Setelah dibuka: konten reveal + musik mulai (user gesture).
// Desktop (lg+): saat sudah dibuka, layout jadi split-screen — panel kiri
// diam (cover) + kolom undangan yang scroll di kanan.
export default function InvitationShell({
  guest,
  children,
}: {
  guest: string;
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const rightCol = opened
    ? "relative mx-auto min-h-dvh w-full max-w-md bg-void shadow-[0_0_80px_rgba(212,175,55,0.06)] md:border-x md:border-gold/20 lg:mx-0 lg:ml-[66.6667%] lg:w-1/3 lg:max-w-none lg:border-x-0"
    : "relative mx-auto min-h-dvh w-full max-w-md bg-void shadow-[0_0_80px_rgba(212,175,55,0.06)] md:border-x md:border-gold/20 md:shadow-[0_0_140px_rgba(0,0,0,0.85)]";

  return (
    <>
      {/* Backdrop tablet / desktop-belum-split — floral + cover blur */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
      >
        <Image
          src="/images/bg-depan.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-25 blur-2xl"
        />
        <div className="absolute inset-0 bg-void/85" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(65% 55% at 50% 38%, rgba(212,175,55,0.10), transparent 70%)",
          }}
        />
        <Image src="/images/bunga-atas-korner.webp" alt="" width={340} height={420} className="absolute left-0 top-0 w-40 -scale-100 opacity-25" />
        <Image src="/images/bunga-atas-korner.webp" alt="" width={340} height={420} className="absolute right-0 top-0 w-40 -scale-y-100 opacity-25" />
        <Image src="/images/bunga-atas-korner.webp" alt="" width={340} height={420} className="absolute bottom-0 left-0 w-40 -scale-x-100 opacity-25" />
        <Image src="/images/bunga-atas-korner.webp" alt="" width={340} height={420} className="absolute bottom-0 right-0 w-40 opacity-25" />
      </div>

      {/* Panel kiri desktop — hanya saat sudah dibuka & lg+ */}
      {opened && (
        <aside className="fixed inset-y-0 left-0 z-0 hidden w-2/3 overflow-hidden border-r border-gold/15 lg:block">
          <Image
            src="/images/bg-depan.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 67vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-void/85 via-void/65 to-void/90" />
          {/* Floral sudut panel */}
          <Image src="/images/bunga-atas-korner.webp" alt="" width={340} height={420} aria-hidden className="pointer-events-none absolute left-0 top-0 w-28 -scale-100 opacity-40 xl:w-40" />
          <Image src="/images/bunga-atas-korner.webp" alt="" width={340} height={420} aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-28 opacity-40 xl:w-40" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-center">
            <Image
              src="/images/bismillah.webp"
              alt="Bismillahirrahmanirrahim"
              width={320}
              height={110}
              className="w-40 opacity-90"
            />
            <Image
              src="/images/logo.webp"
              alt={`Logo ${wedding.bride.nickname} & ${wedding.groom.nickname}`}
              width={480}
              height={480}
              className="mt-6 w-40 drop-shadow-[0_0_25px_rgba(212,175,55,0.25)] xl:w-48"
            />
            <h1
              className="gold-text mt-4 whitespace-nowrap px-4 text-6xl leading-tight xl:text-7xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {wedding.bride.nickname} &amp; {wedding.groom.nickname}
            </h1>
            <Image
              src="/images/pembatas-1.webp"
              alt=""
              width={334}
              height={56}
              aria-hidden
              className="mt-4 w-44 opacity-80"
            />
            <p className="mt-3 text-sm tracking-[0.3em] text-cream-dim">
              {wedding.dateLong}
            </p>
          </div>
        </aside>
      )}

      <div className={rightCol}>
        <div className="relative mx-auto min-h-dvh w-full max-w-md">
          {/* Film grain global — tekstur halus di atas seluruh undangan */}
          <div className="grain" aria-hidden />
          {!opened ? (
            <Cover guest={guest} onOpen={() => setOpened(true)} />
          ) : (
            <>
              <MusicPlayer autoStart={opened} />
              {/* Sparkle emas sebagai latar belakang */}
              <Sparkles dense className="sparkle-dense z-0 opacity-90" />
              <main className="animate-fade-up relative z-10 pb-28">
                {children}
              </main>
              {/* Ornamen sudut dasar halaman */}
              <Image
                src="/images/bunga-atas-korner.webp"
                alt=""
                width={340}
                height={420}
                aria-hidden
                className="pointer-events-none absolute bottom-16 left-0 z-0 w-16 -scale-x-100 opacity-60"
              />
              <Image
                src="/images/bunga-atas-korner.webp"
                alt=""
                width={340}
                height={420}
                aria-hidden
                className="pointer-events-none absolute bottom-16 right-0 z-0 w-16 opacity-60"
              />
              <BottomNav />
            </>
          )}
        </div>
      </div>
    </>
  );
}
