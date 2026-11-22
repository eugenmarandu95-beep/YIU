import { motion } from 'framer-motion'
import { Plus, Upload, Play, FileText, AlertCircle, CheckCircle, Clock, Lock } from 'lucide-react'
import { useStore } from '../store'
import { useStore as useMainStore } from '../store'

const statusIcons: Record<string, typeof CheckCircle> = {
  complete: CheckCircle,
  active: Play,
  blocked: AlertCircle,
  needs_review: Clock,
  planned: Lock,
}

const statusColors: Record<string, string> = {
  complete: '#00ff88',
  active: '#00d4ff',
  blocked: '#ff3344',
  needs_review: '#ffcc00',
  planned: '#4a5a7a',
}

const priorityColors: Record<string, string> = {
  P0: '#ff3344',
  P1: '#ffcc00',
  P2: '#00d4ff',
  P3: '#4a5a7a',
}

function HardwareBar({ label, value, cap, unit }: { label: string; value: number; cap: number; unit: string }) {
  const pct = (value / cap) * 100
  const color = pct < 60 ? '#00ff88' : pct < 85 ? '#ffcc00' : '#ff3344'
  return (
    <div className="flex flex-col gap-0.5 min-w-[80px]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] text-hud-grey uppercase tracking-wider">{label}</span>
        <span className="font-mono text-[8px] tabular-nums" style={{ color }}>
          {value.toFixed(1)}/{cap}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-space-light rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8 }}
        />
        {pct > 85 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: `${color}20` }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  )
}

export function Horizon() {
  const { tasks, hardware, sendMessage } = useStore()
  const { setMode } = useMainStore()

  return (
    <div className="h-28 bg-space-deep/90 backdrop-blur-md border-t border-neon-blue/15 flex items-stretch px-3 gap-3 py-2 relative z-40">
      {/* Active Tasks Queue */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="panel-title">Active Tasks Queue</span>
          <span className="font-mono text-[8px] text-hud-grey">{tasks.filter(t => t.status === 'active').length} active · {tasks.length} total</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {tasks.filter(t => t.status === 'active' || t.status === 'needs_review' || t.status === 'blocked').slice(0, 6).map((task) => {
            const Icon = statusIcons[task.status] || Lock
            const color = statusColors[task.status]
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="shrink-0 w-40 bg-space-mid/50 border rounded-md p-1.5"
                style={{ borderColor: `${color}30` }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-mono text-[7px] font-bold px-1 rounded" style={{ color: priorityColors[task.priority], background: `${priorityColors[task.priority]}20` }}>
                    {task.priority}
                  </span>
                  <span className="font-mono text-[7px] text-hud-grey">{task.id}</span>
                  <Icon className="w-2.5 h-2.5 ml-auto" style={{ color }} />
                </div>
                <p className="text-[9px] text-white/70 leading-tight truncate mb-1">{task.name}</p>
                <div className="h-0.5 bg-space-light rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ background: color }}
                    animate={{ width: `${task.progress}%` }}
                  />
                </div>
                <span className="font-mono text-[7px] text-hud-grey">{task.progress}% · {task.status}</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="w-px bg-neon-blue/10" />

      {/* Hardware Monitor */}
      <div className="flex flex-col justify-between w-[280px] shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="panel-title">Hardware Monitor</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <HardwareBar label="RAM" value={hardware.ram} cap={15} unit="GB" />
          <HardwareBar label="GPU VRAM" value={hardware.gpu} cap={8} unit="GB" />
          <HardwareBar label="CPU" value={hardware.cpu} cap={100} unit="%" />
        </div>
      </div>

      <div className="w-px bg-neon-blue/10" />

      {/* Quick Actions */}
      <div className="flex flex-col justify-between w-[180px] shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="panel-title">Quick Actions</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: 'New Research', icon: Plus, action: () => { setMode('RESEARCH'); sendMessage('Start a new research thread') } },
            { label: 'Upload', icon: Upload, action: () => setMode('RESEARCH') },
            { label: 'Run Experiment', icon: Play, action: () => { setMode('BUILD'); sendMessage('Run the next experiment in the queue') } },
            { label: 'Synthesize', icon: FileText, action: () => { setMode('REASON'); sendMessage('Synthesize a report from all indexed knowledge') } },
          ].map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex flex-col items-center gap-1 py-1.5 bg-space-mid/40 border border-neon-blue/10 rounded-md hover:border-neon-blue/30 hover:bg-neon-blue/5 transition-all"
            >
              <Icon className="w-3.5 h-3.5 text-neon-blue/60" />
              <span className="font-mono text-[8px] text-neon-blue/60 uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
