import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative min-h-screen bg-background text-text">
      <CustomCursor />

      {/* Branded intro loader — fades out once complete */}
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />

      <motion.main
        // Delay content entrance until after the loader closes.
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>

      <Footer />
      <BackToTop />
    </div>
  )
}
