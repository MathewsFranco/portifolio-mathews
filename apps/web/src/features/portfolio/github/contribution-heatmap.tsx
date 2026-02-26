import { motion } from "framer-motion";
import type { ContributionGraph } from "@/lib/github.types";

const CONTRIB_COLORS = [
	"var(--c-border)",
	"var(--c-accent-dim)",
	"var(--c-accent-mid)",
	"var(--c-accent)",
	"var(--c-accent-light)",
] as const;

export function ContributionHeatmap({
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
