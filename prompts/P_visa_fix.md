# TASK: Redesign the Visa Services (VisaHighlight) Section

The current Visa Services section on the homepage is broken and boring.

**Critical issues to fix:**
1. The h2 heading text is INVISIBLE — dark text on a dark `#07111C` background (the global `h1-h4` rule sets `color: var(--color-ink)` which is `#0E1824` — nearly identical to the background). This MUST be overridden to white.
2. The right column (`.visualColumn`) is completely EMPTY — wasted space.
3. The section has zero interactivity — no hover effects on tags, no animations, feels static and lifeless.
4. The primary button hover has a random blue box-shadow (`rgba(0, 85, 255, 0.3)`) that doesn't match the gold brand palette.

---

## FILES TO MODIFY

### 1. `components/home/VisaHighlight.jsx`
### 2. `styles/modules/VisaHighlight.module.css`

---

## DESIGN SYSTEM (use these tokens from globals.css)

```
Background:    --color-abyss: #07111C
Dark surface:  --color-deep-navy: #0D2035
Gold accent:   --color-gold: #C5973A
Gold light:    --color-gold-light: #DDB96A
White 95%:     rgba(255,255,255,0.95)
White 75%:     rgba(255,255,255,0.75)
White 50%:     rgba(255,255,255,0.50)
White 12%:     rgba(255,255,255,0.12)
Border dark:   --color-border-dark: #1A3250
Font display:  --font-display: 'Cormorant Garamond', serif
Font body:     --font-body: 'Inter', sans-serif
Radius card:   --radius-card: 12px
Radius pill:   --radius-pill: 999px
Transition:    --transition-base: 0.25s ease
```

---

## EXACT CHANGES REQUIRED

### A. FIX THE HEADING COLOR (CRITICAL)

In `VisaHighlight.module.css`, the `.heading` class MUST explicitly set:

```css
color: rgba(255, 255, 255, 0.95);
```

This overrides the global `h1-h4 { color: var(--color-ink) }` rule that makes the heading invisible on the dark background.

### B. FIX THE PRIMARY BUTTON HOVER

Change the `.primaryBtn:hover` box-shadow from the random blue:
```css
/* WRONG — remove this */
box-shadow: 0 4px 12px rgba(0, 85, 255, 0.3);
```
To a gold glow that matches the brand:
```css
/* CORRECT */
box-shadow: 0 4px 16px rgba(197, 151, 58, 0.4);
```

### C. ADD INTERACTIVE HOVER EFFECTS TO TAGS

Each `.tag` pill should have a hover effect:

```css
.tag {
  cursor: default;
  transition: all 0.25s ease;
}

.tag:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-light);
  background: rgba(197, 151, 58, 0.08);
  transform: translateY(-2px);
}
```

### D. ADD THE VISA IMAGE CARD IN THE RIGHT COLUMN

The image `visa_1.webp` has already been copied to `/public/assets/visa/visa_1.webp`.

In `VisaHighlight.jsx`, replace the empty `.visualColumn` div:

```jsx
{/* REPLACE THIS: */}
<div className={styles.visualColumn}>
  {/* Decorative element could go here */}
</div>

{/* WITH THIS: */}
<div className={styles.visualColumn}>
  <div className={styles.imageCard}>
    <img
      src="/assets/visa/visa_1.webp"
      alt="Professional visa application assistance by Infiniti Luxe"
      className={styles.visaImage}
      loading="lazy"
    />
    <div className={styles.imageOverlay}>
      <span className={styles.overlayBadge}>Expert Visa Guidance</span>
    </div>
  </div>
</div>
```

### E. STYLE THE IMAGE CARD (in VisaHighlight.module.css)

Add these styles for the image card:

```css
.visualColumn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.imageCard {
  position: relative;
  width: 100%;
  max-width: 480px;
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid var(--color-border-dark);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.imageCard:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4), 0 0 40px rgba(197, 151, 58, 0.1);
}

.visaImage {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.imageCard:hover .visaImage {
  transform: scale(1.05);
}

.imageOverlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(7, 17, 28, 0.9) 0%, transparent 100%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.overlayBadge {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gold-light);
  background: rgba(7, 17, 28, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(197, 151, 58, 0.3);
  padding: 8px 16px;
  border-radius: var(--radius-button);
}
```

### F. ENHANCE THE GSAP ANIMATIONS

In `VisaHighlight.jsx`, update the `useEffect` to also animate the image card separately with a slight delay and a different entrance direction:

```jsx
useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = gsap.context(() => {
    // Animate left content (staggered fade up)
    gsap.fromTo(sectionRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );

    // Animate the image card (slide in from right)
    const imageCard = document.querySelector(`.${styles.imageCard}`);
    if (imageCard) {
      gsap.fromTo(imageCard,
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageCard,
            start: 'top 85%'
          }
        }
      );
    }
  });

  return () => ctx.revert();
}, []);
```

### G. ADD A SUBTLE GOLD ACCENT LINE

Add a decorative gold accent line below the "VISA SERVICES" label to give it more visual weight.

In `VisaHighlight.jsx`, after the label div, add:
```jsx
<div className={styles.accentLine}></div>
```

In `VisaHighlight.module.css`:
```css
.accentLine {
  width: 48px;
  height: 2px;
  background: linear-gradient(to right, var(--color-gold), var(--color-gold-light));
  margin-bottom: 24px;
  border-radius: 2px;
}
```

### H. ADD SUBTLE SECONDARY BUTTON HOVER GLOW

```css
.secondaryBtn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-gold-light);
  color: var(--color-gold-light);
  transform: translateY(-2px);
}
```

---

## RESPONSIVE — HIDE IMAGE ON TABLET AND BELOW

In the `@media (max-width: 1024px)` block, add:

```css
.visualColumn {
  display: none;
}
```

This ensures the grid collapses cleanly to single column without the image fighting for space.

---

## SUMMARY OF ALL ISSUES TO FIX

| # | Issue | Fix |
|---|-------|-----|
| 1 | Heading invisible (dark text on dark bg) | Set `.heading { color: rgba(255,255,255,0.95) }` |
| 2 | Button hover uses wrong blue color | Change to gold `rgba(197, 151, 58, 0.4)` |
| 3 | Tags are not interactive | Add hover with gold border, slight lift |
| 4 | Right column is empty | Add image card with `visa_1.webp` |
| 5 | No image card styling | Add `.imageCard`, `.visaImage`, `.imageOverlay`, `.overlayBadge` styles |
| 6 | Image has no entrance animation | Add GSAP slide-in-from-right animation |
| 7 | No visual accent/separator | Add gold accent line under label |
| 8 | Secondary button hover is bland | Add gold-tinted border and lift on hover |

---

## DO NOT

- Do NOT change the section background color — keep `var(--color-abyss)`
- Do NOT change the text copy or tag list
- Do NOT modify any other homepage components
- Do NOT introduce new dependencies
- Do NOT change the grid layout structure (keep `1fr 1fr`)
- Do NOT use any color outside the design system tokens listed above
