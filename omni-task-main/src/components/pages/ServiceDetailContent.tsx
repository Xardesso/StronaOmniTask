'use client'

import LocaleLink from '@/components/LocaleLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL, localizePath } from '@/lib/i18n'
import { convertPlnToUsd } from '@/lib/currency'
import CtaButton from '@/components/CtaButton'

export type ServiceKey = 'rpa' | 'workflow' | 'integration' | 'ai' | 'ksef' | 'szkolenia' | 'opieka'

// Cena startowa do danych strukturalnych (Offer) - dopasowana do faktycznego
// pakietu z cennika, nie wymyślona. "szkolenia" nie ma ceny jednostkowej
// (usługa z dofinansowaniem PARP), więc celowo bez wpisu - Offer jest wtedy pomijany.
const SERVICE_PRICE_HINT: Partial<Record<ServiceKey, { priceValue: number; isFrom: boolean; monthly?: boolean }>> = {
  rpa: { priceValue: 5900, isFrom: true },
  workflow: { priceValue: 5900, isFrom: true },
  integration: { priceValue: 5900, isFrom: true },
  ai: { priceValue: 14900, isFrom: true },
  ksef: { priceValue: 12900, isFrom: false },
  opieka: { priceValue: 390, isFrom: true, monthly: true },
}

interface TitleDesc {
  title: string
  desc: string
}
interface Faq {
  q: string
  a: string
}
interface CaseStudy {
  title: string
  before: string
  after: string
  result: string
}

const SERVICES: { key: ServiceKey; slug: string }[] = [
  { key: 'rpa', slug: 'rpa' },
  { key: 'workflow', slug: 'automatyzacja-workflow' },
  { key: 'integration', slug: 'integracja-systemow' },
  { key: 'ai', slug: 'agenci-ai' },
  { key: 'ksef', slug: 'ksef' },
  { key: 'szkolenia', slug: 'szkolenia-i-doradztwo' },
  { key: 'opieka', slug: 'opieka-i-hosting' },
]

export default function ServiceDetailContent({ serviceKey }: { serviceKey: ServiceKey }) {
  const { t, tRaw, locale } = useTranslation()
  const base = `service_detail.${serviceKey}`

  const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

  const dlaKogo = asArray<TitleDesc>(tRaw(`${base}.dla_kogo`))
  const zastosowania = asArray<TitleDesc>(tRaw(`${base}.zastosowania`))
  const wdrozenie = asArray<TitleDesc>(tRaw(`${base}.wdrozenie`))
  const technologieList = asArray<string>(tRaw(`${base}.technologie_list`))
  const benefits = asArray<string>(tRaw(`${base}.benefits`))
  const faq = asArray<Faq>(tRaw(`${base}.faq`))
  const nieOplaca = asArray<string>(tRaw(`${base}.nie_oplaca`))
  const caseStudyRaw = tRaw<CaseStudy | string>(`${base}.case_study`)
  const caseStudy = caseStudyRaw && typeof caseStudyRaw === 'object' ? caseStudyRaw : null
  const slug = SERVICES.find((s) => s.key === serviceKey)!.slug
  const related = SERVICES.filter((s) => s.key !== serviceKey && s.key !== 'szkolenia').slice(0, 3)
  const canonicalUrl = `${SITE_URL}${localizePath(`/uslugi/${slug}`, locale)}`
  const priceHint = SERVICE_PRICE_HINT[serviceKey]

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

            {dlaKogo.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.dla_kogo_title`)}</h2>
                <div className="features-grid">
                  {dlaKogo.map((item, i) => (
                    <div key={i} className="feature-card">
                      <div className="feature-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {zastosowania.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.zastosowania_title`)}</h2>
                <div className="features-grid">
                  {zastosowania.map((item, i) => (
                    <div key={i} className="feature-card">
                      <div className="feature-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {wdrozenie.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.wdrozenie_title`)}</h2>
                <div className="steps-list">
                  {wdrozenie.map((item, i) => (
                    <div key={i} className="steps-list__item">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {caseStudy && (
              <section className="service-detail__section">
                <h2>{caseStudy.title}</h2>
                <div className="case-study">
                  <div className="case-study__col">
                    <strong>{t('service_detail.case_study_before')}</strong>
                    <p>{caseStudy.before}</p>
                  </div>
                  <div className="case-study__col">
                    <strong>{t('service_detail.case_study_after')}</strong>
                    <p>{caseStudy.after}</p>
                  </div>
                </div>
                <p className="case-study__result"><strong>{t('service_detail.case_study_result')}:</strong> {caseStudy.result}</p>
              </section>
            )}

            {technologieList.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.technologie_title`)}</h2>
                <p>{t(`${base}.technologie_p`)}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
                  {technologieList.map((tech, i) => (
                    <span key={i} className="badge badge--accent">{tech}</span>
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

            {nieOplaca.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.nie_oplaca_title`)}</h2>
                <ul className="service-detail__benefits service-detail__nie-oplaca">
                  {nieOplaca.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="service-detail__section">
              <div className="callout">
                <strong>{t(`${base}.cena_label`)}</strong> {t(`${base}.cena_text`)}{' '}
                <LocaleLink href="/cennik" title={t('nav.pricing')}>{t('services_page.learn_more')}</LocaleLink>
              </div>
            </section>

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
              <CtaButton className="btn btn--primary btn--lg" title={t('service_detail.cta_button')}>
                {t('service_detail.cta_button')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </CtaButton>
            </section>

            {related.length > 0 && (
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
            )}
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
            serviceType: t(`${base}.service_type`),
            provider: { '@type': 'Organization', name: 'OmniTask', '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'Country', name: 'PL' },
            url: canonicalUrl,
            ...(priceHint ? {
              offers: {
                '@type': 'Offer',
                url: canonicalUrl,
                priceCurrency: locale === 'pl' ? 'PLN' : 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: locale === 'pl' ? priceHint.priceValue : convertPlnToUsd(priceHint.priceValue),
                  priceCurrency: locale === 'pl' ? 'PLN' : 'USD',
                  ...(priceHint.isFrom ? { minPrice: locale === 'pl' ? priceHint.priceValue : convertPlnToUsd(priceHint.priceValue) } : {}),
                  ...(priceHint.monthly ? { unitCode: 'MON' } : {}),
                },
              },
            } : {}),
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
