'use client'

import React, { createContext, useContext, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import pl from './translations/pl.json'
import en from './translations/en.json'
import ua from './translations/ua.json'
import {
  type Locale,
  localeFromPathname,
  localizePath,
  HREFLANG_MAP,
} from '@/lib/i18n'

export type { Locale }

type TranslationValue = string | { [key: string]: TranslationValue }
type Translations = typeof pl

// EN i UA są celowo "zredukowane" względem PL (patrz specyfikacja OMNITASK 2.0,
// sekcja 2.2) — nie mają np. namespace'ów ksef_page/dofinansowanie_page, których
// strony i tak nie istnieją w tych językach. Rzutowanie na Translations pozwala
// TypeScriptowi zaakceptować niepełną strukturę; t()/tRaw() i tak bezpiecznie
// obsługują brakujące klucze w runtime (zwracają ścieżkę zamiast się wywalać).
const translationsMap: Record<Locale, Translations> = {
  pl,
  en: en as unknown as Translations,
  ua: ua as unknown as Translations,
}

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  // Zwraca surową wartość spod klucza (np. tablicę obiektów dla list/FAQ).
  tRaw: <T = unknown>(key: string) => T
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getNestedValue(obj: Record<string, TranslationValue>, path: string): string {
  const keys = path.split('.')
  let current: TranslationValue = obj
  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, TranslationValue>)[key]
    } else {
      return path
    }
  }
  return typeof current === 'string' ? current : path
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Lokalizacja jest sterowana adresem URL — dzięki temu /en/* i /ua/*
  // renderują się w odpowiednim języku już po stronie serwera (SSR), co
  // jest kluczowe dla SEO. Brak rozjazdu hydratacji, bo serwer i klient
  // wyznaczają locale z tej samej ścieżki.
  const locale = localeFromPathname(pathname)

  // Ustaw atrybut lang na <html> zgodnie z aktywną lokalizacją (hreflang code).
  useEffect(() => {
    document.documentElement.lang = HREFLANG_MAP[locale]
  }, [locale])

  // Zmiana języka = nawigacja do zlokalizowanego adresu bieżącej strony.
  // Ciasteczko zapamiętuje świadomy wybór, żeby middleware nie próbował
  // później "poprawiać" języka na podstawie Accept-Language przeglądarki.
  // Nie ma tu już router.refresh() - stopka i inne miejsca zależne od locale
  // same reagują na zmianę (patrz useFooterPosts w Footer.tsx), a wymuszanie
  // odświeżenia całego layoutu przy każdej zmianie języka podważałoby sens
  // statycznego/ISR renderowania stron (audyt SEO 2026-09-02, sekcja 4).
  const setLocale = useCallback(
    (newLocale: Locale) => {
      document.cookie = `omnitask_locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
      router.push(localizePath(pathname, newLocale))
    },
    [pathname, router]
  )

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(
        translationsMap[locale] as unknown as Record<string, TranslationValue>,
        key
      )
    },
    [locale]
  )

  const tRaw = useCallback(
    <T = unknown>(key: string): T => {
      const keys = key.split('.')
      let current: unknown = translationsMap[locale]
      for (const k of keys) {
        if (typeof current === 'object' && current !== null && k in (current as object)) {
          current = (current as Record<string, unknown>)[k]
        } else {
          return key as unknown as T
        }
      }
      return current as T
    },
    [locale]
  )

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tRaw }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
