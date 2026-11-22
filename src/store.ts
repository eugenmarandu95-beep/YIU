import { create } from 'zustand'
import type { AgentRole, Mode, ChatMessage, ThoughtLine, TaskItem, GraphNode } from './types'
import { mockMessages, mockThoughts, mockTasks, mockNodes, mockKnowledge } from './mockData'

interface HardwareState {
  ram: number
  gpu: number
  cpu: number
}

interface YIUStore {
  mode: Mode
  agentRole: AgentRole
  messages: ChatMessage[]
  thoughts: ThoughtLine[]
  tasks: TaskItem[]
  knowledgeCount: number
  knowledgeItems: typeof mockKnowledge
  graphNodes: GraphNode[]
  selectedNode: GraphNode | null
  isThinking: boolean
  contextUsage: number
  hardware: HardwareState
  searchQuery: string
  debateMode: boolean
  narrationActive: boolean

  setMode: (mode: Mode) => void
  setAgentRole: (role: AgentRole) => void
  sendMessage: (content: string) => void
  addYiuResponse: (content: string, status?: ChatMessage['status']) => void
  addThought: (text: string) => void
  clearThoughts: () => void
  setSelectedNode: (node: GraphNode | null) => void
  setThinking: (thinking: boolean) => void
  setSearchQuery: (q: string) => void
  toggleDebate: () => void
  setNarration: (active: boolean) => void
  addTask: (task: TaskItem) => void
  updateTaskProgress: (id: string, progress: number) => void
  updateHardware: (hw: Partial<HardwareState>) => void
}

const yiuResponses: { content: string; status: ChatMessage['status']; role: AgentRole }[] = [
  { content: 'I have examined the evidence. The PAS dichotomy threshold at theta_c~0.43 separates conscious from unconscious states with zero error on reported bands. However, fine-grained calibration remains impossible from ranges alone — real calibration needs per-state measured PAS distributions with ROC/Youden analysis.', status: 'MEASUREMENT', role: 'SCIENTIST' },
  { content: 'The Kuramoto model reproduction is sound: 1000 oscillators yield r=0.866±0.003, with a 10.01 Hz PSD peak. But I must note the caveat — frequencies drawn in the alpha band make the 10 Hz peak partly by construction. The reproduced content is the coherent collective field and reversible desynchronization, not the peak frequency itself.', status: 'MEASUREMENT', role: 'SCIENTIST' },
  { content: 'A disturbance in the data. Let me look closer. The K_c offset between empirical onset (K~2.1-3.8) and mean-field (7.0) was adjudicated as estimator bias plus finite-N smearing in the solvable Lorentzian case. The pathology alternative remains open only for real connectomes. Any future K_c report must quote the exact-model bias at the same N.', status: 'HYPOTHESIS', role: 'ORACLE' },
  { content: 'Safety check complete. No consciousness claims detected. All statements are labeled by evidence status. The mini-brain v5 copied a snapshot rather than trained memory — this correction must be carried forward. Versions must not be pooled.', status: 'FACT', role: 'GUARDIAN' },
  { content: 'Consider this from a wider lens: the Wilson-Cowan to Phi bridge is the first structural answer — a derivation chain numerically realized. WC E/I to phase oscillators to Kuramoto to Phi=r, with the Fifth-Law cost on top. The honest open item is whether the onset offset is finite-size smearing or something deeper.', status: 'HYPOTHESIS', role: 'NARRATOR' },
  { content: 'I am here. Always thinking. The structural echo detection in S26 shows that shared-lens matching finds fewer but more meaningful connections than keyword matching. This suggests YIU should prioritize semantic structure over surface-level text overlap when indexing cross-domain knowledge.', status: 'MEASUREMENT', role: 'ARCHITECT' },
]

let responseIndex = 0

export const useStore = create<YIUStore>((set, get) => ({
  mode: 'RESEARCH',
  agentRole: 'SCIENTIST',
  messages: mockMessages,
  thoughts: mockThoughts,
  tasks: mockTasks,
  knowledgeCount: mockKnowledge.length,
  knowledgeItems: mockKnowledge,
  graphNodes: mockNodes,
  selectedNode: null,
  isThinking: false,
  contextUsage: 34,
  hardware: { ram: 9.2, gpu: 3.1, cpu: 34 },
  searchQuery: '',
  debateMode: false,
  narrationActive: false,

  setMode: (mode) => set({ mode }),
  setAgentRole: (agentRole) => set({ agentRole }),
  sendMessage: (content) => {
    const userMsg: ChatMessage = {
      id: `m${Date.now()}`,
      role: 'user',
      content,
      agent: get().agentRole,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
    }
    set((s) => ({ messages: [...s.messages, userMsg], isThinking: true, thoughts: [] }))

    const steps = [
      'Retrieving knowledge base...',
      'Cross-referencing documents against query...',
      'Checking evidence status and source citations...',
      'Safety check: no unsupported recommendations...',
      'Composing response with uncertainty labels...',
    ]
    steps.forEach((text, i) => {
      setTimeout(() => {
        get().addThought(text)
      }, 400 * (i + 1))
    })

    setTimeout(() => {
      const resp = yiuResponses[responseIndex % yiuResponses.length]
      responseIndex++
      get().addYiuResponse(resp.content, resp.status)
      set({ isThinking: false })
    }, 400 * (steps.length + 1))
  },
  addYiuResponse: (content, status) => {
    const role = get().agentRole
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      role: 'yiu',
      content,
      agent: role,
      status,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
    }
    set((s) => ({ messages: [...s.messages, msg] }))
  },
  addThought: (text) => {
    const thought: ThoughtLine = {
      id: `t${Date.now()}`,
      text,
      step: get().thoughts.length + 1,
    }
    set((s) => ({ thoughts: [...s.thoughts, thought] }))
  },
  clearThoughts: () => set({ thoughts: [] }),
  setSelectedNode: (selectedNode) => set({ selectedNode }),
  setThinking: (isThinking) => set({ isThinking }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleDebate: () => set((s) => ({ debateMode: !s.debateMode })),
  setNarration: (narrationActive) => set({ narrationActive }),
  addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
  updateTaskProgress: (id, progress) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, progress, status: progress >= 100 ? 'complete' : 'active' } : t)),
    })),
  updateHardware: (hw) => set((s) => ({ hardware: { ...s.hardware, ...hw } })),
}))
