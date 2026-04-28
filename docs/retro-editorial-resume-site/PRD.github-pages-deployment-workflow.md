# PRD: GitHub Pages Deployment Workflow

## Tasks

- [x] Create `.github/workflows/deploy-pages.yml` defining a workflow named `Deploy to GitHub Pages` triggered on `push` to branch `main` and on `workflow_dispatch`. Set top-level `permissions: { contents: read, pages: write, id-token: write }` and `concurrency: { group: 'pages', 'cancel-in-progress': false }`. Define two jobs. Job `build` (runs-on `ubuntu-latest`): steps are `actions/checkout@v4`; `actions/setup-node@v4` with `node-version-file: '.nvmrc'` and `cache: 'npm'`; `run: npm ci`; `run: npm run build`; `actions/upload-pages-artifact@v3` with `path: ./out`. Job `deploy` (needs `build`, runs-on `ubuntu-latest`, environment `name: github-pages` with `url: ${{ steps.deployment.outputs.page_url }}`): single step `actions/deploy-pages@v4` with `id: deployment`. Do NOT modify any file outside `.github/workflows/deploy-pages.yml`. `[test: bash tests/scripts/create-pages-workflow.sh]`
