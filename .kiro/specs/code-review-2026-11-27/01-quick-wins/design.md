# Phase 1 Design: Quick Wins

Covers R1 to R4 in `requirements.md`.

## What I found in the repo

- Phase 0 is done. `netlify.toml` runs `npm run build-prod`, and `dist/` and `dev/` are untracked. Pushing `src/` is enough to publish, so the assumption in `requirements.md` holds.
- All 8 pages have the same viewport tag on line 7: `width=device-width, initial-scale=1.0, maximum-scale=1.0`.
- All 8 pages have `<div id="loadOverlay" style="position:fixed;inset:0;background:#fff;z-index:9999"></div>` as the first child of `<body>`. The overlay is only removed by `scripts.js:1-4` on `window.load`. With JS off or broken it never goes away.
- `main.css` has two overlay rules: `#loadOverlay` (lines 24-30) and `#loadOverlay.hidden` (lines 32-35). A separate, generic `.hidden { display: none; }` at line 124 is used by the honeypot `<p class="hidden">` in `contact.html:61`.
- `scripts.js` is imported by every page's entry file. Its `load` listener is the only code that touches `#loadOverlay`.
- The only `autoplay` in `src/` is in the Spotify iframe `allow` attribute in `podcast.html:48`.
- No `src/*.html` file has in-page `#anchor` links, so `scroll-padding` only affects keyboard focus and `scrollIntoView`.
- No browser, Playwright or Puppeteer is available here, so R3.1, R3.3 and R4.2 cannot be verified in this session.

## Design

### 1. Viewport tag (R1)

Replace the tag in all 8 files with:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This is a text substitution on one identical line per file. Nothing else in the head changes.

### 2. Remove the load overlay (R2)

Three deletions, no additions:

| File | Remove |
|---|---|
| 8 HTML files | the `<div id="loadOverlay" ...></div>` line |
| `main.css` | the `#loadOverlay` and `#loadOverlay.hidden` blocks |
| `scripts.js` | the `window.addEventListener("load", ...)` block at lines 1-4 |

Keep the generic `.hidden { display: none; }` rule (R2.4). Renaming it to something like `.visually-hidden` or `.honeypot` belongs to Phase 6.

Options considered:

| Option | Pros | Cons |
|---|---|---|
| A. Delete the overlay (recommended) | Less code. Content paints as soon as CSS is ready. Works with JS off | Visitors see the page assemble. See the side effects below |
| B. Keep it, add a `<noscript>` rule to hide it | Fixes the JS-off case only | The overlay still waits for `load`, so LCP stays tied to the slowest asset |
| C. CSS-only fade-in on `body` | Smooth first paint | Adds an animation that needs `prefers-reduced-motion` handling, and delays content by the animation time |

A matches the review's recommendation and the "simple first" principle.

**Side effects of removing the overlay.** The overlay was hiding these. None is fixed in this phase.

| Effect | Where it gets fixed |
|---|---|
| The burger may show the word "menu" until the Material Symbols font loads (the font URL has no `display=swap`). Not confirmed, needs a browser. | Phase 5 R4 replaces the icon font with an inline SVG |
| Images without `width`/`height` push text down as they load. This was already counted as layout shift, but visitors will now see it. | Phase 3 |
| In `npm start` only, `style-loader` injects CSS from JS, so a brief unstyled flash is possible. Production uses extracted CSS in `<head>`, which blocks render, so there is no flash. | Not needed |

**JS-off behaviour (R2.3).** After removal, the full content shows without JS. One gap remains outside this phase: under 900 px wide, `.topnav a { display: none }` and the burger needs JS, so the nav links are unreachable without JS on mobile. This is Phase 5's area. I'm recording it here so it isn't lost.

### 3. Focus not hidden by fixed bars (R3)

**Step 1: verify (R3.1).** Needs a browser. If one is not available, record "not verified", then apply the change anyway, since it has no visible effect on normal pages and the cost of being wrong is low.

**Step 2: the change (R3.2).** Add one rule to `main.css`, directly after the existing `html, body { width: 100%; }` rule, leaving that rule untouched:

