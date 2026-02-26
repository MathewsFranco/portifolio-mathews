import { SectionHeader } from "@/features/portfolio/components/section-header";
import { ContactSection } from "@/features/portfolio/contact/contact-section";

export function ContactSectionWrapper() {
	return (
		<section id="contact" className="section">
			<div className="shell">
				<SectionHeader
					index="05"
					kicker="Contact"
					title="Let's build something together"
				/>
				<ContactSection />
			</div>
		</section>
	);
}
