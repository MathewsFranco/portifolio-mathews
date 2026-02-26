import { ExternalLink } from "lucide-react";
import { useGithubData } from "@/hooks/useGithubData";
import { contactLinks } from "@/lib/portfolio-content";
import { CommitsPanel } from "./commits-panel";
import { ContributionHeatmap } from "./contribution-heatmap";
import { PRsPanel } from "./prs-panel";
import { ReposPanel } from "./repos-panel";
import { StatCard } from "./stat-card";

export function GithubActivitySection() {
	const { data, loading, error } = useGithubData();

	if (error || data.rateLimited) {
		return (
			<div className="card p-8 text-center">
				<p style={{ color: "var(--c-muted)" }}>
					GitHub data temporarily unavailable — view my profile directly.
				</p>
				<a
					href={contactLinks.github}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-3 inline-flex items-center gap-1.5 font-medium text-sm"
					style={{ color: "var(--c-accent)" }}
				>
					github.com/mathewsfranco
					<ExternalLink size={14} />
				</a>
			</div>
		);
	}

	const statItems = [
		{ label: "Repos", value: data.stats.publicRepos },
		{ label: "Commits", value: data.stats.recentCommits },
		{ label: "PRs", value: data.stats.pullRequests },
		{ label: "Stars", value: data.stats.totalStars },
	];

	return (
		<div className="space-y-5">
			<ContributionHeatmap
				contributions={data.contributions}
				loading={loading}
			/>

			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				{statItems.map((stat, i) => (
					<StatCard
						key={stat.label}
						label={stat.label}
						value={stat.value}
						loading={loading}
						delay={i * 0.08}
					/>
				))}
			</div>

			<ReposPanel repos={data.repos} loading={loading} />

			<div className="grid gap-3 lg:grid-cols-2">
				<CommitsPanel commits={data.recentCommits} loading={loading} />
				<PRsPanel prs={data.recentPrs} loading={loading} />
			</div>
		</div>
	);
}
