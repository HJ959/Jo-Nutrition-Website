# Phase 3 Measurements

Taken on branch `phase-3-images-css-fonts` before any Phase 3 change (base: `7daf438`), from `npm run build-prod`. These are file sizes, not browser transfer. Gzip uses `gzip -c` at the default level. "Local images" counts each distinct `media/` file referenced by `src`/`srcset` in the page HTML. External requests (Google Fonts, the West London Therapy Hub logo) are not counted. `og-image.jpg` is a meta tag, not a page image, and is not counted.

## Before

### Files in `src/media` (`ls -l`)

| File | Bytes |
|---|---|
| 06-the-woodland-room-4r.png | 167226 |
| 07-the sunshine-room-5.png | 125933 |
| JoImageAbout.jpg | 471620 |
| JoImageHome.jpg | 519965 |
| JoImageNutrition.jpg | 810891 |
| NEDDE LOGO 2 with layers -inverted copy.webp | 25194 |
| bant.webp | 2650 |
| beeleaf-logo-trans2.png | 6303 |
| cnhc.png | 4782 |
| ncfed-logo-1.png | 4092 |
| og-image.jpg | 41588 |
| reception-1r_.png | 136798 |

### Per page

| Page | HTML raw | HTML gz | CSS raw | CSS gz | JS raw | JS gz | Local images raw | Local images gz |
|---|---|---|---|---|---|---|---|---|
| 404.html | 1917 | 863 | 13407 | 3347 | 521 | 335 | 0 | 0 |
| about.html | 4668 | 1837 | 14931 | 3690 | 684 | 378 | 471620 | 449258 |
| consultations.html | 8806 | 2317 | 15245 | 3798 | 684 | 386 | 429957 | 429980 |
| contact.html | 3761 | 1446 | 15182 | 3730 | 521 | 334 | 0 | 0 |
| eating-disorders.html | 4215 | 1694 | 13888 | 3488 | 550 | 357 | 0 | 0 |
| index.html | 3630 | 1393 | 15134 | 3657 | 521 | 332 | 519965 | 496426 |
| nutritional-therapy.html | 4838 | 1802 | 15455 | 3848 | 727 | 398 | 1240848 | 1220473 |
| podcast.html | 4671 | 2019 | 14019 | 3536 | 521 | 334 | 0 | 0 |
| qualifications.html | 4701 | 1677 | 13893 | 3487 | 521 | 341 | 17827 | 17715 |

### Font weights in the CSS (R3.1)

| Rule | File and line | Weight | Result with only Open Sans 400 |
|---|---|---|---|
| `a` | `main.css:152-155` | `bold` | Synthesised bold on every link, including the nav |
| `ul li::before` (bullet) | `main.css:168-174` | `bolder` | Synthesised bold on the bullet |
| `footer a` (button) | `main.css:136-144` | `500` | Renders as 400 |
| `b`, `strong` | `normalize.css:93-98` | `bolder` | Synthesised bold |
| `h1`, `h2`, `h3` | `main.css:191-193` | not set (browser default bold) | Synthesised bold |

No CSS rule uses Lexend. `font-family` is set in `main.css:39` (`'Open Sans', sans-serif`), twice as `inherit` in `contact.css`, and for Material Symbols.

## After (Phase 3 complete, branch `phase-3-images-css-fonts`)

Same method as above, with two changes. (1) "Local images" counts the `src` file only (the 800 px WebP for portraits), because a browser downloads one `srcset` candidate. (2) "CSS" is `shared.css` plus the page CSS (both minified). The self-hosted font is listed separately.

### Files in `src/media` and `src/fonts` (`ls -l`)

| File | Bytes |
|---|---|
| fonts/open-sans-latin.woff2 | 48320 |
| 06-the-woodland-room-4r.webp | 56368 |
| 07-the-sunshine-room-5.webp | 29942 |
| JoImageAbout-1200.webp | 63264 |
| JoImageAbout-800.webp | 35364 |
| JoImageHome-1200.webp | 94864 |
| JoImageHome-800.webp | 44836 |
| JoImageNutrition-1200.webp | 72956 |
| JoImageNutrition-800.webp | 36856 |
| NEDDE LOGO 2 with layers -inverted copy.webp | 25194 |
| bant.webp | 2650 |
| beeleaf-logo-trans2.png | 6303 |
| cnhc.png | 4782 |
| ncfed-logo-1.png | 4092 |
| og-image.jpg | 41588 |
| reception-1r_.webp | 41776 |

The six originals (1.8 MB of JPG/PNG) moved to `src/originals/` and are no longer in `dist/`.

### Per page

