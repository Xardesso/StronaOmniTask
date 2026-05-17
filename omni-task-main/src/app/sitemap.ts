import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.omnitask.pl'
  const now = new Date()

  // Static pages with individual lastModified dates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/uslugi`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uslugi/rpa`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uslugi/automatyzacja-workflow`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uslugi/integracja-systemow`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uslugi/agenci-ai`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zapytanie-ofertowe`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic blog pages - auto-updated when new articles are published
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const articles = await Promise.race([
      prisma.article.findMany({
        where: { is_public: true },
        select: { slug: true, created_at: true },
        orderBy: { created_at: 'desc' },
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Prisma Timeout')), 3000))
    ]) as any[]

    if (articles && articles.length > 0) {
      blogPages = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: article.created_at,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
  }

  return [...staticPages, ...blogPages]
}
