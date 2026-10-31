# Repository and reference audit

Audit date: 2026-11-01. This document records investigation, not an implemented site.

## Existing repository

- The checkout contains `.git` and `AGENTS.md.txt` only; there is no application, asset directory, package manifest or existing commit.
- No Git remote is configured. A local baseline can be committed; pushing requires a destination repository.
- Preserve the original instructions without edits.
- Node 24.22.1 is available. `npm` is not currently on PATH; locate the bundled package manager before installing anything.

## Reference comparison

Package manifests, licenses and Case's collection/configuration source were fetched directly from the repositories.

| Reference | License | Observed architecture | Useful direction | Redesign / omit |
| --- | --- | --- | --- | --- |
| [Case](https://github.com/erlandv/case) | MIT, copyright 2025 Erland | Astro ^5.16.7, MDX ^4.0.0, sitemap, Sharp; static output, glob-loaded typed collections | Case-study-first routing, separate article/case-study layouts, MDX content and engineering decision narratives | Replace visual shell; simplify seven collections to projects and writing; omit all sample biographies, outcomes and testimonials |
| [Astro Nano](https://github.com/markhorn-dev/astro-nano) | MIT, copyright 2024–2025 Mark Horn | Astro ^5.0.5, MDX, Tailwind 3, no client UI framework | Restrained navigation, reading experience, minimal hydration | Do not adopt its narrow, uniform composition or legacy Tailwind integration |
| [Astrofy](https://github.com/manuelernestog/astrofy) | MIT, copyright 2022 Manuel Ernesto Garcia | Astro ^4.0.2, Tailwind 3, DaisyUI 4 | Profile/CV information hierarchy | Omit store, DaisyUI sidebar/card styling and unnecessary dependencies |

Recommendation: use Case as the single base architecture, retaining its MIT notice wherever source is adapted. Nano and Astrofy remain references, not additional copied bases. Case needs dependency/API compatibility work rather than blind template installation.

## Registry verification

The npm registry's `latest` metadata returned the following during this audit. These versions are observations, not an installed or tested dependency set.

| Package | Version | License |
| --- | --- | --- |
| astro | 7.4.4 | MIT |
| @astrojs/mdx | 8.1.2 | MIT |
| @astrojs/check | 0.9.12 | MIT |
| @astrojs/sitemap | 3.7.4 | MIT |
| tailwindcss | 4.3.3 | MIT |
| @tailwindcss/vite | 4.3.3 | MIT |
| typescript | 7.0.2 | Apache-2.0 |

Astro/MDX report Node >=22.23.4. Select and lock a mutually compatible set after checking peer dependencies; do not infer compatibility from latest tags alone. No packages have been installed yet.

## Verified personal content

The authenticated GitHub connection identifies Karl Kugler, `kooglersHub`, with the account email `karl.kugler@proton.me`. Public profile: https://github.com/kooglersHub.

The public HaptIQ Hand repository documents tactile telemetry, an articulated hand viewer, grasp recording/replay and CAD-based sensor estimation. Its README explicitly states that geometry and taxel placement are approximate and uncalibrated. Preserve that limitation. It derives from another HaptIQ project; do not imply sole original authorship or relicense bundled CAD/reference material. Review THIRD_PARTY_NOTICES.md before reusing media.

The connected account also contains private projects. The user authorized drawing on their projects, but names alone do not establish technical accomplishments or publication rights for third-party assets. Summaries must be backed by repository evidence. Never copy credentials, private datasets or client material into the public site.

LinkedIn identity is unresolved. Search returned multiple people named Karl Kugler, without a verified connection to this GitHub account. Do not use any of those biographies or links as personal facts.

## Proposed design direction

An engineering field journal: warm paper, ink text, muted rust accents, expressive serif display type, plain sans body and mono metadata. Use asymmetric editorial spreads, large authentic project imagery and quiet ruled divisions. Keep the shell static and interactive elements progressively enhanced.

Case's narrative structure supports this direction. Nano is the alternative for a deliberately smaller, text-first portfolio, with less room for large engineering visuals. Astrofy adds UI and content structures that the brief does not need.

## Staged implementation outline

1. Confirm content identity and architecture direction; record the detailed design and implementation plan.
2. Adapt Case's static Astro/MDX architecture with a minimal compatible, locked dependency set and attribution.
3. Build fluid tokens, accessible navigation, theme handling, metadata and responsive shell.
4. Finish the homepage around verified project material before expanding the remaining routes.
5. Add project/writing schemas and reusable detail layouts; filter projects without hydrating static content.
6. Implement lab, about and contact with real content; show honest empty states where material is absent.
7. Add only useful interactions, keyboard support and reduced-motion treatment.
8. Test all routes at 375/768/1024/1440, review desktop/mobile screenshots, check assets/links/console, run type checks and production build, and measure Lighthouse.
9. Document Cloudflare static deployment and required site URL; deploy only to the intended destination.

No application code or browser validation exists yet. No performance score has been measured.
