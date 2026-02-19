import { Skill } from '../types'

export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'language', iconName: 'SiTypescript' },
  { name: 'JavaScript', category: 'language', iconName: 'SiJavascript' },
  { name: 'Python', category: 'language', iconName: 'SiPython' },
  { name: 'Go', category: 'language', iconName: 'SiGo' },
  { name: 'Rust', category: 'language', iconName: 'SiRust' },
  { name: 'SQL', category: 'language', iconName: 'SiPostgresql' },

  // Frameworks & Libraries
  { name: 'React', category: 'framework', iconName: 'SiReact' },
  { name: 'Next.js', category: 'framework', iconName: 'SiNextdotjs' },
  { name: 'Node.js', category: 'framework', iconName: 'SiNodedotjs' },
  { name: 'FastAPI', category: 'framework', iconName: 'SiFastapi' },
  { name: 'Tailwind CSS', category: 'framework', iconName: 'SiTailwindcss' },
  { name: 'Express', category: 'framework', iconName: 'SiExpress' },

  // Tools
  { name: 'Git', category: 'tool', iconName: 'SiGit' },
  { name: 'Docker', category: 'tool', iconName: 'SiDocker' },
  { name: 'PostgreSQL', category: 'tool', iconName: 'SiPostgresql' },
  { name: 'Redis', category: 'tool', iconName: 'SiRedis' },
  { name: 'Vite', category: 'tool', iconName: 'SiVite' },
  { name: 'GitHub Actions', category: 'tool', iconName: 'SiGithubactions' },

  // Cloud
  { name: 'AWS', category: 'cloud', iconName: 'SiAmazonwebservices' },
  { name: 'Vercel', category: 'cloud', iconName: 'SiVercel' },
  { name: 'Cloudflare', category: 'cloud', iconName: 'SiCloudflare' },
]

export const skillCategories = [
  { key: 'language', label: 'Languages' },
  { key: 'framework', label: 'Frameworks & Libraries' },
  { key: 'tool', label: 'Tools & Databases' },
  { key: 'cloud', label: 'Cloud & DevOps' },
] as const
