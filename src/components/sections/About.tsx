import { FiMapPin, FiCode, FiBookOpen } from 'react-icons/fi'
import { AnimatedSection } from '../ui/AnimatedSection'

const stats = [
  { label: 'Years Coding', value: '5+' },
  { label: 'Projects Shipped', value: '20+' },
  { label: 'Open Source PRs', value: '50+' },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-text-primary mb-2">About</h2>
          <div className="w-12 h-0.5 bg-accent mb-12" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I&apos;m a software engineer with a passion for building products that are both
                technically sound and genuinely useful. I enjoy working across the full stack —
                designing systems, writing clean TypeScript, and crafting interfaces that feel right.
              </p>
              <p>
                My background spans web development, backend services, and a bit of machine learning.
                I value simplicity, performance, and developer experience. I&apos;m always looking
                for ways to write less code that does more.
              </p>
              <p>
                Outside of work, I read about programming language theory, contribute to open-source,
                and occasionally write about the things I learn.
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <span className="flex items-center gap-2 text-sm">
                  <FiMapPin size={14} className="text-accent shrink-0" />
                  Based in the United States
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <FiCode size={14} className="text-accent shrink-0" />
                  Full-stack &amp; systems engineering
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <FiBookOpen size={14} className="text-accent shrink-0" />
                  Open to interesting opportunities
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface-2 border border-border rounded-xl p-6 text-center md:text-left"
                >
                  <div className="text-3xl font-bold text-accent font-mono">{stat.value}</div>
                  <div className="text-text-secondary text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
