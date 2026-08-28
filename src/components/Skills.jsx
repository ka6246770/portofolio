import { motion } from 'framer-motion'
import skills from '../data/skills'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Skills() {
  return (
    <section id="skills" className="w-full px-6 py-24 sm:px-8 lg:px-16">
      <div className="mb-16">
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          03 · skills
        </motion.p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.h2
            className="font-display text-6xl leading-[0.95] text-text sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            What I work with
          </motion.h2>
          <motion.p
            className="max-w-sm text-lg leading-relaxed text-muted md:pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            A tight, deliberately chosen stack — two clear buckets: the
            fundamentals and the toolkit I reach for every day.
          </motion.p>
        </div>
      </div>

      {/* Two categories — full-width split */}
      <div className="grid w-full border-t border-surface-light md:grid-cols-2">
        {skills.map((cat) => (
          <motion.article
            key={cat.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="group flex flex-col py-10 md:py-14 md:px-8 first:md:pr-12 last:md:border-l last:md:border-surface-light"
          >
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-soft">
                {cat.title}
              </h3>
              <span className="font-mono text-xs text-accent">
                {cat.id === 'foundation' ? '01' : '02'}
              </span>
            </div>
            <p className="mb-8 max-w-md text-muted">{cat.tagline}</p>
            <ul className="flex flex-col">
              {cat.items.map((item, i) => (
                <motion.li
                  key={item.name}
                  className="flex items-center gap-3 border-t border-surface-light py-3 text-text"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                >
                  <span className="font-mono text-xs text-accent">→</span>
                  <span className="text-lg font-medium">{item.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
