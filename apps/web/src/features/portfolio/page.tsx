import { lazy, Suspense } from "react";
import { AboutSection } from "@/features/portfolio/sections/about-section";
import { ContactSectionWrapper } from "@/features/portfolio/sections/contact-section-wrapper";
import { ExperienceSection } from "@/features/portfolio/sections/experience-section";
import { ExpertiseSection } from "@/features/portfolio/sections/expertise-section";
import { Footer } from "@/features/portfolio/sections/footer";
import { HeroSection } from "@/features/portfolio/sections/hero-section";
import { TestimonialsSection } from "@/features/portfolio/sections/testimonials-section";

const PortfolioShaderBackground = lazy(() =>
	import("@/features/portfolio/shader-background").then((m) => ({
		default: m.PortfolioShaderBackground,
	})),
);

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
					<ContactSectionWrapper />
				</main>
				<Footer />
			</div>
		</div>
	);
}
