// Centralne stałe konfiguracyjne serwisu — jedno miejsce do podmiany
// linku do kalendarza, danych kontaktowych i flag funkcji.

// Link do rezerwacji spotkania. Można nadpisać zmienną środowiskową
// NEXT_PUBLIC_CALCOM_URL w .env.production bez zmiany kodu.
export const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://calendar.app.google/Ni9zxrdYwt6WDQ437'

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
  nip: '665-306-59-82',
  regon: '528314936',
}

export const FOUNDER = {
  name: 'Marcin Łętowski',
  photo: '/founder.jpg' as string | null,
}
