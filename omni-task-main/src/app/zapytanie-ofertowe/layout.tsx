import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPageMetadata({ locale: 'pl', cleanPath: '/zapytanie-ofertowe', metaKey: 'quote' })

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
