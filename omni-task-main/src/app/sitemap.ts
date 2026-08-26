import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { LOCALES, localeUrl, buildHreflangAlternates, SITE_URL } from '@/lib/i18n'
import { FEATURE_BUR, FEATURE_REALIZACJE } from '@/lib/site-config'

export const revalidate = 3600 // Revalidate every hour

// "Czyste" ścieżki PL z metadanymi. Dla każdej wygenerujemy warianty pl/en/ua
// z poprawnym zestawem hreflang (pl, en, uk, x-default).
// `plOnly: true` → strona istnieje wyłącznie po polsku (spec 2.2/5.2):
// nie generujemy dla niej wariantów /en, /ua, a hreflang wskazuje tylko x-default.
const STATIC_PATHS: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
  lastModified?: Date
  plOnly?: boolean
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/dofinansowanie', changeFrequency: 'monthly', priority: 0.9, plOnly: true },
  { path: '/cennik', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/uslugi', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/uslugi/rpa', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/uslugi/automatyzacja-workflow', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/uslugi/integracja-systemow', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/uslugi/agenci-ai', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/uslugi/ksef', changeFrequency: 'monthly', priority: 0.8, plOnly: true },
  { path: '/uslugi/szkolenia-i-doradztwo', changeFrequency: 'monthly', priority: 0.8, plOnly: true },
  { path: '/uslugi/opieka-i-hosting', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/o-nas', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/zapytanie-ofertowe', changeFrequency: 'monthly', priority: 0.6, plOnly: true },
  { path: '/kontakt', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.4, plOnly: true },
  { path: '/polityka-prywatnosci', changeFrequency: 'yearly', priority: 0.4, plOnly: true },
  { path: '/regulamin', changeFrequency: 'yearly', priority: 0.4, plOnly: true },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const visiblePaths = STATIC_PATHS.filter((entry) => {
    if (entry.path === '/dofinansowanie') return FEATURE_BUR
    return true
  })

  // Dla każdej ścieżki tworzymy po jednym wpisie na język (lub tylko PL dla plOnly),
  // każdy z kompletem hreflang.
  const staticPages: MetadataRoute.Sitemap = visiblePaths.flatMap((entry) => {
    if (entry.plOnly) {
      return [{
        url: `${SITE_URL}${entry.path === '/' ? '' : entry.path}`,
        lastModified: entry.lastModified ?? now,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: { languages: { 'x-default': `${SITE_URL}${entry.path}` } },
      }]
    }
    const languages = buildHreflangAlternates(entry.path)
    return LOCALES.map((locale) => ({
      url: localeUrl(entry.path, locale),
      lastModified: entry.lastModified ?? now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages },
    }))
  })

  // Realizacje — hub włączany dopiero po pierwszym case study (spec 4.8).
  const realizacjePages: MetadataRoute.Sitemap = FEATURE_REALIZACJE
    ? [{ url: `${SITE_URL}/realizacje`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 }]
    : []

  // Wpisy bloga – generowane dynamicznie, w trzech wersjach językowych.
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const articles = (await Promise.race([
      prisma.article.findMany({
        where: { is_public: true },
        select: { slug: true, created_at: true },
        orderBy: { created_at: 'desc' },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 3000)),
    ])) as any[]

    if (articles && articles.length > 0) {
      blogPages = articles.flatMap((article) => {
        const cleanPath = `/blog/${article.slug}`
        const languages = buildHreflangAlternates(cleanPath)
        return LOCALES.map((locale) => ({
          url: localeUrl(cleanPath, locale),
          lastModified: article.created_at,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
          alternates: { languages },
        }))
      })
    }
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
  }

  return [...staticPages, ...realizacjePages, ...blogPages]
}
