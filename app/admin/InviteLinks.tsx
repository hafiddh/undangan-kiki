"use client";

import { useMemo, useState } from "react";
import { wedding } from "@/data/wedding";

type Row = { name: string; url: string };

function waMessage(name: string, url: string) {
  return (
    `Assalamu'alaikum Warahmatullahi Wabarakatuh\n\n` +
    `Kepada Yth.\nBapak/Ibu/Saudara/i *${name}*\n\n` +
    `Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di acara pernikahan kami:\n\n` +
    `*${wedding.groom.nickname} & ${wedding.bride.nickname}*\n${wedding.dateLong}\n\n` +
    `Berikut link undangan lengkapnya:\n${url}\n\n` +
    `Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir. Terima kasih.`
  );
}

export default function InviteLinks() {
  const [raw, setRaw] = useState("");
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  const rows: Row[] = useMemo(() => {
    return raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({
        name,
        url: `${origin}/?to=${encodeURIComponent(name)}`,
      }));
  }, [raw, origin]);

  const copy = async (text: string, idx?: number) => {
    try {
      await navigator.clipboard.writeText(text);
      if (idx === undefined) {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 1500);
      } else {
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1500);
      }
    } catch {}
  };

  const copyAll = () =>
    copy(rows.map((r) => `${r.name}: ${r.url}`).join("\n"));

  return (
    <section className="mt-4 space-y-4">
      <div>
        <label className="text-xs tracking-wider text-cream-dim">
          Daftar nama tamu — satu nama per baris
        </label>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={5}
          placeholder={"Budi Santoso\nKeluarga Besar Ahmad\nPak Andi & Ibu"}
          className="mt-1 w-full resize-y rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/40 focus:border-gold focus:outline-none"
        />
      </div>

      {rows.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs text-cream-dim">{rows.length} link dibuat</p>
            <button
              onClick={copyAll}
              className="rounded-lg border border-gold/40 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
            >
              {copiedAll ? "Tersalin ✓" : "Salin semua"}
            </button>
          </div>

          <ul className="space-y-2">
            {rows.map((r, i) => (
              <li
                key={i}
                className="rounded-xl border border-gold/20 bg-void/40 p-3"
              >
                <p className="text-sm font-semibold text-gold-bright">
                  {r.name}
                </p>
                <p className="mt-0.5 break-all text-xs text-cream-dim">
                  {r.url}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <button
                    onClick={() => copy(r.url, i)}
                    className="rounded-md border border-gold/40 px-2.5 py-1 text-gold hover:bg-gold/10"
                  >
                    {copiedIdx === i ? "Tersalin ✓" : "Salin link"}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      waMessage(r.name, r.url),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-emerald-500/40 px-2.5 py-1 text-emerald-300 hover:bg-emerald-500/10"
                  >
                    Kirim WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
