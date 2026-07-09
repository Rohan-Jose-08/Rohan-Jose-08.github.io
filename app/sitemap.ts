import type { MetadataRoute } from 'next'
import { featuredProjects } from '@/lib/portfolio-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://rohan-jose.vercel.app'
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...featuredProjects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
