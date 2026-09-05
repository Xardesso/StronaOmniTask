'use client'

import Image from 'next/image'
import Link from '@/components/LocaleLink'
import { useTranslation } from '@/i18n/context'
import { useState } from 'react'
import { FEATURE_BUR, FEATURE_REALIZACJE, FOUNDER } from '@/lib/site-config'
import { getImplementationTiers } from '@/lib/pricing-data'
import { formatMoneyFrom } from '@/lib/currency'
import ServiceIcon from '@/components/ServiceIcon'
import ToolIcon from '@/components/ToolIcon'
import CtaButton from '@/components/CtaButton'

const TRUST_LOGOS = [
  { slug: 'n8n', label: 'n8n' },
  { slug: 'make', label: 'Make' },
  { slug: 'ksef', label: 'KSeF' },
  { slug: 'comarch', label: 'Comarch' },
  { slug: 'hubspot', label: 'HubSpot' },
  { slug: 'google-cloud', label: 'Google Cloud' },
]

const SERVICES = [
  { key: 'service1', slug: 'automatyzacja-workflow' },
  { key: 'service2', slug: 'ksef', highlight: true },
  { key: 'service3', slug: 'integracja-systemow' },
  { key: 'service4', slug: 'szkolenia-i-doradztwo', highlight: true },
  { key: 'service5', slug: 'rpa' },
  { key: 'service6', slug: 'opieka-i-hosting' },
  { key: 'service7', slug: 'agenci-ai' },
]

const PROBLEM_ICONS = [
  // duplikat dokumentów
  <path key="p1" d="M8 3h9l4 4v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z M4 8v11a2 2 0 002 2h9" />,
  // czekanie / zegar
  <>
    <circle key="p2c" cx="12" cy="13" r="8" />
    <path key="p2p" d="M12 9v4l3 2M9 2h6" />
  </>,
  // powtarzalne przepisywanie
  <path key="p3" d="M17 2.1l4 4-4 4M3 12.1v-2a4 4 0 014-4h14M7 21.9l-4-4 4-4M21 11.9v2a4 4 0 01-4 4H3" />,
  // dokumenty w zawieszeniu
  <>
    <path key="p4p" d="M4 4h16v13H8l-4 4V4z" />
    <path key="p4q" d="M12 8v3M12 14h.01" />
  </>,
]

