/**
 * Raportuje, które artykuły blogowe (title/meta_title/meta_description)
 * przekraczają praktyczne limity Google (60 znaków dla tytułu, 160 dla
 * opisu) - audyt SEO 2026-09-02, sekcja 5 ("17 opisów meta przekracza
 * 160 znaków", "25 z 32 tytułów PL przekracza 60 znaków").
 *
 * Tylko czyta bazę, niczego nie zmienia. Statyczne strony (usługi, cennik,
 * itd.) zostały już skrócone bezpośrednio w plikach tłumaczeń - ten skrypt
 * dotyczy wyłącznie treści artykułów blogowych, które siedzą w Postgresie
 * i nie da się ich bezpiecznie skrócić bez zobaczenia obecnego tekstu
 * (żeby nie ściąć zdania z konkretną liczbą/ceną w środku).
 *
 * Użycie:
 *   node scripts/audit-blog-meta-lengths.js
 *
 * Wynik wklej z powrotem do rozmowy z Claude - na tej podstawie można
 * przygotować precyzyjne, krótsze wersje bez zgadywania treści.
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const TITLE_MAX = 60
const DESC_MAX = 160

async function main() {
  const articles = await prisma.article.findMany({
    where: { is_public: true },
    select: { slug: true, title: true, meta_title: true, meta_description: true },
    orderBy: { created_at: 'desc' },
  })

  let overCount = 0

  for (const a of articles) {
    const rows = []
    for (const locale of ['pl', 'en', 'ua']) {
      const t = (a.title && a.title[locale]) || ''
      if (t.length > TITLE_MAX) rows.push(`  title.${locale} (${t.length}): ${t}`)
    }
    if (a.meta_title && a.meta_title.length > TITLE_MAX) {
      rows.push(`  meta_title (${a.meta_title.length}): ${a.meta_title}`)
    }
    if (a.meta_description && a.meta_description.length > DESC_MAX) {
      rows.push(`  meta_description (${a.meta_description.length}): ${a.meta_description}`)
    }
    if (rows.length > 0) {
      overCount++
      console.log(`\n${a.slug}`)
      rows.forEach((r) => console.log(r))
    }
  }

  console.log(overCount === 0
    ? '\nWszystkie artykuły mieszczą się w limitach.'
    : `\n${overCount} artykuł(ów) przekracza limity - skopiuj powyższy wynik z powrotem do rozmowy.`)
}

main()
  .catch((e) => {
    console.error('Błąd:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
