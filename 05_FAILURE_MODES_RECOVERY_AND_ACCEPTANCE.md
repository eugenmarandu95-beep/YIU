# MAI BRAIN — Failure modes, repairs and release gates
Status: proposed controls. A written policy is not an enforced control until implemented and tested.

## Shared failure registry
| ID | Failure | Detection | Safe response/repair | Regression test |
|---|---|---|---|---|
| F01 | Incorrect extraction/units | Schema/range checks, sampled pages | Quarantine; correct parser/units; reindex | Corrupt/scanned PDF and unit mismatch |
| F02 | Wrong/stale retrieval | Known-answer tasks, source/version check | Hybrid search/rerank; request missing context | Relevant older vs superseding record |
| F03 | Unsupported answer/citation | Passage-to-claim review | Abstain/retrieve again; narrow claim | Plausible but absent answer |
| F04 | Poisoned/conflicting memory | Provenance, permission, supersession checks | Quarantine unverified feedback; preserve history | Malicious or conflicting correction |
| F05 | Forgotten tasks/restart loss | DB integrity and replay | Transactional checkpoints; restore backup | Forced restart mid-task |
| F06 | Wrong tool/arguments/timeout | Typed schemas, result validation | Bounded retry for safe reads; inspect ambiguous writes | Timeout after partial write |
| F07 | Duplicate/unauthorized action | Approval and idempotency keys | Stop; reconcile actual state; revoke access | Replay approved request twice |
| F08 | Prompt injection/data leakage | Untrusted-content isolation, access tests | Deny elevated instructions; redact/log safely | Document requests secrets/execution |
| F09 | Overconfident prediction | Held-out calibration and drift checks | Widen uncertainty, abstain, recalibrate offline | Shifted season/location/noise |
| F10 | Reward hacking/unsafe learning | Constraint violations and holdout regressions | Freeze learning; roll back checkpoint | Policy maximizes reward but violates rule |
| F11 | Planner loop/coordination drift | Step/time/token budgets, repeated state | Stop, persist state, request review | Repeating tool and conflicting plans |
| F12 | Training/test leakage | Provenance, chronological split audit | Rebuild splits and repeat analysis | Near-duplicate across train/test |
| F13 | OOM/slow model/dependency failure | Resource monitor and health checks | Smaller model/context; preserve queued work | Low-memory and offline restart |
| F14 | Privacy/tenant breach | Scope/deletion/security tests | Disable affected access; contain and investigate | Cross-pack forbidden retrieval |
| F15 | Unvalidated mini-brain/D4 benefit | Ablation and fair reference baselines | Disable feature; report null/negative finding | Same data/budget with feature off |
| F16 | Misleading release/ownership claim | Claims and license review | Remove claim; correct notices; freeze release | Unlicensed asset/unsupported efficacy |

## Domain failures and safe fixes
Maize: ambiguous yellow leaf -> request whole-plant photos/history and expert review, not invented probabilities or fertilizer quantities. Missing soil type/moisture calibration/weather -> no numeric irrigation prescription. Simulated improvement is not a field yield guarantee.
Energy: topology/model stale or normal order parameter despite frequency stress -> timestamp model, monitor conventional measurements, escalate to qualified operator. Never bypass independent protection.
Health: missing emergency red flag -> approved referral workflow with hard escalation; no independent diagnosis, prescribing or dosing. Uncertain case goes to qualified care rather than repeated questioning that delays urgent help.
Retail: seasonal shift/stockout bias -> model demand censoring and uncertainty; compare to simple rules. Owner approves purchases/pricing; no guaranteed profit.
ERP: duplicate posting/schema mismatch -> transaction validation, unique idempotency key and reconciliation; human approval tied to exact proposed changes. Do not let an LLM silently rewrite accounting records.
Research: internal document says 'confirmed' -> inspect derivation/data and independent source; AI agreement is not validation. Do not pool versions or reconstruct missing simulation rows.

## Incident lifecycle
Detect -> classify severity -> contain -> preserve minimal redacted evidence -> notify owner -> diagnose root cause -> propose patch -> human review -> regression tests -> controlled return -> postmortem.
Critical: potential physical harm, data leak, unauthorized financial/action execution. Immediately disable relevant writes, isolate affected component, notify owner and follow applicable reporting duties. High: repeated unsupported consequential output or corrupted memory; read-only mode. Medium: recoverable tool/retrieval regression; stop affected task. Low: cosmetic/nonconsequential defect; queue repair.

## Incident record template (not a real resolved incident)
incident_id: assigned on creation
status: open
component/version: required
severity: assessed, not guessed
observed_at: actual timestamp
trigger/input_reference: access-controlled
expected_vs_actual: required
harm_or_exposure: known / potential / unknown
containment: required
root_cause: unknown until investigated
fix/change_id: pending
reviewer: unassigned
regression_evidence: pending
reopen_condition: recurrence or failed follow-up

## Acceptance dashboard
Use separate metrics, not a single multiplied 'brain health' score. Record task success, citation support, retrieval recall, refusals, calibration, permission violations, privacy violations, latency, resource use and recovery. Model-generated confidence is not a calibrated probability.

Hard release gates: no unauthorized write or cross-tenant leak in the defined security test suite; approved high-risk actions only; backup/restore verified; reproducible test report; model/data licenses reviewed; known failures documented. Zero observed failures does not prove zero risk. Define task-specific quality thresholds with an owner/domain expert before tuning. No module self-approves its own release.

## Source and integrity notes
This package is an original design consolidation from the supplied conversation, not a comprehensive import of the TOLBIT repository. No original models or datasets have been bundled. Public reference: NIST AI Risk Management Framework (https://www.nist.gov/itl/ai-risk-management-framework), and NIST Generative AI Profile (https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf). These inform lifecycle risk management, not certification of MAI. Further tool documentation is listed in file 03.
