# AroundYou Website

React + Vite marketing site for AroundYou with a production waitlist flow powered by Supabase and Brevo.

## Local Development

1. Copy `.env.example` to `.env.local` and fill in the frontend Supabase values.
2. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## Waitlist Backend

Apply the Supabase migration and deploy the Edge Function:

```bash
supabase db push
supabase functions deploy waitlist-signup
supabase secrets set \
  BREVO_API_KEY="your-brevo-api-key" \
  BREVO_LIST_ID="123" \
  WAITLIST_RATE_LIMIT_SALT="replace-with-a-long-random-secret"
```

## Brevo Retry Sync

If Brevo is temporarily unavailable, failed contacts remain in Supabase with `brevo_synced = false`.
Run the retry script after setting `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `BREVO_API_KEY`, and `BREVO_LIST_ID` in `.env` or `.env.local`:

```bash
npm run waitlist:retry-brevo
```
