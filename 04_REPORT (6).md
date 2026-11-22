# YIU Eyes of MAI simulations 29–31

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S29 — Emergence Eye
Test whether YIU can detect new order from interaction. Compare single-unit variance with interaction-induced variance.

## S30 — Resilience Eye
Test whether YIU can detect recovery after disturbance. Compare no-recovery and recovery modes on post-disturbance deviation.

## S31 — Adaptation Eye
Test whether YIU can detect change to fit new condition. Compare no-adaptation and adaptation modes on response-environment deviation.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 29 | interaction | emergence_score | 1.303714 | 0.087601 |
| 29 | single_unit | emergence_score | 0.982149 | 0.061628 |
| 30 | no_recovery | resilience_score | 0.390759 | 0.039608 |
| 30 | recovery | resilience_score | 0.390759 | 0.039608 |
| 31 | adaptation | adaptation_score | 0.237157 | 0.014891 |
| 31 | no_adaptation | adaptation_score | 0.237157 | 0.014891 |

## Use in YIU
Implement emergence, resilience, and adaptation detection as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high emergence score as proof of coherence; validate with controls.

## Study notes
S29 assumes additive interaction. S30 assumes a fixed disturbance window. S31 assumes a known environment shift. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.

## Continuity
Next: S32 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.