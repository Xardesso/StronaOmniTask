import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automatyzacja workflow',
  description:
    'Projektujemy i wdrażamy inteligentne przepływy pracy łączące systemy, aplikacje i ludzi. Zapier, Make, Power Automate. Bezpłatna konsultacja.',
  openGraph: {
    title: 'Automatyzacja workflow – OmniTask',
    description: 'Inteligentne przepływy pracy i automatyzacja procesów biznesowych. Zapier, Make, Power Automate.',
    url: 'https://www.omnitask.pl/uslugi/automatyzacja-workflow',
    type: 'website',
  },
  alternates: { canonical: '/uslugi/automatyzacja-workflow' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
