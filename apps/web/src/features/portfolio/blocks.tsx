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
import { useGithubData } from "@/hooks/useGithubData";
import { aboutContent, contactLinks } from "@/lib/portfolio-content";

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

	const stats = [
		{ label: "Repos", value: data.stats.publicRepos },
		{ label: "Commits", value: data.stats.recentCommits },
		{ label: "PRs", value: data.stats.pullRequests },
		{ label: "Stars", value: data.stats.totalStars },
	];

	return (
		<div className="space-y-5">
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				{stats.map((stat, i) => (
					<motion.div
						key={stat.label}
						className="card p-5 text-center"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: i * 0.08,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						<p className="stat-number text-3xl">{loading ? "—" : stat.value}</p>
						<p className="stat-label mt-1">{stat.label}</p>
					</motion.div>
				))}
			</div>

			<div className="grid gap-3 lg:grid-cols-2">
				<motion.div
					className="card p-6"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
				>
					<h4
						className="mb-4 font-semibold text-sm uppercase tracking-widest"
						style={{ color: "var(--c-muted)", letterSpacing: "0.14em" }}
					>
						Recent Commits
					</h4>
					<div>
						{data.recentCommits.map((commit) => (
							<div
								key={`${commit.sha}-${commit.createdAt}`}
								className="activity-row"
							>
								<span
									className="rounded px-1.5 py-0.5 font-mono text-xs"
									style={{
										background: "var(--c-surface)",
										color: "var(--c-muted)",
									}}
								>
									{commit.sha}
								</span>
								<span className="truncate text-sm">{commit.message}</span>
								<span
									className="whitespace-nowrap text-xs"
									style={{ color: "var(--c-muted)" }}
								>
									{formatDistanceToNow(new Date(commit.createdAt), {
										addSuffix: true,
									})}
								</span>
							</div>
						))}
						{data.recentCommits.length === 0 && !loading && (
							<p
								className="py-4 text-center text-sm"
								style={{ color: "var(--c-muted)" }}
							>
								No recent commits
							</p>
						)}
					</div>
				</motion.div>

				<motion.div
					className="card p-6"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.6,
						delay: 0.08,
						ease: [0.16, 1, 0.3, 1],
					}}
				>
					<h4
						className="mb-4 font-semibold text-sm uppercase tracking-widest"
						style={{ color: "var(--c-muted)", letterSpacing: "0.14em" }}
					>
						Pull Requests
					</h4>
					<div>
						{data.recentPrs.map((pr) => (
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
													? "var(--c-accent-pale)"
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
						{data.recentPrs.length === 0 && !loading && (
							<p
								className="py-4 text-center text-sm"
								style={{ color: "var(--c-muted)" }}
							>
								No recent pull requests
							</p>
						)}
					</div>
				</motion.div>
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
			<motion.p
				className="contact-closing"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
			>
				{aboutContent.closing}
			</motion.p>

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
