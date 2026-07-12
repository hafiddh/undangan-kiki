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

export function CornerVine({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  // Sulur bunga sudut yang halus — lebih ringan dari FloralCorner
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
      fill="none"
      stroke="#d4af37"
      strokeWidth="0.9"
    >
      <path d="M4 4 q40 6 58 34 q14 22 12 54" opacity="0.55" />
      <path d="M4 20 q30 8 44 32" opacity="0.3" stroke="#8a7440" />
      {/* daun kecil */}
      <path d="M30 30 q10 -6 16 2 q-10 8 -16 -2z" opacity="0.7" />
      <path d="M50 52 q11 -3 16 6 q-11 5 -16 -6z" opacity="0.55" />
      <path d="M62 82 q10 1 14 11 q-11 1 -14 -11z" opacity="0.45" />
      {/* bunga kecil */}
      <g opacity="0.85">
        <circle cx="20" cy="18" r="2.4" fill="#d4af37" stroke="none" opacity="0.5" />
        <path d="M20 10 q5 5 0 10 q-5 -5 0 -10z" />
        <path d="M28 18 q-5 5 -10 0 q5 -5 10 0z" />
      </g>
      {/* sparkle */}
      <g fill="#f5e6a8" stroke="none">
        <path d="M74 26 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z" opacity="0.85" />
        <circle cx="92" cy="58" r="1.1" opacity="0.6" />
      </g>
    </svg>
  );
}

export function SectionDivider({ className = "" }: { className?: string }) {
  // Pembatas section dengan motif tengah — lebih ornate dari Divider
  return (
    <svg
      viewBox="0 0 240 40"
      className={className}
      aria-hidden
      fill="none"
      stroke="#d4af37"
    >
      {/* garis sulur kiri & kanan */}
      <path d="M20 20 q26 0 44 0" strokeWidth="0.8" opacity="0.5" />
      <path d="M176 20 q26 0 44 0" strokeWidth="0.8" opacity="0.5" />
      <path d="M64 20 q10 -8 18 0 q-8 6 -18 0z" strokeWidth="0.9" opacity="0.7" />
      <path d="M176 20 q-10 -8 -18 0 q8 6 18 0z" strokeWidth="0.9" opacity="0.7" />
      {/* berlian tengah + kelopak */}
      <g strokeWidth="1">
        <path d="M120 6 l10 14 -10 14 -10 -14z" opacity="0.9" />
        <path d="M120 12 l5 8 -5 8 -5 -8z" opacity="0.6" stroke="#8a7440" />
      </g>
      <circle cx="120" cy="20" r="2" fill="#f5e6a8" stroke="none" opacity="0.9" />
      {/* titik-titik ujung */}
      <circle cx="98" cy="20" r="1.4" fill="#d4af37" stroke="none" opacity="0.7" />
      <circle cx="142" cy="20" r="1.4" fill="#d4af37" stroke="none" opacity="0.7" />
    </svg>
  );
}

export function MonogramFrame({ className = "" }: { className?: string }) {
  // Bingkai tipis berlian untuk aksen foto/nama
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      aria-hidden
      fill="none"
      stroke="#d4af37"
      strokeWidth="0.8"
    >
      <path d="M60 4 L112 80 60 156 8 80 Z" opacity="0.5" />
      <path d="M60 14 L102 80 60 146 18 80 Z" opacity="0.28" stroke="#8a7440" />
      <g fill="#d4af37" stroke="none" opacity="0.8">
        <circle cx="60" cy="4" r="1.6" />
        <circle cx="60" cy="156" r="1.6" />
        <circle cx="8" cy="80" r="1.6" />
        <circle cx="112" cy="80" r="1.6" />
      </g>
    </svg>
  );
}

export function WayangGunungan({ className = "" }: { className?: string }) {
  // Gunungan/kayon wayang — line-art emas, simetris. Aksen kartu couple.
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      aria-hidden
      fill="none"
      stroke="#d4af37"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      {/* siluet gunungan */}
      <path
        d="M60 6
           C58 24 40 30 30 46
           C18 64 18 88 26 108
           C14 120 10 140 16 160
           C8 176 8 198 20 214
           C30 228 44 236 60 244
           C76 236 90 228 100 214
           C112 198 112 176 104 160
           C110 140 106 120 94 108
           C102 88 102 64 90 46
           C80 30 62 24 60 6 Z"
        opacity="0.85"
      />
      {/* garis dalam sejajar */}
      <path
        d="M60 20 C58 34 44 40 36 54 C26 70 26 90 34 108 C24 122 20 140 26 158
           C18 174 20 194 30 208 C40 222 50 228 60 234
           C70 228 80 222 90 208 C100 194 102 174 94 158
           C100 140 96 122 86 108 C94 90 94 70 84 54 C76 40 62 34 60 20 Z"
        opacity="0.4"
        stroke="#8a7440"
      />
      {/* gapura / pintu tengah */}
      <path d="M50 150 q10 -14 20 0 v54 h-20 z" opacity="0.7" />
      <path d="M56 168 h8 v34 h-8 z" opacity="0.5" stroke="#8a7440" />
      {/* pohon hayat sederhana */}
      <path d="M60 60 v70" opacity="0.6" />
      <path d="M60 78 q-14 -6 -20 -20 M60 78 q14 -6 20 -20" opacity="0.55" />
      <path d="M60 100 q-16 -4 -24 -18 M60 100 q16 -4 24 -18" opacity="0.5" />
      <path d="M60 122 q-14 -2 -20 -14 M60 122 q14 -2 20 -14" opacity="0.45" />
      {/* sayap / ukiran samping */}
      <path d="M30 108 q-10 8 -8 22 M90 108 q10 8 8 22" opacity="0.5" />
      {/* mustika atas */}
      <g fill="#f5e6a8" stroke="none">
        <circle cx="60" cy="12" r="2" opacity="0.9" />
        <circle cx="60" cy="52" r="1.4" opacity="0.7" />
      </g>
    </svg>
  );
}

export function FrameCorner({ className = "" }: { className?: string }) {
  // Sudut bingkai emas — dua garis + kelopak kecil
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
      fill="none"
      stroke="#d4af37"
      strokeWidth="1.1"
    >
      <path d="M4 20 V8 a4 4 0 0 1 4-4 h12" opacity="0.9" />
      <path d="M10 24 V14 a4 4 0 0 1 4-4 h10" opacity="0.5" stroke="#8a7440" />
      <path d="M8 8 q10 2 12 12 q-10 -2 -12 -12z" opacity="0.8" />
      <circle cx="8" cy="8" r="1.4" fill="#d4af37" stroke="none" />
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
