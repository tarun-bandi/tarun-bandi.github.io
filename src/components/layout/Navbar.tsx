import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { NavLink } from '../../types'

const navLinks: NavLink[] = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Contact', to: 'contact' },
]

const sectionIds = navLinks.map((l) => l.to)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy(sectionIds, 120)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-background/80 border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="hero"
          smooth
          duration={600}
          className="font-mono font-semibold text-lg text-text-primary hover:text-accent transition-colors cursor-pointer select-none"
        >
          TB
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                offset={-64}
                className={`text-sm transition-colors cursor-pointer hover:text-text-primary ${
                  activeSection === link.to
                    ? 'text-accent font-medium'
                    : 'text-text-secondary'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden backdrop-blur-md bg-background/95 border-b border-border"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    offset={-64}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm py-1 transition-colors cursor-pointer ${
                      activeSection === link.to
                        ? 'text-accent font-medium'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
