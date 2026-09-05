import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
      // Pliki statyczne z /public (logo, zdjęcia, logotypy klientów) wracały
      // z cache-control: max-age=0 - każde wejście na dowolną podstronę
      // pobierało je od nowa. Nazwy plików są stabilne (bez hasha w nazwie),
      // więc przy realnej podmianie grafiki trzeba zmienić nazwę pliku.
      {
        source: '/:path*\\.(png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'omnitask.pl' }],
        destination: 'https://www.omnitask.pl/:path*',
        statusCode: 301,
      },
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.omnitask.pl' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
        ],
        destination: 'https://www.omnitask.pl/:path*',
        statusCode: 301,
      },
      // Stare slugi artykułów sprzed relaunchu, wciąż w indeksie Google
      // (audyt SEO 2026-09-02, potwierdzone przez porównanie z aktualną
      // sitemapą). Pełną listę ewentualnych pozostałych 404 trzeba dociągnąć
      // z Search Console → Indeksowanie → Strony → "Nie znaleziono (404)".
      {
        source: '/blog/5-procesow-w-biurze-rachunkowym-do-zautomatyzowania-2026',
        destination: '/blog/5-procesow-w-biurze-rachunkowym-ktore-mozesz-zautomatyzowac',
        statusCode: 301,
      },
      {
        source: '/blog/automatyzacja-ai-w-praktyce-inteligentna-automatyzacja-procesow',
        destination: '/blog/automatyzacja-ai-w-praktyce-jak-mierzyc-efektywnosc',
        statusCode: 301,
      },
      {
        source: '/blog/przyszlosc-biura-automatyzacja-robotyzacja-ai',
        destination: '/blog/przyszlosc-biura-automatyzacja-rpa-ai-agenci',
        statusCode: 301,
      },
      // Migracja slugów EN/UA z polskich na anglojęzyczne segmenty (audyt SEO
      // 2026-09-02, sekcja 3 i plan działania #20). Blog i /faq zostają bez
      // zmian - patrz komentarz przy INTL_PATH_MAP w src/lib/i18n.ts.
      {
        source: '/:locale(en|ua)/uslugi',
        destination: '/:locale/services',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/uslugi/rpa',
        destination: '/:locale/services/rpa',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/uslugi/automatyzacja-workflow',
        destination: '/:locale/services/workflow-automation',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/uslugi/integracja-systemow',
        destination: '/:locale/services/system-integration',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/uslugi/agenci-ai',
        destination: '/:locale/services/ai-agents',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/uslugi/opieka-i-hosting',
        destination: '/:locale/services/hosting-support',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/cennik',
        destination: '/:locale/pricing',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/o-nas',
        destination: '/:locale/about',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/kontakt',
        destination: '/:locale/contact',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/zapytanie-ofertowe',
        destination: '/:locale/request-quote',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/polityka-prywatnosci',
        destination: '/:locale/privacy-policy',
        statusCode: 301,
      },
      {
        source: '/:locale(en|ua)/regulamin',
        destination: '/:locale/terms',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
