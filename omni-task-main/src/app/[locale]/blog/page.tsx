import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'
import BlogClient from '../../blog/BlogClient'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/blog', metaKey: 'blog' })
}

export default async function LocalizedBlogPage() {
  let articlesRaw: any[] = []
  try {
    articlesRaw = (await prisma.article.findMany({
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
    })) as any[]
  } catch (error) {
    console.error('Error fetching articles:', error)
  }

  const articles = articlesRaw.map((a: any) => ({
    ...a,
    image: a.image ? (a.image.startsWith('http') ? a.image : getPublicUrl(a.image)) : null,
    title: a.title || {},
    excerpt: a.excerpt || {},
    category: a.category || {},
    created_at: a.created_at.toISOString(),
  }))

  return <BlogClient articles={articles} />
}
