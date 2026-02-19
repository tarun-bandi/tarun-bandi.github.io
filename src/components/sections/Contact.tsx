import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { AnimatedSection } from '../ui/AnimatedSection'

const socialLinks = [
  {
    icon: FiGithub,
    label: 'GitHub',
    href: 'https://github.com/tarun-bandi',
    handle: '@tarun-bandi',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tarun-bandi',
    handle: 'tarun-bandi',
  },
  {
    icon: FiTwitter,
    label: 'Twitter',
    href: 'https://twitter.com/tarun-bandi',
    handle: '@tarun-bandi',
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Contact</h2>
          <div className="w-12 h-0.5 bg-accent mb-12" />
        </AnimatedSection>

        <div className="max-w-2xl">
          <AnimatedSection delay={0.1}>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              I&apos;m open to interesting projects, collaborations, and opportunities. Feel free to
              reach out — I try to respond to every message.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <a
              href="mailto:tarun@example.com"
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors text-sm mb-10"
            >
              <FiMail size={16} />
              Send me an email
            </a>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col gap-4">
              {socialLinks.map(({ icon: Icon, label, href, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-2 border border-border text-text-secondary group-hover:border-accent/50 group-hover:text-accent transition-colors">
                    <Icon size={16} />
                  </span>
                  <div>
                    <div className="text-text-primary text-sm font-medium group-hover:text-accent transition-colors">
                      {label}
                    </div>
                    <div className="text-text-secondary text-xs">{handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
