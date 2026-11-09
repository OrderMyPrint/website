# Visual page editor — design for review (2026-11-09)

**Status:** APPROVED 2026-11-09 — section-based, tablet included, no scheduling (`docs/approvals/visual-editor-design-approval.md`). Implementation started.
**Request (Director, 2026-11-09):** "design the website editor of same as elementor, but before implementing it make the figma design of it for the omp-admin panel — a visual editor for editing the overall website pages."
**Figma:** file `9O88DWSEv7qCKPYOn5GwZy`, page **11 — Admin Operations**, row "Visual page editor (design 2026-11-09)" below AD-WEB-01…06.

## Screens

| ID | Screen | What it shows |
| --- | --- | --- |
| AD-WEB-07 | Section selected | Full-screen editor: top bar (back, page + status, device toggle, undo/redo, history, Preview, Save draft, Publish), live canvas of the real page, selected section outline + floating toolbar (drag, up, down, duplicate, hide, delete), hover outline, "Add section" insert point; left panel Content tab |
| AD-WEB-08 | Add section | Section library grouped Page openers / Products & prices / Content / Help & action with search; dragging a section onto the page shows a "Drop here" line |
| AD-WEB-09 | Inline text edit + Style | Typing straight onto the page (selection, caret, character count, Done); Style tab with brand-token presets: background, spacing, width, alignment, image side |
| AD-WEB-10 | Mobile preview + Navigator | Device = mobile (390 px) preview; Navigator lists every section with drag-to-reorder, select and hide; header/footer locked as site-wide; per-device visibility switches |
| AD-WEB-11 | Publish review | Dialog listing what changes (edited / added / hidden / style), checks (links, alt text), non-blocking warnings, Publish now; needs `content.publish`, audited |

Entry point: AD-WEB-02 gains a **Visual editor** button. The form-based page editor stays as the accessible fallback.

New components (page 03 — Components): `Editor / Device toggle`, `Editor / Section tile`, `Editor / Navigator row`, `Editor / Selection toolbar`, `Editor / Insert point`, plus icons monitor, tablet, smartphone, undo, redo, grip, arrow-left, eye-off, type, layout, history, align-left, align-center.

## How it differs from Elementor (deliberately)

Elementor lets editors place any widget anywhere and add custom CSS/HTML. This design keeps the Elementor-style workflow (live canvas, click-to-select, drag-and-drop library, inline typing, navigator, responsive preview, undo/redo, revisions) but builds pages from the **typed, brand-designed sections** that already exist (D-30, proposed):

- Every page stays on-brand, accessible and fast; no editor can break the layout on mobile.
- No raw HTML/CSS/scripts: nothing to sanitise, no XSS route into the storefront.
- Pages keep working with the API's publish checks (broken links, missing alt text) and version history.

If the Director wants free-form layouts (columns, arbitrary widgets, custom CSS), that is a larger build with security and design-consistency costs, and it should be decided before implementation.

## Needed at implementation (after approval)

- API: per-section `style` presets (background token, spacing, width, alignment, image side) and per-device `visibility` in the content schema; a change-summary endpoint for the publish review.
- Admin: canvas renders the storefront's own section components (shared package or iframe of a storefront preview route), selection overlay, drag-and-drop, undo/redo history, autosave of drafts.
- Storefront: preview route that renders a draft document (staff-only, no indexing).

## Open questions for the Director

1. Approve the section-based approach (D-30), or require free-form layouts?
2. Tablet visibility switch: needed, or desktop + mobile only?
3. Scheduled publishing (publish at a date/time) for campaign pages: needed in R1?
