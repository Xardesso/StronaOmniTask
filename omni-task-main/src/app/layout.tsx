import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Plus_Jakarta_Sans, Rajdhani } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/i18n/context'
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
        {/* Organization + LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['Organization', 'LocalBusiness'],
              '@id': 'https://www.omnitask.pl/#organization',
              name: 'OmniTask',
              url: 'https://www.omnitask.pl',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.omnitask.pl/Logo.png',
              },
              image: 'https://www.omnitask.pl/og-image.png',
              description: 'Eksperci od automatyzacji procesów biznesowych RPA i agentów AI. Wdrażamy roboty software\'owe, integrujemy systemy i optymalizujemy procesy.',
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
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PL',
              },
              priceRange: '$$',
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
                name: 'Usługi automatyzacji i RPA',
                itemListElement: [
                  {
                    '@type': 'OfferCatalog',
                    name: 'Robotyzacja procesów (RPA)',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Robotyzacja procesów (RPA)',
                          description: 'Wdrażamy roboty software\'owe, które automatycznie wykonują powtarzalne zadania biznesowe.',
                          url: 'https://www.omnitask.pl/uslugi/rpa',
                        },
                      },
                    ],
                  },
                  {
                    '@type': 'OfferCatalog',
                    name: 'Automatyzacja workflow',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Automatyzacja workflow',
                          description: 'Projektujemy inteligentne przepływy pracy łączące systemy i aplikacje.',
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
                          name: 'Integracja systemów',
                          description: 'Łączymy systemy ERP, CRM i bazy danych w jeden ekosystem.',
                          url: 'https://www.omnitask.pl/uslugi/integracja-systemow',
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
                          name: 'Agenci AI i systemy multi-agentowe',
                          description: 'Budujemy autonomicznych agentów AI realizujących złożone cele biznesowe.',
                          url: 'https://www.omnitask.pl/uslugi/agenci-ai',
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
          <Navbar />
          <main>{children}</main>
          <Footer posts={footerPosts} />
        </LanguageProvider>
      </body>
    </html>
  )
}
