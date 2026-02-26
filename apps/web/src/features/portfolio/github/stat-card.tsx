import { motion } from "framer-motion";
import { easeOutExpo } from "@/features/portfolio/animations";
import { useCountUp } from "@/hooks/useGithubData";

export function StatCard({
	label,
	value,
	loading,
	delay,
}: {
	label: string;
	value: number;
	loading: boolean;
	delay: number;
}) {
	const count = useCountUp(loading ? 0 : value);
	return (
		<motion.div
			className="card p-5 text-center"
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay, ease: easeOutExpo }}
		>
			<p className="stat-number text-3xl">{loading ? "—" : count}</p>
			<p className="stat-label mt-1">{label}</p>
		</motion.div>
	);
}
