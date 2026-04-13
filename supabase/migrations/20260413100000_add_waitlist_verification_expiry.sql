alter table public.waitlist_signups
  add column if not exists verification_token_expires_at timestamptz;

update public.waitlist_signups
set verification_token_expires_at = timezone('utc', now()) + interval '7 days'
where is_verified = false
  and verification_token is not null
  and verification_token_expires_at is null;

update public.waitlist_signups
set verification_token_expires_at = null
where is_verified = true;
