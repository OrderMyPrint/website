# Admin Design Audit — 2026-11-05

| | |
|---|---|
| Requested by | Director, 2026-11-05: "check the admin panel flow in figma if any flow UI/UX incomplete or issue then fix it first then start its implementation … control of full website into the admin panel dynamically, super control over full website content and pages and everything … RBAC support" |
| Scope | Figma pages `10 — Admin Dashboard` (4 frames) and `11 — Admin Operations` (28 frames + 11 overlays) against `figma-design-brief.md` §6.2 and the new requirement |
| Result | Operations flows (orders, artwork, production, QC, shipping, payments, quotes) are complete. **Website content management and RBAC are not designed.** |

## Findings

| # | Finding | Severity | Fix |
|---|---|---|---|
| A1 | No **Website** area: pages, homepage sections, navigation/footer, media, FAQ, SEO and announcement bar cannot be managed. Storefront copy is hard-coded today. Conflicts with the new "full website control" requirement and with D-19 (content pages admin-managed) | Blocker | New screens AD-WEB-01…06 + a WEBSITE group in the sidebar |
| A2 | **AD-CAT-01 Category list/editor** listed in the brief but never drawn | Blocker | Add AD-CAT-01 |
| A3 | **RBAC** is a fixed matrix (5 roles × 6 permissions). No staff list, no role create/edit, no module-grouped permissions, no deactivate / reset-2FA / change-role flows | Blocker | AD-STF-01 becomes Staff list + Roles tabs; new AD-STF-02 Role editor, AD-STF-03 Staff member |
| A4 | No **access-denied** state; no rule for what staff without a permission see | High | AD-ERR-01 (403) + rule: sidebar hides modules the role can't read; actions they can't perform are hidden, read-only fields shown disabled |
| A5 | Settings lacks storefront contact details (phone, hours), and the notification template "Edit" links lead nowhere | Medium | Contact details move to AD-WEB-06 Site settings; template editor is part of AD-WEB-06 |
| A6 | "DEMO" annotations remain on AD-DASH-01 and AD-MAP-01, contrary to X-14 | Low | Reword as design notes ("Example values") |

## Permission model (proposed, for AD-STF-02 and the API)

Permissions are `module.action` keys, grouped by module in the role editor. Roles are bundles of keys; **Owner** (super admin) has every key, cannot be deleted, and at least one active Owner must always exist. Every role and staff change needs step-up re-authentication (AD-AUTH-02) and is written to the audit log.

| Module | Keys |
|---|---|
| Dashboard | `dashboard.read` |
| Catalogue | `catalogue.read`, `catalogue.write`, `catalogue.publish` |
| Pricing | `pricing.read`, `pricing.write`, `pricing.publish` |
| Website content | `content.read`, `content.write`, `content.publish`, `media.write`, `navigation.write`, `site_settings.write` |
| Orders | `orders.read`, `orders.write`, `orders.cancel` |
| Quotations | `quotes.read`, `quotes.write`, `quotes.override_price` |
| Artwork | `artwork.read`, `artwork.review` |
| Production & QC | `production.read`, `production.write`, `qc.write` |
| Shipping | `shipments.read`, `shipments.write` |
| Customers | `customers.read`, `customers.write`, `credit_terms.approve` |
| Payments & invoices | `payments.read`, `refunds.request`, `refunds.approve`, `invoices.read` |
| Coupons | `coupons.read`, `coupons.write` |
| Reports | `reports.read` |
| Staff & roles | `staff.read`, `staff.manage`, `roles.manage` |
| Settings & audit | `settings.write`, `audit.read` |

Default roles: **Owner** (all), **Admin** (all except `roles.manage`, `refunds.approve`), **Content editor** (catalogue/content/media/navigation read-write, no publish of pricing), **Sales**, **Pre-press**, **Production**, **Finance** — editable by an Owner.

## Website content model (proposed, for AD-WEB and the API)

- **Pages** (`home`, `about`, policies, help, custom landing pages) are built from typed **blocks**: hero, rich text, image + text, product grid (by category or hand-picked), category tiles, CTA band, FAQ list, assurance strip, image gallery. No raw HTML.
- Each page has **draft → published** versions with history and restore, SEO fields (title, description, social image, no-index) and a live preview.
- **Navigation**: header category bar, utility links, footer columns — ordered lists of links to pages, categories, products or URLs.
- **Media library**: images with alt text (required), usage list, replace without breaking links.
- **Site settings**: brand logo (supplied files only), contact phone/hours/email, announcement bar (text, link, schedule), default SEO, redirects (301).
- The storefront reads published content from the API and revalidates on publish.

## Fixes made in Figma (2026-11-05)

All on page `11 — Admin Operations`, row "Website content & access control (audit 2026-11-05)", built from the file's own components, colour variables and text styles.

| Finding | Fix | Frame |
|---|---|---|
| A1 | Website content hub with tabs Pages · Navigation · Media · FAQ · Site settings | AD-WEB-01 Pages · AD-WEB-02 Page editor (Home: section list with show/hide and reorder, block settings, SEO, version history, publish) · AD-WEB-03 Navigation & footer · AD-WEB-04 Media library (alt text required, in-use files can't be deleted, brand files locked) · AD-WEB-05 FAQ · AD-WEB-06 Site settings (brand, contact, announcement bar, SEO defaults, redirects) |
| A2 | Category list + editor | AD-CAT-01 |
| A3 | Staff list, role editor with module-grouped permission keys, staff member page (role, reset 2FA, sign out everywhere, deactivate) | AD-STF-01 (v2) · AD-STF-02 · AD-STF-03. The old matrix frame is kept, renamed "(superseded 2026-11-05)" |
| A4 | Access-denied page and the permission rule for the sidebar and actions | AD-ERR-01 (sidebar filtered for the Production role) |
| A5 | Contact details and announcement bar moved into Site settings | AD-WEB-06 |
| A6 | DEMO wording already replaced on the dashboard and order map | AD-DASH-01, AD-MAP-01 |
| — | Admin Sidebar component: new WEBSITE group with "Website content"; nav rows 40 → 36 px so the longer list fits the 988 px frame | Component `Admin Sidebar` (all admin screens update) |

## Status

Figma fixes **done**. The Director asked for the gaps to be fixed "first then start its implementation" (2026-11-05); the new frames are open for the Director's review in Figma, and implementation proceeds on that instruction. Admin is built as a separate repository, `OrderMyPrint/omp-admin` (Director, 2026-11-05), deployed to its own domain.
