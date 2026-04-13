import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { initializeSentry } from '../instrument'
import {
  COOKIE_CONSENT_KEY,
  getStoredCookieConsent,
} from '../lib/cookieConsent'

const BREVO_SCRIPT_ID = 'brevo-conversations-script'
const BREVO_CONVERSATIONS_ID = '69d0fd18003d84b8000fb163'

function updateGoogleConsent(consentState) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: consentState === 'accepted' ? 'granted' : 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  })
}

function loadBrevoConversations() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (document.getElementById(BREVO_SCRIPT_ID)) {
    return
  }

  window.BrevoConversationsID = BREVO_CONVERSATIONS_ID
  window.BrevoConversations =
    window.BrevoConversations ||
    function () {
      ;(window.BrevoConversations.q = window.BrevoConversations.q || []).push(
        arguments,
      )
    }

  const script = document.createElement('script')
  script.id = BREVO_SCRIPT_ID
  script.async = true
  script.src = 'https://conversations-widget.brevo.com/brevo-conversations.js'
  document.head.appendChild(script)
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState(() => getStoredCookieConsent())

  useEffect(() => {
    if (consent === 'accepted') {
      updateGoogleConsent('accepted')
      initializeSentry('accepted')
      loadBrevoConversations()
      return
    }

    if (consent === 'declined') {
      updateGoogleConsent('declined')
    }
  }, [consent])

  function saveConsent(nextConsent) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, nextConsent)
    setConsent(nextConsent)
  }

  if (consent !== 'pending') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/15 bg-[#0B1D3A]/95 p-5 text-white shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6EE7A8]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Cookie Preferences
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-200">
              We use essential cookies to keep the site working. If you accept,
              we will also enable Google Analytics, Sentry diagnostics and
              session replay to help us improve the site, and load the Brevo
              chat widget so you can message the AroundYou team directly. Read
              more in our{' '}
              <Link
                to="/privacy-policy"
                className="text-[#3EC6C8] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => saveConsent('declined')}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Decline optional cookies
            </button>
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="rounded-full px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg,#0D6B6E,#3EC6C8)' }}
            >
              Accept optional tools
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
