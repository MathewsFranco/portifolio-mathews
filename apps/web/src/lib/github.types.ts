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
