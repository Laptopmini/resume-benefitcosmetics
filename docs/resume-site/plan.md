## Implementation Plan: Resume Site

### Assumptions
- GitHub Pages repo name is `ralph-node-resume` (used as basePath/assetPrefix `/ralph-node-resume`).
- `profile.png` at repo root will be copied into `public/` by the foundation ticket so Next.js serves it.
- Existing placeholder tests (`tests/e2e/setup.spec.ts`, `tests/unit/setup.test.ts`) do not conflict with the new UI (they target `about:blank` and a placeholder module) and are preserved; testing is a separate effort per skill policy.
- `src/index.ts` is a placeholder referenced only by `tsconfig.json`'s `include`. The foundation ticket will retarget `tsconfig.json` to the Next.js layout and delete `src/index.ts`.
- Tailwind v4 is configured via `@tailwindcss/postcss` and a CSS-first `@theme` block in `globals.css` (no `tailwind.config.js` needed for v4).
- Dependency depth is shallow (≤ 2): Ticket 1 is foundation, Ticket 2 (content sections) depends on Ticket 1, Ticket 3 (CI/CD) is independent.
- Content is hardcoded into TypeScript modules sourced from `resume.md`; no markdown parser at runtime.

---

### 1. Tech Stack & Architecture Notes

**Detected stack:** Node 24, TypeScript 6 (NodeNext), Jest (SWC), Playwright, Biome. No existing React/Next.js code — greenfield UI. `src/index.ts` is a placeholder.

**Relevant existing patterns:**
- `biome.json` is the linter/formatter (protected — not modified).
- `jest.config.mjs` and `playwright.config.ts` exist for testing.
- `profile.png` and `resume.md` live at repo root.
- `.github/scripts/` and `.github/prompts/` exist and are protected.

**Recommendations:**
- Use Next.js 15 App Router with `output: 'export'` for a fully static build suitable for GitHub Pages.
- Use Tailwind CSS v4 with `@tailwindcss/postcss` and a CSS-first theme (no JS config needed).
- Use Framer Motion's `useScroll`/`useTransform` for the parallax hero and `whileInView` for scroll-triggered reveals.
- Store resume content as typed TS data in `src/content/resume.ts` so sections consume structured data (not markdown).
- Client-only components (parallax, scroll) are marked `'use client'`; the root layout stays server-rendered.

---

### 2. File & Code Structure

**New files:**
- `next.config.mjs`
- `postcss.config.mjs`
- `.gitignore` additions (via modify)
- `public/profile.png` (copy of root `profile.png`)
- `public/.nojekyll`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `src/components/Nav.tsx`
- `src/components/Section.tsx`
- `src/lib/basePath.ts`
- `src/content/resume.ts`
- `src/components/Hero.tsx`
- `src/components/Profile.tsx`
- `src/components/Skills.tsx`
- `src/components/Experience.tsx`
- `src/components/Education.tsx`
- `.github/workflows/deploy.yml`

**Modified files:**
- `package.json` (deps + scripts)
- `tsconfig.json` (Next.js paths, JSX, include `app/`)
- `.gitignore` (add `.next/`, `out/`, `next-env.d.ts`)

**Deleted files:**
- `src/index.ts` (placeholder replaced by real source tree)

**Conflicting test files to remove:** None. Existing placeholder tests do not reference removed symbols.

---

### 3. Tickets

Tickets are workstreams. No two tickets touch the same file. A ticket is workable once all tickets in its `depends_on` list are complete. Siblings under the same parent run in parallel.

---

#### Ticket 1: Foundation — Next.js + Tailwind v4 + App Shell

> Install all dependencies, configure Next.js for static GitHub Pages export, set up Tailwind v4 with the neutral/Inter theme, and create the app shell (root layout, global styles, sticky nav skeleton, resume content module).

**Constraints:**
- All React components must be TypeScript `.tsx` files.
- Any component using browser APIs, hooks from `framer-motion`, or `useState`/`useEffect` must begin with `'use client'`.
- All interactive and display elements must include a `data-testid` attribute.
- Do not modify protected files: `.github/scripts/*`, `.github/prompts/*`, `.claude/settings.json`, `.aignore`, `biome.json`.
- Image URLs that must resolve under GitHub Pages must be prefixed via the helper in `src/lib/basePath.ts`.
- Tailwind v4 uses CSS-first config via `@theme` inside `app/globals.css` — do not create a `tailwind.config.js`.

