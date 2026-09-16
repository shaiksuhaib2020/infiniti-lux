# HOMEPAGE — CIRCULAR DESTINATION GALLERY
## Infiniti Luxe | Agent Instruction Document
## Replaces: Static Destinations Grid in app/page.jsx

---

## PART 0 — WHAT THIS DOES AND WHERE

The "Where Will You Go Next?" section on the homepage currently renders
`Destinations.jsx` — a static 5-column card grid of 14 destination cards.

This brief replaces that component entirely with an interactive circular
(WebGL-based) gallery using the `CircularGallery` component from
React Bits. The section heading, subheading, and background remain. Only
the card grid itself is replaced.

**File to delete:**
```
components/home/Destinations.jsx     ← delete this
```

**Files to create:**
```
components/ui/CircularGallery.jsx    ← WebGL gallery component (adapted)
components/home/DestinationGallery.jsx  ← section wrapper + heading
styles/modules/CircularGallery.module.css
```

**File to update:**
```
app/page.jsx   ← replace <Destinations /> import with <DestinationGallery />
```

---

## PART 1 — DEPENDENCY

Install before writing any component code:

```
npm install ogl
```

`ogl` is the only new dependency. It is a minimal WebGL library that
the CircularGallery component requires internally for its curved canvas
rendering. No other new packages.

---

## PART 2 — GET THE BASE COMPONENT

Fetch the CircularGallery component source from React Bits:

```
https://reactbits.dev/llms.txt
```

Find the `CircularGallery` entry — JS + CSS variant. Copy the full
component source and CSS into:
- `components/ui/CircularGallery.jsx`
- `styles/modules/CircularGallery.module.css`

The component must be marked `'use client'` at the top — it uses WebGL
via `ogl`, which is browser-only. Server-side rendering will crash
without this directive.

---

## PART 3 — REQUIRED MODIFICATIONS TO THE BASE COMPONENT

The stock CircularGallery component has no navigation capability. It is
a visual browsing component only. The following modifications are required
before it can be used on the Infiniti Luxe homepage. These are non-optional
— every item in this list must be implemented.

---

### 3.1 — Click vs Drag Discrimination

The component tracks pointer movement. A genuine click (navigation intent)
must be distinguished from a drag (browsing intent).

Implementation:

Track `pointerdown` position as `{ x, y }`. On `pointerup`, calculate
the Euclidean distance between the down and up coordinates.

```
const distance = Math.sqrt(
  Math.pow(upX - downX, 2) + Math.pow(upY - downY, 2)
);
const isDrag = distance > 6;   // 6px threshold
```

If `isDrag` is `true`: do nothing. The user was browsing.
If `isDrag` is `false`: treat as a navigation intent and proceed to 3.2.

This threshold of `6px` gives touch users enough forgiveness for
natural finger placement while still distinguishing intentional taps.

---

### 3.2 — Determine the Centred Item on Click

When a genuine click is confirmed, do not navigate based on where the
pointer landed (the click target item). Navigate based on which item
is currently visually centred in the gallery viewport — the item that
appears most prominent on screen.

The CircularGallery internally tracks the scroll/rotation offset.
Use that offset to calculate which item index is currently closest to
the centre position:

```
const centredIndex = Math.round(currentOffset / itemSpacing) % items.length;
const normalisedIndex = ((centredIndex % items.length) + items.length) % items.length;
```

Pass `normalisedIndex` to the navigation handler.

This "centred item wins" behaviour is intentional UX — the gallery
functions like a carousel where the user rotates to their choice and then
clicks anywhere to confirm it. Precise tap accuracy on a curved WebGL
canvas is difficult; this removes the precision requirement entirely.

---

### 3.3 — Navigation Prop

The component accepts a new prop: `onSelect`.

```
PropTypes / signature:
  onSelect: (destination: { name: string, route: string }) => void
```

When a genuine click is confirmed and the centred item is determined,
call `onSelect` with the centred item's data object.

The parent component (`DestinationGallery.jsx`) provides the handler,
which uses Next.js router to navigate.

---

### 3.4 — Keyboard Navigation

The gallery container must be keyboard accessible.

Add to the canvas/container element:
```
tabIndex={0}
role="region"
aria-label="Destination gallery. Use arrow keys to browse destinations. Press Enter or Space to open the selected destination."
```

On `keydown` events while the gallery is focused:

| Key | Action |
|---|---|
| `ArrowLeft` | Rotate gallery left (previous item) |
| `ArrowRight` | Rotate gallery right (next item) |
| `Enter` | Navigate to current centred item |
| `Space` | Navigate to current centred item |

Arrow key rotation should move by exactly one item increment and feel
smooth — use the same animation the drag system uses, just triggered
programmatically. Do not make arrow keys jump multiple items.

Focus outline: a `2px solid --color-gold` (`#C5973A`) outline on the
container when focused via keyboard. Remove only on `mousedown` so
mouse users are not shown the outline. Use the standard
`:focus-visible` CSS selector.

---

