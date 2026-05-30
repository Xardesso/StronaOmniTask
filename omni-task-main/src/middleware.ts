import { NextResponse, type NextRequest } from 'next/server'
import { localeFromPathname } from '@/lib/i18n'

// Przekazujemy aktualną lokalizację (wyznaczoną z URL) do warstwy serwerowej
// przez nagłówek żądania, aby root layout mógł ustawić poprawny <html lang>
// już w SSR — dla PL, EN i UA.
export function middleware(request: NextRequest) {
  const locale = localeFromPathname(request.nextUrl.pathname)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  // Pomijamy zasoby statyczne, API oraz pliki z rozszerzeniem.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)'],
}
