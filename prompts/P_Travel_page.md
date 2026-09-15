# TRAVEL PAGE — PREMIUM SCROLL CARD EXPERIENCE
## Infiniti Luxe | Agent Instruction Document
##

---

## PART 0 — CONTEXT AND SCOPE

The `/travel` route currently has no page — clicking Travel in the PillNav
only opens a dropdown to sub-pages. This brief creates a full
`app/travel/page.jsx` that serves as the Travel landing page.

The primary feature is a **pinned scroll card experience** — six full-viewport
service cards that transition sequentially as the user scrolls. This is the
only place on the site this interaction exists. It is not replicated on
any other page.

**The objective is not animation for its own sake.** The objective is
to make a visitor who lands on `/travel` feel that each service Infiniti
Luxe offers deserves individual, considered attention — not a grid to
scan and dismiss. One service at a time. Full visual focus. Premium.

**Files to create this turn:**

```
app/travel/page.jsx                         ← Page entry (server component)
components/travel/TravelHero.jsx            ← Minimal intro hero
components/travel/PinnedCards.jsx           ← Main scroll feature (client)
components/travel/ServiceCard.jsx           ← Individual card (client)
components/travel/CardProgress.jsx          ← Right-side progress indicator
components/travel/TravelGrid.jsx            ← Post-scroll quick-link grid
components/travel/TravelPageCTA.jsx         ← Closing CTA
styles/modules/travel/PinnedCards.module.css
styles/modules/travel/ServiceCard.module.css
```

---

## PART 1 — PAGE STRUCTURE

```
1. Travel Hero          (50vh — sets the scene, not dominant)
2. Pinned Cards         (600vh total scroll height — the main feature)
3. Services Quick Grid  (below the scroll — navigation aid)
4. Page CTA             (closing conversion moment)
```

Shared Navbar and Footer are inherited from `layout.jsx`.

---

## PART 2 — SECTION 1: TRAVEL HERO

**Component:** `TravelHero.jsx`

**Height:** `50vh`

**Background:** `--color-abyss` (`#07111C`). Same dot grid SVG texture used
on the About page hero — white circles, 3% opacity, 20×20px repeating unit.
No photography. The pinned cards section immediately below is pure
photography — the hero being text-only creates deliberate contrast.

**Content — vertically centered, left-aligned within `--page-max-width`:**

1. Heading — `--font-display`, `64px` desktop / `44px` tablet / `36px`
   mobile. White. Weight `300`. Line-height `1.08`. Letter-spacing `-0.025em`.
   Text: "Our Services."
   The period is intentional — it reads as a confident statement, not a
   question or a prompt. One word plus a period. Let it sit.

2. Supporting line — `--font-body`, `17px`, white at `65%` opacity,
   line-height `1.65`, margin-top `20px`, max-width `480px`.
   Text: "Scroll through what we offer. Every service, handled personally."

3. A small scroll prompt — centered-bottom of the hero, `24px` above the
   base. A thin `1px` vertical line (`48px` height, white at `25%` opacity)
   above a label: "Scroll to explore" — `--font-body`, `11px`, white at
   `35%` opacity, letter-spacing `0.08em`. No arrow.
   This is purely visual — it does not need to be a click target.

**GSAP entrance:** Heading fades in and rises `20px` over `0.8s`,
`power2.out`. Supporting line follows at `0.2s` delay. The scroll prompt
fades in at `0.5s` delay at `50%` opacity and pulses gently
(`opacity 0.5 → 0.25 → 0.5`) on a `2.5s` infinite loop — slow, barely
noticeable, not distracting.

---

## PART 3 — SECTION 2: PINNED CARDS (THE MAIN FEATURE)

**Component:** `PinnedCards.jsx` — must be `'use client'`

---

### 3.1 — Layout Architecture

