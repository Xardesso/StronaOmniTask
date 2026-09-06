'use client'

import Breadcrumbs from '@/components/Breadcrumbs'
import LocaleLink from '@/components/LocaleLink'
import { useTranslation } from '@/i18n/context'
import { SITE_URL } from '@/lib/i18n'
import CtaButton from '@/components/CtaButton'
import type { ServiceKey } from '@/components/pages/ServiceDetailContent'

interface TitleDesc { title: string; desc: string }
interface Faq { q: string; a: string }

interface BranzaContentProps {
  // Klucz przestrzeni tłumaczeń, np. "branze_nieruchomosci".
  base: string
  // Slug strony w /branze/<slug> - używany w canonical i schema.
  slug: string
  // Powiązane usługi pokazywane na dole strony (reguła #3 linkowania
  // wewnętrznego z briefu: strona branżowa linkuje do właściwych /uslugi/*).
  relatedServices: { key: ServiceKey; slug: string }[]
}

// Wspólny szablon stron branżowych (/branze/*). Sekcje opcjonalne renderują
// się tylko wtedy, gdy dana branża ma dla nich treść - dzięki temu kolejne
// branże dokłada się samym plikiem tłumaczeń, bez nowego komponentu.
// Case study świadomie nie ma tu miejsca: zgodnie z briefem opisy realnych
// wdrożeń i liczby pisze Marcin, nie deweloper.
export default function BranzaContent({ base, slug, relatedServices }: BranzaContentProps) {
  const { t, tRaw } = useTranslation()

  const dlaKogo = tRaw<TitleDesc[]>(`${base}.dla_kogo`) || []
  const processes = tRaw<TitleDesc[]>(`${base}.processes`) || []
  const wdrozenie = tRaw<TitleDesc[]>(`${base}.wdrozenie`) || []
  const nieOplaca = tRaw<string[]>(`${base}.nie_oplaca`) || []
  const wliczone = tRaw<string[]>(`${base}.wliczone`) || []
  const faq = tRaw<Faq[]>(`${base}.faq`) || []
  const canonicalUrl = `${SITE_URL}/branze/${slug}`
  const hasSystemSection = t(`${base}.system_title`) !== `${base}.system_title`

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{t(`${base}.h1`)}</h1>
        <p>{t(`${base}.subtitle`)}</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.industries'), href: '/branze' }, { label: t(`${base}.breadcrumb`) }]} />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            <section className="service-detail__section">
              <h2>{t(`${base}.problem_title`)}</h2>
              <p>{t(`${base}.problem_p1`)}</p>
              <p>{t(`${base}.problem_p2`)}</p>
            </section>

            {dlaKogo.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.dla_kogo_title`)}</h2>
                <div className="features-grid">
                  {dlaKogo.map((item, i) => (
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

            {processes.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.processes_title`)}</h2>
                <div className="features-grid">
                  {processes.map((item, i) => (
                    <div key={i} className="feature-card">
                      <div className="feature-card__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
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

            {hasSystemSection && (
              <section className="service-detail__section">
                <h2>{t(`${base}.system_title`)}</h2>
                <p>{t(`${base}.system_p1`)}</p>
                <p>{t(`${base}.system_p2`)}</p>
              </section>
            )}

            {wdrozenie.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.wdrozenie_title`)}</h2>
                <div className="steps-list">
                  {wdrozenie.map((item, i) => (
                    <div key={i} className="steps-list__item">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {nieOplaca.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.nie_oplaca_title`)}</h2>
                <ul className="service-detail__benefits service-detail__nie-oplaca">
                  {nieOplaca.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="service-detail__section">
              <div className="callout">
                <strong>{t(`${base}.cena_label`)}</strong> {t(`${base}.cena_text`)}{' '}
                <LocaleLink href="/cennik" title={t('nav.pricing')}>{t('services_page.learn_more')}</LocaleLink>
              </div>
            </section>

            {wliczone.length > 0 && (
              <section className="service-detail__section">
                <h2>{t(`${base}.wliczone_title`)}</h2>
                <ul className="service-detail__benefits">
                  {wliczone.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

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
              <h2>{t(`${base}.cta_title`)}</h2>
              <p>{t(`${base}.cta_subtitle`)}</p>
              <CtaButton className="btn btn--primary btn--lg" title={t(`${base}.cta_title`)}>
                {t(`${base}.cta_title`)}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </CtaButton>
            </section>

            {relatedServices.length > 0 && (
              <section className="service-detail__related">
                <h3>{t(`${base}.related_title`)}</h3>
                <div className="service-detail__related-grid">
                  {relatedServices.map((s) => (
                    <LocaleLink
                      key={s.slug}
                      href={`/uslugi/${s.slug}`}
                      className="service-detail__related-card"
                      title={t(`service_detail.labels.${s.key}`)}
                    >
                      {t(`service_detail.labels.${s.key}`)} →
                    </LocaleLink>
                  ))}
                </div>
              </section>
            )}
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
            url: canonicalUrl,
            offers: {
              '@type': 'Offer',
              url: canonicalUrl,
              priceCurrency: 'PLN',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 5900,
                priceCurrency: 'PLN',
                minPrice: 5900,
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
