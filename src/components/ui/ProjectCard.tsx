import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, borderColor: 'rgba(99, 102, 241, 0.6)' }}
      transition={{ duration: 0.2 }}
      className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4 group"
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-text-primary font-semibold text-lg leading-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 shrink-0 mt-0.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label={`GitHub: ${project.title}`}
            >
              <FiGithub size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label={`Live site: ${project.title}`}
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-1 rounded-full bg-surface-2 text-text-secondary border border-border"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
