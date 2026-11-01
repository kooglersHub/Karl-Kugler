# Design audit and revised brief

Date: 2026-11-01. Evidence captured fresh in the in-app browser. Scores are subjective design judgments, not measured usability results.

## Verdict

| Dimension                              | Rating | Reason                                                                                                                                                                                     |
| -------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Attractive and visually coherent       | 7/10   | Good spacing, quiet palette and readable long-form layouts. The composition is controlled but repetitive.                                                                                  |
| Distinctive                            | 4/10   | Giant italic serif headings, muted paper/rust colors, numbered labels, asterisks and arrows are familiar portfolio devices. They do not establish a recognizable Karl-specific identity.   |
| Representative of Karl                 | 3/10   | The engineering work is present; freelance services, Karlsruhe, languages, trade-fair/host work and little detours are absent. The About monogram substitutes for a more personal account. |
| Useful for winning freelance enquiries | 2/10   | There is no service menu or explanation of the work someone can commission. Contact is functional but framed as a casual project conversation.                                             |

## Audited journey

1. **Homepage — visually coherent, weak positioning.** Hero spends most of the first screen on an abstract slogan. Real project media arrives later. No statement that Karl can be hired. Strongest material is the HaptIQ screenshot; the conceptual EvoLab artwork is weaker proof.
2. **About — readable, insufficiently personal.** Repeats engineering themes without showing region, working languages or the breadth of the offer. Large decorative `k.` block provides little useful information. Existing professional history was not supplied and must not be invented.
3. **Contact — usable, weak commissioning context.** Email and profiles are easy to find. The page does not explain whether the visitor can enquire about a website, technical work, a trade fair, or host duties. Introduce explicit enquiry paths and relevant briefing prompts without a pretend backend.
4. **Mobile homepage — functional, long and repetitive.** Content reflows at 375px. Identical heading treatments and extended whitespace create a long sequence before the contact CTA. Small metadata and understated links need another accessibility review in the redesigned shell.

## Captured evidence

Local files under `.tools/redesign-audit/` (not production assets):

- `01-home-desktop.jpg`: full homepage at desktop audit size; skip link is visible because the preceding navigation focused the main anchor.
- `02-about-desktop.jpg`: full About page.
- `03-contact-desktop.jpg`: full Contact page.
- `04-home-mobile.jpg`: full homepage at 375px.

These captures support layout and content findings, not a claim of full accessibility compliance. This audit did not repeat performance measurements or screen-reader testing.

## Reference research

- [Dennis Snellenberg](https://www.dennissnellenberg.com/): inspected the live homepage. Clear freelance role, a human presence and obvious work/contact paths. Reuse the clarity and confidence, not his portrait, layout, motion or copy. No portrait of Karl has been supplied.
- [Rauno Freiberg](https://raunofreiberg.com/): inspected the live homepage and viewport capture. Graphic confidence and a project-driven identity make the person recognizable. Borrow the principle of showing a specific practice rather than piling on generic claims; do not copy the yellow-circle graphic or horizontal navigation model.
- [little detours](https://little-detours.de/): inspected Karl's live site and local project material. The site is publicly reachable but explicitly remains a shop/design preview with no sales. Link to it as Karl's own creative project, not an operating shop with proven product quality. Existing images are AI concept visualizations, not photographs of manufactured products.
- Bruno Simon was researched, but the browser capture remained in a loading/intro state. It is not used as a fully inspected visual reference.

## Confirmed revised brief

- Entire website in **German**.
- **Karl Kugler, Freelancer aus Karlsruhe**.
- Offer: websites and software, electronics/technical support, plus trade-fair and event-host work. The user welcomes all these categories; do not invent qualifications, past assignments, rates, booking capacity or specific professional experience.
- Languages: **Deutsch als Muttersprache; fließendes Englisch**.
- Preserve real engineering case studies, lab and writing; translate the visible content and make their place in the freelance offer clear.
- Give **little detours** an unmistakable home-page presentation and project entry linking to `https://little-detours.de/`.
- Make a prospective client's next step clear: what can be commissioned, and how to send an enquiry.
- Replace the recurring italic-serif portfolio look with a distinct identity grounded in Karl's actual projects, products and mix of digital/in-person work.
- Keep the existing Astro/MDX architecture, accessibility, static performance and Cloudflare compatibility.

## Visual exploration

Develop three independent homepage concepts before implementation: a graphic workshop index, a dark technical/creative portfolio, and an expressive personal freelancer editorial. All use German copy, real project references and visible freelance positioning. No invented portrait, client logos, testimonials, commercial results or fake event photographs.
