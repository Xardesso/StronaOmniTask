// Proste zabezpieczenie formularzy przed botami: honeypot + minimalny czas wypełniania.
// Boty zwykle wypełniają wszystkie pola (w tym ukryte) i wysyłają formularz natychmiast,
// więc obie kontrole wystarczają na spam, który wcześniej przychodził co kilka dni.

export const MIN_SUBMIT_MS = 2000

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

export function isSubmittedTooFast(formStartedAt: unknown, minMs: number = MIN_SUBMIT_MS): boolean {
  if (typeof formStartedAt !== 'number' || !Number.isFinite(formStartedAt)) return true
  return Date.now() - formStartedAt < minMs
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
