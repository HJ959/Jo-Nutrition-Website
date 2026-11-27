# Phase 4 Design: Landmarks, Headings and Page Content

Covers R1 to R3 in `requirements.md`. Markup and copy only, plus a few CSS rules. No JS or build changes.

## What I found in the repo

- The 8 pages are `index`, `about`, `eating-disorders`, `nutritional-therapy`, `consultations`, `qualifications`, `podcast`, `contact`. `404.html` has the same nav but no footer. You asked for it to get the same landmarks (Decisions, item 4).
- No page has `<main>` or `<header>`. Every page has `<nav class="topnav">`, then a `<div class="container ...">` holding the content, then `<footer>`.
- `main.css` makes `.topnav` and `footer` `position: fixed` (z-index 5). Neither has a `transform`, `filter` or `contain`, so wrapping `.topnav` in another element does not change where it sits. `backdrop-filter` on `.topnav` is unaffected by a plain parent.
- `footer` is styled by an element selector (`main.css`, `footer { position: fixed; ... }`). Any `<footer>` I add inside content would become a fixed bar. I must not use `<footer>` inside a blockquote.
- `.container` is styled by class only (`grid` in every per-page CSS). No CSS targets `div.container`, so changing the tag does not affect styling. `normalize.css` already sets `main { display: block }`.
- `main.css` already has `html { scroll-padding-block: 5rem; }` from Phase 1. A jump to `#main` will not land under a fixed bar.
- Heading audit (from grep on `src/*.html`):

| Page | Headings now | Problem |
|---|---|---|
| `index` | h1, h2 | none |
| `about` | h1, h2 | none |
| `eating-disorders` | h1 | none |
| `podcast` | h1 | none |
| `nutritional-therapy` | h1 "Nutritional Therapy", **h1 "Location"** | two h1 |
| `consultations` | h1 "Consultations", **h1 "Location"** | two h1 |
| `qualifications` | h2 "Training", h2 "CPD" | no h1 (expected in R2.1) |
| `contact` | none | **no h1. Not listed in `requirements.md`** |

- The Spotify iframe in `podcast.html` has `frameBorder="0"`, `allowfullscreen=""`, `loading="lazy"` and a `title`.
- No browser is available here. Visual checks, the Tab walkthrough and the screen reader check are for you (see Verification).

## Design

### 1. Landmarks (R1.1, R1.2)

**`<main>`.** Change the existing container `<div>` into `<main>`. Same classes, plus `id="main"` and `tabindex="-1"` (so the skip link reliably moves focus, R1.5):

```html
<main id="main" tabindex="-1" class="container defaultMargin">
  ...unchanged content...
</main>
```

Each page's `container` class list is kept as is (`container`, `container defaultMargin`, `container formMargin`). No new wrapper, so the grid, margins and layout stay the same (R1.6). Exactly one `<main>` per page because each page has one `.container`.

Options for the `<main>` element:

| Option | Pros | Cons |
|---|---|---|
| A. Change `div.container` to `main.container` (recommended) | No extra DOM. No layout risk | Edits a line that holds layout classes, so each page needs a visual check |
| B. Add `<main>` around `.container` | Leaves the container line untouched | An extra element, and `<main>` would wrap the grid, not be it |

**`<header>`.** Wrap only the `<nav class="topnav">` block (Decisions, item 1):

```html
<header>
  <nav class="topnav"> ...unchanged... </nav>
</header>
```

`requirements.md` R1.2 says "nav and title area". The title (`<h1>`) sits inside grid cells next to images and inside `.AboutP1`, `.info`, `.podcasts`, and so on. Moving it into a `<header>` outside `<main>` would break the grids. Two alternatives:

| Option | Result |
|---|---|
| A. `<header>` wraps nav only (recommended) | Gives the page its `banner` landmark. The h1 stays in `<main>`, where screen reader users expect it. No layout change |
| B. Also add a `<header>` around each h1 and `purpleLine` inside `<main>` | Matches the wording of R1.2, but `<header>` inside `<main>` is not a landmark, so it adds no value, and it adds a grid child on pages where children are placed by area |

**`<footer>`** stays as is, outside `<main>`, so it is the `contentinfo` landmark. `<nav>` stays inside `<header>`. The nav has no `aria-label` because there is one nav per page.

### 2. Skip link (R1.3, R1.4, R1.5)

First child of `<body>`, before `<header>`:

```html
<a class="skipLink" href="#main">Skip to main content</a>
```

CSS added to the end of the global rules in `main.css`:

