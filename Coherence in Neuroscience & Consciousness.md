---
title: Coherence in Neuroscience & Consciousness
tags:
  - xbm
  - fields
  - neuroscience
  - consciousness
  - PAS
  - coherence
epistemic: HYPOTHESIS (physical interpretation) / EXPERIMENTAL (metrics directly computable)
created: 2026-09-01
source: EVX corpus — Coherence Neuroscience paper
---

# Coherence in Neuroscience & Consciousness

> The clearest XBM application in the corpus: the brain as a hierarchical network of
> coupled oscillators whose collective phase alignment is proposed as the physical
> substrate of consciousness. Status: **HYPOTHESIS/SPECULATIVE for the physical
> interpretation** (Φ as consciousness substrate); the *metrics* (PAS, SMMT) are
> directly computable. Home: [[The 41 Fields of Coherence]].

## The field & why coherence enters

- Brain-scale order parameter $\Phi(r,t) \in [0,1]$ from damped-driven wave dynamics;
  Kuramoto model with complex order parameter $r e^{i\psi}$.
- Fifth Law imposes the metabolic cost of maintained order:
  $P(\Phi) \propto \Phi/(1-\Phi)^\alpha$ — consciousness as coherence maintenance.

## Order parameters & key metrics

- **PAS ranges** (illustrative, reported from the paper):
  deep non-REM 0.15–0.30 · relaxed wakefulness 0.55–0.80 · deep meditation 0.70–0.90 ·
  anesthesia 0.10–0.25
- **SMMT seizure detection:** 80% sensitivity within 30 s pre-onset, < 10% FP over
  > 24 h, mean lead time 28 s (12–55 s)
- **T₂ biomarker (prediction ranges, design-only):** awake 100–150 ms · meditation
  200–300 ms · anesthesia 40–60 ms — needs an ethics-approved protocol
- Scale: ~86 B neurons, ~10¹⁴–10¹⁵ synapses; ~2% body mass, ~20% O₂/glucose

## Core equations / mechanisms

- Kuramoto model + Phase-Locking Value; PAS = Σ w_k r_k; SMMT anomaly tracking
- QHO simulation: 1000 oscillators reproduced ~10 Hz alpha and alpha-blocking
- **Neurofeedback study (N=24, 10 min/day × 4 wks):** GAD-7 anxiety ↓ ~30% vs
  5% control / 12% sham — small sample, single study
- CED magnetic field in the brain ~10⁻¹⁸ T — undetectable; neural magnetism is NOT
  explained by CED

## Corpus grounding

