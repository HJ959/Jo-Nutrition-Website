# Phase 4 Tasks: Landmarks, Headings and Page Content

Implements `design.md`. Requirement references are in brackets. Tasks marked **(ask first)** need user confirmation before running. Tasks marked **(needs browser)** can't be verified in the agent's session. The user runs them with `npm run start` (http://localhost:8080, or `http://<machine-ip>:8080` on a phone).

**Status: tasks 1 to 8 done on branch `phase-4-landmarks-and-content` (4 commits, not merged, not pushed). Task 9 validated by the user. Task 10.2 (merge and push) waits for confirmation.**

Files in scope: the 8 pages plus `404.html` (`index`, `about`, `eating-disorders`, `nutritional-therapy`, `consultations`, `qualifications`, `podcast`, `contact`, `404`), `src/main.css`, `src/podcast.css`.

- [x] 1. Record the baseline
  - [x] 1.1 Run `git status` and confirm a clean working tree on `main`.
  - [x] 1.2 Save the output of `grep -n '<main\|<header\|<h[1-6]\|skipLink' src/*.html` for the before and after comparison.
  - [x] 1.3 Run `npm run build-prod` and save the byte sizes of `dist/*.html`, `dist/*.css` and `dist/*.js`.
  - [x] 1.4 Save the text of the podcast description and quotes (the `<p>` after the iframe in `src/podcast.html`) to a temp file outside the repo, for the wording check in task 8.
  - [x] 1.5 Create branch `phase-4-landmarks-and-content` from `main`. Each task below that ends in a commit can be reverted alone.

- [x] 2. Add skip link styles [R1.3, R1.4]
  - [x] 2.1 In `src/main.css`, add the rules below after the `.hidden` rule. Do not change any existing rule.
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
  - [x] 2.2 Calculate the contrast of `rgb(250,250,250)` on `rgb(78,109,179)` with a script. Expected: at least 4.5:1 (design estimate is about 4.8:1).
  - [x] 2.3 Commit: `Add skip link styles`.

- [x] 3. Add landmarks and skip link to every page [R1.1 to R1.5]
  - [x] 3.1 In each of the 9 files, insert `<a class="skipLink" href="#main">Skip to main content</a>` as the first child of `<body>`, before the `<nav>`.
  - [x] 3.2 In each of the 9 files, wrap the `<nav class="topnav"> ... </nav>` block in `<header> ... </header>`. Leave the nav and its links as they are.
  - [x] 3.3 In each of the 9 files, change the opening `<div class="container ...">` to `<main id="main" tabindex="-1" class="container ...">` and its matching closing `</div>` to `</main>`. Keep the existing class list exactly (`container`, `container defaultMargin`, `container formMargin`). Check the closing tag by reading each file, because several pages have nested `div` elements and a `navSpacer` inside the container.
  - [x] 3.4 Leave `<footer>` outside `<main>`, and leave any `navSpacer` that sits outside `.container` where it is.
  - [x] 3.5 Run the count loop below. Expected: `main=1`, `skip=1`, `header=1` for each of the 9 files, and `footer=1` for the 8 pages (the 404 has no footer, so it prints `footer=0`).
    ```
    for f in index about eating-disorders nutritional-therapy consultations qualifications podcast contact 404; do
      echo "$f main=$(grep -c '<main ' src/$f.html) skip=$(grep -c 'class="skipLink"' src/$f.html) header=$(grep -c '<header>' src/$f.html) footer=$(grep -c '<footer>' src/$f.html)"
    done
    ```
  - [x] 3.6 Run `grep -c '</main>' src/*.html`. Expected: 1 in each of the 9 files.
  - [x] 3.7 Commit: `Add skip link, header and main landmarks to all pages`.

- [x] 4. Fix heading structure [R2.1 to R2.3]
  - [x] 4.1 In `src/nutritional-therapy.html`, change `<h1>Location</h1>` to `<h2>Location</h2>`.
  - [x] 4.2 In `src/consultations.html`, change `<h1>Location</h1>` to `<h2>Location</h2>`.
  - [x] 4.3 In `src/qualifications.html`, add `<h1 class="center">Qualifications</h1>` and `<div class="purpleLine"></div>` as the first two children of `<div class="info defaultMargin center">`, above `<h2>Training</h2>`. Keep "Training" and "CPD" as `<h2>`.
  - [x] 4.4 In `src/contact.html`, add `<h1 class="center">Contact</h1>` and `<div class="purpleLine"></div>` as the first two children of `<div class="info">`, above the `<ul>`.
  - [x] 4.5 Run `grep -c '<h1' src/*.html`. Expected: 1 in each of the 9 files.
  - [x] 4.6 Run `grep -n '<h[1-6]' src/*.html` and check the order against the design: `index` h1, h2; `about` h1, h2; `eating-disorders` h1; `nutritional-therapy` h1, h2; `consultations` h1, h2; `qualifications` h1, h2, h2; `contact` h1; `404` h1. `podcast` is checked in task 5.
  - [x] 4.7 Commit: `Give every page one h1 and keep heading levels in order`.

- [x] 5. Make the podcast text readable [R3.1 to R3.5]
  - [x] 5.1 In `src/podcast.html`, replace the single `<p>` with 5 paragraphs split at the sentence ends listed in the design (ends: "bariatric surgery.", "achieved during therapy.", "reclaims control over her life.", "the joy of cooking.", "neurodiverse feeding requirements."). Do not change any word.
  - [x] 5.2 After the paragraphs, add `<h2>Memorable Quotes</h2>` and the two `<figure class="quote">` blocks from the design, with `<blockquote><p>` for each quote and `<figcaption>` for "Joanna Oates" and "Claire". Keep the straight quotation marks. Do not use `<footer>`.
  - [x] 5.3 Remove `frameBorder="0"` from the iframe. Leave `src`, `class`, `allowfullscreen`, `allow`, `loading="lazy"` and `title` as they are.
  - [x] 5.4 In `src/podcast.css`, add `border: 0;` to the existing `.spotifyPodcast` rule, and add the `.quote` and `.quote blockquote` rules from the design at the end of the file.
  - [x] 5.5 Run `grep -n 'frameBorder\|therapy\.Through\|life\.From\|Quotes"' src/podcast.html`. Expected: no output.
  - [x] 5.6 Run `grep -n '<iframe' -A5 src/podcast.html` and confirm `title`, `loading="lazy"`, `allow` and `src` are unchanged, so the widget still loads and plays.
  - [x] 5.7 Confirm `podcast.html` headings are h1 then h2.
  - [x] 5.8 Commit: `Split podcast text into paragraphs and mark up quotes`.

- [x] 6. Build and grep the output [Verification]
  - [x] 6.1 Run `npm run build-prod`. Expected: exit code 0.
  - [x] 6.2 Run `ls dist/*.html | wc -l`. Expected: 9 (8 pages plus 404).
  - [x] 6.3 Run the count loop from 3.5 against `dist/` (use `dist/$f.html`). Expected: the same counts, which shows the minifier kept `id="main"`, `tabindex` and `class="skipLink"`. Also run `grep -c 'id=main\|id="main"' dist/*.html`. The minifier may drop the quotes, so allow both forms.
  - [x] 6.4 Run `grep -c '<h1' dist/*.html`. Expected: 1 in each file.
  - [x] 6.5 Run `grep -n 'skipLink' dist/*.css`. Expected: at least one match.
  - [x] 6.6 Compare the sizes of `dist/*.html`, `dist/*.css` and `dist/*.js` with task 1.3 and report the change in bytes. Expected: each HTML file grows by roughly 150 bytes, `podcast.html` by more, and the JS files are unchanged.

- [x] 7. Check internal links and assets [Verification]
  - [x] 7.1 Run `grep -o 'href="#[^"]*"' dist/*.html | sort | uniq -c`. Expected: only `#main`, once per file.
  - [x] 7.2 Confirm each `href="#main"` has a matching `id="main"` in the same file.

- [x] 8. Check the podcast wording is unchanged [R3.1]
  - [x] 8.1 Extract the text of the new description and quotes, strip tags, collapse whitespace, and compare with the saved text from task 1.4. Expected: the only differences are the space added at the three joins ("therapy. Through", "life. From", "Quotes "Therapy") and the words "Memorable Quotes", "Joanna Oates" and "Claire" now being in their own elements.
  - [x] 8.2 Report any other difference to the user. Do not fix the wording without asking.

- [x] 9. Hand over the checks that need a browser **(needs browser)**
  - [x] 9.1 Give the user the steps below. Record each as done or not done, and do not claim a pass.
  - [x] 9.2 **Visual check [R1.6].** Run `npm run start`. On each of the 9 pages at 390, 1024 and 1440 px, compare with the live site. The only expected differences: a new "Qualifications" heading with a line above "Training"; a new "Contact" heading with a line above the email and phone box; "Location" is smaller on `nutritional-therapy` and `consultations`; the podcast text is in 5 paragraphs with a "Memorable Quotes" heading and two quotes. Nothing else should move.
  - [x] 9.3 **Tab walkthrough [R1.3 to R1.5].** On each of the 9 pages, press Tab once after load. Expected: "Skip to main content" appears on top of the nav bar with a dark outline. Press Enter. Expected: the page content area gets focus and the next Tab goes to the first link or control inside it. Also check with the mobile menu closed at 390 px.
  - [x] 9.4 **Podcast widget.** On `podcast`, scroll to the Spotify player, confirm it loads without a visible border, and press play. Expected: it plays.
  - [x] 9.5 **Screen reader [R1, R2].** With VoiceOver or NVDA on `index` and `podcast`, open the landmarks list. Expected: banner, navigation, main, contentinfo (`index`; no contentinfo on 404). Open the headings list. Expected: in the order from the design.
  - [x] 9.6 If the user finds the skip link hard to see, or the nav bar is covered in an unwanted way at 901 to 1367 px, adjust `top`, `left` or the colours in task 2 and re-check.

- [ ] 10. Hand over [Verification]
  - [x] 10.1 Report two lists. **Checked with grep and build:** R1.1, R1.2, R1.3, R2.1, R2.2, R3.1 to R3.5 (markup and wording), and the contrast ratio. **Needs a browser, not verified here:** R1.4 (visible focus), R1.5 (focus moves), R1.6 (no layout change), R2.3 (heading style), the widget check, the Tab walkthrough and the screen reader check.
  - [ ] 10.2 Ask the user before merging branch `phase-4-landmarks-and-content` to `main` and pushing **(ask first)**. Pushing publishes the site.
