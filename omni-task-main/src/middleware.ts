import { NextResponse, type NextRequest } from 'next/server'
import { localizePath, isLocale, PREFIXED_LOCALES, type Locale } from '@/lib/i18n'

const LOCALE_COOKIE = 'omnitask_locale'
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 rok

// Wyznacza preferowaną lokalizację odwiedzającego z nagłówka Accept-Language.
// Zwraca null, jeśli żaden z obsługiwanych języków nie pasuje.
function detectLocaleFromHeader(header: string | null): Locale | null {
  if (!header) return null
  const tags = header
    .split(',')
    .map((part) => {
      const [tag, qPart] = part.trim().split(';q=')
      return { base: tag.toLowerCase().split('-')[0], q: qPart ? parseFloat(qPart) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { base } of tags) {
    if (base === 'pl') return 'pl'
    if (base === 'uk') return 'ua' // ukraiński: BCP-47 "uk", nasz kod locale "ua"
    if (base === 'en') return 'en'
  }
  return null
}

// Przy pierwszej wizycie (brak ciasteczka z zapamiętanym wyborem) i braku
// jawnego prefiksu w adresie, dopasowujemy język do przeglądarki odwiedzającego
// (Accept-Language) i przekierowujemy raz, zapamiętując wybór w ciasteczku —
// kolejne wizyty i ręczna zmiana języka w przełączniku (patrz i18n/context.tsx)
// respektują ten wybór.
//
// Ciasteczko ustawiamy WYŁĄCZNIE w gałęzi przekierowania. Wcześniej ustawiane
// było też przy każdym żądaniu bez ciasteczka (nawet gdy nie było przekierowania,
// np. bezpośrednie wejście na /en/...) - to psuło cache'owalność odpowiedzi HTML
// (Set-Cookie traktowany jest jako sygnał spersonalizowanej odpowiedzi przez
// przeglądarki, CDN i same audyty SEO). Locale jest i tak w pełni wyznaczane
// z URL (localeFromPathname) po stronie każdej strony, więc ciasteczko nie jest
// do tego potrzebne - służy tylko do zapamiętania świadomego wyboru języka.
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hasExplicitPrefix = PREFIXED_LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value
  const cookieLocale = cookieValue && isLocale(cookieValue) ? cookieValue : null

  if (!cookieLocale && !hasExplicitPrefix) {
    const detected = detectLocaleFromHeader(request.headers.get('accept-language'))
    if (detected && detected !== 'pl') {
      const url = request.nextUrl.clone()
      url.pathname = localizePath(pathname, detected)
      const response = NextResponse.redirect(url)
      response.cookies.set(LOCALE_COOKIE, detected, { maxAge: LOCALE_COOKIE_MAX_AGE, path: '/' })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  // Pomijamy zasoby statyczne, API oraz pliki z rozszerzeniem.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)'],
}
