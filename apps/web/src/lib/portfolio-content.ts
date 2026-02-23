export interface ExperienceItem {
	role: string;
	company: string;
	location: string;
	period: string;
	bullets: string[];
	tech: string[];
}

export interface ProjectItem {
	name: string;
	description: string;
	tech: string[];
	initials: string;
	github: string;
	demo: string;
	gradient: string;
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

// TODO: replace placeholder data with real project data
export const projectItems: ProjectItem[] = [
	{
		name: "Component Library",
		description:
			"A documented, accessible React component library with Storybook. 10+ components, light/dark theming, and design token integration.",
		tech: ["React", "TypeScript", "Storybook"],
		initials: "CL",
		github: "https://github.com/mathewsfranco",
		demo: "https://github.com/mathewsfranco",
		gradient: "linear-gradient(135deg, #1a3c2a, #2f7d52)",
	},
	{
		name: "Analytics Dashboard",
		description:
			"Data visualization dashboard for workflow monitoring. React + Recharts with live-updating mock data and responsive chart layouts.",
		tech: ["React", "TypeScript", "Recharts"],
		initials: "AD",
		github: "https://github.com/mathewsfranco",
		demo: "https://github.com/mathewsfranco",
		gradient: "linear-gradient(135deg, #2f7d52, #4caf6e)",
	},
	{
		name: "Brew Log",
		description:
			"Personal coffee brew tracker — recipe storage, tasting notes, and extraction analytics. Because good coffee deserves good data.",
		tech: ["React", "Next.js", "Supabase"],
		initials: "BL",
		github: "https://github.com/mathewsfranco",
		demo: "https://github.com/mathewsfranco",
		gradient: "linear-gradient(135deg, #1a3c2a, #4caf6e)",
	},
];

export const contactLinks = {
	email: "mathewsandre.franco@gmail.com",
	linkedin: "https://linkedin.com/in/mathewsfranco",
	github: "https://github.com/mathewsfranco",
	phoneDisplay: "+46 072 869 29 67",
	phoneHref: "tel:+46728692967",
};
