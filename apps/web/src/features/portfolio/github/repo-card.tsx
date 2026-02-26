import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/features/portfolio/animations";
import type { GithubRepo } from "@/lib/github.types";

export function RepoCard({ repo }: { repo: GithubRepo }) {
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
					transition: { duration: 0.5, ease: easeOutExpo },
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
