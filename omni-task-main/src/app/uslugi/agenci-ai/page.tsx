'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function AiAgentsPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>Agenci AI i systemy multi-agentowe dla biznesu</h1>
        <p>Budujemy autonomicznych agentów AI, którzy myślą, współpracują i realizują złożone cele biznesowe.</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.services'), href: '/uslugi' }, { label: 'Agenci AI' }]} />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            <section className="service-detail__section">
              <h2>Czym są agenci AI?</h2>
              <p>Agenci AI to autonomiczne systemy, które potrafią samodzielnie podejmować decyzje, uczyć się z kontekstu i realizować złożone zadania bez stałego nadzoru człowieka. W odróżnieniu od botów RPA, agenci AI rozumieją język naturalny, analizują dane i adaptują się do nowych sytuacji.</p>
              <p>W OmniTask tworzymy systemy <strong>multi-agentowe</strong>, gdzie kilku specjalistycznych agentów współpracuje ze sobą, dzieli się informacjami i wspólnie realizuje złożone procesy biznesowe.</p>
            </section>

            <section className="service-detail__section">
              <h2>Zastosowania agentów AI</h2>
              <div className="features-grid">
                {[
                  { title: 'Analiza dokumentów', desc: 'Agent czyta, klasyfikuje i wydobywa dane z dokumentów w dowolnym formacie.' },
                  { title: 'Obsługa klienta', desc: 'Inteligentny agent odpowiada na pytania klientów, eskaluje złożone sprawy.' },
                  { title: 'Monitoring konkurencji', desc: 'Agent śledzi rynek, ceny, trendy i generuje raporty strategiczne.' },
                  { title: 'Audyt zgodności', desc: 'Agent porównuje przepisy z procedurami firmy i wskazuje luki.' },
                ].map((item, i) => (
                  <div key={i} className="feature-card"><div><h3>{item.title}</h3><p>{item.desc}</p></div></div>
                ))}
              </div>
            </section>

            <section className="service-detail__cta">
              <h2>Gotowy na agentów AI?</h2>
              <p>Skontaktuj się z nami i sprawdź, jak agenci AI mogą zmienić Twój biznes.</p>
              <Link href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title="Bezpłatna wycena AI">
                Bezpłatna wycena
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </section>

            <section className="service-detail__related">
              <h3>Powiązane usługi</h3>
              <div className="service-detail__related-grid">
                <Link href="/uslugi/rpa" className="service-detail__related-card" title="RPA">RPA →</Link>
                <Link href="/uslugi/automatyzacja-workflow" className="service-detail__related-card" title="Workflow">Automatyzacja workflow →</Link>
                <Link href="/uslugi/integracja-systemow" className="service-detail__related-card" title="Integracja">Integracja systemów →</Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Agenci AI i systemy multi-agentowe',
        description: 'Autonomiczni agenci AI realizujący złożone cele biznesowe.',
        provider: { '@type': 'Organization', name: 'OmniTask', '@id': 'https://www.omnitask.pl/#organization' },
        areaServed: { '@type': 'Country', name: 'PL' },
        url: 'https://www.omnitask.pl/uslugi/agenci-ai',
      })}} />
    </>
  )
}
