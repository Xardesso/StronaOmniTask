'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function SystemIntegrationPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>Integracja systemów – Łączymy ERP, CRM i bazy danych</h1>
        <p>Budujemy mosty między Twoimi systemami, tworząc jeden spójny ekosystem z automatyczną wymianą danych.</p>
      </div>

      <Breadcrumbs
        items={[
          { label: t('nav.services'), href: '/uslugi' },
          { label: 'Integracja systemów' },
        ]}
      />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            <section className="service-detail__section">
              <h2>Dlaczego integracja systemów jest kluczowa?</h2>
              <p>
                Współczesne firmy używają dziesiątek aplikacji: ERP, CRM, e-mail, systemy magazynowe,
                platformy e-commerce, narzędzia HR. Bez integracji, pracownicy ręcznie przenoszą dane
                między systemami, co generuje błędy, opóźnienia i frustrację.
              </p>
              <p>
                Łączymy Twoje systemy przez <strong>API, webhooks, ETL</strong> i dedykowane middleware,
                aby dane przepływały automatycznie i w czasie rzeczywistym.
              </p>
            </section>

            <section className="service-detail__section">
              <h2>Co integrujemy?</h2>
              <div className="features-grid">
                {[
                  { title: 'ERP ↔ CRM', desc: 'Automatyczna synchronizacja klientów, zamówień i faktur między systemami ERP i CRM.' },
                  { title: 'E-commerce ↔ Magazyn', desc: 'Synchronizacja stanów magazynowych, zamówień i przesyłek w czasie rzeczywistym.' },
                  { title: 'HR ↔ Payroll', desc: 'Automatyczne przekazywanie danych o etatach, urlopach i rozliczeniach.' },
                  { title: 'Custom API', desc: 'Budujemy dedykowane integracje API dla systemów, które nie mają gotowych konektorów.' },
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
              <h2>Korzyści z integracji systemów</h2>
              <ul className="service-detail__benefits">
                <li>Eliminacja ręcznego przepisywania danych</li>
                <li>Dane zawsze aktualne we wszystkich systemach</li>
                <li>Redukcja błędów i duplikatów</li>
                <li>Szybszy przepływ informacji i decyzji</li>
                <li>Jeden widok klienta (360°) dla zespołu sprzedaży</li>
              </ul>
            </section>

            <section className="service-detail__cta">
              <h2>Potrzebujesz integracji systemów?</h2>
              <p>Opisz swoje systemy, a my zaproponujemy optymalne połączenie.</p>
              <Link href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title="Bezpłatna wycena integracji">
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
                <Link href="/uslugi/automatyzacja-workflow" className="service-detail__related-card" title="Automatyzacja workflow">Automatyzacja workflow →</Link>
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
            name: 'Integracja systemów',
            description: 'Łączymy ERP, CRM, e-mail i bazy danych w jeden ekosystem z automatyczną wymianą danych.',
            provider: { '@type': 'Organization', name: 'OmniTask', '@id': 'https://www.omnitask.pl/#organization' },
            areaServed: { '@type': 'Country', name: 'PL' },
            url: 'https://www.omnitask.pl/uslugi/integracja-systemow',
          }),
        }}
      />
    </>
  )
}
