import { useState } from 'react'
import { motion } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'
import projects from '../data/projects'
import ProjectCard from './ProjectCard'

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Build a unique, ordered list of tech categories from all projects.
const categories = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tech)))]

// Grid rendering the project cards, scaled + staggered into view.
// Supports filtering by tech category.
export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.tech.includes(filter))

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      {/* Section heading */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="mb-3 flex items-center gap-2 font-mono text-sm text-accent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <FolderGit2 size={15} /> 04 · Selected work
        </motion.p>
        <motion.h2
          className="text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Projects I'm <span className="text-accent">proud of</span>
        </motion.h2>
        <motion.p
          className="mt-3 max-w-xl text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A selection of work built with care — from redesigns with before/after
          comparisons to fully featured products.
        </motion.p>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        className="mb-8 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-accent text-background'
                : 'border border-surface-light bg-surface text-muted hover:border-accent/40 hover:text-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        key={filter}
        className="grid gap-8 md:grid-cols-2"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.length > 0 ? (
          filtered.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))
        ) : (
          <motion.p
            className="col-span-full text-center text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects match this technology yet.
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
