# Phase 5: Menu, Contact Form and Carousel

Review items: #10, #11, #12.

## Introduction
These changes touch JavaScript, forms and layout. Each needs real browser and device testing. Items marked *verify* in the review are confirmed before they are fixed.

## Assumptions
- The honeypot and reCAPTCHA stay on the contact form (user decision).
- Phase 1 has removed the load overlay, Phase 3 self-hosts Lexend and Open Sans, and Phase 4 has added landmarks.

## Requirements

### R1: Accessible, reliable mobile menu [Review #10]
**User story:** As a visitor on a phone or tablet, I want a menu that works whatever the screen size or orientation.

**Acceptance criteria**
1. THE SYSTEM SHALL toggle the menu by adding or removing a class (for example `.open`) on the nav. CSS SHALL decide visibility and the JS SHALL NOT set inline `display` styles.
2. THE SYSTEM SHALL give the burger button `aria-controls` pointing to the menu, and SHALL update `aria-expanded` on each toggle.
3. WHEN the window is resized or the device is rotated, THE SYSTEM SHALL leave the menu in a state that matches the layout: links visible on desktop widths and closed by default on mobile widths.
4. THE SYSTEM SHALL replace the Material Symbols icon font with an inline SVG and remove its Google Fonts request.
5. IF the icon fails to render, THEN THE SYSTEM SHALL still show an accessible name for the button ("Menu").
6. WHEN the viewport is between 901 and 1367 px, THE SYSTEM SHALL record whether the burger and links both show and whether the 8 links wrap to two rows and cover the page heading (*verify*). IF either is confirmed, THEN THE SYSTEM SHALL fix it so that exactly one navigation pattern shows and the nav never grows taller than the body top padding.
7. WHEN the Escape key is pressed while the menu is open, THE SYSTEM SHALL close it and return focus to the burger button.
8. THE SYSTEM SHALL make the burger button at least 44x44 px.

### R2: Contact form usability [Review #11]
**User story:** As a visitor, I want to contact Jo easily, by phone, email or the form.

**Acceptance criteria**
1. THE SYSTEM SHALL make the submit button at least 44 px tall.
2. THE SYSTEM SHALL show a 2 px `:focus-visible` outline on inputs and the textarea, with at least 3:1 contrast against the background, and SHALL NOT rely on `outline: none` with a border colour change.
3. THE SYSTEM SHALL set `autocomplete="email"` on the email input, plus matching `autocomplete` values on other fields where they apply (for example `name`).
4. THE SYSTEM SHALL mark the message textarea `required`.
5. THE SYSTEM SHALL render the email address as a `mailto:` link and the phone number as a `tel:` link.
6. WHEN the form is submitted successfully, THE SYSTEM SHALL show a branded thank-you page (`action` set to its URL) with the site nav and a link back to the site.
7. WHEN validation fails, THE SYSTEM SHALL show a plain-language message next to the field, and the field SHALL be linked to its message (`aria-describedby`).
8. THE SYSTEM SHALL keep the honeypot and `data-netlify-recaptcha`.
9. WHEN a deploy preview is available, THE SYSTEM SHALL submit a test message and confirm it arrives in Netlify Forms. Without a deploy preview, the form flow is recorded as "not tested end to end".
10. THE SYSTEM SHALL NOT use a custom JS submit handler unless Netlify Forms plus the thank-you page cannot meet R2.7. Any JS addition is explained first.

### R3: User-controlled venue carousel and reduced motion [Review #12]
**User story:** As a visitor, I want to look through the venue photos at my own pace, and not see motion I didn't ask for.

**Acceptance criteria**
1. THE SYSTEM SHALL replace the auto-cycling `.venueSlide` animation with a horizontal scroll-snap carousel that does not advance on its own.
2. THE SYSTEM SHALL support swipe on touch screens and scrolling with the keyboard when the carousel has focus.
3. THE SYSTEM SHALL show previous and next buttons, or visible scroll cues, each at least 44x44 px, with accessible names.
4. THE SYSTEM SHALL give the carousel an accessible name and each image alt text.
5. THE SYSTEM SHALL keep `loading="lazy"` on the images (from Phase 3), and SHALL load only what the layout needs.
6. THE SYSTEM SHALL wrap the animated `.arrow span` in `@media (prefers-reduced-motion: no-preference)`. WHEN reduced motion is requested, THE SYSTEM SHALL show it static.
7. THE SYSTEM SHALL NOT have any animation that runs for more than 5 seconds without a way to stop it.
8. WHERE JavaScript is needed for the carousel buttons, THE SYSTEM SHALL keep it small and SHALL still allow scrolling and swiping if the JS fails.

## Verification
- Keyboard-only walkthrough of the menu, form and carousel, recorded as done or not done.
- Screen reader check of `aria-expanded` and form errors, recorded as done or not done.
- Resize and rotate test at 375, 768, 1024 and 1400 px.
- Report the JS and CSS size change per page.
