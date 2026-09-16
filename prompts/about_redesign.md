# ABOUT PAGE — TARGETED REDESIGN BRIEF
## Infiniti Luxe | Agent Instruction Document
## Fixes visible failures + missing sections from Turn 4

---

## PART 0 — DIAGNOSIS: WHAT IS BROKEN

Do not rebuild the entire page. Fix exactly what is wrong,
then build the two sections that were never created.

**Six specific problems to fix:**

1. Unstyled link text in the Manifesto paragraphs — words rendered
   in blue and red because `<a>` tags inside paragraphs have no
   style override. Fix: add a global rule and a component-level
   rule that removes color from inline links inside body copy.

2. "What We Offer" section has no visual presence — seven tiny
   text labels. Rebuild this section entirely with icon cards.

3. "What We Stand For" value headings are colored blue/teal —
   same unstyled link issue as problem 1, or incorrect class
   applied. Fix: all value headings must be `--color-ink`.

4. No photography on the page — add one full-width cinematic
   image break between the Manifesto and What We Offer sections.

5. "Based in Dubai" dark section — never built. Build it now
   exactly as specified below.

6. About page CTA section — never built. Build it now.

---

## PART 1 — FIX: HYPERLINK COLOR IN BODY TEXT

Add to `globals.css`:

```css
/* Remove link color from all body copy paragraphs site-wide */
p a,
p a:visited,
p a:hover {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: rgba(197, 151, 58, 0.5);
}
```

Additionally, in the Manifesto component specifically — if any
word is accidentally wrapped in an `<a>` tag that should not be
a link, remove that tag entirely. The manifesto copy from the
requirements document contains no links. All words should be
plain text. The agent audits every paragraph node in
`Manifesto.jsx` and removes any `<a>`, `<mark>`, `<span
style="color:...">` or similar elements that are applying color
to individual words.

---

## PART 2 — FIX: MANIFESTO SECTION TYPOGRAPHY

The Manifesto section is structurally correct but needs one
visual addition to stop it reading as a plain blog post.

**Add a large decorative quotation mark:**

Position: absolute, top-left of the manifesto section container.
A large `"` character — `--font-display`, `280px`, weight `300`,
`--color-gold` at `6%` opacity. Pointer events none. Z-index 0.
All text content sits above it at z-index 1.

This is a subtle background element that the eye registers
subconsciously as editorial. At 6% opacity it does not compete
with the text — it adds depth to what is otherwise a flat
sand surface.

**Increase the opening large line size:**

The opening statement "We believe travel is more than reaching
a destination." should be `--font-display`, `44px` (up from
`40px`), centered, `--color-ink`, weight `400`.

**Confirm the closing italic line is actually italic:**

"Your destination is out there. Let us help you get there."
must have `font-style: italic` applied. If it is currently
rendering as roman (upright), add the style explicitly.
Cormorant Garamond has a genuine italic cut — it should look
distinctly different from the upright weight.

---

## PART 3 — ADD: CINEMATIC IMAGE BREAK

**New component:** `AboutImageBreak.jsx`

Sits between the Manifesto section and the "What We Offer"
section in `app/about/page.jsx`.

This is a simple full-width photographic section. No text.
No overlay. Just a cinematic image. It exists to break the
all-text nature of the upper page and remind the visitor
that this is a travel company.

Specs:
- Height: `480px` on desktop, `320px` on tablet, `260px` on mobile
- Width: `100%` — full bleed to the viewport edge, not contained
  within `--page-max-width`
- Image: Unsplash, cinematic aerial travel photography.
  Use this specific URL:
  `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85`
  (aerial view of clouds from an airplane window — travel without
  naming a destination, universally evocative)
- `object-fit: cover`, `object-position: center`
- No gradient overlay. The image speaks alone.
- `loading: lazy`, `decoding: async`

**Subtle parallax on scroll:**

A single GSAP ScrollTrigger on the image element:
```
scrollTrigger: {
  trigger: sectionRef,
  start: 'top bottom',
  end: 'bottom top',
  scrub: true
}
tween: gsap.to(imageRef, { yPercent: -15, ease: 'none' })
```

`yPercent: -15` over the full scroll range gives gentle
parallax without the image edge being visible. The image
wrapper has `overflow: hidden`.

This is the only parallax animation added to the About page.

---

## PART 4 — REBUILD: WHAT WE OFFER

Delete the current horizontal text strip. Replace entirely.

**Component:** `WhatWeDo.jsx` — rebuilt from scratch.

**Background:** `--color-ice` (`#E4DDD0`)

**Section padding:** `96px` top and bottom

**Section header — left aligned:**
- Heading: "What We Offer" — `--font-display`, `44px`,
  `--color-ink`, weight `400`
- Subtext: "One team for every part of your journey." —
  `--font-body`, `16px`, `--color-stone`, margin-top `12px`

**40px gap below the header.**

**Service grid — 4 columns desktop, 2 tablet, 1 mobile:**

7 cards total. The grid naturally flows as 4 + 3. The 3 in
the second row can be centered using `justify-content: center`
on the grid or by giving the second row a `grid-column` span
to center the 3 items.

