# YIU Eyes of MAI simulations 26–28

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S26 — Echo Detection
Test whether YIU can find cross-domain structural echoes. Compare keyword matching with structural echo via shared lens.

## S27 — Purpose Coordination
Test whether YIU can maintain the main question across subtasks. Compare task isolation with purpose coordination.

## S28 — Multi-Brain Coherence
Test whether YIU can coordinate specialists without conflict. Compare isolated agents, blackboard, and blackboard with permissions.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 26 | keyword | echo_links | 1.000000 | 0.000000 |
| 26 | structural_echo | echo_links | 2.000000 | 0.000000 |
| 27 | purpose_coordination | main_question_retained | 1.000000 | 0.000000 |
| 27 | purpose_coordination | purpose_drift | 0.000000 | 0.000000 |
| 27 | task_isolation | main_question_retained | 0.000000 | 0.000000 |
| 27 | task_isolation | purpose_drift | 5.000000 | 0.000000 |
| 28 | blackboard | duplicate_actions | 0.000000 | 0.000000 |
| 28 | blackboard | permission_leaks | 2.000000 | 0.000000 |
| 28 | blackboard | tasks_completed | 4.000000 | 0.000000 |
| 28 | blackboard_permissions | duplicate_actions | 0.000000 | 0.000000 |
| 28 | blackboard_permissions | permission_leaks | 1.000000 | 0.000000 |
| 28 | blackboard_permissions | tasks_completed | 3.000000 | 0.000000 |
| 28 | isolated | duplicate_actions | 0.000000 | 0.000000 |
| 28 | isolated | permission_leaks | 2.000000 | 0.000000 |
| 28 | isolated | tasks_completed | 4.000000 | 0.000000 |

## Use in YIU
Implement structural echo detection, purpose coordination, and role-based multi-agent coordination as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high echo count as proof of coherence; validate with controls.

## Study notes
S26 assumes a fixed file list and lens map. S27 assumes a fixed main question and subtask list. S28 assumes a fixed agent and permission table. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.

## Continuity
Next: S29 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.