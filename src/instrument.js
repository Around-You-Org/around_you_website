import * as Sentry from '@sentry/react'
import { getStoredCookieConsent } from './lib/cookieConsent'

const DEFAULT_SENTRY_DSN =
  'https://f7eae9ae82ae5bd56b8f29e687d19eb8@o4511214205075456.ingest.de.sentry.io/4511214262812752'

const sentryDsn = import.meta.env.VITE_SENTRY_DSN || DEFAULT_SENTRY_DSN

let sentryInitialized = false

export function initializeSentry(consentState = getStoredCookieConsent()) {
  if (sentryInitialized || consentState !== 'accepted' || !sentryDsn) {
    return false
  }

  Sentry.init({
    dsn: sentryDsn,
    sendDefaultPii: true,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/(?:[a-z0-9-]+\.)?supabase\.co/,
      /^https:\/\/(?:www\.)?aroundyou\.com\.ng/,
    ],
    replaysSessionSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
    environment: import.meta.env.MODE,
  })

  sentryInitialized = true
  return true
}

initializeSentry()
