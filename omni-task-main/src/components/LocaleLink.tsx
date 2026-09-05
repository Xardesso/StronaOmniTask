'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentProps } from 'react'
import { localeFromPathname, localizePath } from '@/lib/i18n'

type LocaleLinkProps = ComponentProps<typeof Link>

// Wrapper na next/link, który automatycznie dokleja prefiks bieżącego języka
// i tłumaczy segmenty ścieżki na anglojęzyczne odpowiedniki EN/UA (np.
// "/uslugi" → "/en/services" gdy jesteśmy w /en, patrz INTL_PATH_MAP w
// lib/i18n.ts). Dzięki temu nawigacja w obrębie wersji EN/UA pozostaje w
// tym samym języku, a linki wewnętrzne zawsze wskazują na poprawny slug.
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const pathname = usePathname()
  const locale = localeFromPathname(pathname)

  let finalHref = href
  if (typeof href === 'string' && href.startsWith('/')) {
    finalHref = localizePath(href, locale)
  }

  return <Link href={finalHref} {...props} />
}
