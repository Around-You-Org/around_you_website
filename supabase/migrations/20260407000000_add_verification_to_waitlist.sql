alter table public.waitlist_signups
  add column if not exists is_verified boolean not null default false,
  add column if not exists verification_token uuid default gen_random_uuid();

create index if not exists waitlist_verification_token_idx
  on public.waitlist_signups (verification_token);
