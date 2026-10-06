import './globals.css'
import { MotionConfig } from 'framer-motion'
import site from '../data/site'
import skills from '../data/skills'

// Canonical URL — override with NEXT_PUBLIC_SITE_URL at build/run time.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/+$/, '')

const description =
  'Khaled Waleed is a full stack developer building complete web products with React, Next.js, Node.js, Express, and PostgreSQL — interface, API, and database. Available for freelance work.'

// Person + WebSite ship on every page — they describe the site owner and
// the site itself. FAQPage is deliberately NOT here: the visible FAQ only
// renders on /contact, and structured data must match visible content.
// It is emitted by app/(site)/contact/page.jsx instead.
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: SITE_URL,
    jobTitle: 'Full Stack Developer',
    description: site.intro,
    email: `mailto:${site.email}`,
    telephone: `+20${site.phone}`,
    sameAs: [site.social.github, site.social.linkedin, site.social.twitter],
    knowsAbout: skills.flatMap((cat) => cat.items.map((item) => item.name)),
    subjectOf: [
      {
        '@type': 'WebSite',
        name: `${site.name} — Portfolio`,
        url: SITE_URL,
        description,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} — Portfolio`,
    url: SITE_URL,
    description,
    inLanguage: 'en',
  },
]

// Fonts are preconnected + loaded from Google Fonts (Caacupe One is a
// rare display face not present in next/font's bundle, so it stays a
// stylesheet link like the rest of the stack).
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Khaled Waleed — Full Stack Developer (Next.js, Node.js & PostgreSQL)',
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    'Khaled Waleed',
    'full stack developer',
    'frontend developer',
    'backend developer',
    'Node.js developer',
    'Express',
    'PostgreSQL',
    'Next.js developer',
    'React developer',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'web developer portfolio',
    'freelance full stack developer',
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${site.name} — Portfolio`,
    title: 'Khaled Waleed — Full Stack Developer (Next.js, Node.js & PostgreSQL)',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khaled Waleed — Full Stack Developer (Next.js, Node.js & PostgreSQL)',
    description,
    creator: site.social.twitter.replace('https://twitter.com/', '@'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caacupe+One&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {structuredData.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  )
}