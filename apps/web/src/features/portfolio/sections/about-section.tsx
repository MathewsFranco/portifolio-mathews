import { motion } from "framer-motion";
import { fade } from "@/features/portfolio/animations";
import { SectionHeader } from "@/features/portfolio/components/section-header";
import { aboutContent } from "@/lib/portfolio-content";

export function AboutSection() {
	return (
		<section id="about" className="section">
			<div className="shell">
				<SectionHeader index="01" kicker="About" title="The story so far" />
				<div className="max-w-2xl space-y-14">
					<motion.p
						className="text-lg leading-relaxed"
						style={{ color: "var(--c-fg)" }}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fade}
						custom={0}
					>
						{aboutContent.intro}
					</motion.p>
					<motion.blockquote
						className="blockquote-accent py-2"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fade}
						custom={1}
					>
						{aboutContent.poker}
					</motion.blockquote>
					<motion.p
						className="leading-relaxed"
						style={{ color: "var(--c-muted)" }}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fade}
						custom={2}
					>
						{aboutContent.beyond}
					</motion.p>
				</div>
			</div>
		</section>
	);
}
