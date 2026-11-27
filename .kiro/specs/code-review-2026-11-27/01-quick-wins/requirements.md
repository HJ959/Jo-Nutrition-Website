# Phase 1: Quick Wins

Review items: #1, #2, #5, and the Spotify `autoplay` security note.

## Introduction
Four small changes with low risk and direct benefit to visitors: zoom, faster first render, visible keyboard focus, and a tighter embed permission.

## Assumptions
- Phase 0 is complete, so Netlify builds `dist/` on deploy. Pushing `src/` changes is enough to publish them. Without Phase 0, these edits need a rebuilt and committed `dist/` to go live.

## Requirements

### R1: Pinch zoom is allowed [Review #1]
**User story:** As a low-vision visitor on a phone, I want to pinch zoom, so that I can read the text.

**Acceptance criteria**
1. THE SYSTEM SHALL use `<meta name="viewport" content="width=device-width, initial-scale=1.0">` on all 8 pages.
2. WHEN `src/*.html` is searched for `maximum-scale` or `user-scalable`, THE SYSTEM SHALL return no matches.

### R2: Content renders without waiting for `window.load` [Review #2]
**User story:** As a visitor, I want to see the page as soon as it is ready, so that a slow image or iframe doesn't leave me with a blank screen.

**Acceptance criteria**
1. THE SYSTEM SHALL NOT contain a `#loadOverlay` element, its inline styles, or its rules in `main.css`.
2. THE SYSTEM SHALL NOT contain the `window.load` handler that removes the overlay in `scripts.js`.
3. WHEN JavaScript is disabled or fails to load, THE SYSTEM SHALL still show the full page content.
4. IF the `.hidden` class is still used by the honeypot field, THEN THE SYSTEM SHALL keep that rule working. Renaming it belongs to Phase 6.

### R3: Focused elements are not hidden by fixed bars [Review #5, verify then fix]
**User story:** As a keyboard user, I want the focused link or field to stay visible, so that I know where I am.

**Acceptance criteria**
1. WHEN the issue is checked first, THE SYSTEM SHALL record whether tabbing to an element near the top or bottom edge of a page leaves it under `.topnav` or `footer`. This needs a browser. If no browser is available, the result is recorded as "not verified".
2. THE SYSTEM SHALL set `scroll-padding-block` on `html` to at least the height of the larger fixed bar.
3. WHEN a user tabs through every link and form control on `contact` and `index`, THE SYSTEM SHALL never leave the focused element fully or partly under a fixed bar.

### R4: Spotify embed has no autoplay permission [Security note]
**User story:** As a visitor, I want audio to start only when I press play.

**Acceptance criteria**
1. THE SYSTEM SHALL NOT include `autoplay` in the `allow` attribute of the Spotify iframe on `podcast`.
2. WHEN the user presses play in the embed, THE SYSTEM SHALL still play audio. This needs a browser check.

## Verification
- `grep` for `maximum-scale`, `loadOverlay` and `autoplay` returns no matches in `src/`.
- Build passes with `npm run build-prod`.
- Report which checks used a browser and which did not.
