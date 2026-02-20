import { TCPPacketDiagram } from '../components/ui/TCPPacketDiagram'

const glossary = [
  {
    term: 'IP (Internet Protocol)',
    def: 'The network-layer protocol that routes packets between devices using IP addresses; connectionless and best-effort — no delivery guarantees.',
  },
  {
    term: 'TCP (Transmission Control Protocol)',
    def: 'A transport-layer protocol built on IP that provides reliable, ordered, byte-stream delivery to applications.',
  },
  {
    term: 'Segment',
    def: "TCP's unit of transmission — a header (seq/ack numbers, flags, window size) plus a payload of application bytes.",
  },
  {
    term: 'Sequence Number (SEQ)',
    def: "A 32-bit number identifying the first byte of a segment's payload within the byte stream, counting from the ISN.",
  },
  {
    term: 'Acknowledgement Number (ACK)',
    def: 'The next byte number the receiver expects — a cumulative ACK covering all bytes received in order up to that point.',
  },
  {
    term: 'ISN (Initial Sequence Number)',
    def: 'A randomly chosen starting sequence number exchanged during the handshake; randomness prevents stale packets from old connections causing problems.',
  },
  {
    term: 'RTO (Retransmission Timeout)',
    def: 'How long the sender waits for an ACK before retransmitting a segment; computed from smoothed RTT measurements using Jacobson\'s algorithm.',
  },
  {
    term: 'RTT (Round-Trip Time)',
    def: 'The measured time for a segment to reach the receiver and its ACK to return — the basis for RTO calculation.',
  },
  {
    term: 'Sliding Window',
    def: 'A mechanism that keeps multiple unacknowledged segments in flight simultaneously, maximising throughput on high-latency links.',
  },
  {
    term: 'rwnd (Receive Window)',
    def: "The receiver's advertised available buffer space; the sender must not have more than rwnd bytes unacknowledged at any moment.",
  },
  {
    term: 'Fast Retransmit',
    def: 'Immediate retransmission triggered by receiving 3 duplicate ACKs — a reliable signal of loss rather than reordering, fires before RTO.',
  },
  {
    term: 'TIME_WAIT',
    def: 'A 2×MSL hold state the closing side enters after the final ACK, ensuring stale packets expire and the final ACK can be re-sent if lost.',
  },
]

const misconceptions = [
  {
    myth: '"TCP guarantees delivery to the application"',
    reality:
      'TCP guarantees in-order delivery only while the connection is alive. If the connection drops — network failure, timeout — TCP surfaces an error and data in flight is lost. End-to-end reliability across connection failures is the application\'s problem, not TCP\'s.',
  },
  {
    myth: '"ACKs acknowledge individual segments"',
    reality:
      'ACK numbers are cumulative: ACK 5000 means "I have received all bytes through 4999." Out-of-order segments generate duplicate ACKs for the last in-order byte, not segment-level confirmations. Per-segment acknowledgement is a separate extension called SACK (Selective Acknowledgement).',
  },
  {
    myth: '"TIME_WAIT is a bug — it wastes ports for up to 4 minutes"',
    reality:
      'TIME_WAIT serves two essential purposes: it allows the final ACK to be re-sent if the remote side retransmits its FIN, and it ensures all delayed duplicates from the old connection expire before the same four-tuple can be reused. Without it, stale packets could corrupt a new connection.',
  },
]

