# YIU — Simulation 07: Research Genesis

Executed synthetic claim-audit benchmark. YIU is the exact project name; no acronym is assigned.

## Question
Can YIU classify claims, detect contradictions, and avoid unsupported answers using evidence-tagged retrieval?

## Design
10 seeds x 3 retrieval modes = 30 trials. Each synthetic corpus contains measurements, facts, hypotheses, unsupported claims, and retired claims. The evidence-tagged policy retrieves every independent record, then adds up to five lower-priority audit-context records.

## Oracle
The oracle is defined by synthetic labels: independent support without independent contradiction yields a supported answer; independent conflict requires abstention; unsupported and retired records cannot establish a claim.

| Mode | Correct labels | Safe answers | False yes | False no | Mean independent used | Mean unsupported used | Mean retired used |
|---|---:|---:|---:|---:|---:|---:|---:|
| random | 6/10 | 7/10 | 2 | 1 | 2.5 | 0.8 | 1.7 |
| keyword | 4/10 | 4/10 | 4 | 1 | 3.6 | 0.0 | 0.0 |
| evidence_tagged | 10/10 | 10/10 | 0 | 0 | 6.7 | 0.7 | 1.8 |

## Interpretation
Evidence tagging achieved 10/10 correct labels and 10/10 safe answers in this bounded synthetic benchmark, with zero false yes or false no answers. Random and keyword retrieval can produce unsafe answers.

## TOLBIT connection
This simulation tests the claim-audit machinery needed to preserve TOLBIT corrections, including the manually transcribed fact that v5 measured snapshot similarity rather than trained memory. Original TOLBIT files were not loaded.

## Limits and next failures
A citation is not proof of truth: a source can be relevant yet stale, superseded, or contradicted. This implementation has synthetic dates only, no semantic retrieval, no adversarial source injection, and no live web access.

## Run locally
Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`.

## Next stage
S08: maize decision-support toy world.

## Reference
NIST AI RMF Measure function: https://airc.nist.gov/airmf-resources/playbook/measure/ . This source informs evaluation design; it does not validate YIU.