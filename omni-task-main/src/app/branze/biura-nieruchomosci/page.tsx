import type { Metadata } from 'next'
import BranzaContent from '@/components/pages/BranzaContent'
import { buildPlOnlyMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPlOnlyMetadata({
  cleanPath: '/branze/biura-nieruchomosci',
  metaKey: 'branze_nieruchomosci',
})

export default function BiuraNieruchomosciPage() {
  return (
    <BranzaContent
      base="branze_nieruchomosci"
      slug="biura-nieruchomosci"
      relatedServices={[
        { key: 'integration', slug: 'integracja-systemow' },
        { key: 'ai', slug: 'agenci-ai' },
      ]}
    />
  )
}
