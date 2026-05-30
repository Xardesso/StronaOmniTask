// Centralna konfiguracja wielojęzyczności (PL domyślny bez prefiksu, EN i UA jako /en, /ua).

export type Locale = 'pl' | 'en' | 'ua'

export const SITE_URL = 'https://www.omnitask.pl'

export const DEFAULT_LOCALE: Locale = 'pl'

// Lokale z prefiksem w URL (PL serwowany jest z roota, bez prefiksu).
export const PREFIXED_LOCALES: Locale[] = ['en', 'ua']

export const LOCALES: Locale[] = ['pl', 'en', 'ua']

// Mapowanie naszego kodu lokalizacji na kod hreflang / BCP-47.
// Uwaga: ukraiński w hreflang to "uk" (nie "ua", które jest kodem kraju).
export const HREFLANG_MAP: Record<Locale, string> = {
  pl: 'pl',
  en: 'en',
  ua: 'uk',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value)
}

// Wyznacza lokalizację na podstawie ścieżki URL.
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split('/')[1]
  if (seg && isLocale(seg) && PREFIXED_LOCALES.includes(seg)) {
    return seg
  }
  return DEFAULT_LOCALE
}

// Usuwa prefiks lokalizacji ze ścieżki, zwracając "czystą" ścieżkę PL.
export function stripLocale(pathname: string): string {
  const seg = pathname.split('/')[1]
  if (seg && isLocale(seg) && PREFIXED_LOCALES.includes(seg)) {
    const rest = pathname.slice(seg.length + 1)
    return rest === '' ? '/' : rest
  }
  return pathname
}

// Buduje ścieżkę dla danej lokalizacji (PL bez prefiksu, pozostałe z prefiksem).
export function localizePath(pathname: string, locale: Locale): string {
  const clean = stripLocale(pathname)
  if (locale === DEFAULT_LOCALE) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

// Buduje absolutny adres dla "czystej" ścieżki PL i danej lokalizacji.
// Dla strony głównej zwraca SITE_URL bez końcowego ukośnika (spójnie z normalizacją Next).
export function localeUrl(cleanPath: string, locale: Locale): string {
  const path = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  const localized = localizePath(path, locale)
  return localized === '/' ? SITE_URL : `${SITE_URL}${localized}`
}

// Buduje pełny zestaw alternatywnych adresów (hreflang) dla danej "czystej" ścieżki PL.
// Wynik nadaje się bezpośrednio do Metadata.alternates.languages.
export function buildHreflangAlternates(cleanPath: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of LOCALES) {
    languages[HREFLANG_MAP[locale]] = localeUrl(cleanPath, locale)
  }
  // x-default kieruje do wersji domyślnej (PL).
  languages['x-default'] = localeUrl(cleanPath, DEFAULT_LOCALE)
  return languages
}
