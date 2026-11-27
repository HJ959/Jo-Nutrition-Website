# Phase 3 Tasks: Images, Shared CSS and Fonts

Implements `design.md`. Requirement references are in brackets. Work on branch `phase-3-images-css-fonts`, one commit per step.

> **ORDER MATTERS. Do tasks 5, 6 and 7 in this order and do not swap them.**
>
> | Step | Task | Why it must come here |
> |---|---|---|
> | 1st | 5. Split the shared CSS | The equivalence check compares `shared.css` + page CSS with the old single file. |
> | 2nd | 6. Minify CSS | Minified output is no longer byte-comparable, so the check in task 5 must already be done. |
> | 3rd | 7. Add `@font-face` to `main.css` | It changes `main.css`, so the check in task 5 would fail afterwards. |

- [x] 1. Baseline [R1.1, R2.5]
  - [x] 1.1 Create branch `phase-3-images-css-fonts` from `main`.
  - [x] 1.2 Run `npm run build-prod`. Copy `dist/` to a temp folder (`/tmp/dist-before`) for the CSS equivalence check later.
  - [x] 1.3 Write `measurements.md` in this folder with (a) `ls -l` of every file in `src/media` and (b) per page (9 pages): bytes of HTML, CSS, JS and local images, raw and gzipped.
  - [x] 1.4 Record the font weights used in the CSS (R3.1): `main.css` `a`, `ul li::before`, `h1`/`h2` bold and the footer button `500`.
  - [x] 1.5 Commit: `Add Phase 3 baseline measurements`.

- [x] 2. Image script and originals folder [R1.2]
  - [x] 2.1 `git mv` the 6 originals (`JoImageHome.jpg`, `JoImageAbout.jpg`, `JoImageNutrition.jpg`, `reception-1r_.png`, `06-the-woodland-room-4r.png`, `07-the sunshine-room-5.png`) from `src/media/` to `src/originals/`. `build-prod` and `build-dev` only copy `src/media`, so the originals are no longer built or served.
  - [x] 2.2 Add `scripts/optimise-images.js`. It reads from `src/originals/` and writes to `src/media/` (sharp, `rotate()`, `resize({ width, withoutEnlargement: true })`, `webp({ quality: 80 })`). Print width, height and bytes of each output.
  - [x] 2.3 Add `"images": "node scripts/optimise-images.js"` to `package.json`.
  - [x] 2.4 Run it. Outputs: `<name>-800.webp` and `<name>-1200.webp` for the 3 portraits. One 640 px `.webp` for each of the 3 venue PNGs (sunshine-room name without the space).
  - [x] 2.5 Open a few outputs in the image viewer and check for banding or artefacts. Raise quality if needed and note it.
  - [x] 2.6 Confirm the originals are byte-identical after the move (`git status` shows renames, not edits).
  - [x] 2.7 Commit: `Move originals to src/originals, add image script and WebP outputs`. The HTML still points at the old paths, so do task 3 before pushing or building for deploy.

- [ ] 3. Image markup [R1.3 to R1.5, R1.8, R1.9]
  - [ ] 3.1 `index.html`: hero gets `srcset`, `sizes`, `width`, `height`, `fetchpriority="high"`, no `loading`.
  - [ ] 3.2 `about.html`: `srcset`, `sizes="(min-width: 1200px) 40vw, 80vw"`, `width`, `height`, no `loading`.
  - [ ] 3.3 `nutritional-therapy.html`: portrait with `srcset`, `sizes`, `width`, `height`, `loading="lazy"`.
  - [ ] 3.4 Venue images (3 in `consultations.html`, 3 in `nutritional-therapy.html`, 6 tags): point to the `.webp`, add `width`, `height`, `loading="lazy"`.
  - [ ] 3.5 Logos in `qualifications.html`: `width`, `height`, `loading="lazy"`. Add the same to `bant.webp`.
  - [ ] 3.6 West London Therapy Hub logo: add `loading="lazy"`. Add `width` and `height` only if the remote file's size can be read. Leave the source alone.
  - [ ] 3.7 Check each sized `<img>` has `height: auto` in its CSS rule (`.homeImage`, `.joImageAbout`, `.logos`, `.affilatesLogo`, others found). Add where missing. Skip `.venueSlide`, which sets both.
  - [ ] 3.8 Change the dev image rule in `webpack.dev.config.js` to include `webp`. Keep its CRLF line endings.
  - [ ] 3.9 Run the R1.3 to R1.6 greps from `design.md`. Both builds pass and emit the `.webp` files.
  - [ ] 3.10 Commit: `Serve responsive WebP images with explicit dimensions and lazy loading`.

