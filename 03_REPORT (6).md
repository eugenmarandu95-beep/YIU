# YIU — Simulation 04: Prediction Rift

Executed synthetic chronological forecasting benchmark. YIU is the exact project name; no acronym is assigned.

## Question
Can YIU’s temporal-memory readout improve one-step-ahead forecasting over persistence, linear trend, and EWMA baselines on held-out rolling-origin data?

## Design
10 seeds x 4 forecasting methods = 40 trials. Each series has 160 points: 120 training points and 40 rolling-origin test points. The series includes trend, 24-step seasonality, Gaussian noise, and two abrupt shifts after the training boundary.

## Methods
Persistence repeats the latest observation. Linear trend fits a global slope. EWMA uses alpha 0.3. The mini-brain baseline uses a weighted recent-window slope over the last 12 points; it is a simple temporal readout, not evidence of biological memory.

| Method | Mean MAE | Mean improvement vs persistence | Wins | Mean 80% coverage | Mean alarms |
|---|---:|---:|---:|---:|---:|
| persistence | 2.916 | 0.0% | 0/10 | 0.835 | 26.3 |
| linear | 7.343 | -152.5% | 0/10 | 0.725 | 26.3 |
| ewma | 4.566 | -57.3% | 0/10 | 0.820 | 26.3 |
| mini_brain | 3.112 | -6.8% | 0/10 | 0.828 | 26.3 |

## Interpretation
This benchmark reports per-seed wins and uncertainty rather than claiming a universal winner. A method with a lower mean MAE may still lose on individual seeds. Coverage is a rough interval diagnostic based on residual spread, not a full probabilistic calibration curve.

## TOLBIT connection
This simulation tests the forecasting machinery needed before YIU can evaluate mini-brain claims on real TOLBIT time series. Original TOLBIT files were not loaded. No claim about the mini-brain, consciousness, or outage prediction is validated by this run.

## Limits and next failures
Synthetic seasonality and abrupt shifts do not establish real-world validity. This implementation does not test hyperparameter tuning leakage, changing seasonal periods, missing data, multivariate drivers, probabilistic forecasts, conformal calibration, or deployment drift. EWMA/CUSUM are conventional baselines; statsmodels documents exponential smoothing and forecast methods, but this run uses a standard-library implementation for reproducibility.

## Run locally
Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`. Rerun output is separate from bundled results.

## Next stage
S05: symbolic rules and safety constraints. Compare systems only on identical tasks and budgets before making competitor claims.

## References
statsmodels exponential smoothing: https://www.statsmodels.org/devel/generated/statsmodels.tsa.holtwinters.ExponentialSmoothing.html . NIST AI RMF Measure function: https://airc.nist.gov/airmf-resources/playbook/measure/ . These sources inform evaluation design; they do not validate YIU.