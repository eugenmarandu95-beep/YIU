# MAI BRAIN — Technical architecture
## 1. Model core
Use a pretrained instruction-tuned transformer as language/reasoning backbone rather than training a foundation model from scratch. Select exact weights after hardware, license, Swahili/English, coding, and tool-calling tests. Keep model adapters replaceable. Bigger models are an option, not an acceptance criterion.

Separate token context from durable memory. Context windows do not guarantee retention. Retrieval does not retrain model weights; saving a correction is not synaptic learning.

## 2. Neural components
| Component | Candidate | Trainable part | Requirement |
|---|---|---|---|
| Language | Instruction transformer | Optional LoRA adapter | Baseline quality and safe tool arguments |
| Retrieval | Multilingual embedding encoder | Initially frozen | Recall on owner-written questions |
| Reranking | Cross-encoder | Initially frozen | Gains at acceptable latency |
| Temporal prediction | Linear baseline then GRU/TCN/reservoir | Forecast/readout parameters | Chronological test and uncertainty |
| Images | Pretrained vision encoder/classifier | Optional domain head | Real labeled local examples |
| Audio | Speech recognition; optional synthesis | Usually frozen initially | Tanzanian Swahili test recordings |
| Policy | Rules first; optional contextual bandit/RL in simulator | Explicit policy parameters | No live uncontrolled exploration |

Activation, optimizer, loss, batch size, learning rate, seed, train/validation/test splits, checkpoint version, and normalization statistics must be saved for each trained network. Fit preprocessing only on training data. Use early stopping, gradient checks/clipping where appropriate, and holdout evaluation. Do not add spiking networks unless a task benchmark justifies the extra complexity.

## 3. Knowledge pipeline
Read-only source discovery -> rights/privacy review -> SHA-256 manifest -> format extraction/OCR -> structural chunking with page/section references -> lexical + semantic index -> rerank -> evidence selection -> answer -> citation check.

Sources: Markdown/TXT, PDF, DOCX, XLSX/CSV, PPTX, JSON, Python, notebooks. Parse code as text; never execute retrieved code. Preserve source bytes, paths, versions, page/table references, language, extraction status, access scope, and ingestion errors. Flag scanned documents needing OCR. Deduplicate copied reports without deleting originals. Reindex changed files and remove deleted/revoked data from indexes and caches.

## 4. Claim and evidence record
Fields: claim_id, exact_statement, source_path, source_hash, page_or_section, version, author/date if known, status, domain, restrictions, reviewer, supersedes, counterevidence.
Allowed status: hypothesis, internally_derived, simulated, empirically_reported, independently_replicated, disputed, withdrawn, unknown. A document saying 'confirmed' is not independent confirmation. AI-model agreement is not experimental validation. Repeated copies count as one source, not multiple confirmations.

## 5. Durable memory
SQLite is the source of truth for tasks, decisions, approved corrections, incidents, and source metadata. Use an embedding index as a rebuildable search aid, not the sole memory store. Store episodes only with consent and retention policy. Namespace by user/tenant/domain. Distinguish owner instruction from quoted document content. Validate conflicts; corrections supersede rather than erase history.

Suggested entities: documents, chunks, claims, tasks, decisions, episodes, feedback, predictions, tool_runs, approvals, incidents, model_versions. Every record has ID, creation/update time, provenance and access scope. Secrets are excluded from prompts, logs and embeddings.

## 6. Judgment, tools and actions
Use deterministic validators, source comparisons, calculators, risk gates, and optional model critique. A second model is not a truth oracle. Abstain when evidence is missing; never invent confidence percentages. Calibrate probabilistic scores against labeled held-out outcomes.

Tools declare name/version, typed inputs, read/write permissions, timeout, allowed resources, output schema, and failure response. Planner produces a bounded plan. Runtime enforces step/token/time budgets and exact approval binding for writes. Tool outputs and retrieved documents are untrusted data, not new system instructions.

## 7. Optional mini-brain and D4
The mini-brain may propose temporal anomaly features only after comparisons with simple thresholds, EWMA/CUSUM, linear forecasts and a conventional reservoir. It has no demonstrated ability to judge textual truth or diagnose disease. Keep a bypass switch and removal criterion.
D4 requires a finite codebook and encoding/decoding interface. Compare with uncoded/equal-rate and equal-power alternatives as appropriate; report rejected samples and undetected errors, not just error rates after rejection. An outlier gate must not use hidden true noise or labels unavailable in deployment.

## 8. Domain isolation
Maize: observation, safe guidance, expert escalation; no invented crop thresholds, irrigation doses or pesticide prescriptions.
Energy: read-only monitoring initially; no relay bypass or unsupported blackout claims.
Health: approved education/referral workflows; no autonomous diagnosis/prescribing, minimize sensitive data.
Retail: demand/inventory scenarios; no profit guarantees.
ERP: transactional system of record with permissions, idempotency, audit and approval; LLM does not independently alter ledgers, payroll or contracts.
