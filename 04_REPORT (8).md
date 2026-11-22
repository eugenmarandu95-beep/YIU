# YIU Eyes of MAI simulations 32–34

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S32 — Self-Organization Eye
Test whether YIU can detect order from local rules. Compare local-only variance with cumulative global order.

## S33 — Information Flow Eye
Test whether YIU can detect what moves, what is kept, what is lost. Compare no-flow and information-flow modes on input deviation.

## S34 — Constraint Eye
Test whether YIU can detect what limits possibility. Compare unconstrained and constrained variance.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 32 | local_only | self_organization_score | 0.984805 | 0.056983 |
| 32 | self_organization | self_organization_score | 3.734975 | 1.245758 |
| 33 | information_flow | information_flow_score | 0.000000 | 0.000000 |
| 33 | no_flow | information_flow_score | 1.605165 | 0.102978 |
| 34 | constraint | constraint_score | 0.713954 | 0.019709 |
| 34 | no_constraint | constraint_score | 1.003421 | 0.060021 |

## Use in YIU
Implement self-organization, information flow, and constraint detection as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high self-organization score as proof of coherence; validate with controls.

## Study notes
S32 assumes cumulative integration. S33 assumes additive noise for lost information. S34 assumes clipping constraint. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.

## Continuity
Next: S35 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.