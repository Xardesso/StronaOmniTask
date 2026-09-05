import type { Metadata } from 'next'
import ServiceDetailContent from '@/components/pages/ServiceDetailContent'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/uslugi/integracja-systemow', metaKey: 'integration' })
}

export default function LocalizedIntegrationPage() {
  return <ServiceDetailContent serviceKey="integration" />
}
