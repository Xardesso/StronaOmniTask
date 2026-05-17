import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Robotyzacja procesów RPA',
  description:
    'Wdrażamy roboty software\'owe RPA, które automatycznie wykonują powtarzalne zadania biznesowe. UiPath, Power Automate, Python. Bezpłatna konsultacja.',
  openGraph: {
    title: 'Robotyzacja procesów RPA – OmniTask',
    description: 'Automatyzacja powtarzalnych zadań z RPA. Wdrażamy UiPath, Power Automate i Python boty.',
    url: 'https://www.omnitask.pl/uslugi/rpa',
    type: 'website',
  },
  alternates: { canonical: '/uslugi/rpa' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
