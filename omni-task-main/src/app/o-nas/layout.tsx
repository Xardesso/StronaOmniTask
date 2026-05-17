import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O nas – Zespół OmniTask',
  description: 'Poznaj zespół OmniTask – ekspertów od automatyzacji procesów RPA i agentów AI. Nasza misja, wartości i doświadczenie.',
  openGraph: {
    title: 'O nas – OmniTask',
    description: 'Zespół specjalistów od automatyzacji RPA i AI.',
    url: 'https://www.omnitask.pl/o-nas',
    type: 'website',
  },
  alternates: { canonical: '/o-nas' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
