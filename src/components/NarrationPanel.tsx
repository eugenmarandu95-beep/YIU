import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { X, Play, Pause } from 'lucide-react'

const timelineData = [
  { year: '2019', event: 'Entropy paper published', status: 'deprecated' },
  { year: '2024', event: 'Mini-brain v2-v5 experiments', status: 'deprecated' },
  { year: '2026-09', event: 'QHO alpha reproduction (r=0.866)', status: 'reproduced' },
  { year: '2026-09', event: 'Wilson-Cowan → Φ bridge realized', status: 'structural' },
  { year: '2026-09', event: 'PAS dichotomy threshold (θ_c≈0.43)', status: 'calibrated' },
  { year: '2026-11', event: 'YIU dashboard operational', status: 'current' },
]

const emergenceData = [
  { seed: '9401', single: 0.99, interaction: 1.41 },
  { seed: '9402', single: 0.99, interaction: 1.29 },
  { seed: '9403', single: 1.04, interaction: 1.45 },
  { seed: '9404', single: 0.92, interaction: 1.30 },
  { seed: '9405', single: 0.99, interaction: 1.33 },
  { seed: '9406', single: 1.00, interaction: 1.34 },
]

const pasBands = [
  { state: 'Anesthesia', range: [0.10, 0.25], color: '#ff3344' },
  { state: 'Deep NREM', range: [0.15, 0.30], color: '#ff8844' },
  { state: 'Relaxed Wake', range: [0.55, 0.80], color: '#00d4ff' },
  { state: 'Deep Med.', range: [0.70, 0.90], color: '#00ff88' },
]

const narrationSteps = [
  'The brain is a hierarchical network of coupled oscillators...',
  'Collective phase alignment — the order parameter Φ — is proposed as the physical substrate of consciousness.',
  'The Kuramoto model captures this: 1000 oscillators produce r=0.866, a coherent collective alpha-band field.',
  'The PAS dichotomy threshold at θ_c≈0.43 separates conscious from unconscious states with zero error on reported bands.',
  'But fine-grained calibration is impossible from ranges alone — real calibration needs per-state measured distributions.',
  'The Wilson-Cowan → Φ bridge is the first structural answer: a derivation chain numerically realized.',
]

export function NarrationPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setStep((s) => (s < narrationSteps.length - 1 ? s + 1 : s))
    }, 3000)
    return () => clearInterval(t)
  }, [playing])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 bg-space-deepest/95 backdrop-blur-sm p-3 flex flex-col overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-neon-pink uppercase tracking-wider" style={{ color: '#ff88aa' }}>
            Narrator Mode · Graphical Perspective
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPlaying(!playing)} className="text-neon-blue/60 hover:text-neon-blue">
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button onClick={onClose} className="text-hud-grey hover:text-neon-blue">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Narration text */}
      <div className="mb-3 min-h-[40px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-mono text-sm text-white/80 leading-relaxed"
            style={{ textShadow: '0 0 10px rgba(255, 136, 170, 0.3)' }}
          >
            {narrationSteps[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-3">
        {narrationSteps.map((_, i) => (
          <div
            key={i}
            className="h-0.5 flex-1 rounded-full transition-colors"
            style={{ background: i <= step ? '#ff88aa' : '#1a2540' }}
          />
        ))}
      </div>

      {/* Visual content — switches based on step */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {/* PAS Bands visualization */}
        <div className="border border-neon-blue/15 rounded-lg p-3 bg-space-mid/30">
          <h4 className="font-mono text-[10px] text-neon-blue/70 uppercase tracking-wider mb-2">PAS State Bands & Dichotomy Threshold</h4>
          <div className="space-y-2">
            {pasBands.map((band) => {
              const left = (band.range[0] / 1) * 100
              const width = ((band.range[1] - band.range[0]) / 1) * 100
              return (
                <div key={band.state} className="flex items-center gap-2">
                  <span className="font-mono text-[8px] text-white/60 w-20 shrink-0">{band.state}</span>
                  <div className="flex-1 h-3 bg-space-light rounded relative">
                    <motion.div
                      className="absolute h-full rounded"
                      style={{ background: `${band.color}40`, borderLeft: `2px solid ${band.color}`, borderRight: `2px solid ${band.color}` }}
                      initial={{ left: `${left}%`, width: 0 }}
                      animate={{ left: `${left}%`, width: `${width}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              )
            })}
            {/* Threshold line */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-neon-gold w-20 shrink-0">θ_c = 0.43</span>
              <div className="flex-1 h-3 relative">
                <motion.div
                  className="absolute top-0 bottom-0 w-0.5 bg-neon-gold"
                  style={{ left: '43%', boxShadow: '0 0 6px #f59e0b' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergence chart */}
        <div className="border border-neon-blue/15 rounded-lg p-3 bg-space-mid/30">
          <h4 className="font-mono text-[10px] text-neon-blue/70 uppercase tracking-wider mb-2">S29: Emergence Score — Single vs Interaction</h4>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={emergenceData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
              <XAxis dataKey="seed" tick={{ fill: '#4a5a7a', fontSize: 8 }} />
              <YAxis tick={{ fill: '#4a5a7a', fontSize: 8 }} />
              <Tooltip contentStyle={{ background: '#050810', border: '1px solid #00d4ff40', fontSize: 10 }} />
              <Bar dataKey="single" fill="#00d4ff" name="Single-unit" radius={[2, 2, 0, 0]} />
              <Bar dataKey="interaction" fill="#7c3aed" name="Interaction" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline */}
        <div className="border border-neon-blue/15 rounded-lg p-3 bg-space-mid/30 col-span-2">
          <h4 className="font-mono text-[10px] text-neon-blue/70 uppercase tracking-wider mb-2">Research Timeline</h4>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neon-blue/20" />
            {timelineData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-3 mb-2 ml-3"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: item.status === 'deprecated' ? '#ff3344' : item.status === 'current' ? '#00ff88' : '#00d4ff',
                    boxShadow: `0 0 4px ${item.status === 'deprecated' ? '#ff3344' : item.status === 'current' ? '#00ff88' : '#00d4ff'}`,
                  }}
                />
                <span className="font-mono text-[9px] text-neon-blue/50 w-16 shrink-0">{item.year}</span>
                <span className="text-[10px] text-white/70">{item.event}</span>
                {item.status === 'deprecated' && (
                  <span className="font-mono text-[7px] px-1 rounded bg-hud-red/20 text-hud-red uppercase">deprecated</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
