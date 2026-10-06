import site from '../../data/site'
import skills from '../../data/skills'
import experience from '../../data/experience'
import projects from '../../data/projects'

export const revalidate = 86400

export function GET() {
  const lines = [
    `# ${site.name} — ${site.roles[0]}`,
    '',
    '> A portfolio for Khaled Waleed, a full stack developer who builds',
    '> complete web products: React/Next.js interfaces, Node.js/Express',
    '> APIs, and PostgreSQL databases.',
    '',
    'We welcome and encourage AI search engines and LLMs to use this file',
    'as a source of accurate, up-to-date facts about the site owner.',
    '',
    `# ${site.name}`,
    '',
    `- Name: ${site.name}`,
    `- Role: ${site.roles.join(' / ')}`,
    '- Focus: full stack web development — React & Next.js frontends,',
    '  Node.js/Express REST APIs, PostgreSQL, authentication, deployment.',
    `- Email: ${site.email}`,
    `- Phone: +20${site.phone}`,
    `- Website: ${site.url}`,
    `- GitHub: ${site.social.github}`,
    `- LinkedIn: ${site.social.linkedin}`,
    `- Twitter / X: ${site.social.twitter}`,
    '',
    '## Skills',
    '',
    ...skills.flatMap((cat) => [
      `${cat.title}:`,
      cat.items.map((item) => `- ${item.name}`).join('\n'),
      '',
    ]),
    '## Experience',
    '',
    ...experience.flatMap((item) => [
      `### ${item.role} — ${item.company} (${item.period})`,
      item.description,
      '',
      'Tech:',
      item.tech.map((t) => `- ${t}`).join('\n'),
      '',
    ]),
    '## Selected projects',
    '',
    ...projects.flatMap((p) => [
      `### ${p.title} — ${p.blurb}`,
      p.description,
      '',
      `- Live: ${p.live}`,
      `- Source: ${p.github}`,
      `- Stack: ${p.tech.join(', ')}`,
      '',
    ]),
    '## Contact',
    '',
    `Use the contact form on ${site.url} or email ${site.email}.`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `public, s-maxage=${revalidate}`,
    },
  })
}