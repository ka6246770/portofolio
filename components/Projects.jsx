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

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" className="w-full bg-surface/40 px-6 py-24 sm:px-8 lg:px-16">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">08 · work</p>
          <h2 className="text-display font-display text-text">Selected work</h2>
        </motion.div>

        {/* Text / underline filter tabs */}
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
      </div>

      {/* Full-width asymmetric grid */}
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
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}