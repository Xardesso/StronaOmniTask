import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { LOCALES, localeUrl, buildHreflangAlternates } from '@/lib/i18n'

export const revalidate = 3600 // Revalidate every hour

// "Czyste" ścieżki PL z metadanymi. Dla każdej wygenerujemy warianty pl/en/ua
// z poprawnym zestawem hreflang (pl, en, uk, x-default).
const STATIC_PATHS: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
  lastModified?: Date
}[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/uslugi', changeFrequency: 'monthly', priority: 0.9, lastModified: new Date('2026-05-17') },
  { path: '/uslugi/rpa', changeFrequency: 'monthly', priority: 0.8, lastModified: new Date('2026-05-17') },
  { path: '/uslugi/automatyzacja-workflow', changeFrequency: 'monthly', priority: 0.8, lastModified: new Date('2026-05-17') },
  { path: '/uslugi/integracja-systemow', changeFrequency: 'monthly', priority: 0.8, lastModified: new Date('2026-05-17') },
  { path: '/uslugi/agenci-ai', changeFrequency: 'monthly', priority: 0.8, lastModified: new Date('2026-05-17') },
  { path: '/o-nas', changeFrequency: 'monthly', priority: 0.7, lastModified: new Date('2026-05-17') },
  { path: '/zapytanie-ofertowe', changeFrequency: 'monthly', priority: 0.8, lastModified: new Date('2026-05-17') },
  { path: '/kontakt', changeFrequency: 'monthly', priority: 0.7, lastModified: new Date('2026-05-17') },
  { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Dla każdej ścieżki tworzymy po jednym wpisie na język, każdy z kompletem hreflang.
  const staticPages: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((entry) => {
    const languages = buildHreflangAlternates(entry.path)
    return LOCALES.map((locale) => ({
      url: localeUrl(entry.path, locale),
      lastModified: entry.lastModified ?? now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages },
    }))
  })

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

  return [...staticPages, ...blogPages]
}
