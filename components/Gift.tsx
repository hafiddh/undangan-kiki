"use client";

import { useState } from "react";
import Image from "next/image";
import { wedding, type GiftAccount } from "@/data/wedding";
import Section from "./Section";

function AccountRow({ account }: { account: GiftAccount }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gold/25 bg-void/40 p-3">
      {/* Logo bank — chip putih supaya logo warna tetap kebaca di latar gelap */}
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white p-1.5">
        <Image
          src={account.logo}
          alt={account.bank}
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-gold">
          {account.bank}
        </p>
        <p className="gold-text text-lg leading-tight tracking-wide tabular-nums">
          {account.number}
        </p>
        <p className="truncate text-[0.7rem] text-cream-dim">
          a.n. {account.holder}
        </p>
      </div>

      <button
        onClick={copy}
        aria-label={`Salin nomor ${account.bank}`}
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-gold/50 px-3 py-2 text-[0.7rem] font-semibold text-gold transition-colors hover:bg-gold/10"
      >
        <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 012-2h10" />
        </svg>
        {copied ? "✓" : "Salin"}
      </button>
    </div>
  );
}

export default function Gift() {
  return (
    <Section id="gift" tone="void" divider="pembatas-3" corner="bunga" className="px-6">
      <h2 className="section-title">Wedding Gift</h2>
      <div className="gold-panel mt-8 px-5 py-7">
        <p className="text-center text-sm leading-relaxed text-cream-dim">
          Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberi tanda
          kasih, dapat melalui:
        </p>
        <div className="mt-5 space-y-3">
          {wedding.gifts.map((account) => (
            <AccountRow key={account.bank} account={account} />
          ))}
        </div>
      </div>
    </Section>
  );
}
