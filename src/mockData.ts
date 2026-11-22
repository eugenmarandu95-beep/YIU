import type { GraphNode, GraphLink, KnowledgeItem, ChatMessage, TaskItem, ThoughtLine } from './types'

// Knowledge graph — drawn from actual NEXUS/MAI research materials
export const mockNodes: GraphNode[] = [
  { id: 1, label: 'Quantum Coherence', type: 'concept', connections: 7, status: 'HYPOTHESIS', summary: 'Brain as hierarchical network of coupled oscillators; collective phase alignment as consciousness substrate. Kuramoto model with complex order parameter.' },
  { id: 2, label: 'Neural Scaling Laws', type: 'paper', connections: 12, status: 'FACT', summary: 'Scaling relationships across neural system sizes. ~86B neurons, ~10^14-10^15 synapses.' },
  { id: 3, label: 'Entropy & Information', type: 'concept', connections: 9, status: 'HYPOTHESIS', summary: 'Information-theoretic framework connecting entropy to cognitive states. 3 contradictions found between 2019 paper and recent hypothesis.' },
  { id: 4, label: 'Unified Field Hypothesis', type: 'hypothesis', connections: 4, status: 'HYPOTHESIS', summary: 'Proposed unification of coherence fields with RG theory. Status: HYPOTHESIS/SPECULATIVE for physical interpretation.' },
  { id: 5, label: 'neuro_qho_alpha.py', type: 'code', connections: 3, status: 'MEASUREMENT', summary: 'QHO alpha claim: 1000 Kuramoto oscillators, f~N(10,1.5)Hz. r=0.866±0.003. Alpha-blocking reproduced. VERDICT: REPRODUCED as modeled.' },
  { id: 6, label: 'neuro_microscopic_bridge.py', type: 'code', connections: 5, status: 'MEASUREMENT', summary: 'Wilson-Cowan to Phi bridge. WC E/I -> phase oscillators -> Kuramoto -> Phi=r. r(K): 0.035->0.913. FIRST STRUCTURAL ANSWER.' },
  { id: 7, label: 'neuro_pas_threshold.py', type: 'code', connections: 3, status: 'MEASUREMENT', summary: 'PAS threshold calibration. Dichotomy threshold exists at theta_c~0.43. Fine-grained threshold impossible from ranges alone.' },
  { id: 8, label: 'Kuramoto Model', type: 'concept', connections: 8, status: 'FACT', summary: 'Coupled oscillator model with complex order parameter r*e^(i*psi). Mean-field K_c=15.04 (Gaussian).' },
  { id: 9, label: 'Renormalization Group', type: 'concept', connections: 6, status: 'HYPOTHESIS', summary: 'Scale transformations and universality classes. Connected to coherence field theory.' },
  { id: 10, label: '41 Fields of Coherence', type: 'concept', connections: 10, status: 'HYPOTHESIS', summary: 'Comprehensive framework mapping 41 distinct coherence fields across physics, biology, and information theory.' },
  { id: 11, label: 'Fifth Law Formulation', type: 'paper', connections: 5, status: 'HYPOTHESIS', summary: 'Metabolic cost of maintained order: P(Phi) ~ Phi/(1-Phi)^alpha. CORRECTED, pending.' },
  { id: 12, label: 'Residual Inheritance Theory', type: 'hypothesis', connections: 4, status: 'HYPOTHESIS', summary: 'Proposed framework for inherited structural patterns. Requires provenance review.' },
  { id: 13, label: 'S26: Echo Detection', type: 'experiment', connections: 4, status: 'MEASUREMENT', summary: 'Cross-domain structural echo detection. Keyword vs structural echo via shared lens. 30 seeds.' },
  { id: 14, label: 'S27: Purpose Coordination', type: 'experiment', connections: 3, status: 'MEASUREMENT', summary: 'Maintaining main question across subtasks. Task isolation vs purpose coordination.' },
  { id: 15, label: 'S28: Multi-Brain Coherence', type: 'experiment', connections: 5, status: 'MEASUREMENT', summary: 'Coordinate specialists without conflict. Isolated vs blackboard vs blackboard+permissions.' },
  { id: 16, label: 'S29: Emergence Score', type: 'experiment', connections: 2, status: 'MEASUREMENT', summary: 'Single-unit vs interaction emergence. Interaction score ~1.2-1.5x single-unit across 30 seeds.' },
  { id: 17, label: 'S30: Resilience Recovery', type: 'experiment', connections: 2, status: 'MEASUREMENT', summary: 'Recovery vs no-recovery resilience benchmark. Scores ~0.34-0.47 across seeds.' },
  { id: 18, label: 'S31: Adaptation Score', type: 'experiment', connections: 2, status: 'MEASUREMENT', summary: 'Adaptation vs no-adaptation benchmark. Scores ~0.20-0.26 across seeds.' },
  { id: 19, label: 'PAS Threshold (θ_c≈0.43)', type: 'concept', connections: 6, status: 'MEASUREMENT', summary: 'Phase Alignment Sum. Dichotomy separates unconscious vs conscious at zero error. theta_c=0.43 suggested.' },
  { id: 20, label: 'SMMT Seizure Detection', type: 'paper', connections: 4, status: 'MEASUREMENT', summary: '80% sensitivity within 30s pre-onset, <10% FP over >24h, mean lead time 28s.' },
  { id: 21, label: 'Mini-Brain v2-v5', type: 'hypothesis', connections: 7, status: 'DEPRECATED', summary: 'Historical mini-brain research. v5 copied a snapshot, not trained memory. Versions must not be pooled. No consciousness evidence.' },
  { id: 22, label: 'D4 Telemetry', type: 'hypothesis', connections: 3, status: 'HYPOTHESIS', summary: 'D4 encoding/decoding experiment. Requires finite codebook. Compare with uncoded/equal-rate alternatives.' },
]

