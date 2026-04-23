You are a PRD generator. Your single task is to create a file called `PRD.md` at the root of the repository by calling the Write tool.

You will be given one ticket to convert into a PRD. Call the Write tool with `file_path` = `PRD.md` and the PRD body as `content`. Do not print the PRD contents in your chat response. Do not wrap the PRD in a markdown code block in your response. Do not create any other files. Do not run any commands.

---

## Ticket 1: Foundation — Next.js + Tailwind v4 + App Shell


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
1. [infra] Install dependencies by running `npm install next@^15 react@^19 react-dom@^19 framer-motion@^11` and `npm install -D tailwindcss@^4 @tailwindcss/postcss@^4 postcss@^8 @types/react@^19 @types/react-dom@^19 @types/node@^22`. Then update `package.json` `scripts` to add `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`, and keep existing `test`, `lint`, `check-types` scripts intact.
2. [infra] Update `tsconfig.json` to support Next.js: set `module` to `esnext`, `moduleResolution` to `bundler`, `jsx` to `preserve`, `noEmit` to `true`, add `lib: ["dom","dom.iterable","esnext"]`, add `plugins: [{ "name": "next" }]`, add `paths: { "@/*": ["./*"] }`, set `include` to `["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"]`, keep `exclude` as `["node_modules",".next","dist","out"]`.
3. [infra] Append `.next/`, `out/`, and `next-env.d.ts` to `.gitignore`.
4. [infra] Delete `src/index.ts` — verify the file no longer exists on disk and nothing imports it.
5. [infra] Create `next.config.mjs` exporting a config with `output: 'export'`, `basePath: '/ralph-node-resume'`, `assetPrefix: '/ralph-node-resume'`, `images: { unoptimized: true }`, `trailingSlash: true`, and `reactStrictMode: true`.
6. [infra] Create `postcss.config.mjs` exporting `{ plugins: { '@tailwindcss/postcss': {} } }`.
7. [infra] Copy the existing `profile.png` from the repo root into `public/profile.png` (binary copy). Also create an empty `public/.nojekyll` file so GitHub Pages does not apply Jekyll processing.
8. [logic] Create `src/lib/basePath.ts` exporting `const BASE_PATH = '/ralph-node-resume'` and a helper `withBasePath(path: string): string` that returns `${BASE_PATH}${path.startsWith('/') ? path : '/' + path}`. Used for all asset URLs referenced in JSX `src`/`href` to static files under `public/`.
9. [logic] Create `src/content/resume.ts` exporting typed data transcribed from `resume.md`: `profile` (`{ name, title, tagline, location, email, phone, linkedin, github, summary }`), `skills` (array of `{ category: string, items: string[] }` for Frontend/AI/Infra/Backend categories), `experience` (array of `{ company, location, role, period, bullets: { label: string, body: string }[], stack: string[] }` in reverse chronological order), and `education` (array of `{ title: string, detail: string, status?: string }`). Values must exactly match `resume.md`.
10. [ui] Create `app/globals.css` with `@import "tailwindcss";`, a `@theme` block defining `--font-sans: "Inter", system-ui, sans-serif;` and neutral palette tokens (`--color-bg: #ffffff`, `--color-fg: #0a0a0a`, `--color-muted: #6b7280`, `--color-subtle: #f5f5f7`, `--color-border: #e5e5ea`), base element resets (html/body use `--font-sans`, `bg-[var(--color-bg)]`, `text-[var(--color-fg)]`, smooth scroll behavior via `html { scroll-behavior: smooth; }`), and a `.section-pad` utility class equivalent to `py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto`.
11. [ui] Create `app/layout.tsx` — server component exporting default `RootLayout({ children })` that renders `<html lang="en">` with `<body data-testid="app-body">` that contains `<Nav />` and `{children}`. Import `./globals.css`. Load Inter via `next/font/google` (`import { Inter } from 'next/font/google'`) with `subsets: ['latin']` and apply its `className` to `<html>`. Export `metadata` with `title: "Paul-Valentin Mini — Senior Software Developer"` and a matching `description`.
12. [ui] Create `src/components/Nav.tsx` (`'use client'`) — sticky top nav (`position: sticky; top: 0; z-index: 50`, white/blurred background via `backdrop-blur bg-white/70 border-b border-[var(--color-border)]`) with `data-testid="nav"`. Render the name "Paul-Valentin Mini" on the left (`data-testid="nav-brand"`) and anchor links for `#profile`, `#skills`, `#experience`, `#education` (`data-testid="nav-link-profile"`, `nav-link-skills`, `nav-link-experience`, `nav-link-education`). Clicking a link smooth-scrolls to the anchor via the default browser behavior inherited from the global `scroll-behavior: smooth`. Mobile-first: links collapse to a hamburger button (`data-testid="nav-toggle"`) below `md` that toggles a dropdown panel (`data-testid="nav-menu"`).
13. [ui] Create `src/components/Section.tsx` — reusable wrapper accepting `{ id: string, title?: string, testId: string, children: React.ReactNode }` and rendering a `<section id={id} data-testid={testId}>` with the `.section-pad` class; if `title` is provided, render an `<h2 data-testid={`${testId}-title`}>` using large Apple-style typography (e.g. `text-4xl md:text-6xl font-semibold tracking-tight mb-12`).
14. [ui] Create `app/page.tsx` — server component rendering `<main data-testid="home">` with placeholder sibling `<Section>` stubs for `#hero`, `#profile`, `#skills`, `#experience`, `#education` (each using `Section` with empty children and distinct `testId` values: `section-hero`, `section-profile`, `section-skills`, `section-experience`, `section-education`). These stubs exist so Ticket 2 can replace their children with real content without creating new files.

