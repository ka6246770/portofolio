import PageHeader from '../../../components/PageHeader'
import Services from '../../../components/Services'
import ServiceBreakdown from '../../../components/ServiceBreakdown'
import Engagements from '../../../components/Engagements'
import CTABand from '../../../components/CTABand'
import { SITE_URL } from '../../../data/site'

export const metadata = {
  title: 'Services — Six ways I add value',
  description:
    'Full stack web development, REST APIs, PostgreSQL database design, authentication, frontend UI, and deployment — six scoped services from Khaled Waleed, with what each one includes and how they can be bought.',
  alternates: { canonical: '/services' },
  openGraph: {
    url: `${SITE_URL}/services`,
    title: `Services — Khaled Waleed`,
    description:
      'Six scoped services: full stack builds, APIs, databases, authentication, frontend UI, and deployment.',
  },
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        path="/services"
        title="Stuff I can"
        accent="build for you"
        lead="Six concrete ways I add value to a product — each one a narrow scope I can own from first commit to production, and four shapes you can buy them in."
        meta={[
          { label: 'services', value: '6 scoped offers' },
          { label: 'starting point', value: '3–5 day audit' },
          { label: 'handover', value: 'Docs + 2 weeks support' },
        ]}
      />

      <Services />
      <ServiceBreakdown />
      <Engagements />

      <CTABand
        label="// pick one or describe your own"
        title="Scope it with me"
        accent="first"
        text="Send what you have — a live URL, a screenshot, or three sentences about the problem. I will reply with what I would actually do and roughly how long it takes."
        primary={{ label: 'contact me', href: '/contact' }}
        secondary={{ label: 'see the work', href: '/projects' }}
      />
    </>
  )
}