| Page | HTML raw | HTML gz | CSS raw | CSS gz | JS raw | JS gz | Img raw | Img gz |
|---|---|---|---|---|---|---|---|---|
| 404.html | 1890 | 856 | 5920 | 1955 | 1607 | 874 | 0 | 0 |
| about.html | 4843 | 1903 | 6920 | 2439 | 1770 | 915 | 35364 | 35414 |
| consultations.html | 8955 | 2360 | 7182 | 2528 | 1770 | 924 | 128086 | 128241 |
| contact.html | 3787 | 1456 | 7099 | 2493 | 1607 | 873 | 0 | 0 |
| eating-disorders.html | 4241 | 1704 | 6273 | 2180 | 1636 | 897 | 0 | 0 |
| index.html | 3828 | 1483 | 6844 | 2340 | 1606 | 870 | 44836 | 44826 |
| nutritional-therapy.html | 5147 | 1884 | 7348 | 2583 | 1813 | 935 | 164942 | 165151 |
| podcast.html | 4697 | 2023 | 6366 | 2232 | 1607 | 872 | 0 | 0 |
| qualifications.html | 4935 | 1765 | 6255 | 2196 | 1605 | 879 | 17827 | 17715 |

### Before to after, change per page (negative is smaller)

| Page | HTML gz | CSS gz | JS gz | Images raw | Images gz | Total gz (HTML+CSS+JS+images) |
|---|---|---|---|---|---|---|
| 404.html | -7 | -1392 | +539 | +0 | +0 | 4545 to 3685 (-860, -19%) |
| about.html | +66 | -1251 | +537 | -436256 | -413844 | 455163 to 40671 (-414492, -91%) |
| consultations.html | +43 | -1270 | +538 | -301871 | -301739 | 436481 to 134053 (-302428, -69%) |
| contact.html | +10 | -1237 | +539 | +0 | +0 | 5510 to 4822 (-688, -12%) |
| eating-disorders.html | +10 | -1308 | +540 | +0 | +0 | 5539 to 4781 (-758, -14%) |
| index.html | +90 | -1317 | +538 | -475129 | -451600 | 501808 to 49519 (-452289, -90%) |
| nutritional-therapy.html | +82 | -1265 | +537 | -1075906 | -1055322 | 1226521 to 170553 (-1055968, -86%) |
| podcast.html | +4 | -1304 | +538 | +0 | +0 | 5889 to 5127 (-762, -13%) |
| qualifications.html | +88 | -1291 | +538 | +0 | +0 | 23220 to 22555 (-665, -3%) |

### Fonts (R3.6)

| | Before | After |
|---|---|---|
| Lexend 400, 500 (from Google, never used by any CSS rule) | downloaded on every page | removed |
| Open Sans | Google Fonts CSS plus the 400 file from `fonts.gstatic.com`; bold was synthesised | `/fonts/open-sans-latin.woff2`, 48,320 bytes (variable, 400 to 700), self-hosted, preloaded |
| Material Symbols | Google Fonts | unchanged (Phase 5) |

The Google Fonts bytes before were not measured here. The after cost is 48,320 bytes on the first page view and then cached for 30 days (`netlify.toml`). The font is not in the totals above. On the five pages with no photo (404, contact, eating-disorders, podcast, qualifications) a cold-cache first view is therefore larger than the totals suggest, by up to 48 KB. The Google Fonts files it replaces (Open Sans 400 and Lexend 400 and 500) were not measured, so the true net change for those pages is not known.

### Notes on the numbers

- **Home hero:** 519,965 to 44,836 bytes (-91%) for the 800 px file. A 2x display fetches the 1200 px file (94,864 bytes).
- **Shared CSS (R2.5):** every page's CSS was 13.4 to 15.5 KB raw. It is now 5,777 bytes shared plus 335 to 1,428 bytes per page. A visitor who reads a second page downloads only the page CSS (about 0.3 to 1.4 KB raw).
- **JS grew by about 1 KB raw (about 540 bytes gz) per page.** Splitting the CSS into its own chunk makes webpack add a chunk-loader runtime to every entry (`o.O`, `webpackChunkjonutrition_website`). It works, because the CSS-only chunk is marked as loaded. It costs part of the CSS gain. On the first visit the CSS gz saving per page (about 1.3 to 1.5 KB) is larger than the JS gz increase (about 0.5 to 0.55 KB). A fix is possible (a `shared` entry instead of `splitChunks`), but it adds an empty JS file to every page, so I left it.
- **Rule diff:** minified CSS has the same rules and values as unminified. Only notation changed (colours as hex/`hsla`, `0px` to `0`, `::before` to `:before`, `to` to `100%`, quotes dropped). `--white-fade` and `--black-fade` became `hsla(0,0%,98%,.3)` and `hsla(0,0%,8%,.3)`, which round to the same 8-bit values.
- **Not measured:** browser rendering, Lighthouse, Core Web Vitals, the hotlinked West London Therapy Hub logo (12,787 bytes, remote).
- **Not visually verified:** R2.6, the real-bold change on headings and links, and the images. See task 9.
