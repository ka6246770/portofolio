"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Wind,
  Zap,
  Sparkles,
  Server,
  FileCode2,
  Code,
  GitBranch,
  Triangle,
  Braces,
} from "lucide-react";
import experience from "../data/experience";
import { useReveal } from "../hooks/useReveal";

const techIcons = {
  React: Atom,
  "Tailwind CSS": Wind,
  Vite: Zap,
  "Framer Motion": Sparkles,
  "Node.js": Server,
  TypeScript: FileCode2,
  CSS: Code,
  Git: GitBranch,
  Vercel: Triangle,
  JavaScript: Braces,
  "HTML/CSS": Code,
  "Git & GitHub": GitBranch,
};

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 + i * 0.12, ease: "easeOut" },
  }),
};

function ExperienceRow({ item, i }) {
  const num = String(i + 1).padStart(2, "0");

  return (
    <motion.article
      custom={i}
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative grid gap-6 border-t border-surface-light px-6 py-10 last:border-b sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-14"
    >
      {/* Ghost numeral + mobile period */}
      <div className="flex items-start justify-between gap-4 lg:col-span-2 lg:block">
        <span className="num-ghost font-display text-5xl leading-none lg:text-7xl">
          {num}
        </span>
        <span className="font-mono text-sm text-accent lg:hidden">
          {item.period}
        </span>
      </div>

      {/* Role, company, description, tech */}
      <div className="min-w-0 lg:col-span-7">
        <h3 className="font-display text-2xl leading-tight text-text transition-colors duration-300 group-hover:text-accent lg:text-3xl">
          {item.role}
        </h3>
        <p className="mt-2 font-mono text-sm text-soft">
          <span className="text-accent">@</span> {item.company}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {item.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tech.map((t) => {
            const Icon = techIcons[t];
            return (
              <span
                key={t}
                className="flex items-center gap-1.5 border border-surface-light px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-soft"
              >
                {Icon && <Icon size={13} className="shrink-0 text-accent" />}
                {t}
              </span>
            );
          })}
        </div>
      </div>

      {/* Desktop period */}
      <div className="hidden lg:col-span-3 lg:block lg:text-right">
        <span className="font-mono text-sm text-accent">{item.period}</span>
      </div>

      {/* Accent underline sweeping across the row on hover */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

export default function Experience() {
  const [headingRef, headingIn] = useReveal();

  return (
    <section id="experience" className="w-full border-t border-surface-light">
      {/* Heading */}
      <motion.div
        ref={headingRef}
        className="px-6 pt-24 sm:px-8 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={headingIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow mb-4">02 · experience</p>
        <h2 className="text-display font-display text-text">The road so far</h2>
      </motion.div>

      {/* Numbered résumé rows */}
      <div className="mt-16 w-full">
        {experience.map((item, i) => (
          <ExperienceRow key={item.id} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
