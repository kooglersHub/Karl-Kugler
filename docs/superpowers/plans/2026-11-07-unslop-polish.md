# Portfolio polish implementation plan

**Goal:** Apply the approved unslop polish to the existing forest, cream and sand design.

**Scope:** Keep the existing sections, project images, fonts, colors, routes and functionality. Make headings lighter, metadata readable, service numbers quieter and animations shorter. Approval: user selected “Ja, bestehenden Look verfeinern”.

- [x] Refine shared spacing, font weights, metadata sizes and service row hierarchy in `src/styles/global.css`.
- [x] Change uppercase section labels to normal German capitalization; load only used font weights in `src/layouts/BaseLayout.astro`.
- [x] Shorten entrances to 400 ms / 8 px and hover effects to 180 ms; preserve reduced-motion support.
- [x] Build, run existing unit/content and browser/accessibility checks, inspect desktop/mobile screenshots, and check formatting.
- [x] Record results and obtain independent review. Deliver by committing/pushing to main as requested by the project instructions.

No new functionality or dependencies; existing browser checks cover breakpoints, themes, keyboard, enquiries and reduced motion. Visual changes are verified through before/after screenshots rather than tests that duplicate CSS values.

Unslop methodology: Damir Sokolovsky, https://heydamir.design/unslop, CC BY 4.0.
