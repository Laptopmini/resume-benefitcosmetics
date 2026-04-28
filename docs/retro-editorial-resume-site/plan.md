## Implementation Plan: Retro-Editorial Resume Site

### Assumptions
- Repo is currently a near-empty TypeScript scaffold (`src/index.ts` placeholder); we will introduce a Next.js App Router app rooted at `src/app/` and components under `src/components/`.
- Target deploy is GitHub Pages at the repo path `/ralph-node-resume`. We use Next.js static export (`output: 'export'`) and proxy every asset URL through a `withBasePath` helper.
- Tailwind CSS v3 (NOT v4) — v4's PostCSS pipeline is a known time sink; v3 is well-supported by Next 14 and Biome's CSS parser is already configured.
- `framer-motion@^11` is the motion library (legacy package name still works under React 18).
- Resume content lives in `resume.md` at the repo root and is the source of truth for copy; we transcribe it once into a typed TS module so the JUNIOR doesn't re-parse markdown at render time.
- `profile.png` at the repo root is copied into `public/profile.png` so `next/image` (with `unoptimized: true` for static export) can resolve it.
- The repo's existing `jest.config.mjs` uses Node env; we extend it to `jsdom` so React component tests can run, and add a `moduleNameMapper` for `^@/(.*)$ → src/$1`.
- TypeScript v6 is pinned in `package.json`; we keep it. Next.js 14 supports it via its compiler (we never invoke `tsc` as a build step — Next.js builds the app).

### Design Intent

Concrete, named decisions. Foundation ticket encodes each as an importable artifact; downstream tickets reference by name and never re-decide.

**Palette (CSS variables in `src/app/globals.css`, mirrored in `tailwind.config.ts` under `theme.extend.colors`):**
- `--rose: #c44a5e` → `bg-rose` / `text-rose` (signage red, primary)
- `--cream: #f4ead5` → `bg-cream` (page paper background)
- `--ink: #1a1410` → `text-ink` / `border-ink` (deep brown, all rules and type)
- `--mustard: #d99a2b` → `bg-mustard` (section banner backgrounds)
- `--mint: #6fa88e` → `bg-mint` (skills card)
- `--blush: #f0c9c1` → `bg-blush` (profile card tint)
- `--gold-foil: #c9a14a` → `text-gold` (sparkle fill)

**Typography (loaded via `next/font/google` in `src/app/layout.tsx`, exposed as Tailwind families):**
- Display: `Playfair Display` weight 900, italic available → `font-display`
- Script: `Caveat` weight 700 → `font-script`
- Body: `Inter` weights 400/600 → `font-body`
- Mono accent: `Space Mono` weight 700 → `font-mono`

**Border / shadow vocabulary (Tailwind theme extensions):**
- Hard ink rule: utility class `.ink-rule` defined in `globals.css` `@layer components` → `border-[3px] border-ink`
- Hard offset shadow: Tailwind `boxShadow.hard: '6px 6px 0 var(--ink)'` → `shadow-hard`
- Pin shadow (decorative): `boxShadow.pin: '2px 4px 0 rgba(26,20,16,0.45)'` → `shadow-pin`

**Motifs (SVG components in `src/components/`, foundation-owned):**
- `<Sparkle />` — 4-point gold-foil sparkle, animated via `sparklePulse` preset
- `<Starburst />` — 12-ray starburst badge, used to frame call-outs ("Now Showing", role titles)
- `<SunburstDivider />` — full-width deco half-sunburst rule that separates EVERY top-level section in `page.tsx`

**Motion presets (exported from `src/lib/motion.ts`, imported by name — never re-derived):**
- `tiltOnHover`: `{ whileHover: { rotate: 2, scale: 1.03 }, transition: { type: 'spring', stiffness: 300, damping: 20 } }`
- `parallaxFloat(progress)`: helper returning `y` between `-40` and `+40` for scroll progress 0..1; both ends MUST be implemented
- `sparklePulse`: `{ animate: { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }`
- `bannerEntrance`: `{ initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }`
- `marqueeDrift`: `{ animate: { x: ['0%', '-50%'] }, transition: { duration: 22, ease: 'linear', repeat: Infinity } }`

