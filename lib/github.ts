export const GITHUB_USERNAME = 'Rohan-Jose-08'

export interface GitHubProfile {
  name: string
  login: string
  bio: string | null
  avatarUrl: string
  htmlUrl: string
  publicRepos: number
  followers: number
  createdAt: string
}

export interface GitHubRepo {
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  htmlUrl: string
  homepage: string | null
  topics: string[]
  createdAt: string
  pushedAt: string
  size: number
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface LanguageStat {
  name: string
  bytes: number
  percent: number
}

export interface GitHubData {
  profile: GitHubProfile
  repos: GitHubRepo[]
  contributions: ContributionDay[]
  totalContributions: number
  activeDays: number
  longestStreak: number
  languages: LanguageStat[]
}

const REVALIDATE = 3600
const EXCLUDED_LANGUAGES = new Set([
  'Makefile',
  'Linker Script',
  'LLVM',
  'Shell',
  'PowerShell',
  'Dockerfile',
  'Ruby',
  'Objective-C',
  'HTML',
])

const headers: HeadersInit = { Accept: 'application/vnd.github+json' }

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers, next: { revalidate: REVALIDATE } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

function longestStreak(days: ContributionDay[]): number {
  let best = 0
  let run = 0
  for (const d of days) {
    if (d.count > 0) {
      run += 1
      if (run > best) best = run
    } else {
      run = 0
    }
  }
  return best
}

export async function getGitHubData(): Promise<GitHubData> {
  const [profileRaw, reposRaw, contribRaw] = await Promise.all([
    fetchJson<Record<string, unknown>>(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetchJson<Record<string, unknown>[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`
    ),
    fetchJson<{ total: Record<string, number>; contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    ),
  ])

  const profile: GitHubProfile = {
    name: (profileRaw?.name as string) ?? 'Rohan Jose',
    login: (profileRaw?.login as string) ?? GITHUB_USERNAME,
    bio: (profileRaw?.bio as string) ?? null,
    avatarUrl: (profileRaw?.avatar_url as string) ?? '',
    htmlUrl: (profileRaw?.html_url as string) ?? `https://github.com/${GITHUB_USERNAME}`,
    publicRepos: (profileRaw?.public_repos as number) ?? 0,
    followers: (profileRaw?.followers as number) ?? 0,
    createdAt: (profileRaw?.created_at as string) ?? '2024-09-28T00:00:00Z',
  }

  const repos: GitHubRepo[] = (reposRaw ?? [])
    .filter((r) => !r.fork)
    .map((r) => ({
      name: r.name as string,
      description: (r.description as string) ?? null,
      language: (r.language as string) ?? null,
      stars: (r.stargazers_count as number) ?? 0,
      forks: (r.forks_count as number) ?? 0,
      htmlUrl: r.html_url as string,
      homepage: (r.homepage as string) ?? null,
      topics: (r.topics as string[]) ?? [],
      createdAt: r.created_at as string,
      pushedAt: r.pushed_at as string,
      size: (r.size as number) ?? 0,
    }))

  // Aggregate language bytes across repos
  const langTotals = new Map<string, number>()
  const langResults = await Promise.all(
    repos
      .slice(0, 12)
      .map((r) =>
        fetchJson<Record<string, number>>(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${r.name}/languages`
        )
      )
  )
  for (const langs of langResults) {
    if (!langs) continue
    for (const [name, bytes] of Object.entries(langs)) {
      if (EXCLUDED_LANGUAGES.has(name)) continue
      langTotals.set(name, (langTotals.get(name) ?? 0) + bytes)
    }
  }
  const totalBytes = [...langTotals.values()].reduce((a, b) => a + b, 0) || 1
  const languages: LanguageStat[] = [...langTotals.entries()]
    .map(([name, bytes]) => ({ name, bytes, percent: (bytes / totalBytes) * 100 }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8)

  const contributions = contribRaw?.contributions ?? []
  const totalContributions = Object.values(contribRaw?.total ?? {}).reduce((a, b) => a + b, 0)
  const activeDays = contributions.filter((d) => d.count > 0).length

  return {
    profile,
    repos,
    contributions,
    totalContributions,
    activeDays,
    longestStreak: longestStreak(contributions),
    languages,
  }
}
