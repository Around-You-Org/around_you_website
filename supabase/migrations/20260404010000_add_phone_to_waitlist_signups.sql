alter table public.waitlist_signups
  add column if not exists phone text;

alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_phone_format;

alter table public.waitlist_signups
  add constraint waitlist_signups_phone_format
  check (
    phone is null
    or phone ~ '^\+?[1-9][0-9]{6,14}$'
  );

create or replace function public.insert_waitlist_signup(
  p_name text,
  p_email text,
  p_phone text,
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
    phone,
    role,
    services,
    location,
    location_slug,
    referral_source
  )
  values (
    btrim(p_name),
    lower(btrim(p_email)),
    btrim(p_phone),
    p_role,
    coalesce(p_services, '[]'::jsonb),
    btrim(p_location),
    btrim(p_location_slug),
    nullif(btrim(coalesce(p_referral_source, '')), '')
  )
  on conflict ((lower(email))) do nothing
  returning *;
$$;
