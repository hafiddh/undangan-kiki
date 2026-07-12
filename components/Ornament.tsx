// Ornamen SVG emas reusable — semua digambar sendiri (line-art stroke gold)

export function FloralCorner({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
      fill="none"
      stroke="#d4af37"
      strokeWidth="1.1"
    >
      <path d="M8 8 q60 10 90 55 q24 36 20 90" opacity="0.7" />
      <path d="M8 30 q45 15 66 52 q16 28 14 66" opacity="0.4" stroke="#8a7440" />
      {/* bunga besar */}
      <g opacity="0.9">
        <circle cx="52" cy="46" r="5" fill="#d4af37" opacity="0.5" />
        <path d="M52 26 q10 10 0 20 q-10 -10 0 -20z" />
        <path d="M72 46 q-10 10 -20 0 q10 -10 20 0z" />
        <path d="M52 66 q-10 -10 0 -20 q10 10 0 20z" />
        <path d="M32 46 q10 -10 20 0 q-10 10 -20 0z" />
        <path d="M38 32 q9 2 14 14" opacity="0.6" />
        <path d="M66 32 q-9 2 -14 14" opacity="0.6" />
      </g>
      {/* daun sepanjang batang */}
      <path d="M85 78 q14 -4 18 -18 q-16 2 -18 18z" opacity="0.8" />
      <path d="M104 108 q15 0 22 -13 q-17 -2 -22 13z" opacity="0.6" />
      <path d="M114 145 q14 4 24 -6 q-14 -8 -24 6z" opacity="0.5" />
      {/* sparkle */}
      <g fill="#f5e6a8" stroke="none">
        <path d="M140 40 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" opacity="0.9" />
        <circle cx="160" cy="90" r="1.6" opacity="0.7" />
        <circle cx="120" cy="20" r="1.2" opacity="0.6" />
      </g>
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="#d4af37"
    >
      <path d="M10 12 h60" strokeWidth="0.8" opacity="0.6" />
      <path d="M130 12 h60" strokeWidth="0.8" opacity="0.6" />
      <path d="M100 4 q6 8 0 16 q-6 -8 0 -16z" strokeWidth="1.1" />
      <circle cx="85" cy="12" r="1.5" fill="#d4af37" stroke="none" />
      <circle cx="115" cy="12" r="1.5" fill="#d4af37" stroke="none" />
    </svg>
  );
}

export function LaurelFrame({ className = "" }: { className?: string }) {
  // setengah lingkaran daun untuk dasar foto oval
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      aria-hidden
      fill="none"
      stroke="#d4af37"
      strokeWidth="1.1"
    >
      <path d="M30 18 q70 52 140 0" opacity="0.7" />
      <g opacity="0.9">
        <path d="M55 34 q8 -12 16 -3 q-10 9 -16 3z" />
        <path d="M85 44 q8 -12 16 -3 q-10 9 -16 3z" />
        <path d="M115 44 q-8 -12 -16 -3 q10 9 16 3z" transform="translate(30 0)" />
        <path d="M60 26 q-8 -12 -16 -3 q10 9 16 3z" transform="translate(70 14)" />
      </g>
      <circle cx="100" cy="50" r="2" fill="#d4af37" stroke="none" />
    </svg>
  );
}
