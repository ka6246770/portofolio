// ============================================================
// SKILLS DATA
// Rendered as an icon grid in the Skills section.
// Icons are lucide-react components (imported lazily at top level).
// ============================================================

import {
  Atom,
  Braces,
  FileCode2,
  Layers,
  GitBranch,
  Wand2,
  Palette,
  Zap,
} from 'lucide-react'

// TODO: Replace/augment with the real skill set if needed.
const skills = [
  { name: 'React', icon: Atom },
  { name: 'JavaScript', icon: Braces },
  { name: 'HTML / CSS', icon: FileCode2 },
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'Git & GitHub', icon: GitBranch },
  { name: 'TypeScript', icon: Layers },
  { name: 'UI Engineering', icon: Wand2 },
  { name: 'Performance', icon: Zap },
]

export default skills