```css
html {
    scroll-padding-block: 5rem;
}
```

**Why 5rem.** I estimated the bar heights from the CSS, because I can't measure them here:

| Bar | Calculation | Estimate |
|---|---|---|
| `footer` | 1em top and bottom margin on `p` (32) + 8px top and bottom link padding (16) + 24px line + 2px border | about 74 px |
| `.topnav`, burger row (under 901 px) | 14px top and bottom padding (28) + about 28px icon line + 2px border | about 58 px |
| `.topnav`, link row (1368 px and wider) | 28px padding + 24px line + 2px border | about 54 px |

The larger is the footer at about 74 px, so `5rem` (80 px at the default font size) clears both. `rem` is used so the padding grows with the user's text size, as the bar heights do (their margins and line heights are in `em`). The browser's built-in DevTools element inspector gives the real numbers. If they are above 80 px, raise the value.

`scroll-padding-block` sets the same value top and bottom. Separate top and bottom values would be tighter, but they add a second number to maintain for a 20 px difference.

**Known limitation.** The padding cannot cover the mobile menu when it is open. Opened, it is up to about 8 × 52 px = 416 px tall plus the burger row, and the page doesn't know its height. R3.3 will be checked with the menu closed, which is the default state. Phase 5 R7 (Escape closes the menu) improves this case. I'm not adding JS-measured padding for it, because that conflicts with "simple first".

**Browser support.** `scroll-padding-block` is supported in Chrome 69+, Firefox 68+ and Safari 14.1+. All sit inside the project's `browserslist`. No fallback is needed.

**Step 3: check (R3.3).** In a browser, with the menu closed, tab through every link and control on `contact` and `index` at three widths (390, 1024 and 1440 px). Also do it with the page zoomed to 200%. Note any element whose edge touches either bar. Needs the user if I have no browser.

### 4. Spotify `allow` (R4)

In `podcast.html:48`, change

```
allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
```

to

```
allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
```

Only `autoplay` is removed. Playing after a click is a user gesture and doesn't need the `autoplay` permission (R4.2 still needs a browser to confirm). `allowfullscreen=""` duplicates `fullscreen` in `allow` but is harmless, so I'm leaving it. Cleaning it up would be an unrequested change.

## Order of work

1. R1 and R4, which are one-line edits.
2. R2: HTML, then CSS, then JS. Grep after each.
3. R3 verify step, then the CSS rule.
4. Build and grep `dist/`.

Each requirement is its own commit so any one can be reverted alone.

## Risks

| Risk | Mitigation |
|---|---|
| Removing the overlay exposes the "menu" text flash or image layout shift | Listed above with the phase that fixes each. Visible but cosmetic |
| `5rem` is too small for a real bar height | Measure in DevTools when a browser is available. Raising the number is a one-line change |
| A deleted line isn't identical in one HTML file and the grep misses it | Grep checks in the verification section run on `src/` and on the built `dist/` |
| `.hidden` is deleted by mistake with the overlay rules | R2.4. After editing, check that `contact.html` still has `class="hidden"` and `main.css` still has `.hidden {` |

## Verification

Run from the repo root:

```
grep -rn "maximum-scale\|user-scalable\|loadOverlay\|autoplay" src/
```

Expected: no output.

```
grep -n "^\.hidden" src/main.css && grep -n 'class="hidden"' src/contact.html
```

Expected: one match each (R2.4).

```
npm run build-prod
grep -rln "maximum-scale\|loadOverlay\|autoplay" dist/
ls dist/*.html | wc -l
```

Expected: build exits 0, grep prints nothing, and the count is 8. Report CSS and JS sizes before and after. A few hundred bytes saved in `main.css` and `scripts.js` is expected, and each HTML page loses about 90 bytes.

Report the results in two lists:

- **Checked with grep and build:** R1.1, R1.2, R2.1, R2.2, R2.4, R3.2, R4.1.
- **Needs a browser and is not verified here:** R2.3 (JS off), R3.1, R3.3, R4.2. If I can't get a browser, I'll give the user the steps in sections 3 and 4 to run.

Lighthouse is not part of this phase.