**Each card:**
- Background: `#FFFFFF`
- Border: `1px solid --color-border`
- Border-radius: `--radius-card` (`12px`)
- Padding: `28px`
- `--shadow-card`
- Height: auto — let content determine height
- The entire card is a `<Link>` to the service route

**Card inner structure (top to bottom):**

1. **Icon container:** `48px × 48px`, background `rgba(197,151,58,0.10)`,
   border-radius `10px`, display flex, align-items center,
   justify-content center. Margin-bottom `20px`.
   Inside: Lucide icon, `22px`, `--color-gold`.

2. **Service name:** `--font-display`, `24px`, `--color-ink`,
   weight `400`, line-height `1.2`. Margin-bottom `8px`.

3. **Descriptor:** `--font-body`, `14px`, `--color-stone`,
   line-height `1.55`. One line only.

4. **Bottom row** — margin-top `auto`, padding-top `20px`:
   A `1px solid --color-border` top border above a link text:
   `--font-body`, `13px`, weight `600`, `--color-gold`.
   On hover: color transitions to `--color-ink`, `0.15s ease`.

**On hover (full card):**
- `transform: translateY(-4px)`
- `box-shadow: --shadow-card-hover`
- `border-color: rgba(197,151,58,0.35)`
- Smooth `0.25s ease`

**The 7 service cards:**

| Icon (Lucide) | Service | Descriptor | CTA | Route |
|---|---|---|---|---|
| `Plane` | Flights | Getting you there | Explore flights | `/travel/flights` |
| `Hotel` | Hotels | Where you stay | Find a hotel | `/travel/hotels` |
| `Globe` | Holidays | Complete packages | Explore holidays | `/travel/holidays` |
| `FileText` | Visa Services | Document assistance | Check visa options | `/visa-services` |
| `Map` | Tours | Local experiences | Explore experiences | `/travel/tours` |
| `Anchor` | Cruises | The world by sea | Explore cruises | `/travel/cruises` |
| `Briefcase` | Corporate | Business travel | Business enquiry | `/corporate-travel` |

**ScrollTrigger reveal:**
Cards stagger in at `0.08s` per card as the section enters the
viewport. `y: 24 → 0`, `opacity: 0 → 1`, `duration: 0.5s`,
`ease: power2.out`. One entrance, no scrub.

---

## PART 5 — FIX: WHAT WE STAND FOR

No structural rebuild needed. Two targeted fixes only.

**Fix 1 — Value headings color:**

