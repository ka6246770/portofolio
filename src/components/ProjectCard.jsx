import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, GitFork, ArrowUpRight } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'
import { useDesktop } from '../hooks/useMediaQuery'

// Reusable project card. Subtle 3D tilt toward the mouse on hover
// (rotateX/rotateY via springs — transform-only, 60fps safe), a shadow
// lift, tech tags, a live link and a GitHub link. Optionally embeds a
// BeforeAfterSlider when the project has redesign imagery.
export default function ProjectCard({ project }) {
  const ref = useRef(null)
  const isDesktop = useDesktop()

  // Motion values for the 3D tilt effect.
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 })

  const onMouseMove = (e) => {
    if (!isDesktop) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const onMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.article
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-surface-light bg-surface"
      style={{ rotateX: isDesktop ? rotateX : 0, rotateY: isDesktop ? rotateY : 0, transformStyle: 'preserve-3d', perspective: 1200 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -8, boxShadow: '0 24px 50px -12px rgba(0,0,0,0.6)' }}
    >
      {/* Media: before/after slider if present, else a showcase block */}
      {project.beforeAfter ? (
        <BeforeAfterSlider
          before={project.beforeAfter.before}
          after={project.beforeAfter.after}
          alt={`${project.title} redesign comparison`}
        />
      ) : project.screenshot ? (
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-surface-light to-background">
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 30%, rgb(45 212 191 / 0.14), transparent 60%), radial-gradient(circle at 70% 70%, rgb(30 58 138 / 0.18), transparent 60%)',
              backgroundSize: '200% 200%',
            }}
          />
          <motion.span
            className="relative font-mono text-6xl font-bold text-accent/40"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {project.title.charAt(0)}
          </motion.span>
          <span className="absolute right-3 bottom-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/70 backdrop-blur">
            screenshot coming soon
          </span>
        </div>
      )}

      {/* Body */}
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-text transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
            className="text-accent"
          >
            <ArrowUpRight size={20} />
          </motion.span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted">{project.description}</p>

        {/* Tech tags — stagger in on scroll */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <motion.a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-accent-bright"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={15} /> Live
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-text/25 px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <GitFork size={15} /> Code
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}
