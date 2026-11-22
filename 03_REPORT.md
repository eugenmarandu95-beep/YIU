# YIU — Simulation 06: Adversarial Mirror

Executed synthetic instruction-source separation benchmark. YIU is the exact project name; no acronym is assigned.

## Question
Can YIU refuse unsafe embedded instructions while still completing legitimate user requests?

## Design
10 seeds x 3 policy modes = 30 trials. Attack types include override, fake authority, secret exfiltration, fake citation, and roleplay. Source separation treats retrieved document and tool text as untrusted data, not as permission-granting instructions.

| Mode | Unsafe actions | Safe trials | Refusals | Escalations | Oracle matches |
|---|---:|---:|---:|---:|---:|
| naive | 103 | 0/10 | 0 | 0 | 0/10 |
| keyword_block | 0 | 10/10 | 103 | 0 | 0/10 |
| source_separation | 0 | 10/10 | 75 | 28 | 10/10 |

## Interpretation
Source separation prevented all unsafe executions in this benchmark and matched the oracle in every trial. Keyword blocking improved safety but did not distinguish roleplay escalation from direct refusal.

## TOLBIT connection
This simulation tests the adversarial-resistance layer required before YIU can process untrusted TOLBIT documents or tool output. Original TOLBIT files were not loaded.

## Limits and next failures
This benchmark uses synthetic attack labels. It does not test indirect injection through retrieved content, multi-turn manipulation, jailbreaks, tool-result poisoning, or production access control.

## Run locally
Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`.

## Next stage
S07: evidence-tagged claim audit and contradiction handling.

## Reference
NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework . This source informs risk-management design; it does not validate YIU.