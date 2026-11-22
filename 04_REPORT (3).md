# YIU Eyes of MAI simulations 20–22

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S20 — Ouroboros
Test whether YIU can revise a claim without destroying history. Preserve-history mode marks the old claim as superseded and adds a correction with provenance; overwrite mode replaces it.

## S21 — Sensitivity Filter
Test whether YIU can separate signal from overload. Compare react-all, fixed threshold, and adaptive rolling filter on synthetic signal plus noise.

## S22 — Coherence Archive
Test whether YIU can connect TOLBIT files into a cross-file narrative with provenance. Compare isolated summaries with cross-file echo links.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 20 | overwrite | history_preserved | 0.000000 | 0.000000 |
| 20 | overwrite | retired_claim_returned | 0.000000 | 0.000000 |
| 20 | preserve_history | history_preserved | 1.000000 | 0.000000 |
| 20 | preserve_history | retired_claim_returned | 0.000000 | 0.000000 |
| 21 | adaptive_filter | f1 | 0.124422 | 0.094440 |
| 21 | adaptive_filter | false_alarms | 7.466667 | 1.942862 |
| 21 | adaptive_filter | missed_signals | 11.966667 | 3.357784 |
| 21 | adaptive_filter | precision | 0.165342 | 0.131389 |
| 21 | adaptive_filter | recall | 0.106051 | 0.087188 |
| 21 | react_all | f1 | 0.234600 | 0.056061 |
| 21 | react_all | false_alarms | 86.600000 | 3.625580 |
| 21 | react_all | missed_signals | 0.000000 | 0.000000 |
| 21 | react_all | precision | 0.134000 | 0.036256 |
| 21 | react_all | recall | 1.000000 | 0.000000 |
| 21 | threshold | f1 | 0.235385 | 0.083273 |
| 21 | threshold | false_alarms | 44.400000 | 4.796550 |
| 21 | threshold | missed_signals | 5.500000 | 1.502871 |
| 21 | threshold | precision | 0.150098 | 0.058800 |
| 21 | threshold | recall | 0.569771 | 0.138727 |
| 22 | cross_file | echo_links | 2.000000 | 0.000000 |
| 22 | cross_file | provenance_preserved | 1.000000 | 0.000000 |
| 22 | isolated | echo_links | 0.000000 | 0.000000 |
| 22 | isolated | provenance_preserved | 1.000000 | 0.000000 |

## Use in YIU
Implement memory-preserving revision, adaptive sensitivity filtering, and cross-file echo linking as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat a high echo count as proof of coherence; validate with controls.

## Study notes
S20 assumes a fixed claim set and correction rule. S21 uses synthetic Gaussian signal and noise. S22 uses a fixed file list and lens map. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.

## Continuity
Next: S23 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.