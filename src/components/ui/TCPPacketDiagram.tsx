import { useState } from 'react'

type Category = 'addressing' | 'sequencing' | 'control' | 'flow' | 'integrity' | 'payload'

interface Flag {
  name: string
  desc: string
}

interface Field {
  id: string
  label: string
  shortLabel?: string
  bits: string
  width: string // percentage of 32-bit row
  category: Category
  title: string
  description: string
  example?: string
  flags?: Flag[]
}

const STYLES: Record<Category, { idle: string; active: string; legend: string }> = {
  addressing: {
    idle:   'bg-blue-500/10   border-blue-500/20   text-blue-400   hover:bg-blue-500/20',
    active: 'bg-blue-500/25   border-blue-500/60   text-blue-300',
    legend: 'bg-blue-400',
  },
  sequencing: {
    idle:   'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20',
    active: 'bg-emerald-500/25 border-emerald-500/60 text-emerald-300',
    legend: 'bg-emerald-400',
  },
  control: {
    idle:   'bg-amber-500/10  border-amber-500/20  text-amber-400   hover:bg-amber-500/20',
    active: 'bg-amber-500/25  border-amber-500/60  text-amber-300',
    legend: 'bg-amber-400',
  },
  flow: {
    idle:   'bg-violet-500/10 border-violet-500/20 text-violet-400  hover:bg-violet-500/20',
    active: 'bg-violet-500/25 border-violet-500/60 text-violet-300',
    legend: 'bg-violet-400',
  },
  integrity: {
    idle:   'bg-zinc-500/10   border-zinc-500/20   text-zinc-400    hover:bg-zinc-500/20',
    active: 'bg-zinc-500/25   border-zinc-500/60   text-zinc-300',
    legend: 'bg-zinc-400',
  },
  payload: {
    idle:   'bg-accent/10     border-accent/20     text-accent      hover:bg-accent/20',
    active: 'bg-accent/25     border-accent/60     text-accent',
    legend: 'bg-accent',
  },
}

