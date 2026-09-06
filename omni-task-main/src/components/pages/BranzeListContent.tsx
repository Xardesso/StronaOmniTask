'use client'

import LocaleLink from '@/components/LocaleLink'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'
import ServiceIcon from '@/components/ServiceIcon'
import CtaButton from '@/components/CtaButton'

// Kolejne branże (biura rachunkowe, handel i e-commerce) dochodzą tu w miarę
// powstawania stron - patrz brief-wdrozeniowy-omnitask.md, Etap 5.
const ALL_INDUSTRIES = [
  { slug: 'biura-nieruchomosci', titleKey: 'branze_page.nieruchomosci_title', descKey: 'branze_page.nieruchomosci_desc' },
  { slug: 'biura-rachunkowe', titleKey: 'branze_page.rachunkowe_title', descKey: 'branze_page.rachunkowe_desc' },
  { slug: 'handel-i-ecommerce', titleKey: 'branze_page.ecommerce_title', descKey: 'branze_page.ecommerce_desc' },
]

export default function BranzeListContent() {
  const { t } = useTranslation()

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t('branze_page.h1')}</h1>
        <p>{t('branze_page.subtitle')}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.industries') }]} />

      <div className="services-page">
        <div className="section__container">
          <div className="services-grid services-grid--6">
            {ALL_INDUSTRIES.map((industry) => (
              <LocaleLink
                key={industry.slug}
                href={`/branze/${industry.slug}`}
                className="service-card service-card--link"
                title={t(industry.titleKey)}
              >
                <div className="service-card__icon">
                  <ServiceIcon slug={industry.slug} size={28} />
                </div>
                <h2 style={{ fontSize: '1.25rem' }}>{t(industry.titleKey)}</h2>
                <p>{t(industry.descKey)}</p>
                <span className="service-card__cta">
                  {t('services_page.learn_more')}
                </span>
              </LocaleLink>
            ))}
          </div>

          <section className="service-detail__cta">
            <h2>{t('branze_page.cta_title')}</h2>
            <p>{t('branze_page.cta_subtitle')}</p>
            <CtaButton className="btn btn--primary btn--lg" title={t('cta.button')}>
              {t('cta.button')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </CtaButton>
          </section>
        </div>
      </div>
    </>
  )
}
