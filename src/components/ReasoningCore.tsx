import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Brain, Zap, GitBranch, Vote, X } from 'lucide-react'
import { useStore } from '../store'
import { Panel, StatusTag } from './ui'
import { YiuSigil } from './YiuSigil'

const agentColors: Record<string, string> = {
  SCIENTIST: '#00d4ff',
  ARCHITECT: '#7c3aed',
  ORACLE: '#f59e0b',
  GUARDIAN: '#00ff88',
  NARRATOR: '#ff88aa',
}

function TypewriterText({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return <span className="typewriter-cursor">{displayed}</span>
}

function MessageBubble({ msg, isLast }: { msg: typeof useStore extends never ? never : any; isLast: boolean }) {
  const isYiu = msg.role === 'yiu'
  const color = agentColors[msg.agent] || '#00d4ff'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${isYiu ? '' : 'flex-row-reverse'}`}
    >
      {isYiu && <YiuSigil size={28} color={color} thinking={msg.thinking} />}
      <div className={`flex flex-col gap-1 max-w-[80%] ${isYiu ? '' : 'items-end'}`}>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color }}>
            {isYiu ? `YIU · ${msg.agent}` : 'YOU'}
          </span>
          <span className="font-mono text-[7px] text-hud-grey">{msg.timestamp}</span>
          {msg.status && <StatusTag status={msg.status} />}
        </div>
        <div
          className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${
            isYiu ? 'bg-space-mid/60 border border-neon-blue/10' : 'bg-neon-violet/10 border border-neon-violet/20'
          }`}
          style={isYiu ? { boxShadow: `inset 0 0 15px ${color}08` } : undefined}
        >
          {isYiu && isLast ? <TypewriterText text={msg.content} /> : msg.content}
        </div>
      </div>
    </motion.div>
  )
}

