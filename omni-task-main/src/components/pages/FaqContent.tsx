'use client'

import { useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL } from '@/lib/i18n'

interface Faq { q: string; a: string }

const CATEGORIES = [
  { key: 'cat_general', itemsKey: 'cat_general_items' },
  { key: 'cat_cooperation', itemsKey: 'cat_cooperation_items' },
  { key: 'cat_pricing', itemsKey: 'cat_pricing_items' },
  { key: 'cat_funding', itemsKey: 'cat_funding_items' },
]

export default function FaqContent() {
  const { t, tRaw } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(null)

  const groups = CATEGORIES.map((cat) => ({
    title: t(`faq_page.${cat.key}`),
    items: tRaw<Faq[]>(`faq_page.${cat.itemsKey}`) || [],
  }))

  const allItems = groups.flatMap((g) => g.items)

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('faq_page.h1')}</h1>
        <p>{t('faq_page.subtitle')}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.faq') }]} />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            {groups.map((group, gi) => (
              group.items.length > 0 && (
                <section className="service-detail__section" key={gi}>
                  <h2>{group.title}</h2>
                  <div className="faq-list">
                    {group.items.map((item, i) => {
                      const id = `${gi}-${i}`
                      return (
                        <div key={id} className={`faq-item ${openId === id ? 'faq-item--open' : ''}`}>
                          <button
                            className="faq-item__question"
                            onClick={() => setOpenId(openId === id ? null : id)}
                            aria-expanded={openId === id}
                          >
                            <span>{item.q}</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faq-item__icon">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>
                          <div className="faq-item__answer">
                            <p>{item.a}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </>
  )
}