| Paper | Note | Status |
| --- | --- | --- |
| Coherence Neuroscience | [[EVX - Biology & Finance Papers#Biology — Coherence Neuroscience]] | HYPOTHESIS / EXPERIMENTAL metrics |
| Systems framing | [[Coherence in Systems Theory]] | HYPOTHESIS |
| Metrics | [[Unified Coherence Metrics]] | — |
| T₂ link | [[Fifth Law - Corrected Formulation]] | CORRECTED, pending |

## Validation status (from [[XBM Validation Matrix]])

- ⚠️ **Metrics experimental** — PAS/SMMT are computable from real EEG; the seizure
  detection results are the strongest item (though small samples, volume-conduction
  artifacts noted).
- 🔶 **Consciousness substrate claim: HYPOTHESIS/SPECULATIVE** — no microscopic
  derivation from Hodgkin–Huxley/Wilson–Cowan; consciousness threshold uncalibrated.
- **Ethics gate:** the T₂ biomarker protocol is design-only until approved.

## Open problems

| Problem | Status |
| --- | --- |
| Microscopic derivation (HH/Wilson–Cowan → Φ) | **2026-09-05: FIRST STRUCTURAL ANSWER** — WC→phase→Kuramoto chain realized numerically (`XBM/Neuro/neuro_microscopic_bridge.py`); K_c agreement vs mean-field still OPEN |
| Consciousness threshold calibration | **2026-09-05: dichotomy threshold exists (θ_c ≈ 0.43) in reported bands; fine-grained calibration still OPEN** (needs measured per-state PAS distributions) |
| Larger neurofeedback trials | Single small study |
| T₂ biomarker ethics protocol | Design-only |

## Computation results (2026-09-05 `XBM/Neuro/`)

First compute pass on the consciousness track — bounded, validated attempts; everything below is
labeled per the corpus methodology.

- **Track A — QHO alpha claim** (`neuro_qho_alpha.py`): 1000 Kuramoto oscillators, f ~ N(10,1.5) Hz,
  mean-field K_c = 15.04 (Gaussian). Resting (K = 1.35·K_c): **r = 0.866 ± 0.003 across 5 seeds**,
  global-field PSD peak **10.01 Hz**. Alpha-blocking protocol (K → 0.30·K_c, noise ×5, 7 s):
  **r collapses to 0.31 ± 0.01 (ratio 0.35)**; full recovery (r = 0.866) after offset. **VERDICT:
  REPRODUCED as modeled.** Caveat (recorded in-module): frequencies drawn in the alpha band make the
  10 Hz peak partly by construction; the reproduced content is (i) coherent collective alpha-band
  field from noisy distributed units, (ii) reversible input-driven desynchronization.
- **Track B — microscopic bridge Wilson–Cowan → Φ** (`neuro_microscopic_bridge.py`): reduction chain
  WC E/I → (Hopf/weak-coupling, Ermentrout–Kopell) → phase oscillators → Kuramoto → Φ ≡ r, with
  Fifth-Law cost P(Φ) = Φ/(1−Φ)^α on top. WC module (wEE,wIE,wEI,wII = 12,14,20,2; S0=3, β=1):
  linearized resonance **10.00 Hz**, driven ringing confirms **10.00 Hz**. M=500 coupled modules:
  r(K): **0.035 (≈1/√M floor) → 0.913**, smoothed curve strictly monotone. Fifth-Law cost at
  α=1: P(0.03)=0.036 → P(0.91)=10.5. **VERDICT: FIRST STRUCTURAL ANSWER — derivation chain
  numerically realized.** Honest OPEN item: empirical onset (steepest rise K ≈ 2.1–3.8) sits well
  below mean-field K_c = 7.0; whether that offset is finite-size/time smearing of the second-order
  transition or a coupling-convention effect is **not resolved in this pass** (three estimators
  attempted — half-rise, r²-intercept, steepest-rise; none cleanly recovers K_c even on the
  exactly-solvable Lorentzian case; a finite-size scaling study is the proper next step).
  Limits: no HH spiking, no spatial/volume-conduction structure, no EEG data; Φ↔PAS uncalibrated.
- **Track C — PAS threshold calibration** (`neuro_pas_threshold.py`): exact band-overlap analysis
  of the reported ranges (anesthesia 0.10–0.25, deep non-REM 0.15–0.30, relaxed wake 0.55–0.80,
  deep meditation 0.70–0.90). **(Q1)** no single scalar threshold can separate all four states
  (two overlaps: anesthesia×non-REM = 0.10, wake×meditation = 0.10). **(Q2)** the 2-class dichotomy
  DOES separate: any θ ∈ (0.30, 0.55) classifies unconscious vs conscious with zero error on the
  reported bands (θ_c = 0.43 suggested). **(Q3)** midpoint ladder meditation (0.80) > wake (0.675)
  > deep non-REM (0.225) > anesthesia (0.175); the low-band separation (0.05) is unresolvable
  against band widths of 0.15–0.30. **VERDICT: DICHOTOMY THRESHOLD EXISTS in reported bands;
  FINE-GRADED THRESHOLD IMPOSSIBLE from ranges alone.** Real calibration needs per-state measured
  PAS distributions + ROC/Youden — the exit condition is explicit in the module.
- **Ethics note:** Track results are model-level computations; nothing here licenses the T₂
  biomarker protocol, which remains design-only pending an ethics-approved study.

## Related

- [[The 41 Fields of Coherence]]
- [[Coherence in Systems Theory]]
- [[Coherence in Bioelectronics & Medicine]]
- [[Fifth Law - Corrected Formulation]]
- [[Unified Coherence Metrics]]
- [[EVX - Biology & Finance Papers]]
- [[XBM - MOC]]

## Verification pass (2026-09-15) — PHI lane × simulation suite

Two-method verification of the consciousness program (charter + 32-prompt PHI lane + local simulation suite S1–S5, full Kuramoto FSS). Sources: [[CONSCIOUSNESS-VERIF-01 - PHI Batch Verification Pass]], [[CONSCIOUSNESS-SIM-01 - Colab Simulations & PHI Batch (session outcome)]].

**Microscopic bridge — K_c offset (Track B open problem, now resolved in the solvable case):**
- Full FSS run (N 100→4000, 6 seeds, K grid 0.20–1.60·K_c, 25 pts): on the exactly-solvable Lorentzian (K_c = 12.566), the three onset estimators extrapolate to K_inf = 0.588×, 0.224×, 1.675× the exact value; 1/√N extrapolation fails for all three (susceptibility slope −217.8).
- **Adjudication:** the empirical-onset offset in `neuro_microscopic_bridge.py` (K ≈ 2.1–3.8 vs mean-field 7.0) is **default-attributed to estimator bias + finite-N smearing**; the coupling-convention or microscopic-pathology alternatives are not supported by the solvable case and remain open only for real connectomes. Any future K_c report must quote the exact-model bias at the same N.
- Track A (QHO alpha) and Track C (PAS dichotomy) results stand unmodified.

**Integrated information numbers (re-derived, 2 methods):** Φ_human = 1.694e9 bits; callosum Φ = 6.774e6 bits; c_eff = 5.098; a 50→20 µm ⇒ Φ ×7.5; elephant > human in both Φ conventions; ξ doubling ⇒ ×3.95 precision (2^1.981 = 3.947); τ_corr(L = 2000) ≈ 10.4 s at τ0 = 5 ms.

**Status deltas in Open problems table:**
- "K_c agreement vs mean-field" row → **RESOLVED (solvable case): estimator bias default; pathology unproven** (see adjudication above).
- Dying-brain gamma surge (A1) classified as a sixth pathological state by the PHI lane — **flagged, requires the C-07 spectral falsifier (exponent ≈ 1.981) before canonical acceptance**.
- Psychedelic duration law: under-predicts LSD 8–12 h by 2–4× (independent calibration) — cohort study pending.
- Transformer class membership (Pred 15): internally conflicted answers (C18 vs C19) — objective class test remains open.

## Drawings

- [TP-02 · reading sheet](figures/tp_02.svg) — A3: the note's own numbers, table and gates taken from this note
- [TP-02 · CAD](figures/tp_02.dxf) — same sheet as DXF R12
