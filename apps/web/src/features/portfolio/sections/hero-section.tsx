import { motion } from "framer-motion";
import { easeOutExpo } from "@/features/portfolio/animations";
import { heroContent } from "@/lib/portfolio-content";

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

export function HeroSection() {
	const nameWords = heroContent.headline.split(" ");
	return (
		<section className="hero shell">
			<motion.p
				className="hero-kicker"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
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
							ease: easeOutExpo,
						}}
					>
						{word}
					</motion.span>
				))}
			</h1>
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
							ease: easeOutExpo,
						}}
					>
						{word.text}
					</motion.span>
				))}
				<motion.span
					className="hero-sub-line"
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.55, delay: 1.6, ease: easeOutExpo }}
				/>
			</p>
		</section>
	);
}
