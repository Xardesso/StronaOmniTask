import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bezpłatna wycena automatyzacji RPA',
  description:
    'Skontaktuj się z nami i otrzymaj bezpłatną wycenę wdrożenia automatyzacji RPA. Opisz swój proces, a my zaproponujemy optymalne rozwiązanie.',
  openGraph: {
    title: 'Bezpłatna Wycena – OmniTask',
    description: 'Zamów bezpłatną analizę swojego procesu. Pokażemy, ile zaoszczędzisz dzięki automatyzacji RPA i agentom AI.',
    url: 'https://www.omnitask.pl/zapytanie-ofertowe',
    type: 'website',
  },
  alternates: {
    canonical: '/zapytanie-ofertowe',
  },
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
