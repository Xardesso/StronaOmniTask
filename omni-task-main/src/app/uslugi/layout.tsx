import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPageMetadata({ locale: 'pl', cleanPath: '/uslugi', metaKey: 'uslugi' })

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
