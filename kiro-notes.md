# Jo Nutrition Website — Kiro Notes

## Changes made (2026-05-16)

### Security & correctness fixes
- Contact form `email` field changed from `type="text"` to `type="email"` with `required` and proper `for`/`id` label association
- Broken JSON-LD on `consultations.html` (unclosed `]`) — fixed
- Broken `<style>` tag in `qualifications.html` (unclosed tag + duplicate inline style) — removed, styles moved to CSS
- All external links now have `rel="noopener noreferrer"` (prevents tab-napping)
- `loadOverlay` inline styles removed — now handled purely in CSS

### SEO improvements
- All page titles improved (were generic like "Eating Disorders", "Contact" — now descriptive with brand name)
- `podcast.html` had the wrong title ("Eating Disorders") — fixed
- Empty `<meta name="description">` on eating-disorders, podcast, and contact pages — all filled in
- Open Graph tags (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`) added to all 8 pages
- `<link rel="canonical">` added to all 8 pages
- Schema.org `@context` updated from `http://` to `https://` across all pages

### Accessibility & HTML quality
- Burger `<span>` replaced with semantic `<button>` with `aria-label="Toggle navigation menu"`
- `aria-current="page"` added to the active nav link on each page
- Missing `<footer>` added to `contact.html`

### JavaScript modernisation
- `scripts.js`: `var` loops replaced with `for...of`, removed `console.log`, resize handler now debounced
- `about.js` / `consultations.js`: duplicate scroll listeners collapsed into one debounced handler with null guard

### Build improvements
- `mini-css-extract-plugin` installed — production build now outputs separate `.css` files instead of inlining styles into JS (better caching, faster paint)
- Output filenames now include `[contenthash:8]` for cache-busting
- `webp` added to the image asset rule
- `browserslist` added to `package.json`, `.babelrc` updated to use it
- `npm audit`: 0 vulnerabilities

### Files modified
- `src/index.html`
- `src/about.html`
- `src/eating-disorders.html`
- `src/nutritional-therapy.html`
- `src/consultations.html`
- `src/qualifications.html`
- `src/contact.html`
- `src/podcast.html`
- `src/main.css`
- `src/scripts.js`
- `src/about.js`
- `src/consultations.js`
- `webpack.prod.config.js`
- `.babelrc`
- `package.json`
