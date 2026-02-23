import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
	ArrowUpRight,
	ExternalLink,
	Github,
	Linkedin,
	Mail,
	Phone,
} from "lucide-react";
import { type FormEvent, useState } from "react";
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

export function ContactSection() {
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("submitting");
		setMessage("");

		const formData = new FormData(event.currentTarget);
		const email = String(formData.get("email") ?? "").trim();
		if (!/^\S+@\S+\.\S+$/.test(email)) {
			setStatus("error");
			setMessage("Please provide a valid email address.");
			return;
		}

		const endpoint =
			(import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "";

		// TODO: set VITE_FORM_ENDPOINT with your real form endpoint
		if (!endpoint) {
			setStatus("error");
			setMessage("Form endpoint is not configured yet. Use direct email.");
			return;
		}

		try {
			const response = await fetch(endpoint, {
				method: "POST",
				body: formData,
				headers: { Accept: "application/json" },
			});
			if (!response.ok) throw new Error("request failed");
			setStatus("success");
			event.currentTarget.reset();
		} catch {
			setStatus("error");
			setMessage("Could not send now. Please use direct email.");
		}
	}

	return (
		<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
			>
				<p
					className="mb-8 max-w-md leading-relaxed"
					style={{ color: "var(--c-muted)" }}
				>
					Whether you have a role in mind, a side project brewing, or just want
					to talk frontend over coffee — I'm always up for a good conversation.
				</p>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<input
							name="name"
							required
							className="input"
							placeholder="Your name"
						/>
						<input
							name="email"
							type="email"
							required
							className="input"
							placeholder="Email"
						/>
					</div>
					<textarea
						name="message"
						required
						className="input min-h-36 resize-y"
						placeholder="What's on your mind?"
					/>
					<button
						type="submit"
						disabled={status === "submitting"}
						className="btn-primary"
					>
						{status === "submitting" ? "Sending..." : "Send message"}
					</button>
					{status === "success" && (
						<p className="text-sm" style={{ color: "var(--c-accent)" }}>
							Message sent — I'll be in touch soon.
						</p>
					)}
					{status === "error" && (
						<p className="text-sm" style={{ color: "#e07070" }}>
							{message}
						</p>
					)}
				</form>
			</motion.div>

			<motion.div
				className="flex flex-col justify-between"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{
					duration: 0.7,
					delay: 0.1,
					ease: [0.16, 1, 0.3, 1],
				}}
			>
				<div className="space-y-2">
					<a href={`mailto:${contactLinks.email}`} className="contact-row">
						<Mail size={16} />
						{contactLinks.email}
					</a>
					<a
						href={contactLinks.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="contact-row"
					>
						<Linkedin size={16} />
						linkedin.com/in/mathewsfranco
					</a>
					<a
						href={contactLinks.github}
						target="_blank"
						rel="noopener noreferrer"
						className="contact-row"
					>
						<Github size={16} />
						github.com/mathewsfranco
					</a>
					<a href={contactLinks.phoneHref} className="contact-row">
						<Phone size={16} />
						{contactLinks.phoneDisplay}
					</a>
				</div>
				<p
					className="mt-8 text-sm leading-relaxed"
					style={{
						fontFamily: "var(--font-display)",
						fontStyle: "italic",
						fontVariationSettings: '"opsz" 24',
						color: "var(--c-muted)",
					}}
				>
					{aboutContent.closing}
				</p>
			</motion.div>
		</div>
	);
}
