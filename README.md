# Aman Kumar — Personal Portfolio

A dark, terminal-inspired portfolio website built with Next.js. Designed to feel like reading a sales operations dashboard — because that's what I do.

## What's Inside

- **Loading Screen** — Typewriter terminal animation with progress bar
- **Hero** — 160px profile photo, animated name reveal, scroll-triggered content
- **Key Metrics** — $6M pipeline, 170.4% SQL attainment, ~160K CAD closed, all with scramble-on-hover numbers
- **Profile Dossier** — Full-width two-column layout with core competencies skill bars
- **Career Pipeline** — Flip cards tracing the journey from L&T Infotech to OpenText
- **Value Props** — AI prospecting, full-cycle selling, EDI SaaS spotlight cards
- **Intel Feed** — LinkedIn-style post cards + "Off the Clock" personal section
- **Contact** — CTA with radial glow

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion |
| Icons | Lucide React + inline SVGs |
| Fonts | Cal Sans (display), Inter (body), Geist Mono (monospace) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Design tokens, global styles, animations
│   ├── layout.tsx           # Root layout with font loading
│   └── page.tsx             # Page assembly + loading gate
├── components/
│   ├── Navigation.tsx       # Desktop top nav + mobile bottom nav
│   ├── Hero.tsx             # Hero section with profile photo
│   ├── NumbersBar.tsx       # Key metrics with scramble effect
│   ├── ProfileDossier.tsx   # Two-column profile card
│   ├── CareerPipeline.tsx   # Career timeline with flip cards
│   ├── ValueProps.tsx       # What I Do cards
│   ├── IntelFeed.tsx        # LinkedIn posts + Off the Clock
│   ├── Contact.tsx          # Contact CTA section
│   ├── LoadingScreen.tsx    # Terminal typewriter animation
│   ├── ScrollProgress.tsx   # Top scroll progress bar
│   ├── CursorTrail.tsx      # Spotlight cursor effect
│   └── EasterEgg.tsx        # "pipeline" → confetti
└── lib/
    ├── constants.ts         # All data (metrics, career, skills, profile)
    ├── animations.ts        # Framer Motion variants
    ├── useReveal.ts         # IntersectionObserver scroll reveals
    └── useMagneticButtons.ts # Magnetic hover effect
```

## Design System

The entire site runs on CSS custom properties defined in `globals.css`:

- **Backgrounds**: 5-level depth scale (`--bg-void` to `--bg-highlight`)
- **Text**: 4-level hierarchy (`--text-primary` to `--text-ghost`)
- **Borders**: 4-level visibility (`--border-faint` to `--border-accent`)
- **Spacing**: 4px base unit system (`--space-1` through `--space-24`)
- **Motion**: Consistent cubic-bezier easing (`--transition`, `--transition-slow`)

## Author

**Aman Kumar** — Account Development Executive at OpenText, Toronto ON.

- [LinkedIn](https://www.linkedin.com/in/amankumar1106/)
- [GitHub](https://github.com/akumar1119)
