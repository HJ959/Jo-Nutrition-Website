# Code Review: Jo-Nutrition-Website

Date: 2026-11-27. Scope: `src/`, both webpack configs, `package.json`, committed `dist/` and `dev/`.

## How this was reviewed
- Read all HTML for `index`, `contact` and `podcast`, and the head and heading structure of the other pages (grep).
- Read `main.css`, `contact.css`, `nutritional-therapy.css`, `scripts.js`, `index.js`, `about.js`, `consultations.js`, both webpack configs, and the committed `dist/` output.
- **Not done:** no build (there is no `node_modules` in the checkout), no browser, no Lighthouse, no screen reader. Items marked *unverified* need a browser check. Contrast ratios were calculated by hand from the CSS colour values.

## Verdict
The site is small and easy to follow. The earlier clean-up in `kiro-notes.md` fixed real problems (broken JSON-LD, form labels, canonicals). The remaining risk is concentrated in four places: pinch-zoom is disabled, the load overlay blocks all content until every image has loaded, images are heavy and unsized, and the prod build may drop `robots.txt`, `sitemap.xml` and the favicons.

## Priority 1: fix first

### 1. Pinch zoom is disabled on all 8 pages
`<meta name="viewport" content="..., maximum-scale=1.0">` is in every HTML file (line 7). This fails WCAG 1.4.4 (Resize Text) and blocks low-vision visitors on phones.
**Fix:** use `content="width=device-width, initial-scale=1.0"`.

### 2. Load overlay hides the whole page until `window.load`
`scripts.js:1-4` removes `#loadOverlay` on `load`, which fires only after all images, fonts and the Spotify iframe resolve. Effects:
- LCP is pushed to the slowest asset, not the hero image.
- If JS fails or is blocked, the page stays white for good (no `<noscript>` fallback).
- The overlay duplicates its style inline in every HTML file and in `main.css:19-30`.
**Fix:** remove the overlay. If a fade-in is wanted, use a CSS-only approach that does not depend on JS. Removing it is the simplest option and the one I recommend.

### 3. Prod build may not ship `robots.txt`, `sitemap.xml` or favicons *(unverified, needs a build)*
- `build-prod` copies those files into `dist/` and then runs webpack with `output.clean: true` (`webpack.prod.config.js:26`). Webpack's clean step deletes files in the output folder that are not webpack assets.
- The committed `dist/` has no `robots.txt`, `sitemap.xml`, `favicon.ico` or other favicon files, although `src/` has them. This is consistent with them being deleted.
- The HTML has no `<link rel="icon">` tags, so browsers fall back to `/favicon.ico`, which would be a 404.
**Fix:** run the copy step after webpack (or use `copy-webpack-plugin`, which keeps files in the build graph), and add explicit `<link rel="icon">`, `apple-touch-icon` and manifest links. Then confirm `dist/` contains the files.
**Also check:** which build command Netlify runs. If Netlify builds on deploy, the committed `dist/` is irrelevant. If it publishes `dist/` as committed, the live site is missing these files now.

### 4. Hero and content images are large and unsized
| File | Size | Used on |
|---|---|---|
| `JoImageNutrition.jpg` | 811 KB | nutritional-therapy |
| `JoImageHome.jpg` | 520 KB | index (LCP image), also `og:image` on every page |
| `JoImageAbout.jpg` | 472 KB | about |
| venue PNGs (3) | 126, 137, 167 KB | consultations, nutritional-therapy (each page loads all 3) |

None of the `<img>` tags have `width`/`height`, `srcset`/`sizes`, WebP/AVIF, or `fetchpriority="high"` on the hero. The venue slides are below the fold but not `loading="lazy"`.
**Fix:** `sharp` is already a devDependency. Add a one-off script to produce WebP (and 800/1200 px widths) from `src/media`, then update the `<img>` tags. Expect each photo to drop to roughly 40-120 KB (estimate, measure after converting).

### 5. The fixed header and footer can hide focused elements *(unverified)*
`.topnav` and `footer` are `position: fixed`. When a keyboard user tabs to a link or form field near the edge, it may sit under a bar (WCAG 2.4.11 Focus Not Obscured, new in 2.2).
**Fix:** add `html { scroll-padding-block: 80px; }` (tune the value to the bar heights).

## Priority 2: should fix

### 6. Sitemap, canonical and link URLs disagree
- Sitemap: `/about`, `/contact`, ... and `/` for home.
- Canonical and `og:url`: `/about.html`, ..., and `/index.html` for home.
- Nav links: `/about.html`, `/index.html`.
Pick one form. With Netlify, extensionless URLs are the usual choice. The home canonical should be `/`. Update all three places together. Sitemap `lastmod` is 2025-02-03 and has not changed since the 2026 edits.

