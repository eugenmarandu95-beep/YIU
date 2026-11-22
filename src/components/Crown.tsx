import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Activity, Cpu, Zap } from 'lucide-react'
import { useStore } from '../store'
import { ArcGauge } from './ui'
import type { Mode } from '../types'
import { YiuSigil } from './YiuSigil'

const MODES: Mode[] = ['RESEARCH', 'BUILD', 'REASON', 'EXPLORE']

const modeColors: Record<Mode, string> = {
  RESEARCH: '#00d4ff',
  BUILD: '#7c3aed',
  REASON: '#f59e0b',
  EXPLORE: '#00ff88',
}

export function Crown() {
  const { mode, setMode, hardware, searchQuery, setSearchQuery, agentRole } = useStore()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const agentColor: Record<string, string> = {
    SCIENTIST: '#00d4ff',
    ARCHITECT: '#7c3aed',
    ORACLE: '#f59e0b',
    GUARDIAN: '#00ff88',
    NARRATOR: '#ff88aa',
  }
  const sigilColor = agentColor[agentRole]

  return (
    <div className="h-14 bg-space-deep/90 backdrop-blur-md border-b border-neon-blue/15 flex items-center px-4 gap-4 relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <YiuSigil size={32} color={sigilColor} />
        </motion.div>
        <div className="flex flex-col">
          <span className="font-mono text-lg font-bold text-neon-blue text-glow-blue tracking-wider leading-none animate-heartbeat">
            YIU
          </span>
          <span className="font-mono text-[7px] text-neon-blue/40 uppercase tracking-[0.3em] leading-none mt-0.5">
            Your Intelligence Unit
          </span>
        </div>
      </div>

      <div className="w-px h-8 bg-neon-blue/15" />

      {/* System gauges */}
      <div className="flex items-center gap-3">
        <ArcGauge value={hardware.ram} cap={15} label="RAM" unit="GB" />
        <ArcGauge value={hardware.gpu} cap={8} label="GPU" unit="GB" />
        <div className="flex flex-col items-center gap-0.5 px-2">
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3" style={{ color: hardware.cpu < 60 ? '#00ff88' : hardware.cpu < 85 ? '#ffcc00' : '#ff3344' }} />
            <span className="font-mono text-xs" style={{ color: hardware.cpu < 60 ? '#00ff88' : hardware.cpu < 85 ? '#ffcc00' : '#ff3344' }}>
              {hardware.cpu.toFixed(0)}%
            </span>
          </div>
          <span className="font-mono text-[8px] text-hud-grey uppercase tracking-wider opacity-60">CPU</span>
        </div>
      </div>

      <div className="w-px h-8 bg-neon-blue/15" />

      {/* Clock */}
      <div className="flex flex-col items-start">
        <div className="font-mono text-sm text-neon-blue/90 text-glow-blue tabular-nums">
          {now.toLocaleTimeString('en-GB', { hour12: false })}
        </div>
        <div className="font-mono text-[8px] text-neon-blue/40 uppercase tracking-wider">
          {now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neon-blue/40" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask YIU anything..."
            className="w-full bg-space-mid/60 border border-neon-blue/15 rounded-md pl-8 pr-3 py-1.5 font-mono text-xs text-neon-blue/80 placeholder:text-neon-blue/30 focus:outline-none focus:border-neon-blue/40 focus:box-glow-blue transition-all"
          />
        </div>
      </div>

      {/* Mode switcher */}
      <div className="flex items-center gap-1 bg-space-mid/60 border border-neon-blue/10 rounded-md p-0.5">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="relative px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors rounded"
            style={{ color: mode === m ? modeColors[m] : '#4a5a7a' }}
          >
            {mode === m && (
              <motion.div
                layoutId="mode-highlight"
                className="absolute inset-0 rounded border"
                style={{ borderColor: `${modeColors[m]}40`, background: `${modeColors[m]}10` }}
              />
            )}
            <span className="relative z-10">{m}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
