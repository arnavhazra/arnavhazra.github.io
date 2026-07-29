# Personal Site — Design & Voice Rules

## Aesthetic
- Restrained-elite technical founder: dark mode default (near-black ~rgb(10,10,10)), neo-serif display + monospace metadata
- Motion is purposeful, not decorative: Lenis smooth scroll, Motion for UI, GSAP ScrollTrigger for kinetic type
- Always implement `prefers-reduced-motion` fallbacks
- WCAG 2.1 AA: semantic HTML, keyboard nav, sufficient contrast

## Voice
- Proof over pitch. Understated, specific, narrative — not ATS bullet lists on narrative pages
- Resume page (`/resume`) is the ONLY place for keyword-dense ATS formatting
- Case studies: problem → approach → stack → measurable proof
- Never copy resume bullets verbatim into site copy

## Stack
- Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, MDX in `content/`
- Deploy on Vercel Hobby tier

## Content sources
- GitHub pinned repos for case studies
- Neural Next / Data Pixel for founder narrative
- Dossier positioning line: "AI data scientist and 2× startup CTO building decision infrastructure — I turn frontier AI research into products that ship."
