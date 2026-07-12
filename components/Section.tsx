/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Reveal from "./Reveal";
import { CornerVine, SectionDivider } from "./Ornament";

type Tone = "void" | "panel";
type Divider = "svg" | "webp" | false;
type Corner = "vine" | "bunga" | "bungakorner" | false;

// Pembungkus section: tone bg selang-seling + tekstur + ornamen pemisah/sudut.
// Konten tetap dianimasikan lewat Reveal (scroll-in).
export default function Section({
  id,
  tone = "void",
  texture = false,
  divider = "svg",
  corner = false,
  topPad = "pt-16",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  texture?: boolean;
  divider?: Divider;
  corner?: Corner;
  topPad?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden ${topPad} ${tone === "panel" ? "tone-panel" : "tone-void"
        } ${texture ? "section-texture" : ""}`}
    >
      {/* Ornamen sudut atas */}
      {corner === "vine" && (
        <>
          <CornerVine className="animate-drift pointer-events-none absolute left-0 top-0 z-0 w-20 opacity-50" />
          <CornerVine
            flip
            className="animate-drift pointer-events-none absolute right-0 top-0 z-0 w-20 opacity-50"
          />
        </>
      )}
      {corner === "bungakorner" && (
        <>
          <Image
            src="/images/bunga-atas-korner.webp"
            alt=""
            width={340}
            height={420}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-0 w-16 -scale-100 opacity-60"
          />
          <Image
            src="/images/bunga-atas-korner.webp"
            alt=""
            width={340}
            height={420}
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 z-0 w-16 -scale-y-100 opacity-60"
          />
        </>
      )}
      {corner === "bunga" && (
        <>
          <Image
            src="/images/bunga-kiri.webp"
            alt=""
            width={190}
            height={640}
            aria-hidden
            className="animate-drift pointer-events-none absolute -left-2 top-6 z-0 w-16 opacity-25"
          />
          <Image
            src="/images/bunga-kanan.webp"
            alt=""
            width={190}
            height={640}
            aria-hidden
            className="animate-drift pointer-events-none absolute -right-2 top-6 z-0 w-16 opacity-25"
          />
        </>
      )}

      <div className="relative z-10">
        {/* Pembatas atas */}
        {divider === "svg" && (
          <SectionDivider className="mx-auto mb-2 w-56 opacity-90" />
        )}
        {divider === "webp" && (
          <Image
            src="/images/pembatas-bawah.webp"
            alt=""
            width={320}
            height={40}
            aria-hidden
            className="pointer-events-none mx-auto mb-2 w-44 opacity-70"
          />
        )}

        <Reveal id={id} className={className}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