### 7. `robots.txt` blocks `/media/`
`Disallow: /media/` stops crawlers fetching the `og:image` file (`/media/JoImageHome.jpg`) and image search. It also has no `Sitemap:` line.
**Fix:** remove the `Disallow`, and add `Sitemap: https://joannaoates.com/sitemap.xml`.

### 8. Open Graph image
All 8 pages use `JoImageHome.jpg` (520 KB, portrait or unknown ratio). Link previews work best with a 1200x630 image under about 300 KB. Add `og:site_name` and `twitter:card` while there.

### 9. Global CSS is re-downloaded on every page
Each page's bundle contains `normalize.css` and `main.css` again (about 13.6 KB of the 14-15.6 KB per page, versus 0.5-2 KB of page-specific CSS). Hashes differ per page, so the browser cannot reuse the file between pages.
**Fix:** put the global CSS in one shared chunk with `optimization.splitChunks` (`chunks: 'all'` with a `cacheGroups` entry for the CSS), or one shared entry imported once. HtmlWebpackPlugin picks up split chunks for the entry automatically. Saves about 13 KB per navigation after the first page.

### 10. Mobile menu
- `#burger` has no `aria-expanded` or `aria-controls`, so a screen reader cannot tell if the menu is open.
- The button text is the ligature `menu` from the Material Symbols font. If the font is slow or fails, the word "menu" shows in the nav bar.
- `navMenuMover` sets inline `style.display`. On resize from desktop to mobile the inline `block` values stay, so the menu is open after resizing down (`scripts.js:14-26`). Real users rarely resize, but rotating a tablet can trigger it.
- Between 901 and 1367 px, `main.css` shows the burger and the links together. `bigWindowMenuShower` forces links visible above 900 px, but the burger is still visible and clicking it hides them. *(unverified)* Likely unintended.
- The 8 nav links plus `margin-left: 2%` may wrap to two rows in the tablet range, so the fixed bar becomes taller than `body { padding-top: 15vmin }` and covers the page heading. *(unverified)*
**Fix:** toggle a class (e.g. `.open`) on `<nav>` and let CSS decide visibility, and update `aria-expanded` in JS.
Replace the icon font with an inline SVG: this removes the second Google Fonts request (Material Symbols is a large font for one glyph).

### 11. Contact form
- Submit button is about 40 px tall (`padding: 10px` plus a 1em font). WCAG 2.2 target size minimum is 24 px (met), the project goal is 44 px (not met).
- `outline: none` on inputs and textarea (`contact.css`). The only focus cue is a border colour change from lilac to navy, which is easy to miss. Use `:focus-visible` with a 2 px outline.
- The email input has no `autocomplete="email"`. The textarea is not `required`, so an empty message can be sent.
- The email and phone number are plain text (`contact.html:56-58`). Make them `mailto:` and `tel:` links; that is the main action on a contact page for mobile visitors.
- The form has both a honeypot and reCAPTCHA (`data-netlify-recaptcha`). reCAPTCHA adds third-party scripts from Google and a puzzle for people who may already be anxious. The honeypot alone is usually enough for a small site. This is the owner's call.
- There is no `action` thank-you page, so Netlify's default success page is shown. Consider a branded one.
- No error or success message on the page.

### 12. Motion without a reduced-motion option
- `.venueSlide` auto-cycles forever (12 s loop) and `.arrow span` animates forever (`nutritional-therapy.css`, `about.css`).
- The repo has no `prefers-reduced-motion` rule.
- The slideshow also has no pause control, which breaches WCAG 2.2.2 (Pause, Stop, Hide) for content moving over 5 s.
**Fix:** wrap the animations in `@media (prefers-reduced-motion: no-preference)`. For reduced motion, show the first image or a static row. A static grid of the 3 venue images would avoid the issue completely and remove the need to load 3 stacked images.

### 13. Landmarks and headings
- No page has `<main>` or `<header>`. Content sits in `<div class="container">`. Screen reader users cannot jump to the main content, and there is no skip link.
- `qualifications.html` has no `<h1>` (it starts at `<h2>`).
- `podcast.html` has no JSON-LD, unlike the other pages (minor).
**Fix:** wrap content in `<main id="main">`, add a skip link as the first element in `<body>`, add an `<h1>` to qualifications.

### 14. Podcast page text
`podcast.html:49-66` is one block of about 250 words in a single `<p>`. Spaces are missing at several joins: "therapy.Through", "life.From", "Quotes"Therapy". The quotes at the end should be a `<blockquote>` or list. Break it into short paragraphs (line length is already capped at 70ch). The iframe uses the obsolete `frameBorder` attribute; use CSS `border: 0`.

## Priority 3: tidy-up

