// Centralne stałe konfiguracyjne serwisu — jedno miejsce do podmiany
// linku do kalendarza, danych kontaktowych i flag funkcji.

// TODO: podmienić na docelowy link Cal.com, gdy będzie dostępny
// (np. przez zmienną środowiskową NEXT_PUBLIC_CALCOM_URL w .env.production).
export const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/omnitask/rozmowa'

// Włącza sekcję/stronę dofinansowania PARP/BUR. Musi pozostać `false`,
// dopóki firma nie zostanie faktycznie wpisana do Bazy Usług Rozwojowych —
// patrz specyfikacja OMNITASK 2.0, sekcja 0.3 i 4.1.
export const FEATURE_BUR = process.env.NEXT_PUBLIC_FEATURE_BUR === 'true'

// Włącza sekcję/stronę realizacji (case studies). Zostaje wyłączona,
// dopóki nie powstanie pierwsze prawdziwe wdrożenie do opisania.
export const FEATURE_REALIZACJE = process.env.NEXT_PUBLIC_FEATURE_REALIZACJE === 'true'

export const CONTACT = {
  phone: '+48 721 719 238',
  phoneHref: '+48721719238',
  email: 'kontakt@omnitask.pl',
  // TODO: uzupełnić po stronie właściciela — dane wymagane m.in. w stopce i na /kontakt.
  nip: '[NIP do uzupełnienia]',
  regon: '[REGON do uzupełnienia]',
}

export const FOUNDER = {
  name: 'Marcin Łętowski',
  // TODO: podmienić na realną nazwę pliku zdjęcia (np. w /public), gdy zostanie dostarczone.
  photo: null as string | null,
}
