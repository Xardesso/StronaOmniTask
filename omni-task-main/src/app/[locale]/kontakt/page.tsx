import type { Metadata } from 'next'
import ContactPage from '../../kontakt/page'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/kontakt', metaKey: 'contact' })
}

export default function LocalizedContactPage() {
  return <ContactPage />
}
