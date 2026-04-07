update public.waitlist_signups
set is_verified = true
where is_verified = false
  and brevo_synced = true;
