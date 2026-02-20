import { FiMapPin, FiCode, FiBookOpen } from 'react-icons/fi'
import { AnimatedSection } from '../ui/AnimatedSection'

const stats = [
  { label: 'GPA at CMU', value: '3.9' },
  { label: 'Internships', value: '2' },
  { label: 'Graduating', value: "'26" },
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
                I&apos;m a CS student at Carnegie Mellon graduating in May 2026. I work across
                systems, ML, and the web — I&apos;ve written compilers, reimplemented TCP, trained
                RL agents, and interned at Meta and Citi.
              </p>
              <p>
                At Meta I built LLM evaluation tooling for the Llama fine-tuning platform,
                including an audio data quality tool that cut load times from 30 seconds to under
                one second. At Citi I built a Java microservice for stress-testing a credit card
                payment system, deployed via CI/CD on OpenShift.
              </p>
              <p>
                I care about correctness, performance, and simplicity. I TA Theoretical CS at CMU
                and occasionally take on hard problems for fun.
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <span className="flex items-center gap-2 text-sm">
                  <FiMapPin size={14} className="text-accent shrink-0" />
                  Pittsburgh, PA — Carnegie Mellon University
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <FiCode size={14} className="text-accent shrink-0" />
                  Systems, ML, and full-stack engineering
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <FiBookOpen size={14} className="text-accent shrink-0" />
                  tbandi@andrew.cmu.edu
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
