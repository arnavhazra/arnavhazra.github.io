# Arnav Hazra — Personal Site

Next.js personal site for [Arnav Hazra](https://github.com/arnavhazra): AI founder, applied AI engineer, and 2× startup CTO.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** — dark-mode-first design system
- **Motion + Lenis + GSAP** — restrained kinetic typography and smooth scroll
- **MDX** — case studies and essays in `content/`
- **Vercel** — deployment target (Hobby tier)

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, credibility strip, featured work |
| `/about` | Founder narrative + timeline |
| `/work` | Bento grid of case studies |
| `/writing` | Thought-leadership essays |
| `/resume` | ATS-readable resume layer |
| `/contact` | Email and social links |

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Cursor MCP setup (SOTA design stack)

Full lean MCP stack for award-tier builds — **free tier only**. See [`.cursor/MCP-SETUP.md`](.cursor/MCP-SETUP.md) for paid-tool replacements.

```bash
./.cursor/setup-mcp.sh          # installs Context7, Playwright, GitHub, shadcn MCP
```

| Server | Role |
|---|---|
| Context7 | Live Motion/GSAP/Next.js docs |
| Playwright | Visual QA + browser automation |
| GitHub | README mining for case studies |
| Vercel | Deploy + preview (OAuth in Cursor Settings) |
| shadcn | Component registry + design tokens |

Authenticate **Vercel** in Cursor → Settings → Tools & MCP. Copy `.env.example` → `.env.local` for Context7/GitHub keys (auto-filled by setup script).

Design and voice constraints: [`.cursor/rules/personal-site.md`](.cursor/rules/personal-site.md)

## Migration note

The previous Create React App site is archived in `_archive/cra-site/`. Deploy via Vercel instead of GitHub Pages.

## License

MIT