### 3.5 — Typography: Override the Default Font

The stock component renders labels in a bold geometric display font
(likely `Orbitron` or similar). This must be overridden.

Apply to all label text elements within the gallery:

```css
font-family: 'Cormorant Garamond', serif;
font-weight: 400;
font-size: 22px;
letter-spacing: -0.01em;
color: rgba(255, 255, 255, 0.95);
text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);   /* legibility on images */
```

If the label is rendered on a WebGL canvas (text is drawn directly),
the agent must configure the canvas text rendering to use
`'Cormorant Garamond', serif` — loaded via `document.fonts.ready`
to ensure the font is available before the first canvas draw.

If the label is rendered as an HTML overlay on top of the canvas
(which is the more common React Bits implementation), apply the CSS
directly to the label element class.

---

### 3.6 — Border Radius on Image Tiles

Apply `border-radius: 16px` to the image tiles rendered in the gallery.
This matches `--radius-large` from the design system and is consistent
with the existing destination card treatment.

If the component renders images via WebGL textures on geometry, the
radius cannot be applied via CSS. In that case, use a canvas clip path
or create a rounded rectangle mask on the WebGL quad. If neither is
feasible within the component's architecture, apply a CSS `clip-path:
inset(0 round 16px)` on the canvas container element — this clips the
entire canvas, which is an acceptable approximation for this use case.

---

## PART 4 — DESTINATION DATA

14 destinations. Order matches the current grid exactly.

All 14 destination routes follow Phase 1 behaviour: they route to
`/contact` with a `destination` query param, not to individual
destination pages (those do not exist in Phase 1).

```javascript
const destinations = [
  {
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    route: '/contact?destination=dubai'
  },
  {
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    route: '/contact?destination=maldives'
  },
  {
    name: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    route: '/contact?destination=switzerland'
  },
  {
    name: 'Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    route: '/contact?destination=turkey'
  },
  {
    name: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    route: '/contact?destination=france'
  },
  {
    name: 'Italy',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
    route: '/contact?destination=italy'
  },
  {
    name: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80',
    route: '/contact?destination=united-kingdom'
  },
  {
    name: 'USA',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80',
    route: '/contact?destination=usa'
  },
  {
    name: 'Canada',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
    route: '/contact?destination=canada'
  },
  {
    name: 'Japan',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80',
    route: '/contact?destination=japan'
  },
  {
    name: 'Thailand',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    route: '/contact?destination=thailand'
  },
  {
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    route: '/contact?destination=bali'
  },
  {
    name: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
    route: '/contact?destination=australia'
  },
  {
    name: 'Saudi Arabia',
    image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&q=80',
    route: '/contact?destination=saudi-arabia'
  }
];
```

These are specific Unsplash photo IDs — not the deprecated
`source.unsplash.com` format. They will resolve correctly.
All are high-quality, travel-appropriate photography.

All 14 items must loop continuously in the gallery. The component
already supports infinite looping — confirm it is not truncated to
only the visible items.

---

## PART 5 — SECTION WRAPPER: `DestinationGallery.jsx`

This component wraps the CircularGallery with the section heading and
handles navigation.

**Background:** `--color-ice` (`#E4DDD0`) — the alternating warm sand
tone that this section already uses.

**Section padding:** `96px` top. `0` bottom — the gallery itself provides
the bottom visual boundary.

**Section header:**

Preserve exactly as it currently exists on the page:
- Heading: "Where Will You Go Next?" — `--font-display`, `48px`,
  `--color-ink`, weight `400`, left-aligned
- Subtext: "From the deserts of Arabia to the islands of the Indian
  Ocean — we'll get you there." — `--font-body`, `17px`, `--color-stone`,
  margin-top `12px`, left-aligned
- Both inside the `--page-max-width` (`1200px`) container

**48px gap** between the header and the gallery component.

**Gallery container:**

```
position: relative
width: 100%
height: 600px    (desktop)
height: 440px    (tablet, below 1024px)
height: 340px    (mobile, below 768px)
overflow: hidden
```

**Navigation handler:**

```javascript
import { useRouter } from 'next/navigation';

const router = useRouter();

const handleSelect = (destination) => {
  router.push(destination.route);
};
```

Pass to CircularGallery:
```jsx
<CircularGallery
  items={destinations}
  onSelect={handleSelect}
  bend={3}           // curvature of the gallery arc
  textColor="rgba(255,255,255,0.95)"
  borderRadius={16}
/>
```

The `bend` value of `3` creates a moderate arc. If the component's
default feels too flat or too exaggerated, the agent should try values
between `2` and `4` and use whichever looks most premium at first view.

---

## PART 6 — CURSOR TREATMENT

When the user hovers over the gallery, the default cursor should change
to indicate the gallery is interactive.

```css
.gallery-container {
  cursor: grab;
}
.gallery-container:active {
  cursor: grabbing;
}
```

When the gallery is in a "centred item ready to navigate" state (pointer
is stationary after a drag settles), consider changing the cursor to
`pointer` — indicating that a click will navigate. This is optional but
adds clarity. If implemented, use a short debounce (300ms of no movement)
to trigger the cursor switch.

