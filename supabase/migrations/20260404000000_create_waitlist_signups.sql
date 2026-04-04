create extension if not exists pgcrypto with schema extensions;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) > 0),
  email text not null check (
    email = lower(btrim(email))
    and char_length(email) > 0
    and char_length(email) <= 254
  ),
  role text not null check (role in ('customer', 'worker')),
  services jsonb not null default '[]'::jsonb check (
    jsonb_typeof(services) = 'array'
  ),
  location text not null check (char_length(btrim(location)) > 0),
  location_slug text not null check (
    char_length(btrim(location_slug)) > 0
  ),
  referral_source text,
  brevo_synced boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.waitlist_signups
  alter column email set not null;

alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_email_key;

drop index if exists public.waitlist_email_unique;

create unique index waitlist_email_unique
  on public.waitlist_signups ((lower(email)));

create index if not exists waitlist_loc_role_idx
  on public.waitlist_signups (location_slug, role);

alter table public.waitlist_signups enable row level security;

create table if not exists public.waitlist_rate_limits (
  rate_key text not null,
  window_start timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (rate_key, window_start)
);

create index if not exists waitlist_rate_limits_window_idx
  on public.waitlist_rate_limits (window_start);

alter table public.waitlist_rate_limits enable row level security;

create or replace function public.insert_waitlist_signup(
  p_name text,
  p_email text,
  p_role text,
  p_services jsonb,
  p_location text,
  p_location_slug text,
  p_referral_source text
)
returns setof public.waitlist_signups
language sql
set search_path = public
as $$
  insert into public.waitlist_signups (
    name,
    email,
    role,
    services,
    location,
    location_slug,
    referral_source
  )
  values (
    btrim(p_name),
    lower(btrim(p_email)),
    p_role,
    coalesce(p_services, '[]'::jsonb),
    btrim(p_location),
    btrim(p_location_slug),
    nullif(btrim(coalesce(p_referral_source, '')), '')
  )
  on conflict ((lower(email))) do nothing
  returning *;
$$;

create or replace function public.bump_waitlist_rate_limit(
  p_rate_key text,
  p_window_start timestamptz
)
returns integer
language plpgsql
set search_path = public
as $$
declare
  next_count integer;
begin
  insert into public.waitlist_rate_limits (
    rate_key,
    window_start,
    request_count,
    updated_at
  )
  values (
    p_rate_key,
    p_window_start,
    1,
    timezone('utc', now())
  )
  on conflict (rate_key, window_start)
  do update set
    request_count = public.waitlist_rate_limits.request_count + 1,
    updated_at = timezone('utc', now())
  returning request_count into next_count;

  delete from public.waitlist_rate_limits
  where window_start < timezone('utc', now()) - interval '1 day';

  return next_count;
end;
$$;
