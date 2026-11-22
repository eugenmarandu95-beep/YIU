# Partial-Update Dynamics in a Stochastic Lattice Mini-Brain

Research manuscript and evidence audit | Draft 1.0 | 15 November 2026

STATUS: Substantive writing draft. Controlled validation results are pending. This document is not a completed validation report and does not certify the simulation code. Author name, affiliation, and publication venue have not been supplied.

## Abstract

This project investigates temporal dynamics in a stochastic binary lattice model described informally as a mini-brain. Earlier simulation output reported a 405-run sweep over grid size, update fraction, temperature, and interaction range. Exploratory analyses associated the measured spectral exponent strongly with update fraction. Subsequent review identified confounded branching estimates, detector-dependent avalanche definitions, boundary censoring, artificial size caps in one version, and an unsupported interpretation of delayed state similarity as memory. A controlled validation design compares an uncoupled model with globally normalized and row-normalized interactions using matched random schedules. The intended contribution is a transparent account of model dynamics and measurement limitations. No completed results from that validation are available in the conversation used for this draft. Consciousness, learned memory, and criticality are not established.

## 1. Scope and research question

The core question is whether spatial interactions produce measurable effects beyond persistence induced by updating only a fraction of units at each step. The project is framed as computational dynamics, not as a biological brain reconstruction. Mini-brain is an informal project name. The study can be closed as an exploratory methods report even if controlled validation remains unavailable; in that case its title, abstract, and conclusions must explicitly retain that limitation.

## 2. Evidence and provenance

Evidence for this draft consists of conversation-supplied outputs, an earlier summarized 405-run v2 log identified as paste.txt, and code designs discussed in the conversation. The original complete run-level CSV has not been independently reloaded or reanalyzed for this document. A printed completion message is evidence of reported execution, not verification of all saved records. Original v3 and v3.2 datasets must remain separate. A later three-row reconstruction is illustrative only and must not enter any experimental analysis.

The reported v2 design comprised 135 parameter combinations with three replicates, totaling 405 runs. Grid sizes were 20, 30, and 40; update fractions were 0.005, 0.01, 0.05, 0.10, and 0.20; temperatures were 1.5, 2.2, and 3.0; interaction-range parameters were 0.4, 0.8, and 1.2. These values describe reported historical output, not a newly verified dataset.

## 3. Model and proposed validation

The supplied v7 implementation uses binary states s_i in {-1,+1} on a periodic L by L grid. At each step, k=max(1,int(Nf)) units are selected without replacement, where N=L squared and f is update fraction. Selected units are updated simultaneously using pre-step fields h_i=sum_j W_ij s_j and activation probability logistic(2 c h_i/T). One step corresponds to k/N expected updates per unit. These are implementation details of the supplied validation code, not proof that every historical version used an identical rule.

Spatial weights in v7 decay as r^(-(1+alpha)), with zero diagonal. The uncoupled arm sets all weights to zero. The original-global arm divides raw weights by their total sum. The row-normalized arm divides each row by its own sum. On this translation-invariant grid the global arm has row sum 1/N and the row-normalized arm has row sum 1. Thus the latter changes effective coupling substantially; its performance cannot retroactively validate the original model.

The proposed pilot contains 45 trials: three arms, three update fractions (0.01, 0.05, 0.20), and five seeds. Other settings are L=20, T=2.2, alpha=0.8, and c=1. Burn-in is 20 sweeps, baseline recording 100 sweeps, and post-manipulation observation 30 sweeps. These are proposed settings, not optimized or experimentally validated conditions.

After baseline, three copies are followed: untouched control, a copy with 5% of unit signs flipped, and a copy replaced by a balanced random pattern. A shuffled target provides a simple overlap comparator. Each arm receives a seed-matched schedule; post-manipulation copies share random draws. This common-random-number construction measures a specific coupled response, not robustness under independent noise.

## 4. Outcome definitions

Spectral outputs are descriptive log-log slopes of Welch power spectra in a fixed per-step band (0.01 to 0.25 cycles per step) and a common per-sweep band (1 to 2 cycles per sweep). Frequency-bin count and fit R-squared are diagnostic outputs, not power-law acceptance tests. Neither a fitted exponent nor a high R-squared establishes criticality.

