import type { Metadata } from 'next'
import BranzaContent from '@/components/pages/BranzaContent'
import { buildPlOnlyMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPlOnlyMetadata({
  cleanPath: '/branze/biura-rachunkowe',
  metaKey: 'branze_rachunkowe',
})

export default function BiuraRachunkowePage() {
  return (
    <BranzaContent
      base="branze_rachunkowe"
      slug="biura-rachunkowe"
      relatedServices={[
        { key: 'ksef', slug: 'ksef' },
        { key: 'rpa', slug: 'rpa' },
        { key: 'integration', slug: 'integracja-systemow' },
      ]}
    />
  )
}
