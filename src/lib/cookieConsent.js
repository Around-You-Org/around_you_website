export const COOKIE_CONSENT_KEY = 'aroundyou_cookie_consent'

export function getStoredCookieConsent() {
  if (typeof window === 'undefined') {
    return null
  }

  const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY)
  if (storedConsent === 'accepted' || storedConsent === 'declined') {
    return storedConsent
  }

  return 'pending'
}
