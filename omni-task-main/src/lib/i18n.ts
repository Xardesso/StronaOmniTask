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

// Mapa "czystych" (polskich) ścieżek na anglojęzyczne segmenty używane w
// wersjach EN i UA (audyt SEO 2026-09-02, sekcja 3: "adresy EN i UA używają
// polskich slugów"). Ścieżki spoza tej mapy (np. /blog/[slug], /faq) używają
// tego samego segmentu co PL - albo bo już są po angielsku, albo bo migracja
// slugów blogowych jest odłożona na później (patrz audyt, plan działania #20).
const INTL_PATH_MAP: Record<string, string> = {
  '/uslugi': '/services',
  '/uslugi/rpa': '/services/rpa',
  '/uslugi/automatyzacja-workflow': '/services/workflow-automation',
  '/uslugi/integracja-systemow': '/services/system-integration',
  '/uslugi/agenci-ai': '/services/ai-agents',
  '/uslugi/opieka-i-hosting': '/services/hosting-support',
  '/cennik': '/pricing',
  '/o-nas': '/about',
  '/kontakt': '/contact',
  '/zapytanie-ofertowe': '/request-quote',
  '/polityka-prywatnosci': '/privacy-policy',
  '/regulamin': '/terms',
}

const INTL_PATH_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(INTL_PATH_MAP).map(([pl, intl]) => [intl, pl])
)

// Tłumaczy "czystą" ścieżkę PL na segment używany w EN/UA (no-op, jeśli
// ścieżka nie ma anglojęzycznego odpowiednika w mapie).
function toIntlPath(cleanPath: string): string {
  return INTL_PATH_MAP[cleanPath] || cleanPath
}

// Odwrotność toIntlPath - z segmentu EN/UA z powrotem na "czystą" ścieżkę PL,
// która jest kanonicznym kluczem używanym w tłumaczeniach i metadanych.
function fromIntlPath(intlPath: string): string {
  return INTL_PATH_MAP_REVERSE[intlPath] || intlPath
}

// Wyznacza lokalizację na podstawie ścieżki URL.
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split('/')[1]
  if (seg && isLocale(seg) && PREFIXED_LOCALES.includes(seg)) {
    return seg
  }
  return DEFAULT_LOCALE
}

// Usuwa prefiks lokalizacji ze ścieżki i tłumaczy anglojęzyczne segmenty
// EN/UA z powrotem na "czystą" ścieżkę PL (odwrotność localizePath).
export function stripLocale(pathname: string): string {
  const seg = pathname.split('/')[1]
  if (seg && isLocale(seg) && PREFIXED_LOCALES.includes(seg)) {
    const rest = pathname.slice(seg.length + 1)
    const restPath = rest === '' ? '/' : rest
    return fromIntlPath(restPath)
  }
  return pathname
}

// Buduje ścieżkę dla danej lokalizacji (PL bez prefiksu i z polskimi
// segmentami, EN/UA z prefiksem i przetłumaczonymi segmentami z INTL_PATH_MAP).
export function localizePath(pathname: string, locale: Locale): string {
  const clean = stripLocale(pathname)
  if (locale === DEFAULT_LOCALE) return clean
  const localized = toIntlPath(clean)
  return localized === '/' ? `/${locale}` : `/${locale}${localized}`
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
