'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'

const services = [
  {
    slug: 'rpa',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 10l3 3 7-7" />
      </svg>
    ),
    titleKey: 'services.service1.title',
    descKey: 'services.service1.desc',
  },
  {
    slug: 'automatyzacja-workflow',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    titleKey: 'services.service2.title',
    descKey: 'services.service2.desc',
  },
  {
    slug: 'integracja-systemow',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    titleKey: 'services.service3.title',
    descKey: 'services.service3.desc',
  },
  {
    slug: 'agenci-ai',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0112 2z" />
        <path d="M9 6.5a2.5 2.5 0 015 0" />
      </svg>
    ),
    titleKey: 'services.service5.title',
    descKey: 'services.service5.desc',
  },
]

export default function ServicesPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('services.title')} – Automatyzacja i RPA</h1>
        <p>{t('services.subtitle')}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.services') }]} />

      <div className="services-page">
        <div className="section__container">
          <div className="services-grid services-grid--4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className="service-card service-card--link"
                title={t(service.titleKey)}
              >
                <div className="service-card__icon">{service.icon}</div>
                <h2 style={{ fontSize: '1.25rem' }}>{t(service.titleKey)}</h2>
                <p>{t(service.descKey)}</p>
                <span className="service-card__cta">
                  Dowiedz się więcej →
                </span>
              </Link>
            ))}
          </div>

          <div className="section" style={{ textAlign: 'center', paddingTop: '3rem' }}>
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
            <Link href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title={t('cta.button')}>
              {t('cta.button')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
