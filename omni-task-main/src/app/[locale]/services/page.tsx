import type { Metadata } from 'next'
import ServicesListContent from '@/components/pages/ServicesListContent'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/uslugi', metaKey: 'uslugi' })
}

export default function LocalizedServicesPage() {
  return <ServicesListContent />
}
