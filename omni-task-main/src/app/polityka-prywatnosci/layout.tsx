import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polityka Prywatności',
  description: 'Polityka prywatności OmniTask. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/polityka-prywatnosci' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