**Layout rhythm (enforced by `src/app/page.tsx`):**
- Outer container: `max-w-[1100px] mx-auto px-6`
- Vertical section padding: `py-24`
- A `<SunburstDivider />` element MUST be inserted between every adjacent pair of top-level sections in `page.tsx`

**Voice / copy (exported from `src/content/resume.ts` under `COPY`, components import by key — never re-typed inline):**
- `COPY.heroEyebrow = "Now Showing"`
- `COPY.heroTagline = "Lead Frontend Engineer — Garnishes UIs With Wit Since 2015"`
- `COPY.profileLabel = "About the Engineer"`
- `COPY.profileHeading = "The Profile"`
- `COPY.skillsLabel = "The Marquee of Skills"`
- `COPY.experienceLabel = "Featured Engagements"`
- `COPY.experienceHeading = "The Marquee"`
- `COPY.educationLabel = "Diplomas & Distinctions"`
- `COPY.footerLine = "Hand-set in San Francisco. Not tested on focus groups."`

### 1. Tech Stack & Architecture Notes
**Detected stack:** Node 24, TypeScript 6, Jest 30 (`@swc/jest`, Node env), Playwright 1.58 (E2E, port 3000), Biome 2.4 (lint+format, includes Tailwind CSS parser directive), no React/Next yet. Tooling protected files: `.github/scripts/**`, `.github/prompts/**`, `.claude/settings.json`, `.aignore`, `biome.json`.
**Relevant existing patterns:** `tests/unit/*.test.{ts,tsx}` collected by Jest; `tests/e2e/*.spec.ts` by Playwright; `src/` is the canonical source root.
**Recommendations:** Next.js 14 App Router with `output: 'export'`; Tailwind v3; Framer Motion 11; deploy via the official `actions/deploy-pages` action on push to `main`.