**Files owned:**
- `package.json` (modify)
- `tsconfig.json` (modify)
- `.gitignore` (modify)
- `src/index.ts` (delete)
- `next.config.mjs` (create)
- `postcss.config.mjs` (create)
- `public/profile.png` (create)
- `public/.nojekyll` (create)
- `app/layout.tsx` (create)
- `app/page.tsx` (create)
- `app/globals.css` (create)
- `src/lib/basePath.ts` (create)
- `src/content/resume.ts` (create)
- `src/components/Nav.tsx` (create)
- `src/components/Section.tsx` (create)

**Tasks:**
1. [infra, install-dependencies] Install dependencies by running `npm install next@^15 react@^19 react-dom@^19 framer-motion@^11` and `npm install -D tailwindcss@^4 @tailwindcss/postcss@^4 postcss@^8 @types/react@^19 @types/react-dom@^19 @types/node@^22`. Then update `package.json` `scripts` to add `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`, and keep existing `test`, `lint`, `check-types` scripts intact.
2. [infra, update-tsconfig] Update `tsconfig.json` to support Next.js: set `module` to `esnext`, `moduleResolution` to `bundler`, `jsx` to `preserve`, `noEmit` to `true`, add `lib: ["dom","dom.iterable","esnext"]`, add `plugins: [{ "name": "next" }]`, add `paths: { "@/*": ["./*"] }`, set `include` to `["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"]`, keep `exclude` as `["node_modules",".next","dist","out"]`.
3. [infra, update-gitignore] Append `.next/`, `out/`, and `next-env.d.ts` to `.gitignore`.
4. [infra, delete-old-entry-point] Delete `src/index.ts` — verify the file no longer exists on disk and nothing imports it.
5. [infra, create-nextjs-config] Create `next.config.mjs` exporting a config with `output: 'export'`, `basePath: '/ralph-node-resume'`, `assetPrefix: '/ralph-node-resume'`, `images: { unoptimized: true }`, `trailingSlash: true`, and `reactStrictMode: true`.
6. [infra, create-postcss-config] Create `postcss.config.mjs` exporting `{ plugins: { '@tailwindcss/postcss': {} } }`.
7. [infra, copy-assets-to-public] Copy the existing `profile.png` from the repo root into `public/profile.png` (binary copy). Also create an empty `public/.nojekyll` file so GitHub Pages does not apply Jekyll processing.
8. [code, create-basepath-helper] Create `src/lib/basePath.ts` exporting `const BASE_PATH = '/ralph-node-resume'` and a helper `withBasePath(path: string): string` that returns `${BASE_PATH}${path.startsWith('/') ? path : '/' + path}`. Used for all asset URLs referenced in JSX `src`/`href` to static files under `public/`.
9. [code, create-resume-content-data] Create `src/content/resume.ts` exporting typed data transcribed from `resume.md`: `profile` (`{ name, title, tagline, location, email, phone, linkedin, github, summary }`), `skills` (array of `{ category: string, items: string[] }` for Frontend/AI/Infra/Backend categories), `experience` (array of `{ company, location, role, period, bullets: { label: string, body: string }[], stack: string[] }` in reverse chronological order), and `education` (array of `{ title: string, detail: string, status?: string }`). Values must exactly match `resume.md`.
10. [code, create-global-styles] Create `app/globals.css` with `@import "tailwindcss";`, a `@theme` block defining `--font-sans: "Inter", system-ui, sans-serif;` and neutral palette tokens (`--color-bg: #ffffff`, `--color-fg: #0a0a0a`, `--color-muted: #6b7280`, `--color-subtle: #f5f5f7`, `--color-border: #e5e5ea`), base element resets (html/body use `--font-sans`, `bg-[var(--color-bg)]`, `text-[var(--color-fg)]`, smooth scroll behavior via `html { scroll-behavior: smooth; }`), and a `.section-pad` utility class equivalent to `py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto`.
11. [code, create-root-layout] Create `app/layout.tsx` — server component exporting default `RootLayout({ children })` that renders `<html lang="en">` with `<body data-testid="app-body">` that contains `<Nav />` and `{children}`. Import `./globals.css`. Load Inter via `next/font/google` (`import { Inter } from 'next/font/google'`) with `subsets: ['latin']` and apply its `className` to `<html>`. Export `metadata` with `title: "Paul-Valentin Mini — Senior Software Developer"` and a matching `description`.
12. [code, create-navigation-component] Create `src/components/Nav.tsx` (`'use client'`) — sticky top nav (`position: sticky; top: 0; z-index: 50`, white/blurred background via `backdrop-blur bg-white/70 border-b border-[var(--color-border)]`) with `data-testid="nav"`. Render the name "Paul-Valentin Mini" on the left (`data-testid="nav-brand"`) and anchor links for `#profile`, `#skills`, `#experience`, `#education` (`data-testid="nav-link-profile"`, `nav-link-skills`, `nav-link-experience`, `nav-link-education`). Clicking a link smooth-scrolls to the anchor via the default browser behavior inherited from the global `scroll-behavior: smooth`. Mobile-first: links collapse to a hamburger button (`data-testid="nav-toggle"`) below `md` that toggles a dropdown panel (`data-testid="nav-menu"`).
13. [code, create-section-component] Create `src/components/Section.tsx` — reusable wrapper accepting `{ id: string, title?: string, testId: string, children: React.ReactNode }` and rendering a `<section id={id} data-testid={testId}>` with the `.section-pad` class; if `title` is provided, render an `<h2 data-testid={`${testId}-title`}>` using large Apple-style typography (e.g. `text-4xl md:text-6xl font-semibold tracking-tight mb-12`).
14. [code, create-home-page-stubs] Create `app/page.tsx` — server component rendering `<main data-testid="home">` with placeholder sibling `<Section>` stubs for `#hero`, `#profile`, `#skills`, `#experience`, `#education` (each using `Section` with empty children and distinct `testId` values: `section-hero`, `section-profile`, `section-skills`, `section-experience`, `section-education`). These stubs exist so Ticket 2 can replace their children with real content without creating new files.

