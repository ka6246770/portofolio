import PageHeader from '../../../components/PageHeader'
import About from '../../../components/About'
import Experience from '../../../components/Experience'
import Process from '../../../components/Process'
import Standards from '../../../components/Standards'
import CTABand from '../../../components/CTABand'
import { SITE_URL } from '../../../data/site'

export const metadata = {
  title: 'About — How I work',
  description:
    'Khaled Waleed on how he works: three years of building web products end to end, a five-step process from kickoff to shipped, and the five quality standards he refuses to negotiate.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: `${SITE_URL}/about`,
    title: 'About — Khaled Waleed',
    description:
      'Who I am, where I have worked, how a project runs, and the standards I hold every build to.',
  },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        path="/about"
        title="The person behind"
        accent="the pixels"
        lead="Three years of shipping web products from database to interface, a process that does not change with project size, and a short list of rules I would rather break than quietly drop."
        meta={[
          { label: 'experience', value: '3+ years' },
          { label: 'based in', value: 'Egypt · remote' },
          { label: 'open to', value: 'Freelance & full-time' },
        ]}
      />

      <About />
      <Experience />
      <Process />
      <Standards />

      <CTABand
        label="// after the process"
        title="Sound like your"
        accent="kind of team?"
        text="The fastest way to find out is a short message: what you are building, what is in the way, and when you need it done."
        primary={{ label: 'contact me', href: '/contact' }}
        secondary={{ label: 'see the work', href: '/projects' }}
      />
    </>
  )
}
