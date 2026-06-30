# JB Illustrations — Portfolio Edition

English editorial illustration skill for case studies and portfolio content.

Forked from [helloianneo/ian-xiaohei-illustrations](https://github.com/helloianneo/ian-xiaohei-illustrations) (MIT).

## What this is

A Cursor skill that guides agents to plan and generate **16:9 hand-drawn explainer illustrations** with the **JB character** — absurd, sparse, deadpan product sketches in **English**.

Not PPT infographics. Not cute mascots. One cognitive anchor per image.

## Structure

```text
.cursor/skills/jb_illustrations/
├── SKILL.md
├── agents/openai.yaml
├── examples/prompts.md
├── assets/examples/          # English calibration PNGs (*-en.png)
└── references/
    ├── style-dna.md
    ├── jb-character-ip.md
    ├── composition-patterns.md
    ├── prompt-template.md
    ├── qa-checklist.md
    └── portfolio-integration.md
```

## Quick start

**Plan a shot list:**

```text
Use jb_illustrations. Analyze this case study section and propose illustrations (no images yet).
```

**Generate for Cisco-style narrative (dark mode):**

```text
Use jb_illustrations. Generate dark-mode before/after illustrations for [section]. English labels. Save to public/assets/illustrations/jb_illustrations/.
```

See `examples/prompts.md` for more.

## Published assets

Final PNGs live in `public/assets/illustrations/jb_illustrations/` and are registered in `src/lib/jb-illustration-library.ts`.

## Differences from upstream

| Upstream (Ian) | This portfolio edition |
|----------------|------------------------|
| Chinese labels & docs | English labels & docs |
| `assets/<slug>-illustrations/` output | `public/assets/illustrations/jb_illustrations/` |
| White background only | Light (cards) + dark (case study media) |
| Chinese articles / Notion | Case studies, impact cards, essays |
| Codex `image_gen` | Cursor `GenerateImage` |

## License

Upstream skill: MIT. See upstream [LICENSE](https://github.com/helloianneo/ian-xiaohei-illustrations/blob/main/LICENSE).
