import { motion } from 'framer-motion'

export interface Packet {
  id: string
  from: 'client' | 'server'
  label: string
  sublabel?: string
  color?: string
  dropped?: boolean
  delay: number
}

interface TCPDiagramProps {
  packets: Packet[]
  stepKey: string
}

export function TCPDiagram({ packets, stepKey }: TCPDiagramProps) {
  return (
    <div key={stepKey} className="relative w-full h-full flex flex-col select-none">
      {/* Column headers */}
      <div className="flex justify-between px-8 mb-2">
        <span className="text-xs font-semibold text-accent tracking-widest uppercase">Client</span>
        <span className="text-xs font-semibold text-accent tracking-widest uppercase">Server</span>
      </div>

      {/* Timeline + packets */}
      <div className="relative flex-1 flex">
        {/* Left timeline bar */}
        <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-border opacity-60" />
        {/* Right timeline bar */}
        <div className="absolute right-8 top-0 bottom-0 w-px border-l-2 border-dashed border-border opacity-60" />

        {/* Packets */}
        <div className="relative w-full flex flex-col justify-around py-2">
          {packets.map((packet) => (
            <PacketArrow key={packet.id} packet={packet} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PacketArrow({ packet }: { packet: Packet }) {
  const isClientToServer = packet.from === 'client'
  const color = packet.color ?? '#6366f1'
  const dropColor = '#ef4444'

  // Arrow goes left-to-right (client→server) or right-to-left (server→client)
  // We animate scaleX from 0 to 1 with transform-origin on the source side.
  // For dropped packets we scale to 0.5 and show an X.

  const targetScale = packet.dropped ? 0.5 : 1

  return (
    <div className="relative flex flex-col w-full px-8" style={{ height: '60px' }}>
      {/* Label — top of row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: packet.delay + 0.1, duration: 0.2, ease: 'easeOut' }}
        className="flex flex-col items-center pointer-events-none shrink-0"
      >
        <span
          className="text-xs font-semibold leading-tight"
          style={{ color: packet.dropped ? dropColor : color }}
        >
          {packet.label}
        </span>
        {packet.sublabel && (
          <span className="text-[10px] text-text-secondary leading-tight">{packet.sublabel}</span>
        )}
      </motion.div>

      {/* Arrow line — fills remaining space, arrow centered within it */}
      <div className="relative w-full flex-1 flex items-center" style={{ height: '20px' }}>
        {/* Expanding line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: targetScale }}
          transition={{ delay: packet.delay, duration: 0.4, ease: 'easeOut' }}
          className="absolute top-1/2 -translate-y-1/2 h-0.5 w-full origin-left"
          style={{
            transformOrigin: isClientToServer ? 'left center' : 'right center',
            backgroundColor: packet.dropped ? dropColor : color,
            ...(isClientToServer ? {} : { left: 0, right: 0 }),
          }}
        />

        {/* Arrowhead */}
        {!packet.dropped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: packet.delay + 0.38, duration: 0.1, ease: 'easeOut' }}
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              [isClientToServer ? 'right' : 'left']: '-1px',
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              [isClientToServer ? 'borderLeft' : 'borderRight']: `8px solid ${color}`,
            }}
          />
        )}

        {/* Dropped X marker */}
        {packet.dropped && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: packet.delay + 0.42, duration: 0.2, ease: 'easeOut' }}
            className="absolute top-1/2 -translate-y-1/2 font-bold text-sm leading-none"
            style={{
              left: isClientToServer ? '48%' : undefined,
              right: isClientToServer ? undefined : '48%',
              color: dropColor,
              transform: 'translate(-50%, -50%)',
            }}
          >
            ✕
          </motion.div>
        )}
      </div>
    </div>
  )
}
