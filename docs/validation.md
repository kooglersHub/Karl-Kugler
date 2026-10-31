# Validation record

Date: 2026-11-01 (Europe/Berlin). Local Windows environment, Node 24.22.1, Microsoft Edge 156, Playwright 1.64.1. This records local verification, not a deployed-site guarantee.

## Implemented scope

Eleven static HTML pages: home, project index, HaptIQ Hand and EvoLab case studies, lab, writing index, two articles, about, contact and 404. Native Astro layouts, typed MDX collections adapted from Case, Tailwind plus custom CSS, self-hosted OFL fonts, responsive optimized images and original SVG artwork. Project category filtering, persistent theme selection and an interactive signal-sampling demo use small native scripts. No React hydration or animation library is required.

## Automated checks

- `npm run build`: passed, 27 checked source files, zero errors/warnings/hints; 11 static pages built.
- `npm test`: 5 tests passed. Covers every required route, meaningful document structure, real contact destinations, local navigation/assets, indexing defaults and UTC article date formatting.
- `npm run test:browser`: 11 tests passed after the final responsive diagram change.
- Browser matrix: all 11 pages at 375, 768, 1024 and 1440px. No horizontal document overflow, failed images, failed asset responses, browser console errors or page errors.
- Automated axe WCAG 2/2.1/2.2 A/AA checks: all main routes in light and dark modes. Explicit additional regression checks cover visible link names for speech navigation.
- Keyboard filters, skip-link navigation, theme persistence, blocked localStorage, signal controls below/at/above the Nyquist threshold, and JavaScript-disabled content/navigation passed.
- `npm run format:check`: passed. `git diff --check`: passed.
- `npm audit`: zero known vulnerabilities across production and development dependencies at verification time.
- A separate configured build using reserved test origin `https://portfolio.test` verified canonical URLs, indexing and sitemap output. This is a test origin, not the deployment destination. Final default output remains noindex until SITE_URL is configured.
- Development server smoke test returned HTTP 200; browser QA used the static production preview.

The first static-route test failed before implementation. Date formatting and accessible link-name fixes also have recorded failing-then-passing regression checks. Initial test issues (an ambiguous status locator and an image-element TypeScript narrowing) were fixed. The original Astro 5 dependency choice was replaced with Astro 7 after the security audit; final versions have no reported audit findings.

## Visual review

Desktop/mobile screenshots were captured for every route under ignored `test-results/` and reviewed as contact sheets. Homepage, long-form case study and lab were also inspected at full size. The mobile data-flow code block was replaced by a responsive native diagram after visual inspection found awkward line wrapping. The final mobile diagram and dark homepage were inspected separately. No external design mockup had been approved; review used the supplied editorial brief and recorded design direction.

## Lighthouse

Lighthouse 13.6.0, local production preview, headless Edge, default simulated mobile configuration. Measurements are individual runs, not promises about real hosting or every device. Raw local JSON reports are under ignored `.tools/`; compact measurements are in `docs/lighthouse-summary.json`.

| Page              | Performance | Accessibility | Best practices | SEO |
| ----------------- | ----------- | ------------- | -------------- | --- |
| Home              | 98          | 100           | 100            | 66  |
| HaptIQ case study | 98          | 100           | 100            | 66  |
| Lab               | 100         | 100           | 100            | 63  |

The SEO reductions are from the deliberate crawl block on an unconfigured local preview. The separate SITE_URL build verifies its removal and sitemap/canonical generation. No public production URL has yet been measured. Home LCP was 1.7s, total blocking time 100ms and CLS 0.073 in the recorded run; scores varied slightly between runs.

## Independent review

A read-only reviewer checked routing, metadata, interactions, sampling semantics, accessibility structure, provenance, Cloudflare static setup and tests. No critical or important findings. Its minor hardcoded-date finding was fixed using a UTC formatter and regression test. Lighthouse additionally exposed accessible-name mismatches; natural link text now provides the accessible names, with an explicit passing regression check. No review findings remain deferred.

## Delivery limits

- The user created `kooglersHub/Karl-Kugler`, and it is configured as `origin`.
- Cloudflare remains the requested hosting destination. No Cloudflare plugin or authenticated CLI configuration was available. Computer Use ended because the current Windows Firefox browser does not support the runtime's required URL-policy enforcement; no further UI automation was attempted.
- Cloudflare Git integration should use `main`, `npm run build`, output `dist`, Node 24 and the actual canonical SITE_URL. CI is configured in the repository; this record does not assert a remote workflow result.
- A fuller personal biography, approved portrait/CV and additional authentic project media were not supplied. Those are omitted rather than fabricated. EvoLab's repository remains private, and its website image is explicitly conceptual.
- LinkedIn uses the exact user-supplied path. Automated retrieval was blocked by LinkedIn; no unrelated biography was used.
- Email contact opens the visitor's email application. There is no contact backend or delivery receipt.
- Safari, Firefox rendering, real-device touch and deployed-host performance were not tested. Automated accessibility checks complement, and do not replace, assistive-technology user testing.
