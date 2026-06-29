# ai-playground

Portfolio site for case studies, Craft gallery (motion + illustration), and Ideas (AI experiments). Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `OPENAI_API_KEY` | For live JBAI replies | OpenAI chat completions (`gpt-4o-mini`) |
| `GIPHY_API_KEY` | Optional | Reaction GIFs on assistant replies |
| `AI_CHAT_OPENAI_ENABLED` | Optional | Set to `false` to disable OpenAI (static/fallback only) |
| `AI_CHAT_OPENAI_MAX_PER_USER` | Optional | OpenAI replies per browser session (default in code) |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL for SEO metadata and sitemap (e.g. `https://jatinbansal.vercel.app`) |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run spellcheck` | cspell over `src/**/*.{ts,tsx,md}` |

## Site map

| Route | Content |
|-------|---------|
| `/` | Index — horizontal scroll slider (hero → projects → ideas → My favorite → craft → archive → contact → manifest) |
| `/projects` | Case study list with hover thumbnails |
| `/projects/[slug]` | Long-form case study pages |
| `/craft` | Motion graphics and illustration gallery (bento grid + filter chips) |
| `/craft/[slug]` | Craft essays (e.g. design review checklist) |
| `/ideas` | AI experiment demos — external side projects with detail modals |
| `/archive` | About / “Me” slide destination |

Legacy `/fun` URLs redirect to `/craft` (`next.config.ts`).

## Case studies

- **Metadata** (title, year, client, overview): `src/lib/project-content.ts`
- **Page layouts and body copy**: `src/components/case-studies/*`
- **Projects index** (hover thumbnails, hidden slugs): `src/lib/projects-list-data.ts`
- **CDN media keys**: `src/lib/asset-cdn.ts` → `CASE_STUDY_CDN_MEDIA`

Editorial components (`CaseStudyH2`, `CaseStudyProse`, `CaseStudyTable`, etc.) live in `src/components/case-studies/case-study-prose.tsx`. Heading and caption casing rules are in `.cursor/rules/case-study-headings.mdc`.

## Craft gallery

- **Registry** (titles, categories, media, essays): `src/lib/experiments-registry.ts`
- **Filter chips & bento layout**: `src/lib/experiments-filters.ts`
- **Page shell**: `src/app/craft/` + `src/components/experiments/*`

Default filter is **Motion Graphic**. Categories on Craft: `motion-graphic`, `illustration`. Article-only and AI experiment entries are excluded from the Craft grid — see [`design.md`](./design.md).

## Ideas

- **Gallery slugs**: `IDEAS_EXPERIMENT_SLUGS` in `experiments-registry.ts`
- **Card copy & preview sizes**: `src/lib/ideas-page-data.ts`
- **UI**: `src/components/ideas/*`, route `src/app/ideas/page.tsx`

Five external demos: Lock in Police, Miner Gift, DoodleLab, FriendCaptcha, Focus Mode.

## JBAI (site chat)

Floating assistant on every page — `src/components/ai-chat/*`, API at `src/app/api/chat/route.ts`.

Curated knowledge, intent chips, OpenAI streaming, GIPHY reactions, and session limits.

## Design notes

See [`design.md`](./design.md) for index slider wiring, Craft/Ideas gallery rules, and shared case study UI patterns.

## Deploy

Deploy on [Vercel](https://vercel.com). Media is served from Vercel Blob CDN — see `src/lib/asset-cdn.ts`.

## SEO and monitoring

SEO metadata, sitemap, and structured data live in `src/lib/seo.ts`. After deploy, verify:

- `https://<your-domain>/robots.txt`
- `https://<your-domain>/sitemap.xml`

### Google Search Console (search rankings)

Vercel Analytics does **not** show keyword rank or Google impressions. Use [Google Search Console](https://search.google.com/search-console) instead:

1. Add your production domain as a property.
2. Verify ownership (DNS or HTML tag).
3. Submit the sitemap: `https://<your-domain>/sitemap.xml`
4. Check **Performance** for queries, clicks, impressions, and average position.
5. Check **Pages** / **Indexing** to confirm case studies (e.g. `/projects/cisco-policy-copilot`) are crawled.

Allow a few days after first deploy for data to appear.

### Vercel Web Analytics (traffic and behaviour)

Enabled via `@vercel/analytics` in `src/app/layout.tsx`. Custom events are defined in `src/lib/analytics.ts`.

In the Vercel dashboard: **Project → Analytics → Production**

| What to check | Where |
|---------------|--------|
| Page views per route | Pages / Routes |
| Traffic from Google | Referrers → `google.com` |
| Case study opens | Events → `project_open` (filter `slug`) |
| Projects list clicks | Events → `project_list_click` |

### Vercel Speed Insights (Core Web Vitals)

Enabled via `@vercel/speed-insights` in `src/app/layout.tsx`.

In the Vercel dashboard: **Project → Speed Insights**

Tracks real-user **LCP**, **INP**, and **CLS** per route. Google uses similar field data for page experience — but rankings and queries still come from Search Console, not Speed Insights.

Use [PageSpeed Insights](https://pagespeed.web.dev/) to see what Google’s CrUX report shows for a specific URL.

### Rich results check

Validate JSON-LD after deploy: [Google Rich Results Test](https://search.google.com/test/rich-results)

