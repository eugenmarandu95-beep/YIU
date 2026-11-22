export type AgentRole = 'SCIENTIST' | 'ARCHITECT' | 'ORACLE' | 'GUARDIAN' | 'NARRATOR'
export type Mode = 'RESEARCH' | 'BUILD' | 'REASON' | 'EXPLORE'
export type EvidenceStatus = 'FACT' | 'MEASUREMENT' | 'HYPOTHESIS' | 'RECOMMENDATION' | 'UNCERTAINTY' | 'UNKNOWN' | 'DEPRECATED'

export interface GraphNode {
  id: number
  label: string
  type: 'concept' | 'paper' | 'code' | 'hypothesis' | 'experiment'
  connections: number
  x?: number
  y?: number
  vx?: number
  vy?: number
  status?: EvidenceStatus
  summary?: string
}

export interface GraphLink {
  source: number
  target: number
  type: 'citation' | 'dependency' | 'contradiction' | 'support'
}

export interface KnowledgeItem {
  id: string
  name: string
  type: string
  tags: string[]
  timestamp: string
  relevance: number
  status: EvidenceStatus
  source: string
}

export interface ChatMessage {
  id: string
  role: 'yiu' | 'user'
  content: string
  agent: AgentRole
  thinking?: boolean
  status?: EvidenceStatus
  timestamp: string
}

export interface ThoughtLine {
  id: string
  text: string
  step: number
}

export interface TaskItem {
  id: string
  name: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  status: 'planned' | 'active' | 'blocked' | 'needs_review' | 'complete'
  progress: number
}

export interface HardwareMetric {
  label: string
  value: number
  cap: number
  unit: string
}

export const AGENT_ROLES: { role: AgentRole; label: string; icon: string; color: string; accent: string; style: string }[] = [
  { role: 'SCIENTIST', label: 'The Scientist', icon: 'flask', color: '#00d4ff', accent: 'neon-blue', style: 'Analytical · Hypothesis-driven' },
  { role: 'ARCHITECT', label: 'The Architect', icon: 'blueprint', color: '#7c3aed', accent: 'neon-violet', style: 'Systems · Structure · Design' },
  { role: 'ORACLE', label: 'The Oracle', icon: 'eye', color: '#f59e0b', accent: 'neon-gold', style: 'Philosophical · Synthesis' },
  { role: 'GUARDIAN', label: 'The Guardian', icon: 'shield', color: '#00ff88', accent: 'hud-green', style: 'Protective · Risk review' },
  { role: 'NARRATOR', label: 'The Narrator', icon: 'book', color: '#ff88aa', accent: 'neon-pink', style: 'Graphical · Teaching · Perspective' },
]
