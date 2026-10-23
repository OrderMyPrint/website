# ADR-0001 — Multi-repository layout

- **Status:** Accepted (mandated by the master brief)
- **Date:** 2026-10-23

## Context
The brief forbids a monorepo. The storefront, admin and API have different deploy targets and different risk profiles.

## Decision
- Each application lives in its own private repository under the `OrderMyPrint` GitHub organisation.
- Shared UI is published as a versioned package (`@ordermyprint/ui`).
- Shared API types are generated from the API's OpenAPI document as a versioned client package. They are not copied.
- `OrderMyPrint/website` holds documentation and architecture (source of truth for requirements and decisions).

## Consequences
- Cross-repo changes need coordinated releases (semver, changelogs).
- No business logic outside `omp-api`.
- Repository names are proposed in D-04; nothing is created before Phase 2 approval.
