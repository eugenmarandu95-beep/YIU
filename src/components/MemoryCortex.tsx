import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Search, Sparkles, X, Network } from 'lucide-react'
import { useStore } from '../store'
import { mockNodes, mockLinks, mockKnowledge } from '../mockData'
import { Panel, StatusTag } from './ui'
import type { GraphNode } from '../types'

const nodeColors: Record<string, string> = {
  concept: '#00d4ff',
  paper: '#7c3aed',
  code: '#00ff88',
  hypothesis: '#f59e0b',
  experiment: '#ff88aa',
}

const nodeShapes: Record<string, string> = {
  concept: 'circle',
  paper: 'square',
  code: 'triangle',
  hypothesis: 'diamond',
  experiment: 'hexagon',
}

export function MemoryCortex() {
  const { setSelectedNode, selectedNode, sendMessage } = useStore()
  const [dragOver, setDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [positions, setPositions] = useState<{ id: number; x: number; y: number }[]>([])

  // Initialize node positions in a force-directed-ish layout
  useEffect(() => {
    const w = 300, h = 220, cx = w / 2, cy = h / 2
    const pos = mockNodes.map((n, i) => {
      const angle = (i / mockNodes.length) * Math.PI * 2
      const radius = 40 + (i % 3) * 30
      return { id: n.id, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
    })
    setPositions(pos)
  }, [])

  // Simple force simulation tick
  useEffect(() => {
    if (positions.length === 0) return
    const interval = setInterval(() => {
      setPositions((prev) => {
        const w = 300, h = 220
        return prev.map((p) => {
          let fx = 0, fy = 0
          // Repulsion
          prev.forEach((q) => {
            if (q.id === p.id) return
            const dx = p.x - q.x, dy = p.y - q.y
            const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
            if (dist < 80) {
              fx += (dx / dist) * (80 - dist) * 0.02
              fy += (dy / dist) * (80 - dist) * 0.02
            }
          })
          // Attraction via links
          mockLinks.forEach((l) => {
            if (l.source === p.id) {
              const q = prev.find((x) => x.id === l.target)
              if (q) {
                const dx = q.x - p.x, dy = q.y - p.y
                const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
                fx += (dx / dist) * 0.005
                fy += (dy / dist) * 0.005
              }
            }
            if (l.target === p.id) {
              const q = prev.find((x) => x.id === l.source)
              if (q) {
                const dx = q.x - p.x, dy = q.y - p.y
                const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
                fx += (dx / dist) * 0.005
                fy += (dy / dist) * 0.005
              }
            }
          })
          // Center gravity
          fx += (w / 2 - p.x) * 0.002
          fy += (h / 2 - p.y) * 0.002
          return { ...p, x: Math.max(15, Math.min(w - 15, p.x + fx)), y: Math.max(15, Math.min(h - 15, p.y + fy)) }
        })
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    setUploadStatus('Knowledge received. I am growing.')
    setTimeout(() => setUploadStatus(null), 3000)
  }

  const getPos = (id: number) => positions.find((p) => p.id === id)

  const drawShape = (shape: string, x: number, y: number, r: number, color: string, glow: boolean) => {
    const style = { filter: glow ? `drop-shadow(0 0 6px ${color})` : undefined }
    switch (shape) {
      case 'circle':
        return <circle cx={x} cy={y} r={r} fill={`${color}30`} stroke={color} strokeWidth="1.5" style={style} />
      case 'square':
        return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} fill={`${color}30`} stroke={color} strokeWidth="1.5" style={style} />
      case 'triangle':
        return <polygon points={`${x},${y - r} ${x + r},${y + r} ${x - r},${y + r}`} fill={`${color}30`} stroke={color} strokeWidth="1.5" style={style} />
      case 'diamond':
        return <polygon points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`} fill={`${color}30`} stroke={color} strokeWidth="1.5" style={style} />
      case 'hexagon': {
        const pts = Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2
          return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`
        }).join(' ')
        return <polygon points={pts} fill={`${color}30`} stroke={color} strokeWidth="1.5" style={style} />
      }
      default:
        return <circle cx={x} cy={y} r={r} fill={`${color}30`} stroke={color} strokeWidth="1.5" style={style} />
    }
  }

  const filteredKnowledge = mockKnowledge.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase()) || k.tags.some((t) => t.includes(search.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-2 h-full p-2">
      {/* Upload Zone */}
      <Panel title="Knowledge Intake Port" accent="blue">
        <div className="p-3">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border border-dashed rounded-lg p-4 text-center transition-all cursor-pointer ${
              dragOver ? 'border-neon-blue/60 bg-neon-blue/5 box-glow-blue' : 'border-neon-blue/20 hover:border-neon-blue/40'
            }`}
          >
            <Upload className="w-5 h-5 mx-auto mb-1.5 text-neon-blue/50" />
            <p className="font-mono text-[10px] text-neon-blue/60">
              {uploadStatus || 'Drop PDFs, notes, datasets, code'}
            </p>
            <p className="font-mono text-[8px] text-neon-blue/30 mt-0.5">
              SHA-256 manifest · Format extraction · Chunking
            </p>
          </div>
        </div>
      </Panel>

      {/* Knowledge Graph */}
      <Panel title="Knowledge Graph · Force-Directed" accent="violet" className="flex-1 min-h-0">
        <div className="relative h-full">
          <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 300 220" className="absolute inset-0">
            {/* Links */}
            {mockLinks.map((l, i) => {
              const s = getPos(l.source), t = getPos(l.target)
              if (!s || !t) return null
              const color = l.type === 'contradiction' ? '#ff3344' : l.type === 'support' ? '#00ff88' : l.type === 'dependency' ? '#f59e0b' : '#4a5a7a'
              return (
                <line
                  key={i}
                  x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                  stroke={color}
                  strokeWidth="0.5"
                  opacity={hoveredNode === l.source || hoveredNode === l.target ? 0.6 : 0.2}
                  strokeDasharray={l.type === 'contradiction' ? '3 2' : undefined}
                />
              )
            })}
            {/* Nodes */}
            {mockNodes.map((n) => {
              const pos = getPos(n.id)
              if (!pos) return null
              const color = nodeColors[n.type]
              const shape = nodeShapes[n.type]
              const isHovered = hoveredNode === n.id
              const isSelected = selectedNode?.id === n.id
              const r = 4 + Math.min(n.connections, 12) * 0.4
              return (
                <g key={n.id}>
                  <motion.circle
                    cx={pos.x} cy={pos.y}
                    r={r + 3}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    animate={{ opacity: [0.2, 0.5, 0.2], r: [r + 2, r + 4, r + 2] }}
                    transition={{ duration: 2 + (n.id % 3), repeat: Infinity, delay: n.id * 0.1 }}
                  />
                  <g
                    onClick={() => setSelectedNode(n)}
                    onMouseEnter={() => setHoveredNode(n.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {drawShape(shape, pos.x, pos.y, r, color, isHovered || isSelected)}
                  </g>
                  {(isHovered || isSelected) && (
                    <text x={pos.x} y={pos.y - r - 3} textAnchor="middle" fill={color} fontSize="6" fontFamily="monospace" className="pointer-events-none">
                      {n.label.length > 20 ? n.label.slice(0, 18) + '..' : n.label}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-1 left-1 flex flex-wrap gap-1.5">
            {Object.entries(nodeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                <span className="font-mono text-[7px] uppercase text-hud-grey">{type}</span>
              </div>
            ))}
          </div>

          {/* Node detail card */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-2 right-2 w-44 bg-space-deep/95 border border-neon-violet/30 rounded-lg p-2.5 box-glow-violet"
              >
                <button onClick={() => setSelectedNode(null)} className="absolute top-1.5 right-1.5 text-hud-grey hover:text-neon-blue">
                  <X className="w-3 h-3" />
                </button>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: nodeColors[selectedNode.type] }} />
                  <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: nodeColors[selectedNode.type] }}>
                    {selectedNode.type}
                  </span>
                  {selectedNode.status && <StatusTag status={selectedNode.status} />}
                </div>
                <h4 className="text-xs text-white/90 font-medium mb-1.5 leading-tight">{selectedNode.label}</h4>
                <p className="font-mono text-[8px] text-neon-blue/50 leading-relaxed mb-2">{selectedNode.summary}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Network className="w-2.5 h-2.5 text-neon-violet/60" />
                  <span className="font-mono text-[8px] text-neon-blue/50">{selectedNode.connections} connections</span>
                </div>
                <button
                  onClick={() => {
                    sendMessage(`Reason about: ${selectedNode.label}`)
                    setSelectedNode(null)
                  }}
                  className="w-full bg-neon-violet/20 border border-neon-violet/40 rounded py-1 font-mono text-[9px] text-neon-violet hover:bg-neon-violet/30 transition-colors flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  Reason About This
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Panel>

      {/* Memory Index */}
      <Panel title={`Memory Index · ${mockKnowledge.length} items`} accent="blue" className="flex-1 min-h-0">
        <div className="flex flex-col h-full">
          <div className="px-2 py-1.5 border-b border-neon-blue/10">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-neon-blue/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by name or tag..."
                className="w-full bg-space-mid/40 border border-neon-blue/10 rounded pl-6 pr-2 py-1 font-mono text-[9px] text-neon-blue/70 placeholder:text-neon-blue/30 focus:outline-none focus:border-neon-blue/30"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {filteredKnowledge.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-space-mid/40 border border-neon-blue/5 rounded p-1.5 hover:border-neon-blue/20 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-white/80 truncate flex-1">{item.name}</span>
                  <StatusTag status={item.status} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[7px] text-hud-grey">{item.timestamp}</span>
                  <span className="font-mono text-[7px] text-neon-blue/40">{item.type}</span>
                  <div className="flex-1 h-0.5 bg-space-light rounded-full overflow-hidden">
                    <div className="h-full bg-neon-blue/50" style={{ width: `${item.relevance * 100}%` }} />
                  </div>
                  <span className="font-mono text-[7px] text-neon-blue/50">{(item.relevance * 100).toFixed(0)}%</span>
                </div>
                <div className="flex flex-wrap gap-0.5 mt-0.5">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="font-mono text-[6px] px-1 py-px rounded bg-neon-blue/10 text-neon-blue/50 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  )
}