### 2. File & Code Structure
**New files:**
- `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `types/css.d.ts`
- `public/profile.png` (copied from repo-root `profile.png`), `public/.nojekyll`
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- `src/lib/basePath.ts`, `src/lib/motion.ts`
- `src/content/resume.ts`
- `src/components/Sparkle.tsx`, `src/components/Starburst.tsx`, `src/components/SunburstDivider.tsx`
- `src/components/BannerHero.tsx`, `src/components/ProfileCard.tsx`, `src/components/SkillsCard.tsx`, `src/components/ExperienceTimeline.tsx`, `src/components/EducationCard.tsx`, `src/components/SiteFooter.tsx`, `src/components/SiteNav.tsx`
- `.github/workflows/deploy-pages.yml`

**Modified files:** `package.json` (deps + scripts), `tsconfig.json` (jsx, lib dom, paths, exclude `out`), `jest.config.mjs` (jsdom env + moduleNameMapper).

**Deleted files:** `src/index.ts` (placeholder).

**Conflicting test files to remove:** None.

### 3. Tickets

> Tickets are workstreams. No two tickets touch the same file. A ticket is workable once all tickets in its `depends_on` list are complete. Siblings under the same parent run in parallel.

#### Ticket 1: Design Foundation, App Shell & Decorative Primitives

> Stand up the Next.js App Router project, encode every Design Intent decision (palette, typography, shadows, motion presets, copy, motifs) as importable artifacts, and ship the root layout plus the three decorative SVG primitives every downstream component will compose. This is the only ticket that installs dependencies or modifies `package.json` / `tsconfig.json` / `jest.config.mjs`.

**Tasks:**
1. [infra, install-dependencies] Install runtime deps by running `npm install next@^14.2.15 react@^18.3.1 react-dom@^18.3.1 framer-motion@^11.11.0 tailwindcss@^3.4.14 postcss@^8.4.47 autoprefixer@^10.4.20` and dev deps `npm install -D @types/react@^18.3.11 @types/react-dom@^18.3.0 jest-environment-jsdom@^30.0.0 @testing-library/react@^16.0.1 @testing-library/jest-dom@^6.5.0`. Then edit `package.json` `scripts` to add exactly three new entries: `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`. Do NOT touch existing scripts. Delete the placeholder file `src/index.ts`. Copy the repo-root `profile.png` to `public/profile.png` (create `public/` if missing) and create an empty `public/.nojekyll` file.
2. [infra, create-next-config] Create `next.config.mjs` exporting `{ output: 'export', basePath: '/ralph-node-resume', assetPrefix: '/ralph-node-resume', images: { unoptimized: true }, trailingSlash: true, reactStrictMode: true }`. Use `export default`.
3. [infra, create-postcss-config] Create `postcss.config.mjs` exporting `{ plugins: { tailwindcss: {}, autoprefixer: {} } }` via `export default`.
4. [infra, create-tailwind-config] Create `tailwind.config.ts` exporting a `Config` from `tailwindcss` with `content: ['./src/**/*.{ts,tsx}']` and `theme.extend` containing: `colors: { rose: 'var(--rose)', cream: 'var(--cream)', ink: 'var(--ink)', mustard: 'var(--mustard)', mint: 'var(--mint)', blush: 'var(--blush)', gold: 'var(--gold-foil)' }`, `fontFamily: { display: ['var(--font-display)', 'serif'], script: ['var(--font-script)', 'cursive'], body: ['var(--font-body)', 'sans-serif'], mono: ['var(--font-mono)', 'monospace'] }`, `boxShadow: { hard: '6px 6px 0 var(--ink)', pin: '2px 4px 0 rgba(26,20,16,0.45)' }`, `maxWidth: { editorial: '1100px' }`. Default export.
5. [infra, update-tsconfig] Rewrite `tsconfig.json` so `compilerOptions` becomes: `target: ES2022`, `module: ESNext`, `moduleResolution: Bundler`, `jsx: preserve`, `lib: ['ES2022', 'DOM', 'DOM.Iterable']`, `strict: true`, `esModuleInterop: true`, `skipLibCheck: true`, `forceConsistentCasingInFileNames: true`, `allowJs: false`, `noEmit: true`, `incremental: true`, `resolveJsonModule: true`, `isolatedModules: true`, `types: ['jest', 'node']`, `baseUrl: '.'`, `paths: { '@/*': ['src/*'] }`, `plugins: [{ name: 'next' }]`. Set `include: ['next-env.d.ts', 'types/**/*.d.ts', 'src/**/*.ts', 'src/**/*.tsx']` and `exclude: ['node_modules', '.next', 'out', 'dist', 'tests']`. Remove `outDir` and `rootDir`.
6. [infra, update-jest-config] Edit `jest.config.mjs` to set `testEnvironment: 'jsdom'`, add `moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1', '\\.(css|less|scss|sass)$': '<rootDir>/tests/helpers/styleMock.js' }`, and add `setupFilesAfterEnv: ['<rootDir>/tests/helpers/jest.setup.ts']`. Create `tests/helpers/styleMock.js` exporting `module.exports = {};` and create `tests/helpers/jest.setup.ts` containing `import '@testing-library/jest-dom';`.
7. [infra, create-css-ambient-types] Create `types/css.d.ts` containing `declare module '*.css';` so importing `./globals.css` from `src/app/layout.tsx` does not trip type checking.
8. [infra, create-globals-css] Create `src/app/globals.css` starting with `@tailwind base; @tailwind components; @tailwind utilities;`. Add a `:root` block declaring exactly these CSS variables with these hex values: `--rose: #c44a5e; --cream: #f4ead5; --ink: #1a1410; --mustard: #d99a2b; --mint: #6fa88e; --blush: #f0c9c1; --gold-foil: #c9a14a;`. Add a `body { background-color: var(--cream); color: var(--ink); }` rule. Inside `@layer components` define `.ink-rule { @apply border-[3px] border-ink; }` and `.editorial-card { @apply ink-rule shadow-hard rounded-md bg-cream p-8; }`. Inside `@layer utilities` define `.paper-grain { background-image: radial-gradient(rgba(26,20,16,0.06) 1px, transparent 1px); background-size: 4px 4px; }` so the page can apply a subtle paper texture.
9. [code, create-basepath-helper, ts] Create `src/lib/basePath.ts` exporting `export const BASE_PATH = '/ralph-node-resume';` and `export function withBasePath(path: string): string { return ${'`${BASE_PATH}${path.startsWith("/") ? path : "/" + path}`'}; }`. Add a `data` testable surface: also export `export function stripBasePath(path: string): string` that removes a leading `BASE_PATH` if present, otherwise returns the input unchanged.
10. [code, create-motion-presets, ts] Create `src/lib/motion.ts` (no `'use client'` directive — pure data module) exporting these named constants verbatim: `tiltOnHover = { whileHover: { rotate: 2, scale: 1.03 }, transition: { type: 'spring', stiffness: 300, damping: 20 } }`, `sparklePulse = { animate: { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }`, `bannerEntrance = { initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }`, `marqueeDrift = { animate: { x: ['0%', '-50%'] }, transition: { duration: 22, ease: 'linear', repeat: Infinity } }`, and a function `parallaxFloat(progress: number): number` that linearly maps the input range `[0, 1]` to the output range `[-40, 40]` (i.e. progress 0 → -40, 0.5 → 0, 1 → +40) implementing BOTH ends of the range (no one-sided shortcut). Type the constants with `as const` where possible.
11. [code, create-content-module, ts] Create `src/content/resume.ts` exporting (a) a `COPY` object with EXACTLY these keys/values: `heroEyebrow: 'Now Showing'`, `heroTagline: 'Lead Frontend Engineer — Garnishes UIs With Wit Since 2015'`, `profileLabel: 'About the Engineer'`, `profileHeading: 'The Profile'`, `skillsLabel: 'The Marquee of Skills'`, `experienceLabel: 'Featured Engagements'`, `experienceHeading: 'The Marquee'`, `educationLabel: 'Diplomas & Distinctions'`, `footerLine: 'Hand-set in San Francisco. Not tested on focus groups.'`; (b) a `PROFILE` object with `name: 'Paul-Valentin Mini'`, `location: 'San Francisco, CA'`, `phone: '(415) 694-3616'`, `email: 'paul@emini.com'`, `linkedin: 'https://www.linkedin.com/in/pvmini'`, `github: 'https://github.com/Laptopmini'`, `summary` (the Profile paragraph from `resume.md`); (c) `SKILL_GROUPS: { label: string; items: string[] }[]` transcribed from the four bullets under "Top Skills" in `resume.md`; (d) `EXPERIENCE: { company: string; location: string; role: string; period: string; bullets: { heading: string; body: string }[]; stack: string[] }[]` transcribed from each Experience entry in `resume.md` (5 entries: SmartThings, Samsung Research America, Samsung Strategy & Innovation Center, Prism, Imprivata); (e) `EDUCATION: { line: string }[]` transcribed from the three Education & Certifications lines. Every string MUST be transcribed verbatim from `resume.md` — no paraphrasing.
12. [code, create-root-layout, tsx] Create `src/app/layout.tsx` (Next.js App Router root layout, default-exported `RootLayout({ children })`). Import `./globals.css`. Load fonts via `next/font/google`: `Playfair_Display` (weight `['900']`, variable `--font-display`), `Caveat` (weight `['700']`, variable `--font-script`), `Inter` (weights `['400','600']`, variable `--font-body`), `Space_Mono` (weight `['700']`, variable `--font-mono`). Compose all four font `.variable` strings on `<html lang="en" className={...}>`. Set `<body className="font-body paper-grain min-h-screen">`. Export a typed `metadata` object: `{ title: 'Paul-Valentin Mini — Lead Frontend Engineer', description: COPY.heroTagline }` (import `COPY` from `@/content/resume`).
13. [code, create-sparkle-component, tsx] Create `src/components/Sparkle.tsx` ('use client'). Default-export `Sparkle({ size = 24, className }: { size?: number; className?: string })`. Render a `motion.svg` with `viewBox="0 0 24 24"` containing a 4-point sparkle path `M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z` filled with `fill="var(--gold-foil)"`. Apply `{...sparklePulse}` (imported from `@/lib/motion`) to the `motion.svg`. Add `data-testid="sparkle"`.
14. [code, create-starburst-component, tsx] Create `src/components/Starburst.tsx` (no `'use client'` — pure SVG). Default-export `Starburst({ size = 120, fill = 'var(--rose)', children, className }: { size?: number; fill?: string; children?: React.ReactNode; className?: string })`. Render an `<svg viewBox="0 0 200 200">` containing a 12-ray starburst polygon centered at (100,100) (alternating outer radius 95 and inner radius 60), filled with the `fill` prop and stroked `stroke="var(--ink)" strokeWidth="3"`. Render `children` inside an absolutely-positioned div centered over the SVG so call-out text (e.g. "Now Showing") fits inside the badge. Add `data-testid="starburst"`.
15. [code, create-sunburst-divider, tsx] Create `src/components/SunburstDivider.tsx` (no `'use client'`). Default-export `SunburstDivider()` rendering a full-width `<div className="my-4 flex justify-center">` containing an `<svg viewBox="0 0 600 60" className="w-full max-w-editorial" aria-hidden>` that draws 24 alternating rose/mustard rays radiating downward from the top-center (use `<polygon>` per ray), with a 3px ink horizontal rule (`<line>` from (0,2) to (600,2) stroke="var(--ink)" strokeWidth="3") above the rays. Add `data-testid="sunburst-divider"`. This component MUST be inserted between every adjacent pair of top-level sections in `src/app/page.tsx` (the page-composition ticket enforces this).