In `OurValues.jsx`, the three value name elements ("Personal
Service", "Complete Honesty", "One Team, One Trip") must use
`color: var(--color-ink)`. If they are currently inheriting
a link color or have an explicit color applied that is not
`--color-ink`, override it. No blue. No teal. Ink only.

**Fix 2 — Add vertical spacing:**

Between the value name and the value body paragraph, add
`margin-top: 32px` (not `12px` as it may currently be). The
Turn 4 brief specified "more vertical space than feels normal"
between the title and body. This breathing room is what makes
the values feel premium rather than cramped.

**Fix 3 — Subtle separator between values on desktop:**

Between the three columns, add a `1px solid --color-border`
vertical divider. Use CSS grid column gap with a pseudo-element
divider, or use `border-right: 1px solid var(--color-border)`
on the first two columns (`not(:last-child)`). This separates
the three values visually without boxing them.

---

## PART 6 — BUILD: BASED IN DUBAI SECTION

This section was specified in Turn 4 but never built.
Add it after `OurValues` and before `AboutCTA` in
`app/about/page.jsx`.

**Component:** `DubaiPresence.jsx`

**Background:** `--color-abyss` (`#07111C`)

**Section padding:** `96px` top and bottom

**Layout:** Two columns, `50% / 50%`, `64px` gap on desktop.
Stacked (left above right) on mobile.

---

**Left column:**

Label — `--font-body`, `12px`, `--color-gold`, weight `500`,
letter-spacing `0.05em`: "Where we are"

Heading — `--font-display`, `44px`, white, weight `400`,
line-height `1.15`, margin-top `16px`:
"Based in Dubai. Travelling the World."

Body paragraph 1 — `--font-body`, `16px`, white at `70%`
opacity, line-height `1.75`, max-width `440px`, margin-top `20px`:
"Dubai sits at the intersection of East and West — one of the
world's great hubs for international travel. It is where we
are, and it is the best possible base from which to help
people travel everywhere else."

Body paragraph 2 — same styling, margin-top `16px`:
"From here, we arrange travel across Europe, Asia, the Americas,
Africa, the Middle East and the Pacific. Wherever you want to
go, we know the routes."

Contact rows — `margin-top: 40px`. Three rows, `20px` gap.
Each row: Lucide icon (`--color-gold`, `18px`) + detail text
(`--font-body`, `15px`, white at `85%` opacity).
On hover of clickable rows: text becomes `--color-gold`,
`0.2s` transition.

| Icon | Text | Link |
|---|---|---|
| `Phone` | +971 58 210 9797 | `tel:+971582109797` |
| `Mail` | infinitiempire0007@gmail.com | `mailto:infinitiempire0007@gmail.com` |
| `MapPin` | Dubai, UAE | No link |

---

**Right column:**

A dark card. Background: `--color-deep-navy` (`#0D2035`).
Border-radius: `--radius-large` (`24px`). Padding: `40px 36px`.
Border: `1px solid --color-border-dark`.

Contains 3 geographic scope stats. These are factual scope
statements, not invented performance metrics.

Each stat:
- Value: `--font-display`, `48px`, `--color-gold`, weight `300`
- Label: `--font-body`, `13px`, white at `55%` opacity, weight `400`
- `48px` gap between stats
- `1px solid --color-border-dark` horizontal separator between each
  stat (not after the last one)

| Value | Label |
|---|---|
| 14+ | Destinations we package regularly |
| Worldwide | Flight routes we book |
| 7 days | Available to assist |

**ScrollTrigger:**
Left column: `opacity 0 → 1`, `y 20 → 0`, `duration 0.7s`,
`ease power2.out`.
Right column: same animation, `delay 0.15s` after left column
starts. Not scrubbed — simple play-once on enter.

---

## PART 7 — BUILD: ABOUT PAGE CTA

This section was specified in Turn 4 but never built.
Add it as the final section in `app/about/page.jsx`,
directly before the shared `<Footer />`.

**Component:** `AboutCTA.jsx`

**Background:** `--color-deep-navy` (`#0D2035`)

**Section padding:** `96px` top and bottom

**Content — centered, max-width `600px`:**

1. Heading — `--font-display`, `52px`, white, weight `300`,
   line-height `1.1`:
   "Ready to Plan Your Next Journey?"

2. Supporting line — `--font-body`, `17px`, white at `70%`
   opacity, line-height `1.6`, margin-top `16px`:
   "Whether it's a family holiday, a honeymoon, a business trip
   or something still taking shape — talk to us. We'll help you
   figure it out."

3. Two buttons — centered, `16px` gap, margin-top `40px`:

   Primary: Background `--color-whatsapp` (`#25D366`), white
   text, weight `600`, padding `14px 28px`,
   radius `--radius-button` (`6px`).
   Text: "Start on WhatsApp"
   Link: `https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20would%20like%20help%20planning%20my%20trip.`

   Secondary: Transparent, `1px solid rgba(255,255,255,0.35)`,
   white text, same padding and radius.
   Text: "View Our Services"
   Route: `/travel`

4. Reassurance line — `--font-body`, `13px`, white at `38%`
   opacity, centered, margin-top `24px`:
   "No pressure, no commitment. Just a real conversation about
   your travel plans."

**ScrollTrigger:** Single fade-in for the full content block.
`opacity 0 → 1`, `y 20 → 0`, `duration 0.6s`, `ease power2.out`.
No stagger.

---

## PART 8 — UPDATED PAGE COMPONENT ORDER

`app/about/page.jsx` must import and render sections in this
exact order:

```jsx
<AboutHero />
<Manifesto />         {/* existing — with fixes from Part 2 */}
<AboutImageBreak />   {/* NEW — cinematic photo break */}
<WhatWeDo />          {/* REBUILT — icon card grid */}
<OurValues />         {/* existing — with fixes from Part 5 */}
<DubaiPresence />     {/* NEW — dark two-column contact section */}
<AboutCTA />          {/* NEW — dark closing CTA */}
```

---

## PART 9 — FINAL COLOR RHYTHM CHECK

After all changes, the page background sequence top to bottom
should be:

| Section | Background |
|---|---|
| About Hero | `--color-abyss` (dark) |
| Manifesto | `--color-page` `#EDE7D9` (warm sand) |
| Image Break | Full-bleed image — no background color |
| What We Offer | `--color-ice` `#E4DDD0` (deeper sand) |
| What We Stand For | `--color-page` `#EDE7D9` (warm sand) |
| Based in Dubai | `--color-abyss` (dark) |
| About CTA | `--color-deep-navy` (dark) |

Dark → Sand → Image → Deeper Sand → Sand → Dark → Dark.

This rhythm means the page has genuine visual contrast and
movement as the user scrolls — not a monotonous single colour
from top to bottom.

---

## SUMMARY — WHAT THE AGENT CHANGES

**Fixes (targeted, surgical):**
- [ ] Remove link color from all body copy paragraphs globally
- [ ] Audit and clean all `<a>` / colored spans in `Manifesto.jsx`
- [ ] Large decorative `"` added to Manifesto background
- [ ] Closing italic line confirmed as `font-style: italic`
- [ ] Value headings in `OurValues.jsx` set to `--color-ink`
- [ ] Vertical spacing between value name and body increased to `32px`
- [ ] Subtle column dividers added between the three values

**Rebuilds (full replacement):**
- [ ] `WhatWeDo.jsx` rebuilt as a 4-column icon card grid

**New builds:**
- [ ] `AboutImageBreak.jsx` — full-bleed cinematic photo with parallax
- [ ] `DubaiPresence.jsx` — dark two-column section with contact + stats
- [ ] `AboutCTA.jsx` — dark closing CTA with WhatsApp + services buttons

**Page structure:**
- [ ] `app/about/page.jsx` updated with correct import order