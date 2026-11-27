# Phase 3: Images, Shared CSS and Fonts

Review items: #4, #9, #15.

## Introduction
These changes cut page weight and third-party requests. They change output files, so each one is measured before and after. Sizes in the review are estimates until measured.

## Requirements

### R1: Responsive, sized, modern images [Review #4]
**User story:** As a visitor on a phone, I want photos that load quickly and don't shift the page.

**Acceptance criteria**
1. THE SYSTEM SHALL record the file size of every image in `src/media` and the transfer size of each page before any change.
2. THE SYSTEM SHALL provide a script using `sharp` that produces WebP versions of each photo at 800 px and 1200 px wide from the originals in `src/media`. The originals are not overwritten.
3. THE SYSTEM SHALL give every `<img>` explicit `width` and `height` matching the file's aspect ratio, and `srcset` and `sizes` where more than one size exists.
4. WHERE a photo is the LCP image (the home hero on `index`), THE SYSTEM SHALL set `fetchpriority="high"` and SHALL NOT set `loading="lazy"`.
5. THE SYSTEM SHALL set `loading="lazy"` on images below the fold, including the three venue images.
6. WHEN the prod and dev builds run, THE SYSTEM SHALL emit the WebP files. The dev image rule SHALL include `webp`, matching the prod rule.
7. THE SYSTEM SHALL report a table of before and after sizes per image and per page. Targets are measured values, not estimates.
8. IF a browser doesn't support WebP, THEN THE SYSTEM SHALL still show the image. Given the project's `browserslist`, a fallback is added only if needed, and the decision is explained.
9. THE SYSTEM SHALL provide alt text on every content image.

### R2: One shared CSS file across pages [Review #9]
**User story:** As a returning visitor, I want the site's shared styles cached, so that later pages load faster.

**Acceptance criteria**
1. THE SYSTEM SHALL output `normalize.css` and `main.css` as one shared chunk (`optimization.splitChunks`, or a shared entry), referenced by every page.
2. THE SYSTEM SHALL keep page-specific CSS in separate small files.
3. WHEN two pages are built, THE SYSTEM SHALL reference the same hashed shared CSS filename on both.
4. WHEN shared CSS is unchanged between builds, THE SYSTEM SHALL keep the same hash (stable `contenthash`).
5. THE SYSTEM SHALL report per-page CSS transfer size before and after.
6. THE SYSTEM SHALL render each page identically to before. This needs a visual check in a browser, and if none is available the result is reported as "not visually verified".

### R3: Self-hosted fonts [Review #15]
**User story:** As a visitor, I want text to appear quickly without extra connections to third parties.

**Acceptance criteria**
1. THE SYSTEM SHALL record which font weights are used in the CSS before choosing files. The review expects Lexend 400 and 500 and Open Sans 400 only.
2. THE SYSTEM SHALL serve Lexend and Open Sans as subsetted, self-hosted WOFF2 files with `font-display: swap`.
3. THE SYSTEM SHALL preload the one font file used for the main heading or body text above the fold, and no more than that.
4. THE SYSTEM SHALL have no `fonts.googleapis.com` or `fonts.gstatic.com` requests for Lexend or Open Sans.
5. WHERE `main.css` sets `font-weight: bold`, THE SYSTEM SHALL either load a real bold file or change the CSS so the browser doesn't synthesise bold.
6. THE SYSTEM SHALL record each font file's size. Subsetting covers the Latin characters the site uses, with a plain explanation of what is included.
7. The Material Symbols request is removed in Phase 5 with the menu icon. This phase leaves it in place.
8. THE SYSTEM SHALL check the licence of each font allows self-hosting (both are published under the SIL Open Font License) and record the result.

## Verification
- Per-image and per-page size table, before and after.
- Both builds pass.
- Page screenshots or a note saying they weren't taken.
- Lighthouse and Core Web Vitals only if measured.
