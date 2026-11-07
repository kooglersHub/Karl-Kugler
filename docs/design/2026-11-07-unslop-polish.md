# Unslop polish — 2026-11-07

## Direction and approval

The user approved refining the existing look rather than a redesign. Product: Karl’s freelance portfolio for websites, technical work and events. Character: direct, practical, curious. World: existing forest green, cream and sand. Visual moments: the little detours concept image and actual HaptIQ viewer. Signature: quieter numbered service rows. Preserve section order, content, imagery and existing font families.

## Audit

- Global headings used weight 800, hero 900, with tightly packed lettering.
- Service numbers competed with the services at up to 96 px.
- Uppercase, tracked section labels and 9.6–10.7 px metadata reduced readability.
- Technical service descriptions used small monospace text.
- Strong sand rules competed with text on the forest background.
- The second project followed the first too closely on desktop.
- 850 ms entrances, 35 px scroll reveals, image zooms and moving buttons added unnecessary motion.

This was polish mode: the established palette, typography families, composition and project assets already had character.

## Passes

1. Spacing: added separation between desktop project spreads; service rows use consistent padding and aligned number columns; balanced hero spacing.
2. Color: retained all brand colors; forest dividers now use a quiet cream hairline, numbers keep sand as their accent.
3. Icons: retained the existing Tabler arrows; service arrows reduced to the common 24 px box.
4. Copy: converted section labels to normal German capitalization and shortened the extra-project label to “Mehr entdecken”. No new claims or personal facts.
5. Type: DM Sans 400/500 and IBM Plex Mono 400 remain; removed the unused 700/800/900 font imports. Headings use weight 500, metadata is at least 12 px, service descriptions use larger sans text, number columns use tabular figures.
6. Layout: preserved page structure, navigation and asymmetric project spreads. Verified hero text at all existing breakpoints.
7. Details: quieter numbering and rules clarify service hierarchy; increased lab legend readability with stacked mobile labels.
8. Visuals: retained existing authentic project media and concept-image attribution. No image generation or image prompt was needed.
9. Motion: entrances now 400 ms over 8 px with 50 ms hero stagger; hover feedback uses opacity/background/color over 180 ms. Removed project zoom and button movement; reduced-motion support remains.

## Verification

Local Windows / Node 24.22.1 / Microsoft Edge, production output:

- Astro check: 30 files, zero errors, warnings or hints.
- Astro build: passed, 12 pages built.
- Node test suite: 7/7 passed.
- Playwright: 13/13 passed; all routes at 375, 768, 1024 and 1440 px without overflow, failed assets or console errors; axe WCAG A/AA in both themes; keyboard filters, skip link, persistent theme, blocked storage, signal controls, no-JavaScript navigation, hero fit/enquiry links and reduced motion.
- Prettier and git whitespace checks run before commit.
- Full-page homepage screenshots inspected at 375 and 1440 px; desktop hierarchy and mobile wrapping match the approved polish direction. Screenshots are local, ignored test artifacts under `test-results/`.

An initial browser run inadvertently reused the development server, where Astro’s toolbar introduced extra h1 elements. That server was stopped and the complete suite rerun against production preview; no test assertions were weakened.

A separate read-only code reviewer found no concrete functional regressions or scope violations.

These checks cover the local production build. A hosted deployment was not inspected.

Methodology credit: Unslop by Damir Sokolovsky (https://heydamir.design/unslop), CC BY 4.0. The skill itself was not copied or modified.
