# ralph-resume

A fork of [ralph-node](https://github.com/Laptopmini/ralph-node) that was prompted to build a website based on my resume, hosted on GitHub Pages.

For full documentation on how to use `ralph-node` and these repos, see the [original ralph-node README](https://github.com/Laptopmini/ralph-node#readme).

## Prompt

```
read -r -d '' PROMPT <<'EOF'
Build a personal portfolio/resume website for Paul-Valentin Mini using the content in `resume.md` and profile picture `profile.png` at the root of the repo. The site must be a React single-page application GitHub Pages deployment. Make sure it has a workflow that builds and deploys to GitHub Pages on push to main, using '/ralph-node-resume' as a base path. The aesthetic direction needs to be playful retro-editorial, inspired by Benefit Cosmetics crossed with mid-century magazine layouts. The site should feel confident, witty, and warm — not corporate, not minimalist. Think vintage beauty-counter signage, kitschy pin-up posters, and Wes Anderson title cards reinterpreted for an engineer's resume. I also would love to see some neat animations, like starburst/sparkle, gentle tilt on hover, and parallax on decorative elements. Leverage popular open-source libraries like Tailwind CSS, Framer Motion, and Next.js if you think they're appropriate.
EOF

npm run maestro -- "$PROMPT"
```

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