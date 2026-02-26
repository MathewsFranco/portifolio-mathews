const GITHUB_USERNAME = "mathewsfranco";
const GITHUB_API = "https://api.github.com";

interface ApiUser {
  public_repos: number;
}

interface ApiRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

interface ApiPushCommit {
  sha: string;
  message: string;
}

interface ApiCommitItem {
  sha: string;
  commit: {
    message: string;
    author: { date: string } | null;
  };
}

interface ApiEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    commits?: ApiPushCommit[];
  };
}

interface ApiPullRequest {
  number: number;
  title: string;
  html_url: string;
  created_at: string;
  state: "open" | "closed";
  pull_request?: { merged_at: string | null };
  repository_url?: string;
}

interface ApiPrSearch {
  total_count: number;
  items: ApiPullRequest[];
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  language: string;
  stars: number;
  pushedAt: string;
}

export interface GithubCommit {
  sha: string;
  message: string;
  repo: string;
  createdAt: string;
}

export interface GithubPr {
  number: number;
  title: string;
  repo: string;
  state: "open" | "closed" | "merged";
  createdAt: string;
  htmlUrl: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionGraph {
  weeks: ContributionDay[][];
  monthLabels: { label: string; weekIndex: number }[];
}

export interface GithubOverview {
  stats: {
    publicRepos: number;
    recentCommits: number;
    pullRequests: number;
    totalStars: number;
  };
  recentCommits: GithubCommit[];
  recentPrs: GithubPr[];
  repos: GithubRepo[];
  contributions: ContributionGraph;
  rateLimited: boolean;
}

class GithubRateLimitError extends Error {
  constructor() {
    super("GitHub API rate limit exceeded");
    this.name = "GithubRateLimitError";
  }
}

async function fetchGithub<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (
    response.status === 403 &&
    response.headers.get("x-ratelimit-remaining") === "0"
  ) {
    throw new GithubRateLimitError();
  }

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function formatRepoName(fullName: string): string {
  const [, repo] = fullName.split("/");
  return repo ?? fullName;
}

function buildContributionGraph(events: ApiEvent[]): ContributionGraph {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 167);

  const counts = new Map<string, number>();
  for (const event of events) {
    const date = new Date(event.created_at);
    date.setHours(0, 0, 0, 0);
    if (date < start || date > today) continue;
    const key = date.toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const days: ContributionDay[] = [];
  for (let index = 0; index < 168; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    const count = counts.get(key) ?? 0;
    const level: ContributionDay["level"] =
      count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4;
    days.push({ date: key, count, level });
  }

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const monthMap = new Map<string, number>();
  weeks.forEach((week, weekIndex) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const monthLabel = new Date(firstDay.date).toLocaleDateString("en-US", {
      month: "short",
    });
    if (!monthMap.has(monthLabel)) {
      monthMap.set(monthLabel, weekIndex);
    }
  });

  const monthLabels = Array.from(monthMap.entries()).map(
    ([label, weekIndex]) => ({
      label,
      weekIndex,
    }),
  );

  return { weeks, monthLabels };
}

function sortRepos(repos: ApiRepo[]): GithubRepo[] {
  return repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? "",
      htmlUrl: repo.html_url,
      language: repo.language ?? "Unknown",
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
    }))
    .sort((a, b) => {
      const scoreA = a.stars * 10 + new Date(a.pushedAt).getTime() / 1_000_000;
      const scoreB = b.stars * 10 + new Date(b.pushedAt).getTime() / 1_000_000;
      return scoreB - scoreA;
    })
    .slice(0, 6);
}

function parseRecentCommits(events: ApiEvent[]): GithubCommit[] {
  const items: GithubCommit[] = [];
  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    const commits = event.payload?.commits ?? [];
    for (const commit of commits) {
      items.push({
        sha: commit.sha.slice(0, 7),
        message: commit.message,
        repo: formatRepoName(event.repo.name),
        createdAt: event.created_at,
      });
    }
  }
  return items.slice(0, 6);
}

async function fetchCommitsFromRepos(repos: ApiRepo[]): Promise<GithubCommit[]> {
  const targets = repos
    .filter((r) => !r.fork)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 4);

  const results = await Promise.allSettled(
    targets.map((repo) =>
      fetchGithub<ApiCommitItem[]>(
        `/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=4`,
      ),
    ),
  );

  const all: GithubCommit[] = [];
  results.forEach((result, i) => {
    if (result.status !== "fulfilled") return;
    const repo = targets[i];
    if (!repo) return;
    for (const c of result.value) {
      all.push({
        sha: c.sha.slice(0, 7),
        message: (c.commit.message.split("\n")[0] ?? c.commit.message).slice(
          0,
          80,
        ),
        repo: repo.name,
        createdAt: c.commit.author?.date ?? new Date().toISOString(),
      });
    }
  });

  return all
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);
}

function parseRecentPrs(search: ApiPrSearch): GithubPr[] {
  return search.items.slice(0, 6).map((item) => {
    const merged = Boolean(item.pull_request?.merged_at);
    const repo = item.repository_url
      ? item.repository_url.split("/").slice(-2).join("/")
      : "unknown/repo";
    return {
      number: item.number,
      title: item.title,
      repo,
      state: merged ? "merged" : item.state,
      createdAt: item.created_at,
      htmlUrl: item.html_url,
    };
  });
}

const EMPTY_OVERVIEW: GithubOverview = {
  stats: { publicRepos: 0, recentCommits: 0, pullRequests: 0, totalStars: 0 },
  recentCommits: [],
  recentPrs: [],
  repos: [],
  contributions: { weeks: [], monthLabels: [] },
  rateLimited: false,
};

export async function getGithubOverview(): Promise<GithubOverview> {
  const [userResult, eventsResult, reposResult, prsResult] =
    await Promise.allSettled([
      fetchGithub<ApiUser>(`/users/${GITHUB_USERNAME}`),
      fetchGithub<ApiEvent[]>(
        `/users/${GITHUB_USERNAME}/events/public?per_page=100`,
      ),
      fetchGithub<ApiRepo[]>(
        `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=20`,
      ),
      fetchGithub<ApiPrSearch>(
        `/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=100&sort=created&order=desc`,
      ),
    ]);

  // Rate-limited when the primary user endpoint is blocked
  if (
    userResult.status === "rejected" &&
    userResult.reason instanceof GithubRateLimitError
  ) {
    return { ...EMPTY_OVERVIEW, rateLimited: true };
  }

  const user = userResult.status === "fulfilled" ? userResult.value : null;
  const events = eventsResult.status === "fulfilled" ? eventsResult.value : [];
  const repos = reposResult.status === "fulfilled" ? reposResult.value : [];
  const prs =
    prsResult.status === "fulfilled"
      ? prsResult.value
      : { total_count: 0, items: [] };

  const parsedRepos = sortRepos(repos);
  const recentPrs = parseRecentPrs(prs);
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );
  const contributions = buildContributionGraph(events);

  // Fetch commits directly from each repo — more reliable than events API
  const recentCommits = repos.length > 0
    ? await fetchCommitsFromRepos(repos)
    : parseRecentCommits(events);

  const recentCommitsCount = recentCommits.length;

  return {
    stats: {
      publicRepos: user?.public_repos ?? 0,
      recentCommits: recentCommitsCount,
      pullRequests: prs.total_count,
      totalStars,
    },
    recentCommits,
    recentPrs,
    repos: parsedRepos,
    contributions,
    rateLimited: false,
  };
}
