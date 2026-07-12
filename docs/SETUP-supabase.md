# Setup Supabase + Google Login

Langkah manual (sekali) supaya fitur RSVP/Ucapan/Admin jalan.

## 1. Buat project Supabase
- supabase.com → New project.
- **Project Settings > API**, salin ke `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
  - `SUPABASE_SERVICE_ROLE_KEY` = service_role key (rahasia, server-only)

## 2. Jalankan skema DB
- **SQL Editor** → tempel isi [`supabase/schema.sql`](../supabase/schema.sql) → Run.
- Membuat tabel `rsvps`, `wishes`, RLS, dan fungsi `get_rsvp_stats()`.

## 3. Aktifkan Google login
- Google Cloud Console → **APIs & Services > Credentials** → buat **OAuth client ID** (Web application).
- Authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`.
- Salin Client ID + Secret.
- Supabase → **Authentication > Providers > Google** → enable, tempel Client ID + Secret.
- Supabase → **Authentication > URL Configuration** → tambahkan Site URL & redirect (mis. `http://localhost:3000/**` untuk dev, domain produksi untuk live).

## 4. Set admin
- `.env.local` → `ADMIN_EMAILS=email1@gmail.com,email2@gmail.com` (email Google yang boleh buka `/admin`).

## Jalankan
```
npm run dev
```
- Undangan: `/` — RSVP & Ucapan (login Google opsional → badge terverifikasi).
- Admin: `/admin` — login Google dgn email whitelist → statistik, moderasi, hapus, export CSV.

## Catatan keamanan
- `SUPABASE_SERVICE_ROLE_KEY` **jangan** diprefix `NEXT_PUBLIC` dan jangan di-commit. Hanya dipakai server-side setelah cek admin.
- RSVP tidak diekspos publik (tanpa policy SELECT); counter publik lewat RPC agregat.
- Ucapan dari user login auto-tampil; anonim menunggu moderasi admin.
