# ralph-node-base

A fork of [ralph-node](https://github.com/Laptopmini/ralph-node) that has been initialized by running the bootstrap PRD. Save some tokens by using this as a starting point, or just do it yourself!

For full documentation on how to use `ralph-node` and these repos, see the [original ralph-node README](https://github.com/Laptopmini/ralph-node#readme).

## Prompt

`npm run maestro -- \`
> Build a personal portfolio/resume website for Paul-Valentin Mini using the content in resume.md. The site must be a React single-page application using Next.js (App Router) with static export (output: 'export') for GitHub Pages deployment — no server-side features (no API routes, no getServerSideProps, no middleware). Configure basePath and assetPrefix to '/ralph-node-resume' for GitHub Pages. Use Tailwind CSS v4 for styling and Framer Motion for scroll-triggered animations and parallax effects. The design should be Apple.com-inspired: clean, minimal, generous whitespace, smooth transitions, and a parallax hero. Mobile-first responsive design. Sections: Hero with name/title/tagline using the headshot at profile.png and a subtle parallax background, Profile summary, Skills (visual chip/tag layout), Experience (scroll-revealed timeline with each role's details), Education & Certifications, and a sticky nav with smooth-scroll anchors. The first ticket must install all dependencies (next, react, react-dom, tailwindcss, framer-motion, @tailwindcss/postcss, etc.), configure Next.js for static export, set up the Tailwind theme (neutral color palette, Inter font), and create the app shell (layout, global styles, nav skeleton). A separate infra ticket must add a GitHub Actions workflow (.github/workflows/deploy.yml) that builds and deploys to GitHub Pages on push to main. All interactive and display elements must use data-testid attributes.

## Changelog

- **TypeScript** — `tsconfig.json` with ES2022 target, NodeNext modules, strict mode, and `dist/` output
- **Jest** — `jest.config.js` with `@swc/jest` transform scoped to unit tests, plus a sanity test
- **Playwright** — `playwright.config.ts` targeting Chromium at `localhost:3000`, plus a sanity E2E test
- **Root test script** — `npm test` wired to run unit then E2E tests sequentially

## Stack

| Tool | Role |
|------|------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | Agentic CLI |
| [OpenCode](https://opencode.ai/) | Open Source Agentic CLI |
| [LM Studio](https://lmstudio.ai/) | Local LLM Server |
| [Jest](https://jestjs.io/) | Unit testing |
| [Playwright](https://playwright.dev/) | E2E testing |
| [Biome](https://biomejs.dev/) | Linting and formatting |

## License

Apache 2.0