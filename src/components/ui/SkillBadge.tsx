import { motion } from 'framer-motion'
import {
  SiTypescript, SiJavascript, SiPython, SiGo, SiRust, SiPostgresql,
  SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiTailwindcss, SiExpress,
  SiGit, SiDocker, SiRedis, SiVite, SiGithubactions, SiVercel, SiCloudflare,
  SiC, SiCplusplus, SiHtml5,
  SiPytorch, SiTensorflow, SiNvidia, SiSpring,
  SiJenkins, SiRedhatopenshift,
  SiNumpy, SiPandas, SiScikitlearn,
} from 'react-icons/si'
import { FaAws, FaJava } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Skill } from '../../types'

const iconMap: Record<string, IconType> = {
  SiTypescript, SiJavascript, SiPython, SiGo, SiRust, SiPostgresql,
  SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiTailwindcss, SiExpress,
  SiGit, SiDocker, SiRedis, SiVite, SiGithubactions, SiVercel, SiCloudflare,
  SiC, SiCplusplus, SiHtml5,
  SiPytorch, SiTensorflow, SiNvidia, SiSpring,
  SiJenkins, SiRedhatopenshift,
  SiNumpy, SiPandas, SiScikitlearn,
  SiAmazonwebservices: FaAws,
  SiJava: FaJava,
}

interface SkillBadgeProps {
  skill: Skill
  index?: number
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const IconComponent = skill.iconName ? iconMap[skill.iconName] : null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ borderColor: 'rgba(99, 102, 241, 0.6)', color: '#818cf8' }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border text-text-secondary text-sm cursor-default transition-colors"
    >
      {IconComponent && <IconComponent size={16} className="shrink-0" />}
      <span>{skill.name}</span>
    </motion.div>
  )
}
