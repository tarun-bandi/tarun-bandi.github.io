import { Skill } from '../types'

export const skills: Skill[] = [
  // Languages
  { name: 'C', category: 'language', iconName: 'SiC' },
  { name: 'C++', category: 'language', iconName: 'SiCplusplus' },
  { name: 'Python', category: 'language', iconName: 'SiPython' },
  { name: 'TypeScript', category: 'language', iconName: 'SiTypescript' },
  { name: 'Java', category: 'language', iconName: 'SiJava' },
  { name: 'Go', category: 'language', iconName: 'SiGo' },
  { name: 'Rust', category: 'language', iconName: 'SiRust' },
  { name: 'OCaml', category: 'language' },
  { name: 'SQL', category: 'language', iconName: 'SiPostgresql' },
  { name: 'x86-64 Assembly', category: 'language' },

  // Frameworks
  { name: 'PyTorch', category: 'framework', iconName: 'SiPytorch' },
  { name: 'TensorFlow', category: 'framework', iconName: 'SiTensorflow' },
  { name: 'CUDA', category: 'framework', iconName: 'SiNvidia' },
  { name: 'React', category: 'framework', iconName: 'SiReact' },
  { name: 'Next.js', category: 'framework', iconName: 'SiNextdotjs' },
  { name: 'FastAPI', category: 'framework', iconName: 'SiFastapi' },
  { name: 'Spring Boot', category: 'framework', iconName: 'SiSpring' },
  { name: 'LLVM', category: 'framework' },

  // Tools
  { name: 'Git', category: 'tool', iconName: 'SiGit' },
  { name: 'Docker', category: 'tool', iconName: 'SiDocker' },
  { name: 'AWS', category: 'tool', iconName: 'SiAmazonwebservices' },
  { name: 'Redis', category: 'tool', iconName: 'SiRedis' },
  { name: 'OpenShift', category: 'tool', iconName: 'SiRedhatopenshift' },
  { name: 'Jenkins', category: 'tool', iconName: 'SiJenkins' },
  { name: 'GDB', category: 'tool' },
  { name: 'Valgrind', category: 'tool' },

  // Libraries
  { name: 'NumPy', category: 'cloud', iconName: 'SiNumpy' },
  { name: 'pandas', category: 'cloud', iconName: 'SiPandas' },
  { name: 'scikit-learn', category: 'cloud', iconName: 'SiScikitlearn' },
  { name: 'Matplotlib', category: 'cloud' },
]

export const skillCategories = [
  { key: 'language', label: 'Languages' },
  { key: 'framework', label: 'Frameworks & Libraries' },
  { key: 'tool', label: 'Tools & Infrastructure' },
  { key: 'cloud', label: 'Data & ML Libraries' },
] as const
