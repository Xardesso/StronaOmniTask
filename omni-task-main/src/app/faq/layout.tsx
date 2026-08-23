import type { Metadata } from 'next'
import { buildPlOnlyMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPlOnlyMetadata({ cleanPath: '/faq', metaKey: 'faq' })

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
