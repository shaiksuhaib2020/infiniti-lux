# TASK: Completely Redesign the Infiniti Luxe Homepage Hero

The current Infiniti Luxe hero is visually weak and must be replaced.
Do not patch the existing hero. Rebuild the hero component properly.

The goal is to create a premium, cinematic, luxury-travel hero that feels
like a high-end global travel brand rather than a generic travel agency.

Use the existing Infiniti Luxe design system as the visual source of truth.

Tech stack:
- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Existing project dependencies
- Do NOT introduce another animation library

---

# 1. PRIMARY OBJECTIVE

Replace the current hero completely.

The new hero should communicate:

Luxury
Global travel
Trust
Cinematic storytelling
Premium personal service

The first screen should immediately communicate:

"Infiniti Luxe is a premium Dubai-based global travel company."

The experience should feel closer to:

Luxury hotel website
+
Premium travel brand
+
Modern digital experience

It should NOT look like a conventional travel-agency website.

---

# 2. BRANDING — FIX THIS FIRST

The current "Infiniti Luxe" logo/wordmark is far too small.

Make the brand substantially more prominent.

Desktop:

- Position at top-left
- Give the brand enough visual weight to immediately identify the company
- "Infiniti Luxe" should be clearly readable from the first viewport
- Use the display/editorial typography style
- Do not make it tiny like a utility logo
- Add the tagline below in much smaller uppercase text:

TRAVEL BEYOND BOUNDARIES

The wordmark should feel premium and editorial.

Do not use an oversized graphical logo unless an actual logo asset already exists.

If there is no dedicated logo font/asset, use the approved display serif style.

---

# 3. TYPOGRAPHY

The typography is currently one of the weakest parts of the hero.
Correct this.

Use the Infiniti Luxe typography system.

Display:

Preferred:
- Fraunces
- Recoleta
- GT Sectra

Fallback:
- A refined serif available in the project

UI/body:
- Inter or Geist

Hero headline:

"Travel Beyond Boundaries"

Use a large editorial serif.

Desktop target:

- 72px–96px
- weight 400
- line-height approximately 1.0–1.1
- slightly negative letter spacing
- maximum width approximately 700–850px

Do not use a generic bold sans-serif for the hero headline.

The headline should feel elegant, expensive and editorial.

---

# 4. HERO COMPOSITION

Create a true full-screen hero.

Minimum:

100vh

Prefer approximately:

100svh

The hero should have a layered cinematic composition.

Layers:

1. Background travel environment
2. Atmospheric clouds/fog
3. Optional secondary travel imagery
4. Navigation
5. Hero typography
6. CTA group
7. Small supporting interaction cue

The background should not simply appear as one dark static image.

It should feel like a living environment.

---

# 5. BACKGROUND

Use a cinematic Dubai visual as the opening scene.

The visual should communicate:

Dubai
Luxury
Travel
Sky
Movement
Scale

The Burj Khalifa / Dubai skyline can be used as the initial visual anchor.

The current background is too dark, blurred and muddy.

Do NOT apply a heavy dark overlay across the entire image.

Instead:

- Correct the exposure
- Preserve visual detail
- Use a subtle cinematic gradient only where needed for text readability
- Keep the image atmospheric
- Maintain enough contrast behind the typography

The background should remain visually rich.

---

# 6. HERO COPY

Use:

Eyebrow:

EXPLORE · EXPERIENCE · ESCAPE

Main headline:

TRAVEL BEYOND
BOUNDARIES

Supporting text:

Explore the world with confidence.

Secondary line:

Flights · Holidays · Tours · Visas · Hotels · Experiences

Primary CTA:

Plan My Trip

Secondary CTA:

Explore Holidays

Tertiary/contact CTA:

WhatsApp an Expert

Optional small link:

Speak to a Travel Expert →

Do not overcrowd the hero.

The headline is the primary visual element.

---

# 7. ROTATING HIGHLIGHT WORD

Add a premium animated highlight word inside the main hero headline.

Example:

Travel Beyond [Discover]

Then automatically rotate through:

Discover
Explore
Experience
Escape
Journey

Visual structure:

Travel Beyond [Discover]

The changing word must appear inside a rounded pill.

Pill:

- border-radius: 9999px
- generous horizontal padding
- subtle brand accent background
- dark text
- visually integrated with the serif headline

The surrounding text must remain stable.

