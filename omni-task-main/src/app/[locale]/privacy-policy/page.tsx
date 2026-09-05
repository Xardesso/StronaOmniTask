import type { Metadata } from 'next'
import PrivacyPolicyPage from '../../polityka-prywatnosci/page'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/polityka-prywatnosci', metaKey: 'privacy' })
}

export default function LocalizedPrivacyPage() {
  return <PrivacyPolicyPage />
}
