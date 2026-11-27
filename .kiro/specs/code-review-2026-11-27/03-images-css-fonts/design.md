# Phase 3 Design: Images, Shared CSS and Fonts

Covers R1 to R3 in `requirements.md`. No source files have been changed yet. Everything below comes from reading the repo and running read-only checks.

## What I found in the repo

**Images**
- Images are plain `media/...` paths in the HTML. Webpack does not process them. `npm run build-prod` and `build-dev` copy `src/media/*` as-is (`cp -r`). New WebP files in `src/media` will therefore reach both outputs with no webpack change. The `webp` addition to the dev image rule (R1.6) is for parity only.
- Photos are square and huge: `JoImageHome.jpg` 3300x3301 (520 KB), `JoImageAbout.jpg` 3575x3575 (472 KB), `JoImageNutrition.jpg` 3502x3502 (811 KB). The three venue PNGs are 640x427 (126 to 167 KB). `og-image.jpg` is 1200x630 (41.6 KB) and stays JPEG, because social crawlers handle it best.
- Displayed sizes, from the CSS:

| Image | Page(s) | CSS width |
|---|---|---|
| `JoImageHome` | index | `75vmin` up to 1050 px viewport, `70vmin` above (`index.css`) |
| `JoImageAbout` | about | `80vw`, `40vw` from 1200 px (`about.css`) |
| `JoImageNutrition` | nutritional-therapy | `min(40vmax, 500px)` |
| 3 venue PNGs | consultations, nutritional-therapy | fill a 4:3 box at 90% width, `object-fit: cover` |
| 3 PNG logos (`ncfed`, `beeleaf`, `cnhc`) | qualifications | 399x90, 360x83, 626x101 |
| `bant.webp` | qualifications | already WebP |
| West London Therapy Hub logo | qualifications | hotlinked from `westlondontherapyhub.co.uk`, `style="width:100%"` |

- `NEDDE LOGO 2 with layers -inverted copy.webp` (25 KB) is in `src/media` but no HTML file uses it. It is copied to `dist/` and never requested. I will leave it alone.
- No `<img>` has `width`, `height`, `srcset` or `loading`. All have `alt`.
- **Browser support (R1.8).** I ran `browserslist` against `caniuse-lite`. Of the current targets, only `kaios 2.5` lacks WebP, and that data is flagged "partial". The rest, including `op_mini` and iOS Safari 18+, support it. **Decision: no `<picture>` fallback.** The `<img src>` points at the 800 px WebP, so any browser that can't use `srcset` still gets an image.

**CSS**
- `webpack.prod.config.js` gives each page its own CSS file. Each one repeats `normalize.css` and `main.css`, so every `dist/*.css` is 13.4 to 15.5 KB and most of that is shared. The CSS is not minified: there is no CSS minimizer in the config. Decision 4 adds one (section 2b).
- `HtmlWebpackPlugin` is set to `chunks: [p.chunk]`. A shared chunk will not be injected unless it is added to that list.
- `webpack.pages.js` now has 9 entries, including `notFound` (the 404 page). The shared CSS must apply to it too.

**Fonts**
- **Lexend is not used.** `font-family` appears only in `main.css:39` (`'Open Sans', sans-serif`) and `font-family: inherit` in `contact.css`. No CSS or HTML refers to Lexend, yet every page downloads it (weights 400 and 500) from Google Fonts. Headings use Open Sans too.
- Open Sans is requested at one weight (400, the default for `family=Open+Sans`). The CSS asks for heavier weights in three places: `a { font-weight: bold }` (all links, including the nav), `ul li::before { font-weight: bolder }`, and the browser default bold on `h1`/`h2`. With only a 400 file, the browser **synthesises bold** on all of these. The footer button uses `font-weight: 500`, which renders as 400.
- Google Fonts is reachable from this machine, so the font files can be fetched here.
- The Material Symbols request stays (Phase 5 removes it). That means `fonts.googleapis.com` and `fonts.gstatic.com` are still contacted for the icon. R3.4 only covers Lexend and Open Sans, so the preconnect tags stay.

## Design

### 1. Image pipeline (R1)

**Script: `scripts/optimise-images.js`**, run with a new npm script `"images": "node scripts/optimise-images.js"`. It uses `sharp` 0.33.5, already in `devDependencies`, so no new dependency.

| Input | Output (written next to the original in `src/media/`) |
|---|---|
| `JoImageHome.jpg`, `JoImageAbout.jpg`, `JoImageNutrition.jpg` | `<name>-800.webp`, `<name>-1200.webp` |
| `reception-1r_.png`, `06-the-woodland-room-4r.png`, `07-the sunshine-room-5.png` | one `.webp` at the native 640 px, with the space removed from the sunshine-room name |

