import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
	ArrowUpRight,
	Check,
	Copy,
	ExternalLink,
	Github,
	Linkedin,
	Mail,
	Phone,
} from "lucide-react";
import { useState } from "react";
import { useCountUp, useGithubData } from "@/hooks/useGithubData";
import type { ContributionGraph, GithubCommit, GithubPr, GithubRepo } from "@/lib/github";
import { contactLinks } from "@/lib/portfolio-content";

const CONTRIB_COLORS = [
	"var(--c-border)",
	"rgba(76, 175, 110, 0.18)",
	"rgba(76, 175, 110, 0.42)",
	"var(--c-accent)",
	"var(--c-accent-light)",
] as const;

function ContributionHeatmap({
	contributions,
	loading,
}: {
	contributions: ContributionGraph;
	loading: boolean;
}) {
	if (loading) {
		return <div className="skeleton-block" style={{ height: 96 }} />;
	}
	if (contributions.weeks.length === 0) return null;

	return (
		<motion.div
			className="contrib-wrap"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}
		>
			<p className="contrib-label">Activity · last 24 weeks</p>
			<div className="contrib-scroll">
				<div className="contrib-inner">
					{/* Month labels */}
					<div className="contrib-months">
						{contributions.weeks.map((_, wi) => {
							const match = contributions.monthLabels.find(
								(m) => m.weekIndex === wi,
							);
							return (
								<div key={wi} className="contrib-month-slot">
									{match && (
										<span className="contrib-month-label">{match.label}</span>
									)}
								</div>
							);
						})}
					</div>
					{/* Day grid */}
					<div className="contrib-grid">
						{contributions.weeks.map((week, wi) => (
							<div key={wi} className="contrib-col">
								{week.map((day) => (
									<div
										key={day.date}
										className="contrib-cell"
										style={{ background: CONTRIB_COLORS[day.level] }}
										title={
											day.count > 0
												? `${day.count} event${day.count > 1 ? "s" : ""} on ${day.date}`
												: day.date
										}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function StatCard({
	label,
	value,
	loading,
	delay,
}: {
	label: string;
	value: number;
	loading: boolean;
	delay: number;
}) {
	const count = useCountUp(loading ? 0 : value);
	return (
		<motion.div
			className="card p-5 text-center"
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
		>
			<p className="stat-number text-3xl">{loading ? "—" : count}</p>
			<p className="stat-label mt-1">{label}</p>
		</motion.div>
	);
}

function CommitsPanel({
	commits,
	loading,
}: {
	commits: GithubCommit[];
	loading: boolean;
}) {
	return (
		<motion.div
			className="card p-6"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
		>
			<h4 className="activity-panel-heading">Recent Commits</h4>
			{loading ? (
				<div className="space-y-3 pt-1">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="skeleton-row">
							<div className="skeleton-block" style={{ width: 52, height: 18, borderRadius: 3 }} />
							<div className="skeleton-block" style={{ flex: 1, height: 14, borderRadius: 3 }} />
						</div>
					))}
				</div>
			) : (
				<div>
					{commits.map((commit) => (
						<div
							key={`${commit.sha}-${commit.createdAt}`}
							className="activity-row"
						>
							<span className="commit-sha">{commit.sha}</span>
							<span className="truncate text-sm">{commit.message}</span>
							<span className="activity-time">
								{formatDistanceToNow(new Date(commit.createdAt), {
									addSuffix: true,
								})}
							</span>
						</div>
					))}
					{commits.length === 0 && (
						<p className="activity-empty">No recent commits</p>
					)}
				</div>
			)}
		</motion.div>
	);
}

function PRsPanel({
	prs,
	loading,
}: {
	prs: GithubPr[];
	loading: boolean;
}) {
	return (
		<motion.div
			className="card p-6"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
		>
			<h4 className="activity-panel-heading">Pull Requests</h4>
			{loading ? (
				<div className="space-y-3 pt-1">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="skeleton-row">
							<div className="skeleton-block" style={{ width: 8, height: 8, borderRadius: "50%" }} />
							<div className="skeleton-block" style={{ flex: 1, height: 14, borderRadius: 3 }} />
						</div>
					))}
				</div>
			) : (
				<div>
					{prs.map((pr) => (
						<a
							key={`${pr.repo}-${pr.number}`}
							href={pr.htmlUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="activity-row group"
						>
							<span
								className="inline-block h-2 w-2 shrink-0 rounded-full"
								style={{
									background:
										pr.state === "merged"
											? "#a78bfa"
											: pr.state === "open"
												? "var(--c-accent)"
												: "var(--c-muted)",
								}}
							/>
							<span className="truncate text-sm">{pr.title}</span>
							<span
								className="flex items-center gap-1 whitespace-nowrap text-xs"
								style={{ color: "var(--c-muted)" }}
							>
								#{pr.number}
								<ArrowUpRight
									size={12}
									className="opacity-0 transition-opacity group-hover:opacity-100"
								/>
							</span>
						</a>
					))}
					{prs.length === 0 && (
						<p className="activity-empty">No recent pull requests</p>
					)}
				</div>
			)}
		</motion.div>
	);
}

function RepoCard({ repo }: { repo: GithubRepo }) {
	return (
		<motion.a
			href={repo.htmlUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="repo-card"
			variants={{
				hidden: { opacity: 0, y: 16 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
				},
			}}
		>
			<div className="repo-card-header">
				<span className="repo-card-name">{repo.name}</span>
				{repo.stars > 0 && (
					<span className="repo-card-stars">★ {repo.stars}</span>
				)}
			</div>
			{repo.description ? (
				<p className="repo-card-desc">{repo.description}</p>
			) : (
				<p className="repo-card-desc repo-card-desc--empty">No description</p>
			)}
			<div className="repo-card-footer">
				<span className="repo-card-lang">{repo.language}</span>
				<span className="repo-card-time">
					{formatDistanceToNow(new Date(repo.pushedAt), { addSuffix: true })}
				</span>
			</div>
		</motion.a>
	);
}

function ReposPanel({
	repos,
	loading,
}: {
	repos: GithubRepo[];
	loading: boolean;
}) {
	if (!loading && repos.length === 0) return null;

	return (
		<div>
			<p className="activity-section-label" style={{ marginBottom: "0.75rem" }}>
				Top Repositories
			</p>
			{loading ? (
				<div className="repo-grid">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="skeleton-block"
							style={{ height: 112, borderRadius: 4 }}
						/>
					))}
				</div>
			) : (
				<motion.div
					className="repo-grid"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
					variants={{
						hidden: {},
						visible: { transition: { staggerChildren: 0.07 } },
					}}
				>
					{repos.map((repo) => (
						<RepoCard key={repo.id} repo={repo} />
					))}
				</motion.div>
			)}
		</div>
	);
}

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