#### Ticket 2: Section Components

**depends_on:** [Ticket 1]

> Build the six content-section components and the footer. Each imports tokens, motion presets, copy, and decorative primitives from Ticket 1 — never re-decides palette, voice, animation curves, or asset URLs. All image references go through `withBasePath`. No section file imports another section file.

**Tasks:**
1. [code, create-banner-hero, tsx] Create `src/components/BannerHero.tsx` ('use client'). Default-export `BannerHero()`. Render a `<section data-testid="hero">` styled `bg-rose text-cream ink-rule shadow-hard rounded-lg p-10 relative overflow-hidden`. Inside: (a) a `<Starburst>` (import from `@/components/Starburst`) in the top-right corner containing the text from `COPY.heroEyebrow` ("Now Showing") in `font-script text-2xl text-ink` — DO NOT type the literal string, import `COPY` from `@/content/resume`; (b) a circular framed profile image using `next/image`, `src={withBasePath('/profile.png')}` (import `withBasePath` from `@/lib/basePath`), `width={180} height={180}`, `alt={PROFILE.name}`, wrapped in a `<motion.div>` with `{...tiltOnHover}` (import from `@/lib/motion`), framed by `border-[6px] border-cream rounded-full shadow-hard`; (c) a heading `<h1 className="font-display text-6xl">` containing `PROFILE.name`; (d) a tagline `<p className="font-mono text-lg mt-2">` containing `COPY.heroTagline`; (e) wrap the whole inner content in a `<motion.div {...bannerEntrance}>`. Sprinkle three `<Sparkle />` components (import from `@/components/Sparkle`) at decorative positions (absolute, corners) — wrap each Sparkle in a `<motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [parallaxFloat(0), parallaxFloat(1)]) }}>` (import `useScroll`, `useTransform` from `framer-motion`; call `const { scrollYProgress } = useScroll();` once at the top of the component; import `parallaxFloat` from `@/lib/motion`) so the sparkles drift from `-40` to `+40` across page scroll, exercising both ends of the `parallaxFloat` range. Add `data-testid="hero-name"` to the `<h1>` and `data-testid="hero-tagline"` to the `<p>`.
2. [code, create-profile-card, tsx] Create `src/components/ProfileCard.tsx` ('use client'). Default-export `ProfileCard()`. Render a `<section data-testid="profile-card" className="editorial-card bg-blush">`. Inside, render an eyebrow label using `COPY.profileLabel` (imported from `@/content/resume`) inside a `<span className="font-script text-3xl text-rose">`, followed by an `<h2 className="font-display text-4xl mt-1">` containing `COPY.profileHeading` (do NOT type the literal string), followed by a `<p className="font-body mt-4 text-lg leading-relaxed">` containing `PROFILE.summary`. Wrap the section in a `<motion.div {...bannerEntrance}>` (import `bannerEntrance` from `@/lib/motion`). Add `data-testid="profile-summary"` to the paragraph.
3. [code, create-skills-card, tsx] Create `src/components/SkillsCard.tsx` ('use client'). Default-export `SkillsCard()`. Render a `<section data-testid="skills-card" className="editorial-card bg-mint">`. Render the eyebrow `COPY.skillsLabel` (imported from `@/content/resume`) in `font-script text-3xl text-rose`. Below it, render a horizontally-scrolling marquee row built from a `<motion.div className="flex gap-6" {...marqueeDrift}>` (import `marqueeDrift` from `@/lib/motion`) duplicating the items twice so the loop is seamless. For each `SKILL_GROUPS[i]`, render a `<div className="ink-rule shadow-pin bg-cream rounded-md p-4 min-w-[280px]">` containing a `<h3 className="font-mono text-sm uppercase">` with the group `label` and a `<ul className="mt-2 font-body text-sm">` of `items`. Wrap each card in a `<motion.div {...tiltOnHover}>`. Add `data-testid="skill-group"` to each card.
4. [code, create-experience-timeline, tsx] Create `src/components/ExperienceTimeline.tsx` ('use client'). Default-export `ExperienceTimeline()`. Render a `<section data-testid="experience-timeline">` with the eyebrow `COPY.experienceLabel` (imported from `@/content/resume`) in `font-script text-3xl text-rose` and an `<h2 className="font-display text-4xl">` containing `COPY.experienceHeading` (do NOT type the literal string). For each `EXPERIENCE[i]`, render an `<article className="editorial-card mt-10 relative">` wrapped in a `<motion.div {...bannerEntrance}>`. Inside the article: a `<Starburst size={90} fill="var(--mustard)">` in the top-left containing the role period (`item.period`) typeset in `font-mono text-xs text-ink`; a `<h3 className="font-display text-3xl">` with `${item.role} · ${item.company}`; a `<p className="font-mono text-sm text-rose">` with `item.location`; a `<ul className="mt-4 space-y-3">` where each bullet renders `<strong className="font-display">{bullet.heading}</strong>` followed by `<span className="font-body">{bullet.body}</span>`; a tech-stack chip row `<div className="mt-4 flex flex-wrap gap-2">` of `<span className="ink-rule bg-blush rounded-full px-3 py-1 font-mono text-xs">{tech}</span>` for each `item.stack` entry. Add `data-testid="experience-entry"` to each article.
5. [code, create-education-card, tsx] Create `src/components/EducationCard.tsx` ('use client'). Default-export `EducationCard()`. Render a `<section data-testid="education-card" className="editorial-card bg-mustard">` with eyebrow `COPY.educationLabel` (imported from `@/content/resume`) in `font-script text-3xl text-rose`. Render `EDUCATION` as a vertical list `<ul className="mt-4 space-y-2 font-body text-lg">` of `<li>` items each prefixed by an inline `<Sparkle size={16} className="inline-block mr-2" />` (import `Sparkle` from `@/components/Sparkle`). Wrap the section in `<motion.div {...bannerEntrance}>`. Add `data-testid="education-entry"` to each `<li>`.
6. [code, create-site-footer, tsx] Create `src/components/SiteFooter.tsx` (no `'use client'` — pure markup). Default-export `SiteFooter()`. Render a `<footer data-testid="site-footer" className="bg-ink text-cream py-12 mt-24">`. Inside a centered `max-w-editorial mx-auto px-6` container, render: `COPY.footerLine` (imported from `@/content/resume`) in `font-script text-2xl text-mustard text-center`; below it a row of contact links built from `PROFILE` (`email` mailto, `linkedin`, `github`) styled `font-mono text-sm underline decoration-mustard`. Add `data-testid="footer-tagline"` to the COPY paragraph.

