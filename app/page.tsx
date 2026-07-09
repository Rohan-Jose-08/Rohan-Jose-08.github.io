import { getGitHubData } from '@/lib/github'
import { PortfolioShell } from '@/components/portfolio-shell'

export default async function Page() {
  const data = await getGitHubData()
  return <PortfolioShell data={data} />
}
