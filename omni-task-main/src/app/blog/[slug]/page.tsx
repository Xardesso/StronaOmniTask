import { prisma } from '@/lib/prisma'
import { getPublicUrl } from '@/lib/gcs'
import BlogArticleClient from './BlogArticleClient'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { buildHreflangAlternates } from '@/lib/i18n'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({ where: { is_public: true }, select: { slug: true } })
    return articles.map((a: { slug: string }) => ({ slug: a.slug }))
  } catch (error) {
    console.error('generateStaticParams error:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug, is_public: true } }) as any;
  if (!article) return {}
  return {
    title: article.meta_title || (article.title?.pl || 'Blog'),
    description: article.meta_description || (article.excerpt?.pl || ''),
    openGraph: {
      title: article.meta_title || (article.title?.pl || 'Blog'),
      description: article.meta_description || (article.excerpt?.pl || ''),
      url: `https://www.omnitask.pl/blog/${slug}`,
      type: 'article',
      images: article.image ? [{ url: article.image.startsWith('http') ? article.image : getPublicUrl(article.image) }] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: buildHreflangAlternates(`/blog/${slug}`),
    },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug, is_public: true } }) as any;

  if (!article) {
    notFound()
  }

  const resolvedArticle = {
    ...article,
    image: article.image
      ? (article.image.startsWith('http') ? article.image : getPublicUrl(article.image))
      : null,
    title: article.title || {},
    excerpt: article.excerpt || {},
    content: article.content || {},
    category: article.category || {},
    created_at: article.created_at.toISOString(),
  }

  const title = article.title?.pl || ''

  return (
    <>
      <BlogArticleClient article={resolvedArticle} />
      
      {/* Article Schema */}
      {article.schema_markup ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: article.schema_markup }}
        />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: title,
              datePublished: article.date || article.created_at.toISOString(),
              image: resolvedArticle.image || undefined,
              author: {
                '@type': 'Organization',
                name: 'OmniTask',
              },
              publisher: {
                '@type': 'Organization',
                name: 'OmniTask',
                url: 'https://www.omnitask.pl',
              },
            }),
          }}
        />
      )}
    </>
  )
}
