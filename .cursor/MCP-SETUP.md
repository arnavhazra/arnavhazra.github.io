# MCP Setup — SOTA Design Stack (Free Tier)

Lean MCP configuration for award-tier personal site builds. Keeps context budget low (5 servers max).

## Installed servers

| Server | Purpose | Cost |
|---|---|---|
| **Context7** | Live docs for Motion, GSAP, Lenis, Next.js, Tailwind | Free (OAuth at context7.com) |
| **Playwright** | Browser automation, screenshots, visual QA | Free |
| **GitHub** | Repo README mining, PR/issue workflows | Free (gh OAuth or PAT) |
| **Vercel** | Deploy, preview URLs, logs, OG images | Free Hobby tier |
| **shadcn** | Component registry browse/install, design tokens | Free |

## One-command setup

```bash
chmod +x .cursor/setup-mcp.sh
./.cursor/setup-mcp.sh
```

Or manually:

```bash
npx ctx7 setup --cursor --project --mcp --stdio -y
npx shadcn@latest mcp init --client cursor
```

Then authenticate **Vercel** in Cursor → Settings → Tools & MCP.

## Paid tools → free replacements

| Dossier tool | Paid? | Free replacement in this project |
|---|---|---|
| **Figma MCP** | Token scope risk | **shadcn MCP** + code-first tokens in `globals.css`; Magic UI / React Bits (MIT) for animated blocks |
| **Claude Design** | Paid | **v0.dev** free tier for one mock, or Agent + shadcn skill code-first |
| **Sanity MCP** | Hosted CMS | **MDX in `content/`** — git-versioned, zero cost |
| **Supabase MCP** | Hosted DB | **Skip** — static site; Formspree free tier or mailto for contact |
| **GPT Image 2 / Midjourney** | Paid | **CSS gradient mesh + grain**; `@vercel/og` for OG images |
| **Veo / Runway video** | Paid | **CSS `@keyframes` mesh-drift** — no video assets |
| **Meshy / Spline 3D** | Freemium | **DecisionMatrixDemo** — CSS + Motion proof widget |
| **Firecrawl MCP** | Paid tiers | **WebFetch** + `gh api` for public READMEs |
| **Chrome DevTools MCP** | — | **Playwright MCP** covers screenshots + interaction |

## Environment variables (`.env.local`, gitignored)

```bash
CONTEXT7_API_KEY=ctx7sk_...   # from npx ctx7 setup
GITHUB_PERSONAL_ACCESS_TOKEN=ghp_...  # or auto-filled from gh auth token
```

MCP reads these via `envFile` in `.cursor/mcp.json` — never commit secrets.

## Cursor skills (built-in, no MCP)

Use alongside MCP for design quality:

- `shadcn` — component install, theming, registries
- `nextjs` — App Router, View Transitions, OG routes
- `react-best-practices` — TSX quality after edits
- `verification` — end-to-end flow checks after dev server start

## Cloud agent fallback

When MCP auth is unavailable in cloud runs:

| MCP | CLI fallback |
|---|---|
| Context7 | `npx ctx7 docs /vercel/next.js "view transitions"` |
| GitHub | `gh api repos/arnavhazra/{repo}/readme` |
| Vercel | `npx vercel deploy --prod` |
| Playwright | `npm run test:e2e` |

## Verify MCP is working

In Cursor Agent, try:

- "Use Context7 to fetch GSAP ScrollTrigger scroll-scrub font weight docs"
- "Use Playwright MCP to screenshot the homepage at 375px and 1280px"
- "Use shadcn MCP to list available components in the registry"
- "Use GitHub MCP to read the README for graph-rag-multi-hop"

Green status dots in Settings → Tools & MCP confirm each server is connected.