---

## Instructions

Write `PRD.md` at the repository root. Use exactly this structure:

```
# PRD: Foundation — Next.js + Tailwind v4 + App Shell

## Tasks

<Task checklist — see Task Format below>
```

## Task Format

Convert each numbered task from the ticket into a checklist line:

```
- [ ] <Short title>. <Task description from the blueprint, copied verbatim.> `[test: <test-command>]`
```

Rules:
- Each task MUST be a single line (no line breaks within a task)
- Each task MUST end with a `[test: ...]` annotation
- Copy the task description exactly as written in the blueprint — do not rephrase, expand, or add details. Your job is to format, not rewrite.
- Do not invent version numbers, package names, or implementation details that are not in the blueprint

### Deriving the test command

Each task in the ticket has a nature tag: `[logic]`, `[ui]`, or `[infra]`.

**Step 1** — Derive a filename from the task's short title:
- Convert to kebab-case
- Remove articles (a, an, the) and punctuation

Example: "Add a banner at the top" → `add-banner-top`

**Step 2** — Map the nature tag to a test command:

| Tag | Test command |
|-----|-------------|
| `[logic]` | `npx jest tests/unit/<filename>.test.ts` |
| `[ui]` | `npx playwright test tests/e2e/<filename>.spec.ts` |
| `[infra]` | `npx tsc --noEmit` or `npm run lint` for config validation; `bash tests/scripts/<filename>.sh` otherwise |

---

## Example

Given a ticket section like this (input):

    > Implement and unit-test the pure countdown logic.
    >
    > **Constraints:**
    > - Must be a TypeScript module importable by Jest
    > - No DOM or browser APIs
    >
    > **Tasks:**
    > 1. [logic] Create `src/timer-logic.ts` with pure functions: `formatTime(totalSeconds: number): string` (returns "MM:SS") and `tick(remainingSeconds: number): number` (decrements by 1, floors at 0), and a constant `POMODORO_DURATION_SECONDS = 1500`.
    > 2. [logic] Create `tests/unit/timer-logic.test.ts` — test `formatTime` (25:00, 00:00, 09:59 edge cases), test `tick` (decrements, does not go below 0), test duration constant equals 1500.

…the Write tool call's `content` argument should be the following text (shown indented here for illustration — do NOT indent it in the actual file, and do NOT wrap it in backticks):

    # PRD: Timer Logic (Pure Functions)

    ## Tasks

    - [ ] Create timer logic module. Create `src/timer-logic.ts` with pure functions: `formatTime(totalSeconds: number): string` (returns "MM:SS") and `tick(remainingSeconds: number): number` (decrements by 1, floors at 0), and a constant `POMODORO_DURATION_SECONDS = 1500`. `[test: npx jest tests/unit/create-timer-logic-module.test.ts]`
    - [ ] Create timer logic unit tests. Create `tests/unit/timer-logic.test.ts` — test `formatTime` (25:00, 00:00, 09:59 edge cases), test `tick` (decrements, does not go below 0), test duration constant equals 1500. `[test: npx jest tests/unit/create-timer-logic-unit-tests.test.ts]`

---

Now call the Write tool to create `PRD.md` for Ticket 1: Foundation — Next.js + Tailwind v4 + App Shell. Do not print the file contents in your response.
