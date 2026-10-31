# Karl Kugler — Engineering field journal

A static, multi-page portfolio built with Astro, TypeScript, MDX, Tailwind CSS and a custom editorial design system. Case supplies the MIT-licensed base architecture; presentation and content are specific to this site.

## Run locally

Use Node **22.23.4+** (Node 24 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. No database, API keys or account setup is required. Fonts and images are served locally.

## Checks

```sh
npm run build
npm test
npm run test:browser
npm run format:check
```

Browser tests use installed Microsoft Edge on Windows and Chromium in CI. To use Chromium locally, set `CI=1` and run `npx playwright install chromium` first. The suite starts its own preview server and saves mobile/desktop screenshots under ignored `test-results/`. Build before running tests: integrity and browser tests inspect the production output.

If npm is unavailable on PATH in the Codex runtime, this checkout's ignored `.tools/package/bin/npm-cli.js` can be invoked with `node` as a temporary equivalent. This bootstrap helper is not part of the project or deployment.

## Content and layout

- `src/config.ts`: identity, contact and profile links.
- `src/content.config.ts`: typed schemas derived from Case's glob-loaded collections.
- `src/content/projects/*.mdx`: project metadata and case-study bodies.
- `src/content/writing/*.mdx`: technical notes.
- `src/layouts/`: global shell, case-study and article layouts.
- `src/styles/global.css`: colors, typography, fluid spacing, grids, focus and motion rules.
- `src/components/SignalLab.astro`: progressively enhanced sampling experiment.
- `src/assets/`: original-size source media, optimized during builds.

Project slugs are explicit frontmatter values. Project media, galleries and external links are optional; do not invent them to satisfy a schema. Add a category to the schema only when real work needs it. The filter list derives from existing categories, so it cannot advertise an empty category. Without JavaScript every project remains visible.

## Publish on Cloudflare Pages

1. In Cloudflare **Workers & Pages → Create application → Pages → Import an existing Git repository**, select [`kooglersHub/Karl-Kugler`](https://github.com/kooglersHub/Karl-Kugler) and production branch `main`.
2. Build command: `npm run build`; output directory: `dist`.
3. Select Node 24 and set `SITE_URL` to the real canonical HTTPS origin, without a path.
4. Run a fresh build and deploy the resulting static directory.

No Cloudflare adapter or Worker runtime is needed for static output. `_headers` supplies basic browser security headers. Do not add an SPA catch-all redirect: Astro generates real HTML routes and `404.html`.

These build settings follow the [official Cloudflare Astro deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/). Once connected, Pages rebuilds automatically on pushes to `main`.

Without `SITE_URL`, builds deliberately emit `noindex, nofollow`, disallow crawling in `robots.txt`, and omit sitemap/canonical URLs. A configured build enables indexing and sitemap generation. Do not use a temporary preview domain as the production canonical.

## Content still worth supplying

The site includes two evidence-based case studies and two newly written technical notes. It does not invent employment, education, client work, quantitative outcomes or a CV. A fuller biography, approved portrait/CV, more project photographs, additional case studies and the production domain can be added later. EvoLab's artwork is labeled a conceptual illustration; its repository remains private. LinkedIn uses the path supplied by Karl; automated retrieval was blocked by LinkedIn.

The email comes from the connected GitHub identity. Contact uses a real `mailto:` link; sending depends on the visitor's email application. There is no pretend submission form.

## Decisions and evidence

See [repository audit](docs/repository-audit.md), [design](docs/superpowers/specs/2026-11-01-portfolio-design.md), [implementation plan](docs/superpowers/plans/2026-11-01-portfolio.md), [validation](docs/validation.md) and [third-party notices](THIRD_PARTY_NOTICES.md).
