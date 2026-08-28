import { motion } from 'framer-motion'
import experience from '../data/experience'

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1, ease: 'easeOut' } },
}

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.15, ease: 'easeOut' },
  }),
}

export default function Experience() {
  return (
    <section id="experience" className="relative w-full border-t border-surface-light">
      {/* Heading */}
      <motion.div
        className="px-6 pt-24 sm:px-8 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow mb-4">02 · experience</p>
        <h2 className="font-display text-6xl leading-[0.95] text-text sm:text-7xl lg:text-8xl">
          The road so far
        </h2>
      </motion.div>

      {/* Full-height timeline — rail offset to the left, cards to the right */}
      <div className="relative mt-16 w-full">
        {/* Neon rail running the full section height */}
        <motion.div
          className="absolute bottom-0 top-0 left-6 w-[2px] origin-top bg-accent sm:left-8 lg:left-[calc(24rem+2px)]"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        />

        <div className="flex flex-col">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-full px-6 py-14 sm:px-8 lg:pl-[calc(24rem+3rem)] lg:pr-16"
            >
              {/* Node on the rail */}
              <div className="absolute left-6 top-14 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-background sm:left-8 lg:left-[calc(24rem+2px)]">
                <div className="h-3 w-3 rounded-full bg-accent" />
              </div>

              <div className="flex w-full flex-col gap-5 border-b border-surface-light pb-14 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                <div className="max-w-xl">
                  <div className="mb-2 flex flex-wrap items-center gap-4">
                    <h3 className="font-display text-3xl leading-tight text-text sm:text-4xl">
                      {item.role}
                    </h3>
                  </div>
                  <p className="mb-1 text-base font-semibold text-soft">{item.company}</p>
                  <p className="max-w-xl text-base leading-relaxed text-muted">{item.description}</p>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-6">
                  <span className="font-mono text-sm text-accent">{item.period}</span>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-surface-light px-3 py-1 font-mono text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
