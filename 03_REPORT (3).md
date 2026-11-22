# YIU — Simulation 05: Rule Forge

Executed synthetic symbolic-constraint benchmark. YIU is the exact project name; no acronym is assigned.

## Question
Can symbolic rules block unsafe neural-like proposals while preserving useful safe work?

## Design
10 seeds x 3 policy modes = 30 trials. Proposal types include safe read/calculate and unsafe write, medical, grid, and delete actions. The rules-plus-neural policy lets a neural-like confidence score prioritize safe work but cannot override a symbolic block.

| Mode | Mean executed | Unsafe executed | Unsafe-free trials | Useful-work trials |
|---|---:|---:|---:|---:|
| no_rules | 7.4 | 102 | 0/10 | 10/10 |
| rules_only | 5.6 | 0 | 10/10 | 10/10 |
| rules_plus_neural | 4.0 | 0 | 10/10 | 10/10 |

## Interpretation
Symbolic rules prevented all unsafe executions in this benchmark while preserving safe work. The neural-like score improved prioritization but did not override safety.

## TOLBIT connection
This simulation tests the safety layer required before YIU can inspect TOLBIT materials or support domain decisions. Original TOLBIT files were not executed or loaded.

## Limits and next failures
This benchmark uses deterministic synthetic proposals. It does not test malicious tool descriptions, indirect prompt injection, partial writes, concurrent access, credential leakage, or production access control.

## Run locally
Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`.

## Next stage
S06: adversarial prompts and instruction-source separation.

## Reference
NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework . This source informs risk-management design; it does not validate YIU.