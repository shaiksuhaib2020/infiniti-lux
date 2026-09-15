Looking at the screenshot — the implementation broke badly. Cards are bleeding into each other, text from multiple cards is stacking simultaneously, the images are layering on top of each other with passport watermarks bleeding through, and two card counters are visible at once. The pinned scroll architecture clearly misfired. The right call is to scrap it entirely and go clean.

---

# TRAVEL PAGE — REVERT AND REDESIGN BRIEF
## Infiniti Luxe | Correction Instruction

---

## STEP 1 — REVERT COMPLETELY

The agent deletes the following files entirely. No salvaging:

```
components/travel/PinnedCards.jsx         ← Delete
components/travel/ServiceCard.jsx         ← Delete
components/travel/CardProgress.jsx        ← Delete
styles/modules/travel/PinnedCards.module.css  ← Delete
styles/modules/travel/ServiceCard.module.css  ← Delete
```

`TravelHero.jsx`, `TravelGrid.jsx`, and `TravelPageCTA.jsx` can be
kept or rebuilt — they were not the problem. The pinned scroll
system is the problem. It goes.

`app/travel/page.jsx` is rebuilt from scratch using the simple
structure below.

---

## STEP 2 — NEW PAGE STRUCTURE

Simple. Three sections.

```
1. Hero
2. Service Cards Grid
3. CTA
```

No pinning. No scroll-driven animation. No stacking cards.
No GSAP on the cards themselves — just clean CSS hover transitions.

---

## STEP 3 — SECTION 1: HERO

Reuse the existing `TravelHero.jsx` with one change to the copy:

- Heading: "Where Would You Like to Go?"
- Supporting line: "Explore our full range of travel services, each
  handled personally by our team."

Height: `44vh`. Same dark abyss background with dot grid texture.
Same GSAP entrance animation. Nothing else changes.

---

## STEP 4 — SECTION 2: SERVICE CARDS GRID

**Component:** `TravelCards.jsx`

**Background:** `--color-page` (`#EDE7D9`)

**Section padding:** `96px` top and bottom.

**Section header — centered:**

- Heading: "Our Services" — `--font-display`, `44px`, `--color-ink`,
  weight `400`
- Subtext: "From flights to full holidays — one team, one place." —
  `--font-body`, `16px`, `--color-stone`, margin-top `12px`
- `48px` gap below the header before the grid

**Grid:**

- `3` columns on desktop, `2` on tablet, `1` on mobile
- `24px` gap between cards
- All 6 service cards in one grid — no rows split or reordered

---

**Each card anatomy:**

Container:
- Background: `#FFFFFF`
- Border: `1px solid --color-border`
- Border-radius: `--radius-card` (`12px`)
- `overflow: hidden`
- `--shadow-card`
- Cursor: pointer — entire card is a link

**Image portion — top `58%` of card height:**
- Fixed card height: `420px` on desktop, `380px` on tablet
- Image fills the top `58%`: `height: 242px`, `width: 100%`,
  `object-fit: cover`, `object-position: center`
- `overflow: hidden` on the image wrapper — needed for the hover zoom
- On hover: image scales to `1.04` over `0.5s ease`. Smooth, slow,
  not snappy. This is the only movement on the card.

**Content portion — bottom `42%` of card height:**
- Background: `#FFFFFF`
- Padding: `24px 28px`
- Flex column, space-between

Top of content area:
- Service name: `--font-display`, `26px`, `--color-ink`, weight `400`
- Description: `--font-body`, `14px`, `--color-stone`, line-height `1.6`,
  margin-top `8px`. One sentence only. Specified per card below.

Bottom of content area (pushed to bottom via `margin-top: auto`):
- A thin `1px` divider in `--color-border`, full width,
  `margin-bottom: 16px`
- CTA text: `--font-body`, `13px`, weight `600`, `--color-gold`.
  On hover: `--color-ink`. Smooth `0.15s` transition.

**On hover (card level):**
- `box-shadow: --shadow-card-hover`
- `transform: translateY(-4px)`
- Smooth `0.25s ease` on both

The entire card is wrapped in a Next.js `<Link>` — not just the CTA.

---

**The 6 cards:**

| # | Service | Description | CTA | Route | Image |
|---|---|---|---|---|---|
| 1 | Flights | Economy, business or first class — we find the routes and handle the booking. | Find flights | `/travel/flights` | `flights.webp` |
| 2 | Hotels | Handpicked hotels from boutique city stays to five-star resort escapes. | Find a hotel | `/travel/hotels` | `hotel.webp` |
| 3 | Holiday Packages | Complete holidays, thoughtfully arranged — flights, hotels and transfers in one place. | Explore holidays | `/travel/holidays` | `Holiday_packages.webp` |
| 4 | Tours & Experiences | Curated tours and local experiences that go beyond standard itineraries. | Explore experiences | `/travel/tours` | `tours_card.webp` |
| 5 | Honeymoons | Romantic escapes designed around the couple, not around a package. | Plan a honeymoon | `/travel/honeymoons` | Unsplash placeholder: `honeymoon,resort,luxury` |
| 6 | Cruises | Wake up somewhere new every day — cruise packages across the world's finest routes. | Explore cruises | `/travel/cruises` | `cruise_1.webp` |

---

**ScrollTrigger on the grid — minimal:**

One ScrollTrigger on the grid container. When it enters the viewport:

```
Cards stagger in:
  from: { opacity: 0, y: 24 }
  to:   { opacity: 1, y: 0 }
  duration: 0.55s
  ease: power2.out
  stagger: 0.08s per card
```

That is the only GSAP on this section. No scrub, no pinning,
no per-card scroll triggers. One entrance, done.

---

## STEP 5 — SECTION 3: CTA

Keep the existing `TravelPageCTA.jsx` unchanged. It was not broken.

---

## STEP 6 — WHAT THE AGENT DELIVERS

1. Deleted: `PinnedCards.jsx`, `ServiceCard.jsx`, `CardProgress.jsx`
   and their CSS modules
2. Rebuilt: `app/travel/page.jsx` — three sections, clean imports
3. New: `TravelCards.jsx` — 3-column card grid, 6 cards, CSS hover
   only, one ScrollTrigger entrance stagger
4. Kept: `TravelHero.jsx` (copy updated), `TravelPageCTA.jsx`
5. No GSAP scrubbing anywhere on this page
6. No sticky containers, no z-index stacking, no absolute positioning
   of cards on top of each other

The page should look exactly like a premium travel company's services
overview page — the kind you'd expect from a well-executed agency site.
Clean grid, beautiful photography, generous whitespace, readable text.
Nothing surprising. Nothing broken.