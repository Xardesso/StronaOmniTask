import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPageMetadata({ locale: 'pl', cleanPath: '/uslugi/integracja-systemow', metaKey: 'integration' })

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