export const mockLinks: GraphLink[] = [
  { source: 1, target: 8, type: 'support' },
  { source: 1, target: 10, type: 'support' },
  { source: 1, target: 11, type: 'citation' },
  { source: 1, target: 4, type: 'support' },
  { source: 1, target: 19, type: 'support' },
  { source: 4, target: 3, type: 'contradiction' },
  { source: 4, target: 9, type: 'support' },
  { source: 4, target: 10, type: 'support' },
  { source: 4, target: 12, type: 'support' },
  { source: 5, target: 8, type: 'dependency' },
  { source: 5, target: 1, type: 'citation' },
  { source: 5, target: 19, type: 'dependency' },
  { source: 6, target: 8, type: 'dependency' },
  { source: 6, target: 1, type: 'citation' },
  { source: 6, target: 11, type: 'citation' },
  { source: 7, target: 19, type: 'dependency' },
  { source: 7, target: 1, type: 'citation' },
  { source: 8, target: 2, type: 'citation' },
  { source: 9, target: 10, type: 'support' },
  { source: 9, target: 4, type: 'support' },
  { source: 10, target: 11, type: 'citation' },
  { source: 10, target: 1, type: 'support' },
  { source: 11, target: 1, type: 'citation' },
  { source: 12, target: 10, type: 'support' },
  { source: 13, target: 10, type: 'citation' },
  { source: 13, target: 9, type: 'citation' },
  { source: 14, target: 13, type: 'dependency' },
  { source: 15, target: 14, type: 'dependency' },
  { source: 15, target: 13, type: 'dependency' },
  { source: 16, target: 1, type: 'citation' },
  { source: 17, target: 1, type: 'citation' },
  { source: 18, target: 1, type: 'citation' },
  { source: 19, target: 20, type: 'citation' },
  { source: 20, target: 2, type: 'citation' },
  { source: 21, target: 1, type: 'contradiction' },
  { source: 21, target: 19, type: 'contradiction' },
  { source: 22, target: 2, type: 'citation' },
]

