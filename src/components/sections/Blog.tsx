import { AnimatedSection } from '../ui/AnimatedSection'
import { BlogCard } from '../ui/BlogCard'
import { posts } from '../../data/posts'

export function Blog() {
  return (
    <section id="blog" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Writing</h2>
          <div className="w-12 h-0.5 bg-accent mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="border border-border rounded-xl bg-surface divide-y divide-border overflow-hidden">
            {posts.map((post) => (
              <div key={post.id} className="px-6">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
