'use client'

import LocaleLink from '@/components/LocaleLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL, localizePath } from '@/lib/i18n'

export type ServiceKey = 'rpa' | 'workflow' | 'integration' | 'ai'

interface Feature {
  title: string
  desc: string
}
interface Faq {
  q: string
  a: string
}

const SERVICES: { key: ServiceKey; slug: string }[] = [
  { key: 'rpa', slug: 'rpa' },
  { key: 'workflow', slug: 'automatyzacja-workflow' },
  { key: 'integration', slug: 'integracja-systemow' },
  { key: 'ai', slug: 'agenci-ai' },
]

export default function ServiceDetailContent({ serviceKey }: { serviceKey: ServiceKey }) {
  const { t, tRaw, locale } = useTranslation()
  const base = `service_detail.${serviceKey}`

  const features = tRaw<Feature[]>(`${base}.features`) || []
  const benefits = tRaw<string[]>(`${base}.benefits`) || []
  const faq = tRaw<Faq[]>(`${base}.faq`) || []
  const slug = SERVICES.find((s) => s.key === serviceKey)!.slug
  const related = SERVICES.filter((s) => s.key !== serviceKey)
  const canonicalUrl = `${SITE_URL}${localizePath(`/uslugi/${slug}`, locale)}`

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t(`${base}.h1`)}</h1>
        <p>{t(`${base}.subtitle`)}</p>
      </div>

      <Breadcrumbs
        items={[
          { label: t('nav.services'), href: '/uslugi' },
          { label: t(`${base}.breadcrumb`) },
        ]}
      />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            <section className="service-detail__section">
              <h2>{t(`${base}.s1_title`)}</h2>
              <p>{t(`${base}.s1_p1`)}</p>
              <p>{t(`${base}.s1_p2`)}</p>
            </section>

            {features.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.s2_title`)}</h2>
                <div className="features-grid">
                  {features.map((item, i) => (
                    <div key={i} className="feature-card">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {benefits.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.s3_title`)}</h2>
                <ul className="service-detail__benefits">
                  {benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            )}

            {faq.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.faq_title`)}</h2>
                <div className="faq-list">
                  {faq.map((item, i) => (
                    <div key={i} className="faq-item faq-item--static">
                      <h3 className="faq-item__question-static">{item.q}</h3>
                      <p className="faq-item__answer-static">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="service-detail__cta">
              <h2>{t(`${base}.cta_title`)}</h2>
              <p>{t(`${base}.cta_subtitle`)}</p>
              <LocaleLink href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title={t('service_detail.cta_button')}>
                {t('service_detail.cta_button')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </LocaleLink>
            </section>

            <section className="service-detail__related">
              <h3>{t(`${base}.related_title`)}</h3>
              <div className="service-detail__related-grid">
                {related.map((s) => (
                  <LocaleLink
                    key={s.key}
                    href={`/uslugi/${s.slug}`}
                    className="service-detail__related-card"
                    title={t(`service_detail.labels.${s.key}`)}
                  >
                    {t(`service_detail.labels.${s.key}`)} →
                  </LocaleLink>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: t(`${base}.h1`),
            description: t(`${base}.subtitle`),
            provider: { '@type': 'Organization', name: 'OmniTask', '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'Country', name: 'PL' },
            url: canonicalUrl,
          }),
        }}
      />

      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            }),
          }}
        />
      )}
    </>
  )
}
