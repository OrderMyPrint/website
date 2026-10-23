# ADR-0005 — Storefront on Next.js, admin as a React SPA

- **Status:** Proposed
- **Date:** 2026-10-23

## Decision
- **Storefront:** Next.js (App Router, React, TypeScript). Catalogue and PDP use SSR/ISR for SEO; configurator, cart and checkout are client components that call the API.
- **Admin:** React + Vite SPA served as static files. No SEO need; smaller attack surface; every authorisation check lives in the API.
- **Shared:** `@ordermyprint/ui` design-system package (tokens generated from Figma variables, React components); an OpenAPI-generated API client.

## Alternatives
Next.js for the admin as well. That gives one framework, but needs a Node runtime and server surface the admin does not need.