- Settings: `rotate()` (apply EXIF orientation), `resize({ width, withoutEnlargement: true })`, `webp({ quality: 80 })`. Sharp drops EXIF and GPS metadata by default, so this also removes any location data embedded in the photos.
- Venue images get one size only. The source is 640 px wide, so an 800 or 1200 px version would be an upscale with no gain. R1.2 says "photos", and I read that as the three portraits. With one size there is no `srcset` (R1.3 asks for it only where more than one size exists).
- The three PNG logos (4 to 6 KB each) are not converted. The saving is a few KB, and the logos get `width` and `height` only.
- Originals are never overwritten. The script only writes `.webp` files and prints each output's width, height and size, which I use for the HTML attributes.
- **The WebP files are committed.** The Netlify build then needs no image step and cannot fail on `sharp`. The cost is a few more files in git.
- I will open a few outputs with the image viewer to check for visible artefacts before committing. If quality 80 shows banding on skin tones, I'll raise it and say so.

**HTML.** Home image as an example:

```html
<img class="homeImage dropShadow"
     src="media/JoImageHome-800.webp"
     srcset="media/JoImageHome-800.webp 800w, media/JoImageHome-1200.webp 1200w"
     sizes="(max-width: 1050px) 75vmin, 70vmin"
     width="1200" height="1201"
     fetchpriority="high"
     alt="Image of Joanna Oates">
```

| Image | `sizes` | Loading |
|---|---|---|
| Home (LCP) | `(max-width: 1050px) 75vmin, 70vmin` | `fetchpriority="high"`, no `loading` attribute (R1.4) |
| About | `(min-width: 1200px) 40vw, 80vw` | `loading="lazy"` is not set. It is the main image of the page and the heading above it is short, so it is likely in the first viewport on phones |
| Nutrition | `min(40vmax, 500px)` | `loading="lazy"`. It sits below two paragraphs |
| Venue (6 tags, 2 pages) | none | `loading="lazy"` (R1.5) |
| Logos | none | `loading="lazy"` |

`width` and `height` come from the script output (actual pixel size of the 1200 px file, for example 1200x1201 for the home image).

**One CSS risk with `width`/`height` attributes.** If the CSS sets only `width`, the `height` attribute still applies and **stretches the image**. These rules already have `height: auto` (`.homeImage`, `.joImageAbout` in both `about.css` and `nutritional-therapy.css`), and `.venueSlide` sets both. I will check the `.logos` and `.affilatesLogo` rules and add `height: auto` where it is missing. The build check below confirms every sized image has it.

**Hotlinked West London Therapy Hub logo.** It is not ours, so I can't make a local copy without the owner's permission. I will add `loading="lazy"` and, if I can read its real dimensions from the remote file, `width` and `height`. Otherwise it stays as is and I note it. I won't change the source.

**Build files.**
- `webpack.dev.config.js` image rule: `png|svg|jpg|jpeg|gif` becomes `png|svg|jpg|jpeg|gif|webp` (R1.6).
- No other build change. `cp -r src/media/*` already ships the new files to `dist/media` and `dev/media`.

### 2. Shared CSS chunk (R2)

In `webpack.prod.config.js`:

```js
optimization: {
  splitChunks: {
    cacheGroups: {
      sharedStyles: {
        name: 'shared',
        test: /[\\/]src[\\/](normalize|main)\.css$/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
},
```

and each `HtmlWebpackPlugin` gets `chunks: ['shared', p.chunk]`. The shared chunk is listed first, so its `<link>` comes before the page CSS and the cascade order stays `normalize`, `main`, page. That matches what each page has now.

- `test` names the two files, so no JS is pulled into the chunk. `scripts.js` is shared JS but is tiny (about 0.6 to 0.8 KB per bundle), and I'm not splitting it.
- Output is `shared.<hash>.css`, referenced by all 9 pages (R2.1, R2.3). Page CSS files shrink to the per-page rules (R2.2).
- `[contenthash:8]` is already in the filename template. The hash depends only on the file's content, so it stays the same when only a page CSS changes (R2.4). I will confirm by building, editing one page CSS, and building again.
- **Possible empty `shared.<hash>.js`.** A chunk holding only CSS modules should not emit a JS file, but I haven't confirmed this on webpack's current version. If it does emit one, `HtmlWebpackPlugin` would inject an empty `<script>`. I'll check `dist/` after the first build and, if needed, filter it out in the plugin's `scriptLoading`/`excludeChunks` options or drop `.js` for that chunk.
- **Dev build is unchanged.** It uses `style-loader`, which injects CSS from JS, so there is no CSS file to share.
- **Offline equivalence check, standing in for screenshots (R2.6).** For each page, concatenating the new `shared.css` and page CSS must be byte-identical to the old single `dist/<chunk>.css`. This proves that the CSS rules and their order are unchanged. It does not prove the rendering, because the browser is not available. The visual result is reported as "not visually verified" (see Verification). **This check runs before the minifier in 2b is switched on**, because minified output is no longer byte-comparable.

