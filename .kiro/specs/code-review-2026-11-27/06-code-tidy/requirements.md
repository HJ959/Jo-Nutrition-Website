# Phase 6: Code Tidy-up

Review items: #16, #17, and the remaining parts of #18.

## Introduction
Behaviour-preserving clean-ups after the earlier phases. Nothing here should change how a page looks or works. Some of the review's items in this area are already handled earlier: the shared page list and the dependency move (Phase 2), the dev image rule (Phase 3), the burger toggle and its resize wiring (Phase 5).

## Requirements

### R1: CSS clean-up [Review #16]
**Acceptance criteria**
1. THE SYSTEM SHALL contain one `#burger` rule block, or none if Phase 5 removed it.
2. THE SYSTEM SHALL NOT contain the `float: left` on `.topnav a` inside the flex container.
3. THE SYSTEM SHALL define `.arrow` in one place, and SHALL NOT redefine shared styles in page CSS unless they differ on purpose.
4. THE SYSTEM SHALL rename `.hidden` to a specific name (for example `.honeypot`) and update every use.
5. THE SYSTEM SHALL rename `.affilatesLogo` to `.affiliatesLogo` in the CSS and every HTML file.
6. THE SYSTEM SHALL NOT change `--navy`, so contrast stays at about 4.8:1 for white on navy.
7. WHEN the footer's `color` is checked, THE SYSTEM SHALL remove the declaration if no visible element depends on it, and keep it if one does.
8. THE SYSTEM SHALL render each page the same as before. This needs a visual comparison in a browser, and if none is available it's reported as "not visually verified".

### R2: JavaScript clean-up [Review #17]
**Acceptance criteria**
1. THE SYSTEM SHALL have one `init()` in `scripts.js` that wires the menu and the resize handling, and each page entry SHALL call it instead of repeating that code.
2. THE SYSTEM SHALL NOT assign `window.navMenuMover` or any other unused global.
3. THE SYSTEM SHALL share the scroll handler that hides `#arrow` between the pages that use it, and SHALL add it to `nutritional-therapy` only if that page has an `#arrow` and needs it (*verify*).
4. THE SYSTEM SHALL register scroll listeners with `{ passive: true }`.
5. THE SYSTEM SHALL keep the per-page JS under its current size, and report the sizes before and after.

### R3: Safer, portable scripts [Review #18]
**Acceptance criteria**
1. THE SYSTEM SHALL replace the `clean` script so that it doesn't fail on an empty folder and works on Windows (for example with `rimraf` or a short Node script). A new dependency needs a one-line trade-off explanation first.
2. THE SYSTEM SHALL bind the dev server to `localhost` by default, and SHALL document how to expose it for phone testing.
3. THE SYSTEM SHALL remove the `sharp` devDependency only if Phase 3's image script no longer uses it. If it is used, THE SYSTEM SHALL leave it.
4. THE SYSTEM SHALL run `build-all` successfully from a clean checkout.

### R4: README [Review #18]
**Acceptance criteria**
1. THE SYSTEM SHALL describe in `README.md` how Netlify builds the site (command, publish directory, `netlify.toml`).
2. THE SYSTEM SHALL mention `kiro-notes.md` and the `.kiro/` folder.
3. THE SYSTEM SHALL document the image conversion script and how to add a page to the shared page list.

## Verification
- `npm run build-all` passes.
- `grep` shows no `affilates`, no `navMenuMover` global and no `.hidden` rule.
- Report JS and CSS sizes before and after.
