import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Plus_Jakarta_Sans, Rajdhani } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/i18n/context'
import { CtaModalProvider } from '@/components/CtaModal'
import { CookieConsentProvider } from '@/components/CookieConsent'
import { buildHreflangAlternates, HREFLANG_MAP, DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n'
import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'

// Renderujemy dynamicznie (SSR), aby ustawić poprawny <html lang> dla każdej
// lokalizacji na podstawie nagłówka x-locale ustawianego w middleware.
export const dynamic = 'force-dynamic'

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

const headingFont = Rajdhani({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Automatyzacja procesów dla firm | OmniTask',
    template: '%s',
  },
  description:
    'Automatyzuję powtarzalne procesy w firmach 5–50 osób. Wdrożenie w 2–4 tygodnie, stała cena, do 83% dofinansowania z programu PARP.',
  keywords: [
    'OmniTask',
    'automatyzacja procesów',
    'automatyzacja procesów w firmie',
    'automatyzacja dla firm',
    'wdrożenie automatyzacji',
    'automatyzacja faktur KSeF',
    'dofinansowanie automatyzacja',
    'automatyzacja workflow',
    'integracja systemów',
    'agenci AI',
  ],
  metadataBase: new URL('https://www.omnitask.pl'),
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.omnitask.pl',
    siteName: 'OmniTask',
    title: 'OmniTask – automatyzacja procesów dla firm 5–50 osób',
    description:
      'Odzyskaj 10–20 godzin miesięcznie bez zatrudniania nikogo. Wdrożenie w 2–4 tygodnie, stała cena, do 83% dofinansowania z PARP.',
    images: [
      {
        url: 'https://www.omnitask.pl/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OmniTask – automatyzacja procesów dla firm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniTask – automatyzacja procesów dla firm',
    description:
      'Automatyzuję powtarzalne procesy w firmach 5–50 osób. Stała cena, do 83% dofinansowania z PARP.',
    images: ['https://www.omnitask.pl/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
    languages: buildHreflangAlternates('/'),
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerLocale = (await headers()).get('x-locale')
  const locale: Locale = headerLocale && isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE

  let footerPosts: { slug: string; title: string; image: string | null; date: string }[] = []
  try {
    const raw = await prisma.article.findMany({
      where: { is_public: true },
      orderBy: { created_at: 'desc' },
      take: 2,
      select: { slug: true, title: true, image: true, created_at: true, date: true },
    }) as any[]
    footerPosts = raw.map((a) => ({
      slug: a.slug,
      title: a.title?.[locale] || a.title?.pl || '',
      image: a.image ? (a.image.startsWith('http') ? a.image : getPublicUrl(a.image)) : null,
      date: (a.date || a.created_at).toISOString(),
    }))
  } catch (e) {
    console.error('Error fetching footer posts:', e)
  }

  return (
    <html lang={HREFLANG_MAP[locale]} className={`${bodyFont.variable} ${headingFont.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.omnitask.pl/#organization',
              name: 'OmniTask',
              url: 'https://www.omnitask.pl',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.omnitask.pl/logo-pl.png',
              },
              image: 'https://www.omnitask.pl/og-image.png',
              description: 'Automatyzacja procesów w firmie - wdrożenia n8n, integracja systemów (ERP, CRM, KSeF), robotyzacja procesów (RPA) i agenci AI dla firm 5-50 osób. Stała cena, wdrożenie w 2-4 tygodnie.',
              knowsAbout: ['automatyzacja procesów', 'KSeF', 'n8n', 'integracja systemów', 'robotyzacja procesów RPA', 'agenci AI', 'Make.com'],
              sameAs: [
                'https://www.facebook.com/profile.php?id=61574333642391',
                'https://www.linkedin.com/company/omni-task',
                'https://www.instagram.com/omnitask.pl/',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+48721719238',
                email: 'kontakt@omnitask.pl',
                contactType: 'customer service',
                availableLanguage: ['Polish', 'English', 'Ukrainian'],
              },
            }),
          }}
        />
        {/* Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Automatyzacja procesów biznesowych',
              name: 'Automatyzacja procesów dla firm',
              description: 'Automatyzacja procesów w firmie: wdrożenie n8n, integracja systemów, automatyzacja faktur KSeF, robotyzacja procesów (RPA) i agenci AI.',
              provider: {
                '@type': 'Organization',
                name: 'OmniTask',
                '@id': 'https://www.omnitask.pl/#organization',
              },
              areaServed: {
                '@type': 'Country',
                name: 'PL',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Usługi automatyzacji procesów',
                itemListElement: [
                  {
                    '@type': 'OfferCatalog',
                    name: 'Robotyzacja procesów (RPA)',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Robotyzacja procesów biznesowych (RPA)',
                          description: 'Wdrażam roboty software\'owe, które automatycznie wykonują powtarzalne zadania biznesowe zamiast człowieka.',
                          url: 'https://www.omnitask.pl/uslugi/rpa',
                        },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Automatyzacja workflow (n8n, Make)',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Automatyzacja workflow z n8n i Make',
                          description: 'Projektuję i wdrażam automatyzacje w n8n oraz Make.com, łączące systemy i aplikacje w jeden przepływ pracy.',
                          url: 'https://www.omnitask.pl/uslugi/automatyzacja-workflow',
                        },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Integracja systemów',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Integracja systemów ERP, CRM i API',
                          description: 'Łączę systemy ERP, CRM, e-commerce i bazy danych w jeden ekosystem z automatyczną wymianą danych.',
                          url: 'https://www.omnitask.pl/uslugi/integracja-systemow',
                        },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Obsługa KSeF',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Automatyzacja obiegu faktur KSeF',
                          description: 'Automatyzuję obieg faktur po wdrożeniu KSeF: deduplikacja, routing do oddziałów i integracja z systemem księgowym.',
                          url: 'https://www.omnitask.pl/uslugi/ksef',
                        },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Agenci AI',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Agenci AI dla biznesu',
                          description: 'Buduję agentów AI, którzy analizują dokumenty, obsługują klientów i monitorują dane firmy.',
                          url: 'https://www.omnitask.pl/uslugi/agenci-ai',
                        },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Szkolenia i doradztwo z automatyzacji',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Szkolenia z automatyzacji z dofinansowaniem PARP',
                          description: 'Szkolenie i doradztwo z automatyzacji procesów, zarejestrowane w Bazie Usług Rozwojowych, do kupienia z dofinansowaniem do 83% kosztu.',
                          url: 'https://www.omnitask.pl/uslugi/szkolenia-i-doradztwo',
                        },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Opieka i hosting automatyzacji',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Opieka i hosting n8n',
                          description: 'Monitoring, naprawy i zarządzany hosting n8n dla wdrożonych automatyzacji.',
                          url: 'https://www.omnitask.pl/uslugi/opieka-i-hosting',
                        },
                      },
                    ],
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <CookieConsentProvider>
            <CtaModalProvider>
              <Navbar />
              <main>{children}</main>
              <Footer posts={footerPosts} />
            </CtaModalProvider>
          </CookieConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
