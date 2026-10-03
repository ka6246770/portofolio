'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight, Check, Atom, Wind, Zap, Code, Rocket, Sparkles } from 'lucide-react'

const techIcons = {
  React: Atom,
  Tailwind: Wind,
  Vite: Zap,
  CSS: Code,
  'Next.js': Rocket,
  'Framer Motion': Sparkles,
}

// ============================================================
// PROJECT CARD
// `detailed` adds the case-study paragraph, the concrete highlights,
// and a meta line — used on the /projects page. The Home preview
// renders the compact version of the same card.
// ============================================================
export default function ProjectCard({ project, detailed = false }) {
  return (
    <motion.article id={String(project.id)} className="group w-full min-w-0 scroll-mt-28">
      {/* Full-bleed real screenshot — image touches the card's width edges */}
      <div className="relative w-full overflow-hidden bg-surface">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            sizes={detailed ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            priority={false}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
          {/* Category tag */}
          <span className="absolute left-4 top-4 border border-accent px-3 py-1 font-mono text-xs text-accent backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex w-full flex-col gap-5 border-t border-surface-light pt-6 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="max-w-xl min-w-0">
          <p className="mb-1 font-mono text-xs text-accent">{project.blurb}</p>
          <h3 className="font-display text-3xl leading-tight text-text transition-colors group-hover:text-accent sm:text-4xl">
            {detailed ? (
              project.title
            ) : (
              <Link href={`/projects#${project.id}`} className="focus-visible:outline-none">
                {project.title}
              </Link>
            )}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>

          {detailed && project.detail && (
            <p className="mt-4 text-base leading-relaxed text-soft">{project.detail}</p>
          )}

          {detailed && project.highlights && (
            <ul className="mt-5 flex flex-col gap-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span className="min-w-0">{h}</span>
                </li>
              ))}
            </ul>
          )}

          {detailed && (project.year || project.role) && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-surface-light pt-4 font-mono text-xs text-muted">
              {project.year && (
                <div className="flex items-center gap-2">
                  <dt className="uppercase tracking-widest">year</dt>
                  <dd className="text-soft">{project.year}</dd>
                </div>
              )}
              {project.role && (
                <div className="flex items-center gap-2">
                  <dt className="uppercase tracking-widest">role</dt>
                  <dd className="text-soft">{project.role}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-start gap-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => {
              const Icon = techIcons[t]
              return (
                <span
                  key={t}
                  className="flex items-center gap-1.5 border border-surface-light px-3 py-1 font-mono text-xs text-muted"
                >
                  {Icon && <Icon size={13} className="shrink-0 text-accent" />}
                  {t}
                </span>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 border border-accent px-5 py-2 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={15} /> visit
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 border border-surface-light px-5 py-2 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              code <ArrowUpRight size={15} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
