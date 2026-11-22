# YIU science simulations 12–15

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S12 — Reproducibility Forge
A linear pipeline is run on original and deliberately corrupted data. Detection uses independent recomputation from the preserved original arrays and code version. This tests integrity checking, not cryptographic security against an attacker who can replace both data and hash.

## S13 — Theory Weaver
A source mechanism is fit on source data, then compared with a target-local fit on target data. The target has the same structural form but different coefficients. This tests structure transfer, not universal theory discovery.

## S14 — Consciousness Lab
Three computational probes measure integration, broadcast dispersion, and prediction error across modular, integrated, broadcast, and predictive dynamics. These are architecture probes, not measurements of subjective experience, awareness, or consciousness.

## S15 — Discovery Society
Four specialized agents coordinate through a shared blackboard. The permission mode enforces role-based task authorization and prevents duplicate actions. This is a coordination benchmark, not evidence of emergent consciousness.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 12 | corrupted_data | corruption_detected | 1.000000 | 0.000000 |
| 12 | corrupted_data | recovery_error | 0.979801 | 0.035579 |
| 12 | corrupted_data | slope | 0.312319 | 0.025403 |
| 12 | original | corruption_detected | 0.000000 | 0.000000 |
| 12 | original | recovery_error | 0.000000 | 0.000000 |
| 12 | original | slope | 1.292120 | 0.026187 |
| 13 | local_structure | target_prediction_RMSE | 1.329621 | 0.749908 |
| 13 | naive_transfer | target_prediction_RMSE | 0.878137 | 0.616647 |
| 14 | broadcast | broadcast | 0.567386 | 0.029836 |
| 14 | broadcast | integration | 0.492857 | 0.018541 |
| 14 | broadcast | prediction_error | 1.005272 | 0.049503 |
| 14 | integrated | broadcast | 0.217905 | 0.015848 |
| 14 | integrated | integration | 0.923372 | 0.012274 |
| 14 | integrated | prediction_error | 0.259465 | 0.022147 |
| 14 | modular | broadcast | 0.501119 | 0.035340 |
| 14 | modular | integration | 0.310377 | 0.017163 |
| 14 | modular | prediction_error | 1.134854 | 0.041388 |
| 14 | predictive | broadcast | 0.517352 | 0.037625 |
| 14 | predictive | integration | 0.312390 | 0.019683 |
| 14 | predictive | prediction_error | 1.165842 | 0.045869 |
| 15 | blackboard | duplicate_actions | 0.000000 | 0.000000 |
| 15 | blackboard | permission_leaks | 2.000000 | 0.000000 |
| 15 | blackboard | tasks_completed | 4.000000 | 0.000000 |
| 15 | blackboard_permissions | duplicate_actions | 0.000000 | 0.000000 |
| 15 | blackboard_permissions | permission_leaks | 0.000000 | 0.000000 |
| 15 | blackboard_permissions | tasks_completed | 4.000000 | 0.000000 |
| 15 | uncoordinated | duplicate_actions | 0.000000 | 0.000000 |
| 15 | uncoordinated | permission_leaks | 2.000000 | 0.000000 |
| 15 | uncoordinated | tasks_completed | 4.000000 | 0.000000 |

## Use in YIU
Implement versioned artifacts, independent recomputation, structure-aware transfer, computational probes, and role-based multi-agent coordination as distinct modules. Preserve seeds, raw arrays, hashes, permissions, and trajectories. Do not treat a high integration or broadcast score as consciousness; treat it as an architecture diagnostic.

## Study notes
S12 assumes the original arrays and code version remain trusted. S13 assumes the same structural form across source and target. S14 uses linear dynamics and fixed probes. S15 assumes a fixed task sequence and permission table. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw numerical arrays and agent traces are saved in file 03.

## Continuity
Next: S16 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Reproducible AI workflows: https://arxiv.org/html/2603.14888 . Scientific ideation benchmarks: https://arxiv.org/html/2609.07611 . References motivate methodology, not certification.