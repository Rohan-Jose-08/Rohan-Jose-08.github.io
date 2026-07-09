import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { featuredProjects } from '@/lib/portfolio-data'
import { projectArticles } from '@/lib/project-articles'
import { ProjectArticleView } from '@/components/project-article'

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = featuredProjects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Deep Dive`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Deep Dive`,
      description: project.tagline,
      type: 'article',
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = featuredProjects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? featuredProjects[index] : undefined
  const article = projectArticles[slug]
  if (!project || !article) notFound()

  const next = featuredProjects[(index + 1) % featuredProjects.length]

  return (
    <>
      <header className="glass fixed inset-x-0 top-0 z-50">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          <Link href="/" className="cursor-pointer font-mono text-sm font-semibold tracking-tight">
            <span className="text-primary">rj</span>
            <span className="text-muted-foreground">@</span>
            <span>portfolio</span>
            <span className="text-primary">:~$</span>
          </Link>
          <Link
            href="/#projects"
            className="cursor-pointer text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            All projects
          </Link>
        </nav>
      </header>
      <ProjectArticleView project={project} article={article} next={next} />
    </>
  )
}
