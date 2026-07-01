# Information architecture

How the portfolio is organised — routes, index slider destinations, and where each content type lives.

Related docs: [`design.md`](./design.md) (implementation) · [`README.md`](./README.md) (setup & deploy)

---

## Site tree

```
/                           Index — horizontal scroll slider (entry)
├── /projects               Case study list (hover thumbnails)
│   └── /projects/[slug]    Long-form case study (one TSX per slug)
├── /ideas                  AI experiment gallery (external demos)
├── /craft                  Motion + illustration bento grid
│   └── /craft/[slug]       Craft essays (e.g. design review checklist)
├── /archive                About / “Me”
├── /recent                 Legacy alias → Cisco case study href
└── /fun/*                  Legacy redirects → /craft (next.config.ts)
```

Global chrome on every page: **JBAI** floating chat (`src/components/ai-chat/*`).

---

## Index slider (`/`)

Scroll-driven frame carousel. Frame order matches `FRAMES` in `src/lib/constants.ts`.

| # | Frame id | Label | Destination |
|---|----------|-------|-------------|
| 1 | `hero` | JB Portfolio | — |
| 2 | `projects` | Projects | `/projects` |
| 3 | `ideas` | AI Experiment | `/ideas` |
| 4 | `design-review-checklist` | My favorite | `/craft/design-review-checklist` |
| 5 | `experiments` | Craft | `/craft` |
| 6 | `archive` | Me | `/archive` |
| 7 | `contact` | Contact | In-page contact sheet |
| 8 | `manifest` | Manifest | In-page manifest sheet |

Monogram assets: `public/assets/index/` (`craft-monogram.png`, `ideas-monogram.png`, `article-cursor-hand.png`, wireframe variants).

---

## Case studies

| Layer | Location |
|-------|----------|
| Metadata (title, year, client, services) | `src/lib/project-content.ts` |
| Page body & layout | `src/components/case-studies/<Slug>.tsx` |
| Route gateway | `src/app/projects/[slug]/page.tsx` → `dynamic-case-study-gateway.tsx` |
| Page shell (scroll, back nav, analytics) | `src/components/projects/case-study-page-shell.tsx` |
| Projects index rows | `src/lib/projects-list-data.ts` |

### Visibility

| Rule | Slugs / behaviour |
|------|-------------------|
| On `/projects` index | All case studies except `HIDDEN_PROJECT_SLUGS` |
| Hidden from index | `freshprints-heal-tool`, `piggy-personalised-mutual-fund-recommendation`, `saltmine-sync` |
| `noindex` (sitemap) | Same three drafts — see `getIndexableCaseStudySlugs()` |
| Pre-launch blur gate | `cisco-policy-copilot` — daily IST reset (`CASE_STUDY_REVEAL_SCHEDULE`) |

Direct URLs work for hidden and gated case studies; gating only affects blur + countdown UX.

---

## Craft vs Ideas

| Gallery | Route | Source | Grid shows |
|---------|-------|--------|------------|
| **Craft** | `/craft` | `getExperimentGalleryItems()` | Motion + illustration (not article-only, not Ideas slugs) |
| **Ideas** | `/ideas` | `IDEAS_EXPERIMENT_SLUGS` | Five external AI demos with **Try Now** |

Craft essays (e.g. design review checklist) live at `/craft/[slug]` but may be omitted from the bento grid when `isArticleOnlyExperiment`.

---

## Media sources

| Asset type | Typical path | Resolver |
|------------|--------------|----------|
| JB editorial PNGs | `public/assets/illustrations/jb_illustrations/` | `getJbIllustration()` |
| Cisco local PNGs | `public/assets/illustrations/cisco/` | Direct path or `CASE_STUDY_CDN_MEDIA` |
| Case study CDN | Vercel Blob `/Cisco/*`, `/Hover/*`, etc. | `CASE_STUDY_CDN_MEDIA` in `asset-cdn.ts` |
| Craft / Ideas previews | Blob CDN keys | `EXPERIMENT_CDN_MEDIA` |
| Index monograms | `public/assets/index/` | Static paths in `FRAMES` |

Local prefixes are allowlisted in `LOCAL_PUBLIC_ASSET_PREFIXES` — not rewritten to Blob CDN.

---

## Documentation map

| Doc | Purpose |
|-----|---------|
| [`README.md`](./README.md) | Setup, scripts, deploy, SEO monitoring, preview images |
| [`IA.md`](./IA.md) | This file — routes and content ownership |
| [`design.md`](./design.md) | Component wiring, gallery rules, editorial patterns |
| `.cursor/rules/case-study-headings.mdc` | Heading & caption casing |
| `.cursor/rules/case-study-reveal-timer.mdc` | IST reveal countdown rules |
| `.cursor/skills/jb_illustrations/` | Illustration generation skill |
