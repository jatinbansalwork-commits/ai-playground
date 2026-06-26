<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single Next.js 16 app (`ai-playground`), a portfolio/case-study site with a "JBAI" streaming chat at `POST /api/chat`. No database or other backing services. Standard scripts live in `package.json` (`dev`, `build`, `lint`, `spellcheck`).

- **Node version**: `cspell` (and Next 16) require Node `>=22.18.0`. nvm is preinstalled and `~/.bashrc` selects Node 22 by default, so run commands in a login shell (e.g. tmux started with `-l`). The base `/exec-daemon/node` is older (22.14.x) and makes `npm run spellcheck` fail with "Unsupported NodeJS version"; if you hit that, run `nvm use 22` first.
- **Run the dev server**: `npm run dev` (Turbopack) on http://localhost:3000. Hot reload works for `src/` edits.
- **Chat without keys**: `/api/chat` degrades gracefully — without `OPENAI_API_KEY` it returns curated/static fallback replies (`source: "fallback"`), and without `GIPHY_API_KEY` it omits GIFs. The chat is fully usable for testing with no env vars.
- **Pre-existing check failures (not environment issues)**: `npm run lint` reports pre-existing errors/warnings and `npm run spellcheck` reports a few unknown words; both are repository content issues, not setup problems.
