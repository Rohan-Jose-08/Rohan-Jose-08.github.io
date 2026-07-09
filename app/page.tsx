import { getGitHubData } from '@/lib/github'
import { PortfolioShell } from '@/components/portfolio-shell'

export const revalidate = 3600

export default async function Page() {
  const data = await getGitHubData()
  return <PortfolioShell data={data} />
}
