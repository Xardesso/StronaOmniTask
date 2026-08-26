// Zgoda na cookies inne niż niezbędne (analityczne / marketingowe) — patrz
// Polityka prywatności § 6. Zapis decyzji sam w sobie jest cookie niezbędnym
// (nie wymaga zgody), stąd nie jest bramkowany przez ten sam mechanizm.

const COOKIE_CONSENT_NAME = 'omnitask_cookie_consent'
const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365

export interface CookieConsent {
  analytics: boolean
  marketing: boolean
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENT_NAME}=([^;]*)`))
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]))
    return { analytics: !!parsed.analytics, marketing: !!parsed.marketing }
  } catch {
    return null
  }
}

export function writeCookieConsent(consent: CookieConsent) {
  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${COOKIE_CONSENT_MAX_AGE}`
}
