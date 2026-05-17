import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agenci AI i systemy multi-agentowe',
  description:
    'Budujemy autonomicznych agentów AI i systemy multi-agentowe dla biznesu. Bezpłatna konsultacja.',
  openGraph: {
    title: 'Agenci AI – OmniTask',
    description: 'Autonomiczni agenci AI i systemy multi-agentowe.',
    url: 'https://www.omnitask.pl/uslugi/agenci-ai',
    type: 'website',
  },
  alternates: { canonical: '/uslugi/agenci-ai' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
