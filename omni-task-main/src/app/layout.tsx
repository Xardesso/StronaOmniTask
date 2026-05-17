import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/i18n/context'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'OmniTask – Automatyzacja RPA dla firm | Wdrożenia robotów',
    template: '%s | OmniTask',
  },
  description:
    'OmniTask to eksperci od automatyzacji procesów biznesowych RPA. Wdrażamy roboty, które eliminują powtarzalne zadania i redukują koszty operacyjne Twojej firmy.',
  keywords: [
    'OmniTask',
    'automatyzacja procesów',
    'robotyzacja procesów',
    'RPA',
    'robotic process automation',
    'automatyzacja workflow',
    'integracja systemów',
    'agenci AI',
    'multi-agent AI',
  ],
  metadataBase: new URL('https://www.omnitask.pl'),
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.omnitask.pl',
    siteName: 'OmniTask',
    title: 'OmniTask - Automatyzacja i robotyzacja procesów biznesowych',
    description:
      'Wdrażamy RPA, automatyzację workflow i agentów AI. Redukujemy koszty operacyjne i przyspieszamy procesy biznesowe Twojej firmy.',
    images: [
      {
        url: 'https://www.omnitask.pl/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OmniTask – Automatyzacja, RPA i Agenci AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniTask - Automatyzacja i robotyzacja procesów',
    description:
      'Eksperci od RPA, automatyzacji workflow i agentów AI. Bezpłatna konsultacja i wycena wdrożenia.',
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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
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
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
