# Project Summary: Jo-Nutrition-Website

Static, multi-page marketing site for Joanna Oates (nutritional therapist and psychotherapist, eating disorders specialist). Live domain: `https://joannaoates.com`. Plain HTML/CSS with a small amount of vanilla JS, bundled by Webpack 5. No framework.

## Stack
- Node + npm (README says `nvm use node`, then `npm i`).
- Webpack 5, `html-webpack-plugin`, `babel-loader` with `@babel/preset-env` (targets from `browserslist` in `package.json`).
- Dev: `style-loader` injects CSS via JS. Prod: `mini-css-extract-plugin` emits hashed `.css` files.
- `sharp` is in devDependencies but nothing in the repo uses it.
- Node 26 locally (v26.5.0) and on Netlify (`NODE_VERSION = "26"` in `netlify.toml`). There is no `.nvmrc`.
- Hosted on Netlify. Netlify builds on every push to `main`. `netlify.toml` sets `command = "npm run build-prod"` and `publish = "dist"`, and overrides the dashboard, which still shows "Build command: Not set". Pushes to other branches are not built: Deploy Previews need a pull request, and branch deploys are off.
- The contact form uses Netlify Forms (`netlify-honeypot`). Netlify detects it in the built `dist/contact.html`. There is no `_redirects` file, and `netlify.toml` has no headers or redirects yet.
- Fonts and icons come from Google Fonts: Lexend, Open Sans, Material Symbols Outlined.

## Commands
| Command | What it does |
|---|---|
| `npm start` | `build-dev`, then webpack dev server on `0.0.0.0:8080` (HMR, polling 1s, watches `src/**/*.html`) |
| `npm run build-dev` | Copies `src/media` and `src/favicon_io` into `dev/`, then builds with `webpack.dev.config.js` |
| `npm run build-prod` | Builds with `webpack.prod.config.js` (content-hashed JS/CSS, minified HTML), then copies media, favicons, `robots.txt` and `sitemap.xml` into `dist/`. The copies must run after webpack, because `output.clean: true` empties `dist/` first. This is the command Netlify runs |
| `npm run build-all` | `clean`, then prod, then dev |
| `npm run clean` | `rm -R dist/* && rm -R dev/*`, then recreates the media folders (destructive, ask before running). It fails if `dist/` or `dev/` doesn't exist |

## Layout
```
.
├── src/                    Source of truth
│   ├── *.html              8 pages (templates for HtmlWebpackPlugin)
│   ├── *.js                One entry per page + shared scripts.js
│   ├── *.css               normalize.css, main.css (global), one CSS file per page
│   ├── media/              Photos, venue images, accreditation logos
│   ├── favicon_io/         Favicons, site.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
├── dev/                    Dev build output (git-ignored, created by build-dev)
├── dist/                   Prod build output (git-ignored, built by Netlify on deploy)
├── netlify.toml            Build command, publish dir, Node version
├── webpack.dev.config.js   Explicit per-page plugin list
├── webpack.prod.config.js  `pages` array drives entries and HTML plugins
├── .babelrc
├── kiro-notes.md           Log of earlier changes (2026-05-16)
└── README.md
```

## Pages
Each page has `src/<name>.html`, `src/<name>.js` and `src/<name>.css` (except where noted).

| Page | Webpack chunk | Notes |
|---|---|---|
| `index.html` | `index` | Hero photo, intro, "Book a discovery call" footer link |
| `about.html` | `about` | Scroll listener hides `#arrow` |
| `eating-disorders.html` | `eatingDisorders` | JS/CSS files are `eating-disorders.*` |
| `nutritional-therapy.html` | `nutritionalTherapy` | JS/CSS files are `nutritional-therapy.*`. Venue image slides |
| `consultations.html` | `consultations` | Largest page (9.5 KB), venue slides, JSON-LD, scroll listener |
| `qualifications.html` | `qualifications` | Accreditation logos (BANT, NCFED, CNHC, Beeleaf) |
| `podcast.html` | `podcast` | Lazy-loaded podcast iframe |
| `contact.html` | `contact` | Netlify form with honeypot |

The chunk name (camelCase) differs from the file name (kebab-case) for two pages. The mapping lives in `webpack.prod.config.js`, where the entry path uses a ternary, and in `webpack.dev.config.js`. A new page must be added to both configs.

## JavaScript
- `scripts.js` (shared): hides `#loadOverlay` on `window.load`. Exports `navMenuMover` (burger toggle, sets inline `display` on `.collapsable` links) and `bigWindowMenuShower` (debounced, shows the nav above 900px).
- Each page entry imports `normalize.css`, `main.css` and its own CSS, then wires up the burger and the resize handler. This block is copy-pasted per page.
- Each entry includes a `module.hot.accept()` block for dev HMR. It is stripped from the prod bundle (checked in `dist/index.*.js`).

