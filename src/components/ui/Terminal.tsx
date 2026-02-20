import { useEffect, useRef } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { TshEmulator } from '../../lib/tshEmulator'

interface TerminalProps {
  onQuit: () => void
}

const BANNER = [
  '  ___  _         _   _ ___ _  ',
  ' |_ _|| |_ ___  | | | | _ \\ |_',
  '  | | |  _(_-<  | |_| |   / \' \\',
  ' |___| \\__/__/   \\___/|_|_|_||_|',
  '',
  'Tiny Shell (tsh) — 15-213 @ CMU',
  '\u2501'.repeat(34),
  'Supports: jobs, fg, bg, quit, echo, ls, sleep',
  'Job control: Ctrl-C  (SIGINT)   Ctrl-Z (SIGTSTP)',
  'Try: sleep 100 &   then: jobs   then: fg %1',
  '',
]

const PROMPT = 'tsh> '

export function Terminal({ onQuit }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const emulator = new TshEmulator()
    const term = new XTerm({
      cursorBlink: true,
      fontFamily: '"JetBrains Mono", "Cascadia Code", "Fira Code", monospace',
      fontSize: 13,
      lineHeight: 1.4,
      theme: {
        background: '#0a0a0a',
        foreground: '#e5e5e5',
        cursor: '#6366f1',
        selectionBackground: 'rgba(99,102,241,0.3)',
        black: '#1a1a1a',
        brightBlack: '#444444',
        red: '#f87171',
        brightRed: '#fca5a5',
        green: '#4ade80',
        brightGreen: '#86efac',
        yellow: '#facc15',
        brightYellow: '#fde047',
        blue: '#818cf8',
        brightBlue: '#a5b4fc',
        magenta: '#c084fc',
        brightMagenta: '#d8b4fe',
        cyan: '#22d3ee',
        brightCyan: '#67e8f9',
        white: '#e5e5e5',
        brightWhite: '#ffffff',
      },
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(containerRef.current)
    fitAddon.fit()

    // Print welcome banner
    for (const line of BANNER) {
      term.writeln(line)
    }
    term.write(PROMPT)

    let inputBuffer = ''

    const handleData = (data: string) => {
      for (const char of data) {
        const code = char.charCodeAt(0)

        if (char === '\r') {
          // Enter
          term.write('\r\n')
          const lines = emulator.processLine(inputBuffer)
          // Handle clear escape
          for (const line of lines) {
            if (line === '\x1b[2J\x1b[H') {
              term.clear()
            } else {
              term.writeln(line)
            }
          }
          if (emulator.isQuit) {
            onQuit()
            return
          }
          inputBuffer = ''
          term.write(PROMPT)
        } else if (char === '\x7f') {
          // Backspace
          if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1)
            term.write('\b \b')
          }
        } else if (char === '\x03') {
          // Ctrl-C
          term.write('^C\r\n')
          const lines = emulator.sigint()
          for (const line of lines) {
            term.writeln(line)
          }
          inputBuffer = ''
          term.write(PROMPT)
        } else if (char === '\x1a') {
          // Ctrl-Z
          term.write('^Z\r\n')
          const lines = emulator.sigtstp()
          for (const line of lines) {
            term.writeln(line)
          }
          inputBuffer = ''
          term.write(PROMPT)
        } else if (code >= 32) {
          // Printable chars
          inputBuffer += char
          term.write(char)
        }
      }
    }

    const disposable = term.onData(handleData)

    const handleResize = () => {
      fitAddon.fit()
    }
    window.addEventListener('resize', handleResize)

    // Focus the terminal
    term.focus()

    return () => {
      disposable.dispose()
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [onQuit])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: 0 }}
    />
  )
}
