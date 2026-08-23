import type { Metadata } from 'next'
import { buildPlOnlyMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPlOnlyMetadata({ cleanPath: '/uslugi/opieka-i-hosting', metaKey: 'opieka' })

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
