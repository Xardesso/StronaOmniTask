import type { Metadata } from 'next'
import BranzaContent from '@/components/pages/BranzaContent'
import { buildPlOnlyMetadata } from '@/lib/meta'

export const metadata: Metadata = buildPlOnlyMetadata({
  cleanPath: '/branze/handel-i-ecommerce',
  metaKey: 'branze_ecommerce',
})

export default function HandelEcommercePage() {
  return (
    <BranzaContent
      base="branze_ecommerce"
      slug="handel-i-ecommerce"
      relatedServices={[
        { key: 'integration', slug: 'integracja-systemow' },
        { key: 'workflow', slug: 'automatyzacja-workflow' },
        { key: 'rpa', slug: 'rpa' },
      ]}
    />
  )
}
