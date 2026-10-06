import PageHeader from '../../../components/PageHeader'
import Projects from '../../../components/Projects'
import CTABand from '../../../components/CTABand'
import { SITE_URL } from '../../../data/site'

export const metadata = {
  title: 'Projects — Selected work',
  description:
    'Real-estate platform, bilingual Arabic/English portfolio, and this site — case notes on what each build actually involved, with live links and source.',
  alternates: { canonical: '/projects' },
  openGraph: {
    url: `${SITE_URL}/projects`,
    title: 'Projects — Khaled Waleed',
    description:
      'Selected full stack and frontend work: Prestige Realty, La2ta reels portfolio, and this portfolio — each built with React and shipped live.',
  },
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        path="/projects"
        title="Things I"
        accent="have shipped"
        lead="Three builds that went out the door, each with the decisions behind it. Filter by platform, or open the live site and click around — that tells you more than any screenshot."
        meta={[
          { label: 'live projects', value: '3 shipped' },
          { label: 'platforms', value: 'Web · RTL + LTR' },
          { label: 'deployed on', value: 'Vercel' },
        ]}
      />

      <Projects />

      <CTABand
        label="// want one of these"
        title="Your project"
        accent="is next"
        text="Every build above started as a short message describing a problem. If you have one — a redesign, a slow page, an idea with no code yet — start the same way."
        primary={{ label: 'contact me', href: '/contact' }}
        secondary={{ label: 'browse services', href: '/services' }}
      />
    </>
  )
}
