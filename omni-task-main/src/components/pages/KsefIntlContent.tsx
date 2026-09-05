'use client'

import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL } from '@/lib/i18n'
import CtaButton from '@/components/CtaButton'

interface TitleDesc { title: string; desc: string }
interface Faq { q: string; a: string }
interface CaseStudy { title: string; before: string; after: string; result: string }

// Strona wyłącznie dla EN (zagraniczne firmy działające w Polsce) - patrz
// audyt SEO 2026-09-02, sekcja 7 ("Brak strony KSeF po angielsku"). Osobna
// treść, nie tłumaczenie polskiej /uslugi/ksef, bo adresuje inny problem:
// obowiązek KSeF dla podmiotów zagranicznych z polskim NIP, nie integrację
// z polskim oprogramowaniem księgowym.
export default function KsefIntlContent() {
  const { t, tRaw } = useTranslation()
  const base = 'ksef_intl_page'

  const who = tRaw<TitleDesc[]>(`${base}.who`) || []
  const requirements = tRaw<string[]>(`${base}.requirements`) || []
  const solutions = tRaw<string[]>(`${base}.solutions`) || []
  const faq = tRaw<Faq[]>(`${base}.faq`) || []
  const caseStudy = tRaw<CaseStudy>(`${base}.case_study`)

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t(`${base}.h1`)}</h1>
        <p>{t(`${base}.subtitle`)}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.services'), href: '/uslugi' }, { label: t(`${base}.breadcrumb`) }]} />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            {who.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.who_title`)}</h2>
                <div className="features-grid">
                  {who.map((item, i) => (
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

            {requirements.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.requirements_title`)}</h2>
                <ul className="service-detail__benefits">
                  {requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </section>
            )}

            {solutions.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.solutions_title`)}</h2>
                <ul className="service-detail__benefits">
                  {solutions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
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

            <section className="service-detail__section">
              <h2>{t(`${base}.pricing_title`)}</h2>
              <div className="callout">{t(`${base}.pricing_text`)}</div>
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
              <h2>{t(`${base}.cta`)}</h2>
              <CtaButton className="btn btn--primary btn--lg" title={t(`${base}.cta`)}>
                {t(`${base}.cta`)}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </CtaButton>
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
            serviceType: t(`${base}.service_type`),
            provider: { '@type': 'Organization', name: 'OmniTask', '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'Country', name: 'PL' },
            url: `${SITE_URL}/en/services/ksef-invoicing-poland`,
            offers: {
              '@type': 'Offer',
              url: `${SITE_URL}/en/services/ksef-invoicing-poland`,
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 3225,
                priceCurrency: 'USD',
                minPrice: 3225,
              },
            },
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
