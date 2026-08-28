import { motion } from 'framer-motion'
import { CheckCircle2, User } from 'lucide-react'
import skills from '../data/skills'
import { useDesktop } from '../hooks/useMediaQuery'

// About section: bio fades in from the side, core skill pills
// stagger in beneath it, and a subtle image card is shown on desktop.
export default function About() {
  const isDesktop = useDesktop()

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        {/* Text block — fades/slides in from the left */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.p
            className="mb-3 flex items-center gap-2 font-mono text-sm text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <User size={15} /> 01 · About me
          </motion.p>

          <motion.h2
            className="text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Crafting interfaces that feel{' '}
            <span className="text-accent">effortless</span>
          </motion.h2>

          <motion.p
            className="mt-6 leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* TODO: Replace with the real bio text */}
            I'm a frontend developer who obsesses over the details that make a
            product feel alive — the micro-interactions, the motion, the
            accessibility, the performance. I turn complex problems into clean,
            intuitive interfaces using modern React and a design system mindset.
          </motion.p>
          <motion.p
            className="mt-4 leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I care about building interfaces that are as delightful to use as
            they are to build — shipping things that load fast, respond
            instantly, and behave predictably on every screen.
          </motion.p>
        </motion.div>

        {/* Skills panel — fades/slides in from the right */}
        <motion.div
          className="rounded-2xl border border-surface-light bg-surface p-6"
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="mb-4 px-2 text-sm font-semibold uppercase tracking-wider text-muted">
            Core toolkit
          </div>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, i) => {
              return (
                <motion.div
                  key={skill.name}
                  className="flex items-center gap-2.5 rounded-xl bg-surface-light px-3 py-2.5 text-sm text-text"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  whileHover={{ scale: 1.04, borderColor: 'var(--color-accent)' }}
                >
                  <CheckCircle2 size={16} className="shrink-0 text-accent" />
                  <span>{skill.name}</span>
                </motion.div>
              )
            })}
          </div>
          {!isDesktop && (
            <p className="mt-4 text-xs text-muted">
              * Tap to see technologies below ↓
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
