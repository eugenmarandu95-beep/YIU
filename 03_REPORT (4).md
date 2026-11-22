# YIU — Simulation 08: Science Genesis

Executed synthetic causal-discovery and active-experimentation benchmark. YIU is the exact project name; no acronym is assigned.

## Question
Can YIU distinguish a mediated mechanism from confounded association using interventions and replication?

## Design
10 seeds x 3 discovery modes = 30 trials. Each world has 24 observations and a known mechanism: X1 -> M -> Y, X2 -> Y, and an unobserved confounder U affecting both X1 and Y. The active modes use interventions that break the confounding path; replication checks whether the mediated effect appears in two disjoint data halves.

| Mode | Mean F1 | Mean precision | Mean recall | Mean false discoveries | Mean missed mechanisms |
|---|---:|---:|---:|---:|---:|
| observational_only | 0.587 | 0.617 | 0.567 | 1.0 | 1.3 |
| active_intervention | 0.940 | 1.000 | 0.900 | 0.0 | 0.3 |
| active_plus_replication | 0.940 | 1.000 | 0.900 | 0.0 | 0.3 |

## Interpretation
Observation-only discovery can mistake confounded association for a direct cause. Intervention improves mechanism recovery; replication adds a guard against a single-sample artifact. These are synthetic-world results, not real-laboratory discoveries.

## TOLBIT connection
This simulation tests the causal-inference machinery YIU needs before evaluating scientific claims in TOLBIT materials. Original TOLBIT files were not loaded or executed.

## Limits and next failures
This benchmark uses a linear Gaussian world with one hidden confounder. It does not test nonlinear mechanisms, latent confounders beyond U, selection bias, measurement error, multiple-testing correction, preregistration, or real wet-lab execution.

## Run locally
Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`.

## Next stage
S09: mechanism lab and counterfactual testing.

## References
Autonomous Science Bench: https://arxiv.org/html/2610.18449 . CausalProfiler: https://arxiv.org/html/2511.22842v3 . These sources inform evaluation design; they do not validate YIU.