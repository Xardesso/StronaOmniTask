import { NextResponse, type NextRequest } from 'next/server'
import { localeFromPathname, localizePath, isLocale, PREFIXED_LOCALES, type Locale } from '@/lib/i18n'

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

// Przekazujemy aktualną lokalizację (wyznaczoną z URL) do warstwy serwerowej
// przez nagłówek żądania, aby root layout mógł ustawić poprawny <html lang>
// już w SSR — dla PL, EN i UA. Dodatkowo: przy pierwszej wizycie (brak ciasteczka
// z zapamiętanym wyborem) i braku jawnego prefiksu w adresie, dopasowujemy język
// do przeglądarki odwiedzającego (Accept-Language) i przekierowujemy raz —
// kolejne wizyty i ręczna zmiana języka w przełączniku respektują ciasteczko,
// więc nie nadpisujemy świadomego wyboru użytkownika.
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathLocale = localeFromPathname(pathname)
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

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', pathLocale)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  if (!cookieLocale) {
    response.cookies.set(LOCALE_COOKIE, pathLocale, { maxAge: LOCALE_COOKIE_MAX_AGE, path: '/' })
  }
  return response
}

export const config = {
  // Pomijamy zasoby statyczne, API oraz pliki z rozszerzeniem.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)'],
}
