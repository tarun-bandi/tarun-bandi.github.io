import { motion } from 'framer-motion'
import { FiArrowRight, FiClock } from 'react-icons/fi'
import { BlogPost } from '../../types'

interface BlogCardProps {
  post: BlogPost
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="group border-b border-border py-6 last:border-b-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary font-semibold text-base mb-2 group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-3">
            {post.summary}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-text-secondary text-xs">{formatDate(post.date)}</span>
            <span className="flex items-center gap-1 text-text-secondary text-xs">
              <FiClock size={12} />
              {post.readTime} min read
            </span>
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <FiArrowRight
          size={18}
          className="text-text-secondary group-hover:text-accent transition-colors shrink-0 mt-1"
        />
      </div>
    </motion.article>
  )
}
