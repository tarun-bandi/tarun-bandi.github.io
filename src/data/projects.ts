import { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio & Blog',
    description: 'This site — a dark minimal portfolio built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com/tarun-bandi/tarun-bandi.github.io',
    liveUrl: 'https://tarun-bandi.github.io',
    featured: true,
    year: 2024,
  },
  {
    id: 'project-2',
    title: 'Full-Stack Web App',
    description: 'A full-stack application with a RESTful API backend and a responsive React frontend, featuring authentication and real-time updates.',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/tarun-bandi',
    featured: true,
    year: 2024,
  },
  {
    id: 'project-3',
    title: 'Machine Learning Pipeline',
    description: 'An end-to-end ML pipeline for data ingestion, feature engineering, model training, and serving predictions via a REST API.',
    techStack: ['Python', 'FastAPI', 'scikit-learn', 'Docker', 'AWS'],
    githubUrl: 'https://github.com/tarun-bandi',
    featured: true,
    year: 2023,
  },
  {
    id: 'project-4',
    title: 'CLI Dev Tool',
    description: 'A command-line utility to automate repetitive development workflows, including scaffolding, linting, and deployment steps.',
    techStack: ['TypeScript', 'Node.js', 'Commander.js'],
    githubUrl: 'https://github.com/tarun-bandi',
    featured: false,
    year: 2023,
  },
]