function CopyEmailButton({ email }: { email: string }) {
	const [copied, setCopied] = useState(false);

	function handleCopy(e: React.MouseEvent) {
		e.preventDefault();
		navigator.clipboard.writeText(email).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}

	return (
		<button
			onClick={handleCopy}
			className="contact-copy-btn"
			aria-label="Copy email address"
			title={copied ? "Copied!" : "Copy email"}
		>
			{copied ? <Check size={13} /> : <Copy size={13} />}
		</button>
	);
}

const contactItems = [
	{
		icon: <Mail size={16} />,
		label: "Email",
		display: contactLinks.email,
		href: `mailto:${contactLinks.email}`,
		external: false,
		copyValue: contactLinks.email,
	},
	{
		icon: <Linkedin size={16} />,
		label: "LinkedIn",
		display: "linkedin.com/in/mathewsfranco",
		href: contactLinks.linkedin,
		external: true,
		copyValue: undefined,
	},
	{
		icon: <Github size={16} />,
		label: "GitHub",
		display: "github.com/mathewsfranco",
		href: contactLinks.github,
		external: true,
		copyValue: undefined,
	},
	{
		icon: <Phone size={16} />,
		label: "Phone",
		display: contactLinks.phoneDisplay,
		href: contactLinks.phoneHref,
		external: false,
		copyValue: undefined,
	},
];

export function ContactSection() {
	const [emailItem, ...otherItems] = contactItems;

	return (
		<div>
			<div className="contact-links-list">
				{/* Email row: div so copy button and mailto link are independent */}
				<motion.div
					className="contact-link-row"
					initial={{ opacity: 0, x: -24 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
				>
					<span className="contact-link-label">
						{emailItem.icon}
						{emailItem.label}
					</span>
					<span className="contact-link-value">{emailItem.display}</span>
					<span className="contact-link-actions">
						<CopyEmailButton email={contactLinks.email} />
						<a
							href={emailItem.href}
							className="contact-link-arrow"
							aria-label="Open email client"
						>
							<ArrowUpRight size={22} />
						</a>
					</span>
				</motion.div>

				{otherItems.map((item, i) => (
					<motion.a
						key={item.label}
						href={item.href}
						target={item.external ? "_blank" : undefined}
						rel={item.external ? "noopener noreferrer" : undefined}
						className="contact-link-row"
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: (i + 1) * 0.09,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						<span className="contact-link-label">
							{item.icon}
							{item.label}
						</span>
						<span className="contact-link-value">{item.display}</span>
						<span className="contact-link-arrow">
							<ArrowUpRight size={22} />
						</span>
					</motion.a>
				))}
			</div>
		</div>
	);
}
