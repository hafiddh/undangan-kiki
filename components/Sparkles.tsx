// Bintang sparkle latar — tipis, dekoratif. Posisi statik supaya
// server & client render sama (tak ada hydration mismatch).
const STARS = [
  { top: "8%", left: "12%", size: 3, dur: "4s", delay: "0s" },
  { top: "14%", left: "82%", size: 2, dur: "5s", delay: "1.2s" },
  { top: "22%", left: "48%", size: 2, dur: "3.5s", delay: "0.6s" },
  { top: "30%", left: "20%", size: 3, dur: "4.5s", delay: "2s" },
  { top: "34%", left: "70%", size: 2, dur: "5.5s", delay: "0.3s" },
  { top: "42%", left: "90%", size: 2, dur: "4s", delay: "1.8s" },
  { top: "48%", left: "8%", size: 3, dur: "3.8s", delay: "1s" },
  { top: "55%", left: "60%", size: 2, dur: "5s", delay: "2.4s" },
  { top: "60%", left: "35%", size: 2, dur: "4.2s", delay: "0.9s" },
  { top: "66%", left: "85%", size: 3, dur: "4.8s", delay: "1.5s" },
  { top: "72%", left: "18%", size: 2, dur: "5.2s", delay: "0.4s" },
  { top: "78%", left: "52%", size: 2, dur: "3.6s", delay: "2.1s" },
  { top: "84%", left: "78%", size: 3, dur: "4.4s", delay: "1.3s" },
  { top: "18%", left: "34%", size: 2, dur: "5s", delay: "2.6s" },
  { top: "44%", left: "44%", size: 2, dur: "4.6s", delay: "0.7s" },
  { top: "88%", left: "28%", size: 2, dur: "4s", delay: "1.9s" },
  { top: "10%", left: "60%", size: 2, dur: "4.3s", delay: "0.2s" },
  { top: "26%", left: "88%", size: 3, dur: "5.1s", delay: "1.6s" },
  { top: "38%", left: "16%", size: 2, dur: "4.7s", delay: "2.3s" },
  { top: "52%", left: "92%", size: 2, dur: "3.9s", delay: "0.5s" },
  { top: "64%", left: "8%", size: 3, dur: "5.3s", delay: "1.1s" },
  { top: "70%", left: "68%", size: 2, dur: "4.1s", delay: "2.7s" },
  { top: "82%", left: "44%", size: 2, dur: "4.9s", delay: "0.8s" },
  { top: "94%", left: "72%", size: 3, dur: "4.4s", delay: "1.7s" },
];

export default function Sparkles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-70"
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
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
