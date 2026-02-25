import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { lazy, Suspense } from "react";
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
import {
	ContactSection,
	GithubActivitySection,
} from "@/features/portfolio/blocks";
import {
	aboutContent,
	contactLinks,
	expertiseDomains,
	heroContent,
	techStack,
	testimonialItems,
} from "@/lib/portfolio-content";

const PortfolioShaderBackground = lazy(() =>
	import("@/features/portfolio/shader-background").then((m) => ({
		default: m.PortfolioShaderBackground,
	})),
);

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const fade = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			delay: i * 0.12,
			ease: easeOutExpo as unknown as [number, number, number, number],
		},
	}),
};

function SectionHeader({
	index,
	kicker,
	title,
}: {
	index: string;
	kicker: string;
	title: string;
}) {
	return (
		<motion.div
			className="section-header"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
		>
			<span className="section-index">{index}</span>
			<p className="section-kicker">{kicker}</p>
			<h2 className="section-title">{title}</h2>
		</motion.div>
	);
}

function HeroSection() {
	const nameWords = heroContent.headline.split(" ");
	return (
		<section className="hero shell">
			<motion.p
				className="hero-kicker"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
			>
				Product & Frontend Developer — Gothenburg
			</motion.p>
			<h1 className="hero-headline" aria-label={heroContent.headline}>
				{nameWords.map((word, i) => (
					<motion.span
						key={word}
						className="hero-headline-word"
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.9,
							delay: 0.45 + i * 0.12,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						{word}
					</motion.span>
				))}
			</h1>
			{(() => {
				const phraseWords = [
					{ text: "I", accent: false },
					{ text: "build", accent: false },
					{ text: "interfaces", accent: false },
					{ text: "that", accent: false },
					{ text: "feel", accent: true },
					{ text: "as", accent: true },
					{ text: "good", accent: true },
					{ text: "as", accent: true },
					{ text: "they", accent: true },
					{ text: "look.", accent: true },
				];
				return (
					<p className="hero-sub" aria-label={heroContent.sub}>
						{phraseWords.map((word, i) => (
							<motion.span
								key={i}
								className={`hero-sub-word${word.accent ? " hero-sub-word--accent" : ""}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.55,
									delay: 0.85 + i * 0.07,
									ease: [0.16, 1, 0.3, 1],
								}}
							>
								{word.text}
							</motion.span>
						))}
						<motion.span
							className="hero-sub-line"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 0.55, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
						/>
					</p>
				);
			})()}
		</section>
	);
}

function AboutSection() {
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

function ExpertiseSection() {
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
								ease: [0.16, 1, 0.3, 1],
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
		transition: {
			duration: 0.4,
			ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
		},
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

function ExperienceSection() {
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

function TestimonialsSection() {
	return (
		<section id="testimonials" className="section">
			<div className="shell">
				<SectionHeader
					index="04"
					kicker="What people say"
					title="Voices from the work"
				/>
				<div className="testimonials-grid">
					{testimonialItems.map((item, i) => (
						<motion.article
							key={item.name}
							className="card testimonial-card"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.6,
								delay: i * 0.1,
								ease: [0.16, 1, 0.3, 1],
							}}
						>
							<span className="testimonial-quote-mark" aria-hidden="true">
								"
							</span>
							<p className="testimonial-body">{item.quote}</p>
							<footer className="testimonial-footer">
								<span className="testimonial-name">{item.name}</span>
								<span className="testimonial-role">{item.role}</span>
								<span className="testimonial-meta">
									{item.relationship} · {item.date}
								</span>
							</footer>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}

function ActivitySection() {
	return (
		<section id="activity" className="section">
			<div className="shell">
				<SectionHeader
					index="05"
					kicker="Open Source"
					title="Recent activity"
				/>
				<GithubActivitySection />
			</div>
		</section>
	);
}

function ContactSectionWrapper() {
	return (
		<section id="contact" className="section">
			<div className="shell">
				<SectionHeader
					index="06"
					kicker="Contact"
					title="Let's build something together"
				/>
				<ContactSection />
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer className="footer">
			<div className="shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<p>2025 Mathews Franco. Built with TypeScript & good taste.</p>
				<div className="flex items-center gap-5">
					<a
						href={contactLinks.github}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<Github size={16} />
					</a>
					<a
						href={contactLinks.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<Linkedin size={16} />
					</a>
					<a href={`mailto:${contactLinks.email}`}>{contactLinks.email}</a>
				</div>
			</div>
		</footer>
	);
}

export function PortfolioPage() {
	return (
		<div className="min-h-screen" style={{ background: "var(--c-bg)" }}>
			<Suspense fallback={null}>
				<PortfolioShaderBackground />
			</Suspense>
			<div className="page-content">
				<main>
					<HeroSection />
					<AboutSection />
					<ExpertiseSection />
					<ExperienceSection />
					<TestimonialsSection />
					<ActivitySection />
					<ContactSectionWrapper />
				</main>
				<Footer />
			</div>
		</div>
	);
}