**Outer wrapper** (`div.pinned-outer`):
- `position: relative`
- Height: `700vh` — this is the scroll distance. `700vh` gives each of
  the 6 cards approximately one viewport of dedicated scroll time, with
  the first card already visible on entry. Adjust to `650vh` if testing
  reveals transitions feel too slow.

**Inner pinned container** (`div.pinned-inner`):
- `position: sticky`
- `top: 0`
- `height: 100vh`
- `overflow: hidden`
- `width: 100%`
- This container is what stays fixed while the outer wrapper scrolls.
  All cards live inside it.

**Cards container** (`div.cards-stack`):
- `position: absolute`
- `inset: 0`
- Contains all 6 `ServiceCard` components, each `position: absolute`,
  `inset: 0`, `width: 100%`, `height: 100%`.

Cards are layered by z-index. Card 1 has the highest z-index initially.
As the scroll progresses, GSAP manages which card is visually on top via
`zIndex` property. The agent sets initial z-indices as:
`card-1: 6, card-2: 5, card-3: 4, card-4: 3, card-5: 2, card-6: 1`.

---

### 3.2 — Card Anatomy (Each `ServiceCard`)

Each card fills the full pinned container. Structure from back to front:

**Layer 1 — Image wrapper** (`div.card-image-wrap`):
- `position: absolute`, `inset: 0`
- `overflow: hidden` — required to contain the parallax image without
  it spilling outside the card boundary
- Contains a single `<img>` or `<div>` background

**Layer 2 — Image** (`img.card-image`):
- `position: absolute`
- `inset: -10% 0` — the image is intentionally taller than its container
  (120% height) to provide parallax headroom. This is essential. Without
  this extra height, parallax movement will reveal the edge of the image.
- `width: 100%`, `height: 120%`
- `object-fit: cover`
- `object-position: center`
- `will-change: transform` — tells the browser to prepare for GPU
  compositing on this element

**Layer 3 — Gradient overlay** (`div.card-overlay`):
- `position: absolute`, `inset: 0`
- `background: linear-gradient(
    to right,
    rgba(7, 17, 28, 0.82) 0%,
    rgba(7, 17, 28, 0.55) 45%,
    rgba(7, 17, 28, 0.20) 100%
  )`
- Additionally: a bottom gradient for text legibility on mobile:
  `linear-gradient(to top, rgba(7,17,28,0.70) 0%, transparent 40%)`
- On desktop only the horizontal gradient is needed. The agent uses a
  `@media` query to apply/remove the bottom gradient.
- `pointer-events: none`

**Layer 4 — Content panel** (`div.card-content`):
- `position: absolute`
- `left: 80px` (desktop) / `24px` (mobile)
- `bottom: 80px` (desktop) / `40px` (mobile)
- `max-width: 560px`
- `z-index: 2`

Content panel inner structure (top to bottom):

1. **Card counter** — `--font-body`, `12px`, `--color-gold`, weight `500`,
   letter-spacing `0.1em`. Format: `"01 / 06"`, `"02 / 06"` etc. This is
   not a decorative number — it tells the user how many services exist and
   where they are in the sequence. Functional, not ornamental.
   Margin-bottom: `20px`.

2. **Service name** — `--font-display`, `72px` desktop / `48px` tablet /
   `38px` mobile. White. Weight `300`. Line-height `1.0`.
   Letter-spacing `-0.03em`.

3. **Short description** — `--font-body`, `17px`, white at `72%` opacity.
   Weight `400`. Line-height `1.65`. Max-width `400px`.
   Margin-top: `16px`.

4. **Minimal CTA** — `--font-body`, `14px`, white. Weight `600`.
   Letter-spacing `0.02em`. Margin-top: `32px`.
   Not a button — a text link. A `36px` wide `2px` line in `--color-gold`
   sits to the left of the text, separated by `12px` gap. On hover:
   the line extends to `52px` via CSS `width` transition (`0.3s ease`),
   and the text shifts right accordingly using `padding-left` transition.
   Text is always sentence case (e.g., "Explore flights").
   Routes to the service's own page.

