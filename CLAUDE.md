# Order My Print — Working Rules

This repo (`OrderMyPrint/website`) is the documentation and architecture source of truth. App code goes in separate repos (no monorepo), created only after gate G2.

## Read first
- `docs/roadmap/phase-plan.md` — current phase and gates.
- `docs/decisions/decision-register.md` — open and decided decisions.
- `docs/prd/` and `docs/architecture/` — requirements and proposed architecture.
- `docs/design/figma-design-brief.md` — Figma structure and screen IDs (IDs are permanent).

## Non-negotiables
- DESIGN FIRST → Director approval → implementation → testing → deployment approval. Never skip a gate or assume an approval; record approvals in `docs/approvals/`.
- No invented prices, MOQs, materials, tax rates, turnaround, integrations or test results. Demo data is marked DEMO.
- Never copy the reference site's (theboxandlabelco.com) branding, copy, assets or business rules.
- Brand assets in `docs/brand/supplied/` are kept byte-for-byte; never redraw or modify them.
- No purchases, hosting/DNS changes, deployments or repo creation without explicit approval.
- No secrets in Git, Figma, logs or client code.