- [ ] 4. Confirm originals are not shipped [decision 3, revised]
  - [ ] 4.1 After `npm run build-prod` and `npm run build-dev`, confirm `dist/media` and `dev/media` contain none of the 6 originals and every `media/` path in the HTML exists.
  - [ ] 4.2 The unused `NEDDE LOGO 2 with layers -inverted copy.webp` is still copied (25 KB). Left alone, not part of this phase.

- [ ] 5. Shared CSS chunk [R2.1 to R2.4]
  - [ ] 5.1 Add `optimization.splitChunks.cacheGroups.sharedStyles` to `webpack.prod.config.js` (as in `design.md`).
  - [ ] 5.2 Change each `HtmlWebpackPlugin` to `chunks: ['shared', p.chunk]`.
  - [ ] 5.3 Build. Check for a `shared.<hash>.css`, no `shared.*.js` and no empty `<script>` in any page. Check the build log for "Conflicting order" warnings from mini-css-extract. Fix if present.
  - [ ] 5.4 Equivalence check: for each of the 9 pages, `shared.css` + page CSS is byte-identical to the old `dist-before/<chunk>.css`.
  - [ ] 5.5 `grep -ho 'shared\.[0-9a-f]*\.css' dist/*.html | sort | uniq -c` gives one name, 9 times.
  - [ ] 5.6 Edit one page CSS, rebuild, and confirm the shared hash is unchanged. Revert the edit.
  - [ ] 5.7 Commit: `Split normalize.css and main.css into a shared CSS chunk`.

- [ ] 6. CSS minification [decision 4]
  - [ ] 6.1 `npm i -D css-minimizer-webpack-plugin`. Check it supports webpack 5 and Node 26. Review `git diff package-lock.json`.
  - [ ] 6.2 Add `minimizer: ['...', new CssMinimizerPlugin()]` to the prod config only.
  - [ ] 6.3 Build. Record sizes. Parse the minified and unminified CSS and diff the rule lists. Report any difference.
  - [ ] 6.4 Commit: `Minify CSS in the production build`.

- [ ] 7. Self-hosted Open Sans [R3.2 to R3.8]
  - [ ] 7.1 Fetch the Google Fonts CSS (`Open+Sans:wght@400;700`) with a modern `User-Agent`. Download the WOFF2 file(s) from the `latin` block into `src/fonts/`. Record file names and sizes.
  - [ ] 7.2 Scan `src/*.html` for characters outside the `latin` ranges, including those written as HTML entities. Add `latin-ext` if any are found.
  - [ ] 7.3 Check the licence on the font's Google Fonts page. Write `src/fonts/LICENSE.md` (SIL OFL 1.1, source URL, date, what was seen).
  - [ ] 7.4 Add `@font-face` to the top of `main.css` (`font-display: swap`, weight `400 700` if one variable file, otherwise two rules).
  - [ ] 7.5 Add `cp -r src/fonts dist/fonts` to `build-prod` and `cp -r src/fonts dev/fonts` to `build-dev`.
  - [ ] 7.6 Add the preload tag to the 9 HTML files, before the stylesheet links.
  - [ ] 7.7 Remove the Lexend/Open Sans `<link>` (two lines in each file) from the 9 HTML files. Keep the Material Symbols link and both `preconnect` tags.
  - [ ] 7.8 Add the `/fonts/*` `Cache-Control: public, max-age=2592000` header to `netlify.toml`.
  - [ ] 7.9 Build. Confirm `dist/*.css` still contains `/fonts/open-sans...` (css-loader left it alone) and `dist/` has no hashed copy of the font. If css-loader rewrites it, switch to `url: { filter }` in the CSS rule rather than a hashed name.
  - [ ] 7.10 Run the R3.3, R3.4 and R3.6 greps from `design.md`.
  - [ ] 7.11 Commit: `Self-host Open Sans, drop Lexend and the Google Fonts stylesheet`.

- [ ] 8. Verify
  - [ ] 8.1 `npm run build-prod` and `npm run build-dev` both pass.
  - [ ] 8.2 `npm start`: `curl -sI` the font URL and one `-800.webp`. Expect 200.
  - [ ] 8.3 Every `src` and `href` in `dist/*.html` exists in `dist/`.
  - [ ] 8.4 Fresh clone: `npm ci && npm run build-prod` passes (new devDependency).
  - [ ] 8.5 Re-measure. Add the after tables and the before/after diff to `measurements.md` [R1.7, R2.5, R3.6].
  - [ ] 8.6 Update `.kiro/steering/project-summary.md`.
  - [ ] 8.7 Ask before pushing the branch.

- [ ] 9. Check on a deploy preview (**needs the user**)
  - [ ] 9.1 `index` (hero, bold headings and nav), `qualifications` (logos), `consultations` (slideshow), `404` page. Report R2.6 and appearance as "not visually verified" until done.
  - [ ] 9.2 Lighthouse is not run here. Do not quote a score.
