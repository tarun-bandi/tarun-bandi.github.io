interface Job {
  jid: number
  pid: number
  state: 'FG' | 'BG' | 'ST'
  cmdline: string
}

interface EmulatorState {
  jobs: Job[]
  nextJid: number
  nextPid: number
}

const FAKE_LS = [
  'Makefile  README.md  tsh.c  tshref  tshref.out',
]

export class TshEmulator {
  private state: EmulatorState = {
    jobs: [],
    nextJid: 1,
    nextPid: 10001,
  }
  isQuit = false

  private allocPid(): number {
    return this.state.nextPid++
  }

  private allocJid(): number {
    return this.state.nextJid++
  }

  private fgJob(): Job | undefined {
    return this.state.jobs.find((j) => j.state === 'FG')
  }

  private jobBySpec(spec: string): Job | undefined {
    if (spec.startsWith('%')) {
      const jid = parseInt(spec.slice(1), 10)
      return this.state.jobs.find((j) => j.jid === jid)
    }
    const pid = parseInt(spec, 10)
    return this.state.jobs.find((j) => j.pid === pid)
  }

  private jobLine(job: Job): string {
    const stateStr =
      job.state === 'BG' ? 'Running' : job.state === 'ST' ? 'Stopped' : 'Running'
    return `[${job.jid}] (${job.pid}) ${stateStr.padEnd(8)} ${job.cmdline}`
  }

  private removeJob(jid: number) {
    this.state.jobs = this.state.jobs.filter((j) => j.jid !== jid)
  }

  processLine(line: string): string[] {
    const trimmed = line.trim()
    if (!trimmed) return []

    const isBg = trimmed.endsWith('&')
    const cmdline = isBg ? trimmed.slice(0, -1).trim() : trimmed
    const parts = cmdline.split(/\s+/)
    const cmd = parts[0]
    const args = parts.slice(1)

    // Built-ins
    if (cmd === 'quit') {
      this.isQuit = true
      return []
    }

    if (cmd === 'jobs') {
      if (this.state.jobs.length === 0) return []
      return this.state.jobs.map((j) => this.jobLine(j))
    }

    if (cmd === 'fg') {
      const spec = args[0]
      if (!spec) return ['fg: argument must be a PID or %jobid']
      const job = this.jobBySpec(spec)
      if (!job) {
        if (spec.startsWith('%')) return [`fg: ${spec}: No such job`]
        return [`(${spec}): No such process`]
      }
      const wasStopped = job.state === 'ST'
      job.state = 'FG'
      const out: string[] = []
      if (wasStopped) {
        // Resume and immediately simulate completion for BG-style jobs
        // (for a realistic demo we just mark done)
      }
      // Simulate the FG job running and completing
      this.removeJob(job.jid)
      out.push(`[${job.jid}] (${job.pid}) Done    ${job.cmdline}`)
      return out
    }

    if (cmd === 'bg') {
      const spec = args[0]
      if (!spec) return ['bg: argument must be a PID or %jobid']
      const job = this.jobBySpec(spec)
      if (!job) {
        if (spec.startsWith('%')) return [`bg: ${spec}: No such job`]
        return [`(${spec}): No such process`]
      }
      job.state = 'BG'
      return [`[${job.jid}] (${job.pid}) ${job.cmdline}`]
    }

    // External command simulation
    if (cmd === 'echo') {
      const text = args.join(' ')
      if (isBg) {
        const pid = this.allocPid()
        const jid = this.allocJid()
        const job: Job = { jid, pid, state: 'BG', cmdline: trimmed }
        this.state.jobs.push(job)
        return [`[${jid}] (${pid}) ${trimmed}`]
      }
      return [text]
    }

    if (cmd === 'ls') {
      if (isBg) {
        const pid = this.allocPid()
        const jid = this.allocJid()
        const job: Job = { jid, pid, state: 'BG', cmdline: trimmed }
        this.state.jobs.push(job)
        return [`[${jid}] (${pid}) ${trimmed}`]
      }
      return FAKE_LS
    }

    if (cmd === 'sleep') {
      const pid = this.allocPid()
      const jid = this.allocJid()
      if (isBg) {
        const job: Job = { jid, pid, state: 'BG', cmdline: trimmed }
        this.state.jobs.push(job)
        return [`[${jid}] (${pid}) ${trimmed}`]
      } else {
        // FG sleep — add as FG job (would block; for demo, just add and complete)
        const job: Job = { jid, pid, state: 'FG', cmdline: trimmed }
        this.state.jobs.push(job)
        // Simulate completion immediately
        this.removeJob(jid)
        return []
      }
    }

    if (cmd === 'pwd') {
      return ['/home/tsh/demo']
    }

    if (cmd === 'clear') {
      return ['\x1b[2J\x1b[H']
    }

    // Unknown command
    if (cmd.startsWith('./') || cmd.startsWith('/')) {
      return [`${cmd}: No such file or directory`]
    }
    return [`${cmd}: No such file or directory`]
  }

  sigint(): string[] {
    const fg = this.fgJob()
    if (!fg) return []
    const out = [`Job [${fg.jid}] (${fg.pid}) terminated by signal 2`]
    this.removeJob(fg.jid)
    return out
  }

  sigtstp(): string[] {
    const fg = this.fgJob()
    if (!fg) return []
    fg.state = 'ST'
    return [`Job [${fg.jid}] (${fg.pid}) stopped by signal 20`]
  }
}
