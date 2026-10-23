# ADR-0004 — PostgreSQL and a PostgreSQL-backed job queue

- **Status:** Proposed (depends on ADR-0003)
- **Date:** 2026-10-23

## Decision
- **PostgreSQL 16/17** is the system of record.
- **pg-boss** handles background jobs (artwork processing, email, reconciliation, PDFs) with a transactional outbox.
- **No Redis in Release 1.**

## Why
- Transactional integrity for orders, payments and invoices.
- `NUMERIC` money.
- JSONB snapshots.
- Partial unique indexes (one active pricing version).
- One fewer service to run and back up.

## Revisit when
Sustained queue throughput or rate-limiting needs exceed what PostgreSQL handles comfortably. The fallback is BullMQ on Valkey.
