import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'
import BlogArticleClient from '../../../blog/[slug]/BlogArticleClient'
import { notFound } from 'next/navigation'
import { SITE_URL, localizePath, buildHreflangAlternates, type Locale } from '@/lib/i18n'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({ where: { is_public: true }, select: { slug: true } })
    return (['en', 'ua'] as const).flatMap((locale) =>
      articles.map((a: { slug: string }) => ({ locale, slug: a.slug }))
    )
  } catch (error) {
    console.error('generateStaticParams error:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const article = (await prisma.article.findUnique({ where: { slug, is_public: true } })) as any
  if (!article) return {}
  const title = article.meta_title || article.title?.[locale] || article.title?.pl || 'Blog'
  const description = article.meta_description || article.excerpt?.[locale] || article.excerpt?.pl || ''
  const cleanPath = `/blog/${slug}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localizePath(cleanPath, locale as Locale)}`,
      type: 'article',
      images: article.image ? [{ url: article.image.startsWith('http') ? article.image : getPublicUrl(article.image) }] : [],
    },
    alternates: {
      canonical: localizePath(cleanPath, locale as Locale),
      languages: buildHreflangAlternates(cleanPath),
    },
  }
}

export default async function LocalizedBlogArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params
  const article = (await prisma.article.findUnique({ where: { slug, is_public: true } })) as any
  if (!article) {
    notFound()
  }

  const resolvedArticle = {
    ...article,
    image: article.image ? (article.image.startsWith('http') ? article.image : getPublicUrl(article.image)) : null,
    title: article.title || {},
    excerpt: article.excerpt || {},
    content: article.content || {},
    category: article.category || {},
    created_at: article.created_at.toISOString(),
  }

  return (
    <>
      <BlogArticleClient article={resolvedArticle} />
      {article.schema_markup && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: article.schema_markup }} />
      )}
    </>
  )
}
