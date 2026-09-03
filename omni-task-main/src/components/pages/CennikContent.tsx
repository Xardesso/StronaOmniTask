'use client'

import { useMemo, useState } from 'react'
import LocaleLink from '@/components/LocaleLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL } from '@/lib/i18n'
import { getImplementationTiers, getKsefTier, getAuditTier, getCareTiers } from '@/lib/pricing-data'
import { FEATURE_BUR } from '@/lib/site-config'
import { convertPlnToUsd, formatMoney, formatMoneyFrom, formatMoneyMonthly, formatPln, formatUsd } from '@/lib/currency'
import CtaButton from '@/components/CtaButton'

interface Faq { q: string; a: string }

export default function CennikContent() {
  const { t, tRaw, locale } = useTranslation()
  const base = 'cennik_page'
  const faq = tRaw<Faq[]>(`${base}.faq`) || []
  const IMPLEMENTATION_TIERS = getImplementationTiers(t, tRaw)
  const KSEF_TIER = getKsefTier(t, tRaw)
  const AUDIT_TIER = getAuditTier(t, tRaw)
  const CARE_TIERS = getCareTiers(t, tRaw)

  const [hours, setHours] = useState(20)
  const [rate, setRate] = useState(45)
  const [processCount, setProcessCount] = useState(1)

  const selectedTier = useMemo(() => {
    const bySlug = (slug: string) => IMPLEMENTATION_TIERS.find((tier) => tier.slug === slug)!
    if (processCount <= 1) return bySlug('start')
    if (processCount <= 4) return bySlug('core')
    return bySlug('transformacja')
  }, [processCount])
  // W PLN liczymy wprost, dla innych lokalizacji przeliczamy na USD, żeby
  // koszt wdrożenia i wpisana przez użytkownika stawka były w tej samej walucie.
  const cost = useMemo(
    () => (locale === 'pl' ? selectedTier.priceValue : convertPlnToUsd(selectedTier.priceValue)),
    [selectedTier, locale]
  )

  const { yearly, payback } = useMemo(() => {
    const monthlySavings = hours * rate
    const yearlySavings = monthlySavings * 12
    const paybackMonths = monthlySavings > 0 ? cost / monthlySavings : 0
    return { yearly: Math.round(yearlySavings), payback: paybackMonths }
  }, [hours, rate, cost])

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
              {IMPLEMENTATION_TIERS.map((tier) => (
                <div key={tier.slug} className="pricing-card">
                  <div className="pricing-card__header">
                    {tier.featured && <span className="pricing-card__tag">{t(`${base}.featured_badge`)}</span>}
                    <span className="pricing-card__name">{tier.name}</span>
                    <div className="pricing-card__price">{formatMoneyFrom(tier.priceValue, locale, !!tier.isFrom)}</div>
                  </div>
                  <div className="pricing-card__body">
                    <p className="pricing-card__scope">{tier.scope}</p>
                    <div className="pricing-card__time">{tier.time}</div>
                    <ul className="pricing-card__list">
                      {tier.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                    <CtaButton className="btn btn--dark" title={t('service_detail.cta_button')}>
                      {t('service_detail.cta_button')}
                    </CtaButton>
                  </div>
                </div>
              ))}

              <div className="pricing-card pricing-card--standalone">
                <div className="pricing-card__header">
                  <span className="pricing-card__name">{KSEF_TIER.name}</span>
                  <div className="pricing-card__price">{formatMoneyFrom(KSEF_TIER.priceValue, locale, !!KSEF_TIER.isFrom)}</div>
                </div>
                <div className="pricing-card__body">
                  <p className="pricing-card__scope">{KSEF_TIER.scope}</p>
                  <div className="pricing-card__time">{KSEF_TIER.time}</div>
                  <ul className="pricing-card__list">
                    {KSEF_TIER.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <CtaButton className="btn btn--dark" title={t('service_detail.cta_button')}>
                    {t('service_detail.cta_button')}
                  </CtaButton>
                </div>
              </div>
            </div>

            <div className="audit-banner">
              <div className="audit-banner__text">
                <span className="badge badge--accent">{t(`${base}.audit_badge`)}</span>
                <h3>{AUDIT_TIER.name}</h3>
                <p>{AUDIT_TIER.scope} {AUDIT_TIER.time}.</p>
                <p className="audit-banner__exit-note">{AUDIT_TIER.exitNote}</p>
                <ul className="audit-banner__list">
                  {AUDIT_TIER.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div className="audit-banner__price">
                <div className="audit-banner__value">{formatMoney(AUDIT_TIER.priceValue, locale)}</div>
                <p className="audit-banner__deduction">{AUDIT_TIER.deductionNote}</p>
                <CtaButton className="btn btn--primary" title={t('service_detail.cta_button')}>
                  {t('service_detail.cta_button')}
                </CtaButton>
              </div>
            </div>
          </section>

          <section className="service-detail__section">
            <h2>{t(`${base}.tier2_title`)}</h2>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr><th>{t(`${base}.care_table_service`)}</th><th>{t(`${base}.care_table_scope`)}</th><th>{t(`${base}.care_table_price`)}</th></tr>
                </thead>
                <tbody>
                  {CARE_TIERS.map((c) => (
                    <tr key={c.name}>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.scope}</td>
                      <td>{formatMoneyMonthly(c.priceValue, locale)}</td>
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
                  <label htmlFor="calc-hours">{t(`${base}.calculator_hours_label`)}</label>
                  <div className="calculator-card__field-input">
                    <input id="calc-hours" type="number" min={1} value={hours} onChange={(e) => setHours(Math.max(1, Number(e.target.value)))} />
                    <span className="calculator-card__field-unit">godz.</span>
                  </div>
                </div>
                <div className="calculator-card__field">
                  <label htmlFor="calc-rate">{t(`${base}.calculator_rate_label`)}</label>
                  <div className="calculator-card__field-input">
                    <input id="calc-rate" type="number" min={1} value={rate} onChange={(e) => setRate(Math.max(1, Number(e.target.value)))} />
                    <span className="calculator-card__field-unit">{locale === 'pl' ? 'zł/h' : '$/h'}</span>
                  </div>
                </div>
                <div className="calculator-card__field">
                  <label htmlFor="calc-processes">{t(`${base}.calculator_processes_label`)}</label>
                  <div className="calculator-card__field-input">
                    <input id="calc-processes" type="number" min={1} value={processCount} onChange={(e) => setProcessCount(Math.max(1, Number(e.target.value)))} />
                    <span className="calculator-card__field-unit">proc.</span>
                  </div>
                </div>
              </div>
              <div className="calculator-card__tier-hint">
                {t(`${base}.calculator_tier_hint`)} <strong>{selectedTier.name}</strong> ({formatMoneyFrom(selectedTier.priceValue, locale, !!selectedTier.isFrom)})
              </div>
              <div className="calculator-card__result">
                <div className="calculator-card__result-item">
                  <span className="calculator-card__result-value">{locale === 'pl' ? formatPln(yearly) : formatUsd(yearly)}</span>
                  <span className="calculator-card__result-label">{t(`${base}.calculator_result_yearly`)}</span>
                </div>
                <div className="calculator-card__result-divider" />
                <div className="calculator-card__result-item">
                  <span className="calculator-card__result-value">{payback > 0 ? payback.toFixed(1) : '–'} mies.</span>
                  <span className="calculator-card__result-label">{t(`${base}.calculator_result_payback`)} ({locale === 'pl' ? `wdrożenie za ${formatPln(cost)}` : `implementation at ${formatUsd(cost)}`})</span>
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
            <CtaButton className="btn btn--primary btn--lg" title={t('cta.button')}>
              {t('cta.button')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </CtaButton>
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
            offers: [...IMPLEMENTATION_TIERS, KSEF_TIER].map((tier) => ({
              '@type': 'Offer',
              name: tier.name,
              price: locale === 'pl' ? tier.priceValue : convertPlnToUsd(tier.priceValue),
              priceCurrency: locale === 'pl' ? 'PLN' : 'USD',
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
