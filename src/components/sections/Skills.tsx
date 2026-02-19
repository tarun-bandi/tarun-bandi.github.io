import { AnimatedSection } from '../ui/AnimatedSection'
import { SkillBadge } from '../ui/SkillBadge'
import { skills, skillCategories } from '../../data/skills'

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Skills</h2>
          <div className="w-12 h-0.5 bg-accent mb-12" />
        </AnimatedSection>

        <div className="space-y-10">
          {skillCategories.map((cat, catIdx) => {
            const categorySkills = skills.filter((s) => s.category === cat.key)
            return (
              <AnimatedSection key={cat.key} delay={catIdx * 0.1}>
                <h3 className="text-text-secondary text-sm font-medium uppercase tracking-widest mb-4">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, i) => (
                    <SkillBadge
                      key={skill.name}
                      skill={skill}
                      index={catIdx * 6 + i}
                    />
                  ))}
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
