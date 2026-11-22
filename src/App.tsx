import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown } from './components/Crown'
import { MemoryCortex } from './components/MemoryCortex'
import { ReasoningCore } from './components/ReasoningCore'
import { BuildersForge } from './components/BuildersForge'
import { Horizon } from './components/Horizon'
import { NarrationPanel } from './components/NarrationPanel'
import { useStore } from './store'

export default function App() {
  const { mode, agentRole, updateHardware, narrationActive, setNarration } = useStore()

  // Simulate live hardware telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      updateHardware({
        ram: 8.5 + Math.random() * 2,
        gpu: 2.8 + Math.random() * 1.5,
        cpu: 25 + Math.random() * 30,
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [updateHardware])

  // Auto-activate narration when NARRATOR role is selected
  useEffect(() => {
    if (agentRole === 'NARRATOR') {
      setNarration(true)
    } else {
      setNarration(false)
    }
  }, [agentRole, setNarration])

  // Layout varies by mode — each emphasizes different panels
  const layoutConfig = {
    RESEARCH: { left: 'w-[28%]', center: 'flex-1', right: 'w-[26%]' },
    BUILD: { left: 'w-[20%]', center: 'flex-1', right: 'w-[34%]' },
    REASON: { left: 'w-[24%]', center: 'flex-1', right: 'w-[24%]' },
    EXPLORE: { left: 'w-[35%]', center: 'flex-1', right: 'w-[20%]' },
  }
  const layout = layoutConfig[mode]

  return (
    <div className="h-screen w-screen flex flex-col bg-space-deepest overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30" />

      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(ellipse, #00d4ff, transparent 70%)' }}
      />

      {/* Crown */}
      <Crown />

      {/* Main panels */}
      <div className="flex-1 flex overflow-hidden relative">
        <motion.div
          className={`${layout.left} h-full overflow-hidden`}
          animate={{ width: layout.left }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <MemoryCortex />
        </motion.div>

        <motion.div
          className={`${layout.center} h-full overflow-hidden`}
          animate={{ width: layout.center }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <ReasoningCore />
        </motion.div>

        <motion.div
          className={`${layout.right} h-full overflow-hidden`}
          animate={{ width: layout.right }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <BuildersForge />
        </motion.div>

        {/* Narration overlay for NARRATOR mode */}
        {narrationActive && <NarrationPanel onClose={() => setNarration(false)} />}
      </div>

      {/* Horizon */}
      <Horizon />
    </div>
  )
}
