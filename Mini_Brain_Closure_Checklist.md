# Mini-Brain: Minimal Closure Plan

One-page handoff | 15 November 2026

The writing package is ready as a draft. No additional simulation version or D4 integration is required to close the current study.

## Choose the publication route

Route A: release an exploratory dynamics and measurement-audit report now, explicitly stating that controlled validation is pending. Route B: provide the existing v7 results if already run, or execute the supplied pilot once after a compatibility check, then insert its actual outcomes. Do not rerun merely to obtain a preferred result.

## One upload, not repeated copying

For Route B, upload the complete v7 ZIP if available. Otherwise provide mini_brain_v7_results.csv, seed_matched_control_differences.csv, and config.json together. Preserve raw NPZ files locally. Original historical CSV files are also needed for any exact historical reanalysis; printed examples must never be expanded into records.

## Final checks

Verify 45 unique mode/update_fraction/seed combinations, five seeds per condition, valid raw histories, complete time windows, configuration consistency, and explicit censoring. Resolve any code/runtime errors without silently changing the experiment. Preserve both original and corrected versions if changes are necessary.

## Final deliverables

Update only the manuscript results, discussion, abstract, and conclusion. Attach original results, configuration, code, and a README. Add author details and choose a license before public release. Do not claim that this draft already contains those experimental files.

## Keep D4 separate

The D4 hybrid is a later engineering project. Do not delay closure by adding it, and do not make commercial efficacy claims before a fair benchmark. Its measured gain has not been verified in this package.