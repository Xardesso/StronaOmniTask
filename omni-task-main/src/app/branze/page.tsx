import type { Metadata } from 'next'
import BranzeListContent from '@/components/pages/BranzeListContent'
import { buildPlOnlyMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPlOnlyMetadata({
  cleanPath: '/branze',
  metaKey: 'branze',
})

export default function BranzePage() {
  return <BranzeListContent />
}