**Layer 5 — Right-side progress indicator** (see 3.4 below)

---

### 3.3 — The Six Service Cards

Image paths use `public/assets/cards/`. For cards without a confirmed
asset, the agent uses an Unsplash placeholder with the specified query.
All image paths are the same ones established in Turn 2.

| # | Counter | Service Name | Description | CTA Text | Route | Image |
|---|---|---|---|---|---|---|
| 1 | 01 / 06 | Flights | Fly anywhere in the world. Economy, business or first class — we find the routes and handle the booking. | Explore flights | `/travel/flights` | `flights.webp` |
| 2 | 02 / 06 | Hotels | Handpicked hotels across every destination. Boutique city stays to five-star resort escapes — chosen for quality and location. | Find a hotel | `/travel/hotels` | `hotel.webp` |
| 3 | 03 / 06 | Holiday Packages | Complete holidays, thoughtfully put together. Flights, hotels, transfers — all arranged so you simply show up and enjoy it. | Explore holidays | `/travel/holidays` | `Holiday_packages.webp` |
| 4 | 04 / 06 | Tours & Experiences | Beyond the destination. Guided tours, cultural access and local experiences curated for every kind of traveller. | Explore experiences | `/travel/tours` | `tours_card.webp` |
| 5 | 05 / 06 | Honeymoons | Begin your forever the right way. Romantic escapes planned around the couple — not around a package. | Plan a honeymoon | `/travel/honeymoons` | Unsplash: `honeymoon,beach,luxury` |
| 6 | 06 / 06 | Cruises | Wake up somewhere new every day. Cruise packages across the world's finest routes, managed from booking to boarding. | Explore cruises | `/travel/cruises` | `cruise_1.webp` |

---

### 3.4 — Right-Side Progress Indicator

**Component:** `CardProgress.jsx`

**Position:** `position: fixed`, `right: 40px`, `top: 50%`,
`transform: translateY(-50%)`. Fixed so it stays in the viewport
throughout the pinned scroll section. Appears when the pinned section
enters the viewport, disappears when it leaves. Use a GSAP
`ScrollTrigger` on the outer wrapper to toggle its opacity:
`opacity 0 → 1` on enter, `opacity 1 → 0` on leave.

**Structure:**
- A `120px` tall vertical track: `2px` wide, `rgba(255,255,255,0.15)`
  background, `border-radius: 1px`
- Inside the track, a gold fill bar: `2px` wide, `--color-gold`,
  `border-radius: 1px`. Its height animates from `0%` to `100%` as the
  user scrolls through all 6 cards. This is driven by the same
  ScrollTrigger progress value (0 to 1) — `height: ${progress * 100}%`.
- Six tick marks along the track — one per card. Each tick: `6px` wide,
  `1px` tall, `rgba(255,255,255,0.30)` when inactive, `--color-gold`
  when the card is active or passed. Positioned at `0%`, `20%`, `40%`,
  `60%`, `80%`, `100%` of the track height.
- The current card number below the track: `--font-body`, `11px`,
  white at `45%` opacity, `letter-spacing: 0.08em`.
  Format: `"03"` (just the current card number, no total).
  Updates as cards change.

On mobile: hide entirely. The progress indicator is a desktop-only
element. Use `display: none` below `768px`.

---

### 3.5 — GSAP Implementation (Desktop)

The agent implements this inside a `useEffect` in `PinnedCards.jsx`,
conditional on `window.innerWidth >= 768`. All GSAP instances are
stored in refs and cleaned up in the `useEffect` return function.

**Step 1 — Register ScrollTrigger:**
```
gsap.registerPlugin(ScrollTrigger);
```

**Step 2 — Create the master timeline:**
```
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: outerWrapperRef.current,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,                     // The scrub value. 1 = 1 second lag.
    onUpdate: (self) => {         // Update progress indicator
      setScrollProgress(self.progress);
      const cardIndex = Math.min(
        Math.floor(self.progress * 6),
        5
      );
      setActiveCard(cardIndex);
    }
  }
});
```

