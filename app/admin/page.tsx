import type { Metadata } from "next";
import { getSessionUser, isAdminEmail } from "@/lib/auth";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { signOut } from "@/app/actions/auth";
import { getAdminData } from "./actions";
import AdminDashboard from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — Undangan",
  robots: { index: false, follow: false },
};

// Selalu render dinamis (data & session realtime, tak boleh dicache statis).
export const dynamic = "force-dynamic";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-4xl flex-col px-5 py-10">
      {children}
    </main>
  );
}

export default async function AdminPage() {
  const user = await getSessionUser();

  if (!user) {
    return (
      <Shell>
        <div className="m-auto flex flex-col items-center gap-4 text-center">
          <h1 className="gold-text text-2xl font-bold">Admin</h1>
          <p className="text-sm text-cream-dim">
            Login untuk mengelola kehadiran & ucapan.
          </p>
          <GoogleLoginButton next="/admin" />
        </div>
      </Shell>
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <Shell>
        <div className="m-auto flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-cream">Akses ditolak</h1>
          <p className="text-sm text-cream-dim">
            Akun <span className="text-gold">{user.email}</span> tidak punya
            akses admin.
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-xl border border-gold/40 px-4 py-2 text-sm text-cream hover:bg-gold/10"
            >
              Keluar
            </button>
          </form>
        </div>
      </Shell>
    );
  }

  const data = await getAdminData();

  return (
    <Shell>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="gold-text text-2xl font-bold">Dashboard</h1>
          <p className="text-xs text-cream-dim">{user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-xl border border-gold/40 px-3 py-1.5 text-xs text-cream hover:bg-gold/10"
          >
            Keluar
          </button>
        </form>
      </header>
      <AdminDashboard initial={data} />
    </Shell>
  );
}
