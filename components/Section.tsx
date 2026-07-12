/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Reveal from "./Reveal";
import RandomSparkles from "./RandomSparkles";

type Tone = "void" | "panel";
type Divider =
  | "ornamen"
  | "pembatas-1"
  | "pembatas-2"
  | "pembatas-3"
  | "pembatas-4"
  | false;
type Corner = "bunga" | "bungakorner" | false;
type Flower = 1 | 2 | 3 | false;

// Pembungkus section: tone bg selang-seling + tekstur + ornamen pemisah/sudut.
// Konten tetap dianimasikan lewat Reveal (scroll-in).
export default function Section({
  id,
  tone = "void",
  texture = false,
  divider = "ornamen",
  corner = false,
  flower = false,
  flowerSide = "left",
  topPad = "pt-8",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  texture?: boolean;
  divider?: Divider;
  corner?: Corner;
  flower?: Flower;
  flowerSide?: "left" | "right";
  topPad?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden ${topPad} ${tone === "panel" ? "tone-panel" : "tone-void"
        } ${texture ? "section-texture" : ""}`}
    >
      {/* Sparkle acak latar — sama seperti Hero, tiap section beda pola */}
      <RandomSparkles count={16} className="z-0 opacity-80 sparkle-dense" />

      {/* Ornamen sudut atas — hanya dipakai di Hero (awal) & footer */}
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

      {/* Bunga latar samar di sisi bawah section */}
      {flower && (
        <Image
          src={`/images/bunga-tengah-${flower}.webp`}
          alt=""
          width={317}
          height={396}
          aria-hidden
          className={`animate-drift pointer-events-none absolute bottom-6 z-0 w-36 opacity-[0.13] ${
            flowerSide === "right" ? "-right-8 -scale-x-100" : "-left-8"
          }`}
        />
      )}

      <div className="relative z-10">
        {/* Pembatas atas + sparkle kelip di kedua sisi */}
        {divider && (
          <div className="relative mx-auto mb-8 mt-0 w-fit">
            {divider === "ornamen" ? (
              <Image
                src="/images/ornamen-atas.webp"
                alt=""
                width={312}
                height={133}
                aria-hidden
                className="pointer-events-none w-32 opacity-85"
              />
            ) : (
              <Image
                src={`/images/${divider}.webp`}
                alt=""
                width={334}
                height={56}
                aria-hidden
                className="pointer-events-none w-36 opacity-80"
              />
            )}
            <Image
              src="/images/sparkle-1.webp"
              alt=""
              width={92}
              height={56}
              aria-hidden
              className="animate-twinkle-img pointer-events-none absolute -left-7 top-1/2 w-5 -translate-y-1/2"
              style={{ animationDelay: "0.6s" }}
            />
            <Image
              src="/images/sparkle-2.webp"
              alt=""
              width={92}
              height={56}
              aria-hidden
              className="animate-twinkle-img pointer-events-none absolute -right-7 top-1/2 w-4 -translate-y-1/2"
            />
          </div>
        )}

        <Reveal id={id} className={className}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
