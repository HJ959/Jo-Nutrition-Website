# Phase 1 Tasks: Quick Wins

Implements `design.md`. Requirement references are in brackets. Tasks marked **(ask first)** need user confirmation before running. Tasks marked **(needs browser)** can't be verified in the agent's session. The user runs them with `npm run start` (http://localhost:8080, or `http://<machine-ip>:8080` on a phone).

**Status: complete. Merged to `main` and live (5f1351e). All 8 pages return 200 and the old overlay and viewport code is gone from production.**

- [x] 1. Record the baseline
  - [x] 1.1 Run `git status` and confirm a clean working tree on `main`.
  - [x] 1.2 Run `grep -rn "maximum-scale\|user-scalable\|loadOverlay\|autoplay" src/` and save the output. Expected: 8 viewport lines, 8 overlay lines, 3 `main.css` and `scripts.js` overlay lines, 1 `autoplay` line.
  - [x] 1.3 Save the byte sizes of `src/main.css`, `src/scripts.js` and the 8 HTML files for the before and after comparison.
  - [x] 1.4 Create branch `phase-1-quick-wins` from `main`. Each requirement below gets its own commit so any one can be reverted alone.

- [x] 2. Allow pinch zoom [R1.1, R1.2]
  - [x] 2.1 In all 8 files in `src/*.html`, replace the viewport tag with `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
  - [x] 2.2 Run `grep -rn "maximum-scale\|user-scalable" src/`. Expected: no output.
  - [x] 2.3 Run `grep -c 'name="viewport"' src/*.html`. Expected: 1 in each of the 8 files.
  - [x] 2.4 Commit: `Allow pinch zoom on all pages`.

- [x] 3. Remove the Spotify `autoplay` permission [R4.1]
  - [x] 3.1 In `src/podcast.html`, change `allow="autoplay; clipboard-write; ..."` to `allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"`.
  - [x] 3.2 Leave `allowfullscreen=""` and `frameBorder` as they are.
  - [x] 3.3 Run `grep -rn "autoplay" src/`. Expected: no output.
  - [x] 3.4 Commit: `Remove autoplay from Spotify embed permissions`.

- [x] 4. Remove the load overlay [R2.1, R2.2, R2.4]
  - [x] 4.1 Delete the `<div id="loadOverlay" ...></div>` line from all 8 files in `src/*.html`.
  - [x] 4.2 In `src/main.css`, delete the `#loadOverlay` and `#loadOverlay.hidden` rule blocks. Keep the generic `.hidden { display: none; }` rule.
  - [x] 4.3 In `src/scripts.js`, delete the `window.addEventListener("load", ...)` block at the top. Leave `navbarItems`, `navMenuMover` and `bigWindowMenuShower` untouched.
  - [x] 4.4 Run `grep -rn "loadOverlay" src/`. Expected: no output.
  - [x] 4.5 Run `grep -n "^\.hidden" src/main.css` and `grep -n 'class="hidden"' src/contact.html`. Expected: one match each [R2.4].
  - [x] 4.6 Commit: `Remove load overlay that blocked content until window.load`.

- [x] 5. Check whether fixed bars hide focus [R3.1] **(needs browser)**
  - [x] 5.1 If a browser is available, tab through `contact` and `index` at 390, 1024 and 1440 px with the menu closed. Record whether any focused element ends up under `.topnav` or `footer`, and measure the real bar heights in DevTools.
  - [x] 5.2 If no browser is available, record the result as "not verified" and give the user the steps from 5.1. The change in task 6 goes ahead either way.

- [x] 6. Add scroll padding [R3.2]
  - [x] 6.1 In `src/main.css`, add the rule below directly after the existing `html, body { width: 100%; }` rule. Leave that rule unchanged.
    ```css
    html {
        scroll-padding-block: 5rem;
    }
    ```
  - [x] 6.2 If task 5 measured a bar taller than 80 px, raise the value to at least the larger bar height.
  - [x] 6.3 Commit: `Add scroll-padding so focused elements clear the fixed bars`.

- [x] 7. Build and grep the output [Verification]
  - [x] 7.1 Run `npm run build-prod`. Expected: exit code 0.
  - [x] 7.2 Run `ls dist/*.html | wc -l`. Expected: 8.
  - [x] 7.3 Run `grep -rln "maximum-scale\|loadOverlay\|autoplay" dist/`. Expected: no output.
  - [x] 7.4 Compare the `main.css`, `scripts.js` and HTML sizes with task 1.3 and report the bytes saved. Lighthouse is not run.

- [x] 8. User check in the dev server **(needs browser)** [R1, R2.3, R3.3, R4.2]
  - [x] 8.1 User runs `npm run start` and checks:
    - **R1:** pinch zoom works on a phone.
    - **R2.3:** with JS disabled in DevTools, the page content is visible.
    - **R3.3:** tabbing through every link and control on `contact` and `index` never leaves the focused element under a bar. Check with the menu closed and again at 200% zoom.
    - **R4.2:** pressing play on the Spotify embed on `/podcast.html` plays audio.
  - [x] 8.2 Record each result as pass, fail or "not verified". If R3.3 fails, ask for the viewport width and element, then adjust the value in 6.2.

- [x] 9. Go live **(ask first)**
  - [x] 9.1 Ask the user before pushing. Phase 0 found that branch previews are not built, so the options are to merge to `main` and check production, or to open a pull request for a Deploy Preview.
  - [x] 9.2 After the deploy, run `curl -sI` on all 8 pages and check for a 200. Run `curl -s https://joannaoates.com/ | grep -c "loadOverlay\|maximum-scale"`. Expected: 0.
  - [x] 9.3 If the deploy fails, report the build log and wait for the user's decision.

- [x] 10. Hand off
  - [x] 10.1 Report the results in two lists:
    - **Checked with grep and build:** R1.1, R1.2, R2.1, R2.2, R2.4, R3.2, R4.1.
    - **Needs a browser:** R2.3, R3.1, R3.3, R4.2, with each marked pass, fail or "not verified".
  - [x] 10.2 Pass these to later phases:
    - Phase 5: under 900 px the nav links are hidden without JS. The burger may show the word "menu" until the icon font loads. The open mobile menu can still cover focused elements.
    - Phase 3: images without `width`/`height` now visibly shift the page as they load.
    - Phase 6: rename `.hidden`.

## Follow-ups for later phases
- Phase 5: the open mobile menu is up to about 470 px tall, so `scroll-padding` cannot keep focused elements clear of it.
- Phase 6: the `allowfullscreen=""` attribute on the Spotify iframe duplicates `fullscreen` in `allow`. Remove it in the tidy-up.

## Results (2026-11-27)
**Checked with grep and build:** R1.1, R1.2, R2.1, R2.2, R2.4, R3.2, R4.1 pass. Production returns 200 on all 8 pages.

**Checked in a browser by the user (dev server and live site):**
- R1 pinch zoom on a phone: pass.
- R2.3 content visible with JS disabled: pass. The nav is unstyled without JS.
- R3.1 and R3.3 focus under the fixed bars: pass, as reported by the user after tabbing through `contact` and `index`. Bar heights were not measured and the 200% zoom case was not reported separately.
- R4.2 Spotify embed plays: pass.
