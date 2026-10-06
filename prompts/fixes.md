Three clean fixes. No rebuilds, no new dependencies needed for any of them.

---

## FIX 1 — VISA PROCESS STEPS ("How We Help")

The background numeral (`position: absolute`, large font) is the entire problem. It sits behind the text but its sizing and z-index aren't controlled per-item, so it bleeds across columns. Scrap the decorative numeral approach entirely. Replace with a structured numbered badge.

**The agent rewrites the step card markup and CSS in `VisaProcess.jsx`:**

**New step card structure (each of the 4 steps):**

```
[Number badge] ← "01", "02", "03", "04"
[Top border line — full width of column]
[Step title]
[Step description]
```

**CSS for the step grid:**

```css
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;                   /* no gap — border handles visual separation */
  align-items: start;
}

@media (max-width: 900px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }
}

@media (max-width: 560px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}
```

**Each step item:**

```css
.step-item {
  padding: 0 32px 0 0;           /* right padding creates column breathing room */
  border-top: 2px solid var(--color-border);
  padding-top: 24px;
  position: static;              /* never relative/absolute on the item itself */
}

.step-item:last-child {
  padding-right: 0;
}

/* Mobile: use left border as the vertical connector instead */
@media (max-width: 560px) {
  .step-item {
    border-top: none;
    border-left: 2px solid var(--color-border);
    padding: 0 0 40px 24px;
  }

  .step-item:last-child {
    padding-bottom: 0;
  }
}
```

**Step number badge — replaces the floating background numeral:**

```css
.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(197, 151, 58, 0.12);   /* gold tint */
  border: 1.5px solid var(--color-gold);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-gold);
  margin-bottom: 20px;
  flex-shrink: 0;
}
```

Badge labels: `"01"`, `"02"`, `"03"`, `"04"` — zero-padded, consistent.

**Step title:**
```css
.step-title {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 10px;
}
```

**Step description:**
```css
.step-description {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-stone);
  line-height: 1.65;
}
```

**Active connector on desktop — gold highlight on step 1 only (first item):**

The first step's `border-top` color is `var(--color-gold)` to show the user is at the beginning of the journey. Steps 2–4 use `var(--color-border)`. This is a subtle "you are here" indicator.

```css
.step-item:first-child {
  border-top-color: var(--color-gold);
}
```

**The 4 steps content — exact copy:**

| Badge | Title | Description |
|---|---|---|
| 01 | Get in touch | Tell us your destination, nationality and travel dates. We'll let you know what's required for your specific situation. |
| 02 | Document preparation | We provide a full checklist of required documents and review everything before submission to reduce the risk of avoidable errors. |
| 03 | Application handled | We prepare and organise your application. Where direct submission is available, we handle it on your behalf. |
| 04 | Stay informed | We keep you updated throughout the process and notify you as soon as a decision is received. |

**Result:** On desktop — 4 clean columns, each with a gold-ringed number badge, top border connector, title, and description. No overlap possible. On tablet — 2×2 grid. On mobile — single column vertical stack with a left-border connector line running down the left side.

---

## FIX 2 — TRAVEL DROPDOWN GAP

The dropdown is appearing too far below the PillNav. The gap is caused by the dropdown's `top` value being calculated from the wrong anchor — either from the `.pill-nav-container` top edge (which includes the `20px` fixed offset from the top of the viewport) or from an incorrect `top: 3em` value leftover from the original PillNav mobile popover CSS.

**The agent makes one CSS change in the Navbar's travel dropdown styles:**

Find the `.travel-dropdown` or equivalent class (whatever the agent named the dropdown container in `Navbar.jsx`). Its current `top` value is wrong. Replace it:

```css
.travel-dropdown {
  position: absolute;
  top: calc(100% + 8px);     /* 8px gap below the pill nav items container */
  left: 50%;
  transform: translateX(-50%);
  /* all other existing styles unchanged */
}
```

The key is `top: calc(100% + 8px)` where `100%` is relative to the `.pill-nav-items` container height — so the dropdown sits exactly 8px below the bottom edge of the pill bar, regardless of the navbar's own position on screen.

**The dropdown must be positioned relative to `.pill-nav-items`, not `.pill-nav-container`:**

```css
.pill-nav-items {
  position: relative;    /* ← this must be set — dropdown is a child of this element */
}
```

If the dropdown is currently a child of `.pill-nav-container` or of `Navbar.jsx`'s outer wrapper div, move it inside the `.pill-nav-items` div in the JSX. That makes `top: calc(100% + 8px)` measure from the bottom of the pill bar, not from anywhere else.

---

## FIX 3 — CONTACT FORM DATE RANGE PICKER

The current `Travel Dates` field is a plain text input. Replace it with two `<input type="date">` fields styled to look like one unified range field — same pattern as the Trip Search box on the homepage.

**The agent replaces the single travel dates input in `ContactForm.jsx` with this:**

**Markup structure:**

```jsx
<div className={styles.dateRangeWrapper}>
  <div className={styles.dateField}>
    <label htmlFor="departure_date">Departure</label>
    <input
      type="date"
      id="departure_date"
      name="departure_date"
      min={new Date().toISOString().split('T')[0]}   /* no past dates */
    />
  </div>
  <span className={styles.dateSeparator}>→</span>
  <div className={styles.dateField}>
    <label htmlFor="return_date">Return</label>
    <input
      type="date"
      id="return_date"
      name="return_date"
      min={new Date().toISOString().split('T')[0]}
    />
  </div>
</div>
```

**CSS:**

```css
.dateRangeWrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-button);
  padding: 10px 14px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.dateRangeWrapper:focus-within {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(197, 151, 58, 0.12);
}

.dateField {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dateField label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-stone);
  letter-spacing: 0.04em;
  margin-bottom: 2px;
}

.dateField input[type="date"] {
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-ink);
  padding: 0;
  width: 100%;
  cursor: pointer;
}

/* Style the calendar icon to match gold */
.dateField input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.4;
  cursor: pointer;
  filter: invert(0);
}

.dateField input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 0.8;
}

.dateSeparator {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-stone);
  flex-shrink: 0;
}

/* Mobile: stack the two date fields vertically */
@media (max-width: 560px) {
  .dateRangeWrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .dateSeparator {
    transform: rotate(90deg);
    align-self: center;
  }

  .dateField {
    width: 100%;
  }
}
```

**Logic — departure date constrains return date minimum:**

Add a small `onChange` handler on the departure field:

```jsx
const [departureDate, setDepartureDate] = useState('');

// On departure input change:
onChange={(e) => {
  setDepartureDate(e.target.value);
}}

// On return input, set min dynamically:
min={departureDate || new Date().toISOString().split('T')[0]}
```

This prevents the user from selecting a return date before their departure date.

**EmailJS field name mapping** — update both field names so they serialize correctly when EmailJS is activated:

```
departure_date  →  name="departure_date"
return_date     →  name="return_date"
```

These replace the single `travel_dates` field from the original form spec. If the EmailJS template was already built with `travel_dates`, the agent combines them before sending:

```js
// Before emailjs.sendForm(), inject a combined field:
const combined = `${form.departure_date.value} → ${form.return_date.value}`;
// Pass as travel_dates in the template params
```