export function TCPDeepDiveContent() {
  return (
    <div className="space-y-12">

      {/* 1. Summary */}
      <section className="space-y-4">
        <h2 className="text-text-primary font-semibold text-base">Key ideas</h2>
        <ol className="space-y-2.5 list-none">
          {[
            'IP is connectionless and best-effort — packets can be dropped, reordered, or duplicated with no notification.',
            'TCP sits on top of IP and provides a reliable, ordered byte stream to applications.',
            'Before data flows, a 3-way handshake (SYN → SYN-ACK → ACK) confirms both sides can send and receive.',
            'Each side picks a random ISN during the handshake to uniquely label its bytes and avoid confusion with old connections.',
            'Every byte in the stream has a sequence number; the receiver tracks the "next expected byte" to detect gaps and reordering.',
            'Positive acknowledgement with retransmission (PAR): the sender retransmits if no ACK arrives before the RTO expires.',
            'RTO adapts to actual network conditions via Jacobson\'s algorithm: SRTT + 4 × RTTVAR.',
            'The sliding window keeps multiple unacknowledged segments in flight, matching throughput to available bandwidth rather than RTT.',
            'Fast retransmit fires on 3 duplicate ACKs — reliable signal of segment loss — without waiting for the full RTO.',
            'Teardown takes four messages (FIN / ACK / FIN / ACK) and ends in TIME_WAIT to absorb stale packets and guarantee clean closure.',
          ].map((point, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-accent font-mono text-xs mt-0.5 w-5 shrink-0 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="w-full h-px bg-border" />

      {/* 2. Packet diagram */}
      <section className="space-y-4">
        <h2 className="text-text-primary font-semibold text-base">TCP segment structure</h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          Every TCP segment has a fixed-format header followed by a variable-length payload.
          The diagram below shows the 32-bit layout of a real TCP header — hover or tap any
          field to see what it carries and why it exists.
        </p>
        <TCPPacketDiagram />
      </section>

      <div className="w-full h-px bg-border" />

      {/* 3. Mental model */}
      <section className="space-y-4">
        <h2 className="text-text-primary font-semibold text-base">Mental model</h2>
        <div className="border-l-2 border-accent/40 pl-5 space-y-3">
          <p className="text-text-secondary text-sm leading-relaxed">
            Imagine the internet as a postal system with no delivery guarantees. Your letters (IP packets)
            might arrive out of order, get lost in transit, or occasionally show up twice. IP is purely
            the address system — it knows how to route an envelope from A to B, but the postal service
            makes no promises about whether it arrives or when.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            TCP adds a layer of accountability on top of those same postal roads. Think of it as a
            registered-mail service: before the courier starts delivering packages, it places a quick call
            to confirm both parties are ready (the 3-way handshake). Every package gets a tracking number
            (sequence number) so the recipient can tell immediately if anything is missing or out of order.
            If a delivery confirmation never arrives, the courier automatically dispatches a replacement.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            The sliding window is the courier's truck capacity policy. Instead of dropping off one box
            and driving back to wait for a receipt, the courier keeps loading the truck as long as the
            recipient's warehouse (receive buffer) has space. If one box goes missing, the recipient
            withholds sign-off for everything that came after it — generating duplicate receipts that
            trigger an immediate re-delivery, without waiting for the courier's own timeout to fire.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* 4. Glossary */}
      <section className="space-y-4">
        <h2 className="text-text-primary font-semibold text-base">Glossary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {glossary.map(({ term, def }) => (
            <div
              key={term}
              className="rounded-lg border border-border bg-background p-4 space-y-1"
            >
              <dt className="text-text-primary font-mono text-xs font-semibold">{term}</dt>
              <dd className="text-text-secondary text-xs leading-relaxed">{def}</dd>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* 5. Analogies */}
      <section className="space-y-4">
        <h2 className="text-text-primary font-semibold text-base">Two analogies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-background p-5 space-y-2">
            <p className="text-text-primary text-xs font-semibold uppercase tracking-wide">
              IP as postal addressing · TCP as registered mail
            </p>
            <p className="text-text-secondary text-xs leading-relaxed">
              IP is the address on the envelope — it routes the letter through the postal network but
              makes no delivery promise. TCP is registered mail on top of that same network: tracking
              numbers, delivery confirmation, and an automatic resend policy. The letter still travels
              by the same roads; the registered-mail layer adds the accountability.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-5 space-y-2">
            <p className="text-text-primary text-xs font-semibold uppercase tracking-wide">
              IP as roads · TCP as a logistics company
            </p>
            <p className="text-text-secondary text-xs leading-relaxed">
              IP is the road network — packets travel across it, but roads don't guarantee anything
              arrives or in what order. TCP is the logistics company (think FedEx) that uses those roads:
              it assigns tracking numbers to every shipment (SEQ), calls ahead before delivering (handshake),
              manages truck load sizes to avoid overwhelming the warehouse (sliding window), and dispatches
              a replacement if a shipment goes missing (retransmit).
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-border" />

      {/* 6. Misconceptions */}
      <section className="space-y-4">
        <h2 className="text-text-primary font-semibold text-base">Common misconceptions</h2>
        <div className="space-y-4">
          {misconceptions.map(({ myth, reality }, i) => (
            <div key={i} className="rounded-lg border border-border bg-background overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
                <p className="text-text-secondary text-xs font-mono italic">{myth}</p>
              </div>
              <div className="px-5 py-3">
                <p className="text-text-secondary text-xs leading-relaxed">{reality}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
