import type { Metadata } from 'next'
import AboutContent from '@/components/pages/AboutContent'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/o-nas', metaKey: 'about' })
}

export default function LocalizedAboutPage() {
  return <AboutContent />
}
