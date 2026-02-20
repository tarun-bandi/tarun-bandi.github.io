import { useEffect, lazy, Suspense } from 'react'
import { FiX } from 'react-icons/fi'

const Terminal = lazy(() =>
  import('./Terminal').then((m) => ({ default: m.Terminal }))
)

interface ShellModalProps {
  onClose: () => void
}

export function ShellModal({ onClose }: ShellModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-3xl h-[520px] bg-background border border-border rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <div>
            <span className="text-text-primary font-semibold text-sm">
              tsh — Tiny Shell Demo
            </span>
            <p className="text-text-secondary text-xs mt-0.5">
              15-213 Systems Programming @ CMU · C · Signals · Job Control
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors p-1 rounded"
            aria-label="Close terminal"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Terminal */}
        <div className="flex-1 overflow-hidden p-2 min-h-0">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-text-secondary text-sm">
                Loading terminal…
              </div>
            }
          >
            <Terminal onQuit={onClose} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