const ROWS: Field[][] = [
  // Row 1 — Ports
  [
    {
      id: 'src-port',
      label: 'Source Port',
      bits: '16 bits',
      width: '50%',
      category: 'addressing',
      title: 'Source Port',
      description:
        'Identifies the sending application on the source host. The OS assigns ephemeral ports (49152–65535) to outbound connections; well-known services use reserved ports below 1024.',
      example: '54 321 — ephemeral port assigned by the OS to this client connection',
    },
    {
      id: 'dst-port',
      label: 'Destination Port',
      bits: '16 bits',
      width: '50%',
      category: 'addressing',
      title: 'Destination Port',
      description:
        "Identifies the target application on the destination host. Together with the source port and both IP addresses, it forms the 4-tuple (src IP, src port, dst IP, dst port) that uniquely identifies a TCP connection.",
      example: '443 — HTTPS server; 22 — SSH; 80 — HTTP',
    },
  ],
  // Row 2 — Sequence Number
  [
    {
      id: 'seq',
      label: 'Sequence Number',
      bits: '32 bits',
      width: '100%',
      category: 'sequencing',
      title: 'Sequence Number',
      description:
        'The byte offset of the first data byte in this segment, counted from the Initial Sequence Number (ISN). Allows the receiver to detect gaps, reorder out-of-sequence arrivals, and discard duplicates. In a SYN segment, this field carries the ISN itself.',
      example: '3 217 890 452 — randomly chosen ISN at handshake time',
    },
  ],
  // Row 3 — ACK Number
  [
    {
      id: 'ack-num',
      label: 'Acknowledgement Number',
      bits: '32 bits',
      width: '100%',
      category: 'sequencing',
      title: 'Acknowledgement Number',
      description:
        'The next byte the receiver expects — a cumulative acknowledgement of every byte received in order so far. ACK = 5000 means "I have bytes 0–4999; send byte 5000 next." Only meaningful when the ACK flag is set.',
      example: 'ACK = 1024 after receiving bytes 0–1023',
    },
  ],
  // Row 4 — Control fields
  [
    {
      id: 'data-offset',
      label: 'Offset',
      bits: '4 bits',
      width: '12.5%',
      category: 'control',
      title: 'Data Offset',
      description:
        'The length of the TCP header in 32-bit words, telling the receiver where the payload begins. Minimum is 5 (= 20 bytes, no options); maximum is 15 (= 60 bytes). Necessary because the Options field is variable-length.',
      example: '5 — standard 20-byte header with no options',
    },
    {
      id: 'reserved',
      label: 'Rsvd',
      bits: '3 bits',
      width: '9.375%',
      category: 'control',
      title: 'Reserved',
      description:
        'Must be zero. Reserved for future use by the IETF. Modern TCP extensions have already claimed adjacent bits for ECN (Explicit Congestion Notification), so "reserved" is partly a historical label.',
      example: '000',
    },
    {
      id: 'flags',
      label: 'Flags',
      bits: '9 bits',
      width: '28.125%',
      category: 'control',
      title: 'Control Flags',
      description:
        'Nine single-bit flags that control connection state and data handling. Each is either set (1) or clear (0). SYN+ACK together appear only in the second step of the 3-way handshake.',
      flags: [
        { name: 'NS',  desc: 'ECN nonce — concealment protection against accidental or malicious ECN bit clearing' },
        { name: 'CWR', desc: 'Congestion Window Reduced — sender confirms it reduced its window after receiving ECE' },
        { name: 'ECE', desc: 'ECN-Echo — receiver is signalling network congestion back to the sender' },
        { name: 'URG', desc: 'Urgent Pointer field is significant; data before the pointer is treated as high-priority' },
        { name: 'ACK', desc: 'Acknowledgement Number is valid. Set on every segment after the initial SYN' },
        { name: 'PSH', desc: 'Push — deliver buffered data to the application immediately, do not wait to fill a full segment' },
        { name: 'RST', desc: 'Reset — abort the connection immediately; used for error conditions or to reject invalid segments' },
        { name: 'SYN', desc: 'Synchronise sequence numbers. Only the first segment from each side has SYN set; it carries the ISN' },
        { name: 'FIN', desc: 'Finish — the sender has no more data to send. Initiates the graceful four-way connection close' },
      ],
    },
    {
      id: 'window',
      label: 'Window Size',
      bits: '16 bits',
      width: '50%',
      category: 'flow',
      title: 'Window Size (rwnd)',
      description:
        "The number of bytes the sender of this segment is currently willing to receive — its available buffer space. The remote side must not send more unacknowledged bytes than this value. Advertised in every segment so both sides stay in sync as buffers fill and drain.",
      example: '65 535 — maximum without the Window Scale option (RFC 7323)',
    },
  ],
  // Row 5 — Checksum + Urgent
  [
    {
      id: 'checksum',
      label: 'Checksum',
      bits: '16 bits',
      width: '50%',
      category: 'integrity',
      title: 'Checksum',
      description:
        "A 16-bit one's complement sum over the TCP header, payload, and a pseudo-header borrowed from the IP layer (source/destination address, protocol = 6, segment length). Detects bit errors introduced in transit. Mandatory in TCP — unlike UDP where it is optional.",
      example: '0x3A2F — computed by sender, verified by receiver',
    },
    {
      id: 'urgent',
      label: 'Urgent Pointer',
      bits: '16 bits',
      width: '50%',
      category: 'integrity',
      title: 'Urgent Pointer',
      description:
        'When URG is set, this field is a positive offset from the sequence number indicating the end of urgent (out-of-band) data. Historically used by Telnet and SSH for interrupt signals. Rarely used in modern protocols; most stacks treat it as a legacy feature.',
      example: 'Only meaningful when the URG flag is set',
    },
  ],
  // Row 6 — Options
  [
    {
      id: 'options',
      label: 'Options + Padding',
      bits: 'variable — 0 to 40 bytes',
      width: '100%',
      category: 'control',
      title: 'Options + Padding',
      description:
        'Optional extensions negotiated at connection setup (SYN / SYN-ACK). Padding zeroes ensure the header ends on a 32-bit boundary, which is why Data Offset matters.',
      example: 'MSS=1460, Window Scale=7, SACK Permitted, Timestamps',
    },
  ],
  // Row 7 — Payload
  [
    {
      id: 'payload',
      label: 'Data  ·  Payload',
      bits: 'variable',
      width: '100%',
      category: 'payload',
      title: 'Payload',
      description:
        'The application bytes being transported — HTTP request text, TLS records, SSH traffic, etc. The maximum per-segment is bounded by the MSS (Maximum Segment Size), typically 1 460 bytes on Ethernet: MTU 1500 minus 20 bytes IP header minus 20 bytes TCP header.',
      example: 'TLS 1.3 Application Data record, or: HTTP/1.1 GET / HTTP/1.1\\r\\nHost: …',
    },
  ],
]