export default function HomeClient({ articles = [] }: { articles?: any[] }) {
  const { t, tRaw, locale } = useTranslation()
  // KSeF, szkolenia i opieka nie mają wersji EN/UA — spec 2.2.
  const visibleServices = locale === 'pl' ? SERVICES : SERVICES.filter((s) => ['automatyzacja-workflow', 'integracja-systemow', 'rpa', 'agenci-ai'].includes(s.slug))
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterWebsite, setNewsletterWebsite] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [newsletterStartedAt] = useState(() => Date.now())

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setIsSubmitting(true)
    setNewsletterStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, website: newsletterWebsite, formStartedAt: newsletterStartedAt })
      })

      const result = await response.json()

      if (response.ok) {
        setNewsletterStatus('success')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
        setErrorMessage(result.error || 'Wystąpił błąd. Spróbuj ponownie później.')
      }
    } catch (error) {
      setNewsletterStatus('error')
      setErrorMessage('Wystąpił błąd serwera. Spróbuj ponownie później.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const checks = tRaw<string[]>('hero.checks')
  const problemItems = tRaw<string[]>('problems.items')
  const trustedByItemsRaw = tRaw<{ name: string; logo: string; industry: string; improved: string; result: string }[]>('trusted_by.items')
  const trustedByItems = Array.isArray(trustedByItemsRaw) ? trustedByItemsRaw : []
  const HOME_TIERS = getImplementationTiers(t, tRaw)

  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero__container">
          <div className="hero__panel">
            <div className="hero__panel-blob hero__panel-blob--1" />
            <div className="hero__panel-blob hero__panel-blob--2" />

            <div className="hero__content animate-fade-in-up">
              <span className="eyebrow">{t('eyebrow.automation')}</span>
              <h1 className="hero__title">{t('hero.title')}</h1>
              <p className="hero__subtitle">{t('hero.subtitle')}</p>

              <ul className="hero__checks">
                {Array.isArray(checks) && checks.map((item, i) => (
                  <li key={i} className="hero__check-item">
                    <span className="hero__check-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="hero__buttons">
                <CtaButton className="btn btn--primary btn--lg" title={t('hero.cta_primary')}>
                  {t('hero.cta_primary')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </CtaButton>
                <Link href="/cennik" className="btn btn--outline-dark btn--lg" title={t('hero.cta_secondary')}>
                  {t('hero.cta_secondary')}
                </Link>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__diagram">
                <div className="hero__diagram-step hero__diagram-step--before">
                  <div className="hero__diagram-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <h4>{t('hero.diagram_before_title')}</h4>
                    <p>{t('hero.diagram_before_desc')}</p>
                  </div>
                </div>
                <div className="hero__diagram-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </div>
                <div className="hero__diagram-step hero__diagram-step--after">
                  <div className="hero__diagram-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                  </div>
                  <div>
                    <h4>{t('hero.diagram_after_title')}</h4>
                    <p>{t('hero.diagram_after_desc')}</p>
                  </div>
                </div>
              </div>

              <div className="hero__float-badge hero__float-badge--top">
                {t('hero.badge_time_value')}
                <span style={{ marginLeft: '0.4rem' }}>{t('hero.badge_time_label')}</span>
              </div>
              <div className="hero__float-badge hero__float-badge--bottom">
                {t('hero.badge_funding_value')}
                <span style={{ marginLeft: '0.4rem' }}>{t('hero.badge_funding_label')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. PASEK ZAUFANIA ===== */}
      <section className="clients-bar" id="trust">
        <div className="section__container">
          <p className="clients-bar__label">{t('trust.title')}</p>
          <div className="clients-bar__track">
            <div className="clients-bar__logos">
              {TRUST_LOGOS.map((tool) => (
                <div key={tool.slug} className="clients-bar__logo" title={tool.label}>
                  <span className="clients-bar__logo-icon"><ToolIcon slug={tool.slug} /></span>
                  {tool.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY — firmy, z którymi współpracowałem ===== */}
      {trustedByItems.length > 0 && (
        <section className="section section--alt" id="trusted-by">
          <div className="section__container">
            <div className="section__header">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>{t('eyebrow.trust')}</span>
              <h2>{t('trusted_by.title')}</h2>
              <p>{t('trusted_by.subtitle')}</p>
            </div>
            <div className="trusted-by-grid">
              {trustedByItems.map((item, i) => (
                <div key={i} className="trusted-by-card">
                  <div className="trusted-by-card__logo">
                    <img src={item.logo} alt={item.name} loading="lazy" />
                  </div>
                  <p className="trusted-by-card__industry">{item.industry}</p>
                  <div className="trusted-by-card__row">
                    <span className="trusted-by-card__label">{t('trusted_by.label_improved')}</span>
                    <span className="trusted-by-card__value">{item.improved}</span>
                  </div>
                  <div className="trusted-by-card__row">
                    <span className="trusted-by-card__label">{t('trusted_by.label_result')}</span>
                    <span className="trusted-by-card__value">{item.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 3. PROBLEM ===== */}
      <section className="section" id="problems">
        <div className="section__container">
          <div className="section__header">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>{t('eyebrow.problem')}</span>
            <h2>{t('problems.title')}</h2>
            <p>{t('problems.subtitle')}</p>
          </div>
          <div className="problem-grid">
            {Array.isArray(problemItems) && problemItems.map((item, i) => (
              <div key={i} className="problem-card">
                <div className="problem-card__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {PROBLEM_ICONS[i % PROBLEM_ICONS.length]}
                  </svg>
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. USŁUGI ===== */}
      <section className="section section--alt" id="services">
        <div className="section__container">
          <div className="section__header">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>{t('eyebrow.services')}</span>
            <h2>{t('services.title')}</h2>
            <p>{t('services.subtitle')}</p>
          </div>
          <div className="services-grid services-grid--6">
            {visibleServices.map((s) => (
              <Link
                key={s.slug}
                href={`/uslugi/${s.slug}`}
                className={`service-card service-card--link ${s.highlight ? 'service-card--highlight' : ''}`}
                title={t(`services.${s.key}.title`)}
              >
                {s.highlight && <span className="badge badge--accent service-card__badge">Polecane</span>}
                <div className="service-card__icon">
                  <ServiceIcon slug={s.slug} size={28} />
                </div>
                <h3>{t(`services.${s.key}.title`)}</h3>
                <p>{t(`services.${s.key}.desc`)}</p>
                <span className="service-card__cta">{t('services_page.learn_more')}</span>
              </Link>
            ))}
            {locale === 'pl' && (
              <CtaButton className="service-card service-card--cta">
                <h3>{t('services_page.cta_title')}</h3>
                <p>{t('services_page.cta_subtitle')}</p>
                <span className="service-card__cta">{t('nav.book_call')} →</span>
              </CtaButton>
            )}
          </div>
        </div>
      </section>

      {/* ===== 5. DOFINANSOWANIE (za flagą FEATURE_BUR, tylko PL — brak strony /en/dofinansowanie) ===== */}
      {FEATURE_BUR && locale === 'pl' && (
        <section className="section" id="funding">
          <div className="section__container">
            <div className="funding-section">
              <div>
                <h2>{t('funding_home.title')}</h2>
                <p>{t('funding_home.text')}</p>
                <Link href="/dofinansowanie" className="btn btn--primary btn--lg" title={t('funding_home.cta')}>
                  {t('funding_home.cta')}
                </Link>
              </div>
              <div className="funding-compare">
                <div className="funding-compare__row">
                  <span className="funding-compare__label">{t('funding_home.compare_value_label')}</span>
                  <span>{t('funding_home.compare_value')}</span>
                </div>
                <div className="funding-compare__row">
                  <span className="funding-compare__label">{t('funding_home.compare_discount_label')}</span>
                  <span>{t('funding_home.compare_discount')}</span>
                </div>
                <div className="funding-compare__row funding-compare__row--total">
                  <span>{t('funding_home.compare_total_label')}</span>
                  <span>{t('funding_home.compare_total')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 6. JAK PRACUJĘ ===== */}
      <section className="section" id="process">
        <div className="section__container">
          <div className="section__header">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>{t('eyebrow.process')}</span>
            <h2>{t('process.title')}</h2>
            <p>{t('process.subtitle')}</p>
          </div>
          <div className="process-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="process-step">
                <div className="process-step__number">{t(`process.step${i}.number`)}</div>
                <div className="process-content">
                  <h3>{t(`process.step${i}.title`)}</h3>
                  <p>{t(`process.step${i}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. REALIZACJE (za flagą, ukryte do pierwszego wdrożenia) ===== */}
      {FEATURE_REALIZACJE && (
        <section className="section" id="realizacje">
          <div className="section__container">
            <div className="section__header">
              <h2>{t('nav.projects')}</h2>
            </div>
          </div>
        </section>
      )}

      {/* ===== 9. CENNIK — skrót ===== */}
      <section className="section section--alt" id="pricing">
        <div className="section__container">
          <div className="section__header">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>{t('eyebrow.pricing')}</span>
            <h2>{t('pricing_home.title')}</h2>
            <p>{t('pricing_home.subtitle')}</p>
          </div>
          <div className="pricing-grid">
            {HOME_TIERS.map((tier) => (
              <div key={tier.slug} className="pricing-card">
                <div className="pricing-card__header">
                  {tier.featured && <span className="pricing-card__tag">{t('cennik_page.featured_badge')}</span>}
                  <span className="pricing-card__name">{tier.name}</span>
                  <div className="pricing-card__price">{formatMoneyFrom(tier.priceValue, locale, !!tier.isFrom)}</div>
                </div>
                <div className="pricing-card__body">
                  <p className="pricing-card__scope">{tier.scope}</p>
                  <div className="pricing-card__time">{tier.time}</div>
                  <ul className="pricing-card__list">
                    {tier.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <Link href="/cennik" className="btn btn--dark" title={t('pricing_home.card_cta')}>
                    {t('pricing_home.card_cta')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/cennik" className="btn btn--dark btn--lg" title={t('pricing_home.cta')}>
              {t('pricing_home.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 10. FAQ ===== */}
      <section className="section" id="faq">
        <div className="section__container">
          <div className="section__header">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>{t('eyebrow.faq')}</span>
            <h2>{t('faq.title')}</h2>
            <p>{t('faq.subtitle')}</p>
          </div>
          <div className="faq-list">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`faq-item ${faqOpen === i ? 'faq-item--open' : ''}`}>
                <button
                  className="faq-item__question"
                  onClick={() => toggleFaq(i)}
                  id={`faq-toggle-${i}`}
                  aria-expanded={faqOpen === i}
                >
                  <span>{t(`faq.q${i}`)}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faq-item__icon">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-item__answer">
                  <p>{t(`faq.a${i}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. O MNIE — skrót ===== */}
      <section className="section section--alt" id="about">
        <div className="section__container">
          <div className="founder founder--compact">
            <div className="founder__photo">
              {FOUNDER.photo ? (
                <img src={FOUNDER.photo} alt={FOUNDER.name} />
              ) : (
                FOUNDER.name.split(' ').map((n) => n[0]).join('')
              )}
            </div>
            <div>
              <span className="eyebrow">{t('eyebrow.about')}</span>
              <h2>{t('about_home.title')}</h2>
              <p style={{ color: 'var(--color-text-light)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {t('about_home.text')}
              </p>
              <Link href="/o-nas" className="btn btn--dark" title={t('about_home.link')}>
                {t('about_home.link')}
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ===== 12. BLOG — najnowsze wpisy ===== */}
      {articles.length > 0 && (
        <section className="section" id="blog">
          <div className="section__container">
            <div className="section__header">
              <h2>{t('blog.latest_title')}</h2>
            </div>
            <div className="blog-grid">
              {articles.slice(0, 3).map((article: any) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="blog-card" title={article.title}>
                  <div className="blog-card__image">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.image_alt || article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' }} />
                    )}
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{article.title}</h3>
                    <p className="blog-card__excerpt">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/blog" className="btn btn--outline-dark btn--lg" title={t('blog.see_all')}>
                {t('blog.see_all')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== 13. CTA KOŃCOWE + NEWSLETTER ===== */}
      <section className="section section--dark cta-section" id="cta">
        <div className="cta-section__bg" />
        <div className="section__container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.subtitle')}</p>
          <CtaButton className="btn btn--primary btn--lg" title={t('cta.button')}>
            {t('cta.button')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </CtaButton>

          <div className="newsletter" id="newsletter">
            <h3>{t('newsletter.title')}</h3>
            <p>{t('newsletter.subtitle')}</p>
            {newsletterStatus === 'success' ? (
              <p className="newsletter__success">{t('newsletter.success')}</p>
            ) : (
              <form className="newsletter__form" onSubmit={handleNewsletter}>
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="newsletter-website">Website</label>
                  <input
                    type="text"
                    id="newsletter-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={newsletterWebsite}
                    onChange={(e) => setNewsletterWebsite(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="newsletter__input"
                    style={{ width: '100%', borderColor: newsletterStatus === 'error' ? 'var(--color-error)' : undefined }}
                    required
                    id="newsletter-email"
                    disabled={isSubmitting}
                  />
                  {newsletterStatus === 'error' && (
                    <div style={{ position: 'absolute', bottom: '-20px', left: 0, color: 'var(--color-error)', fontSize: '0.8rem' }}>
                      {errorMessage}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn--primary" id="newsletter-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Zapisywanie...' : t('newsletter.button')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SEO Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'OmniTask',
            url: 'https://www.omnitask.pl',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.omnitask.pl/blog?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [1, 2, 3, 4, 5, 6].map((i) => ({
              '@type': 'Question',
              name: t(`faq.q${i}`),
              acceptedAnswer: {
                '@type': 'Answer',
                text: t(`faq.a${i}`)
              }
            }))
          }),
        }}
      />
    </>
  )
}
