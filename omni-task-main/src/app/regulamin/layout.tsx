import { buildHreflangAlternates } from '@/lib/i18n'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regulamin serwisu i świadczenia usług online',
  description: 'Regulamin korzystania z serwisu OmniTask.pl. Warunki świadczenia usług drogą elektroniczną.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/regulamin',
    languages: buildHreflangAlternates('/regulamin'), },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
