# YIU — Simulation 01: State Continuity

Executed synthetic recovery benchmark. YIU is the exact project name; no acronym is assigned.

## Question
Can an interrupted state machine recover its exact uninterrupted state, including a previously recorded correction?

## Design
10 seeds x 3 restart scenarios x 3 storage modes = 90 trials. Each trial has 96 events; interruption occurs after event 43; checkpoints every 7 events. Recovery runs in a fresh Python subprocess. The controller intentionally supplies a trusted complete event tape.
Scenarios: normal restart; checksum-invalid latest snapshot with fallback; incomplete temporary write ignored. Controls: volatile state and snapshot-only. Candidate: snapshot plus event replay.

| Scenario | Mode | Exact recovery | Lost events (mean) |
|---|---|---:|---:|
| restart | volatile | 0/10 | 43.0 |
| restart | snapshot_only | 0/10 | 1.0 |
| restart | snapshot_replay | 10/10 | 0.0 |
| corrupt_latest | volatile | 0/10 | 43.0 |
| corrupt_latest | snapshot_only | 0/10 | 8.0 |
| corrupt_latest | snapshot_replay | 10/10 | 0.0 |
| partial_write | volatile | 0/10 | 43.0 |
| partial_write | snapshot_only | 0/10 | 1.0 |
| partial_write | snapshot_replay | 10/10 | 0.0 |

## Interpretation
Replay recovery passes this deliberately bounded engineering test. Snapshots alone lose events after the last checkpoint; volatile state loses all pre-interruption history. This is a recovery implementation result, not evidence of intelligence, learning, consciousness, or superiority over commercial systems.

## TOLBIT connection
The retained correction is manually transcribed from this conversation: v5 measured snapshot similarity, not trained recall. Original TOLBIT files were not loaded in this benchmark. This first simulation tests the infrastructure needed to preserve their future corrections, not their scientific validity.

## Limits and next failures
Checksums detect accidental changes, not a malicious actor able to replace both state and hash. Temporary-file rename is not proof of power-loss durability. Test event-log corruption, unavailable tape, schema migration, model/RNG state, deleted data, and exactly-once external actions separately. This implementation has no external actions and does not solve duplicate financial postings.

## Run locally
Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`. Rerun output is deliberately separate from the bundled results.

## Next stage
S02: evidence-tagged memory and correction conflicts. Research objectives stay in YIU core. Compare systems on identical tasks/budgets before making competitor claims.

## Reference
Python subprocess documentation: https://docs.python.org/3/library/subprocess.html . This source explains process execution, not the scientific validity of the study.