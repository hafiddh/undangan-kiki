"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-.96 2.6-2.05 3.4l3.3 2.6c1.93-1.8 3.05-4.4 3.05-7.5 0-.72-.06-1.4-.18-2.05H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3l-.74.57-2.6 2.02C4.9 19.6 8.2 21.8 12 21.8c2.7 0 4.97-.9 6.63-2.4l-3.3-2.6c-.9.6-2.05.96-3.33.96-2.56 0-4.73-1.73-5.5-4.06z"
      />
      <path
        fill="#4A90D9"
        d="M3.26 7.09A9.8 9.8 0 002.2 12c0 1.77.42 3.44 1.06 4.91l3.34-2.6A5.87 5.87 0 016.3 12c0-.5.09-.98.24-1.43l-3.28-2.48z"
      />
      <path
        fill="#FBBC05"
        d="M12 6.18c1.47 0 2.78.5 3.82 1.5l2.86-2.86C16.96 3.2 14.7 2.2 12 2.2 8.2 2.2 4.9 4.4 3.26 7.09l3.28 2.48C7.27 7.9 9.44 6.18 12 6.18z"
      />
    </svg>
  );
}

// Tombol login Google. `next` = path untuk kembali setelah callback.
export default function GoogleLoginButton({
  next = "/",
  label = "Login dengan Google",
  className = "",
}: {
  next?: string;
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
      next,
    )}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) setLoading(false); // sukses → browser redirect, tak balik ke sini
  };

  return (
    <button
      type="button"
      onClick={login}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-void/60 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-gold/10 disabled:opacity-60 ${className}`}
    >
      <GoogleGlyph />
      {loading ? "Menghubungkan…" : label}
    </button>
  );
}
