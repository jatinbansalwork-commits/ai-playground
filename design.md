# Design notes

## Cisco case study reveal gate

The Cisco Policy Copilot case study (`cisco-policy-copilot`) ships with a **pre-launch blur gate**:

- **Hero stays sharp** — title, metadata, and countdown remain readable.
- **Body is blurred** until unlock — `blur-xl`, no scroll or interaction (`pointer-events-none`, `select-none`).
- **Same deadline worldwide** — UTC schedule in code, not per-browser `localStorage`.

### Schedule (source of truth)

`src/lib/case-study-reveal-schedule.ts`

| Field | Value |
|-------|--------|
| `CASE_STUDY_REVEAL_DURATION_MS` | 24 hours |
| `startsAtUtc` (Cisco) | `2026-06-26T07:09:08.000Z` |
| Unlock instant (UTC) | `2026-06-27T07:09:08.000Z` |

Unlock: `Date.parse(startsAtUtc) + 24 hours`

### Wiring

| Piece | Location |
|-------|----------|
| Schedule | `src/lib/case-study-reveal-schedule.ts` |
| Countdown hook | `src/hooks/use-case-study-reveal-countdown.ts` |
| Countdown UI | `src/components/case-studies/case-study-reveal-countdown.tsx` |
| Blur gate | `src/components/case-studies/CiscoPolicyCopilot.tsx` — `useCaseStudyRevealCountdownForSlug`, hero `metaBottom`, body wrapper |

### Reset the 24-hour timer

1. Set `startsAtUtc` under `cisco-policy-copilot` to the new UTC start instant.
2. Update the **Schedule** table in this file with the new `startsAtUtc` and computed unlock instant.
3. Deploy — all visitors share the same remaining time.

Do **not** use `localStorage` or per-user offsets for the deadline.
