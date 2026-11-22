# YIU Eyes of MAI simulations 23–25

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S23 — Lens Activation
Test whether YIU can choose the correct Eye for a question. Compare random lens selection with oracle lens activation.

## S24 — Scale Survival
Test whether YIU can detect structure surviving coarse-graining. Compare fixed-scale variance with multi-scale variance after coarse-graining at two scales.

## S25 — Curiosity Engine
Test whether YIU can choose the most informative next experiment under a fixed budget. Compare random selection with information-gain selection in a Gaussian estimation task.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 23 | lens_activation | correct_lens | 10.000000 | 0.000000 |
| 23 | random | correct_lens | 0.766667 | 0.817200 |
| 24 | fixed_scale | scale_survival_score | 1.512285 | 0.029517 |
| 24 | multi_scale | scale_survival_score | 2.738032 | 0.061418 |
| 25 | information_gain | estimation_error | 0.447350 | 0.287049 |
| 25 | random | estimation_error | 0.434156 | 0.388925 |

## Use in YIU
Implement lens activation, multi-scale analysis, and information-gain experiment selection as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high lens activation as proof of coherence; validate with controls.

## Study notes
S23 assumes a fixed question set and oracle lens mapping. S24 uses synthetic multi-scale signals. S25 assumes Gaussian noise and a known variance. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.

## Continuity
Next: S26 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.