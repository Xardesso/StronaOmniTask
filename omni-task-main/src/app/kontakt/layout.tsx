import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPageMetadata({ locale: 'pl', cleanPath: '/kontakt', metaKey: 'contact' })

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
