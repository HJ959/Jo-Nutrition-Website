# Phase 4: Landmarks, Headings and Page Content

Review items: #13, #14.

## Introduction
Markup and copy changes only. No JavaScript or build changes.

## Requirements

### R1: Landmarks and skip link [Review #13]
**User story:** As a screen reader or keyboard user, I want to jump straight to the main content.

**Acceptance criteria**
1. THE SYSTEM SHALL wrap the primary content of all 8 pages in `<main id="main">`, with exactly one `<main>` per page.
2. THE SYSTEM SHALL wrap the site nav and title area in a `<header>`, and keep the existing `<nav>` and `<footer>`.
3. THE SYSTEM SHALL place a skip link (`<a href="#main">`) as the first focusable element in `<body>` on every page.
4. WHEN the skip link receives focus, THE SYSTEM SHALL show it, clear of the fixed bar, with a visible focus style and a 4.5:1 contrast ratio.
5. WHEN the skip link is activated, THE SYSTEM SHALL move focus to the main content.
6. THE SYSTEM SHALL keep the existing layout. Wrapping elements SHALL NOT change the visible design. This needs a visual check.

### R2: Heading structure [Review #13]
**Acceptance criteria**
1. THE SYSTEM SHALL have exactly one `<h1>` on each page, including `qualifications`.
2. THE SYSTEM SHALL keep heading levels in order, with no skipped levels.
3. WHEN the `qualifications` `<h1>` is added, THE SYSTEM SHALL style it like the other pages' `<h1>` elements.
4. WHERE the `podcast` page has no JSON-LD, THE SYSTEM MAY add JSON-LD that fits its content, and it SHALL be valid JSON. This is optional and can be skipped.

### R3: Readable podcast text [Review #14]
**User story:** As a visitor, I want to read the podcast description without a wall of text.

**Acceptance criteria**
1. THE SYSTEM SHALL split the roughly 250-word block on `podcast` into short paragraphs, with the wording otherwise unchanged.
2. THE SYSTEM SHALL fix every missing space at a sentence join (for example "therapy.Through", "life.From", and the `Quotes"Therapy` join).
3. THE SYSTEM SHALL mark up the closing quotes as a `<blockquote>` or a list.
4. THE SYSTEM SHALL replace the `frameBorder` attribute on the iframe with `border: 0` in CSS.
5. THE SYSTEM SHALL keep the iframe's `title` and `loading="lazy"` attributes.

## Verification
- A script or `grep` check shows one `<main>`, one `<h1>` and one skip link per page.
- Tab key walkthrough on each page, recorded as done or not done.
- Screen reader check, recorded as done or not done.