**Step 3 — Initial state of cards 2–6 (before animation starts):**
```
gsap.set(cardRefs[1..5], {
  yPercent: 100,       // Below viewport
  scale: 0.96,
  opacity: 0
});
```
Card 1 starts fully visible with no transform applied.

**Step 4 — Build the timeline for each transition (N → N+1):**

For each of the 5 transitions (card 0→1, 1→2, 2→3, 3→4, 4→5):

```
// Position in timeline: each transition occupies 1/5 of the total
const pos = i * (1/5);          // 0, 0.2, 0.4, 0.6, 0.8

// Outgoing card (card i): recede
tl.to(cardRefs[i], {
  scale: 0.96,
  opacity: 0.80,
  ease: 'none'                  // ease:none on scrubbed timelines
}, pos);

// Outgoing card image: parallax upward as card recedes
tl.to(imageRefs[i], {
  yPercent: -8,                 // Image moves up by 8% of its height
  ease: 'none'
}, pos);

// Incoming card (card i+1): rise into place
tl.fromTo(cardRefs[i + 1],
  { yPercent: 60, scale: 0.97, opacity: 0 },
  { yPercent: 0, scale: 1, opacity: 1, ease: 'none' },
  pos
);
```

**Important ease rule:** Use `ease: 'none'` on all tween properties
inside a scrubbed timeline. The scrub value itself provides the
smoothing. Adding easing on top of scrub creates double-easing which
makes the animation feel inconsistent. The `scrub: 1` value means the
playhead takes 1 second to catch up to the scroll position — this is
what creates the "expensive," slightly lagging feel.

**Step 5 — Image parallax for the active card during its stay:**

While each card is the active card (not transitioning in or out), its
image should move subtly as the user scrolls through that card's section.
This is a separate, smaller ScrollTrigger per card:

```
// For card i: parallax while it's the active card
ScrollTrigger.create({
  trigger: outerWrapperRef.current,
  start: `${i * (100/6)}% top`,
  end: `${(i+1) * (100/6)}% top`,
  scrub: true,
  onUpdate: (self) => {
    gsap.set(imageRefs[i], {
      yPercent: -4 + (self.progress * -8),   // Range: -4% to -12%
      overwrite: 'auto'
    });
  }
});
```

The range `-4%` to `-12%` is subtle. The image moves `8%` of its height
across the full scroll duration of that card's section. This is
deliberately restrained — just enough to feel alive, not enough to
distract from the content.

**Cleanup:**
```
return () => {
  tl.kill();
  ScrollTrigger.getAll().forEach(st => st.kill());
};
```

---

### 3.6 — Mobile Fallback (below 768px)

On mobile, the pinned architecture does not apply.
Cards are rendered as a normal vertical stack — no sticky container,
no `700vh` outer wrapper height. Each card is:

- `height: 85vh`
- `position: relative`
- `overflow: hidden`
- `border-radius: --radius-large`
- `margin-bottom: 24px`

The image inside each mobile card is `height: 100%`, `width: 100%`,
`object-fit: cover`. No parallax on mobile — performance and usability
on touch devices do not benefit from it.

Each card gets a simple ScrollTrigger reveal:
```
gsap.from(cardRef, {
  scrollTrigger: {
    trigger: cardRef,
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: 'power2.out'
});
```

No scrub on mobile. Standard play-once animation. Clean and fast.

The gradient overlay on mobile uses the bottom gradient described in
section 3.2 (dark at bottom, transparent upward) because the content
panel sits at the bottom of the card.

The progress indicator (`CardProgress.jsx`) is hidden entirely on mobile
with `display: none` below `768px`.

---

### 3.7 — Animation Constraints (The Agent Must Not Break These)

