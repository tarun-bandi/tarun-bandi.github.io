import { motion, Variants } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub } from 'react-icons/fi'
import { useMousePosition } from '../../hooks/useMousePosition'

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export function Hero() {
  const { x, y } = useMousePosition()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cursor gradient background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(99,102,241,0.10) 0%, transparent 60%)`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Monogram / greeting */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-accent text-sm tracking-widest uppercase">
              Hello, I&apos;m
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-none tracking-tight"
          >
            Tarun Bandi
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-text-secondary font-light max-w-xl"
          >
            Software Engineer &mdash; building fast, reliable, and thoughtfully designed software.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-base max-w-lg leading-relaxed"
          >
            I work across the stack &mdash; from React frontends to distributed backends. I care about clean code, good UX, and shipping things that matter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 flex-wrap justify-center mt-2"
          >
            <Link
              to="projects"
              smooth
              duration={600}
              offset={-64}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors cursor-pointer select-none text-sm"
            >
              View Projects
            </Link>
            <a
              href="https://github.com/tarun-bandi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border hover:border-accent/60 text-text-secondary hover:text-text-primary rounded-lg transition-colors text-sm"
            >
              <FiGithub size={16} />
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Link to="about" smooth duration={600} offset={-64} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="text-text-secondary/50 hover:text-text-secondary transition-colors"
          >
            <FiArrowDown size={20} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
