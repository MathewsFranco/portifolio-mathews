import { motion } from "framer-motion";
import { easeOutExpo } from "@/features/portfolio/animations";
import { SectionHeader } from "@/features/portfolio/components/section-header";
import { expertiseDomains } from "@/lib/portfolio-content";

export function ExpertiseSection() {
	return (
		<section id="expertise" className="section">
			<div className="shell">
				<SectionHeader
					index="02"
					kicker="Expertise"
					title="What I bring to the table"
				/>
				<div style={{ borderTop: "1px solid var(--c-border)" }}>
					{expertiseDomains.map((domain, i) => (
						<motion.article
							key={domain.title}
							className="expertise-strip"
							style={{ borderBottom: "1px solid var(--c-border)" }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.6,
								delay: i * 0.1,
								ease: easeOutExpo,
							}}
						>
							<div className="flex items-start gap-6 sm:gap-10">
								<span className="expertise-ghost-index">0{i + 1}</span>
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between">
										<h3
											style={{
												fontFamily: "var(--font-display)",
												fontWeight: 300,
												fontStyle: "italic",
												fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
												fontVariationSettings: '"opsz" 72',
												letterSpacing: "-0.025em",
												lineHeight: 1.15,
											}}
										>
											{domain.title}
										</h3>
										<span className="expertise-arrow">→</span>
									</div>
									<div className="expertise-content-reveal">
										<div className="expertise-content-inner">
											<p
												className="mt-5 text-base leading-relaxed"
												style={{ color: "var(--c-muted)", maxWidth: "54ch" }}
											>
												{domain.description}
											</p>
											<div className="mt-4 mb-2 flex flex-wrap gap-4">
												{domain.tools.map((tool) => (
													<span
														key={tool}
														style={{
															fontSize: "0.68rem",
															fontWeight: 600,
															letterSpacing: "0.16em",
															textTransform: "uppercase",
															color: "var(--c-accent-light)",
														}}
													>
														{tool}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
