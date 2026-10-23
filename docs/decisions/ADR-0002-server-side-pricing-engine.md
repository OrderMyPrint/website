# ADR-0002 — Server-side, data-driven pricing engine

- **Status:** Proposed
- **Date:** 2026-10-23

## Context
Prices depend on quantity tiers, dimensions, materials, sides, print methods and locations, finishing, setup, waste, shipping, discounts and GST. The reference site uses precomputed variant matrices, which cannot express custom dimensions, T-shirt size breakdowns or DTF area pricing. The brief requires admin-configurable formulas with effective dates, and immutable order snapshots.

## Decision
- A pure TypeScript engine in `omp-api/pricing` interprets a **versioned JSON pricing document** made of typed components:
  - matrix lookup;
  - rate × measure (area, sheets, units, locations);
  - option modifiers;
  - setup;
  - finishing;
  - waste;
  - margin;
  - minimums;
  - rounding.
- No arbitrary expression evaluation.
- Money uses `decimal.js` in code and `NUMERIC` in the database.
- The same engine serves the storefront preview, cart, checkout, the quote editor suggestion and the admin preview.
- Every cart line, quote line and order line stores `pricing_version_id` and the full breakdown.

## Consequences
- Each product can start with a simple matrix and evolve to formulas without code changes.
- Golden-file tests per product are mandatory.
- Admin UX must make components understandable, with a preview and a version diff.
