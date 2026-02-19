import { AnimatedSection } from '../ui/AnimatedSection'
import { ProjectCard } from '../ui/ProjectCard'
import { projects } from '../../data/projects'

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Projects</h2>
          <div className="w-12 h-0.5 bg-accent mb-12" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <AnimatedSection delay={0.1}>
              <h3 className="text-text-secondary text-sm font-medium uppercase tracking-widest mt-12 mb-6">
                Other Projects
              </h3>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.08}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
