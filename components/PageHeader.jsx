'use client'

import { motion } from 'framer-motion'

// ============================================================
// PAGE HEADER
// The dedicated hero for every routed page. Same language as the
// Home hero (mono path, oversized display title, one accent phrase)
// but scaled to a page rather than a full fold.
//
//   ~/services                          <- mono route path, the site's "//" voice
//   Services                            <- display h1 (accent tail)
//   lead paragraph                      <- what this page is for
//                       [meta rail]     <- 2–4 key/value facts, right aligned
//   ───────────────────────────────────  <- accent hairline drawn left → right
// ============================================================
export default function PageHeader({ path, title, accent, lead, meta = [] }) {
  return (
    <header className="relative w-full overflow-hidden border-b border-surface-light">
      <div className="w-full px-6 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-16 lg:pb-20 lg:pt-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="min-w-0 max-w-3xl">
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span aria-hidden="true">~</span>
              {path}
            </motion.p>

            <motion.h1
              className="text-display font-display text-text"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            >
              {title}
              {accent && <span className="text-accent"> {accent}</span>}
            </motion.h1>

            {lead && (
              <motion.p
                className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {lead}
              </motion.p>
            )}
          </div>

          {/* Meta rail — real facts about the page, not decoration */}
          {meta.length > 0 && (
            <motion.dl
              className="flex shrink-0 flex-wrap gap-x-10 gap-y-5 lg:flex-col lg:items-end lg:gap-0 lg:text-right"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
            >
              {meta.map((item, i) => (
                <div
                  key={item.label}
                  className={`min-w-0 lg:w-full lg:border-surface-light ${
                    i === 0 ? '' : 'lg:border-t'
                  } lg:py-3`}
                >
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl leading-tight text-text lg:text-2xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </div>

      {/* The one accent gesture on this header: a hairline that draws itself. */}
      <motion.div
        className="page-rule"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
      />
    </header>
  )
}