#### Ticket 3: Site Navigation & Page Composition

**depends_on:** [Ticket 2]

> Assemble the page. The nav is a sticky editorial banner; `page.tsx` imports every section from Ticket 2 and inserts a `<SunburstDivider />` (from Ticket 1) between every adjacent pair of top-level sections. This ticket does not introduce any new tokens, copy, or animations — it only composes.

**Tasks:**
1. [code, create-site-nav, tsx] Create `src/components/SiteNav.tsx` ('use client'). Default-export `SiteNav()`. Render a `<nav data-testid="site-nav" className="sticky top-0 z-40 bg-cream/95 backdrop-blur ink-rule border-t-0 border-x-0">` with a `max-w-editorial mx-auto flex items-center justify-between px-6 py-3` container. Left side: `<span className="font-display text-xl">P-V Mini</span>`. Right side: a `<ul className="flex gap-6 font-mono text-xs uppercase">` of anchor links to `#profile`, `#skills`, `#experience`, `#education` labeled "Profile", "Skills", "Experience", "Education". Each `<a>` gets `className="hover:text-rose transition-colors"`. Wrap each link in a `<motion.span {...tiltOnHover}>` (import `tiltOnHover` from `@/lib/motion`). Do NOT import any section component.
2. [code, create-home-page, tsx] Create `src/app/page.tsx` (default-exported `Home()` server component — no `'use client'`). Import every section component from `@/components/*` (`SiteNav`, `BannerHero`, `ProfileCard`, `SkillsCard`, `ExperienceTimeline`, `EducationCard`, `SiteFooter`) and `SunburstDivider` from `@/components/SunburstDivider`. Render in this exact order inside a `<>` fragment: `<SiteNav />`, then a `<main className="max-w-editorial mx-auto px-6 py-12">` containing — in order — `<BannerHero />`, `<SunburstDivider />`, `<section id="profile" className="py-24"><ProfileCard /></section>`, `<SunburstDivider />`, `<section id="skills" className="py-24"><SkillsCard /></section>`, `<SunburstDivider />`, `<section id="experience" className="py-24"><ExperienceTimeline /></section>`, `<SunburstDivider />`, `<section id="education" className="py-24"><EducationCard /></section>` — then close `</main>` and append `<SiteFooter />`. There MUST be exactly four `<SunburstDivider />` instances (one between each adjacent pair of the five top-level sections). Add `data-testid="home-root"` to the outer fragment's first child wrapper if needed (wrap the fragment's contents in a `<div data-testid="home-root">`).

