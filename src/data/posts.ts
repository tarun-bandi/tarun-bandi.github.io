import { BlogPost } from '../types'

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Building a Dark Minimal Portfolio with React + Tailwind',
    summary: 'A walkthrough of the design decisions and technical choices behind this portfolio — from the color system to Framer Motion animations.',
    date: '2024-12-01',
    readTime: 6,
    tags: ['React', 'Tailwind CSS', 'Design'],
    slug: 'dark-minimal-portfolio-react-tailwind',
  },
  {
    id: '2',
    title: 'TypeScript Patterns I Reach for Every Project',
    summary: 'A curated set of TypeScript patterns — discriminated unions, branded types, and satisfies — that consistently improve code quality.',
    date: '2024-11-15',
    readTime: 8,
    tags: ['TypeScript', 'Patterns'],
    slug: 'typescript-patterns',
  },
  {
    id: '3',
    title: 'Deploying Static Sites to GitHub Pages with GitHub Actions',
    summary: 'A step-by-step guide to setting up a modern CI/CD pipeline for Vite apps using GitHub Actions and the official deploy-pages action.',
    date: '2024-10-28',
    readTime: 5,
    tags: ['DevOps', 'GitHub Actions', 'Vite'],
    slug: 'github-pages-github-actions',
  },
  {
    id: '4',
    title: 'Why I Prefer Tailwind CSS for Side Projects',
    summary: 'An honest take on Tailwind CSS — what makes it fast for solo developers, the trade-offs, and when a different approach makes more sense.',
    date: '2024-09-10',
    readTime: 7,
    tags: ['CSS', 'Tailwind CSS', 'Opinion'],
    slug: 'why-tailwind-css',
  },
]
