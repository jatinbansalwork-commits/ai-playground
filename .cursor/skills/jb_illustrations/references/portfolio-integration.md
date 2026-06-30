# Portfolio integration

How this skill connects to the **ai-playground** codebase.

## File locations

| Piece | Path |
|-------|------|
| Skill (this package) | `.cursor/skills/jb_illustrations/` |
| Published PNGs | `public/assets/illustrations/jb_illustrations/*-en.png` |
| ID → URL map | `src/lib/jb-illustration-library.ts` |
| CDN passthrough | `src/lib/asset-cdn.ts` (prefix allowlist includes illustrations path) |

## Registering a new illustration

1. Save PNG to `public/assets/illustrations/jb_illustrations/{name}-en.png`
2. Add a kebab-case key in `JB_ILLUSTRATIONS`
3. Import via `getJbIllustration("your-id")` in the case study component

```ts
// src/lib/jb-illustration-library.ts
export const JB_ILLUSTRATIONS = {
  "your-id": "/assets/illustrations/jb_illustrations/your-id-en.png",
} as const;
```

## React components

### `CaseStudyImpactCards` — use **light** illustrations

Impact cards sit on a **white rounded panel** inside a dark case study. Generate white-background art.

```tsx
{
  illustration: "trust-bridge",
  title: "Improved Decision Confidence",
  description: "...",
}
```

Current mappings (Cisco Policy Copilot):

| Card | Illustration ID |
|------|-----------------|
| Reduced Configuration Effort | `idea-press` |
| Faster Policy Decisions | `handoff-path` |
| Improved Decision Confidence | `trust-bridge` |
| Lower Cognitive Load | `sort-by-purpose` |

### `CaseStudyMedia` — use **dark** illustrations

Full-width media bands use `bg-[#1a1a1a]` frames. Prefer near-black native art (or invert light art as last resort).

```tsx
<CaseStudyWide className="!mt-4 pb-6">
  <CaseStudyMedia
    aspect="natural"
    src={getJbIllustration("policy-copilot-before")}
    alt="One business request tangled in manual policy configuration"
  />
</CaseStudyWide>
```

Cisco Policy Copilot narrative images:

| Section | ID |
|---------|-----|
| The Opportunity (before) | `policy-copilot-before` |
| The Opportunity (after) | `policy-copilot-after` |
| From Copilot to Agent | `policy-copilot-decision-intelligence` |

## Naming convention

- Filenames: `{topic}-en.png` or `{nn}-{topic}-en.png` for numbered sets
- Library keys: kebab-case semantic IDs without `-en` suffix
- Always `-en` in filenames to bust cache when replacing Chinese upstream examples

## Upstream attribution

Visual system adapted from [Ian Xiaohei Illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) (MIT). This portfolio edition uses English labels, case-study delivery paths, and dark-mode variants for editorial pages.

## Design doc

See `design.md` → **JB illustration library** · `IA.md` at repo root for asset paths summary.
