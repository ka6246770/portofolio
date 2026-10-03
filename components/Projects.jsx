'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projects from '../data/projects'
import ProjectCard from './ProjectCard'

// Unique, ordered list of categories from all projects.
const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Asymmetric column spans per index → full-width editorial grid.
const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-12']

// ============================================================
// PROJECTS
// Full page: filter tabs + detailed case-study cards.
// Home preview (`limit` set): even three-up grid, compact cards,
// no filters — the "view all" button carries the visitor onward.
// ============================================================
export default function Projects({ limit, showFilters = true, detailed = true, heading, viewAll }) {
  const source = limit ? projects.slice(0, limit) : projects
  const [filter, setFilter] = useState('All')

  const filtered =
    showFilters && filter !== 'All'
      ? source.filter((p) => p.category === filter)
      : source

  return (
    <section
      id="work"
      aria-label="Projects"
      className="w-full border-t border-surface-light bg-surface/40"
    >
      <div className="w-full px-6 py-24 sm:px-8 lg:px-16">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">// things I have shipped</p>
            <h2 className="text-display font-display text-text">
              {heading || 'Selected work'}
            </h2>
          </motion.div>

          {/* Text / underline filter tabs (full page) or the view-all link */}
          {showFilters ? (
            <motion.div
              className="flex flex-wrap items-center gap-x-8 gap-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                  className={`group relative py-1 font-mono text-sm transition-colors ${
                    filter === cat ? 'text-accent' : 'text-muted hover:text-text'
                  }`}
                >
                  <span className="text-accent">{cat === 'All' ? '' : '// '}</span>
                  {cat}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${
                      filter === cat ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              ))}
            </motion.div>
          ) : (
            viewAll
          )}
        </div>

        {limit ? (
          /* Preview: simple even grid */
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid w-full grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="grid w-full min-w-0">
                <ProjectCard project={project} detailed={detailed} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Full page: asymmetric editorial grid */
          <motion.div
            key={filter}
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid w-full grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12"
          >
            {filtered.length > 0 ? (
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    layout
                    className={`grid w-full min-w-0 md:col-span-12 ${spans[i % spans.length]}`}
                  >
                    <ProjectCard project={project} detailed={detailed} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted"
              >
                No projects in this category yet — the two live builds are both
                web apps. Try <span className="text-accent">All</span>.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
