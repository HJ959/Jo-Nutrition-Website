# Code Review 2026-11-27: Overview and Phase Plan

Source: `.kiro/code-review/code-review-2026-11-27.md` (18 findings plus security notes).

This file is the index. Each phase has its own `requirements.md` in a subfolder. Each phase can be designed, built and shipped on its own. This overview covers requirements only. Design and task lists are separate later specs, one per phase.

## Decisions (from the user)
- Netlify builds on deploy with `npm run build-prod` and publishes `dist/`. `netlify.toml` pins these settings.
- `dist/` and `dev/` are gitignored. Removing them from the git index or history needs explicit approval.
- URLs are extensionless and home is `/`. This applies to the sitemap, canonicals, `og:url` and nav links.
- The venue slideshow becomes a user-controlled, swipeable scroll-snap carousel with no auto-advance.
- The contact form keeps reCAPTCHA and the honeypot. Revisit later if the third-party cost matters.
- Security headers and CSP come last.

## Starting state (from the Netlify dashboard)
Netlify has no build command and publishes `dist/` (base `/`, runtime not set, functions directory `netlify/functions` which doesn't exist in the repo, logs public). It serves the committed `dist/`, so `src/` edits don't go live until Netlify builds on deploy. Phase 0 fixes this first.

## Assumptions
- The review's *unverified* items (#3, #5, #10) are written as "verify, then fix". No fix is made until a real build or browser check confirms the problem.
- Lighthouse and a browser may not be available in every working session. When they are not, the result is reported as "not measured" and never estimated.
- Netlify deploy previews are available, and are used to check each phase that changes output or headers.

## Phases

| Phase | Folder | Review items | Why this order |
|---|---|---|---|
| 0 | `00-netlify-build-on-deploy/` | #3 (build output), #18 (untrack `dist/` and `dev/`), minimal `netlify.toml` | Netlify serves committed `dist/` today. Until it builds on deploy, no `src/` change goes live. Also likely fixes missing `robots.txt`, sitemap and favicons |
| 1 | `01-quick-wins/` | #1, #2, #5, Spotify `autoplay` | Small, low risk, immediate user benefit |
| 2 | `02-seo-urls-netlify-config/` | #3 (favicon links), #6, #7, #8, redirects, 404, cache headers, shared webpack page list, dependency placement | Webpack is edited once here, for the page list |
| 3 | `03-images-css-fonts/` | #4, #9, #15 | Output-changing work, measured before and after. Builds on the Phase 2 webpack config |
| 4 | `04-landmarks-and-content/` | #13, #14 | Markup and copy only, low risk |
| 5 | `05-interactive-ui/` | #10, #11, #12 | JS and Netlify Forms behaviour, needs real device testing |
| 6 | `06-code-tidy/` | #16, #17, remaining #18 | Safe refactors after behaviour is settled |
| 7 | `07-security/` | Security notes | CSP depends on self-hosted fonts (Phase 3) and the final form setup (Phase 5) |

Changes from the first draft of this plan:
- Phase 0 is new. It moves the Netlify build setup, the copy-step fix and untracking `dist/` and `dev/` ahead of everything else.
- The old Phase 4 is split into Phases 4 and 5, so markup-only changes ship separately from JS and form changes.
- 404 page, cache headers, the shared webpack page list and the `devDependencies` move go into Phase 2, because they are deploy and build config.
- The Spotify `autoplay` removal goes into Phase 1.

## Traceability

| Review item | Phase | Requirement |
|---|---|---|
| #3 Build drops files | 0 | R2 |
| #3 Favicon links | 2 | R1 |
| #18 `dist/` and `dev/` tracked | 0 | R4 |
| `netlify.toml` build settings | 0 | R1 |
| #1 Pinch zoom | 1 | R1 |
| #2 Load overlay | 1 | R2 |
| #5 Fixed bars hide focus | 1 | R3 |
| Spotify `autoplay` | 1 | R4 |
| #6 URL forms | 2 | R2 |
| #7 `robots.txt` | 2 | R3 |
| #8 Open Graph | 2 | R4 |
| Redirects, cache headers | 2 | R5 |
| 404 page | 2 | R6 |
| #18 page list, ternary | 2 | R7 |
| #18 dependency placement | 2 | R8 |
| #4 Images | 3 | R1 |
| #9 Shared CSS | 3 | R2 |
| #15 Fonts | 3 | R3 |
| #13 Landmarks, headings | 4 | R1, R2 |
| #14 Podcast text | 4 | R3 |
| #10 Menu | 5 | R1 |
| #11 Contact form | 5 | R2 |
| #12 Motion, carousel | 5 | R3 |
| #16 CSS | 6 | R1 |
| #17 JS | 6 | R2 |
| #18 clean script, dev server, README | 6 | R3, R4 |
| Security: headers, CSP | 7 | R1 |
| Security: `npm audit` | 7 | R2 |
| Security: secrets, external links | 7 | R3 |

Every review item and security note maps to at least one requirement.

## Open questions
- Whether the preview build on Netlify passes. If it fails, Phase 0 R3.4 gives the fallback of committing a rebuilt `dist/`.
- Exact CSP allowances for Netlify Forms, reCAPTCHA and the Spotify embed. These were not researched and must be tested in a deploy preview (Phase 7).
- Whether to purge `dist/` and `dev/` from git history, beyond untracking them (Phase 0).
- Whether to drop reCAPTCHA in favour of the honeypot alone (owner's call, later).
