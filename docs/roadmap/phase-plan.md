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
| 2 | Repository & architecture setup | **COMPLETED** (G2 APPROVED 2026-11-05) — Vercel for all apps, PostgreSQL, `omp-*` public repos; D-05 storage, D-29 scanning, D-10 errors open | **G2** | `docs/approvals/G2-architecture-approval.md` |
| 3 | Backend & data implementation | IN PROGRESS — done: catalogue + pricing API, staff sign-in with 2FA + RBAC + audit log, website content API (pages, navigation, site settings, FAQ, media, redirects); storefront reads content from the API (with built-in fallback); invited staff can resume 2FA set-up; 50 tests, CI green, deployed to Vercel on a Neon free-tier database (production branch migrated and seeded 2026-11-09; staff settings set in Vercel, take effect on the next API deploy). Next: artwork, cart, customer OTP, orders | Follows G1 + G2 | [`omp-api`](https://github.com/OrderMyPrint/omp-api) `c9d10a1` |
| 4 | Storefront implementation | IN PROGRESS — front end for all Phase 1 storefront screens built ahead of the API on the Director's instruction (2026-11-05); prices are browser estimates and forms show a "not open yet" notice until Phase 3 | Follows G1 + G2; needs the Phase 3 API before checkout, sign-in, quotes and tracking work | `omp-storefront` README, commit `24214c1` |
| 5 | Admin implementation | IN PROGRESS — **Visual page editor live (2026-11-10, D-30, AD-WEB-07…11):** full-screen editor on the real storefront design (iframe canvas `/editor-preview`), click-to-select, type on the page, section library, navigator with drag reorder, brand style presets, desktop/tablet/mobile visibility, autosave, undo/redo, version restore, publish review; separate app `omp-admin` (React + Vite) built and tested locally against the API: sign-in + authenticator, invitation, role-filtered navigation, access denied, Staff & roles, Website content (pages, navigation, FAQ, media alt text, site settings, redirects), Audit log, re-confirm dialog. Pushed to public repo [`omp-admin`](https://github.com/OrderMyPrint/omp-admin), CI green; Deployed (Director-approved) at `omp-admin-two.vercel.app`; first Owner invitation issued. **Catalogue & pricing module done 2026-11-09:** Products, Categories (create hidden, edit, show/hide with `catalogue.publish`, reorder, delete empty), product editor (details, option labels/availability, artwork slots), pricing versions with published-by, draft editor (tiers, option prices, setup/size surcharges, bulk-quote quantity), diff against live, test bench (draft vs live), publish confirm with step-up code; API `admin/catalogue/*` with 13 new e2e tests (63 total green), no migration needed. Next slice: new products, option groups/constraints (AD-CAT-04), scheduled publishing, slug changes with redirects; then orders | Follows G1 + G2 | AD-AUTH/NAV/STF/ROL/WEB/AUD/ERR/CAT-01–03/PRC-01–03 frames, `omp-admin` `16ae953`, `omp-api` `b8cd99d` |
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