Perturbation outcomes include Hamming-distance area, peak distance, final distance, and late-window mean distance between paired copies. Recovery is operationalized as sustained exact coalescence under shared randomness. Failure to observe coalescence is recorded as censored; it is not zero recovery time. This is stricter and different from return to a baseline activity distribution.

Passive retention is agreement with an imposed target minus agreement with a shuffled target. The initial overlap is created by the intervention itself. Early positive excess is therefore expected even in an uncoupled partially refreshed system. Evidence for an interaction contribution requires comparison with the uncoupled arm and a matched time course. This test contains no training rule and cannot demonstrate associative learning.

## 5. Historical observations

Earlier v2 output showed larger spectral exponents at smaller update fractions and lower exponents at larger fractions. This is an exploratory association, not an identified causal mechanism. No new statistical tests, effect-size estimates, confidence intervals, or reconstructed observations are introduced in this draft.

The five supplied v5 runs reported overlaps of 0.40, 0.55, 0.55, 0.45, and 0.65, averaging 0.52; every recall flag was False. The stored flag indicated that an external snapshot had been copied, not that the network learned a pattern. The weak/moderate memory labels are withdrawn. A 0.50 chance benchmark is conditional on an appropriate balanced independent comparison, not a universal null for correlated states.

## 6. Measurement audit

At L=20 and f=0.005 exactly two units update per step. With an active-step criterion requiring more than one new activation, detected active steps necessarily contain two activations. An exact-one within-episode branching ratio can therefore arise from the detector rather than critical propagation. Earlier branching-distance rankings and coordinated/runaway/critical classifications are retired.

The variable previously named spatial_spread measured positive-unit occupancy, not propagation across space. Events touching recording boundaries are truncated or censored. Artificially capped v3.2 avalanche sizes cannot be inverted to recover true event counts. Unique-unit participation cannot be trusted when code repeatedly inspects a final state instead of historical activation identities.

## 7. Validation results: pending

No v7 outcome is inserted here. Completion requires the original per-run results and configuration for any claimed validation. Planned reporting includes all 45 trials, five matched seeds per condition, seed-level contrasts against uncoupled controls, uncertainty, and censoring counts. Five seeds provide limited precision; consistent signs alone are not a sufficient significance or equivalence criterion. Failure to detect a difference does not establish equivalence or prove that partial updating is the sole mechanism.

The proposed design is not described as preregistered: it was developed after exploration of earlier outputs. If an analysis plan is frozen before examining new validation data, its timestamp and deviations should be recorded. Hypotheses, exploratory findings, and follow-up tests must remain distinguishable.

## 8. Limitations and interpretation

The model has no established biological fidelity, learned representation, task competence, or consciousness indicator. Positive interactions can change dynamics without producing cognition. Spectral estimates depend on observation length, sampling, frequency range, and fitting choices. A single shuffled target is a limited retention comparator, and five seeds do not support broad generalization. Exact coalescence under shared noise is coupling-dependent and should not be equated with general resilience.

## 9. Closure statement

The defensible completed contribution at present is an exploratory simulation and measurement-audit study. Controlled validation remains a substantive evidence gap rather than an insignificant formality. Publication can proceed as a transparent methods/preliminary report, provided it does not present the planned comparison as completed. Once original validation outputs are supplied, only the results, discussion, abstract, and conclusion need targeted updating.

## 10. Separate D4 development track

D4 error-corrected telemetry is a distinct engineering extension, not evidence for the mini-brain findings. The TOLBIT sims.py excerpt includes a D4 nearest-point decoder and a simulated comparison against density-matched Z4. The earlier assertion of about 3 dB measured gain at error probability 0.001 is not substantiated by the excerpt alone and is withdrawn pending actual results. A finite codebook, encoder/decoder mapping, scaling, rate/power fairness, and application benchmark are required before commercial performance claims.

## Source record

Primary project evidence: the supplied mini-brain conversation and historical paste.txt output, cited in that conversation as file:372. Engineering excerpt: TOLBIT/COHERENCE_FRAMEWORK_INITIATIVE/11_COMPUTATION_AND_TOOLS/sims.py, cited as file:331. These are internal evidence identifiers, not public archival DOIs. No additional experimental files are bundled or claimed to have been recovered.