// Jedno źródło prawdy dla cen — używane na /cennik, w skrócie na stronie
// głównej i w kalkulatorze dofinansowania, żeby liczby nigdy się nie rozjechały.
//
// Kwoty (priceValue) są locale-niezależne (przeliczane na USD dopiero przy
// wyświetlaniu, patrz lib/currency.ts), ale opisy, nazwy i listy cech muszą
// być tłumaczone — stąd funkcje get*Tiers(t, tRaw) zamiast statycznych
// stałych: pobierają teksty z namespace'u "pricing_data" w plikach
// tłumaczeń, dla aktywnego locale.

export interface PricingTier {
  slug: string
  name: string
  scope: string
  time: string
  priceValue: number
  isFrom?: boolean
  features: string[]
  featured?: boolean
}

type TFn = (key: string) => string
type TRawFn = <T = unknown>(key: string) => T

// Główna "drabinka" wdrożeń - rosnąca po cenie i zakresie, bez pakietu KSeF
// (ten jest wyspecjalizowany, nie jest kolejnym szczeblem drabinki - patrz getKsefTier).
const IMPLEMENTATION_STRUCTURE: { slug: string; priceValue: number; isFrom?: boolean; featured?: boolean }[] = [
  { slug: 'start', priceValue: 5900 },
  { slug: 'core', priceValue: 14900, featured: true },
  { slug: 'transformacja', priceValue: 29000, isFrom: true },
]

export function getImplementationTiers(t: TFn, tRaw: TRawFn): PricingTier[] {
  return IMPLEMENTATION_STRUCTURE.map((s) => ({
    slug: s.slug,
    priceValue: s.priceValue,
    isFrom: s.isFrom,
    featured: s.featured,
    name: t(`pricing_data.${s.slug}.name`),
    scope: t(`pricing_data.${s.slug}.scope`),
    time: t(`pricing_data.${s.slug}.time`),
    features: tRaw<string[]>(`pricing_data.${s.slug}.features`) || [],
  }))
}

// Wyspecjalizowany pakiet KSeF - celowo poza drabinką START/CORE/TRANSFORMACJA,
// bo nie jest kolejnym krokiem w liczbie procesów, tylko osobnym zakresem usługi.
export function getKsefTier(t: TFn, tRaw: TRawFn): PricingTier {
  return {
    slug: 'ksef-kontrola',
    priceValue: 12900,
    name: t('pricing_data.ksef.name'),
    scope: t('pricing_data.ksef.scope'),
    time: t('pricing_data.ksef.time'),
    features: tRaw<string[]>('pricing_data.ksef.features') || [],
  }
}

export function getAuditTier(t: TFn, tRaw: TRawFn): PricingTier & { deductionNote: string; exitNote: string } {
  return {
    slug: 'audyt',
    priceValue: 2400,
    name: t('pricing_data.audit.name'),
    scope: t('pricing_data.audit.scope'),
    time: t('pricing_data.audit.time'),
    deductionNote: t('pricing_data.audit.deductionNote'),
    exitNote: t('pricing_data.audit.exitNote'),
    features: tRaw<string[]>('pricing_data.audit.features') || [],
  }
}

export interface CareTier {
  name: string
  scope: string
  priceValue: number
}

const CARE_PRICES = [390, 890, 1890, 1490]

export function getCareTiers(t: TFn, tRaw: TRawFn): CareTier[] {
  const items = tRaw<{ name: string; scope: string }[]>('pricing_data.care') || []
  return items.map((item, i) => ({ ...item, priceValue: CARE_PRICES[i] }))
}

export const FUNDING_RATE = 0.83

export const FUNDING_LIMITS = [
  { size: 'Samozatrudniony', limit: '16 185 zł' },
  { size: 'Mikro i mała firma', limit: '81 000 zł' },
  { size: 'Średnia firma', limit: '162 000 zł' },
  { size: 'Na jednego pracownika', limit: '16 185 zł' },
]