---

#### Ticket 2: Content Sections — Hero (Parallax) + Profile + Skills + Experience + Education
**depends_on:** [Ticket 1]

> Build the resume content UI: parallax hero with headshot, profile summary, skills chips, scroll-revealed experience timeline, and education/certifications. Wire them into the existing `app/page.tsx` stub sections from the foundation.

**Constraints:**
- All components in this ticket are client components and must begin with `'use client'`.
- Every interactive and display element must include a `data-testid` attribute.
- Image and asset URLs must go through `withBasePath` from `src/lib/basePath.ts` (imported, not reimplemented).
- Read resume data exclusively from `src/content/resume.ts` — do not hardcode content strings inside components.
- Do not modify files owned by Ticket 1 other than `app/page.tsx`, which this ticket is allowed to edit to mount the real section components in place of stubs.
- Design is Apple.com-inspired: generous whitespace, large type (`text-4xl`+), neutral palette, smooth transitions (`transition-all duration-500 ease-out`), mobile-first responsive (`sm:`/`md:`/`lg:` breakpoints).

**Files owned:**
- `src/components/Hero.tsx` (create)
- `src/components/Profile.tsx` (create)
- `src/components/Skills.tsx` (create)
- `src/components/Experience.tsx` (create)
- `src/components/Education.tsx` (create)
- `app/page.tsx` (modify)

