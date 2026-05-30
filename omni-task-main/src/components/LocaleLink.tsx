'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentProps } from 'react'
import { localeFromPathname, localizePath } from '@/lib/i18n'

type LocaleLinkProps = ComponentProps<typeof Link>

// Wrapper na next/link, który automatycznie dokleja prefiks bieżącego języka
// do wewnętrznych ścieżek (np. "/uslugi" → "/en/uslugi" gdy jesteśmy w /en).
// Dzięki temu nawigacja w obrębie wersji EN/UA pozostaje w tym samym języku.
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const pathname = usePathname()
  const locale = localeFromPathname(pathname)

  let finalHref = href
  if (typeof href === 'string' && href.startsWith('/')) {
    finalHref = localizePath(href, locale)
  }

  return <Link href={finalHref} {...props} />
}
