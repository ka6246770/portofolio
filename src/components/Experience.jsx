import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import experience from '../data/experience'

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.2, ease: 'easeOut' },
  }),
}

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      {/* Section heading */}
      <motion.div
        className="mb-16"
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
          <Briefcase size={15} /> 02 · Experience
        </motion.p>
        <motion.h2
          className="text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          My <span className="text-accent">journey</span>
        </motion.h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          className="absolute left-4 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent via-accent-dark to-transparent md:left-1/2 md:-translate-x-px"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        />

        <div className="flex flex-col gap-12">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`relative flex flex-col gap-4 pl-12 md:w-[calc(50%-2rem)] ${
                i % 2 === 0 ? 'md:mr-auto md:pr-12 md:pl-0' : 'md:ml-auto md:pl-12 md:pr-0'
              }`}
            >
              {/* Dot on the timeline */}
              <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-accent bg-background md:left-auto">
                <div className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent`} />
              </div>

              <div className="rounded-2xl border border-surface-light bg-surface p-6 transition-colors hover:border-accent/30">
                <div className="mb-1 flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold text-text">{item.role}</h3>
                  <span className="rounded-full bg-accent/10 px-3 py-0.5 font-mono text-xs text-accent">
                    {item.period}
                  </span>
                </div>
                <p className="mb-3 text-sm font-medium text-accent">{item.company}</p>
                <p className="mb-4 text-sm leading-relaxed text-muted">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-light px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
