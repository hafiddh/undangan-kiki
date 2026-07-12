"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "./Section";
import VerifiedBadge from "./VerifiedBadge";
import GoogleLoginButton from "./GoogleLoginButton";
import { useToast } from "./Toast";
import { createClient } from "@/lib/supabase/client";
import { submitWish } from "@/app/actions/wishes";
import type { Wish } from "@/lib/supabase/types";

type Profile = { name: string; avatarUrl: string | null } | null;

function fmtWaktu(iso: string) {
  const d = new Date(iso);
  const tz = "Asia/Jakarta";
  const tanggal = d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: tz,
  });
  const waktu =
    d.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: tz,
    }) + " WIB";
  return { tanggal, waktu };
}

export default function Wishes() {
  const toast = useToast();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [hp, setHp] = useState(""); // honeypot anti-bot

  const loadWishes = () => {
    const supabase = createClient();
    supabase
      .from("wishes")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setWishes((data as Wish[]) ?? []));
  };

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const m = user.user_metadata ?? {};
        setProfile({
          name: (m.full_name || m.name || user.email || "Tamu") as string,
          avatarUrl: (m.avatar_url || m.picture || null) as string | null,
        });
      }
    });
    loadWishes();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = profile?.name ?? name.trim();
    if (!finalName || !message.trim()) return;
    setBusy(true);
    const res = await submitWish({
      name: finalName,
      message: message.trim(),
      hp,
    });
    setBusy(false);
    if (!res.ok) {
      toast(res.error, "error");
      return;
    }
    setMessage("");
    if (res.approved) {
      toast("Ucapan terkirim ♥");
      loadWishes();
    } else {
      toast("Ucapan menunggu persetujuan admin", "info");
    }
  };

  return (
    <Section id="wishes" tone="panel" texture divider="pembatas-4" flower={1} flowerSide="left" className="px-6">
      <h2 className="section-title">Wishes</h2>
      <div className="gold-panel mt-8 px-6 py-8">
        <form onSubmit={submit} className="space-y-3">
          {/* Honeypot — tersembunyi dari manusia, hanya bot yang mengisi */}
          <input
            type="text"
            name="website"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          {profile ? (
            <div className="flex items-center justify-between rounded-xl border border-gold/30 bg-void/40 px-4 py-2.5">
              <span className="flex items-center gap-2 text-sm text-cream">
                {profile.avatarUrl && (
                  <Image
                    src={profile.avatarUrl}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                    unoptimized
                  />
                )}
                {profile.name}
                <VerifiedBadge showLabel={false} />
              </span>
              <span className="text-[0.7rem] text-cream-dim">Google</span>
            </div>
          ) : (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nama Anda"
                className="w-full rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-gold focus:outline-none"
              />
              <GoogleLoginButton
                next="/#wishes"
                label="Login Google (opsional) — dapat centang terverifikasi"
                className="w-full !text-xs"
              />
            </>
          )}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            placeholder="Tulis doa & ucapan terbaik Anda…"
            className="w-full resize-none rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="shimmer w-full rounded-xl px-4 py-3 text-sm font-bold tracking-widest text-void disabled:opacity-60"
          >
            {busy ? "Mengirim…" : "Kirim Ucapan"}
          </button>
        </form>

        <ul className="mt-8 max-h-80 space-y-4 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mounted &&
            wishes.map((wish) => (
              <li
                key={wish.id}
                className="rounded-xl border border-gold/20 bg-void/40 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-gold-bright">
                    {wish.avatar_url && (
                      <Image
                        src={wish.avatar_url}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full object-cover"
                        unoptimized
                      />
                    )}
                    {wish.name}
                    {wish.verified && <VerifiedBadge showLabel={false} />}
                  </p>
                  <div className="shrink-0 text-right text-[0.65rem] leading-tight text-cream-dim/60">
                    <span className="block">{fmtWaktu(wish.created_at).tanggal}</span>
                    <span className="block">{fmtWaktu(wish.created_at).waktu}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-cream-dim">
                  {wish.message}
                </p>
              </li>
            ))}
          {mounted && wishes.length === 0 && (
            <li className="text-center text-sm text-cream-dim">
              Jadilah yang pertama memberi ucapan ♥
            </li>
          )}
        </ul>
      </div>
    </Section>
  );
}
