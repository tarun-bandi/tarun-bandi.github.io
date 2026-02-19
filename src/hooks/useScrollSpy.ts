import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i])
          return
        }
      }
      setActiveSection(sectionIds[0] ?? '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
