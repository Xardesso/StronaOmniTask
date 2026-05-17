'use client'

import Link from 'next/link'
import { useTranslation } from '@/i18n/context'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function RpaPage() {
  const { t } = useTranslation()

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>Robotyzacja procesów (RPA) – Automatyzacja powtarzalnych zadań</h1>
        <p>Wdrażamy roboty software'owe, które pracują 24/7, eliminują błędy i oszczędzają setki godzin pracy miesięcznie.</p>
      </div>

      <Breadcrumbs
        items={[
          { label: t('nav.services'), href: '/uslugi' },
          { label: 'RPA' },
        ]}
      />

      <div className="service-detail-page">
        <div className="section__container">
          <div className="service-detail__content">
            <section className="service-detail__section">
              <h2>Czym jest Robotyzacja Procesów (RPA)?</h2>
              <p>
                RPA (Robotic Process Automation) to technologia pozwalająca tworzyć software'owe roboty,
                które naśladują ludzkie działania w systemach komputerowych. Robot może logować się do aplikacji,
                klikać przyciski, kopiować dane między systemami, wypełniać formularze, wysyłać e-maile i generować raporty
                – wszystko to automatycznie, bez przerw i bez błędów.
              </p>
              <p>
                W OmniTask specjalizujemy się we wdrażaniu robotów RPA opartych o wiodące platformy:
                <strong> UiPath, Microsoft Power Automate</strong> oraz niestandardowe rozwiązania w <strong>Python</strong>.
                Każde wdrożenie poprzedzamy szczegółowym audytem procesu, aby zapewnić maksymalny zwrot z inwestycji.
              </p>
            </section>

            <section className="service-detail__section">
              <h2>Jakie procesy automatyzujemy z RPA?</h2>
              <div className="features-grid">
                {[
                  { title: 'Przetwarzanie dokumentów', desc: 'Automatyczne odczytywanie, klasyfikacja i wprowadzanie danych z faktur, zamówień, umów i formularzy.' },
                  { title: 'Obsługa zamówień', desc: 'Robot przyjmuje zamówienia, weryfikuje dane, tworzy pozycje w ERP i powiadamia odpowiednie działy.' },
                  { title: 'Raportowanie', desc: 'Automatyczne generowanie raportów z wielu systemów, konsolidacja danych i wysyłka do interesariuszy.' },
                  { title: 'Migracja danych', desc: 'Bezpieczne przenoszenie danych między systemami z walidacją i logowaniem każdej operacji.' },
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
              <h2>Korzyści z wdrożenia RPA</h2>
              <ul className="service-detail__benefits">
                <li>Redukcja czasu wykonania procesu nawet o 80%</li>
                <li>Eliminacja błędów ludzkich – roboty działają z dokładnością 99.9%</li>
                <li>Praca 24/7 bez przerw, urlopów i zwolnień</li>
                <li>Zwrot z inwestycji (ROI) zazwyczaj w ciągu 3–6 miesięcy</li>
                <li>Skalowalność – łatwe dodawanie nowych robotów w miarę potrzeb</li>
                <li>Pełna audytowalność – każda akcja robota jest logowana</li>
              </ul>
            </section>

            <section className="service-detail__section">
              <h2>Najczęściej zadawane pytania o RPA</h2>
              <div className="faq-list">
                {[
                  { q: 'Ile trwa wdrożenie robota RPA?', a: 'Prosty robot może być gotowy w 2–4 tygodnie. Złożone procesy wymagające integracji wielu systemów zajmują 2–3 miesiące.' },
                  { q: 'Czy potrzebuję zmian w istniejących systemach?', a: 'Nie. Roboty RPA działają na warstwie interfejsu użytkownika – nie wymagają żadnych modyfikacji w Twoich systemach.' },
                  { q: 'Co się stanie, gdy proces się zmieni?', a: 'Roboty RPA wymagają aktualizacji przy zmianach interfejsu. Zapewniamy wsparcie i monitoring, aby szybko reagować.' },
                ].map((faq, i) => (
                  <div key={i} className="faq-item faq-item--static">
                    <h3 className="faq-item__question-static">{faq.q}</h3>
                    <p className="faq-item__answer-static">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="service-detail__cta">
              <h2>Chcesz zautomatyzować procesy w swojej firmie?</h2>
              <p>Skontaktuj się z nami i otrzymaj bezpłatną analizę Twojego procesu z szacowanym ROI.</p>
              <Link href="/zapytanie-ofertowe" className="btn btn--primary btn--lg" title="Bezpłatna wycena RPA">
                Bezpłatna wycena
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </section>

            <section className="service-detail__related">
              <h3>Powiązane usługi</h3>
              <div className="service-detail__related-grid">
                <Link href="/uslugi/automatyzacja-workflow" className="service-detail__related-card" title="Automatyzacja workflow">
                  Automatyzacja workflow →
                </Link>
                <Link href="/uslugi/integracja-systemow" className="service-detail__related-card" title="Integracja systemów">
                  Integracja systemów →
                </Link>
                <Link href="/uslugi/agenci-ai" className="service-detail__related-card" title="Agenci AI">
                  Agenci AI →
                </Link>
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
            name: 'Robotyzacja procesów (RPA)',
            description: 'Wdrażamy roboty software\'owe RPA, które automatycznie wykonują powtarzalne zadania biznesowe.',
            provider: { '@type': 'Organization', name: 'OmniTask', '@id': 'https://www.omnitask.pl/#organization' },
            areaServed: { '@type': 'Country', name: 'PL' },
            url: 'https://www.omnitask.pl/uslugi/rpa',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Ile trwa wdrożenie robota RPA?', acceptedAnswer: { '@type': 'Answer', text: 'Prosty robot może być gotowy w 2–4 tygodnie. Złożone procesy wymagające integracji wielu systemów zajmują 2–3 miesiące.' } },
              { '@type': 'Question', name: 'Czy potrzebuję zmian w istniejących systemach?', acceptedAnswer: { '@type': 'Answer', text: 'Nie. Roboty RPA działają na warstwie interfejsu użytkownika – nie wymagają żadnych modyfikacji w Twoich systemach.' } },
              { '@type': 'Question', name: 'Co się stanie, gdy proces się zmieni?', acceptedAnswer: { '@type': 'Answer', text: 'Roboty RPA wymagają aktualizacji przy zmianach interfejsu. Zapewniamy wsparcie i monitoring, aby szybko reagować.' } },
            ],
          }),
        }}
      />
    </>
  )
}
