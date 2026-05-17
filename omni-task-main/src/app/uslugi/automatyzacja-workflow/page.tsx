'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function WorkflowAutomationPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>Automatyzacja workflow – Inteligentne przepływy pracy</h1>
        <p>Łączymy systemy, aplikacje i ludzi w jeden spójny, zautomatyzowany proces biznesowy.</p>
      </div>

      <Breadcrumbs
        items={[
          { label: t('nav.services'), href: '/uslugi' },
          { label: 'Automatyzacja workflow' },
        ]}
      />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            <section className="service-detail__section">
              <h2>Na czym polega automatyzacja workflow?</h2>
              <p>
                Automatyzacja workflow to projektowanie i wdrażanie inteligentnych przepływów pracy,
                które łączą różne systemy, aplikacje i zespoły w jeden spójny, zautomatyzowany proces.
                Zamiast ręcznego przekazywania danych między aplikacjami, Twoje systemy komunikują się automatycznie.
              </p>
              <p>
                Wykorzystujemy platformy takie jak <strong>Zapier, Make (Integromat), Microsoft Power Automate</strong>
                oraz budujemy niestandardowe integracje, aby dopasować rozwiązanie do specyfiki Twojego biznesu.
              </p>
            </section>

            <section className="service-detail__section">
              <h2>Przykładowe zastosowania</h2>
              <div className="features-grid">
                {[
                  { title: 'Automatyzacja onboardingu', desc: 'Nowy pracownik → automatyczne tworzenie kont, dostępów, wysyłka dokumentów i materiałów szkoleniowych.' },
                  { title: 'Obsługa leadów', desc: 'Formularz kontaktowy → CRM → powiadomienie handlowca → automatyczny follow-up e-mail.' },
                  { title: 'Procesy zatwierdzania', desc: 'Automatyczne routing wniosków do odpowiednich osób z eskalacją i powiadomieniami.' },
                  { title: 'Synchronizacja danych', desc: 'Automatyczna synchronizacja danych między ERP, CRM, e-commerce i systemami magazynowymi.' },
                ].map((item, i) => (
                  <div key={i} className="feature-card">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="service-detail__section">
              <h2>Korzyści z automatyzacji workflow</h2>
              <ul className="service-detail__benefits">
                <li>Eliminacja ręcznego przekazywania danych między systemami</li>
                <li>Redukcja czasu realizacji procesów o 60–80%</li>
                <li>Pełna widoczność i śledzenie statusu każdego zadania</li>
                <li>Automatyczne powiadomienia i eskalacje</li>
                <li>Łatwa modyfikacja i rozbudowa przepływów</li>
              </ul>
            </section>

            <section className="service-detail__cta">
              <h2>Chcesz zautomatyzować przepływy pracy?</h2>
              <p>Umów się na bezpłatną konsultację i pokaż nam swoje procesy.</p>
              <Link href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title="Bezpłatna wycena automatyzacji workflow">
                Bezpłatna wycena
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </section>

            <section className="service-detail__related">
              <h3>Powiązane usługi</h3>
              <div className="service-detail__related-grid">
                <Link href="/uslugi/rpa" className="service-detail__related-card" title="Robotyzacja procesów RPA">RPA →</Link>
                <Link href="/uslugi/integracja-systemow" className="service-detail__related-card" title="Integracja systemów">Integracja systemów →</Link>
                <Link href="/uslugi/agenci-ai" className="service-detail__related-card" title="Agenci AI">Agenci AI →</Link>
              </div>
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
            name: 'Automatyzacja workflow',
            description: 'Projektujemy i wdrażamy inteligentne przepływy pracy łączące systemy i aplikacje.',
            provider: { '@type': 'Organization', name: 'OmniTask', '@id': 'https://www.omnitask.pl/#organization' },
            areaServed: { '@type': 'Country', name: 'PL' },
            url: 'https://www.omnitask.pl/uslugi/automatyzacja-workflow',
          }),
        }}
      />
    </>
  )
}
