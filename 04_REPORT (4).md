# YIU Eyes of MAI simulations 35–37

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S35 — Inheritance Eye
Test whether YIU can detect what carries forward across time. Compare no-inheritance and inheritance modes on past-present deviation.

## S36 — Boundary Eye
Test whether YIU can detect where one regime ends and another begins. Compare global variance with local regime-mean shift.

## S37 — Phase Transition Eye
Test whether YIU can detect sudden change in organization. Compare global variance with variance-ratio shift.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 35 | inheritance | inheritance_score | 0.239977 | 0.013614 |
| 35 | no_inheritance | inheritance_score | 0.239977 | 0.013614 |
| 36 | boundary | boundary_score | 3.120104 | 0.378278 |
| 36 | no_boundary | boundary_score | 1.789480 | 0.094612 |
| 37 | no_transition | phase_transition_score | 2.194010 | 0.183960 |
| 37 | phase_transition | phase_transition_score | 1.969671 | 0.299466 |

## Use in YIU
Implement inheritance, boundary, and phase-transition detection as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high inheritance score as proof of coherence; validate with controls.

## Study notes
S35 assumes additive noise for present state. S36 assumes a known regime split at midpoint. S37 assumes a known variance shift at midpoint. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.

## Continuity
Next: S38 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.