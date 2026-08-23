'use client'

import LocaleLink from '@/components/LocaleLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL, localizePath } from '@/lib/i18n'
import { FOUNDER, CALCOM_URL } from '@/lib/site-config'

export default function AboutContent() {
  const { t, tRaw, locale } = useTranslation()
  const notDoingItems = tRaw<string[]>('about_page.not_doing_items') || []
  const techItems = tRaw<string[]>('about_page.tech_items') || []

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('about_page.h1')}</h1>
        <p>{t('about_page.subtitle')}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.about') }]} />

      <div className="about-page">
        <div className="section__container">
          <section className="service-detail__section">
            <div className="founder">
              <div className="founder__photo">
                {FOUNDER.photo ? (
                  <img src={FOUNDER.photo} alt={FOUNDER.name} />
                ) : (
                  FOUNDER.name.split(' ').map((n) => n[0]).join('')
                )}
              </div>
              <div>
                <h2 className="founder__name">{t('about_page.why_title')}</h2>
                <p>{t('about_page.why_p1')}</p>
                <p>{t('about_page.why_p2')}</p>
              </div>
            </div>
          </section>

          <section className="service-detail__section">
            <h2>{t('about_page.how_title')}</h2>
            <p>{t('about_page.how_text')}</p>
          </section>

          {notDoingItems.length > 0 && (
            <section className="service-detail__section">
              <h2>{t('about_page.not_doing_title')}</h2>
              <ul className="not-doing-list">
                {notDoingItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {techItems.length > 0 && (
            <section className="service-detail__section">
              <h2>{t('about_page.tech_title')}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {techItems.map((tech, i) => (
                  <span key={i} className="badge badge--accent">{tech}</span>
                ))}
              </div>
            </section>
          )}

          <section className="service-detail__cta">
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
            <a href={CALCOM_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg" title={t('cta.button')}>
              {t('cta.button')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </section>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'AboutPage',
        name: t('about_page.h1'),
        description: t('about_page.subtitle'),
        url: `${SITE_URL}${localizePath('/o-nas', locale)}`,
        mainEntity: {
          '@type': 'Person',
          name: FOUNDER.name,
          jobTitle: 'Automatyzacja procesów',
          worksFor: { '@type': 'Organization', name: 'OmniTask', '@id': `${SITE_URL}/#organization` },
        },
      })}} />
    </>
  )
}
