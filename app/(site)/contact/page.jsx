import PageHeader from '../../../components/PageHeader'
import Contact from '../../../components/Contact'
import FAQ from '../../../components/FAQ'
import site, { SITE_URL } from '../../../data/site'

export const metadata = {
  title: 'Contact — Start a project',
  description:
    'Contact Khaled Waleed, a freelance frontend developer. Send a project brief by the form, email ka6246770@gmail.com directly, or reach out on GitHub and LinkedIn. Replies usually within a day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: `${SITE_URL}/contact`,
    title: 'Contact — Khaled Waleed',
    description:
      'Have a role to fill or an interface to build? The inbox is open — replies usually within a day.',
  },
}

// FAQPage structured data, emitted only here because this is the only
// route that renders the visible FAQ. Keeping it beside the markup it
// describes is what lets it qualify for rich results.
const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: site.faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

// This page owns the form, so the closing CTA would just point back at
// itself — the header + FAQ carry the page instead.
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />

      <PageHeader
        path="/contact"
        title="Let's work"
        accent="together"
        lead="The form below posts straight to my inbox through a server route — no third-party service in between. Prefer plain email? It is one click away, too."
        meta={[
          { label: 'reply time', value: 'Within a day' },
          { label: 'available for', value: 'Freelance · full-time' },
          { label: 'based in', value: 'Egypt (GMT+2)' },
        ]}
      />

      <Contact />
      <FAQ />
    </>
  )
}
