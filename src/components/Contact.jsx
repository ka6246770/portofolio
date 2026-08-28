import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, GitFork, Contact as LinkedInIcon, Loader2, Send, CheckCircle2, Phone } from 'lucide-react'
import site from '../data/site'

const initialForm = { name: '', email: '', message: '' }

// Contact section: social links + a form with floating labels,
// focus animations, client-side validation, and a real submit that
// POSTs to the backend which emails the message. Slides in from the bottom.
export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [submitError, setSubmitError] = useState('')

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    // Clear a field's error as the user starts correcting it.
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
        // Surface any server-side validation errors per field.
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
    <section id="contact" className="relative overflow-hidden">
      {/* Wrap for the slide-from-bottom choreography */}
      <motion.div
        className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-12 text-center">
          <motion.p
            className="mb-3 flex items-center justify-center gap-2 font-mono text-sm text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Mail size={15} /> 05 · Contact
          </motion.p>
          <motion.h2
            className="text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's build something <span className="text-accent">great</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-lg text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind or just want to say hi? My inbox is always
            open — I'll get back to you as soon as I can.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* Contact info / links */}
          <motion.div
            className="flex flex-col justify-center gap-5"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* TODO: Replace with the real email/link targets */}
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 text-text transition-colors hover:text-accent"
            >
              <motion.span whileHover={{ scale: 1.15, rotate: 8 }} className="rounded-lg bg-surface p-3 text-accent">
                <Mail size={20} />
              </motion.span>
              <span className="transition-colors group-hover:text-accent">{site.email}</span>
            </a>
            <a
              href={`tel:${site.phone}`}
              className="group flex items-center gap-3 text-text transition-colors hover:text-accent"
            >
              <motion.span whileHover={{ scale: 1.15, rotate: 8 }} className="rounded-lg bg-surface p-3 text-accent">
                <Phone size={20} />
              </motion.span>
              <span className="transition-colors group-hover:text-accent">{site.phone}</span>
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-text transition-colors hover:text-accent"
            >
              <motion.span whileHover={{ scale: 1.15, rotate: 8 }} className="rounded-lg bg-surface p-3 text-accent">
                <GitFork size={20} />
              </motion.span>
              <span className="transition-colors group-hover:text-accent">GitHub</span>
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-text transition-colors hover:text-accent"
            >
              <motion.span whileHover={{ scale: 1.15, rotate: 8 }} className="rounded-lg bg-surface p-3 text-accent">
                <LinkedInIcon size={20} />
              </motion.span>
              <span className="transition-colors group-hover:text-accent">LinkedIn</span>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            className="rounded-2xl border border-surface-light bg-surface p-6 sm:p-8"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
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
                  <h3 className="text-xl font-bold">Message sent!</h3>
                  <p className="text-muted">Thanks for reaching out. I'll get back to you shortly.</p>
                  <motion.button
                    onClick={resetForm}
                    className="text-sm text-accent underline-offset-4 hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Send another message
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
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-background transition-colors hover:bg-accent-bright disabled:opacity-70"
                    whileHover={{ scale: status === 'loading' ? 1 : 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send message
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
