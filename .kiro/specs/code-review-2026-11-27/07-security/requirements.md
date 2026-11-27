# Phase 7: Security Headers, CSP and Audit

Review items: Security notes.

## Introduction
This phase comes last because the CSP depends on the final setup: self-hosted fonts (Phase 3), the contact form with Netlify Forms and reCAPTCHA (Phase 5), and the Spotify embed.

## Assumptions and risks
- The exact CSP allowances for Netlify Forms and reCAPTCHA have not been researched. They are taken from Netlify and Google documentation and tested before the policy is enforced.
- A wrong CSP can break the contact form or the podcast embed. The policy is first deployed as `Content-Security-Policy-Report-Only`, and checked in a deploy preview.

## Requirements

### R1: Security headers and CSP
**User story:** As a site owner, I want browsers to block unexpected scripts and content.

**Acceptance criteria**
1. THE SYSTEM SHALL set `X-Content-Type-Options: nosniff` and a `Referrer-Policy` (for example `strict-origin-when-cross-origin`) in `netlify.toml`.
2. THE SYSTEM SHALL set a `Content-Security-Policy` in `netlify.toml` that allows only the sources the site uses: its own origin, the Spotify embed, and the Google reCAPTCHA domains.
3. THE SYSTEM SHALL NOT allow Google Fonts in the policy once fonts are self-hosted.
4. WHEN the policy is first added, THE SYSTEM SHALL use `Content-Security-Policy-Report-Only` and check the browser console on every page, the contact form flow and the podcast embed for violations.
5. WHEN no violations remain, THE SYSTEM SHALL switch to the enforcing `Content-Security-Policy` header.
6. IF inline scripts or styles remain, THEN THE SYSTEM SHALL list them and either remove them or justify a hash or nonce. `unsafe-inline` for scripts is not allowed.
7. WHEN headers are checked on a deploy preview, THE SYSTEM SHALL show them on HTML pages. Without a deploy preview, the result is recorded as "not checked on a live deployment".
8. THE SYSTEM SHALL keep the contact form working with reCAPTCHA after the policy is enforced.

### R2: Dependency audit
**Acceptance criteria**
1. WHEN `npm ci && npm audit` is run before the next release, THE SYSTEM SHALL record the date and the result in the README or `kiro-notes.md`.
2. IF `npm audit` reports vulnerabilities, THEN THE SYSTEM SHALL list them and propose fixes. `npm audit fix --force` is not run without the user's approval.

### R3: Secrets and external links
**Acceptance criteria**
1. THE SYSTEM SHALL contain no API keys, tokens or passwords in the repo. A search of tracked files for common key patterns is run and the result recorded.
2. THE SYSTEM SHALL keep `rel="noopener noreferrer"` on every external link that opens in a new tab.
3. THE SYSTEM SHALL keep the public email address and phone number as they are.
4. THE SYSTEM SHALL NOT commit reCAPTCHA secret keys. Only the Netlify-managed setup is used.

## Verification
- Header output from a deploy preview, or a note that none was available.
- Console check of every page with no CSP violations.
- Contact form submission test on the preview.
- Audit result with date.
