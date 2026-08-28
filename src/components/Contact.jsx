import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowUpRight, Loader2, Send, CheckCircle2 } from 'lucide-react'
import site from '../data/site'

const initialForm = { name: '', email: '', message: '' }

const socialLinks = [
  { label: 'GitHub', href: site.social.github },
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'Twitter', href: site.social.twitter },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((er) => ({ ...er, [e.target.name]: undefined }))
    }
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('loading')
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const isJson = (res.headers.get('content-type') || '').includes('application/json')
      const data = isJson ? await res.json().catch(() => ({})) : {}
      if (!res.ok || !data.success) {
        if (data.errors) setErrors(data.errors)
        throw new Error(data.message || 'Failed to send message. Please try again later.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setSubmitError(err.message)
    }
  }

  const resetForm = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitError('')
    setStatus('idle')
  }

  return (
    <section id="contact" className="w-full border-t border-surface-light">
      <motion.div
        className="w-full px-6 py-24 sm:px-8 lg:px-16"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Full-width CTA band */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">05 · contact</p>
            <h2 className="font-display text-6xl leading-[0.95] text-text sm:text-7xl lg:text-8xl">
              Let&apos;s work
              <span className="text-accent"> together</span>
            </h2>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="group flex items-center gap-2 self-start border border-accent px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background md:self-auto"
          >
            <Mail size={16} />
            {site.email}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid w-full gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Social links / info */}
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
              Elsewhere
            </p>
            <div className="flex flex-col">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-t border-surface-light py-4 text-lg font-medium text-text transition-colors hover:text-accent"
                >
                  <span>{s.label}</span>
                  <ArrowUpRight size={17} className="text-muted transition-colors group-hover:text-accent" />
                </a>
              ))}
            </div>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-muted">
              Have a role to fill or an idea to build? My inbox is always open —
              I&apos;ll get back to you as soon as I can.
            </p>
          </div>

          {/* Form */}
          <div className="border border-surface-light bg-surface p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center gap-4 py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 size={56} className="text-accent" />
                  </motion.div>
                  <h3 className="font-display text-3xl text-text">Message sent</h3>
                  <p className="text-muted">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
                  <motion.button
                    onClick={resetForm}
                    className="font-mono text-sm text-accent underline-offset-4 hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="field">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder=" "
                        value={form.name}
                        onChange={onChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      <label htmlFor="name">Your name</label>
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>
                    <div className="field">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=" "
                        value={form.email}
                        onChange={onChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      <label htmlFor="email">Your email</label>
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      placeholder=" "
                      value={form.message}
                      onChange={onChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className="resize-none"
                    />
                    <label htmlFor="message">Your message</label>
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex items-center justify-center gap-2 border border-accent px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background disabled:opacity-60"
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> send message
                      </>
                    )}
                  </motion.button>

                  {status === 'error' && (
                    <motion.p
                      role="alert"
                      className="text-center text-sm text-red-400"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {submitError}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
