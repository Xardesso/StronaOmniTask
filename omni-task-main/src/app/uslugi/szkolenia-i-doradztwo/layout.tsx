import type { Metadata } from 'next'
import { buildPlOnlyMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPlOnlyMetadata({ cleanPath: '/uslugi/szkolenia-i-doradztwo', metaKey: 'szkolenia' })

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
