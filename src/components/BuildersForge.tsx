import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Terminal as TerminalIcon, FlaskConical, PenTool, Eye, Shield, BookOpen, Layers } from 'lucide-react'
import { useStore } from '../store'
import { Panel } from './ui'
import { mockCode, mockTerminalOutput } from '../mockData'
import type { AgentRole } from '../types'

const iconMap: Record<string, typeof FlaskConical> = {
  flask: FlaskConical,
  blueprint: Layers,
  eye: Eye,
  shield: Shield,
  book: BookOpen,
}

const roleConfig: { role: AgentRole; label: string; icon: string; color: string; style: string }[] = [
  { role: 'SCIENTIST', label: 'The Scientist', icon: 'flask', color: '#00d4ff', style: 'Analytical · Hypothesis-driven' },
  { role: 'ARCHITECT', label: 'The Architect', icon: 'blueprint', color: '#7c3aed', style: 'Systems · Structure · Design' },
  { role: 'ORACLE', label: 'The Oracle', icon: 'eye', color: '#f59e0b', style: 'Philosophical · Synthesis' },
  { role: 'GUARDIAN', label: 'The Guardian', icon: 'shield', color: '#00ff88', style: 'Protective · Risk review' },
  { role: 'NARRATOR', label: 'The Narrator', icon: 'book', color: '#ff88aa', style: 'Graphical · Teaching · Perspective' },
]

export function BuildersForge() {
  const { agentRole, setAgentRole } = useStore()
  const [code, setCode] = useState(mockCode)
  const [output, setOutput] = useState(mockTerminalOutput)
  const [running, setRunning] = useState(false)

  const handleRun = () => {
    setRunning(true)
    setOutput('[YIU://terminal] initiating execution...\n[14:25:01] awakening neural pathways...\n[14:25:01] parsing S26_echo_detection.py...')
    setTimeout(() => {
      setOutput(prev => prev + '\n[14:25:02] seeds: 9301..9330 (30 trials)\n[14:25:03] keyword mode: 18 echo links\n[14:25:03] structural_echo mode: 14 echo links\n[14:25:04] assertions passed: 3/3\n[14:25:04] metrics rows: 450\n[14:25:05] checkpoint saved: S26 complete\n[14:25:05] _')
      setRunning(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-2 h-full p-2">
      {/* Agent Role Selector */}
      <Panel title="Agent Persona · Role Selector" accent="gold">
        <div className="p-2 grid grid-cols-1 gap-1">
          {roleConfig.map(({ role, label, icon, color, style }) => {
            const Icon = iconMap[icon] || FlaskConical
            const active = agentRole === role
            return (
              <button
                key={role}
                onClick={() => setAgentRole(role)}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md border transition-all text-left ${
                  active ? 'box-glow-blue' : 'border-neon-blue/5 hover:border-neon-blue/20'
                }`}
                style={active ? { borderColor: `${color}50`, background: `${color}10` } : undefined}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 border"
                  style={{ borderColor: `${color}30`, background: `${color}10` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] font-bold" style={{ color: active ? color : '#e0e8f0' }}>
                    {label}
                  </div>
                  <div className="font-mono text-[7px] text-hud-grey truncate">{style}</div>
                </div>
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                    style={{ background: color }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </Panel>

      {/* Code Editor */}
      <Panel title="Code Editor · Monaco" accent="violet" className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between px-2 py-1 border-b border-neon-blue/10 shrink-0">
          <span className="font-mono text-[9px] text-neon-blue/50">S26_echo_detection.py</span>
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded border border-hud-green/30 text-hud-green hover:bg-hud-green/10 transition-colors disabled:opacity-50"
          >
            <Play className="w-2.5 h-2.5" />
            {running ? 'Running...' : 'Run'}
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full bg-space-deepest text-neon-blue/80 font-mono text-[10px] leading-relaxed p-2 resize-none focus:outline-none"
          style={{ tabSize: 4 }}
        />
      </Panel>

      {/* Output Terminal */}
      <Panel title="Output Terminal" accent="green" className="shrink-0" >
        <div className="flex items-center gap-1.5 px-2 py-0.5 border-b border-neon-blue/10">
          <TerminalIcon className="w-2.5 h-2.5 text-hud-green/60" />
          <span className="font-mono text-[8px] text-hud-green/50">yiu://terminal</span>
        </div>
        <div className="h-24 overflow-y-auto p-2 font-mono text-[9px] text-hud-green/80 leading-relaxed whitespace-pre-wrap">
          <AnimatePresence>
            <motion.div
              key={output}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
            >
              {output}
              {running && <span className="animate-pulse">▊</span>}
            </motion.div>
          </AnimatePresence>
        </div>
      </Panel>
    </div>
  )
}
