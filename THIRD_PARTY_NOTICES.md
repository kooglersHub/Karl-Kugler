# Sources, attribution and licenses

## Case architecture

This site adapts the static Astro + MDX + sitemap architecture and typed glob-loaded Content Collections from [Case](https://github.com/erlandv/case), copyright © 2025 Erland, MIT. The full upstream MIT notice is preserved in `LICENSE`. The schemas were simplified and extended for this portfolio; no template biographies, testimonials or sample project outcomes are used.

[Astro Nano](https://github.com/markhorn-dev/astro-nano) and [Astrofy](https://github.com/manuelernestog/astrofy) were researched as alternatives. Both are MIT-licensed. No source code or assets from those two themes are copied here.

## Project media and evidence

- `src/assets/haptiq-viewer.png`: screenshot from Karl's [HaptIQ Hand repository](https://github.com/kooglersHub/haptiq-hand/blob/main/docs/images/viewer.png), reused for his portfolio at his request. It depicts synthetic test data and a provisional sensor placement. The screenshot contains upstream hand geometry; attribution is retained through the project case study and [upstream material notices](https://github.com/kooglersHub/haptiq-hand/blob/main/THIRD_PARTY_NOTICES.md). Those notices record owner-confirmed redistribution permission without assigning a blanket license to CAD assets. This website does not redistribute the underlying meshes, CAD files or hardware manual.
- HaptIQ case-study facts follow the current repository README and its explicit limitations. Application lineage: [rht2001/haptiq](https://github.com/rht2001/haptiq). Hand geometry provenance: [AlexArutiunian/tactile-rh56dftp](https://github.com/AlexArutiunian/tactile-rh56dftp).
- EvoLab summary follows Karl's connected private repository README, used with his instruction to draw on his projects. No private source code, datasets or assets are included. `LifeDiagram.astro` is an original conceptual SVG illustration, not a recorded experiment or application screenshot.
- The lab's signal plot is original SVG/code and explicitly educational. It represents no actual hardware data.
- The two articles are newly drafted technical notes, grounded in project documentation and this implementation. They are not copied published articles or invented experimental reports.

## Fonts

Self-hosted Fontsource packages: **Instrument Serif**, **DM Sans**, **IBM Plex Mono**. Each package reports **SIL Open Font License 1.1**. Their license files are included with installed dependencies. The corresponding font notice is also shipped in `public/font-licenses.txt`.

## Dependencies and component choices

Astro, official MDX/sitemap/Markdown integrations, Tailwind CSS, Sharp, Prettier and its Astro plugin report MIT. TypeScript and Playwright report Apache-2.0. The axe Playwright integration reports MPL-2.0 and is development-only. Exact versions and transitive dependencies are in `package-lock.json`; upstream package notices remain authoritative.

shadcn/ui, Magic UI, React Bits, Aceternity UI and 21st.dev were not imported. The requested navigation, filter controls, theme switch and signal diagram do not require their React/component dependencies. Native HTML/CSS/TypeScript provides a smaller accessibility and maintenance surface. No Motion, GSAP, Lenis, Three.js or React islands are needed for the implemented interactions.

## Identity

GitHub login, name and contact email were obtained from the authenticated connection. LinkedIn `/in/karl-kugler` was supplied directly by Karl. No biography from similarly named search results is used.
