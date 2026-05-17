'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>O nas – Eksperci od automatyzacji procesów RPA i AI</h1>
        <p>Łączymy wiedzę techniczną z głębokim zrozumieniem procesów biznesowych, aby dostarczać realne wyniki.</p>
      </div>

      <Breadcrumbs items={[{ label: t('nav.about') }]} />

      <div className="about-page">
        <div className="section__container">
          <section className="service-detail__section">
            <h2>Nasza misja</h2>
            <p>OmniTask powstał z przekonania, że technologia powinna służyć ludziom, a nie odwrotnie. Naszą misją jest uwalnianie pracowników od monotonnych, powtarzalnych zadań, aby mogli skupić się na pracy kreatywnej i strategicznej.</p>
            <p>Specjalizujemy się we wdrażaniu <Link href="/uslugi/rpa" title="RPA">robotyzacji procesów (RPA)</Link>, <Link href="/uslugi/automatyzacja-workflow" title="automatyzacji workflow">automatyzacji workflow</Link>, <Link href="/uslugi/integracja-systemow" title="integracji systemów">integracji systemów</Link> oraz budowie <Link href="/uslugi/agenci-ai" title="agentów AI">autonomicznych agentów AI</Link>.</p>
          </section>

          <section className="service-detail__section">
            <h2>Nasze wartości</h2>
            <div className="features-grid">
              {[
                { title: 'Podejście biznesowe', desc: 'Zaczynamy od zrozumienia Twoich celów, nie od technologii.' },
                { title: 'Mierzalne wyniki', desc: 'Każde wdrożenie mierzymy konkretnymi KPI: czas, koszt, dokładność.' },
                { title: 'Partnerstwo', desc: 'Traktujemy klientów jako partnerów. Twój sukces to nasz sukces.' },
                { title: 'Ciągły rozwój', desc: 'Śledzimy najnowsze trendy w AI i automatyzacji, aby dostarczać najlepsze rozwiązania.' },
              ].map((v, i) => (
                <div key={i} className="feature-card"><div><h3>{v.title}</h3><p>{v.desc}</p></div></div>
              ))}
            </div>
          </section>

          <section className="service-detail__section">
            <h2>Dlaczego warto z nami współpracować?</h2>
            <ul className="service-detail__benefits">
              <li>Doświadczenie w automatyzacji procesów w różnych branżach</li>
              <li>Zespół certyfikowanych specjalistów UiPath i Power Automate</li>
              <li>Szybki czas wdrożenia – proste procesy nawet w 2 tygodnie</li>
              <li>Wsparcie techniczne 24/7 i monitoring botów</li>
              <li>Komunikacja w języku polskim, angielskim i ukraińskim</li>
            </ul>
          </section>

          <section className="service-detail__cta">
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.subtitle')}</p>
            <Link href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title={t('cta.button')}>
              {t('cta.button')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </section>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'AboutPage',
        name: 'O nas – OmniTask',
        description: 'Poznaj zespół OmniTask – ekspertów od automatyzacji RPA i AI.',
        url: 'https://www.omnitask.pl/o-nas',
        mainEntity: { '@type': 'Organization', name: 'OmniTask', '@id': 'https://www.omnitask.pl/#organization' },
      })}} />
    </>
  )
}
