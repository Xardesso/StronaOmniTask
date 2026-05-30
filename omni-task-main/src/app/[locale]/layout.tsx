import { notFound } from 'next/navigation'
import { PREFIXED_LOCALES, isLocale } from '@/lib/i18n'

// Generujemy statycznie tylko wersje z prefiksem (en, ua). PL serwowany jest z roota.
export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale) || !PREFIXED_LOCALES.includes(locale)) {
    notFound()
  }
  return <>{children}</>
}
