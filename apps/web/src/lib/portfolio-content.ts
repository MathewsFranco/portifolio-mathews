export interface ExperienceItem {
	role: string;
	company: string;
	location: string;
	period: string;
	bullets: string[];
	tech: string[];
}

export interface TechItem {
	name: string;
	/** 5 = core daily driver, 4 = strong, 3 = solid, 2 = used */
	weight: 1 | 2 | 3 | 4 | 5;
	category: string;
	/** simple-icons slug — omit if no icon exists */
	iconSlug?: string;
}

export const techStack: TechItem[] = [
	// weight 5 → 2×2 featured cells
	{ name: "React", weight: 5, category: "Core", iconSlug: "react" },
	{ name: "TypeScript", weight: 5, category: "Core", iconSlug: "typescript" },
	// weight 4 → 2×1 wide cells
	{ name: "CSS", weight: 4, category: "Styling", iconSlug: "css" },
	{ name: "Next.js", weight: 4, category: "Framework", iconSlug: "nextdotjs" },
	{
		name: "Storybook",
		weight: 4,
		category: "Design Systems",
		iconSlug: "storybook",
	},
	{ name: "Playwright", weight: 4, category: "Testing" },
	{ name: "Jest", weight: 4, category: "Testing", iconSlug: "jest" },
	{ name: "Figma", weight: 4, category: "Design", iconSlug: "figma" },
	// weight 3 → 1×1 standard cells
	{
		name: "styled-components",
		weight: 3,
		category: "Styling",
		iconSlug: "styledcomponents",
	},
	{ name: "TanStack Router", weight: 3, category: "Framework" },
	{ name: "React Native", weight: 3, category: "Mobile" },
	{ name: "Jotai", weight: 3, category: "State" },
	{ name: "Redux", weight: 3, category: "State", iconSlug: "redux" },
	{ name: "GraphQL", weight: 3, category: "Data", iconSlug: "graphql" },
	{ name: "Emotion", weight: 3, category: "Styling" },
	{
		name: "React Testing Library",
		weight: 3,
		category: "Testing",
		iconSlug: "testinglibrary",
	},
	// weight 2 → 1×1 small cells
	{ name: "Docker", weight: 2, category: "Tooling", iconSlug: "docker" },
	{ name: "Vite", weight: 2, category: "Tooling", iconSlug: "vite" },
	{ name: "Git", weight: 2, category: "Tooling", iconSlug: "git" },
	{ name: "Bun", weight: 2, category: "Tooling", iconSlug: "bun" },
];

export interface TestimonialItem {
	name: string;
	role: string;
	relationship: string;
	date: string;
	quote: string;
}

export interface ExpertiseDomain {
	title: string;
	description: string;
	tools: string[];
}

export const heroContent = {
	headline: "Mathews Franco",
	sub: "I build interfaces that feel as good as they look.",
};

export const aboutContent = {
	intro:
		"I sit at the intersection of design sensibility and engineering precision. The products I build aren't just functional — they carry intention in every interaction, every transition, every pixel that responds to a user's touch. I believe the best interfaces disappear, leaving only the experience behind.",
	poker:
		"Before I wrote my first line of production code, I spent years at the poker table — reading patterns, calculating odds in real time, staying composed when the stakes were high. That analytical instinct didn't leave when I switched careers. It became the foundation of how I approach complex systems: methodically, calmly, always with the bigger picture in mind.",
	beyond:
		"Away from the screen, I'm chasing the perfect coffee extraction, sending bouldering routes, or deep into a strategy game that demands the kind of thinking no algorithm can replicate. I find patterns everywhere — in art, in movement, in the way a good espresso pulls.",
	closing: "Let's grab a coffee and see where the conversation goes.",
};

export const aboutStats = [
	{ value: 4, suffix: "+", label: "Years" },
	{ value: 3, suffix: "", label: "Companies" },
	{ value: 2, suffix: "", label: "Countries" },
	{ value: 1, suffix: "", label: "Design system" },
] as const;

