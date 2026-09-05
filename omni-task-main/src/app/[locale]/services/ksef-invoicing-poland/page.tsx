import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import KsefIntlContent from '@/components/pages/KsefIntlContent'
import { SITE_URL } from '@/lib/i18n'

// Strona istnieje wyłącznie w wersji EN (audyt SEO 2026-09-02, sekcja 7) -
// adresuje zagraniczne firmy z polskim NIP, nie ma odpowiednika PL ani UA.
export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale !== 'en') return {}
  const canonical = `${SITE_URL}/en/services/ksef-invoicing-poland`
  const title = 'KSeF E-Invoicing for Foreign Companies in Poland | OmniTask'
  const description = "Poland's e-invoicing system KSeF is now mandatory. I connect your accounting system (SAP, NetSuite, Xero) to KSeF's API for your Polish subsidiary or branch."
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale: 'en_US',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1024, height: 1024, alt: title }],
    },
  }
}

export default async function KsefInvoicingPolandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'en') {
    notFound()
  }
  return <KsefIntlContent />
}
