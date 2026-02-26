import { motion } from "framer-motion";
import { easeOutExpo } from "@/features/portfolio/animations";

export function SectionHeader({
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
			transition={{ duration: 0.7, ease: easeOutExpo }}
		>
			<span className="section-index">{index}</span>
			<p className="section-kicker">{kicker}</p>
			<h2 className="section-title">{title}</h2>
		</motion.div>
	);
}
