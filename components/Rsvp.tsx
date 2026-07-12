"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import Select from "./Select";
import VerifiedBadge from "./VerifiedBadge";
import GoogleLoginButton from "./GoogleLoginButton";
import { useToast } from "./Toast";
import { createClient } from "@/lib/supabase/client";
import { submitRsvp, getRsvpStats } from "@/app/actions/rsvp";

type Profile = { name: string; email: string | null } | null;

export default function Rsvp() {
  const toast = useToast();
  const [profile, setProfile] = useState<Profile>(null);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [count, setCount] = useState(1);
  const [sent, setSent] = useState(false);
  const [sentAt, setSentAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [totalHadir, setTotalHadir] = useState(0);
  const [hp, setHp] = useState(""); // honeypot anti-bot

  // Session Google (opsional) + statistik kehadiran saat mount.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const m = user.user_metadata ?? {};
        setProfile({
          name: (m.full_name || m.name || user.email || "Tamu") as string,
          email: user.email ?? null,
        });
      }
    });
    getRsvpStats().then((s) => setTotalHadir(s.total_guests));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = profile?.name ?? name.trim();
    if (!finalName) return;
    setBusy(true);
    const res = await submitRsvp({
      name: finalName,
      attending,
      guest_count: count,
      hp,
    });
    setBusy(false);
    if (!res.ok) {
      toast(res.error, "error");
      return;
    }
    setSent(true);
    setSentAt(
      new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      }),
    );
    toast("Konfirmasi tersimpan ♥");
    getRsvpStats().then((s) => setTotalHadir(s.total_guests));
  };

  return (
    <Section id="rsvp" tone="panel" texture divider="pembatas-4" flower={3} flowerSide="right" className="px-6">
      <h2 className="section-title">RSVP</h2>
      <div className="gold-panel mt-8 px-6 py-8">
        <p className="text-center text-sm text-cream-dim">
          Mohon konfirmasi kehadiran Anda
        </p>
        <p className="mt-2 text-center text-xs text-gold">
          {totalHadir} tamu terkonfirmasi hadir
        </p>

        {sent ? (
          <p className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-4 text-center text-sm text-gold-bright">
            Terima kasih, konfirmasi Anda tersimpan ♥
            <span className="mt-1 block text-[0.7rem] font-normal text-cream-dim">
              {sentAt} WIB
            </span>
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
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
                  {profile.name}
                  <VerifiedBadge showLabel={false} />
                </span>
                <span className="text-[0.7rem] text-cream-dim">Google</span>
              </div>
            ) : (
              <>
                <label className="block">
                  <span className="text-xs tracking-wider text-cream-dim">Nama</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nama Anda"
                    className="mt-1 w-full rounded-xl border border-gold/30 bg-void/60 px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:border-gold focus:outline-none"
                  />
                </label>
                <GoogleLoginButton
                  next="/#rsvp"
                  label="Login Google (opsional) — dapat centang terverifikasi"
                  className="w-full !text-xs"
                />
              </>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                aria-pressed={attending}
                className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                  attending
                    ? "border-gold bg-gold/15 text-gold-bright"
                    : "border-gold/25 text-cream-dim"
                }`}
              >
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                aria-pressed={!attending}
                className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                  !attending
                    ? "border-gold bg-gold/15 text-gold-bright"
                    : "border-gold/25 text-cream-dim"
                }`}
              >
                Berhalangan
              </button>
            </div>

            {attending && (
              <label className="block">
                <span className="text-xs tracking-wider text-cream-dim">
                  Jumlah tamu
                </span>
                <div className="mt-1">
                  <Select
                    value={count}
                    onChange={setCount}
                    options={[1, 2, 3, 4, 5].map((n) => ({
                      value: n,
                      label: `${n} orang`,
                    }))}
                  />
                </div>
              </label>
            )}

            <button
              type="submit"
              disabled={busy}
              className="shimmer w-full rounded-xl px-4 py-3 text-sm font-bold tracking-widest text-void disabled:opacity-60"
            >
              {busy ? "Menyimpan…" : "Kirim Konfirmasi"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
