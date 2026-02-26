import { motion } from "framer-motion";
import {
	ArrowUpRight,
	Github,
	Linkedin,
	Mail,
	Phone,
} from "lucide-react";
import { easeOutExpo } from "@/features/portfolio/animations";
import { contactLinks } from "@/lib/portfolio-content";
import { CopyEmailButton } from "./copy-email-button";

const contactItems = [
	{
		icon: <Mail size={16} />,
		label: "Email",
		display: contactLinks.email,
		href: `mailto:${contactLinks.email}`,
		external: false,
		copyValue: contactLinks.email,
	},
	{
		icon: <Linkedin size={16} />,
		label: "LinkedIn",
		display: "linkedin.com/in/mathewsfranco",
		href: contactLinks.linkedin,
		external: true,
		copyValue: undefined,
	},
	{
		icon: <Github size={16} />,
		label: "GitHub",
		display: "github.com/mathewsfranco",
		href: contactLinks.github,
		external: true,
		copyValue: undefined,
	},
	{
		icon: <Phone size={16} />,
		label: "Phone",
		display: contactLinks.phoneDisplay,
		href: contactLinks.phoneHref,
		external: false,
		copyValue: undefined,
	},
];

export function ContactSection() {
	const [emailItem, ...otherItems] = contactItems;

	return (
		<div>
			<div className="contact-links-list">
				<motion.div
					className="contact-link-row"
					initial={{ opacity: 0, x: -24 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: easeOutExpo }}
				>
					<span className="contact-link-label">
						{emailItem.icon}
						{emailItem.label}
					</span>
					<span className="contact-link-value">{emailItem.display}</span>
					<span className="contact-link-actions">
						<CopyEmailButton email={contactLinks.email} />
						<a
							href={emailItem.href}
							className="contact-link-arrow"
							aria-label="Open email client"
						>
							<ArrowUpRight size={22} />
						</a>
					</span>
				</motion.div>

				{otherItems.map((item, i) => (
					<motion.a
						key={item.label}
						href={item.href}
						target={item.external ? "_blank" : undefined}
						rel={item.external ? "noopener noreferrer" : undefined}
						className="contact-link-row"
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: (i + 1) * 0.09,
							ease: easeOutExpo,
						}}
					>
						<span className="contact-link-label">
							{item.icon}
							{item.label}
						</span>
						<span className="contact-link-value">{item.display}</span>
						<span className="contact-link-arrow">
							<ArrowUpRight size={22} />
						</span>
					</motion.a>
				))}
			</div>
		</div>
	);
}
