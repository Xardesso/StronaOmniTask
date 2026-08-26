import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPageMetadata({ locale: 'pl', cleanPath: '/blog', metaKey: 'blog' })

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
