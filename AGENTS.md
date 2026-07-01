<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single Next.js 16 (Turbopack, App Router) portfolio site — no separate backend or database. Standard scripts live in `package.json`: `npm run dev` (serves on http://localhost:3000), `npm run build`, `npm run lint`, `npm run spellcheck`.

- **Node version:** the infra node on `PATH` (`/exec-daemon/node`) is 22.14, which is too old for `cspell` (`npm run spellcheck` needs ≥ 22.18). Interactive login shells are configured (via `~/.bashrc`) to prefer nvm's default node (22.22.x), so just run scripts in a normal shell. `npm run dev/build/lint` also work on the infra node, but prefer the nvm node for consistency.
- **AI chat (`/api/chat`):** works with no secrets — it gracefully falls back to curated/static replies (and skips reaction GIFs) when `OPENAI_API_KEY` / `GIPHY_API_KEY` are unset. Set `OPENAI_API_KEY` (model `gpt-4o-mini`) for live LLM replies and `GIPHY_API_KEY` for reaction GIFs; both are optional and only needed to exercise those external integrations.
- `npm run lint` and `npm run spellcheck` currently report pre-existing findings (lint errors/warnings and unknown words); they are unrelated to environment setup. Treat fixing them as out of scope unless explicitly asked.