**Tasks:**
1. [code, create-hero-component] Create `src/components/Hero.tsx` (`'use client'`) — full-viewport section (`min-h-[90vh]`) with `data-testid="hero"`. Uses `useScroll` and `useTransform` from `framer-motion` to drive a parallax background gradient div (`data-testid="hero-bg"`, `style={{ y }}` where `y` maps scroll 0→500 to 0→-150). Centered foreground shows the headshot via `next/image` `Image` from `public/profile.png` using `withBasePath('/profile.png')` as `src`, `width={240}`, `height={240}`, `priority`, rounded-full, with `data-testid="hero-avatar"`. Below the avatar: the name as `<h1 data-testid="hero-name">` (text-5xl md:text-7xl font-semibold tracking-tight), the title "Senior Software Developer" as `<p data-testid="hero-title">` (text-xl md:text-2xl text-[var(--color-muted)]), and the tagline from `resume.profile.tagline` as `<p data-testid="hero-tagline">`. Entrance animation: all three text elements fade/slide up on mount via `motion.p`/`motion.h1` with `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, staggered `transition={{ delay: 0.1 * i }}`.
2. [code, create-profile-component] Create `src/components/Profile.tsx` (`'use client'`) — renders `resume.profile.summary` inside a `motion.p` with `data-testid="profile-summary"` using `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 24 }}`, `viewport={{ once: true, margin: '-100px' }}`, `transition={{ duration: 0.6 }}`. Typography: `text-2xl md:text-3xl leading-relaxed max-w-4xl`.
3. [code, create-skills-component] Create `src/components/Skills.tsx` (`'use client'`) — renders four category groups from `resume.skills`. Each group is a `<div data-testid={`skills-group-${slug}`}>` (where `slug` is the lowercase category prefix e.g. `frontend`, `ai`, `infra`, `backend`) containing a small category label (`<h3 data-testid={`skills-group-${slug}-label`}>`) and a flex-wrap chip row where each item is a `<span data-testid={`skill-chip-${slug}-${i}`}>` styled as a pill (`px-4 py-2 rounded-full bg-[var(--color-subtle)] text-sm border border-[var(--color-border)]`). Group container uses `motion.div` with the same `whileInView` fade/slide-up pattern; chips animate with a staggered `transition={{ delay: i * 0.03 }}`.
4. [code, create-experience-component] Create `src/components/Experience.tsx` (`'use client'`) — renders `resume.experience` as a vertical timeline inside `<ol data-testid="experience-timeline">`. Each role is an `<li data-testid={`experience-item-${i}`}>` containing: a left-side timeline dot+line (decorative, `aria-hidden`), a header with company/location (`data-testid={`experience-company-${i}`}`), role title + period (`data-testid={`experience-role-${i}`}`, `data-testid={`experience-period-${i}`}`), a `<ul data-testid={`experience-bullets-${i}`}>` of bullets each rendered as `<li data-testid={`experience-bullet-${i}-${j}`}>` showing `<strong>{label}</strong> {body}`, and a tech-stack chip row `<div data-testid={`experience-stack-${i}`}>` where each tech is `<span data-testid={`experience-stack-chip-${i}-${k}`}>`. Each `<li>` uses `motion.li` with `whileInView` fade/slide-in-left (`initial={{ opacity: 0, x: -24 }}`, `whileInView={{ opacity: 1, x: 0 }}`, `viewport={{ once: true, margin: '-80px' }}`, `transition={{ duration: 0.5 }}`).
5. [code, create-education-component] Create `src/components/Education.tsx` (`'use client'`) — renders `resume.education` as a `<ul data-testid="education-list">` of cards. Each item is `<li data-testid={`education-item-${i}`}>` with the title as `<h3 data-testid={`education-title-${i}`}>`, detail as `<p data-testid={`education-detail-${i}`}>`, and if `status` exists a small badge `<span data-testid={`education-status-${i}`}>` (e.g. "Completed Dec 2025" or "In Progress"). Cards animate in with `whileInView` fade/slide-up. Layout: single column on mobile, `md:grid-cols-3` on desktop.
6. [code, mount-content-sections] Modify `app/page.tsx` — replace the stub `Section` children with the real components. Structure: `<Hero />` inside the `section-hero` Section (no title), `<Profile />` inside `section-profile` (title "Profile"), `<Skills />` inside `section-skills` (title "Skills"), `<Experience />` inside `section-experience` (title "Experience"), `<Education />` inside `section-education` (title "Education & Certifications"). Keep all existing `data-testid` values on the wrapper sections unchanged.

---

#### Ticket 3: GitHub Pages Deployment Workflow

> Add a GitHub Actions workflow that builds the static Next.js export and deploys it to GitHub Pages on push to `main`.

**Constraints:**
- Only files under `.github/workflows/` are modified.
- Must not modify protected files (`.github/scripts/*`, `.github/prompts/*`).
- Workflow must not run tests — deployment only; build must succeed with the existing `npm run build` script.
- Must use only official `actions/*` actions (`checkout`, `setup-node`, `configure-pages`, `upload-pages-artifact`, `deploy-pages`).

**Files owned:**
- `.github/workflows/deploy.yml` (create)

**Tasks:**
1. [infra, create-deploy-workflow] Create `.github/workflows/deploy.yml` with: `name: Deploy to GitHub Pages`; trigger `on: { push: { branches: [main] }, workflow_dispatch: {} }`; top-level `permissions: { contents: read, pages: write, id-token: write }`; `concurrency: { group: "pages", cancel-in-progress: false }`. Define a `build` job on `ubuntu-latest` with steps: `actions/checkout@v4`; `actions/setup-node@v4` with `node-version-file: .nvmrc` and `cache: npm`; `actions/configure-pages@v5`; `npm ci`; `npm run build`; `actions/upload-pages-artifact@v3` with `path: ./out`. Define a `deploy` job that `needs: build`, uses `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`, runs on `ubuntu-latest`, and has a single step `actions/deploy-pages@v4` with `id: deployment`.

---

> **Note:** A ticket is workable once all tickets in its `depends_on` list are complete — siblings under the same parent run in parallel. Tasks within each ticket are sequential. No ticket includes test creation — testing is handled separately.
