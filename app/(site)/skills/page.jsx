import PageHeader from '../../../components/PageHeader'
import Skills from '../../../components/Skills'
import Tools from '../../../components/Tools'
import CTABand from '../../../components/CTABand'
import { SITE_URL } from '../../../data/site'

export const metadata = {
  title: 'Skills — The stack I work in',
  description:
    'JavaScript and TypeScript, HTML and CSS, responsive design, accessibility, performance budgets, Next.js, React, Tailwind CSS, and Framer Motion — with how each one is actually used.',
  alternates: { canonical: '/skills' },
  openGraph: {
    url: `${SITE_URL}/skills`,
    title: 'Skills — Khaled Waleed',
    description:
      'A deliberately small stack: React, Next.js, TypeScript, Tailwind CSS, and Framer Motion — plus what I am going deeper on right now.',
  },
}

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        path="/skills"
        title="What I"
        accent="work with"
        lead="Two buckets, stated honestly: the fundamentals underneath every interface, and the toolkit I open each day. No invented proficiency bars — just how often and on what."
        meta={[
          { label: 'core languages', value: 'JS · TS · HTML · CSS' },
          { label: 'framework', value: 'React & Next.js' },
          { label: 'also fluent in', value: '12 supporting tools' },
        ]}
      />

      <Skills />
      <Tools />

      <CTABand
        label="// stack fit"
        title="Working with"
        accent="this stack?"
        text="If your team already lives in React and Tailwind, we will not need an onboarding period. Tell me what the codebase looks like and I will tell you where I would start."
        primary={{ label: 'contact me', href: '/contact' }}
        secondary={{ label: 'how I work', href: '/about' }}
      />
    </>
  )
}
