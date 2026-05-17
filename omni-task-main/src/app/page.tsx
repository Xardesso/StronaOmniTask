import HomeClient from './HomeClient'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  let testimonials = []
  
  try {
    const rawTestimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    }) as any[]
    
    // Ensure all data passed to client component is serializable
    testimonials = rawTestimonials.map(t => ({
      ...t,
      createdAt: t.createdAt ? t.createdAt.toISOString() : null,
      updatedAt: t.updatedAt ? t.updatedAt.toISOString() : null,
    }))
  } catch (e) {
    console.error('Error fetching testimonials:', e)
  }

  return <HomeClient testimonials={testimonials} />
}
