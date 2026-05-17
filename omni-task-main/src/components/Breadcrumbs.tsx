'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation()

  const allItems = [{ label: t('breadcrumbs.home'), href: '/' }, ...items]

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb" id="breadcrumbs">
        <ol className="breadcrumbs__list">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1
            return (
              <li key={index} className="breadcrumbs__item">
                {isLast || !item.href ? (
                  <span className="breadcrumbs__current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="breadcrumbs__link" title={item.label}>
                      {item.label}
                    </Link>
                    <span className="breadcrumbs__separator" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: allItems.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.label,
              item: item.href
                ? `https://www.omnitask.pl${item.href}`
                : undefined,
            })),
          }),
        }}
      />
    </>
  )
}
