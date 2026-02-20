import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { TCPDiagram, Packet } from './TCPDiagram'

interface Step {
  title: string
  description: string
  packets: Packet[]
}

const STEPS: Step[] = [
  {
    title: 'Why TCP?',
    description:
      'IP (the internet layer) is fundamentally unreliable — it makes no promises about delivery, ordering, or duplicates. Packets can be silently dropped by congested routers anywhere along the path. TCP sits on top of IP and adds the reliability guarantees that applications actually need.',
    packets: [
      {
        id: 'ip1',
        from: 'client',
        label: 'IP Packet',
        sublabel: 'data=hello',
        color: '#f59e0b',
        dropped: true,
        delay: 0.2,
      },
      {
        id: 'ip2',
        from: 'client',
        label: 'IP Packet',
        sublabel: 'data=world',
        color: '#f59e0b',
        dropped: false,
        delay: 0.8,
      },
    ],
  },
  {
    title: 'The 3-Way Handshake',
    description:
      'Before any data flows, TCP establishes a connection with a three-message exchange. The client sends SYN to start, the server replies SYN-ACK to confirm it\'s listening, and the client sends ACK to complete the handshake. Both sides now have synchronized sequence numbers.',
    packets: [
      {
        id: 'syn',
        from: 'client',
        label: 'SYN',
        sublabel: 'seq=0',
        color: '#6366f1',
        delay: 0.2,
      },
      {
        id: 'synack',
        from: 'server',
        label: 'SYN-ACK',
        sublabel: 'seq=0, ack=1',
        color: '#6366f1',
        delay: 0.8,
      },
      {
        id: 'ack',
        from: 'client',
        label: 'ACK',
        sublabel: 'seq=1, ack=1',
        color: '#6366f1',
        delay: 1.4,
      },
    ],
  },
  {
    title: 'Sequence Numbers',
    description:
      'Every byte in a TCP stream is numbered. The sequence number in each segment tells the receiver exactly where in the byte stream this segment belongs. This lets the receiver detect gaps, reorder out-of-sequence arrivals, and track what has been delivered.',
    packets: [
      {
        id: 'seg1',
        from: 'client',
        label: 'DATA',
        sublabel: 'seq=1',
        color: '#10b981',
        delay: 0.2,
      },
      {
        id: 'seg2',
        from: 'client',
        label: 'DATA',
        sublabel: 'seq=501',
        color: '#10b981',
        delay: 0.7,
      },
      {
        id: 'seg3',
        from: 'client',
        label: 'DATA',
        sublabel: 'seq=1001',
        color: '#10b981',
        delay: 1.2,
      },
    ],
  },
  {
    title: 'Reliable Delivery',
    description:
      'The receiver acknowledges every segment by sending back an ACK containing the next sequence number it expects. The sender must wait for that ACK before considering the data delivered. If no ACK arrives within the timeout, the sender retransmits.',
    packets: [
      {
        id: 'data1',
        from: 'client',
        label: 'DATA [1–500]',
        sublabel: 'seq=1',
        color: '#6366f1',
        delay: 0.2,
      },
      {
        id: 'ack1',
        from: 'server',
        label: 'ACK',
        sublabel: 'ack=501',
        color: '#10b981',
        delay: 0.8,
      },
      {
        id: 'data2',
        from: 'client',
        label: 'DATA [501–1000]',
        sublabel: 'seq=501',
        color: '#6366f1',
        delay: 1.2,
      },
      {
        id: 'ack2',
        from: 'server',
        label: 'ACK',
        sublabel: 'ack=1001',
        color: '#10b981',
        delay: 1.8,
      },
    ],
  },
  {
    title: 'Sliding Window',
    description:
      'Waiting for an ACK after every single segment would be extremely slow. The sliding window lets the sender keep multiple segments in flight simultaneously — up to the receiver\'s advertised window size. Throughput is limited only by bandwidth × RTT, not by per-packet round trips.',
    packets: [
      {
        id: 'w1',
        from: 'client',
        label: 'DATA [1–500]',
        sublabel: 'seq=1',
        color: '#6366f1',
        delay: 0.1,
      },
      {
        id: 'w2',
        from: 'client',
        label: 'DATA [501–1000]',
        sublabel: 'seq=501',
        color: '#6366f1',
        delay: 0.35,
      },
      {
        id: 'w3',
        from: 'client',
        label: 'DATA [1001–1500]',
        sublabel: 'seq=1001',
        color: '#6366f1',
        delay: 0.6,
      },
      {
        id: 'wa1',
        from: 'server',
        label: 'ACK',
        sublabel: 'ack=501',
        color: '#10b981',
        delay: 1.0,
      },
    ],
  },
  {
    title: 'Packet Loss & Retransmit',
    description:
      'When a segment is lost in the network the receiver sends a duplicate ACK for the last in-order byte it received. After three duplicate ACKs (or a retransmit timeout), the sender re-sends the missing segment. This is the core of TCP\'s reliability guarantee.',
    packets: [
      {
        id: 'pd1',
        from: 'client',
        label: 'DATA [1–500]',
        sublabel: 'seq=1',
        color: '#6366f1',
        delay: 0.1,
      },
      {
        id: 'pd2',
        from: 'client',
        label: 'DATA [501–1000]',
        sublabel: 'seq=501 — LOST',
        color: '#ef4444',
        dropped: true,
        delay: 0.5,
      },
      {
        id: 'pa1',
        from: 'server',
        label: 'ACK',
        sublabel: 'ack=500 (dup)',
        color: '#f59e0b',
        delay: 0.95,
      },
      {
        id: 'pr',
        from: 'client',
        label: 'RETRANSMIT [501–1000]',
        sublabel: 'seq=501',
        color: '#10b981',
        delay: 1.4,
      },
    ],
  },
  {
    title: 'Connection Teardown',
    description:
      'TCP closes connections gracefully with a four-message exchange. Either side sends FIN to signal it is done sending; the other side ACKs, then sends its own FIN; the initiator ACKs that FIN. Both sides can still receive data until they send their own FIN, enabling half-close.',
    packets: [
      {
        id: 'fin1',
        from: 'client',
        label: 'FIN',
        sublabel: 'seq=1001',
        color: '#6366f1',
        delay: 0.2,
      },
      {
        id: 'fack1',
        from: 'server',
        label: 'ACK',
        sublabel: 'ack=1002',
        color: '#10b981',
        delay: 0.75,
      },
      {
        id: 'fin2',
        from: 'server',
        label: 'FIN',
        sublabel: 'seq=2001',
        color: '#6366f1',
        delay: 1.1,
      },
      {
        id: 'fack2',
        from: 'client',
        label: 'ACK',
        sublabel: 'ack=2002',
        color: '#10b981',
        delay: 1.65,
      },
    ],
  },
]

