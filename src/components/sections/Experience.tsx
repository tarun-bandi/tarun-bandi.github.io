import { AnimatedSection } from '../ui/AnimatedSection'
import type { Experience } from '../../types'

const experiences: Experience[] = [
  {
    id: 'meta',
    company: 'Meta',
    role: 'Software Engineering Intern',
    location: 'Menlo Park, CA',
    period: 'May 2025 – Aug 2025',
    bullets: [
      'Built LLM evaluation tools using RPCs, containers, React, and Python for Meta\'s Llama fine-tuning platform.',
      'Built an internal tool to evaluate Llama 4 audio training data quality on speech-tokenization + reconstruction models, with ML inference optimization and batch-processing across 1,000+ audio samples.',
      'Designed a caching system for reconstructed training data via a cron job on an ML HPC cluster, reducing load times from 30 seconds to under 1 second.',
    ],
    tags: ['Python', 'React', 'RPC', 'LLM', 'HPC'],
  },
  {
    id: 'citi',
    company: 'Citi',
    role: 'Software Engineer Intern',
    location: 'Jersey City, NJ',
    period: 'May 2024 – Aug 2024',
    bullets: [
      'Built a Java microservice to perform day-long stress testing on a credit card payment system.',
      'Used Kafka message queues and MongoDB for thorough logging and message connectivity.',
      'Deployed via CI/CD pipelines on OpenShift, achieving 90% code coverage.',
    ],
    tags: ['Java', 'Kafka', 'MongoDB', 'OpenShift', 'CI/CD'],
  },
  {
    id: 'robotics',
    company: 'Robotics Institute at CMU',
    role: 'Student Researcher',
    location: 'Pittsburgh, PA',
    period: 'May 2023 – Dec 2023',
    bullets: [
      'Developed a failure detection system for a mechanical lung in collaboration with robotics researchers.',
      'Built a platform to bridge embedded systems and AWS using NoSQL databases and EC2.',
      'Experimented with time series models — RNNs, LSTM, and ARIMA — to detect mechanical failure.',
    ],
    tags: ['Python', 'AWS', 'LSTM', 'RNN', 'ARIMA', 'Embedded'],
  },
  {
    id: 'ta',
    company: 'CS Department at CMU',
    role: 'Theoretical CS Teaching Assistant',
    location: 'Pittsburgh, PA',
    period: 'Dec 2023 – Present',
    bullets: [
      'Supporting a historically challenging CS course, impacting 200+ students per semester.',
      'Mentoring students one-on-one to address difficult concepts and improve performance.',
    ],
    tags: ['Teaching', 'Theory of Computation', 'Algorithms'],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Experience</h2>
          <div className="w-12 h-0.5 bg-accent mb-12" />
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border hidden sm:block" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.id} delay={i * 0.1}>
                <div className="sm:pl-8 relative">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent -translate-x-[3px] hidden sm:block" />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-text-primary font-semibold text-base">{exp.company}</h3>
                      <p className="text-accent text-sm">{exp.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-text-secondary text-sm">{exp.period}</p>
                      <p className="text-text-secondary text-xs">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-3">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="text-text-secondary text-sm leading-relaxed flex gap-2">
                        <span className="text-accent shrink-0 mt-1">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-surface-2 text-text-secondary border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
