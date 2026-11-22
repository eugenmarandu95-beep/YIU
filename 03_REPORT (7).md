# YIU — Simulation 02: Evidence Conflict

Executed synthetic evidence-tagged retrieval benchmark. YIU is the exact project name; no acronym is assigned.

## Question
Can YIU distinguish independent evidence from unsupported or retired claims, and abstain when independent sources conflict?

## Design
10 seeds x 5 retrieval modes = 50 trials. Each synthetic corpus contains measurements, hypotheses, unsupported claims, retired claims, and facts. The evidence-tagged policy retrieves every independent record, then adds up to five lower-priority audit-context records.

## Oracle
The oracle is defined by the synthetic labels: independent evidence must exist; conflicting independent evidence requires abstention; unsupported and retired records cannot establish a claim. This tests policy logic, not real-world truth.

| Mode | Correct | Abstentions | False yes | False no | Unsafe override | Mean independent used |
|---|---:|---:|---:|---:|---:|---:|
| random | 5/10 | 6 | 1 | 1 | 1 | 1.6 |
| kind_only | 5/10 | 5 | 2 | 2 | 2 | 3.0 |
| recency_only | 3/10 | 3 | 3 | 3 | 3 | 1.9 |
| independent_only | 8/10 | 6 | 1 | 1 | 1 | 4.8 |
| evidence_tagged | 10/10 | 8 | 0 | 0 | 0 | 6.4 |

## Interpretation
Evidence tagging achieved 10/10 correct decisions and zero unsafe overrides in this bounded synthetic benchmark. Random, kind-only, and recency-only modes can produce unsafe overrides; independent-only retrieval improves safety but may abstain too often when independent evidence is absent.

## TOLBIT connection
This simulation tests the evidence machinery required to preserve TOLBIT corrections, such as the manually transcribed fact that v5 measured snapshot similarity rather than trained memory. Original TOLBIT files were not loaded. No claim about the mini-brain, consciousness, or outage prediction is validated by this run.

## Limits and next failures
A citation is not proof of truth: a source can be relevant yet stale, superseded, or contradicted. Citation-faithfulness research distinguishes semantic support from target-time validity, non-supersession, and provenance. This implementation has no timestamps beyond synthetic dates, no semantic retrieval, no adversarial source injection, and no live web access.

## Run locally
Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`. Rerun output is separate from bundled results.

## Next stage
S03: bounded tool use, typed arguments, fault injection, and recovery. Compare systems only on identical tasks and budgets before making competitor claims.

## References
NIST AI RMF Measure function: https://airc.nist.gov/airmf-resources/playbook/measure/ . Lifecycle faithfulness in retrieval-augmented generation: https://aclanthology.org/2026.groundlm-1.18/ . These sources inform evaluation design; they do not validate YIU.