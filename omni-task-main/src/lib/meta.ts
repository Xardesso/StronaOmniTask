import type { Metadata } from 'next'
import pl from '@/i18n/translations/pl.json'
import en from '@/i18n/translations/en.json'
import ua from '@/i18n/translations/ua.json'
import {
  type Locale,
  SITE_URL,
  localizePath,
  buildHreflangAlternates,
} from './i18n'

const MAP = { pl, en, ua } as const

const OG_LOCALE: Record<Locale, string> = {
  pl: 'pl_PL',
  en: 'en_US',
  ua: 'uk_UA',
}

function get(locale: Locale, key: string): string {
  const keys = key.split('.')
  let current: unknown = MAP[locale]
  for (const k of keys) {
    if (typeof current === 'object' && current !== null && k in (current as object)) {
      current = (current as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  return typeof current === 'string' ? current : key
}

interface BuildMetaOptions {
  locale: Locale
  // "Czysta" ścieżka PL, np. "/uslugi/rpa" lub "/".
  cleanPath: string
  // Klucz w sekcji "meta" plików tłumaczeń, np. "rpa", "about".
  metaKey: string
  // true → tytuł nie korzysta z szablonu "%s | OmniTask" (np. strona główna).
  absoluteTitle?: boolean
}

// Buduje obiekt Metadata z poprawnym hreflang (pl/en/uk/x-default),
// kanonicznym adresem dla danej lokalizacji oraz Open Graph.
export function buildPageMetadata({
  locale,
  cleanPath,
  metaKey,
  absoluteTitle,
}: BuildMetaOptions): Metadata {
  const title = get(locale, `meta.${metaKey}.title`)
  const description = get(locale, `meta.${metaKey}.description`)
  const canonical = localizePath(cleanPath, locale)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: buildHreflangAlternates(cleanPath),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      type: 'website',
      locale: OG_LOCALE[locale],
    },
  }
}

interface BuildPlOnlyMetaOptions {
  // "Czysta" ścieżka, zawsze zaczynająca się od "/", np. "/uslugi/ksef".
  cleanPath: string
  metaKey: string
}

// Metadane dla stron istniejących wyłącznie po polsku (KSeF, dofinansowanie,
// szkolenia, branże). W przeciwieństwie do buildPageMetadata NIE generuje
// hreflang dla en/uk — nie ma tam odpowiednika tej strony (spec 5.2).
export function buildPlOnlyMetadata({ cleanPath, metaKey }: BuildPlOnlyMetaOptions): Metadata {
  const title = get('pl', `meta.${metaKey}.title`)
  const description = get('pl', `meta.${metaKey}.description`)
  const canonical = `${SITE_URL}${cleanPath}`

  return {
    title,
    description,
    alternates: {
      canonical: cleanPath,
      languages: { 'x-default': canonical },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale: 'pl_PL',
    },
  }
}
