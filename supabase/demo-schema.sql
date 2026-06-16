create extension if not exists pgcrypto;

create table if not exists public.pelix_profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  nombre text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.pelix_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  nombre text,
  stripe_customer_id text,
  estado text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.pelix_subscriptions (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid null,
  stripe_subscription_id text,
  plan text not null,
  status text not null default 'active',
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.pelix_orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text,
  customer_email text,
  amount_total integer,
  payment_status text,
  created_at timestamptz not null default now()
);

create table if not exists public.pelix_favorites (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid null,
  movie_id integer not null,
  created_at timestamptz not null default now()
);

alter table public.pelix_profiles enable row level security;
alter table public.pelix_subscribers enable row level security;
alter table public.pelix_subscriptions enable row level security;
alter table public.pelix_orders enable row level security;
alter table public.pelix_favorites enable row level security;

drop policy if exists "demo insert profiles" on public.pelix_profiles;
drop policy if exists "demo read profiles" on public.pelix_profiles;
drop policy if exists "demo insert subscribers" on public.pelix_subscribers;
drop policy if exists "demo read subscribers" on public.pelix_subscribers;
drop policy if exists "demo insert subscriptions" on public.pelix_subscriptions;
drop policy if exists "demo read subscriptions" on public.pelix_subscriptions;
drop policy if exists "demo insert orders" on public.pelix_orders;
drop policy if exists "demo read orders" on public.pelix_orders;
drop policy if exists "demo insert favorites" on public.pelix_favorites;
drop policy if exists "demo read favorites" on public.pelix_favorites;

create policy "demo insert profiles" on public.pelix_profiles
  for insert to anon, authenticated with check (true);

create policy "demo read profiles" on public.pelix_profiles
  for select to anon, authenticated using (true);

create policy "demo insert subscribers" on public.pelix_subscribers
  for insert to anon, authenticated with check (true);

create policy "demo read subscribers" on public.pelix_subscribers
  for select to anon, authenticated using (true);

create policy "demo insert subscriptions" on public.pelix_subscriptions
  for insert to anon, authenticated with check (true);

create policy "demo read subscriptions" on public.pelix_subscriptions
  for select to anon, authenticated using (true);

create policy "demo insert orders" on public.pelix_orders
  for insert to anon, authenticated with check (true);

create policy "demo read orders" on public.pelix_orders
  for select to anon, authenticated using (true);

create policy "demo insert favorites" on public.pelix_favorites
  for insert to anon, authenticated with check (true);

create policy "demo read favorites" on public.pelix_favorites
  for select to anon, authenticated using (true);