#### Ticket 4: GitHub Pages Deployment Workflow

**depends_on:** [Ticket 1]

> Build and publish the static export to GitHub Pages on every push to `main`. Lives in its own ticket so it can run in parallel with Ticket 2's component work. Touches only `.github/workflows/deploy-pages.yml` — no other file overlaps with any other ticket.

**Tasks:**
1. [infra, create-pages-workflow] Create `.github/workflows/deploy-pages.yml` defining a workflow named `Deploy to GitHub Pages` triggered on `push` to branch `main` and on `workflow_dispatch`. Set top-level `permissions: { contents: read, pages: write, id-token: write }` and `concurrency: { group: 'pages', 'cancel-in-progress': false }`. Define two jobs. Job `build` (runs-on `ubuntu-latest`): steps are `actions/checkout@v4`; `actions/setup-node@v4` with `node-version-file: '.nvmrc'` and `cache: 'npm'`; `run: npm ci`; `run: npm run build`; `actions/upload-pages-artifact@v3` with `path: ./out`. Job `deploy` (needs `build`, runs-on `ubuntu-latest`, environment `name: github-pages` with `url: ${{ steps.deployment.outputs.page_url }}`): single step `actions/deploy-pages@v4` with `id: deployment`. Do NOT modify any file outside `.github/workflows/deploy-pages.yml`.
