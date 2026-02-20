import { useEffect, lazy, Suspense } from 'react'
import { FiX } from 'react-icons/fi'

const TCPDeepDiveContent = lazy(() =>
  import('../../content/TCPDeepDiveContent').then((m) => ({ default: m.TCPDeepDiveContent }))
)

interface ArticleModalProps {
  title: string
  onClose: () => void
}

export function ArticleModal({ title, onClose }: ArticleModalProps) {
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
        className="relative flex flex-col w-full max-w-3xl max-h-[85vh] bg-surface border border-border rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-text-primary font-semibold text-base">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors p-1 rounded"
            aria-label="Close article"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Article body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-16 text-text-secondary text-sm">
                Loading…
              </div>
            }
          >
            <TCPDeepDiveContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
