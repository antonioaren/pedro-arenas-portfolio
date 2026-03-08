# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server at localhost:3000
pnpm build      # Production build (TypeScript and ESLint errors are ignored — see next.config.mjs)
pnpm lint       # Run ESLint
```

> No test suite is configured. The project uses `pnpm` as the package manager.

## Environment Variables

Required for the contact form (`app/api/contact/route.ts`):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key (also accepted as `RESEND_API`) |
| `CONTACT_TO_EMAIL` | Recipient email (also accepted as `RESEND_TO`) |
| `RESEND_FROM` | Sender address (defaults to `no-reply@yourdomain.com`) |

Create a `.env.local` with these values for local development.

## Architecture

**Single-page portfolio** built with Next.js 15 App Router. The home page (`app/page.tsx`) composes all sections in order: `HeroAbout → CaseStudiesPreview → Impact → Projects → Skills → Contact`.

### Key architectural patterns

**Anime.js is loaded lazily** — never import it directly. Use `loadAnime()` from `lib/loadAnime.ts`, which dynamically imports the ESM entry (required for Anime.js v4 named exports). The `useAnimeInView` hook (`hooks/use-anime-in-view.ts`) wraps this with an `IntersectionObserver` so animations trigger on scroll.

**Case studies are MDX files** located in `content/case-studies/` (`.mdx`). Their routes live in `app/case-studies/[slug]/page.mdx`. The `pageExtensions` config in `next.config.mjs` enables `.mdx` as a page extension. MDX provider injection is disabled — client components must be imported explicitly inside MDX files.

**Metrics/CV data** is centralized in `data/metrics.ts`. Update this file to change professional metrics displayed across sections (Impact, Hero, etc.).

**Theme** defaults to dark, with no system preference override (`enableSystem: false` in `ThemeProvider`). Fonts are `Plus Jakarta Sans` (sans) and `JetBrains Mono` (mono), exposed as CSS variables `--font-sans` / `--font-mono`.

**`components/reactbits/`** contains animated background and text-animation components (third-party inspired). **`components/ui/`** contains shadcn/ui primitives.

### Content to update when customising

- `components/HeroAbout.tsx` — name, title, bio, social links
- `components/Projects.tsx` — featured project list
- `components/Skills.tsx` — skills grid
- `data/metrics.ts` — professional impact numbers
- `content/case-studies/*.mdx` — case study pages
- `public/resume.pdf` — downloadable CV
- `public/social-photo.webp` — profile/OG image
