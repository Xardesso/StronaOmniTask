import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usługi automatyzacji RPA i AI',
  description:
    'Kompleksowe usługi automatyzacji procesów: RPA, automatyzacja workflow, integracja systemów, agenci AI. Sprawdź jak możemy pomóc Twojej firmie.',
  openGraph: {
    title: 'Usługi automatyzacji – OmniTask',
    description: 'Robotyzacja procesów, automatyzacja workflow, integracja systemów i agenci AI. Bezpłatna konsultacja.',
    url: 'https://www.omnitask.pl/uslugi',
    type: 'website',
  },
  alternates: {
    canonical: '/uslugi',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
