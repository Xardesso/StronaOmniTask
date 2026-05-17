import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – Automatyzacja RPA',
  description:
    'Skontaktuj się z zespołem OmniTask. Odpowiadamy na pytania dotyczące wdrożeń RPA, automatyzacji procesów i integracji systemów w Twojej firmie.',
  openGraph: {
    title: 'Kontakt – OmniTask',
    description: 'Porozmawiajmy o automatyzacji procesów w Twojej firmie. Bezpłatna konsultacja i wycena wdrożenia RPA.',
    url: 'https://www.omnitask.pl/kontakt',
    type: 'website',
  },
  alternates: {
    canonical: '/kontakt',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
