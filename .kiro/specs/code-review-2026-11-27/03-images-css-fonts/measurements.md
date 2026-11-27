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
