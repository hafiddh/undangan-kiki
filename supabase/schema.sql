-- ============================================================
-- Undangan — skema Supabase: RSVP (kehadiran) + Wishes (ucapan)
-- Jalankan di Supabase SQL Editor (sekali). Idempotent-ish.
-- ============================================================

-- ---------- Tabel ----------

create table if not exists public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  attending   boolean not null,
  guest_count int not null default 1,
  user_id     uuid references auth.users(id) on delete set null,
  verified    boolean generated always as (user_id is not null) stored,
  ip_hash     text
);

create table if not exists public.wishes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  message     text not null,
  user_id     uuid references auth.users(id) on delete set null,
  avatar_url  text,
  verified    boolean generated always as (user_id is not null) stored,
  approved    boolean not null default false,
  ip_hash     text
);

create index if not exists wishes_approved_created_idx
  on public.wishes (approved, created_at desc);
create index if not exists rsvps_ip_created_idx
  on public.rsvps (ip_hash, created_at desc);
create index if not exists wishes_ip_created_idx
  on public.wishes (ip_hash, created_at desc);

-- ---------- Row Level Security ----------

alter table public.rsvps  enable row level security;
alter table public.wishes enable row level security;

-- wishes: publik hanya lihat yang sudah di-approve
drop policy if exists "wishes_select_approved" on public.wishes;
create policy "wishes_select_approved"
  on public.wishes for select
  to anon, authenticated
  using (approved = true);

-- wishes: siapa saja boleh insert (approved/user_id di-set server action)
drop policy if exists "wishes_insert_any" on public.wishes;
create policy "wishes_insert_any"
  on public.wishes for insert
  to anon, authenticated
  with check (true);

-- rsvps: siapa saja boleh insert
drop policy if exists "rsvps_insert_any" on public.rsvps;
create policy "rsvps_insert_any"
  on public.rsvps for insert
  to anon, authenticated
  with check (true);

-- rsvps: TIDAK ada policy SELECT publik → nama tamu privat.
-- (admin baca via service-role yang bypass RLS)

-- ---------- RPC agregat untuk counter publik ----------

create or replace function public.get_rsvp_stats()
returns table (
  total_attending bigint,
  total_guests    bigint,
  total_declined  bigint
)
language sql
security definer
set search_path = public
as $$
  select
    count(*) filter (where attending)                          as total_attending,
    coalesce(sum(guest_count) filter (where attending), 0)     as total_guests,
    count(*) filter (where not attending)                      as total_declined
  from public.rsvps;
$$;

grant execute on function public.get_rsvp_stats() to anon, authenticated;
