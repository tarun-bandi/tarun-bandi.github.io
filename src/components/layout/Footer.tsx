import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/tarun-bandi', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/tarun-bandi', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://twitter.com/tarun-bandi', label: 'Twitter' },
  { icon: FiMail, href: 'mailto:tarun@example.com', label: 'Email' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-sm">
          &copy; {year} Tarun Bandi. Built with React + Tailwind.
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
