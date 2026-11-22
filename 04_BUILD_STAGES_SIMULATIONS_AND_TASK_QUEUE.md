# MAI BRAIN — Build stages and durable work queue
## Rule
Plan -> implement -> test -> record results -> checkpoint -> approve next stage. This document is the initial saved plan, not an automated scheduler. Future continuity requires retaining/loading it in the actual repository; this chat does not run background tasks or guarantee cross-session recall.

## Stages
| ID | Deliverable | Exit gate | Dependency |
|---|---|---|---|
| B00 | Owner/scope/license/hardware record | Owner approves scope; hardware inspected | None |
| B01 | Private repo, environment, CLI shell, SQLite migrations | Smoke tests and backup restore pass | B00 |
| B02 | Source inventory and extraction | Every discovered file indexed or explicitly excluded/error | B01 |
| B03 | Hybrid retrieval and cited answers | Held-out retrieval/citation tests reported | B02 |
| B04 | Durable memory/tasks/correction history | Restart resumes exact task; deletions honored | B01-B03 |
| B05 | Read-only tools and bounded planner | Correct typed calls; failures visible; no writes | B03-B04 |
| B06 | Prediction/learning experiments | Training/test separation; baseline and ablations | B04-B05 |
| B07 | Approval-gated writes in sandbox | Fault injection/rollback/idempotency tests pass | B05 |
| B08 | Domain packs, terminal UX and Swahili tests | Expert-reviewed use cases and isolation tests | B03-B07 |
| B09 | Release package and restricted pilot | Documented risks, owner approval and rollback | B08 |

## Simulation program
| ID | Experiment | Controls | Main outputs |
|---|---|---|---|
| S01 | Knowledge/correction retrieval | Keyword, semantic, hybrid, no retrieval | Recall@k, citation support, abstention |
| S02 | Memory under restart/conflict/staleness | No memory, recent-only, structured memory | Recall, contradiction/deletion failure |
| S03 | Temporal prediction and anomaly shifts | Persistence, linear, EWMA/CUSUM, conventional reservoir | MAE, false alarms, detection delay |
| S04 | Mini-brain contribution | Full system vs bypass and matched-compute baseline | Incremental gain and latency |
| S05 | Tool sandbox with timeouts/injections | No tools, bounded rules, full planner | Completion, unauthorized actions, recovery |
| S06 | Maize water-balance toy world | Random, threshold, domain-rule | Simulated stress, water use, violations |
| S07 | Energy monitoring toy world | Conventional frequency/threshold rules | Delay, false alarms, missed events |
| S08 | Retail demand and ERP workflow sandbox | Moving average, reorder rules, deterministic workflow | Stockouts, capital use, duplicate writes |
| S09 | Health navigation vignettes | Approved referral checklist | Red-flag misses, unsupported advice |
| S10 | D4 telemetry/noise experiment | Fair-rate/power reference codes | Error, erasure, throughput, latency |
| S11 | Cross-pack coordination and isolation | Single planner, separated pack runs | Task success, leaks, cost, loops |

Use generated numeric worlds with explicitly labeled assumptions; no toy crop-yield, grid-frequency, clinical or commercial outcome is field validation. Research auditing is a core test, not a separate research-brain product. Simulation worlds are test harnesses, not renamed autonomous brains.

## Protocol for every experiment
Freeze objective, inputs, available observations, action limits, metrics, compute budget, seeds and splits before viewing test outcomes. Suggested initial pilot: five seeds; expand only with a declared precision/compute plan. Use matched scenarios; report uncertainty and per-seed results. Test chronology/site separation where relevant. Hold back final tasks from tuning. Save raw events, configuration, model version, runtimes, failures, and code hash. Never fill missing runs with fabricated records. Full-vs-ablated comparisons must share data and budget.

## Initial queue — all pending, nothing marked implemented
| Task | Priority | Next step |
|---|---|---|
| T001 | P0 | Approve MAI scope and relation to NEXUS |
| T002 | P0 | Record actual terminal hardware/OS |
| T003 | P0 | Locate/export original TOLBIT folder for local ingestion |
| T004 | P0 | Inventory rights, private data and original results |
| T005 | P1 | Build B01 scaffold and restart/backup test |
| T006 | P1 | Build B02 extractors; never execute source scripts |
| T007 | P1 | Write human-reviewed retrieval/citation test questions |
| T008 | P1 | Build B03 retrieval and evidence display |
| T009 | P1 | Implement B04 tasks and approved correction memory |
| T010 | P2 | Run S01-S05 before enabling domain action |
| T011 | P2 | Review legacy mini-brain code/results independently |
| T012 | P2 | Curate domain sources; maize/health need specialist material |
| T013 | P3 | Test optional neural predictor, lattice and D4 separately |
| T014 | P3 | Run domain simulations and approve pilot scope |

## Checkpoint contract
At session start load latest version, current stage, unresolved incidents, decisions, queue and last checkpoint. At session end append date, completed work, exact changed files, tests/results, blockers, and next task. Store status as planned/active/blocked/needs_review/complete; completion requires artifact path and test evidence. Never claim a stage is done because it was described in conversation.

## Publication contract
Separate theoretical claims, synthetic results, historical output and field evidence. Publish methods, uncertainty and negative results, not fabricated significance. Owner reviews sensitive information and licensing before any public release. Each release has a manifest, code/model versions, known failures and reproduction instructions.
