import { motion } from "framer-motion";
import { easeOutExpo } from "@/features/portfolio/animations";
import { SectionHeader } from "@/features/portfolio/components/section-header";
import { testimonialItems } from "@/lib/portfolio-content";

export function TestimonialsSection() {
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
								ease: easeOutExpo,
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