The agent must follow every rule below. These are not style preferences —
they define the difference between this feeling premium or feeling like a
portfolio experiment.

| Rule | Correct | Incorrect |
|---|---|---|
| Ease type in scrubbed tweens | `ease: 'none'` | Any named ease |
| Scrub value | `1` to `1.2` | Below `0.8` or above `2` |
| Incoming card Y displacement | `yPercent: 60` max | `yPercent: 100` or more |
| Scale when receding | `0.96` | Below `0.92` |
| Image parallax range | `8%` max total travel | More than `12%` |
| Opacity of receding card | `0.80` minimum | Below `0.70` |
| Rotation | Never | Any rotation at all |
| Bounce or elastic ease | Never | Any spring or elastic |
| 3D transforms | Never | `rotateY`, `perspective` |
| Stagger within one card | Never | Cards should not stagger internally |

**`prefers-reduced-motion`:**
If `window.matchMedia('(prefers-reduced-motion: reduce)').matches`:
- Skip all scroll-driven animations entirely
- Render cards as a normal vertical stack (same as mobile fallback)
- Apply zero GSAP. The page remains fully usable and legible.

---

## PART 4 — SECTION 3: SERVICES QUICK GRID

**Component:** `TravelGrid.jsx`

**Purpose:** After scrolling through the pinned cards section, the user
arrives here with visual knowledge of all 6 services. This grid lets
them navigate directly to whichever page interested them.

**Background:** `--color-page` (`#EDE7D9`)

**Section padding:** `96px` top and bottom

**Section header — left-aligned:**
- Heading: "Where would you like to go?" — `--font-display`, `40px`,
  `--color-ink`, weight `400`
- Subtext: "Select a service to learn more or start an enquiry." —
  `--font-body`, `16px`, `--color-stone`, margin-top `12px`

**Grid:** 3 columns desktop / 2 columns tablet / 1 column mobile.
`6` items. `20px` gap. Each item is a minimal horizontal link card:

- Background: `#FFFFFF`
- Border: `1px solid --color-border`
- Radius: `--radius-card`
- Padding: `20px 24px`
- Height: `72px`
- Display: flex, align-items center, space-between

Left side:
- Service name: `--font-display`, `22px`, `--color-ink`, weight `400`

Right side:
- A minimal right-pointing mark — not a Lucide arrow icon, but a
  hand-drawn-style SVG chevron in `--color-stone`. `16px`. On hover,
  color transitions to `--color-gold`.

**On hover (entire card):**
- `border-color` transitions to `--color-gold` at `60%` opacity
- `transform: translateX(4px)` — a tiny horizontal nudge
- `box-shadow: --shadow-card`
- Smooth `0.2s ease`

The cards link to the same routes as the scroll section.

**ScrollTrigger reveal:** The 6 items stagger in at `0.07s` per item
as the section enters the viewport. `y: 20 → 0`, `opacity: 0 → 1`,
`duration: 0.5s`, `ease: power2.out`.

---

## PART 5 — SECTION 4: PAGE CTA

**Component:** `TravelPageCTA.jsx`

**Background:** `--color-abyss` (`#07111C`)

**Section padding:** `96px` top and bottom

**Content — centered, max-width `560px`:**

1. Heading — `--font-display`, `48px`, white, weight `300`, line-height `1.1`:
   "Not sure where to start?"

2. Supporting line — `--font-body`, `17px`, white at `68%` opacity,
   line-height `1.6`, margin-top `16px`:
   "Tell us what you have in mind. A travel consultant will help you
   figure out the rest."

3. Two buttons — centered, `16px` gap, margin-top `40px`:
   - Primary: `--color-whatsapp` background, white text, weight `600`,
     padding `14px 28px`, radius `--radius-button`.
     Text: "Chat on WhatsApp"
     Link: `https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%27d%20like%20help%20planning%20my%20travel.`
   - Secondary: Transparent, `1px solid rgba(255,255,255,0.35)`,
     white text. Text: "Send an enquiry". Routes to `/contact`.

