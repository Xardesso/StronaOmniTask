export default function TermsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>Regulamin serwisu OmniTask.pl</h1>
        <p>Warunki korzystania z serwisu</p>
      </div>

      <div className="legal-page">
        <div className="section__container">
          <div className="legal-content">
            <p><em>Ostatnia aktualizacja: 17 maja 2026 r.</em></p>

            <h2>1. Postanowienia ogólne</h2>
            <p>Niniejszy regulamin określa zasady korzystania z serwisu internetowego omnitask.pl, prowadzonego przez OmniTask (dalej: &quot;Usługodawca&quot;).</p>

            <h2>2. Usługi</h2>
            <p>Za pośrednictwem serwisu Usługodawca świadczy usługi drogą elektroniczną, w tym:</p>
            <ul>
              <li>Udostępnianie informacji o usługach automatyzacji procesów</li>
              <li>Możliwość przesłania zapytania ofertowego</li>
              <li>Formularz kontaktowy</li>
              <li>Newsletter (po wyrażeniu zgody)</li>
            </ul>

            <h2>3. Wymagania techniczne</h2>
            <p>Do korzystania z serwisu wymagana jest przeglądarka internetowa z obsługą JavaScript oraz aktywne połączenie z Internetem.</p>

            <h2>4. Prawa własności intelektualnej</h2>
            <p>Wszelkie treści zamieszczone w serwisie, w tym teksty, grafiki, logotypy i oprogramowanie, stanowią własność Usługodawcy i są chronione prawem autorskim.</p>

            <h2>5. Odpowiedzialność</h2>
            <p>Usługodawca dokłada starań, aby informacje zamieszczone w serwisie były aktualne i rzetelne, jednak nie ponosi odpowiedzialności za ewentualne błędy lub nieaktualność treści.</p>

            <h2>6. Postanowienia końcowe</h2>
            <p>Usługodawca zastrzega sobie prawo do zmiany regulaminu. Zmiany wchodzą w życie z chwilą ich publikacji w serwisie.</p>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                <strong>Uwaga:</strong> Niniejszy dokument stanowi szablon i powinien zostać zweryfikowany przez radcę prawnego przed publikacją w wersji produkcyjnej.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