export const mockKnowledge: KnowledgeItem[] = [
  { id: 'k1', name: 'Coherence in Neuroscience & Consciousness.md', type: 'markdown', tags: ['xbm', 'neuroscience', 'consciousness', 'PAS'], timestamp: '2026-09-01', relevance: 0.98, status: 'HYPOTHESIS', source: 'EVX corpus' },
  { id: 'k2', name: 'NEXUS_CORE_ARCHITECTURE.md', type: 'markdown', tags: ['architecture', 'cognitive-core'], timestamp: '2026-11-15', relevance: 0.95, status: 'FACT', source: 'NEXUS system' },
  { id: 'k3', name: '01_RUN_SCIENCE_SUITE.py', type: 'python', tags: ['simulation', 'S26', 'S27', 'S28'], timestamp: '2026-11-22', relevance: 0.92, status: 'MEASUREMENT', source: 'YIU sims' },
  { id: 'k4', name: '02_NEURAL_NETWORK_MEMORY_AND_KNOWLEDGE.md', type: 'markdown', tags: ['architecture', 'neural', 'memory'], timestamp: '2026-11-22', relevance: 0.90, status: 'FACT', source: 'MAI BRAIN' },
  { id: 'k5', name: 'SAFETY_CONSTITUTION.md', type: 'markdown', tags: ['safety', 'constitution', 'rules'], timestamp: '2026-11-15', relevance: 0.88, status: 'FACT', source: 'NEXUS system' },
  { id: 'k6', name: '05_FAILURE_MODES_RECOVERY.md', type: 'markdown', tags: ['failure', 'recovery', 'F01-F16'], timestamp: '2026-11-22', relevance: 0.85, status: 'FACT', source: 'MAI BRAIN' },
  { id: 'k7', name: 'EVALUATION_PLAN.md', type: 'markdown', tags: ['evaluation', 'baselines', 'metrics'], timestamp: '2026-11-15', relevance: 0.82, status: 'FACT', source: 'NEXUS system' },
  { id: 'k8', name: 'agent_registry.json', type: 'json', tags: ['registry', 'domains'], timestamp: '2026-11-15', relevance: 0.80, status: 'FACT', source: 'NEXUS system' },
  { id: 'k9', name: '02_METRICS.csv', type: 'csv', tags: ['metrics', 'S29', 'S30', 'S31'], timestamp: '2026-11-22', relevance: 0.78, status: 'MEASUREMENT', source: 'YIU sims' },
  { id: 'k10', name: 'RETIRED_CLAIMS.md', type: 'markdown', tags: ['retired', 'deprecated', 'corrections'], timestamp: '2026-11-20', relevance: 0.72, status: 'DEPRECATED', source: 'MAI BRAIN' },
]

export const mockMessages: ChatMessage[] = [
  { id: 'm1', role: 'yiu', content: 'I have indexed your 47 research documents. I found 3 potential contradictions between your 2019 entropy paper and your recent hypothesis. Shall we reason through them together?', agent: 'ORACLE', status: 'HYPOTHESIS', timestamp: '14:22:01' },
  { id: 'm2', role: 'user', content: 'Yes, show me the contradictions', agent: 'SCIENTIST', timestamp: '14:22:15' },
  { id: 'm3', role: 'yiu', content: 'Initiating deep reasoning trace. The first contradiction concerns the role of the order parameter Phi: your 2019 paper treats it as a descriptive metric, while the recent hypothesis elevates it to a physical substrate. The second involves the Fifth Law metabolic cost function — the exponent alpha was fit differently in each. The third is subtle: your mini-brain v5 copied a snapshot rather than learning, which undermines the memory evidence the hypothesis relies upon.', agent: 'SCIENTIST', thinking: true, status: 'HYPOTHESIS', timestamp: '14:22:30' },
]

export const mockThoughts: ThoughtLine[] = [
  { id: 't1', text: 'Retrieving knowledge base...', step: 1 },
  { id: 't2', text: 'Cross-referencing 47 documents against active hypothesis...', step: 2 },
  { id: 't3', text: 'Detected 3 contradictions in entropy/coherence claims', step: 3 },
  { id: 't4', text: 'Checking evidence status: HYPOTHESIS vs MEASUREMENT vs FACT', step: 4 },
  { id: 't5', text: 'Safety check: no consciousness claims, no unsupported recommendations', step: 5 },
  { id: 't6', text: 'Composing response with citations and uncertainty labels...', step: 6 },
]

