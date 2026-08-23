import HomeClient from './HomeClient'
import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  let articles: any[] = []

  try {
    const raw = await prisma.article.findMany({
      where: { is_public: true },
      orderBy: { created_at: 'desc' },
      take: 3,
      select: { id: true, slug: true, title: true, excerpt: true, image: true, image_alt: true },
    }) as any[]

    articles = raw.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title?.pl || '',
      excerpt: a.excerpt?.pl || '',
      image: a.image ? (a.image.startsWith('http') ? a.image : getPublicUrl(a.image)) : null,
      image_alt: a.image_alt || null,
    }))
  } catch (e) {
    console.error('Error fetching latest articles:', e)
  }

  return <HomeClient articles={articles} />
}
