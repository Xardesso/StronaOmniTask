'use client'

import { useMemo, useState } from 'react'
import LocaleLink from '@/components/LocaleLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL } from '@/lib/i18n'
import { FUNDING_LIMITS, FUNDING_RATE } from '@/lib/pricing-data'
import { formatPln } from '@/lib/currency'
import CtaButton from '@/components/CtaButton'

interface Step { title: string; desc: string }
interface Faq { q: string; a: string }

export default function DofinansowanieContent() {
  const { t, tRaw } = useTranslation()
  const base = 'dofinansowanie_page'

  const steps = tRaw<Step[]>(`${base}.how_steps`) || []
  const scopeItems = tRaw<string[]>(`${base}.scope_items`) || []
  const faq = tRaw<Faq[]>(`${base}.faq`) || []

  const [value, setValue] = useState(18000)
  const { funding, ownContribution } = useMemo(() => {
    return {
      funding: Math.round(value * FUNDING_RATE),
      ownContribution: Math.round(value * (1 - FUNDING_RATE)),
    }
  }, [value])

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t(`${base}.h1`)}</h1>
        <p>{t(`${base}.subtitle`)}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.funding') }]} />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            <section className="service-detail__section">
              <h2>{t(`${base}.limits_title`)}</h2>
              <div className="table-wrap">
                <table className="data-table">
                  <thead><tr><th>Wielkość firmy</th><th>Limit dofinansowania</th></tr></thead>
                  <tbody>
                    {FUNDING_LIMITS.map((row) => (
                      <tr key={row.size}><td>{row.size}</td><td><strong>{row.limit}</strong></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {steps.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.how_title`)}</h2>
                <div className="steps-list">
                  {steps.map((s, i) => (
                    <div key={i} className="steps-list__item">
                      <div><h3>{s.title}</h3><p>{s.desc}</p></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {scopeItems.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.scope_title`)}</h2>
                <ul className="service-detail__benefits">
                  {scopeItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="callout" style={{ marginTop: '1.5rem' }}>{t(`${base}.scope_disclaimer`)}</div>
              </section>
            )}

            <section className="service-detail__section">
              <h2>{t(`${base}.operators_title`)}</h2>
              <div className="callout">{t(`${base}.operators_note`)}</div>
            </section>

            <section className="service-detail__section">
              <h2>{t(`${base}.calculator_title`)}</h2>
              <div className="calculator-card" style={{ maxWidth: '620px' }}>
                <div className="calculator-card__row" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="calculator-card__field">
                    <label htmlFor="funding-value">Wartość usługi</label>
                    <div className="calculator-card__field-input">
                      <input id="funding-value" type="number" min={0} value={value} onChange={(e) => setValue(Math.max(0, Number(e.target.value)))} />
                      <span className="calculator-card__field-unit">zł</span>
                    </div>
                  </div>
                </div>
                <div className="calculator-card__result">
                  <div className="calculator-card__result-item">
                    <span className="calculator-card__result-value">{formatPln(funding)}</span>
                    <span className="calculator-card__result-label">Dofinansowanie (83%)</span>
                  </div>
                  <div className="calculator-card__result-divider" />
                  <div className="calculator-card__result-item">
                    <span className="calculator-card__result-value">{formatPln(ownContribution)}</span>
                    <span className="calculator-card__result-label">Twój wkład własny</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="service-detail__section">
              <h2>{t(`${base}.services_title`)}</h2>
              <p>
                Szkolenia i doradztwo z automatyzacji, które można kupić z dofinansowaniem, opisuję na stronie{' '}
                <LocaleLink href="/uslugi/szkolenia-i-doradztwo" title={t('service_detail.labels.szkolenia')}>
                  {t('service_detail.labels.szkolenia')}
                </LocaleLink>
                . Dokładny zakres i cenę ustalam indywidualnie po sprawdzeniu kwalifikowalności.
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
              <h2>{t(`${base}.cta`)}</h2>
              <CtaButton className="btn btn--primary btn--lg" title={t(`${base}.cta`)}>
                {t(`${base}.cta`)}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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
            provider: { '@type': 'Organization', name: 'OmniTask', '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'Country', name: 'PL' },
            url: `${SITE_URL}/dofinansowanie`,
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