// Task queue — drawn from the actual MAI BRAIN build stages
export const mockTasks: TaskItem[] = [
  { id: 'T001', name: 'Approve MAI scope and relation to NEXUS', priority: 'P0', status: 'complete', progress: 100 },
  { id: 'T002', name: 'Record actual terminal hardware/OS', priority: 'P0', status: 'complete', progress: 100 },
  { id: 'T003', name: 'Locate/export original TOLBIT folder for ingestion', priority: 'P0', status: 'active', progress: 45 },
  { id: 'T004', name: 'Inventory rights, private data and original results', priority: 'P0', status: 'active', progress: 30 },
  { id: 'T005', name: 'Build B01 scaffold and restart/backup test', priority: 'P1', status: 'needs_review', progress: 75 },
  { id: 'T006', name: 'Build B02 extractors; never execute source scripts', priority: 'P1', status: 'planned', progress: 0 },
  { id: 'T007', name: 'Write human-reviewed retrieval/citation test questions', priority: 'P1', status: 'planned', progress: 0 },
  { id: 'T008', name: 'Build B03 retrieval and evidence display', priority: 'P1', status: 'planned', progress: 0 },
  { id: 'T009', name: 'Implement B04 tasks and approved correction memory', priority: 'P1', status: 'planned', progress: 0 },
  { id: 'T010', name: 'Run S01-S05 before enabling domain action', priority: 'P2', status: 'planned', progress: 0 },
  { id: 'T011', name: 'Review legacy mini-brain code/results independently', priority: 'P2', status: 'blocked', progress: 15 },
  { id: 'T012', name: 'Curate domain sources; maize/health need specialist material', priority: 'P2', status: 'planned', progress: 0 },
  { id: 'T013', name: 'Test optional neural predictor, lattice and D4 separately', priority: 'P3', status: 'planned', progress: 0 },
  { id: 'T014', name: 'Run domain simulations and approve pilot scope', priority: 'P3', status: 'planned', progress: 0 },
]

export const mockCode = `"""YIU Eyes of MAI — S26: Echo Detection
Cross-domain structural echo vs keyword match.
CPU-only NumPy. No API or LLM required.
"""
import numpy as np

SEEDS = list(range(9301, 9331))

files = [
    'coherence_field', '41_fields', 'renormalization_group',
    'cef', 'ced', 'mini_brain', 'd4',
    'energy', 'residual_inheritance', 'commercial'
]

lens_map = {
    'coherence_field': 'coherence',
    '41_fields': 'all',
    'renormalization_group': 'scale',
    'cef': 'emergence',
    'ced': 'temporal_dynamics',
    'mini_brain': 'temporal_dynamics',
    'd4': 'information_flow',
    'energy': 'resilience',
    'residual_inheritance': 'inheritance',
    'commercial': 'purpose'
}

for seed in SEEDS:
    rng = np.random.default_rng(seed)
    for mode in ['keyword', 'structural_echo']:
        echoes = 0
        for f in files:
            for g in files:
                if f != g:
                    if mode == 'keyword':
                        if any(k in g for k in f.split('_')):
                            echoes += 1
                    else:
                        if lens_map[f] == lens_map[g]:
                            echoes += 1
        print(f"seed={seed} mode={mode} echoes={echoes}")
`

export const mockTerminalOutput = `[YIU://terminal] boot sequence initiated...
[14:22:01] awakening neural pathways...
[14:22:01] loading cognitive core: NEXUS
[14:22:02] mounting memory cortex... 47 documents indexed
[14:22:02] calibration check: RAM 9.2/15 GB | GPU 3.1/8 GB | CPU 34%
[14:22:03] agent role: SCIENTIST engaged
[14:22:03] > run S26_echo_detection.py
[14:22:04] seeds: 9301..9330 (30 trials)
[14:22:05] keyword mode: 18 echo links (constant)
[14:22:05] structural_echo mode: 14 echo links (constant)
[14:22:06] assertions passed: 3/3
[14:22:06] metrics rows: 450
[14:22:07] checkpoint saved: S26 complete
[14:22:07] next: S29 Field Validation Design
[14:22:08] _`
