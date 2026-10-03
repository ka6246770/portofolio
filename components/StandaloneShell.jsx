'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'
import BackToTop from './BackToTop'

// ============================================================
// STANDALONE SHELL
// app/not-found.jsx and app/error.jsx live *outside* the (site)
// route group, so they do not inherit its layout. This renders the
// same chrome around them so the site never looks broken.
// ============================================================
export default function StandaloneShell({ children }) {
  return (
    <div className="relative min-h-screen bg-background text-text">
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}
