'use client'

import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL } from '@/lib/i18n'
import CtaButton from '@/components/CtaButton'

interface TitleDesc { title: string; desc: string }
interface Faq { q: string; a: string }

export default function KsefContent() {
  const { t, tRaw } = useTranslation()
  const base = 'ksef_page'

  const problems = tRaw<TitleDesc[]>(`${base}.problems`) || []
  const solutions = tRaw<string[]>(`${base}.solutions`) || []
  const faq = tRaw<Faq[]>(`${base}.faq`) || []

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
            {problems.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.problems_title`)}</h2>
                <div className="problem-grid">
                  {problems.map((p, i) => (
                    <div key={i} className="problem-card">
                      <div className="problem-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{p.title}</h3>
                        <p>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

            <section className="service-detail__section">
              <h2>{t(`${base}.effects_title`)}</h2>
              <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span className="stat-card__value" style={{ color: 'var(--color-accent-dark)' }}>{t(`${base}.effect1_value`)}</span>
                  <span className="stat-card__label" style={{ color: 'var(--color-text-light)' }}>{t(`${base}.effect1_label`)}</span>
                </div>
                <div className="stat-card" style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)' }}>
                  <span className="stat-card__value" style={{ color: 'var(--color-accent-dark)' }}>{t(`${base}.effect2_value`)}</span>
                  <span className="stat-card__label" style={{ color: 'var(--color-text-light)' }}>{t(`${base}.effect2_label`)}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontStyle: 'italic', marginTop: '1.25rem' }}>
                {t(`${base}.effects_disclaimer`)}
              </p>
            </section>

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
            url: `${SITE_URL}/uslugi/ksef`,
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
