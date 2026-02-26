import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { easeOutExpo } from "@/features/portfolio/animations";
import type { GithubPr } from "@/lib/github.types";

const PR_STATE_COLOR: Record<GithubPr["state"], string> = {
	merged: "var(--c-pr-merged)",
	open: "var(--c-accent)",
	closed: "var(--c-muted)",
};

export function PRsPanel({
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
			transition={{ duration: 0.6, delay: 0.08, ease: easeOutExpo }}
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
								style={{ background: PR_STATE_COLOR[pr.state] }}
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
