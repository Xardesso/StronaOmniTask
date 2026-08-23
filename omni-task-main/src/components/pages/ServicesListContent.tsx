'use client'

import LocaleLink from '@/components/LocaleLink'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'
import ServiceIcon from '@/components/ServiceIcon'

const ALL_SERVICES = [
  { slug: 'automatyzacja-workflow', titleKey: 'services.service1.title', descKey: 'services.service1.desc' },
  { slug: 'ksef', titleKey: 'services.service2.title', descKey: 'services.service2.desc', plOnly: true, highlight: true },
  { slug: 'integracja-systemow', titleKey: 'services.service3.title', descKey: 'services.service3.desc' },
  { slug: 'szkolenia-i-doradztwo', titleKey: 'services.service4.title', descKey: 'services.service4.desc', plOnly: true, highlight: true },
  { slug: 'rpa', titleKey: 'services.service5.title', descKey: 'services.service5.desc' },
  { slug: 'opieka-i-hosting', titleKey: 'services.service6.title', descKey: 'services.service6.desc', plOnly: true },
  { slug: 'agenci-ai', titleKey: 'services.service7.title', descKey: 'services.service7.desc' },
]

export default function ServicesListContent() {
  const { t, locale } = useTranslation()
  const services = ALL_SERVICES.filter((s) => !s.plOnly || locale === 'pl')

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('services_page.h1')}</h1>
        <p>{t('services.subtitle')}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.services') }]} />

      <div className="services-page">
        <div className="section__container">
          <div className="services-grid services-grid--6">
            {services.map((service) => (
              <LocaleLink
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className={`service-card service-card--link ${service.highlight ? 'service-card--highlight' : ''}`}
                title={t(service.titleKey)}
              >
                {service.highlight && <span className="badge badge--accent service-card__badge">Polecane</span>}
                <div className="service-card__icon">
                  <ServiceIcon slug={service.slug} size={28} />
                </div>
                <h2 style={{ fontSize: '1.25rem' }}>{t(service.titleKey)}</h2>
                <p>{t(service.descKey)}</p>
                <span className="service-card__cta">
                  {t('services_page.learn_more')}
                </span>
              </LocaleLink>
            ))}
          </div>

          <section className="service-detail__cta">
            <h2>{t('services_page.cta_title')}</h2>
            <p>{t('services_page.cta_subtitle')}</p>
            <LocaleLink href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title={t('cta.button')}>
              {t('cta.button')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </LocaleLink>
          </section>
        </div>
      </div>
    </>
  )
}
