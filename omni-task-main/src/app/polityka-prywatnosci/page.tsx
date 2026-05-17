import Breadcrumbs from '@/components/Breadcrumbs'

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>Polityka Prywatności</h1>
        <p>Informacje o przetwarzaniu danych osobowych</p>
      </div>

      <div className="legal-page">
        <div className="section__container">
          <div className="legal-content">
            <p><em>Ostatnia aktualizacja: 17 maja 2026 r.</em></p>

            <h2>1. Administrator danych</h2>
            <p>Administratorem Twoich danych osobowych jest OmniTask z siedzibą w Polsce (dalej: &quot;Administrator&quot;). Kontakt: <a href="mailto:kontakt@omnitask.pl" title="E-mail kontaktowy">kontakt@omnitask.pl</a>.</p>

            <h2>2. Jakie dane zbieramy</h2>
            <p>Zbieramy dane, które sam nam podajesz w formularzach kontaktowych i zapytaniach ofertowych:</p>
            <ul>
              <li>Imię i nazwisko</li>
              <li>Adres e-mail</li>
              <li>Numer telefonu (opcjonalnie)</li>
              <li>Nazwa firmy (opcjonalnie)</li>
              <li>Treść wiadomości / opis procesu</li>
            </ul>

            <h2>3. Cel przetwarzania</h2>
            <p>Twoje dane przetwarzamy w celu:</p>
            <ul>
              <li>Odpowiedzi na zapytania ofertowe i kontaktowe (art. 6 ust. 1 lit. b RODO)</li>
              <li>Realizacji newslettera – na podstawie zgody (art. 6 ust. 1 lit. a RODO)</li>
              <li>Dochodzenia lub obrony roszczeń (art. 6 ust. 1 lit. f RODO)</li>
            </ul>

            <h2>4. Okres przechowywania</h2>
            <p>Dane przechowujemy przez okres niezbędny do realizacji celów przetwarzania, nie dłużej niż 3 lata od ostatniego kontaktu.</p>

            <h2>5. Twoje prawa</h2>
            <p>Masz prawo do:</p>
            <ul>
              <li>Dostępu do swoich danych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych (&quot;prawo do bycia zapomnianym&quot;)</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
              <li>Cofnięcia zgody w dowolnym momencie</li>
              <li>Wniesienia skargi do Prezesa UODO</li>
            </ul>

            <h2>6. Pliki cookies</h2>
            <p>Strona wykorzystuje niezbędne pliki cookies do prawidłowego działania serwisu. Nie stosujemy cookies marketingowych ani śledzących.</p>

            <h2>7. Kontakt</h2>
            <p>W sprawach dotyczących ochrony danych osobowych: <a href="mailto:kontakt@omnitask.pl" title="Kontakt RODO">kontakt@omnitask.pl</a></p>

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
