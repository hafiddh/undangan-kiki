"use client";

import { useEffect, useState } from "react";
import Cover from "./Cover";
import MusicPlayer from "./MusicPlayer";
import BottomNav from "./BottomNav";

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
      {!opened ? (
        <Cover guest={guest} onOpen={() => setOpened(true)} />
      ) : (
        <>
          <MusicPlayer autoStart={opened} />
          <main className="animate-fade-up pb-28">{children}</main>
          <BottomNav />
        </>
      )}
    </div>
  );
}
