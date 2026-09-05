/**
 * Skraca pozostałe tytuły i opisy meta artykułów blogowych, które
 * przekraczały limity Google (60 znaków dla tytułu, 160 dla opisu) -
 * wynik uruchomienia scripts/audit-blog-meta-lengths.js po zastosowaniu
 * scripts/fix-bpm-rpa-cannibalization.js (audyt SEO 2026-09-02, sekcja 5).
 *
 * Zmienia WYŁĄCZNIE pola podane niżej dla danego artykułu (title.pl/en/ua,
 * meta_title, meta_description) - jeśli dla artykułu podano tylko jeden
 * język tytułu, pozostałe języki zostają nietknięte.
 *
 * Bezpieczne uruchamianie:
 *   node scripts/fix-remaining-meta-lengths.js            (tryb podglądu)
 *   node scripts/fix-remaining-meta-lengths.js --apply    (zapisuje zmiany)
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const APPLY = process.argv.includes('--apply')

const FIXES = {
  'jak-wdrozyc-system-bpm-7-etapow-projektu-bledy': {
    meta_description: 'Poznaj 7 etapów wdrożenia systemu BPM - analiza procesów, modelowanie BPMN, integracje i pomiar ROI. Unikaj błędów, które kosztują miesiące.',
  },
  'system-bpm-w-praktyce-branze-workflow-engine-integracje-roi': {
    meta_description: 'Sprawdź, jak system BPM działa w finansach, HR i logistyce, jakie integracje (ERP, OCR, BI) są kluczowe i jak policzyć ROI wdrożenia.',
  },
  'automatyzacja-magazynu-wms-agv-automatyzacja-raportowania': {
    title: {
      pl: 'Automatyzacja magazynu: WMS, AGV, raportowanie',
      en: 'Warehouse Automation: WMS, AGV and Reporting Automation',
      ua: 'Автоматизація складу: WMS, AGV та автоматизація звітності',
    },
    meta_description: 'Sprawdź, czym jest automatyzacja magazynu - WMS, AGV, ASRS i automatyzacja raportowania. Dowiedz się, kiedy warto zautomatyzować magazyn.',
  },
  'automatyzacja-marketingu-ktore-procesy-wdrozyc-jako-pierwsze': {
    title: {
      pl: 'Automatyzacja marketingu - które procesy wdrożyć pierwsze',
    },
    meta_description: 'Sprawdź, jak marketing automation działa w praktyce - lead nurturing, scoring, retargeting i chatboty. Poznaj 5 procesów, które warto wdrożyć jako pierwsze.',
  },
  'automatyzacja-raportowania-w-firmie-koniec-z-recznymi-raportami': {
    title: {
      pl: 'Automatyzacja raportowania w firmie - koniec z Excelem',
    },
    meta_title: 'Automatyzacja raportowania bez ręcznej pracy | OmniTask',
    meta_description: 'Sprawdź, jak automatyzacja eliminuje ręczne raporty w Excelu - narzędzia BI, ETL, RPA i agenci AI oraz jak łączy się to z systemem BPM.',
  },
  'bpm-zarzadzanie-procesami-biznesowymi': {
    meta_description: 'Dowiedz się, czym jest BPM (Business Process Management), jakie są etapy cyklu życia BPM i jak automatyzacja pomaga zarządzać procesami.',
  },
  'automatyzacja-ai-w-praktyce-jak-mierzyc-efektywnosc': {
    title: {
      pl: 'Automatyzacja AI w praktyce: jak mierzyć jej efektywność',
      en: 'AI Automation in Practice: How to Measure Its Effectiveness',
      ua: 'AI-автоматизація на практиці: як вимірювати ефективність',
    },
    meta_title: 'Automatyzacja AI: jak mierzyć efektywność | OmniTask',
  },
  'back-office-co-to-jest-zadania-i-funkcje': {
    title: {
      en: 'Back Office: What It Is, Tasks and Functions',
      ua: 'Back Office: що це таке, завдання і функції',
    },
    meta_title: 'Back office: zadania i automatyzacja w firmie | OmniTask',
    meta_description: 'Czym jest back office i jak automatyzacja procesów zwiększa efektywność operacyjną? Poznaj zadania, funkcje i narzędzia back office.',
  },
  'robotyzacja-co-to-jest-jak-dziala-i-jak-wdrozyc': {
    title: {
      en: 'RPA: The Complete Implementation Guide',
    },
  },
  'system-bpm-oprogramowanie-do-zarzadzania-procesami': {
    meta_description: 'Szukasz systemu BPM? Sprawdź porównanie narzędzi - Creatio, Camunda, Pega, Appian i innych systemów do zarządzania procesami biznesowymi.',
  },
  'czym-jest-automatyzacja-i-robotyzacja-procesow': {
    meta_description: 'Dowiedz się, czym jest automatyzacja procesów (BPA) i robotyzacja (RPA), jakie są ich rodzaje i jak skutecznie wdrożyć je w firmie.',
  },
  'power-automate-vs-make-vs-n8n-vs-uipath': {
    title: {
      pl: 'Power Automate vs Make vs n8n vs UiPath - porównanie 2026',
      en: 'Power Automate vs Make vs n8n vs UiPath - Comparison 2026',
      ua: 'Power Automate, Make, n8n, UiPath - порівняння 2026',
    },
  },
  '5-procesow-w-biurze-rachunkowym-ktore-mozesz-zautomatyzowac': {
    title: {
      pl: '5 procesów w biurze rachunkowym do automatyzacji w 2026',
      en: '5 Processes to Automate in an Accounting Office in 2026',
      ua: '5 процесів бухгалтерії для автоматизації у 2026 році',
    },
    meta_title: 'Automatyzacja biura rachunkowego w 2026 | OmniTask',
  },
  'optymalizacja-procesow-biznesowych': {
    title: {
      pl: 'Optymalizacja procesów biznesowych: strategie i narzędzia IT',
      en: 'Business Process Optimization: Strategies and IT Tools',
      ua: 'Оптимізація бізнес-процесів: стратегії та IT-інструменти',
    },
    meta_title: 'Optymalizacja procesów biznesowych: strategie | OmniTask',
  },
}

async function processArticle(slug, fix) {
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) {
    console.log(`  [POMINIĘTO] ${slug} - nie znaleziono w bazie`)
    return
  }

  console.log(`\n${slug}`)
  const data = {}

  if (fix.title) {
    const oldTitle = article.title || {}
    const newTitle = { ...oldTitle, ...fix.title }
    for (const [loc, val] of Object.entries(fix.title)) {
      console.log(`  title.${loc}: "${oldTitle[loc] || ''}" -> "${val}"`)
    }
    data.title = newTitle
  }

  if (fix.meta_title) {
    console.log(`  meta_title: "${article.meta_title || ''}" -> "${fix.meta_title}"`)
    data.meta_title = fix.meta_title
  }

  if (fix.meta_description) {
    console.log(`  meta_description: "${article.meta_description || ''}" -> "${fix.meta_description}"`)
    data.meta_description = fix.meta_description
  }

  if (APPLY) {
    await prisma.article.update({ where: { slug }, data })
    console.log('  -> ZAPISANO')
  }
}

async function main() {
  console.log(APPLY ? 'TRYB ZAPISU - zmiany zostaną utrwalone w bazie.\n' : 'TRYB PODGLĄDU (dry-run) - nic nie zostanie zapisane. Uruchom z --apply, żeby zapisać.\n')

  for (const [slug, fix] of Object.entries(FIXES)) {
    await processArticle(slug, fix)
  }

  console.log(APPLY ? '\nGotowe.' : '\nPodgląd zakończony. Uruchom ponownie z flagą --apply, żeby faktycznie zapisać zmiany.')
}

main()
  .catch((e) => {
    console.error('Błąd:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
