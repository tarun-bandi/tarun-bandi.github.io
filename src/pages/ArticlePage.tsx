import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiClock } from 'react-icons/fi'
import { posts } from '../data/posts'
import { TCPDeepDiveContent } from '../content/TCPDeepDiveContent'

const contentMap: Record<string, React.ComponentType> = {
  'tcp-deep-dive': TCPDeepDiveContent,
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)
  const Content = slug ? contentMap[slug] : undefined

  if (!post || !Content) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary text-sm">Article not found.</p>
        <Link
          to="/"
          className="text-accent text-sm hover:underline flex items-center gap-1"
        >
          <FiArrowLeft size={14} /> Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-border backdrop-blur-md bg-background/80">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <FiArrowLeft size={15} />
            Writing
          </Link>
        </div>
      </div>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <h1 className="text-3xl font-bold text-text-primary leading-tight">{post.title}</h1>
          <p className="text-text-secondary leading-relaxed">{post.summary}</p>
          <div className="flex items-center gap-4 flex-wrap text-xs text-text-secondary">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <FiClock size={11} />
              {post.readTime} min read
            </span>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-12 h-0.5 bg-accent" />
        </div>

        {/* Body */}
        <Content />
      </main>
    </div>
  )
}
