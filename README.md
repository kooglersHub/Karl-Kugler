# Karl Kugler

Bilingual portfolio for a mechatronics student at KIT. Astro generates static HTML from shared views and typed MDX collections. The German pages live at the root, the English pages under `/en/`.

## Local preview

Use Node 22.23.4 or newer and npm.

```sh
npm ci
npm run dev
```

Open [localhost:4321](http://127.0.0.1:4321/). For the static production preview, run `npm run build` followed by `npm run preview`. The `redesign/personal-portfolio` branch is the review branch.

## Verification

```sh
npm run build
npm test
npm run test:browser
npm run format:check
```

Playwright tests both languages on Edge on Windows and Chromium in CI. For local Chromium, install it with `npx playwright install chromium` and set `CI=1`. The browser suite starts the static preview and saves screenshots at 375, 768, 1440 and 1920 pixels to ignored `test-results/`. Free port 4321 before running it, or set `PLAYWRIGHT_PREVIEW_URL` to reuse a running static preview.

## Edit content

- `src/content/projects/` and `src/content/writing/` contain the German MDX and matching `.en.mdx` translations. Keep slugs identical across locales so language switches resolve.
- `src/views/` contains shared views used by the German and English routes. `src/layouts/` contains the shell and case-study and article layouts.
- `src/assets/` contains project media. Astro produces responsive WebP variants at build time. Describe the origin and limits of a new asset in its caption and alt text.
- `src/config.ts` contains public identity and contact destinations. `src/lib/services.ts` holds the email enquiry copy. The lab script is loaded only on the lab route.

## Cloudflare Pages

Use `npm run build` with output directory `dist`. The static production build needs `SITE_URL=https://web.karl-kugler.app` for canonical URLs, language alternates, indexing and the sitemap. Keep `SITE_URL` unset for preview builds so they emit `noindex` and block indexing in robots.txt. Use the Node 24 build runtime. Astro generates real HTML routes and `404.html`, so an SPA redirect is unnecessary.

Set environment variables for the intended deployment environment only. Keep the redesign on its review branch until it is approved for production.

The [redesign notes](docs/design/2026-11-18-werkstatt.md) cover visual decisions, sources, quality checks and release prerequisites. The [third-party notices](THIRD_PARTY_NOTICES.md) document the inherited architecture and asset credits.
