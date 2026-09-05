import type { Metadata } from 'next'
import QuoteRequestPage from '../../zapytanie-ofertowe/page'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/zapytanie-ofertowe', metaKey: 'quote' })
}

export default function LocalizedQuotePage() {
  return <QuoteRequestPage />
}
