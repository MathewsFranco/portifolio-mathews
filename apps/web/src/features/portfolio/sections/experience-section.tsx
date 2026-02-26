import { motion } from "framer-motion";
import {
	siBun,
	siCss,
	siDocker,
	siFigma,
	siGit,
	siGraphql,
	siJest,
	siNextdotjs,
	siReact,
	siRedux,
	siStorybook,
	siStyledcomponents,
	siTestinglibrary,
	siTypescript,
	siVite,
} from "simple-icons";
import { easeOutExpo } from "@/features/portfolio/animations";
import { SectionHeader } from "@/features/portfolio/components/section-header";
import { techStack } from "@/lib/portfolio-content";

const SI_MAP: Record<string, { path: string }> = {
	react: siReact,
	typescript: siTypescript,
	css: siCss,
	nextdotjs: siNextdotjs,
	storybook: siStorybook,
	jest: siJest,
	figma: siFigma,
	styledcomponents: siStyledcomponents,
	redux: siRedux,
	graphql: siGraphql,
	testinglibrary: siTestinglibrary,
	docker: siDocker,
	vite: siVite,
	git: siGit,
	bun: siBun,
};

const COL_SPAN: Record<number, number> = { 5: 2, 4: 2, 3: 1, 2: 1 };
const ROW_SPAN: Record<number, number> = { 5: 2, 4: 1, 3: 1, 2: 1 };
const ICON_SIZE: Record<number, number> = { 5: 52, 4: 34, 3: 24, 2: 18 };

const gridVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

const cellVariants = {
	hidden: { opacity: 0, scale: 0.94 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4, ease: easeOutExpo },
	},
};

function TechSVGIcon({ path, size }: { path: string; size: number }) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="currentColor"
			aria-hidden="true"
			className="tech-cell-icon"
		>
			<path d={path} />
		</svg>
	);
}

function TechFallbackIcon({ name, size }: { name: string; size: number }) {
	const abbr = name.includes(" ")
		? name
				.split(" ")
				.map((w) => w[0])
				.join("")
				.slice(0, 3)
				.toUpperCase()
		: name.slice(0, 2).toUpperCase();
	return (
		<span
			className="tech-cell-icon tech-cell-abbr"
			style={{ width: size, height: size, fontSize: size * 0.38 }}
		>
			{abbr}
		</span>
	);
}

export function ExperienceSection() {
	return (
		<section id="experience" className="section">
			<div className="shell">
				<SectionHeader index="03" kicker="Stack" title="What I build with" />
				<motion.p
					className="tech-context"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					4+ years · 3 companies · production scale
				</motion.p>
				<motion.div
					className="tech-grid"
					variants={gridVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{techStack.map((item) => {
						const icon = item.iconSlug ? SI_MAP[item.iconSlug] : null;
						return (
							<motion.div
								key={item.name}
								className="tech-cell"
								data-weight={item.weight}
								variants={cellVariants}
								style={{
									gridColumn: `span ${COL_SPAN[item.weight]}`,
									gridRow: `span ${ROW_SPAN[item.weight]}`,
								}}
							>
								<span className="tech-cell-category">{item.category}</span>
								{icon ? (
									<TechSVGIcon path={icon.path} size={ICON_SIZE[item.weight]} />
								) : (
									<TechFallbackIcon
										name={item.name}
										size={ICON_SIZE[item.weight]}
									/>
								)}
								<span className="tech-cell-name">{item.name}</span>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