const LEGEND: { category: Category; label: string }[] = [
  { category: 'addressing', label: 'Addressing' },
  { category: 'sequencing', label: 'Sequencing' },
  { category: 'control',    label: 'Control' },
  { category: 'flow',       label: 'Flow control' },
  { category: 'integrity',  label: 'Integrity' },
  { category: 'payload',    label: 'Payload' },
]

export function TCPPacketDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const allFields = ROWS.flat()
  const active = allFields.find((f) => f.id === activeId) ?? null

  return (
    <div className="space-y-3">

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {LEGEND.map(({ category, label }) => (
          <div key={category} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full shrink-0 ${STYLES[category].legend}`} />
            <span className="text-text-secondary text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* Packet diagram */}
      <div
        className="border border-border rounded-lg overflow-hidden"
        onMouseLeave={() => setActiveId(null)}
      >
        {/* Bit ruler */}
        <div className="flex justify-between px-3 py-1 bg-background/60 border-b border-border/50">
          {['0', '8', '16', '24', '31'].map((n) => (
            <span key={n} className="font-mono text-[9px] text-text-secondary/40">{n}</span>
          ))}
        </div>

        {/* Rows */}
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex border-b border-border last:border-b-0 min-h-[48px]">
            {row.map((field, fi) => {
              const isActive = activeId === field.id
              const s = STYLES[field.category]
              return (
                <button
                  key={field.id}
                  style={{ width: field.width }}
                  className={[
                    'relative flex flex-col items-center justify-center px-1.5 py-2 text-center',
                    'border-r border-border last:border-r-0',
                    'transition-all duration-150 cursor-pointer outline-none',
                    'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/20',
                    'border-2',
                    isActive ? s.active : s.idle,
                    fi === 0 ? 'border-l-0' : '',
                  ].join(' ')}
                  onMouseEnter={() => setActiveId(field.id)}
                  onClick={() => setActiveId((prev) => (prev === field.id ? null : field.id))}
                  aria-pressed={isActive}
                >
                  <span className="font-mono text-[10px] font-semibold leading-tight truncate w-full text-center">
                    {field.shortLabel ?? field.label}
                  </span>
                  <span className="font-mono text-[9px] opacity-60 leading-tight truncate w-full text-center">
                    {field.bits}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <div
        className={[
          'rounded-lg border transition-all duration-200',
          active
            ? `${STYLES[active.category].active} border-2`
            : 'border-border bg-background/40',
        ].join(' ')}
      >
        {active ? (
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-baseline gap-3">
              <h3 className="font-semibold text-sm">{active.title}</h3>
              <span className="font-mono text-xs opacity-60">{active.bits}</span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">{active.description}</p>

            {active.flags && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {active.flags.map(({ name, desc }) => (
                  <div key={name} className="flex gap-2 items-start">
                    <code className="font-mono text-[10px] font-bold shrink-0 mt-0.5 w-8">{name}</code>
                    <span className="text-xs opacity-75 leading-snug">{desc}</span>
                  </div>
                ))}
              </div>
            )}

            {active.example && (
              <p className="font-mono text-xs opacity-60 border-t border-current/20 pt-2">
                e.g. {active.example}
              </p>
            )}
          </div>
        ) : (
          <p className="px-5 py-4 text-xs text-text-secondary text-center">
            Hover or tap a field to learn more
          </p>
        )}
      </div>
    </div>
  )
}