### 15. Fonts
Lexend and Open Sans load from Google Fonts on every page, and use `display=swap`. Per the project's performance principles, self-hosting subsetted WOFF2 files (or a system font stack) removes two third-party connections and gives control over caching. Keep weights to those actually used: Lexend 400/500 and Open Sans 400 only; check that the bold `a` and headings are not synthesised from a missing weight (`main.css` sets `font-weight: bold` on links, but only Open Sans 400 is requested, so the browser fakes the bold).

### 16. CSS
- The `#burger` rule block is duplicated word for word in the mobile and tablet media queries (`main.css`).
- `.arrow` is defined in `main.css` and again in page CSS; `.container` is redefined per page with different grids.
- `.topnav a` has `float: left` inside a flex container, which does nothing.
- `footer` sets `color: var(--white)` but the footer background is near-white; the text colour only matters inside the button.
- `.hidden` (`display:none`) is used for both the load overlay and the honeypot. The name is generic and easy to clash with. Rename once the overlay is gone.
- Colour contrast calculated: white on navy (buttons) is about 4.8:1, navy on near-white (headings, active link) is about 4.8:1. Both pass AA for normal text but with little headroom. Do not lighten `--navy`.
- Typos in class names: `.affilatesLogo`.

### 17. JavaScript
- The burger and resize wiring is copy-pasted into all 8 page entries. Move it into `scripts.js` as one `init()` and import that.
- `window.navMenuMover = navMenuMover` exposes a global with no consumer (no inline handlers use it).
- The scroll handler in `about.js` and `consultations.js` that hides `#arrow` is also duplicated; `nutritional-therapy.js` may need the same (check). Scroll listeners should use `{ passive: true }`.
- Prod JS is tiny (0.6-0.8 KB per page); `module.hot` blocks are removed in the prod bundle.

### 18. Build and repo hygiene
- `webpack.dev.config.js` repeats 8 `HtmlWebpackPlugin` blocks. The prod config already uses a `pages` array. Share one list so a new page cannot be added to only one config.
- The prod entry uses a nested ternary (`webpack.prod.config.js:15`) to map chunk name to file name. Add a `script` field to each `pages` item instead.
- `dev/` and `dist/` are committed, and `dev/` contains stale files (`index.js`, `about.js`, `eatingDisorders.js` next to the `*.bundle.js` files, plus hashed PNGs). Build output in git creates noisy diffs and merge conflicts. If Netlify builds on deploy, add both to `.gitignore` (ask before removing them from git history or the index).
- The dev server binds `host: '0.0.0.0'` with `open: true`, which exposes the dev server to the local network. Use `localhost` unless testing on a phone.
- `clean` uses `rm -R dist/* && rm -R dev/*`: it errors when a folder is empty (the `&&` chain stops) and is not portable to Windows. `output.clean: true` already cleans `dist/`.
- `sharp` is unused. `@babel/core` and `babel-loader` are in `dependencies` rather than `devDependencies`.
- The dev image rule omits `webp`; the prod rule includes it.
- `README.md` does not mention Netlify, the build command used for deploy, or `kiro-notes.md`.
- No `netlify.toml`. It is the right place for the publish directory, the build command, cache headers for the hashed JS/CSS (`Cache-Control: public, max-age=31536000, immutable`), and a custom 404 page. No `404.html` exists.

## Security notes
- No secrets found in the files read. The phone number and email in the HTML are public by design.
- External links already carry `rel="noopener noreferrer"` (per `kiro-notes.md`; spot-checked in `podcast.html`, where the only external reference is the Spotify iframe).
- The Spotify iframe has `allow="... autoplay ..."`. Autoplay is not needed for an embed the visitor presses play on; remove it from the list.
- A Content-Security-Policy and basic security headers (`X-Content-Type-Options`, `Referrer-Policy`) can be set in `netlify.toml` once fonts are self-hosted. Netlify Forms and reCAPTCHA would need to be allowed in the policy.
- `npm audit` was reported clean in `kiro-notes.md` on 2026-05-16. It was not re-run here because `node_modules` is missing; run `npm ci && npm audit` before the next release.

## Suggested order of work
1. Viewport fix (1 line per file, 8 files).
2. Remove the load overlay.
3. Build `dist/` and check `robots.txt`, `sitemap.xml` and favicons exist; fix the copy step; add favicon `<link>` tags.
4. Convert and size images, lazy-load the venue slides, add `fetchpriority="high"` to the home hero.
5. Align sitemap, canonicals and links; fix `robots.txt`.
6. Accessibility: `<main>` and skip link, qualifications `<h1>`, burger as a CSS-class toggle with `aria-expanded`, reduced-motion, focus styles, form fixes.
7. Shared CSS chunk, shared page list in webpack, `netlify.toml` with cache headers and 404.

Items 1 and 2 are small and low-risk. Items 3 and 4 change output files, so run a build and compare sizes before and after.
