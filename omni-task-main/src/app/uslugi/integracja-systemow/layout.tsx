import { buildHreflangAlternates } from '@/lib/i18n'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integracja systemów IT – ERP, CRM, API i bazy danych',
  description:
    'Łączymy ERP, CRM, e-mail i bazy danych w jeden ekosystem z automatyczną wymianą danych. API, ETL, middleware. Bezpłatna konsultacja.',
  openGraph: {
    title: 'Integracja systemów – OmniTask',
    description: 'Połączenie ERP, CRM i baz danych w jeden zautomatyzowany ekosystem.',
    url: 'https://www.omnitask.pl/uslugi/integracja-systemow',
    type: 'website',
  },
  alternates: { canonical: '/uslugi/integracja-systemow',
    languages: buildHreflangAlternates('/uslugi/integracja-systemow'), },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