### 2b. CSS minification (decision 4)

- Add `css-minimizer-webpack-plugin` to `devDependencies` (build-only, approved). Check its version supports the installed webpack 5 and Node 26, and review `git diff package-lock.json`.
- In `webpack.prod.config.js`: `optimization.minimizer: ['...', new CssMinimizerPlugin()]`. The `'...'` keeps webpack's default JS minimizer.
- Prod only. The dev build is unchanged.
- Order of work: split the CSS, run the byte-for-byte check, then enable the minimizer and record the sizes separately, so the gain from each step is clear.
- Since the minimizer can rewrite rules (merge, shorten values), I'll compare the minified CSS to the unminified CSS by parsing both and diffing the rule lists where practical, and report any difference. This is still not a visual check.

### 3. Self-hosted fonts (R3)

**Fetch.** Request `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap` with a modern browser `User-Agent` so Google returns WOFF2, then download the file(s) from the `/* latin */` block. Google already splits each family into `latin`, `latin-ext`, `cyrillic` and so on, so the `latin` block is the subset. It covers U+0000-00FF (basic Latin and Latin-1, so accents), U+2000-206F (curly quotes, dashes, ellipsis, bullet), U+20AC (euro), U+2122 and a few more. I will scan `src/*.html` for characters outside that range and report the result. If any are found, I add the `latin-ext` file. No `pyftsubset` or new npm package is needed.

- Open Sans is a variable font on Google Fonts. If the response gives the same URL for 400 and 700, I ship that **one** file and declare `font-weight: 400 700`. Otherwise, I ship two static files. I'll record the real file names and byte sizes (R3.6).
- Files go in `src/fonts/`, with a short `LICENSE.md` noting the SIL Open Font License 1.1 and the source (R3.8). Open Sans is published under the OFL on Google Fonts. I'll confirm that from the font's page before recording it, and record what I saw.

**`@font-face`** goes at the top of `main.css`, which becomes part of the shared chunk:

```css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url('/fonts/open-sans-latin.woff2') format('woff2');
}
```

- The URL is root-relative (`/fonts/...`). `css-loader` leaves root-relative URLs alone, so webpack does not rename the file. I'll confirm that on the installed version when building. The font file therefore has a stable name, and the HTML preload can use the same URL as the CSS. The alternative is a hashed name, but then the HTML templates can't know the name without adding `html-loader`, which is a new dependency.
- `'Open Sans', sans-serif` in `body` stays as is.
- Build scripts copy the folder like they do for `media/`: `cp -r src/fonts dist/fonts` in `build-prod`, and `cp -r src/fonts dev/fonts` in `build-dev`.
- Caching: Netlify's default for these files is `max-age=0, must-revalidate`, which still revalidates with an ETag. Fonts rarely change, so I'd add a `[[headers]]` rule for `/fonts/*` with `Cache-Control = "public, max-age=2592000"` (30 days) in `netlify.toml`. It is not `immutable`, because the filename is not hashed.

**Bold (R3.5).**

| Option | Result |
|---|---|
| A. Ship the real 700 weight (recommended) | Headings, links and nav get genuine bold. They will look slightly different from today's synthesised bold, usually cleaner. The CSS stays untouched. |
| B. Change the CSS to 400 only | Removes bold from every heading and link. A visible design change. |

Option A is what the page appears to intend. The 500 weight on the footer button still renders as 400, as now.

**Preload (R3.3).** One tag in the `<head>` of every page, before the stylesheet links:

```html
<link rel="preload" href="/fonts/open-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
```

`crossorigin` is required even for same-origin fonts, or the browser downloads the file twice. If Google returns two static files, I preload only the 700 file. The nav links and the main heading are bold, so that is the text that appears first.

**Removing Google Fonts for Open Sans and Lexend (R3.4).** Delete the Lexend/Open Sans `<link href="https://fonts.googleapis.com/css2?family=Lexend...">` tag from the 9 HTML files (8 pages plus `404.html`). Keep the Material Symbols `<link>` and the two `preconnect` tags, because the icon still needs them.

**Lexend (R3.2).** Not shipped (decision 1), since no CSS rule uses it. I'll say so in the results and note that R3.2 is met for Open Sans only.

## Risks