export const expertiseDomains: ExpertiseDomain[] = [
	{
		title: "Frontend Architecture",
		description:
			"Building scalable React applications with type-safe routing, state management, and component composition that teams can reason about.",
		tools: ["React", "TypeScript", "Next.js", "TanStack Router"],
	},
	{
		title: "Design Systems",
		description:
			"Co-owning and evolving component libraries that bridge the gap between design intent and production reality. Tokens, variants, accessibility baked in.",
		tools: ["Storybook", "styled-components", "Figma", "CSS"],
	},
	{
		title: "Testing & Quality",
		description:
			"End-to-end confidence through layered testing strategies. From unit isolation to full user-flow coverage, quality is a habit, not a phase.",
		tools: ["Playwright", "Jest", "React Testing Library"],
	},
	{
		title: "Product Thinking",
		description:
			"Shipping isn't just about code — it's about understanding the problem. Discovery, design collaboration, and iterating with real user feedback.",
		tools: ["Agile", "Figma Dev Mode", "Notion", "Miro"],
	},
];

export const experienceItems: ExperienceItem[] = [
	{
		role: "Product Developer",
		company: "Kognic",
		location: "Gothenburg",
		period: "2023 — 2025",
		bullets: [
			"Shaped data annotation tools within a cross-functional team at the core of the ML data pipeline.",
			"Co-owned and evolved a shared component library across the engineering guild.",
			"Full product cycle involvement — from discovery workshops through to production release.",
		],
		tech: [
			"React",
			"Storybook",
			"Jotai",
			"Playwright",
			"Jest",
			"Docker",
			"Figma",
		],
	},
	{
		role: "Frontend Developer",
		company: "Hero Gaming",
		location: "Malmo",
		period: "2022",
		bullets: [
			"Performance-focused work on two live gaming products across crypto and Brazilian markets.",
			"Adapted product UX for regional user behavior and local market expectations.",
		],
		tech: ["React", "Redux", "Emotion", "GraphQL"],
	},
	{
		role: "Frontend Developer",
		company: "Razzo Tecnologia",
		location: "Gravatai",
		period: "2021 — 2022",
		bullets: [
			"Built web and mobile applications from scratch in a small, agile software house.",
			"Designed reusable component patterns that scaled across multiple client projects.",
		],
		tech: ["React", "Next.js", "React Native", "styled-components"],
	},
];

export const testimonialItems: TestimonialItem[] = [
	{
		name: "Jonatan Rugarn",
		role: "Engineering Manager",
		relationship: "Managed Mathews directly",
		date: "February 2025",
		quote:
			"Mathews has been an outstanding member of our team. He consistently delivered high-quality work, took initiative on complex problems, and brought a thoughtful engineering mindset to everything he worked on. His ability to collaborate across design and product made him an invaluable contributor to our shared component library and annotation tooling.",
	},
	{
		name: "Johan Yu",
		role: "Frontend Developer @ Kognic",
		relationship: "Worked on the same team",
		date: "March 2025",
		quote:
			"Working alongside Mathews was genuinely enjoyable. He has a rare combination of strong technical skills and design sensibility — he cares deeply about how things look and feel, not just whether they work. His contributions to the component library were thorough and well-considered, and he was always willing to dive into ambiguous problems without needing a detailed spec. I also appreciated how he gave constructive feedback in code reviews and pushed the team's quality bar higher.",
	},
	{
		name: "Filip Lindahl",
		role: "Software Engineer",
		relationship: "Worked on different teams",
		date: "March 2025",
		quote:
			"Mathews is one of those engineers who makes things around him better. Even working on different teams, his impact on shared tooling and the design system was clearly felt. Solid engineer, great to work with.",
	},
	{
		name: "Iaroslav Grishunin",
		role: "Senior Front End Developer",
		relationship: "Was Mathews' mentor",
		date: "October 2022",
		quote:
			"I had the pleasure of mentoring Mathews during his time at Hero Gaming, and it was clear from the start that he was someone who genuinely wanted to grow. He absorbed feedback quickly, asked the right questions, and applied what he learned with real intention. His curiosity and dedication to his craft made mentoring him a rewarding experience.",
	},
];

export const contactLinks = {
	email: "mathewsandre.franco@gmail.com",
	linkedin: "https://linkedin.com/in/mathewsfranco",
	github: "https://github.com/mathewsfranco",
	phoneDisplay: "+46 072 869 29 67",
	phoneHref: "tel:+46728692967",
};
