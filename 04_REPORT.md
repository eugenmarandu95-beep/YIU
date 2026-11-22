# YIU science simulations 09–11

Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.

## S09 — Mechanism Lab
Observational and genuinely randomized simulated training datasets estimate the total effect of X through M on Y under hidden confounding. Unit-level counterfactuals retain the same exogenous disturbances. A known-mechanism reference is explicitly labeled and is not a learned competitor.
Correction to S08: its active_intervention branch hard-coded X1->M and removed X1->Y without collecting interventional data; its reported improvement was not demonstrated intervention learning. S09 replaces that shortcut with randomized samples and fitted effect estimates.

## S10 — Hypothesis Forge
Fit linear, quadratic, and sinusoidal candidates on training data; rank on a separate selection set; evaluate on untouched test data. Truth families are balanced across seeds. This is finite candidate selection, not open-ended hypothesis invention.

## S11 — Experiment Designer
Compare random, space-filling, and posterior-disagreement selection with exactly 12 measurements per campaign. All policies share candidate functions, noise model, prior, input options, and potential measurement noise. The policy never sees the truth index. Truth is used only by the measurement simulator and evaluator. Evaluate posterior prediction on a separate dense input grid. Disagreement is an acquisition heuristic, not exact information gain.

## Results
| Sim | Method | Metric | Mean | Seed SD |
|---|---|---|---:|---:|
| 09 | known_mechanism_reference | counterfactual_RMSE | 0.000000 | 0.000000 |
| 09 | observational_OLS | counterfactual_RMSE | 1.530658 | 0.499249 |
| 09 | randomized_OLS | counterfactual_RMSE | 0.060643 | 0.045936 |
| 10 | fixed_linear | correct_family | 0.333333 | 0.479463 |
| 10 | fixed_linear | test_MSE | 0.921652 | 0.849697 |
| 10 | validation_ranked | correct_family | 0.866667 | 0.345746 |
| 10 | validation_ranked | test_MSE | 0.265363 | 0.032534 |
| 11 | posterior_disagreement | correct_family | 1.000000 | 0.000000 |
| 11 | posterior_disagreement | heldout_function_MSE | 0.000000 | 0.000002 |
| 11 | posterior_disagreement | posterior_entropy | 0.000991 | 0.005417 |
| 11 | random_design | correct_family | 1.000000 | 0.000000 |
| 11 | random_design | heldout_function_MSE | 0.005468 | 0.027448 |
| 11 | random_design | posterior_entropy | 0.059107 | 0.145942 |
| 11 | space_filling | correct_family | 1.000000 | 0.000000 |
| 11 | space_filling | heldout_function_MSE | 0.001015 | 0.005116 |
| 11 | space_filling | posterior_entropy | 0.027899 | 0.101509 |

## Use in YIU
Implement causal effect estimation, data-separated model ranking, and a budget-enforced sequential experiment API as distinct modules. Preserve seeds, samples, query trajectories and model versions. Do not equate variance acquisition with an intelligent scientist; assess on broader held-out mechanisms before choosing it as a default.

## Study notes
These are linear/confounded and small closed-family synthetic worlds. S09 assumes a constant total effect and uses factual outcome plus estimated effect for unit counterfactual prediction. S11 assumes the true function is among three known candidates and the noise scale is known. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.

## Rerun
Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. Model selection settings are fixed in the script; no test-set tuning is performed. All raw numerical inputs and sequential measurements are saved in file 03.

## Continuity
Next: S12 Reproducibility Forge, with deliberate data, code, and result corruption plus independent recomputation. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.

## Public references
Causal benchmark design: https://arxiv.org/html/2511.22842v2 . Budgeted science campaigns: https://arxiv.org/abs/2610.18449 . References motivate methodology, not certification.