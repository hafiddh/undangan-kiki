"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Cover from "./Cover";
import MusicPlayer from "./MusicPlayer";
import BottomNav from "./BottomNav";
import Sparkles from "./Sparkles";

// Gate undangan: sebelum dibuka hanya cover yang tampil + scroll lock.
// Setelah dibuka: konten reveal + musik mulai (user gesture).
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

  return (
    <div className="relative mx-auto min-h-dvh max-w-md bg-void shadow-[0_0_80px_rgba(212,175,55,0.06)]">
      {/* Film grain global — tekstur halus di atas seluruh undangan */}
      <div className="grain" aria-hidden />
      {!opened ? (
        <Cover guest={guest} onOpen={() => setOpened(true)} />
      ) : (
        <>
          <MusicPlayer autoStart={opened} />
          {/* Sparkle emas sebagai latar belakang — di belakang semua segment */}
          <Sparkles dense className="sparkle-dense z-0 opacity-90" />
          <main className="animate-fade-up relative z-10 pb-28">{children}</main>
          {/* Ornamen sudut dasar halaman — nempel bawah, di belakang konten */}
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
  );
}