```css
/* Skip link: off-screen until focused */
.skipLink {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 10;
    padding: 12px 20px;
    background-color: var(--navy);
    color: var(--white);
    border-radius: 20px;
    transform: translateY(-300%);
}

.skipLink:focus {
    transform: none;
    outline: 3px solid var(--black);
    outline-offset: 2px;
}

main:focus {
    outline: none;
}
```

Reasoning:

- **Hidden with `transform`, not `display: none`**, so it stays in the tab order. No transition, so there is nothing for `prefers-reduced-motion` to disable.
- **"Clear of the fixed bar" (R1.4).** The nav is `z-index: 5`; the skip link is `z-index: 10` with an opaque background, so it always shows on top of the bar. I did not position it below the bar because on 901 to 1367 px the nav can be about 400 px tall when its links are shown, so no fixed offset is safe. Confirmed in Decisions, item 2.
- **Contrast.** White `rgb(250,250,250)` on navy `rgb(78,109,179)` is about 4.8:1 by my calculation. This is the same pair the footer button uses. Passes 4.5:1. I will confirm with a contrast checker once built.
- **Focus style.** A 3px near-black outline, offset 2px, is visible against both the navy button and the pale bar behind it.
- **Focus moves (R1.5).** `href="#main"` plus `tabindex="-1"` on `<main>` puts keyboard focus on `<main>`, so the next Tab goes to the first link or button inside it. `main:focus { outline: none }` removes the outline on a non-interactive element that the user did not tab to. `scroll-padding-block` keeps the target clear of the bars.
- **Link target.** Pages use clean URLs (`/about`). `#main` resolves against the current page, and no `<base>` tag is used. HtmlWebpackPlugin's minify keeps `id` and `tabindex`.

### 3. Headings (R2.1 to R2.3)

| Page | Change |
|---|---|
| `nutritional-therapy` | "Location" `<h1>` becomes `<h2>` |
| `consultations` | "Location" `<h1>` becomes `<h2>` |
| `qualifications` | Add `<h1>Qualifications</h1>` and a `purpleLine` above "Training". Keep "Training" and "CPD" as `<h2>` |
| `contact` | Add `<h1 class="center">Contact</h1>` and a `purpleLine` above the email and phone list |

Effects on how it looks:

- "Location" on two pages drops from the default h1 size (2em) to the h2 size (1.5em). It sits under the page's own h1, which matches the "About Me" and "My Approach" pattern on `about`. I am not adding CSS to keep the old size.
- The new `qualifications` h1 uses the same markup as the other pages: `<h1 class="center">` followed by `<div class="purpleLine"></div>`. `main.css` already colours h1 navy, and `qualifications.css` has no h1 or h2 rule, so the style matches the pages without a per-page h1 rule (R2.3). The new heading adds one line of height above "Training".
- `index.css` sets `h1 { font-size: 1.3em }` for the home page only. Nothing else changes.

Heading order after the change: `index` h1, h2. `about` h1, h2. `eating-disorders` h1. `nutritional-therapy` h1, h2. `consultations` h1, h2. `qualifications` h1, h2, h2. `podcast` h1, h2 (see section 4). `contact` h1.

**Podcast JSON-LD (R2.4, optional).** Recommend skipping. A valid `PodcastEpisode` block needs the real episode name and publish date, which are not on the page. I would have to invent them or copy them from Spotify. It gives no rich result in search, so the benefit is small. If you want it, I need the episode title and date.

### 4. Podcast text (R3)

**Paragraphs (R3.1, R3.2).** Split on sentence ends. Splitting at "therapy." / "Through" and "life." / "From" fixes those two joins, because each new paragraph starts on its own line. The words do not change.

| Paragraph | Starts with | Ends with |
|---|---|---|
| 1 | "In this transformative episode ..." | "... bariatric surgery." |
| 2 | "UKCP Registered Psychotherapist ..." | "... achieved during therapy." |
| 3 | "Through innovative therapeutic exercises ..." | "... reclaims control over her life." |
| 4 | "From a profound journey ..." | "... the joy of cooking." |
| 5 | "Tune in as we uncover ..." | "... neurodiverse feeding requirements." |

The existing `p { max-width: 70ch; margin: auto }` and `.podcasts p { margin-top: 0.5em }` apply with no CSS change. The page is `center`-aligned, so these stay centred like the rest of the site.

**Quotes (R3.2, R3.3).** "Memorable Quotes" becomes an `<h2>` (fixes the `Quotes"Therapy` join). Each quote is a `<figure>` with a `<blockquote>` and a `<figcaption>` for the attribution:

