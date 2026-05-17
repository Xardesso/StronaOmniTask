import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog – Automatyzacja RPA i AI',
  description:
    'Artykuły eksperckie o RPA, automatyzacji procesów i agentach AI. Praktyczne porady, case studies i trendy technologiczne. Czytaj i wdrażaj →',
  openGraph: {
    title: 'Blog OmniTask – Automatyzacja, RPA i AI',
    description: 'Praktyczna wiedza o automatyzacji procesów. Artykuły eksperckie, porady i case studies z wdrożeń RPA i AI.',
    url: 'https://www.omnitask.pl/blog',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
