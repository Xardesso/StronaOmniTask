import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regulamin',
  description: 'Regulamin korzystania z serwisu OmniTask.pl. Warunki świadczenia usług drogą elektroniczną.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/regulamin' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