```html
<h2>Memorable Quotes</h2>
<figure class="quote">
    <blockquote>
        <p>"Therapy isn't just about healing; it's about discovering the strength to reshape your life."</p>
    </blockquote>
    <figcaption>Joanna Oates</figcaption>
</figure>
<figure class="quote">
    <blockquote>
        <p>"Our relationship with food can be our greatest teacher when we learn to listen with compassion."</p>
    </blockquote>
    <figcaption>Claire</figcaption>
</figure>
```

- I use `<figcaption>`, not `<footer>`, because of the global `footer` rule.
- I keep the quotation marks so the wording is unchanged.
- Adds a small `.quote` rule to `podcast.css`:

```css
.quote {
    margin: 1.5em auto;
    max-width: 70ch;
}

.quote blockquote {
    margin: 0;
    font-style: italic;
}
```

Options for the quotes: `<blockquote>` as above (recommended, since R3.3 allows either and these are quotes with a speaker), or a `<ul>` (the site's `ul li::before` adds a green bullet, which would need overriding).

**Iframe (R3.4, R3.5).** Remove `frameBorder="0"`. Add `border: 0;` to the existing `.spotifyPodcast` rule in `podcast.css`. `title`, `loading="lazy"`, `allow` and `allowfullscreen` are not touched. `frameborder` is obsolete in HTML5, so this also removes a validator warning.

## Order of work

1. `main.css`: skip link rules.
2. The 8 pages plus `404.html`: skip link, `<header>`, `<main>`. One commit.
3. Headings: `nutritional-therapy`, `consultations`, `qualifications`, `contact`. One commit.
4. `podcast.html` and `podcast.css`. One commit.
5. Build and run the checks.

Each step is its own commit so it can be reverted alone.

## Risks

| Risk | Mitigation |
|---|---|
| Changing `div.container` to `main.container` shifts layout on one page | Needs your visual check at 390, 1024 and 1440 px. Nothing in CSS targets `div.container`, so I expect no change |
| A `<footer>` inside the quotes becomes a fixed bar | Using `<figcaption>` |
| The tablet nav (901 to 1367 px) is tall and the skip link covers its first links while focused | Accepted. It only shows while focused and the user is skipping the nav anyway |
| Contact heading changes the look of the form page | Decisions, item 3 |

## Verification

Run from the repo root.

Counts per page. Expected: `main` 1, `h1` 1, `skipLink` 1 for each of the 8 pages (`404` has no `<footer>`, so only check its `main`, `h1` and `skipLink` counts):

```
for f in index about eating-disorders nutritional-therapy consultations qualifications podcast contact 404; do
  echo "$f main=$(grep -c '<main ' src/$f.html) h1=$(grep -c '<h1' src/$f.html) skip=$(grep -c 'class="skipLink"' src/$f.html) header=$(grep -c '<header>' src/$f.html)"
done
```

Leftovers. Expected: no output:

```
grep -n 'frameBorder' src/podcast.html
grep -rn 'therapy\.Through\|life\.From\|Quotes"' src/podcast.html
```

Build, then repeat the first loop against `dist/` to confirm the minifier kept `id="main"` and `tabindex`:

```
npm run build-prod
```

Heading order is checked by reading the heading list in the table above against `grep -n '<h[1-6]' src/*.html`. I will also check that the podcast words are unchanged by comparing the old and new text with whitespace and the quote section removed.

I can run: the grep counts, the build, the wording comparison, and the contrast calculation.

**You need to run, because I have no browser:**
- Visual check of all 8 pages at 390, 1024 and 1440 px against the live site (R1.6). Main risk: layout shift from `main.container`, the new `qualifications` h1, and the "Location" size.
- Tab walkthrough on each page. Expected: skip link shows first, with a visible outline and clear of the nav; Enter moves focus to the content; the next Tab lands on the first control in `<main>`. Record done or not done for each page.
- Screen reader check (VoiceOver or NVDA) on `index` and `podcast`: landmark list shows banner, navigation, main and contentinfo, and the heading list is in order. Record done or not done.

## Decisions (from your answers)

1. `<header>` wraps the nav only.
2. The skip link shows on top of the nav bar when focused.
3. `contact` gets a visible `<h1 class="center">Contact</h1>` and a `purpleLine`.
4. `404.html` gets the skip link, `<header>` and `<main>` too. It has one h1 already. So 9 files are changed for R1 and the verification loop includes `404`.
5. Podcast JSON-LD is skipped. The widget is not touched either way, but the block needs an episode title and date that are not on the page.
6. "Memorable Quotes" becomes an `<h2>` (pending your reply to my question about it).
