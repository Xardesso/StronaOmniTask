import type { Metadata } from 'next'
import CennikContent from '@/components/pages/CennikContent'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/cennik', metaKey: 'cennik' })
}

export default function LocalizedCennikPage() {
  return <CennikContent />
}
