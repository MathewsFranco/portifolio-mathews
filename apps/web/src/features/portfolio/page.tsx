import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { lazy, Suspense } from "react";
import {
  ContactSection,
  GithubActivitySection,
} from "@/features/portfolio/blocks";
import {
  aboutContent,
  contactLinks,
  experienceItems,
  expertiseDomains,
  heroContent,
  projectItems,
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
      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {heroContent.sub}
      </motion.p>
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
            className="blockquote-accent"
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
        <div className="grid gap-4 md:grid-cols-2">
          {expertiseDomains.map((domain, i) => (
            <motion.article
              key={domain.title}
              className="card-glass p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3
                className="mb-3 font-semibold text-lg"
                style={{
                  fontFamily: "var(--font-display)",
                  fontVariationSettings: '"opsz" 32',
                  letterSpacing: "-0.02em",
                }}
              >
                {domain.title}
              </h3>
              <p
                className="mb-4 text-sm leading-relaxed"
                style={{ color: "var(--c-muted)" }}
              >
                {domain.description}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--c-muted)", letterSpacing: "0.02em" }}
              >
                {domain.tools.join(" / ")}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeader index="03" kicker="Experience" title="Where I've been" />
        <div className="timeline">
          {experienceItems.map((item, i) => (
            <motion.article
              key={`${item.company}-${item.period}`}
              className="timeline-entry"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="timeline-node" />
              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <h3
                  className="font-semibold text-xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontVariationSettings: '"opsz" 48',
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.company}
                </h3>
                <span className="chip">{item.period}</span>
              </div>
              <p className="mb-4 text-sm" style={{ color: "var(--c-muted)" }}>
                {item.role} — {item.location}
              </p>
              <ul className="mb-5 space-y-2.5 text-sm leading-relaxed">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="pl-4"
                    style={{
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--c-accent)",
                      }}
                    >
                      -
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <p
                className="text-xs"
                style={{ color: "var(--c-muted)", letterSpacing: "0.01em" }}
              >
                {item.tech.join(" / ")}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionHeader index="04" kicker="Projects" title="Selected work" />
        <div className="grid gap-5 md:grid-cols-3">
          {projectItems.map((project, i) => (
            <motion.article
              key={project.name}
              className="card overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="project-thumb"
                style={{ background: project.gradient }}
              >
                {project.initials}
              </div>
              <div className="p-6">
                <h3
                  className="mb-3 font-semibold text-base"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontVariationSettings: '"opsz" 32',
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.name}
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "var(--c-muted)" }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
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
          <ProjectsSection />
          <ActivitySection />
          <ContactSectionWrapper />
        </main>
        <Footer />
      </div>
    </div>
  );
}
