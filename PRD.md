# PRD: GitHub Pages Deployment Workflow

## Tasks

- [ ] Create GitHub Pages workflow. Create `.github/workflows/deploy.yml` with: `name: Deploy to GitHub Pages`; trigger `on: { push: { branches: [main] }, workflow_dispatch: {} }`; top-level `permissions: { contents: read, pages: write, id-token: write }`; `concurrency: { group: "pages", cancel-in-progress: false }`. Define a `build` job on `ubuntu-latest` with steps: `actions/checkout@v4`; `actions/setup-node@v4` with `node-version-file: .nvmrc` and `cache: npm`; `actions/configure-pages@v5`; `npm ci`; `npm run build`; `actions/upload-pages-artifact@v3` with `path: ./out`. Define a `deploy` job that `needs: build`, uses `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`, runs on `ubuntu-latest`, and has a single step `actions/deploy-pages@v4` with `id: deployment`. `[test: bash tests/scripts/create-github-pages-workflow.sh]`
