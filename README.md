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

## Cursor MCP setup

Copy `.cursor/mcp.json` and authenticate Context7, GitHub, and Vercel in **Settings → Tools & MCP**. See `.cursor/rules/personal-site.md` for design and voice constraints.

## Migration note

The previous Create React App site is archived in `_archive/cra-site/`. Deploy via Vercel instead of GitHub Pages.

## License

MIT
