"use client";

import { useState } from "react";
import { wedding, type GiftAccount } from "@/data/wedding";
import Section from "./Section";

function AccountCard({ account }: { account: GiftAccount }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="rounded-2xl border border-gold/30 bg-void/40 p-5 text-center">
      <p className="text-sm font-bold tracking-[0.3em] text-gold">{account.bank}</p>
      <p
        className="gold-text mt-3 text-2xl tracking-[0.15em] tabular-nums"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {account.number}
      </p>
      <p className="mt-1 text-xs text-cream-dim">a.n. {account.holder}</p>
      <button
        onClick={copy}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-5 py-2 text-xs font-semibold tracking-wider text-gold transition-colors hover:bg-gold/10"
      >
        <svg viewBox="0 0 24 24" className="w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 012-2h10" />
        </svg>
        {copied ? "Tersalin ✓" : "Salin Nomor"}
      </button>
    </div>
  );
}

export default function Gift() {
  return (
    <Section id="gift" tone="void" divider="webp" corner="bunga" className="px-6">
      <h2 className="section-title">Wedding Gift</h2>
      <div className="gold-panel mt-8 px-6 py-8">
        <p className="text-center text-sm leading-relaxed text-cream-dim">
          Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberi tanda
          kasih, dapat melalui:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {wedding.gifts.map((account) => (
            <AccountCard key={account.bank} account={account} />
          ))}
        </div>
      </div>
    </Section>
  );
}