interface TCPExplainerModalProps {
  onClose: () => void
}

export function TCPExplainerModal({ onClose }: TCPExplainerModalProps) {
  const [step, setStep] = useState(0)
  const total = STEPS.length

  const prev = () => setStep((s) => Math.max(0, s - 1))
  const next = () => setStep((s) => Math.min(total - 1, s + 1))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setStep((s) => Math.max(0, s - 1))
      if (e.key === 'ArrowRight') setStep((s) => Math.min(total - 1, s + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, total])

  const current = STEPS[step]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative max-w-3xl w-full bg-surface border border-border rounded-xl flex flex-col overflow-hidden"
        style={{ height: '580px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-text-primary font-semibold text-base leading-tight">
              TCP Reimplementation — How it Works
            </h2>
            <p className="text-text-secondary text-xs mt-0.5">
              Step {step + 1} / {total} · {current.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors p-1 rounded"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Diagram area */}
        <div className="flex-1 px-4 py-3 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="h-full"
            >
              <TCPDiagram packets={current.packets} stepKey={String(step)} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Description */}
        <div className="px-6 py-3 border-t border-border shrink-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="text-text-secondary text-sm leading-relaxed"
            >
              {current.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border shrink-0">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft size={16} />
            Prev
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === step ? '20px' : '8px',
                  height: '8px',
                  backgroundColor: i === step ? '#6366f1' : undefined,
                }}
                aria-label={`Step ${i + 1}`}
              >
                {i !== step && (
                  <span className="block w-2 h-2 rounded-full bg-border" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            disabled={step === total - 1}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <FiChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
