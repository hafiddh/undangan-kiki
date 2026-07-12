"use client";

import { useState } from "react";
import Image from "next/image";
import { wedding, type GiftAccount } from "@/data/wedding";
import { useToast } from "./Toast";
import Section from "./Section";

function AccountRow({ account }: { account: GiftAccount }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);
      toast("Nomor rekening tersalin");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Gagal menyalin nomor", "error");
    }
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
        <p className="gold-text text-base leading-tight tracking-normal tabular-nums">
          {account.number}
        </p>
        <p className="truncate text-[0.7rem] text-cream-dim">
          a.n. {account.holder}
        </p>
      </div>

      <button
        onClick={copy}
        aria-label={`Salin nomor ${account.bank}`}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 012-2h10" />
          </svg>
        )}
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