---

## PART 7 — CONTACT PAGE INTEGRATION

When a destination card is clicked in the gallery, the user is routed to:
`/contact?destination=[destination-slug]`

The Contact page (`app/contact/page.jsx`) already reads `useSearchParams()`
for the `?service=` query param. The agent extends this to also read
`?destination=` and pre-populate the Destination dropdown field in the
contact form with the matching destination name.

Example: clicking Dubai routes to `/contact?destination=dubai`.
The contact form's Destination dropdown auto-selects "Dubai".

The destination slug-to-label mapping:

| Slug | Display label in form |
|---|---|
| `dubai` | Dubai |
| `maldives` | Maldives |
| `switzerland` | Switzerland |
| `turkey` | Turkey |
| `france` | France |
| `italy` | Italy |
| `united-kingdom` | United Kingdom |
| `usa` | USA |
| `canada` | Canada |
| `japan` | Japan |
| `thailand` | Thailand |
| `bali` | Bali |
| `australia` | Australia |
| `saudi-arabia` | Saudi Arabia |

This makes the gallery a genuine lead capture tool — not just a visual
element. A user browsing destinations, clicking one, and landing on a
contact form with that destination pre-selected is a meaningful
conversion flow.

---

## PART 8 — NEXT.JS SSR SAFETY

The `ogl` library accesses `window`, `document`, and WebGL context
directly. These do not exist during Next.js server-side rendering.

The agent must handle this with dynamic import:

```javascript
// In DestinationGallery.jsx
import dynamic from 'next/dynamic';

const CircularGallery = dynamic(
  () => import('@/components/ui/CircularGallery'),
  {
    ssr: false,
    loading: () => <GalleryFallback />   // see below
  }
);
```

**`GalleryFallback` component:**

While the WebGL gallery loads (or if it fails), show a simple fallback
that does not look broken. A minimal horizontal scrollable row of
destination name pills:

```
Background: --color-deep-navy
Border-radius: --radius-pill
Padding: 10px 24px
Font: --font-body, 14px, white, weight 500
Gap: 12px between pills
```

The fallback should be a single horizontally scrollable row of all
14 destination names. Clicking any pill in the fallback navigates
to the same route as the gallery would. This ensures the section is
fully functional even before the WebGL canvas mounts.

---

## PART 9 — WHAT THE AGENT MUST NOT DO

These are explicit constraints. Do not deviate.

| What | Why |
|---|---|
| Do not use `Orbitron` or any geometric display font on labels | Destroys brand typography consistency |
| Do not use `window.location.href` for navigation | Must use Next.js `router.push()` |
| Do not make all 14 destinations require scrolling to the right only | Gallery must loop infinitely in both directions |
| Do not animate the section heading with GSAP on this section | Section heading already has a standard ScrollTrigger reveal from Turn 1 — do not add a second animation on it |
| Do not add a separate "Explore →" CTA below each gallery item | The click-to-navigate behaviour replaces the explicit CTA |
| Do not render a plain `<canvas>` without the `'use client'` directive | Will crash Next.js SSR build |
| Do not skip the SSR safety dynamic import | `ogl` will throw on server render |

---

## PART 10 — ACCEPTANCE CHECKLIST

Before considering this complete, the agent verifies every item:

- [ ] All 14 destinations appear in correct order, with correct images
- [ ] Gallery loops infinitely — dragging past the last item wraps
      back to the first
- [ ] Clicking a centred destination navigates to `/contact?destination=[slug]`
- [ ] Dragging to browse does NOT trigger navigation
- [ ] Keyboard: Tab focuses the gallery, Arrow keys rotate,
      Enter/Space navigates the centred item
- [ ] A visible gold focus outline appears on keyboard focus
- [ ] Labels use Cormorant Garamond serif, not a geometric font
- [ ] Label text is white and readable against the images
- [ ] Image tiles have `16px` border radius
- [ ] Gallery height is `600px` desktop, `440px` tablet, `340px` mobile
- [ ] The section heading "Where Will You Go Next?" and subtext are
      preserved above the gallery
- [ ] Section background is `--color-ice` (`#E4DDD0`)
- [ ] `dynamic` import with `ssr: false` is in place — no SSR crash
- [ ] Fallback renders correctly while gallery is loading
- [ ] Contact form pre-selects the destination when arriving via gallery click
- [ ] Touch drag works on mobile without triggering navigation
- [ ] No console errors related to WebGL context, `ogl`, or SSR

---

## SUMMARY

The agent replaces `Destinations.jsx` with `DestinationGallery.jsx`
wrapping an adapted `CircularGallery.jsx`. The gallery shows all 14
destinations on a curved, infinitely-looping WebGL track. Clicking
any destination navigates to the contact page with that destination
pre-selected. Typography is Cormorant Garamond. The section heading
is preserved. The contact form is updated to read the destination
query param. SSR is handled via dynamic import.