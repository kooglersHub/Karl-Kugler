# Karl Kugler — engineering field journal

## Intent and authorization

Build the multi-page personal engineering portfolio described in the supplied brief. The user selected Case ("mach case") and supplied LinkedIn `/in/karl-kugler`. Proceed with the requested implementation in this checkout.

## Approaches

Selected: Case's static Astro architecture, glob-loaded typed MDX collections and separate case-study/article layouts, with a completely new visual shell. Nano would reduce setup but constrain visual storytelling; Astrofy brings unnecessary DaisyUI and store structures. Preserve Case's MIT attribution. No sample testimonials or invented career claims.

## Visual system

English editorial copy matches the original brief; public identity is Karl Kugler. Warm paper #f3f0e8, ink #252820, rust #89472f and muted olive #596447. Instrument Serif display, DM Sans text and IBM Plex Mono metadata, self-hosted under OFL. Fluid typography and spacing, a 1440px maximum container, asymmetric 12-column spreads, hairline dividers and original typographic/diagram artwork. Authentic screenshots retain attribution and honest captions. Dark mode uses the same hierarchy with warm charcoal backgrounds.

Homepage: quiet navigation, an oversized two-line heading, concise introduction, feature spread for HaptIQ, complementary EvoLab preview, writing list, interests and contact. Project index: category filters and alternating compositions. Detail pages: context, implementation, decisions, limitations and media. Lab: an explicitly educational interactive signal-sampling experiment, not a claim about physical hardware. Writing: original technical notes based on the implemented architecture and documented project distinctions. About: verified interests and projects only; no invented experience/CV. Contact: direct email and supplied/verified profiles. Missing biography/CV are omitted rather than filled with fictional text.

## Architecture and content

Static Astro + TypeScript, MDX, Tailwind Vite plugin and custom tokens. The initial Astro 5/MDX 4 compatibility choice was superseded after npm audit found security advisories: use Astro 7.4.4, MDX 8.1.2, Sharp 0.35.5 and Zod 4 through `astro/zod`. TypeScript stays at 5.9.3 to satisfy Astro check's peer range. Lock exact installed versions. No backend, paid services, React, scroll hijacking or animation runtime needed. Cloudflare Pages serves `dist`.

Collections: projects (slug, title, description, category, technologies, year, status, featuredOrder, cover, gallery, demo/repo/external links) and writing (slug, title, description, date, tags). Use Astro image metadata for responsive local raster assets; original SVG diagrams for explanatory illustrations. Rich MDX remains available for future galleries/videos/embeds. Private repository summaries are authorized by the user's request to use their projects; don't expose private code, datasets or pretend repository links are public.

## Accessibility, motion and SEO

Semantic landmarks, skip link, visible focus, native links/buttons, keyboard-operable mobile navigation and filters, readable contrast, reduced-motion handling, bounded native range inputs. Static content stays usable without JavaScript. Theme is progressive enhancement. Canonicals/sitemap require an actual SITE_URL, never a fabricated deployment domain; mark unconfigured preview builds noindex. No automatic external requests for fonts, telemetry or avatars.

## Validation and delivery

Automate built-page integrity and browser checks. Review every route at 375, 768, 1024 and 1440; save desktop/mobile screenshots, check overflow, assets, console, category filtering, theme, contact links, reduced motion and keyboard access. Run Astro check, production build, formatter and accessibility scanning. Measure Lighthouse if tooling is available, and report measured scores only. Keep missing personal biography, CV, deployment domain and any asset rights uncertainty explicit in documentation.
