import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'
import BlogClient from './BlogClient'

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  let articlesRaw: any[] = []
  try {
    articlesRaw = await prisma.article.findMany({
      where: { is_public: true },
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        image: true,
        image_alt: true,
        image_title: true,
        created_at: true,
        date: true,
      },
    }) as any[]
  } catch (error) {
    console.error('Error fetching articles:', error)
  }

  const articles = articlesRaw.map((a: any) => ({
    ...a,
    image: a.image
      ? (a.image.startsWith('http') ? a.image : getPublicUrl(a.image))
      : null,
    title: a.title || {},
    excerpt: a.excerpt || {},
    category: a.category || {},
    created_at: a.created_at.toISOString(),
  }))

  return (
    <>
      <BlogClient articles={articles} />
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog – Automatyzacja RPA i AI',
            description: 'Artykuły eksperckie o RPA, automatyzacji procesów i agentach AI. Praktyczne porady, case studies i trendy technologiczne. Czytaj i wdrażaj →',
            url: 'https://www.omnitask.pl/blog',
          })
        }}
      />
    </>
  )
}
