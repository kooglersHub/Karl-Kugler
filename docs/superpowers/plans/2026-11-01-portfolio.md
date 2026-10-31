# Portfolio Implementation Plan

> Execute natively in this chat using the executing-plans workflow; the user requested implementation and selected Case.

**Goal:** Deliver a polished, usable static portfolio grounded in Karl's real projects.
**Architecture:** Adapt Case's MIT-licensed Astro/MDX content architecture, replacing its presentation and simplifying collections. Static output with small progressive interactions.
**Tech Stack:** Astro 7, TypeScript 5, MDX 8, Tailwind 4, self-hosted OFL fonts, Playwright. The originally planned Astro 5/MDX 4 baseline was upgraded after npm audit identified advisories.
**Spec:** `docs/superpowers/specs/2026-11-01-portfolio-design.md`

## Global constraints

No invented biography, achievements or metrics. No unnecessary backend/hydration. Retain attribution. Cloudflare-compatible static output. Reduced motion and keyboard support.

## Review focus

Empty filter results, JavaScript disabled, unavailable local storage, narrow viewports with long text, unconfigured production URL.

## Tasks

1. Foundation — `package.json`, `astro.config.mjs`, `src/content.config.ts`, `src/config.ts`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`; native static integrity tests in `tests/site.test.mjs`. Write required route/link assertions, observe missing-build failure, then implement. Validate check/build and dependency peers.
2. Content and pages — `src/content/{projects,writing}`, `src/components/ProjectPreview.astro`, `src/layouts/{CaseStudy,Article}Layout.astro`, all requested `src/pages` routes. Obtain repository evidence and licensed media. Build and validate all generated HTML/links/media.
3. Interaction — project filters, mobile navigation, theme and `src/components/SignalLab.astro`. Browser tests assert keyboard use, filters, no-JS visibility, storage failure tolerance, signal controls and reduced-motion support.
4. Polish and delivery — Playwright matrix at 375/768/1024/1440, screenshots, axe, Lighthouse, formatting, full production build and CI. Record measurements in `docs/validation.md`, provenance in `THIRD_PARTY_NOTICES.md`, deployment/setup in README. Commit verified work. No Git remote currently exists to push.

## Execution record

- Investigation complete; selected Case confirmed by user.
- Foundation, all routes and content system implemented; Astro 7/MDX 8 selected after audit found advisories in the initial Astro 5 baseline.
- Final build passed with zero diagnostics; 5 native tests and 11 browser tests passed.
- Screenshots reviewed across all routes; native responsive pipeline replaced a mobile-wrapping code diagram.
- Independent review found no critical/important issues. Date-label minor fixed with a regression check; speech-navigation label mismatches found through Lighthouse were also fixed and tested.
- Local Lighthouse performance: home 98, HaptIQ 98, lab 100. Preview crawl blocking is intentional; configured SEO output separately checked.
- User created the destination GitHub repository and selected Cloudflare. Windows browser policy support prevented Cloudflare UI setup; deployment remains a documented handoff.
