// Badge ✓ terverifikasi — dipakai di kartu ucapan & baris RSVP admin.
export default function VerifiedBadge({
  label = "Terverifikasi",
  showLabel = true,
}: {
  label?: string;
  showLabel?: boolean;
}) {
  return (
    <span
      title={label}
      className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[0.6rem] font-semibold text-gold"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 shrink-0"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2l2.4 1.8 3 .1 1 2.8 2.4 1.7-.9 2.9.9 2.9-2.4 1.7-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.6l.9-2.9-.9-2.9 2.4-1.7 1-2.8 3-.1L12 2z" />
        <path
          d="M8.5 12.5l2.2 2.2 4.5-4.7"
          fill="none"
          stroke="#0a0806"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showLabel && label}
    </span>
  );
}
