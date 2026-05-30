'use client'

import LocaleLink from '@/components/LocaleLink'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useTranslation } from '@/i18n/context'
import { SITE_URL, localizePath } from '@/lib/i18n'

interface Value {
  title: string
  desc: string
}

export default function AboutContent() {
  const { t, tRaw, locale } = useTranslation()
  const values = tRaw<Value[]>('about_page.values') || []
  const whyList = tRaw<string[]>('about_page.why_list') || []

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
            <h2>{t('about_page.mission_title')}</h2>
            <p>{t('about_page.mission_p1')}</p>
            <p>
              {t('about_page.mission_p2_pre')}
              <LocaleLink href="/uslugi/rpa" title={t('service_detail.labels.rpa')}>{t('about_page.mission_link_rpa')}</LocaleLink>
              {t('about_page.mission_p2_mid1')}
              <LocaleLink href="/uslugi/automatyzacja-workflow" title={t('service_detail.labels.workflow')}>{t('about_page.mission_link_workflow')}</LocaleLink>
              {t('about_page.mission_p2_mid2')}
              <LocaleLink href="/uslugi/integracja-systemow" title={t('service_detail.labels.integration')}>{t('about_page.mission_link_integration')}</LocaleLink>
              {t('about_page.mission_p2_mid3')}
              <LocaleLink href="/uslugi/agenci-ai" title={t('service_detail.labels.ai')}>{t('about_page.mission_link_ai')}</LocaleLink>
              {t('about_page.mission_p2_end')}
            </p>
          </section>

          <section className="service-detail__section">
            <h2>{t('about_page.values_title')}</h2>
            <div className="features-grid">
              {values.map((v, i) => (
                <div key={i} className="feature-card"><div><h3>{v.title}</h3><p>{v.desc}</p></div></div>
              ))}
            </div>
          </section>

          <section className="service-detail__section">
            <h2>{t('about_page.why_title')}</h2>
            <ul className="service-detail__benefits">
              {whyList.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </section>

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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'AboutPage',
        name: t('about_page.h1'),
        description: t('about_page.subtitle'),
        url: `${SITE_URL}${localizePath('/o-nas', locale)}`,
        mainEntity: { '@type': 'Organization', name: 'OmniTask', '@id': `${SITE_URL}/#organization` },
      })}} />
    </>
  )
}
