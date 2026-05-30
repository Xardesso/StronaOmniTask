import type { Metadata } from 'next'
import HomeClient from '../HomeClient'
import { prisma } from '@/lib/prisma'
import { buildPageMetadata } from '@/lib/meta'
import { type Locale } from '@/lib/i18n'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale: locale as Locale, cleanPath: '/', metaKey: 'home', absoluteTitle: true })
}

export default async function LocalizedHomePage() {
  let testimonials = []
  try {
    const rawTestimonials = (await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    })) as any[]
    testimonials = rawTestimonials.map((t) => ({
      ...t,
      createdAt: t.createdAt ? t.createdAt.toISOString() : null,
      updatedAt: t.updatedAt ? t.updatedAt.toISOString() : null,
    }))
  } catch (e) {
    console.error('Error fetching testimonials:', e)
  }

  return <HomeClient testimonials={testimonials} />
}
