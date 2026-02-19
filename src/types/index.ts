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
