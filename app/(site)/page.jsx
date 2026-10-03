import Hero from '../../components/Hero'
import Stats from '../../components/Stats'
import Services from '../../components/Services'
import Skills from '../../components/Skills'
import Projects from '../../components/Projects'
import ViewAllLink from '../../components/ViewAllLink'
import CTABand from '../../components/CTABand'
import { SITE_URL } from '../../data/site'

export const metadata = {
  // `absolute` skips the root layout's "%s | Khaled Waleed" template,
  // which would otherwise print the name twice on the home page.
  title: {
    absolute: 'Khaled Waleed — Frontend Developer & Next.js Specialist',
  },
  description:
    'Portfolio of Khaled Waleed, a frontend developer building fast, accessible, animated interfaces with React, Next.js, TypeScript, Tailwind CSS, and Framer Motion.',
  alternates: { canonical: '/' },
  openGraph: {
    url: `${SITE_URL}/`,
    title: 'Khaled Waleed — Frontend Developer & Next.js Specialist',
  },
}

// ============================================================
// HOME — deliberately short. It introduces, previews a slice of
// each section with a "view all" route button, and stops.
// ============================================================
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />

      <Services
        limit={3}
        viewAll={<ViewAllLink href="/services">view all services</ViewAllLink>}
      />

      <Skills
        limit={3}
        viewAll={<ViewAllLink href="/skills">view all skills</ViewAllLink>}
      />

      <Projects
        limit={3}
        showFilters={false}
        detailed={false}
        heading="Featured work"
        viewAll={<ViewAllLink href="/projects">view all projects</ViewAllLink>}
      />

      <CTABand
        label="// ready when you are"
        title="Tell me what you"
        accent="need built"
      />
    </>
  )
}
