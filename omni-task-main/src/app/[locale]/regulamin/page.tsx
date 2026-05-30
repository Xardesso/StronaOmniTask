import type { Metadata } from 'next'
import TermsPage from '../../regulamin/page'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/regulamin', metaKey: 'terms' })
}

export default function LocalizedTermsPage() {
  return <TermsPage />
}
