// Jedno źródło prawdy dla cen — używane na /cennik, w skrócie na stronie
// głównej i w kalkulatorze dofinansowania, żeby liczby nigdy się nie rozjechały.

export interface PricingTier {
  slug: string
  name: string
  scope: string
  time: string
  price: string
  priceValue: number
  isFrom?: boolean
  priceNote?: string
  features: string[]
  featured?: boolean
}

// Główna "drabinka" wdrożeń - rosnąca po cenie i zakresie, bez pakietu KSeF
// (ten jest wyspecjalizowany, nie jest kolejnym szczeblem drabinki - patrz KSEF_TIER).
export const IMPLEMENTATION_TIERS: PricingTier[] = [
  {
    slug: 'start',
    name: 'START',
    scope: '1 proces end-to-end, do 3 integracji, dokumentacja, szkolenie 2h',
    time: '1–2 tyg.',
    price: '5 900 zł',
    priceValue: 5900,
    features: [
      '1 proces automatyzacji od początku do końca',
      'Do 3 integracji między systemami',
      'Dokumentacja wdrożenia',
      'Szkolenie zespołu (2h)',
    ],
  },
  {
    slug: 'core',
    name: 'CORE',
    scope: '2–4 procesy, obsługa błędów, integracje wielosystemowe, 30 dni gwarancji',
    time: '3–4 tyg.',
    price: '14 900 zł',
    priceValue: 14900,
    features: [
      '2–4 procesy automatyzacji',
      'Obsługa błędów i wyjątków',
      'Integracje wielosystemowe',
      'Szkolenie zespołu (4h)',
      '30 dni gwarancji po wdrożeniu',
    ],
    featured: true,
  },
  {
    slug: 'transformacja',
    name: 'TRANSFORMACJA',
    scope: '5+ procesów, agent AI z bazą wiedzy, self-hosted, 90 dni opieki w cenie',
    time: '6–10 tyg.',
    price: 'od 29 000 zł',
    priceValue: 29000,
    isFrom: true,
    features: [
      '5+ procesów automatyzacji',
      'Agent AI z własną bazą wiedzy',
      'Środowisko self-hosted',
      '90 dni opieki w cenie',
    ],
  },
]

// Wyspecjalizowany pakiet KSeF - celowo poza drabinką START/CORE/TRANSFORMACJA,
// bo nie jest kolejnym krokiem w liczbie procesów, tylko osobnym zakresem usługi.
export const KSEF_TIER: PricingTier = {
  slug: 'ksef-kontrola',
  name: 'KSeF KONTROLA',
  scope: 'Deduplikacja, kategoryzacja i routing faktur, MPK, monitoring API',
  time: '2–4 tyg.',
  price: '12 900 zł',
  priceValue: 12900,
  features: [
    'Deduplikacja faktur z KSeF i maila',
    'Kategoryzacja i routing do oddziałów/MPK',
    'Monitoring limitów i sesji API',
    'Integracja z systemem księgowym',
  ],
}

export const AUDIT_TIER: PricingTier & { deductionNote: string; exitNote: string } = {
  slug: 'audyt',
  name: 'Zacznij od audytu',
  scope: 'Analiza procesów, mapa automatyzacji i wycena.',
  time: '3–5 dni',
  price: '2 400 zł',
  priceValue: 2400,
  deductionNote: 'Całą kwotę odliczam od ceny wdrożenia.',
  exitNote: 'Możesz kupić sam audyt i na tym poprzestać. Dokumentacja zostaje u Ciebie - jeśli nie zdecydujesz się na współpracę, możesz zrealizować to z kimkolwiek innym.',
  features: [
    'Analiza obecnych procesów',
    'Mapa możliwych automatyzacji z wyceną',
  ],
}

export interface CareTier {
  name: string
  scope: string
  price: string
  priceValue: number
}

export const CARE_TIERS: CareTier[] = [
  { name: 'Hosting zarządzany n8n', scope: 'Serwer w UE, aktualizacje, kopie zapasowe, monitoring', price: '390 zł/mc', priceValue: 390 },
  { name: 'Opieka Standard', scope: 'Monitoring, poprawki przy zmianach API, reakcja do 48h', price: '890 zł/mc', priceValue: 890 },
  { name: 'Opieka Pro', scope: 'SLA reakcja 4h, priorytet, raport miesięczny', price: '1 890 zł/mc', priceValue: 1890 },
  { name: 'Pakiet rozwoju', scope: 'Bank 4h miesięcznie na zmiany i nowe scenariusze', price: '1 490 zł/mc', priceValue: 1490 },
]

export const FUNDING_RATE = 0.83

export const FUNDING_LIMITS = [
  { size: 'Samozatrudniony', limit: '16 185 zł' },
  { size: 'Mikro i mała firma', limit: '81 000 zł' },
  { size: 'Średnia firma', limit: '162 000 zł' },
  { size: 'Na jednego pracownika', limit: '16 185 zł' },
]