The headline must NOT jump horizontally when the word changes.

Animation:

- outgoing word fades/slides upward slightly
- incoming word fades/slides upward into position
- subtle scale transition
- 300–500ms transition
- smooth ease-out
- approximately 1.5–2.5 seconds between changes

Do NOT create a typewriter effect.

Do NOT rapidly cycle the words.

The effect should feel sophisticated.

---

# 8. NAVIGATION

Redesign the current navigation.

Keep it minimal.

Desktop structure:

Logo

Home
Travel ▼
Visa Services
Corporate Travel
About
Contact

WhatsApp Us

The navbar should sit naturally over the hero.

Preferred visual treatment:

- subtle translucent background
- backdrop blur
- thin border
- understated shadow
- medium-width centered navigation area if appropriate
- enough vertical padding
- excellent spacing

The logo must remain at top-left rather than being visually lost.

Travel dropdown:

Travel
├── Flights
├── Holidays
├── Tours & Experiences
├── Hotels
├── Honeymoons
└── Cruises

Do not put every service directly into the primary navbar.

WhatsApp should remain the strongest navigation CTA.

---

# 9. CTA DESIGN

The current CTA buttons are too generic.

Create a premium button system.

Primary:

Plan My Trip

Secondary:

Explore Holidays

WhatsApp:

WhatsApp an Expert

Use subtle interaction.

Hover:

- small translate
- slight background transition
- no exaggerated scaling
- no bouncing

Avoid overly rounded generic startup-style buttons.

Use approximately 8px radius unless a pill treatment is deliberately part
of the component.

---

# 10. CINEMATIC CLOUD LAYER

This is a major part of the experience.

Add multiple transparent cloud layers positioned independently.

Example:

cloud-1
cloud-2
cloud-3
cloud-4

Cloud layers should:

- move at different speeds
- have different depths
- create atmospheric parallax
- partially obscure/reveal the skyline
- move naturally as the user scrolls

Do NOT use one giant cloud image.

Each cloud should behave as an independent layer.

Use CSS transforms and GSAP.

Avoid expensive filters where unnecessary.

Use:

transform
opacity
scale

whenever possible.

---

# 11. GSAP SCROLL EXPERIENCE

Use GSAP ScrollTrigger.

The hero should become an interactive cinematic sequence.

On initial load:

Dubai skyline is visible.

As the user scrolls:

1. Hero content gradually moves upward.
2. Clouds drift horizontally.
3. Background slowly scales or shifts.
4. Atmospheric layers move at different speeds.
5. Hero typography begins fading/receding.
6. Dubai environment gradually transitions into the next travel scene.
7. The next visual section begins to emerge.

Use ScrollTrigger with:

scrub: true

or a small numeric scrub value.

The transition should feel physically connected to the user's scroll.

Do NOT create independent animations that simply play regardless of scroll.

The visual progression should be controlled by scroll progress.

---

# 12. HERO SCENE TRANSITION

Design the hero so it can evolve into a travel journey.

Concept:

SCENE 01
DUBAI

↓

SCENE 02
TAKEOFF / AIRCRAFT

↓

SCENE 03
CLOUDS

↓

SCENE 04
MALDIVES

↓

SCENE 05
SWITZERLAND

The first implementation does not need every destination.

Build the architecture so additional scenes can easily be added later.

Create reusable scene components.

Example:

TravelScene
CloudLayer
HeroHeadline
HeroCTA
DestinationScene

---

# 13. IMPORTANT PERFORMANCE RULE

Do not use unnecessary WebGL or Three.js.

Use:

GSAP
ScrollTrigger
CSS
optimized images
transparent WebP/PNG assets

Only introduce WebGL if the desired effect cannot reasonably be achieved
with normal DOM/CSS/GSAP.

Animations must be GPU-friendly.

Prefer:

transform
opacity

Avoid constantly animating:

width
height
top
left

unless absolutely necessary.

---

# 14. LAYOUT

Desktop:

Hero content should occupy approximately the left 45–55% of the viewport.

Do not center everything.

Use strong asymmetry.

Suggested structure:

LEFT:

EXPLORE · EXPERIENCE · ESCAPE

Travel Beyond
[Discover]

Explore the world with confidence.

Flights · Holidays · Tours · Visas · Hotels

[ Plan My Trip ] [ Explore Holidays ]

WhatsApp an Expert →

