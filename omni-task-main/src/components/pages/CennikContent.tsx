'use client'

import { useMemo, useState } from 'react'
import LocaleLink from '@/components/LocaleLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL } from '@/lib/i18n'
import { IMPLEMENTATION_TIERS, AUDIT_TIER, CARE_TIERS } from '@/lib/pricing-data'
import { FEATURE_BUR } from '@/lib/site-config'

interface Faq { q: string; a: string }

export default function CennikContent() {
  const { t, tRaw } = useTranslation()
  const base = 'cennik_page'
  const faq = tRaw<Faq[]>(`${base}.faq`) || []

  const [people, setPeople] = useState(2)
  const [hours, setHours] = useState(20)
  const [rate, setRate] = useState(45)
  const [cost, setCost] = useState(14900)

  const { yearly, payback } = useMemo(() => {
    const monthlySavings = people * hours * rate
    const yearlySavings = monthlySavings * 12
    const paybackMonths = monthlySavings > 0 ? cost / monthlySavings : 0
    return { yearly: Math.round(yearlySavings), payback: paybackMonths }
  }, [people, hours, rate, cost])

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t(`${base}.h1`)}</h1>
        <p>{t(`${base}.subtitle`)}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.pricing') }]} />

      <div className="service-detail-page">
        <div className="section__container">
          <section className="service-detail__section">
            <h2>{t(`${base}.tier1_title`)}</h2>
            <div className="pricing-grid">
              {[...IMPLEMENTATION_TIERS, AUDIT_TIER].map((tier) => (
                <div key={tier.slug} className="pricing-card">
                  <div className="pricing-card__header">
                    {tier.featured && <span className="pricing-card__tag">Najczęściej wybierane</span>}
                    <span className="pricing-card__name">{tier.name}</span>
                    <div className="pricing-card__price">{tier.price}</div>
                  </div>
                  <div className="pricing-card__body">
                    <p className="pricing-card__scope">{tier.scope}</p>
                    <div className="pricing-card__time">{tier.time}</div>
                    <ul className="pricing-card__list">
                      {tier.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                    <LocaleLink href="/zapytanie-ofertowe" className="btn btn--dark" title={t('service_detail.cta_button')}>
                      {t('service_detail.cta_button')}
                    </LocaleLink>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="service-detail__section">
            <h2>{t(`${base}.tier2_title`)}</h2>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr><th>Usługa</th><th>Zakres</th><th>Cena</th></tr>
                </thead>
                <tbody>
                  {CARE_TIERS.map((c) => (
                    <tr key={c.name}>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.scope}</td>
                      <td>{c.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {FEATURE_BUR && (
            <section className="service-detail__section">
              <h2>{t(`${base}.tier3_title`)}</h2>
              <p>{t(`${base}.tier3_text`)}</p>
              <LocaleLink href="/dofinansowanie" className="btn btn--primary" title={t(`${base}.tier3_cta`)}>
                {t(`${base}.tier3_cta`)}
              </LocaleLink>
            </section>
          )}

          <section className="service-detail__section">
            <div className="callout">
              <strong>{t(`${base}.why_title`)}</strong> {t(`${base}.why_text`)}
            </div>
          </section>

          <section className="service-detail__section">
            <h2>{t(`${base}.calculator_title`)}</h2>
            <div className="calculator-card">
              <div className="calculator-card__row">
                <div className="calculator-card__field">
                  <label htmlFor="calc-people">{t(`${base}.calculator_people_label`)}</label>
                  <input id="calc-people" type="number" min={1} value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))} />
                </div>
                <div className="calculator-card__field">
                  <label htmlFor="calc-hours">{t(`${base}.calculator_hours_label`)}</label>
                  <input id="calc-hours" type="number" min={1} value={hours} onChange={(e) => setHours(Math.max(1, Number(e.target.value)))} />
                </div>
                <div className="calculator-card__field">
                  <label htmlFor="calc-rate">{t(`${base}.calculator_rate_label`)}</label>
                  <input id="calc-rate" type="number" min={1} value={rate} onChange={(e) => setRate(Math.max(1, Number(e.target.value)))} />
                </div>
              </div>
              <div className="calculator-card__result">
                <div className="calculator-card__result-item">
                  <span className="calculator-card__result-value">{yearly.toLocaleString('pl-PL')} zł</span>
                  <span className="calculator-card__result-label">{t(`${base}.calculator_result_yearly`)}</span>
                </div>
                <div className="calculator-card__result-item">
                  <span className="calculator-card__result-value">{payback > 0 ? payback.toFixed(1) : '–'} mies.</span>
                  <span className="calculator-card__result-label">{t(`${base}.calculator_result_payback`)} (przy wdrożeniu za {cost.toLocaleString('pl-PL')} zł)</span>
                </div>
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-light)', fontStyle: 'italic' }}>
              {t('roi_disclaimer')}
            </p>
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
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
            <LocaleLink href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title={t('cta.button')}>
              {t('cta.button')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </LocaleLink>
          </section>
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
            url: `${SITE_URL}/cennik`,
            offers: IMPLEMENTATION_TIERS.map((tier) => ({
              '@type': 'Offer',
              name: tier.name,
              price: tier.price,
              priceCurrency: 'PLN',
            })),
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
