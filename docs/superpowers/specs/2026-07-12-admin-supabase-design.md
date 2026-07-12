# Admin Page + Supabase (Kehadiran & Ucapan) — Design

**Date:** 2026-07-12
**Status:** Approved (design), pending implementation plan

## Goal

Ganti penyimpanan RSVP (kehadiran) & Wishes (ucapan/doa) dari `localStorage` ke Supabase, tambah halaman admin, dan dukung login Google opsional dengan badge "terverifikasi".

## Decisions (dari brainstorming)

- **Admin auth:** Google login, dibatasi whitelist email (`ADMIN_EMAILS`).
- **Tamu (RSVP + ucapan):** Google login **opsional**. Login → identitas & badge terverifikasi. Tanpa login → isi nama manual.
- **Moderasi ucapan:** ucapan dari user terverifikasi (login Google) **auto-approve**; ucapan anonim masuk antrian moderasi admin.
- **Fitur admin:** lihat + statistik, hapus entri, moderasi ucapan (approve/tolak), export CSV.
- **RSVP:** tidak dimoderasi (langsung tersimpan). Nama tamu privat (tidak diekspos publik).

## Stack

- Next.js **16.2.10** (App Router), React 19.
- Supabase: Postgres + Auth (Google OAuth provider).
- `@supabase/ssr` + `@supabase/supabase-js` untuk integrasi cookie-based session di App Router.
- **CATATAN:** Next versi ini punya breaking changes; baca `node_modules/next/dist/docs/` sebelum tulis kode (server actions, route handlers, cookies API, middleware).

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, jangan diprefix NEXT_PUBLIC
ADMIN_EMAILS=email1@x.com,email2@y.com
```

Tambah `.env.local` (gitignored) + `.env.example` untuk dokumentasi.

## Supabase Clients (3)

| Klien | Key | Dipakai | File |
|-------|-----|---------|------|
| Browser | anon | baca ucapan publik, trigger login Google | `lib/supabase/client.ts` |
| Server | anon + cookies | server actions, baca session tamu | `lib/supabase/server.ts` |
| Admin | service-role (server-only) | list/hapus/approve/export (bypass RLS) | `lib/supabase/admin.ts` |

Tipe DB di `lib/supabase/types.ts`.

## Database Schema

```sql
-- rsvps
id          uuid primary key default gen_random_uuid()
created_at  timestamptz not null default now()
name        text not null
attending   boolean not null
guest_count int  not null default 1
user_id     uuid null references auth.users(id) on delete set null
verified    boolean generated always as (user_id is not null) stored

-- wishes
id          uuid primary key default gen_random_uuid()
created_at  timestamptz not null default now()
name        text not null
message     text not null
user_id     uuid null references auth.users(id) on delete set null
avatar_url  text null
verified    boolean generated always as (user_id is not null) stored
approved    boolean not null default false
```

- `verified` = kolom generated dari ada/tidaknya `user_id` (tidak bisa dipalsukan client).
- Ucapan verified diset `approved = true` saat insert (di server action, setelah cek session). Anonim `approved = false`.

## Row Level Security

**wishes**
- `SELECT` (anon + authenticated): hanya baris `approved = true`.
- `INSERT` (anon + authenticated): diizinkan. Kolom `approved`, `user_id`, `verified` **tidak dipercaya dari client** — server action yang set `user_id` dari session & `approved` sesuai aturan.
- `UPDATE` / `DELETE` publik: **tidak ada** (hanya admin via service-role).

**rsvps**
- `INSERT` (anon + authenticated): diizinkan.
- `SELECT` publik: **tidak ada** (nama tamu privat).
- Counter publik lewat fungsi RPC agregat:

```sql
create or replace function get_rsvp_stats()
returns table (total_attending bigint, total_guests bigint, total_declined bigint)
language sql security definer set search_path = public as $$
  select
    count(*) filter (where attending),
    coalesce(sum(guest_count) filter (where attending), 0),
    count(*) filter (where not attending)
  from rsvps;