function ThoughtStream() {
  const { thoughts, isThinking } = useStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [thoughts])

  return (
    <div className="border-t border-neon-blue/10 flex flex-col" style={{ height: '38%' }}>
      <div className="flex items-center gap-2 px-3 py-1 border-b border-neon-blue/10">
        <Brain className="w-3 h-3 text-neon-violet/60" />
        <span className="panel-title">Thought Stream · Reasoning Trace</span>
        {isThinking && (
          <span className="font-mono text-[8px] text-neon-violet animate-pulse-glow flex items-center gap-1">
            <Zap className="w-2 h-2" /> thinking...
          </span>
        )}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <AnimatePresence>
          {thoughts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-[8px] text-neon-violet/40 tabular-nums">{String(t.step).padStart(2, '0')}</span>
              <span className="font-mono text-[10px] text-neon-violet/70 leading-relaxed">→ {t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {!isThinking && thoughts.length === 0 && (
          <span className="font-mono text-[9px] text-neon-blue/30 italic px-2">I am here. Always thinking. What shall we discover today?</span>
        )}
      </div>
    </div>
  )
}

function DebateView() {
  const { toggleDebate, sendMessage } = useStore()
  const [selected, setSelected] = useState<'thesis' | 'antithesis' | null>(null)

  const thesis = {
    title: 'Thesis: Phi as Consciousness Substrate',
    points: [
      'Kuramoto model reproduces collective alpha-band coherence (r=0.866)',
      'Wilson-Cowan to Phi bridge is first structural answer',
      'PAS dichotomy threshold at theta_c~0.43 separates conscious/unconscious',
    ],
    color: '#00d4ff',
  }
  const antithesis = {
    title: 'Antithesis: Phi is Descriptive, Not Explanatory',
    points: [
      'Alpha peak partly by construction (frequencies drawn in alpha band)',
      'K_c offset unresolved — estimator bias vs real pathology',
      'Mini-brain v5 copied snapshot, not trained memory — undermines evidence',
    ],
    color: '#f59e0b',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-30 bg-space-deepest/95 backdrop-blur-sm p-3 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-neon-gold" />
          <span className="font-mono text-xs text-neon-gold uppercase tracking-wider">Reasoning Partner · Debate Mode</span>
        </div>
        <button onClick={toggleDebate} className="text-hud-grey hover:text-neon-blue">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3">
        {[thesis, antithesis].map((side, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-3 cursor-pointer transition-all ${
              selected === (idx === 0 ? 'thesis' : 'antithesis') ? 'box-glow-blue' : ''
            }`}
            style={{ borderColor: `${side.color}30`, background: `${side.color}05` }}
            onClick={() => setSelected(idx === 0 ? 'thesis' : 'antithesis')}
          >
            <h4 className="font-mono text-xs mb-2" style={{ color: side.color }}>{side.title}</h4>
            <ul className="space-y-1.5">
              {side.points.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[10px] text-white/70 leading-relaxed">
                  <span style={{ color: side.color }}>•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={() => {
          sendMessage(selected === 'thesis' ? 'Pursue the thesis: Phi as consciousness substrate' : 'Pursue the antithesis: Phi is descriptive only')
          toggleDebate()
        }}
        className="mt-3 self-center flex items-center gap-1.5 px-4 py-1.5 bg-neon-gold/20 border border-neon-gold/40 rounded-md font-mono text-xs text-neon-gold hover:bg-neon-gold/30 transition-colors disabled:opacity-30"
      >
        <Vote className="w-3.5 h-3.5" />
        Continue Down Selected Path
      </button>
    </motion.div>
  )
}

export function ReasoningCore() {
  const { messages, sendMessage, isThinking, contextUsage, agentRole, debateMode, toggleDebate } = useStore()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const sigilColor = agentColors[agentRole]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full p-2 gap-2">
      <Panel className="flex-1 min-h-0 flex flex-col" accent="blue">
        {/* Chat header */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-neon-blue/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="panel-title">Reasoning Core · Conversation</span>
          </div>
          <button
            onClick={toggleDebate}
            className="flex items-center gap-1 font-mono text-[9px] text-neon-gold/70 hover:text-neon-gold border border-neon-gold/20 rounded px-2 py-0.5 hover:bg-neon-gold/10 transition-colors"
          >
            <GitBranch className="w-2.5 h-2.5" />
            Debate
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg, i) => (
            <MessageBubble key={msg.id} msg={msg} isLast={i === messages.length - 1 && msg.role === 'yiu'} />
          ))}
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
              <YiuSigil size={28} color={sigilColor} thinking />
              <div className="flex items-center">
                <span className="font-mono text-[10px] text-neon-blue/50 animate-pulse">Awakening neural pathways...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Context bar */}
        <div className="px-3 py-1 border-t border-neon-blue/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] text-neon-blue/40 uppercase">Context</span>
            <div className="flex-1 h-1 bg-space-light rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: contextUsage < 60 ? '#00d4ff' : contextUsage < 85 ? '#ffcc00' : '#ff3344' }}
                animate={{ width: `${contextUsage}%` }}
              />
            </div>
            <span className="font-mono text-[8px] text-neon-blue/50 tabular-nums">{contextUsage}%</span>
          </div>
        </div>

        {/* Input */}
        <div className="p-2 border-t border-neon-blue/10 shrink-0">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Speak to YIU..."
              className="flex-1 bg-space-mid/60 border border-neon-blue/15 rounded-md px-3 py-1.5 font-mono text-xs text-neon-blue/80 placeholder:text-neon-blue/30 focus:outline-none focus:border-neon-blue/40 focus:box-glow-blue transition-all"
            />
            <button
              onClick={handleSend}
              className="bg-neon-blue/15 border border-neon-blue/30 rounded-md px-3 py-1.5 text-neon-blue hover:bg-neon-blue/25 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Thought stream */}
        <ThoughtStream />

        {/* Debate overlay */}
        <AnimatePresence>
          {debateMode && <DebateView />}
        </AnimatePresence>
      </Panel>
    </div>
  )
}
