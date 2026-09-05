'use client'

import { useTranslation } from '@/i18n/context'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from '@/components/LocaleLink'

interface Article {
  id: number
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  category: Record<string, string>
  image: string | null
  image_alt: string | null
  image_title: string | null
  schema_markup: string | null
  meta_title: string | null
  meta_description: string | null
  date: string | null
  created_at: string
}

interface RelatedPost {
  slug: string
  title: string
  image: string | null
}

// Treść artykułu bywa wygenerowana z własnym nagłówkiem tytułowym na
// początku, identycznym z tytułem, który i tak renderujemy w page-header.
// To dubluje <h1> na stronie (źle dla SEO), więc wycinamy go, jeśli
// pokrywa się z tytułem - czysty string/regex, żeby działało tak samo
// przy SSR (co widzi Google), jak i po stronie klienta.
function stripDuplicateHeading(html: string, title: string): string {
  const match = html.match(/^\s*<h([1-3])[^>]*>([\s\S]*?)<\/h\1>\s*/i)
  if (!match) return html
  const headingText = match[2].replace(/<[^>]+>/g, '').trim().toLowerCase()
  if (headingText === title.trim().toLowerCase()) {
    return html.slice(match[0].length)
  }
  return html
}

export default function BlogArticleClient({ article, relatedPosts = [] }: { article: Article; relatedPosts?: RelatedPost[] }) {
  const { t, locale } = useTranslation()

  // EFFECT for dynamically setting title on links
  useEffect(() => {
    const links = document.querySelectorAll('.article-page__content a')
    links.forEach((link) => {
      if (!link.getAttribute('title')) {
        link.setAttribute('title', link.textContent || '')
      }
    })
  }, [article])

  const title = article.title ? (article.title[locale] || article.title.pl || '') : ''
  const rawContent = article.content ? (article.content[locale] || article.content.pl || '') : ''
  const content = stripDuplicateHeading(rawContent, title)

  return (
    <>
      <div className="page-header">
        <div className="page-header__bg" />
        <h1>{title}</h1>
        <p className="article-page__date">
          {t('blog.published')} {new Date(article.date || article.created_at).toLocaleDateString(
            locale === 'ua' ? 'uk-UA' : locale === 'en' ? 'en-US' : 'pl-PL'
          )}
        </p>
      </div>

      <div className="article-page">
        <div className="article-page__container">
          <div
            className="article-page__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>{t('blog.related_title')}</h2>
              <div className="blog-grid">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card" title={post.title}>
                    <div className="blog-card__image">
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 380px" style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, #18185e, #384bff)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'rgba(255,255,255,0.3)',
                          fontSize: '3rem',
                        }}>
                          ◆
                        </div>
                      )}
                    </div>
                    <div className="blog-card__body">
                      <h3 className="blog-card__title">{post.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
            <Link href="/blog" className="btn btn--dark" title={t('blog.title')}>
              ← {t('blog.title')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
