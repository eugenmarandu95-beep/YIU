# NEXUS CORE ARCHITECTURE

NEXUS is one cognitive architecture with five domain packs.

## Cognitive loop

```text
Sense
→ Perceive
→ Retrieve knowledge
→ Update memory
→ Detect temporal pattern
→ Predict
→ Plan
→ Select action
→ Request approval if needed
→ Act or respond
→ Observe outcome
→ Learn
→ Explain
```

## Core modules

| Module | Function | Output |
|---|---|---|
| Perception | Converts raw input into structured state | State vector |
| Retrieval | Finds approved knowledge | Passages and citations |
| Memory | Stores facts, episodes, corrections, preferences | Memory records |
| Mini-brain | Detects temporal patterns and anomalies | Risk and novelty signals |
| Prediction | Estimates likely next states | Forecast with uncertainty |
| Planner | Creates a safe multi-step plan | Action plan |
| Reasoner | Explains and synthesizes evidence | Draft response |
| Action layer | Executes approved actions | Tool calls or messages |
| Safety | Blocks unsafe or unsupported actions | Approval requirement |
| Learner | Updates from verified feedback | Updated policy/memory |
| Evaluator | Compares against baselines | Benchmark report |
| Explainer | Provides traceable explanation | Citation and rationale |

## Domain pack contract

Every niche brain must provide:

```json
{
  "domain": "maize",
  "knowledge_sources": [],
  "tools": [],
  "actions": [],
  "safety_rules": [],
  "evaluation_tasks": [],
  "human_approval_rules": [],
  "data_schema": {},
  "publication_plan": []
}
```

## Non-negotiable rules

1. Never present a hypothesis as proven.
2. Never diagnose disease or prescribe treatment.
3. Never bypass utility protection systems.
4. Never take high-risk action without approval.
5. Never answer without checking the knowledge base.
6. Never hide uncertainty.
7. Never claim consciousness.
8. Always cite sources.
9. Always preserve an audit trail.
10. Always allow human override.
