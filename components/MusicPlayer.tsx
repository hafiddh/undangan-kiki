"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

// Player floating. Autoplay dipicu prop `autoStart` (setelah user klik
// "Buka Undangan" — legal karena user gesture). Kalau public/music.mp3
// belum ada, tombol disembunyikan.
export default function MusicPlayer({ autoStart }: { autoStart: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!autoStart) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5; // mulai di 50%
    audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [autoStart]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.5;
      audio.play().then(() => setPlaying(true), () => {});
    }
  };

  if (!available) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.music}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        className="fixed right-3 top-3 z-[70] flex h-9 w-9 items-center justify-center rounded-full border border-gold/70 bg-void/90 text-gold shadow-[0_0_16px_rgba(212,175,55,0.3)] backdrop-blur transition-transform hover:scale-110 md:right-[calc(50%-13.5rem)] lg:right-[calc(16.6667%-13.5rem)]"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="w-4" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <circle cx="8" cy="18" r="3" />
            <path d="M11 18V4l8-2v13" />
            <circle cx="16" cy="15" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}
