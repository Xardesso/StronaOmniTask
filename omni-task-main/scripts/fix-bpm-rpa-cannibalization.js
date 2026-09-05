/**
 * Naprawia kanibalizację słów kluczowych między artykułami blogowymi o BPM
 * i o RPA (audyt SEO 2026-09-02, sekcja 7 i plan działania #16).
 *
 * Dla obu klastrów wybiera jeden artykuł jako filar (najdłuższy, najbardziej
 * kompletny) i różnicuje tytuły/H1 pozostałych, żeby nie konkurowały o tę
 * samą frazę. Na końcu treści (PL/EN/UA) dopisuje blok "Zobacz też" z linkami
 * między filarem a satelitami oraz do właściwej strony usługowej - bez
 * ingerencji w istniejącą treść artykułu.
 *
 * Bezpieczne uruchamianie:
 *   node scripts/fix-bpm-rpa-cannibalization.js            (tryb podglądu - nic nie zapisuje)
 *   node scripts/fix-bpm-rpa-cannibalization.js --apply    (faktycznie zapisuje zmiany)
 *
 * Wymaga zmiennej środowiskowej DATABASE_URL (tej samej, której używa
 * aplikacja - na VPS jest już ustawiona, nic nie trzeba dodatkowo podawać).
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const APPLY = process.argv.includes('--apply')

// Znacznik w HTML, po którym rozpoznajemy, że blok linków już został
// dodany - pozwala bezpiecznie uruchomić skrypt kilka razy bez duplikatów.
const MARKER = '<!-- related-links-block -->'

function relatedBlock(links) {
  const items = links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')
  return `\n${MARKER}\n<div class="article-related-links"><p><strong>Zobacz też:</strong></p><ul>${items}</ul></div>\n`
}

// --- Klaster BPM -----------------------------------------------------------

const bpmPillarSlug = 'jak-wdrozyc-system-bpm-7-etapow-projektu-bledy'
const bpmSatelliteSlugs = [
  'bpm-zarzadzanie-procesami-biznesowymi',
  'system-bpm-oprogramowanie-do-zarzadzania-procesami',
  'system-bpm-w-praktyce-branze-workflow-engine-integracje-roi',
]

const bpmTitles = {
  [bpmPillarSlug]: {
    pl: 'System BPM: kompletny przewodnik wdrożenia w 7 etapach',
    en: 'BPM System: The Complete Implementation Guide in 7 Steps',
    ua: 'Система BPM: повний посібник із впровадження за 7 етапами',
    meta_title: 'System BPM: kompletny przewodnik wdrożenia | OmniTask',
  },
  'bpm-zarzadzanie-procesami-biznesowymi': {
    pl: 'Czym jest BPM? Zarządzanie procesami biznesowymi od podstaw',
    en: 'What Is BPM? Business Process Management Explained',
    ua: 'Що таке BPM? Управління бізнес-процесами з нуля',
    meta_title: 'Czym jest BPM? Zarządzanie procesami od podstaw | OmniTask',
  },
  'system-bpm-oprogramowanie-do-zarzadzania-procesami': {
    pl: 'Jakie oprogramowanie BPM wybrać? Porównanie systemów',
    en: 'Which BPM Software to Choose? A System Comparison',
    ua: 'Яке програмне забезпечення BPM обрати? Порівняння систем',
    meta_title: 'Jakie oprogramowanie BPM wybrać - porównanie | OmniTask',
  },
  'system-bpm-w-praktyce-branze-workflow-engine-integracje-roi': {
    pl: 'System BPM w praktyce: ROI i przykłady z branż',
    en: 'BPM in Practice: ROI and Real Industry Examples',
    ua: 'BPM на практиці: ROI та приклади з галузей',
    meta_title: 'System BPM w praktyce: ROI i przykłady branż | OmniTask',
  },
}

// --- Klaster RPA -------------------------------------------------------------

const rpaPillarSlug = 'robotyzacja-co-to-jest-jak-dziala-i-jak-wdrozyc'
const rpaSatelliteSlugs = [
  'czym-jest-automatyzacja-i-robotyzacja-procesow',
  'przyszlosc-biura-automatyzacja-rpa-ai-agenci',
]

const rpaTitles = {
  [rpaPillarSlug]: {
    pl: 'Robotyzacja procesów (RPA): kompletny przewodnik wdrożenia',
    en: 'Robotic Process Automation (RPA): The Complete Implementation Guide',
    ua: 'Роботизація процесів (RPA): повний посібник із впровадження',
    meta_title: 'Robotyzacja procesów RPA: kompletny przewodnik | OmniTask',
  },
  'czym-jest-automatyzacja-i-robotyzacja-procesow': {
    pl: 'Automatyzacja a robotyzacja procesów: czym się różnią?',
    en: "Automation vs. RPA: What's the Difference?",
    ua: 'Автоматизація і роботизація процесів: у чому різниця?',
    meta_title: 'Automatyzacja a robotyzacja procesów - różnice | OmniTask',
  },
  'przyszlosc-biura-automatyzacja-rpa-ai-agenci': {
    pl: 'Przyszłość biura: RPA i agenci AI w automatyzacji procesów',
    en: 'The Future Office: RPA and AI Agents in Process Automation',
    ua: 'Майбутнє офісу: RPA та AI-агенти в автоматизації процесів',
    meta_title: 'Przyszłość biura: RPA i agenci AI | OmniTask',
  },
}

function buildCluster({ pillarSlug, satelliteSlugs, titles, serviceCleanPath, serviceIntlPath, serviceLabel }) {
  const allSlugs = [pillarSlug, ...satelliteSlugs]
  const linksFor = (slug, locale) => {
    const prefix = locale === 'pl' ? '' : `/${locale}`
    const others = allSlugs.filter((s) => s !== slug)
    const articleLinks = others.map((s) => ({
      href: `${prefix}/blog/${s}`,
      label: titles[s][locale],
    }))
    const serviceHref = locale === 'pl' ? serviceCleanPath : `${prefix}${serviceIntlPath}`
    return [...articleLinks, { href: serviceHref, label: serviceLabel[locale] }]
  }
  return { allSlugs, titles, linksFor }
}

const clusters = [
  buildCluster({
    pillarSlug: bpmPillarSlug,
    satelliteSlugs: bpmSatelliteSlugs,
    titles: bpmTitles,
    serviceCleanPath: '/uslugi/automatyzacja-workflow',
    serviceIntlPath: '/services/workflow-automation',
    serviceLabel: {
      pl: 'Automatyzacja workflow z n8n i Make',
      en: 'Workflow automation with n8n and Make',
      ua: 'Автоматизація workflow у n8n та Make',
    },
  }),
  buildCluster({
    pillarSlug: rpaPillarSlug,
    satelliteSlugs: rpaSatelliteSlugs,
    titles: rpaTitles,
    serviceCleanPath: '/uslugi/rpa',
    serviceIntlPath: '/services/rpa',
    serviceLabel: {
      pl: 'Robotyzacja procesów (RPA) dla firm',
      en: 'Robotic Process Automation (RPA) for businesses',
      ua: 'Роботизація процесів (RPA) для компаній',
    },
  }),
]

async function processArticle(cluster, slug) {
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) {
    console.log(`  [POMINIĘTO] ${slug} - nie znaleziono w bazie`)
    return
  }

  const newTitleSet = cluster.titles[slug]
  const oldTitle = article.title || {}
  const newTitle = { ...oldTitle, pl: newTitleSet.pl, en: newTitleSet.en, ua: newTitleSet.ua }

  console.log(`\n${slug}`)
  console.log(`  title.pl:  "${oldTitle.pl || ''}" -> "${newTitle.pl}"`)
  console.log(`  title.en:  "${oldTitle.en || ''}" -> "${newTitle.en}"`)
  console.log(`  title.ua:  "${oldTitle.ua || ''}" -> "${newTitle.ua}"`)
  console.log(`  meta_title: "${article.meta_title || ''}" -> "${newTitleSet.meta_title}"`)

  const oldContent = article.content || {}
  const newContent = { ...oldContent }
  for (const locale of ['pl', 'en', 'ua']) {
    const current = oldContent[locale] || ''
    if (current.includes(MARKER)) {
      console.log(`  content.${locale}: blok linków już obecny, pomijam dopisywanie`)
      continue
    }
    const links = cluster.linksFor(slug, locale)
    newContent[locale] = current + relatedBlock(links)
    console.log(`  content.${locale}: dopisuję blok "Zobacz też" z ${links.length} linkami`)
  }

  if (APPLY) {
    await prisma.article.update({
      where: { slug },
      data: {
        title: newTitle,
        meta_title: newTitleSet.meta_title,
        content: newContent,
      },
    })
    console.log('  -> ZAPISANO')
  }
}

async function main() {
  console.log(APPLY ? 'TRYB ZAPISU - zmiany zostaną utrwalone w bazie.\n' : 'TRYB PODGLĄDU (dry-run) - nic nie zostanie zapisane. Uruchom z --apply, żeby zapisać.\n')

  for (const cluster of clusters) {
    for (const slug of cluster.allSlugs) {
      await processArticle(cluster, slug)
    }
  }

  console.log(APPLY ? '\nGotowe.' : '\nPodgląd zakończony. Uruchom ponownie z flagą --apply, żeby faktycznie zapisać zmiany.')
}

main()
  .catch((e) => {
    console.error('Błąd:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
