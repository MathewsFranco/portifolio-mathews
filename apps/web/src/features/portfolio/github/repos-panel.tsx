import { motion } from "framer-motion";
import type { GithubRepo } from "@/lib/github.types";
import { RepoCard } from "./repo-card";

export function ReposPanel({
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