$$;
```
`grant execute` ke `anon`, `authenticated`. Hanya balikin angka, tanpa PII.

**Admin:** semua operasi baca/hapus/approve/export lewat server action yang memverifikasi email session ∈ `ADMIN_EMAILS`, lalu memakai klien **service-role** (bypass RLS). Whitelist tidak ditaruh di kebijakan RLS agar mudah diubah lewat env.

## Auth Flow (Google OAuth)

1. Tombol "Login dengan Google" → `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: <origin>/auth/callback } })`.
2. `app/auth/callback/route.ts` — route handler tukar `code` → session, set cookies, redirect balik.
3. Provider Google dikonfigurasi di dashboard Supabase (Client ID/Secret dari Google Cloud). Didokumentasikan di README/`.env.example`, bukan di kode.
4. Logout: server action `signOut()`.

## Server Actions

`app/actions/rsvp.ts`
- `submitRsvp(formData)` — baca session; insert `{ name, attending, guest_count, user_id }`. Kalau login, `name` boleh dari profil Google. Return sukses/gagal.

`app/actions/wishes.ts`
- `submitWish(formData)` — baca session; kalau ada user → `user_id`, `avatar_url`, `approved=true`; kalau anonim → `approved=false`. Insert.

`app/admin/actions.ts` (semua cek `requireAdmin()` dulu)
- `deleteRsvp(id)`, `deleteWish(id)`, `approveWish(id)`, `getAdminData()` (list lengkap), CSV dibuat dari data ini.
- `requireAdmin()` helper: ambil session server, lempar/redirect kalau email ∉ `ADMIN_EMAILS`.

## Admin Page `/admin`

- Server component. Guard:
  - belum login → tampil tombol "Login Google".
  - login tapi email bukan whitelist → "Akses ditolak".
  - admin → dashboard.
- **Statistik:** total hadir, total tamu (Σ guest_count), berhalangan, jumlah ucapan (verified vs anonim), jumlah antrian moderasi.
- **Tab RSVP:** tabel nama / hadir / jumlah / verified / waktu + hapus + export CSV.
- **Tab Ucapan:** antrian pending (approve / hapus) + daftar approved (hapus) + export CSV.
- Export CSV: server action balikin string CSV → client buat Blob & trigger download (`<a download>`). (Bukan route handler.)

## Public Page Changes

**`components/Rsvp.tsx`**
- Buang `localStorage`. Submit lewat `submitRsvp` server action.
- Counter "X tamu terkonfirmasi" dari `get_rsvp_stats()` via server action `getRsvpStats()`, dipanggil saat mount & di-refresh setelah submit.
- Tombol kecil "Login dengan Google (opsional)". Jika login: avatar + nama prefilled (readonly) + badge ✓. Jika anonim: input nama manual.
- Feedback via komponen **Toast** yang sudah ada.

**`components/Wishes.tsx`**
- Buang `localStorage` + SEED demo. List ucapan `approved=true` diambil pakai **browser client** (anon key, RLS batasi ke approved) saat mount.
- Form submit lewat `submitWish`. Anonim → toast "Ucapan menunggu persetujuan". Verified → langsung muncul.
- Badge ✓ "Terverifikasi" pada tiap kartu ucapan `verified`. Tampilkan `avatar_url` bila ada.

## Files (rencana)

```
lib/supabase/client.ts
lib/supabase/server.ts
lib/supabase/admin.ts
lib/supabase/types.ts
app/auth/callback/route.ts
app/actions/rsvp.ts
app/actions/wishes.ts
app/admin/page.tsx
app/admin/actions.ts
app/admin/AdminDashboard.tsx   (client component untuk tab/interaktif)
supabase/schema.sql            (DDL + RLS + RPC, dijalankan di SQL editor)
.env.example
components/Rsvp.tsx             (refactor)
components/Wishes.tsx           (refactor)
components/VerifiedBadge.tsx    (badge ✓ reusable)
components/GoogleLoginButton.tsx
```

## Out of Scope (YAGNI)

- Edit ucapan/RSVP oleh tamu setelah kirim.
- Multi-admin role/permission bertingkat.
- Realtime live update (cukup fetch on load / revalidate).
- Rate limiting canggih (andalkan RLS + moderasi anonim; bisa ditambah nanti).
- Email notifikasi ke admin.

## Testing / Verification

- Manual: submit RSVP anonim & login, cek muncul di admin + counter naik.
- Submit ucapan anonim → pending, tidak tampil publik; approve di admin → tampil.
- Submit ucapan login → langsung tampil + badge.
- Akses `/admin` non-whitelist → ditolak.
- RLS: coba `SELECT` rsvps dari anon key → kosong/ditolak; ucapan pending tidak kebaca publik.