## CSS
- `main.css` holds the palette as custom properties (`--green`, `--purple`, `--navy`, `--grey`, `--white`, `--black`, plus `-fade` variants), the load overlay, base typography, and shared helper classes (`.dropShadow`, etc.).
- Per-page CSS is small (0.5 to 2 KB each).
- Class names are camelCase (`.joImageAbout`, `.venueSlide`, `.consultLists`).

## Page template conventions
- `<nav class="topnav">` with a `<button id="burger">` and 8 `a.collapsable` links. The current page has `class="active"` and `aria-current="page"`.
- `#loadOverlay` white div covers the page until `load` fires.
- Each page has a unique title, meta description, canonical URL, Open Graph tags and a JSON-LD block.
- Internal links are root-relative with `.html` (for example `/about.html`). Images use relative `media/...` paths.

## SEO files
- `sitemap.xml`: 8 URLs, last modified 2025-02-03, generated at xml-sitemaps.com (per README).
- `robots.txt`: `User-agent: *`, `Allow: /` and `Sitemap: https://joannaoates.com/sitemap.xml`. Live since 2026-11-27. Before that, the build never shipped it.

## Build output
- `dist/` (44 files): 8 minified HTML pages, `<chunk>.<hash>.js` (about 0.6 to 0.8 KB each), `<chunk>.<hash>.css` (about 14 to 15.6 KB each), `media/` (11 files), 6 favicons, `site.webmanifest`, `robots.txt`, `sitemap.xml`. Two consecutive builds give the same file list.
- `dev/`: unminified bundles (about 55 KB each).
- `.gitignore` lists `node_modules`, `.DS_Store`, `dist/` and `dev/`. Build output was untracked on 2026-11-27 (`d1eef37`) and is still in git history.
- Live checks (2026-11-27): all 8 pages, `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/site.webmanifest` and `/media/` images return 200. `site.webmanifest` is served as `application/octet-stream`.

## Observations (not acted on)
These were noticed while mapping. None have been changed.

1. **Sitemap and canonical mismatch.** Sitemap URLs have no extension (`/about`), but canonicals and nav links use `/about.html`. Netlify's default "Pretty URLs" setting may serve both forms, which would give two URLs per page. Check the Netlify dashboard setting before changing either side.
2. ~~**`robots.txt` blocks `/media/`.**~~ Fixed 2026-11-27 (`5f0e64b`): it now allows everything and lists the sitemap.
3. **Viewport `maximum-scale=1.0`** on `index.html` (check the other pages) stops pinch zoom, which fails WCAG 1.4.4.
4. **Unoptimised images.** `JoImageNutrition.jpg` is 811 KB, `JoImageHome.jpg` 520 KB, `JoImageAbout.jpg` 472 KB, and the venue PNGs are 126 to 167 KB each. There is no `srcset`, WebP/AVIF, `width`/`height`, or `fetchpriority` on the hero. `index.html` is the page where the hero is the LCP element. `sharp` is installed but unused.
5. **Render-blocking third-party CSS.** Two Google Fonts stylesheets load on every page, including the full Material Symbols font for a single menu icon.
6. **Load overlay hides content until `window.load`.** This delays visible content until all images are fetched, which hurts LCP. If JS fails, the overlay never hides. `index.html` also inlines the overlay style, duplicating `main.css`.
7. **Duplicated per-page JS.** The burger and resize wiring is repeated in all 8 entries.
8. **Webpack config duplication.** The dev config lists pages by hand, while the prod config uses a `pages` array. They can drift apart.
9. **Dev build lacks `robots.txt` and `sitemap.xml`**, and the dev image rule omits `webp`.
10. ~~**Committed build output.**~~ Fixed 2026-11-27 (Phase 0): `dist/` and `dev/` are git-ignored, and Netlify builds `dist/`.
11. **No custom 404 page.**
12. **Typos in copy and class names**: "Joanna oates" (lowercase "o") on `index.html`, `.affilatesLogo`.

## Working agreements for future changes
- Edit `src/` only. Do not hand-edit `dev/` or `dist/`, and do not commit them.
- A push to `main` deploys to production, so ask before pushing. To check a change before it goes live, open a pull request and use its Netlify Deploy Preview.
- Keep plain HTML/CSS/vanilla JS. Ask before adding a dependency or framework.
- Adding a page means: new `src/<name>.{html,js,css}`, an entry in both webpack configs, a nav link on every page, a `sitemap.xml` entry, and a build check.
- After changes, run `npm run build-prod` and report asset sizes. Lighthouse and a browser are not available in this environment unless confirmed otherwise.
- Ask before running `npm run clean`, `npm audit fix --force`, or anything that deletes files.