4. Reassurance line — `--font-body`, `13px`, white at `38%` opacity,
   centered, margin-top `20px`:
   "No commitment required. Real people, not automated systems."

---

## PART 6 — DOCUMENT METADATA

```
Title:       "Travel Services — Infiniti Luxe"
Description: "Explore our full range of travel services — flights,
              hotels, holiday packages, tours, honeymoons and cruises.
              Planned personally by Infiniti Luxe."
```

---

## PART 7 — ACTIVE NAV STATE

On `/travel`, the PillNav `activeHref` prop should resolve to `/travel`
to trigger the gold active indicator on the Travel pill. However, the
Travel nav item normally only opens a dropdown and has `href="#"`. The
agent updates the Travel item's `href` to `/travel` so it both:

1. Routes to the travel page when clicked directly
2. Still opens the dropdown on hover (existing behaviour)

This means clicking the Travel pill word itself navigates to `/travel`,
while hovering (desktop) still reveals the dropdown. Both behaviours
coexist — link + hover-triggered dropdown is a standard pattern.

---

## PART 8 — PERFORMANCE NOTES

The pinned scroll section is GPU-intensive because of the stacked full-
viewport cards and simultaneous animations. The agent must apply these
performance rules throughout:

- `will-change: transform` on all animated card containers and images.
  Apply before any animation begins, remove after the section leaves
  the viewport using the ScrollTrigger `onLeave` and `onEnterBack`
  callbacks.
- Use `transform` and `opacity` only for animations — never animate
  `width`, `height`, `top`, `left`, `margin`, or `padding`.
- Images must use `loading="eager"` on card 1 (visible on page load)
  and `loading="lazy"` on cards 2–6 (not immediately visible).
- Set `decoding="async"` on all card images.
- The pinned cards section should not exist in the DOM on mobile —
  use a conditional render based on a `useMediaQuery` hook or
  `window.innerWidth` check inside `useEffect`, rendering the mobile
  stack instead.

---

## PART 9 — COMPLETE SUMMARY

**The agent builds:**

1. `app/travel/page.jsx`
   — server component, imports all section components

2. `components/travel/TravelHero.jsx`
   — dark hero with dot grid, heading, scroll prompt

3. `components/travel/PinnedCards.jsx` ← `'use client'`
   — outer wrapper (700vh), sticky inner, cards stack,
     full GSAP timeline with scrub: 1,
     mobile fallback (vertical stack, simple reveals),
     `prefers-reduced-motion` handling,
     progress state passed to CardProgress

4. `components/travel/ServiceCard.jsx` ← `'use client'`
   — individual card with image, overlay, content panel,
     counter, service name, description, CTA link

5. `components/travel/CardProgress.jsx` ← `'use client'`
   — fixed right-side progress track, gold fill bar,
     6 tick marks, current card number,
     hidden below 768px

6. `components/travel/TravelGrid.jsx`
   — 6 minimal horizontal link cards post-scroll,
     ScrollTrigger stagger reveal

7. `components/travel/TravelPageCTA.jsx`
   — dark closing CTA with WhatsApp + contact buttons

8. `styles/modules/travel/PinnedCards.module.css`
   — all layout, overlay, and transition CSS for the
     pinned system

9. `styles/modules/travel/ServiceCard.module.css`
   — card anatomy, content positioning, CTA link hover

10. Metadata export from `app/travel/page.jsx`

11. Travel nav item `href` updated from `#` to `/travel`
    so the route is reachable via direct click

---

## ANIMATION REFERENCE — ONE-SENTENCE SUMMARY FOR THE AGENT

Each card is a full-viewport cinematic frame. The previous frame
quietly recedes to 96% scale while the next frame rises in from
below. The image inside the active frame drifts subtly upward.
Nothing bounces. Nothing spins. The scroll does all the work.