| Risk | Mitigation |
|---|---|
| `height` attribute distorts an image where CSS sets only `width` | Check every `<img>` rule. Add `height: auto`. A script check lists any sized `<img>` whose class lacks it |
| Real bold changes the look of headings and links | Called out as Option A. I can't view the result here, so the user checks it on the deploy preview |
| WebP at quality 80 shows artefacts on the portraits | Open the outputs in the image viewer. Raise quality if needed |
| `sizes` is wrong, so the browser picks a larger file than needed | `vmin` and `vmax` units are valid in `sizes`. I derived each value from the CSS above. The 1200 px file is the largest, so a 1440 px-wide desktop at 2x pixel density gets a slightly soft image. Accepted, and it follows R1.2 |
| `shared` chunk breaks the load order or leaves an empty `<script>` | Inspect built `dist/*.html` for all 9 pages. Run the byte-for-byte CSS check |
| `css-loader` rewrites `/fonts/...` | Build, then grep `dist/*.css` for `/fonts/open-sans` and confirm no hashed copy appears in `dist/` |
| Missing glyphs outside the `latin` subset | Scan the HTML for characters outside the covered ranges. Add `latin-ext` if any |
| The CSS minimizer changes a rule's meaning | Run the equivalence check before enabling it, then compare rule lists after. Flag the pages to check on the deploy preview |
| New devDependency fails on Netlify's Node 26 | Check the package's supported Node versions and run `npm ci && npm run build-prod` in a temp clone |
| Netlify's `/*.css` immutable header covers `shared.<hash>.css` | Intended. The hash changes with the content |
| Page weight table counts only local files | External requests (Google Fonts for icons, the WLTH logo) are listed separately, not measured |

## Verification

**Before any change** (R1.1, R2.5): run `npm run build-prod` on the current tree and record, into `03-images-css-fonts/measurements.md`:
1. Size of each file in `src/media` (`ls -l`).
2. For each of the 9 pages: bytes of HTML, its CSS, its JS and its local images, raw and gzipped (`gzip -c | wc -c`). This is "page weight" here. There is no browser, so these are file sizes, not measured transfer. Gzip is a proxy for what Netlify sends.

**After**, the same tables and a before/after diff (R1.7, R2.5), plus:

```
# R1.3: every <img> has width, height and alt (expect no output)
grep -n "<img" src/*.html | grep -v 'width=' ; grep -n "<img" src/*.html | grep -v 'alt='
# R1.4: hero has fetchpriority, no loading
grep -n "fetchpriority" src/index.html ; grep -n "JoImageHome" src/index.html | grep lazy
# R1.5: venue images lazy
grep -c 'venueSlide' src/consultations.html src/nutritional-therapy.html ; grep -c 'loading="lazy"' ...
# R1.6: both builds emit the WebP files
ls dist/media/*.webp dev/media/*.webp
# R2.1, R2.3: all 9 pages reference the same shared file
grep -ho 'shared\.[0-9a-f]*\.css' dist/*.html | sort | uniq -c        # expect 9 x one name
# R2.3 equivalence: shared + page == old page CSS (per page)
# R2.4: edit one page CSS, rebuild, shared hash is unchanged
# R3.4: no Lexend/Open Sans requests
grep -n "Lexend\|family=Open" src/*.html dist/*.html                  # expect nothing
grep -c "fonts.googleapis.com" dist/index.html                         # Material Symbols only
# R3.3: exactly one preload per page
grep -c 'rel="preload"' dist/*.html
# R3.6: font file sizes
ls -l src/fonts
```

- Both `npm run build-prod` and `npm run build-dev` must pass.
- `npm start` (dev server): `curl -sI` the preloaded font URL and one `-800.webp`. Expect 200 for each.
- **Visual check.** No browser is available here. Unless you confirm otherwise, I'll report R2.6 and the font and image appearance as "not visually verified" and list the pages worth a look on the deploy preview: `index` (hero, headings), `qualifications` (logos), `consultations` (slideshow).
- Lighthouse and Core Web Vitals are not measured. I won't quote any score.
- Deploy preview checks need a pushed branch and a pull request, so I'll ask before pushing.

## Decisions (user, 2026-11-27)

1. **Lexend:** ignore. Not shipped, and the Lexend request is removed.
2. **Bold:** Option A. Ship the real 700 weight.
3. **Original photos:** ~~stay in `src/media`~~ **Revised 2026-11-27:** move the 6 originals to `src/originals/` (`git mv`). The script reads from there and writes WebP to `src/media/`. The builds copy only `src/media`, so originals are neither built nor served (about 1.8 MB less in `dist/media`). This replaces the "next to the original" and "originals never overwritten" wording in section 1, and R1.2's "from the originals in `src/media`".
4. **CSS minification:** yes, add `css-minimizer-webpack-plugin` (section 2b).
5. **WebP outputs:** commit them, so the build copies the same files that were checked.

`tasks.md` is not written yet.
