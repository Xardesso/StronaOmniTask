import type { Metadata } from 'next'
import { buildPlOnlyMetadata } from '@/lib/meta'
import { FEATURE_BUR } from '@/lib/site-config'

export const metadata: Metadata = {
  ...buildPlOnlyMetadata({ cleanPath: '/dofinansowanie', metaKey: 'dofinansowanie' }),
  // Nie indeksujemy, dopóki sekcja jest wyłączona flagą FEATURE_BUR.
  robots: FEATURE_BUR ? { index: true, follow: true } : { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
