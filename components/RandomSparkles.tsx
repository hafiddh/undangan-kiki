"use client";

import { useEffect, useState } from "react";

type Star = {
  top: number;
  left: number;
  size: number;
  dur: string;
  delay: string;
};

// Sparkle posisi acak — di-generate di client (useEffect) supaya tak ada
// hydration mismatch. Server & first render kosong, terisi setelah mount.
export default function RandomSparkles({
  count = 18,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        dur: (3 + Math.random() * 3).toFixed(1) + "s",
        delay: (Math.random() * 3).toFixed(1) + "s",
      })),
    );
  }, [count]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            ["--dur" as string]: s.dur,
            ["--delay" as string]: s.delay,
          }}
        />
      ))}
    </div>
  );
}
