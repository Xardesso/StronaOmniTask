/**
 * Dopisuje do artykułów blogowych link do właściwej strony usługowej.
 *
 * Reguła #1 z linkowania wewnętrznego (brief-wdrozeniowy-omnitask.md):
 * "Każdy artykuł blogowy linkuje do minimum jednej strony usługowej,
 * opisowym anchorem (nie 'kliknij tutaj', nie samo URL)".
 *
 * Artykuły z klastrów BPM i RPA dostały już taki link przy okazji
 * scripts/fix-bpm-rpa-cannibalization.js - ten skrypt je pomija (rozpoznaje
 * po tym samym znaczniku w treści), żeby nie dublować bloku.
 *
 * Bezpieczne uruchamianie:
 *   node scripts/add-blog-service-links.js            (podgląd, nic nie zapisuje)
 *   node scripts/add-blog-service-links.js --apply    (zapisuje zmiany)
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const APPLY = process.argv.includes('--apply')

// Ten sam znacznik co w skrypcie od kanibalizacji - artykuł, który już go ma,
// jest pomijany.
const MARKER = '<!-- related-links-block -->'

// Ścieżki usług per język. EN/UA korzystają z anglojęzycznych slugów
// (patrz INTL_PATH_MAP w src/lib/i18n.ts).
const SERVICES = {
  workflow: {
    path: { pl: '/uslugi/automatyzacja-workflow', en: '/en/services/workflow-automation', ua: '/ua/services/workflow-automation' },
    anchor: {
      pl: 'automatyzacja procesów bez programowania (no code)',
      en: 'no-code workflow automation',
      ua: 'автоматизація процесів без програмування',
    },
  },
  rpa: {
    path: { pl: '/uslugi/rpa', en: '/en/services/rpa', ua: '/ua/services/rpa' },
    anchor: {
      pl: 'robotyzacja powtarzalnych zadań (RPA)',
      en: 'robotic process automation (RPA)',
      ua: 'роботизація повторюваних задач (RPA)',
    },
  },
  integration: {
    path: { pl: '/uslugi/integracja-systemow', en: '/en/services/system-integration', ua: '/ua/services/system-integration' },
    anchor: {
      pl: 'integracja systemów ERP, CRM i magazynowych',
      en: 'system integration (ERP, CRM, warehouse)',
      ua: 'інтеграція систем ERP, CRM і складських',
    },
  },
  ai: {
    path: { pl: '/uslugi/agenci-ai', en: '/en/services/ai-agents', ua: '/ua/services/ai-agents' },
    anchor: {
      pl: 'wdrożenie agentów AI w firmie',
      en: 'AI agents for business',
      ua: 'впровадження AI-агентів у компанії',
    },
  },
  // KSeF istnieje tylko po polsku - używany wyłącznie jako dodatkowy link w PL.
  ksef: {
    path: { pl: '/uslugi/ksef' },
    anchor: { pl: 'automatyzacja faktur KSeF' },
    plOnly: true,
  },
}

// Przypisanie artykułu do usługi, do której najbliżej mu tematycznie.
// `extraPl` to dodatkowy link pokazywany wyłącznie w wersji polskiej.
const MAPPING = {
  'automatyzacja-magazynu-wms-agv-automatyzacja-raportowania': { service: 'integration' },
  'automatyzacja-marketingu-ktore-procesy-wdrozyc-jako-pierwsze': { service: 'workflow' },
  'automatyzacja-raportowania-w-firmie-koniec-z-recznymi-raportami': { service: 'rpa' },
  'automatyzacja-ai-w-praktyce-jak-mierzyc-efektywnosc': { service: 'ai' },
  'back-office-co-to-jest-zadania-i-funkcje': { service: 'rpa' },
  'power-automate-vs-make-vs-n8n-vs-uipath': { service: 'workflow' },
  '5-procesow-w-biurze-rachunkowym-ktore-mozesz-zautomatyzowac': { service: 'rpa', extraPl: 'ksef' },
  'optymalizacja-procesow-biznesowych': { service: 'workflow' },
}

const LEAD_IN = {
  pl: 'Potrzebujesz tego u siebie?',
  en: 'Need this in your company?',
  ua: 'Потрібно це у вашій компанії?',
}

function buildBlock(links, locale) {
  const items = links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')
  return `\n${MARKER}\n<div class="article-related-links"><p><strong>${LEAD_IN[locale]}</strong></p><ul>${items}</ul></div>\n`
}

function linksFor(mapping, locale) {
  const out = []
  const main = SERVICES[mapping.service]
  out.push({ href: main.path[locale], label: main.anchor[locale] })
  if (locale === 'pl' && mapping.extraPl) {
    const extra = SERVICES[mapping.extraPl]
    out.push({ href: extra.path.pl, label: extra.anchor.pl })
  }
  return out
}

async function main() {
  console.log(APPLY
    ? 'TRYB ZAPISU - zmiany zostaną utrwalone w bazie.\n'
    : 'TRYB PODGLĄDU (dry-run) - nic nie zostanie zapisane. Uruchom z --apply, żeby zapisać.\n')

  const articles = await prisma.article.findMany({
    where: { is_public: true },
    select: { slug: true, content: true },
  })

  const unmapped = []
  let touched = 0

  for (const article of articles) {
    const content = article.content || {}
    const hasMarker = ['pl', 'en', 'ua'].some((loc) => (content[loc] || '').includes(MARKER))

    if (hasMarker) {
      console.log(`[POMINIĘTO] ${article.slug} - ma już blok linków`)
      continue
    }

    const mapping = MAPPING[article.slug]
    if (!mapping) {
      unmapped.push(article.slug)
      continue
    }

    console.log(`\n${article.slug} -> ${mapping.service}${mapping.extraPl ? ` (+ ${mapping.extraPl} w PL)` : ''}`)
    const newContent = { ...content }

    for (const locale of ['pl', 'en', 'ua']) {
      const current = content[locale] || ''
      if (!current) {
        console.log(`  content.${locale}: pusty, pomijam`)
        continue
      }
      const links = linksFor(mapping, locale)
      newContent[locale] = current + buildBlock(links, locale)
      console.log(`  content.${locale}: + ${links.map((l) => l.label).join(', ')}`)
    }

    if (APPLY) {
      await prisma.article.update({ where: { slug: article.slug }, data: { content: newContent } })
      console.log('  -> ZAPISANO')
    }
    touched++
  }

  console.log(`\nArtykułów zmienionych: ${touched}`)

  if (unmapped.length > 0) {
    console.log('\nUWAGA - te artykuły nie mają jeszcze przypisanej usługi (nic w nich nie zmieniono):')
    unmapped.forEach((s) => console.log(`  - ${s}`))
    console.log('Wklej tę listę do rozmowy, żeby dopisać im właściwy link.')
  }

  console.log(APPLY ? '\nGotowe.' : '\nPodgląd zakończony. Uruchom ponownie z flagą --apply, żeby zapisać.')
}

main()
  .catch((e) => {
    console.error('Błąd:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
