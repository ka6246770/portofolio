import { motion } from 'framer-motion'
import { Wrench } from 'lucide-react'
import skills from '../data/skills'

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

// Icon grid of skills. Items stagger into view one-by-one via
// whileInView + staggerChildren, and pulse/rotate subtly on hover.
export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
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
          <Wrench size={15} /> 03 · Skills
        </motion.p>
        <motion.h2
          className="text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technologies I work with{' '}
          <span className="text-accent">every day</span>
        </motion.h2>
      </motion.div>

      {/* Skill cards */}
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-surface-light bg-surface p-6 text-center transition-colors hover:border-accent/40"
            >
              <motion.div
                className="rounded-xl bg-accent/10 p-4 text-accent"
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.6 },
                }}
              >
                <Icon size={28} />
              </motion.div>
              <span className="text-sm font-medium text-text">{skill.name}</span>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
