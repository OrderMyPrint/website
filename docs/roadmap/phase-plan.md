# Phase Plan & Tracker

| | |
|---|---|
| Updated | 2026-11-05 |

**Rule:** DESIGN FIRST → APPROVAL → IMPLEMENTATION → TESTING → DEPLOYMENT APPROVAL.

**Statuses:** NOT STARTED · IN PROGRESS · BLOCKED · READY FOR REVIEW · APPROVED · COMPLETED.

No phase is marked APPROVED or COMPLETED without evidence and the Director's explicit approval, recorded in `docs/approvals/`.

| Phase | Name | Status | Gate / approval needed | Evidence |
|---|---|---|---|---|
| 0 | Discovery, audit & requirements | **COMPLETED** (G0 APPROVED 2026-10-23) | **G0**: discovery scope + design direction (D-01, D-03) | `docs/discovery/phase-0-discovery-report.md`, `docs/approvals/G0-discovery-approval.md` |
| 1 | Figma design (editable file, components, prototypes) | **COMPLETED** (G1 APPROVED 2026-11-04) | **G1**: design approval before any UI implementation | `docs/design/phase-1-handoff.md`, `docs/approvals/G1-design-approval.md`, [Figma](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy) |
| 2 | Repository & architecture setup | IN PROGRESS — storefront repo [`OrderMyPrint/omp-storefront`](https://github.com/OrderMyPrint/omp-storefront) created on the Director's instruction (Next.js 15, CI); G2 decisions still to be recorded | **G2**: architecture + hosting (D-02, D-04, D-05) before repos are created. Director uses **Vercel** today (2026-11-04); hosting options updated in `architecture.md` §6 | — |
| 3 | Backend & data implementation | NOT STARTED | Follows G1 + G2 | — |
| 4 | Storefront implementation | IN PROGRESS — front end for all Phase 1 storefront screens built ahead of the API on the Director's instruction (2026-11-05); prices are browser estimates and forms show a "not open yet" notice until Phase 3 | Follows G1 + G2; needs the Phase 3 API before checkout, sign-in, quotes and tracking work | `omp-storefront` README, commit `24214c1` |
| 5 | Admin implementation | NOT STARTED | Follows G1 + G2 | — |
| 6 | Payments, shipping & integrations | NOT STARTED | **G6**: provider selections (D-06, D-06b, D-07) | — |
| 7 | QA & UAT | NOT STARTED | **G7**: release report accepted | — |
| 8 | Staging & production deployment | NOT STARTED | **G8a** staging, **G8b** production (separate explicit approvals) | — |

## Proposed sequence and dependencies

```
P0 ─G0─▶ P1 ─G1─┬─▶ P2 ─G2─▶ P3 ─┬─▶ P4 ─┐
                │                 └─▶ P5 ─┼─▶ P6 ─G6─▶ P7 ─G7─▶ P8 (G8a → G8b)
                └─ (D-02 hosting can be decided in parallel with P1)
```

- P3 starts with catalogue, pricing engine and artwork, because those modules block P4 and P5.
- P4 and P5 proceed in parallel once their APIs exist.
- Business data (D-08) and policies (D-09) must arrive before P7 UAT.

## Phase 1 plan (on G0 approval)

1. Create the Figma file in Digitech Miner's team (D-20), following the Figma integration's documented workflow.
2. Build foundations (variables) → components → storefront desktop/mobile → configurators → cart/checkout → quotes → account → admin → prototypes.
3. Produce the handoff report and stop at G1.
