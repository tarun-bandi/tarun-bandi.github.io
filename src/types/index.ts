export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  year: number
  demoType?: 'shell' | 'tcp'
}

export interface BlogPost {
  id: string
  title: string
  summary: string
  date: string
  readTime: number
  tags: string[]
  slug: string
  url?: string
  hasContent?: boolean
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'tool' | 'cloud'
  iconName?: string
}

export interface NavLink {
  label: string
  to: string
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  period: string
  bullets: string[]
  tags: string[]
}
