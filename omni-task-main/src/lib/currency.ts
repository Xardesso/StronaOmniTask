import type { Locale } from './i18n'

// Przybliżony, ręcznie ustawiony kurs PLN -> USD (ok. 4 PLN za 1 USD, sierpień 2026).
// Celowo nie pobieramy kursu na żywo - ceny mają być stabilne i przewidywalne,
// a nie migać przy każdym odświeżeniu strony. PLN w pricing-data.ts pozostaje
// jedynym źródłem prawdy; USD jest zawsze liczony z niego automatycznie, więc
// zmiana ceny PLN od razu przelicza się na wyświetlaną cenę w USD.
// Wymaga okresowej rewizji kursu (np. raz na kwartał).
export const PLN_TO_USD_RATE = 0.25

// Zaokrągla do najbliższych 5 USD, żeby cena wyglądała "okrągło" tak jak w PLN.
function roundUsd(value: number): number {
  return Math.round(value / 5) * 5
}

export function convertPlnToUsd(plnValue: number): number {
  return roundUsd(plnValue * PLN_TO_USD_RATE)
}

// Ręczne grupowanie tysięcy zamiast toLocaleString - w tym środowisku Node
// Intl.NumberFormat dla "pl-PL" potrafi po cichu zgubić separator tysięcy,
// co przy SSR daje inny wynik na serwerze niż w przeglądarce (hydration mismatch).
function groupThousands(value: number, separator: string): string {
  const [intPart, decPart] = Math.round(value).toString().split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return decPart ? `${grouped}.${decPart}` : grouped
}

export function formatPln(value: number): string {
  return `${groupThousands(value, ' ')} zł`
}

export function formatUsd(value: number): string {
  return `$${groupThousands(value, ',')}`
}

// Cena w walucie właściwej dla danej lokalizacji, licząc zawsze od wartości w PLN.
export function formatMoney(plnValue: number, locale: Locale): string {
  if (locale === 'pl') return formatPln(plnValue)
  return formatUsd(convertPlnToUsd(plnValue))
}

// Wariant z prefiksem "od" / "from" dla cen typu "od 29 000 zł".
export function formatMoneyFrom(plnValue: number, locale: Locale, isFrom: boolean): string {
  const amount = formatMoney(plnValue, locale)
  if (!isFrom) return amount
  return locale === 'pl' ? `od ${amount}` : `from ${amount}`
}

// Wariant miesięczny dla cen opieki/hostingu: "390 zł/mc" / "$100/mo".
export function formatMoneyMonthly(plnValue: number, locale: Locale): string {
  const amount = formatMoney(plnValue, locale)
  return locale === 'pl' ? `${amount}/mc` : `${amount}/mo`
}
