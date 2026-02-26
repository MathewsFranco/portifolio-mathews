import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/features/portfolio/animations";
import type { GithubCommit } from "@/lib/github.types";

export function CommitsPanel({
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
			transition={{ duration: 0.6, ease: easeOutExpo }}
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