RIGHT/BACKGROUND:

Dubai skyline
Burj Khalifa
Airplane / travel visual
Cloud layers

The composition should feel editorial and cinematic.

---

# 15. HERO DEPTH

Create depth using:

foreground
midground
background

Example:

Foreground:
clouds / atmospheric particles

Midground:
hero text + interface

Background:
Dubai skyline

Far background:
sky / horizon

This should create a layered travel environment.

---

# 16. SCROLL INDICATOR

Add a very subtle indicator near the bottom of the hero.

Example:

SCROLL TO EXPLORE
↓
small animated line

The animation should be slow and subtle.

Do not use a large bouncing arrow.

---

# 17. RESPONSIVE BEHAVIOR

Desktop:

Full cinematic composition.

Tablet:

Reduce typography and simplify cloud layers.

Mobile:

Do NOT simply shrink the desktop design.

Create a mobile-specific composition.

Mobile priorities:

1. Brand
2. Headline
3. CTA
4. Visual

Navigation becomes a compact menu.

Reduce the number of simultaneous cloud layers.

Reduce expensive animation.

Maintain readability and performance.

---

# 18. ACCESSIBILITY

Respect:

prefers-reduced-motion

When reduced motion is enabled:

- disable complex cloud movement
- disable aggressive scene transitions
- disable rotating word animation
- show a static highlight word
- retain the visual hierarchy

All CTA buttons must remain keyboard accessible.

---

# 19. COMPONENT ARCHITECTURE

Do not put the entire animation inside page.tsx.

Create reusable components.

Suggested structure:

components/
  hero/
    TravelHero.tsx
    HeroNavigation.tsx
    HeroHeadline.tsx
    HeroActions.tsx
    CloudLayer.tsx
    TravelScene.tsx
    ScrollIndicator.tsx

animations/
  heroAnimations.ts

data/
  heroScenes.ts

The animation configuration should be easy to modify.

---

# 20. CENTRALIZED ANIMATION DATA

Create a configuration structure so future destinations can be added without
rewriting the animation logic.

Example concept:

const scenes = [
  {
    name: "Dubai",
    background: "...",
    clouds: [...],
  },
  {
    name: "Maldives",
    background: "...",
    clouds: [...],
  },
];

Do not hard-code everything directly inside animation functions.

---

# 21. VISUAL QUALITY STANDARD

The result should NOT look like:

- generic React landing page
- generic SaaS hero
- template website
- travel booking portal
- static hero image with dark overlay

It should feel like:

premium luxury travel
+
cinematic editorial design
+
modern interactive website

The user should immediately feel:

"These people can plan my entire international journey."

---

# 22. DESIGN SYSTEM COMPLIANCE

Use the Infiniti Luxe design system.

Core background:

#FEFFFC

White:

#FFFFFF

Text:

#171717
#2C2C2C
#444141
#646464

Borders:

#DEE2DE
#282834

Accent:

#41A1CF
#0081C0

Do not randomly introduce additional colors.

Use accent colors sparingly.

Typography:

Display → elegant serif
UI/body → Inter or Geist

Cards and UI should remain restrained.

---

# 23. VERY IMPORTANT — REBUILD, DON'T PATCH

The current hero is not meeting the intended design quality.

Do NOT make small CSS adjustments to the current implementation.

Replace/rebuild the hero component from the ground up while preserving:

- existing routing
- existing project structure where useful
- existing installed dependencies
- existing business functionality outside the hero

Do not break other homepage sections.

---

# 24. FINAL ACCEPTANCE CRITERIA

The implementation is complete only when:

- Infiniti Luxe branding is immediately visible.
- Hero typography is large, elegant and premium.
- Hero feels cinematic rather than static.
- Dubai background is visually clear and atmospheric.
- Clouds move independently.
- Hero reacts to scroll through GSAP ScrollTrigger.
- Highlight word automatically rotates.
- CTA hierarchy is obvious.
- Navigation feels premium.
- Desktop composition has depth.
- Mobile version is intentionally designed.
- Reduced-motion mode works.
- Animation is smooth.
- No excessive animation or visual clutter.
- No unnecessary WebGL has been introduced.
- Code is componentized and maintainable.

Before finishing, inspect the result at desktop and mobile viewport sizes
and make another visual refinement pass specifically for:

typography
spacing
hierarchy
contrast
animation smoothness
branding scale
CTA placement