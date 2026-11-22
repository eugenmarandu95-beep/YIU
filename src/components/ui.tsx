import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Panel({ title, children, className = '', accent = 'blue' }: { title?: string; children: ReactNode; className?: string; accent?: 'blue' | 'violet' | 'gold' | 'green' }) {
  const accentColor = {
    blue: 'rgba(0, 212, 255, 0.15)',
    violet: 'rgba(124, 58, 237, 0.15)',
    gold: 'rgba(245, 158, 11, 0.15)',
    green: 'rgba(0, 255, 136, 0.15)',
  }[accent]

  return (
    <div className={`panel glow-border flex flex-col ${className}`} style={{ boxShadow: `inset 0 0 30px ${accentColor}` }}>
      <div className="scanline-overlay" />
      {title && (
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-neon-blue/10 relative z-10 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-blue/60 animate-pulse-glow" />
          <span className="panel-title">{title}</span>
        </div>
      )}
      <div className="flex-1 relative z-10 overflow-hidden">{children}</div>
    </div>
  )
}

export function ArcGauge({ value, cap, label, unit, size = 56 }: { value: number; cap: number; label: string; unit: string; size?: number }) {
  const pct = Math.min(value / cap, 1)
  const radius = size / 2 - 6
  const circumference = Math.PI * radius
  const offset = circumference * (1 - pct)
  const color = pct < 0.6 ? '#00ff88' : pct < 0.85 ? '#ffcc00' : '#ff3344'

  return (
    <div className="flex flex-col items-center gap-0.5" title={`${label}: ${value.toFixed(1)}${unit} / ${cap}${unit}`}>
      <svg width={size} height={size / 2 + 4} viewBox={`0 0 ${size} ${size / 2 + 4}`}>
        <path
          d={`M 6 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 6} ${size / 2}`}
          fill="none"
          stroke="#1a2540"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.path
          d={`M 6 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 6} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="font-mono text-[9px] text-center leading-tight">
        <div style={{ color }} className="text-glow-blue">{value.toFixed(1)}<span className="opacity-50">/{cap}</span></div>
        <div className="text-hud-grey uppercase tracking-wider opacity-60">{label}</div>
      </div>
    </div>
  )
}

export function StatusTag({ status }: { status: string }) {
  const colors: Record<string, string> = {
    FACT: '#00ff88',
    MEASUREMENT: '#00d4ff',
    HYPOTHESIS: '#f59e0b',
    RECOMMENDATION: '#7c3aed',
    UNCERTAINTY: '#ffcc00',
    UNKNOWN: '#ff8844',
    DEPRECATED: '#ff3344',
  }
  const color = colors[status] || '#4a5a7a'
  return (
    <span
      className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded border"
      style={{ color, borderColor: `${color}40`, background: `${color}15` }}
    >
      {status}
    </span>
  )
}
