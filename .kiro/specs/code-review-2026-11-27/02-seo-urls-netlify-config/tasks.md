# Phase 2 Tasks: SEO Files, Netlify Config and Webpack Page List

Written after the work was done, for tracking only. Implements `design.md`. Requirement references are in brackets. The work was done on branch `phase-2-seo-urls`, one commit per step.

**Status: implemented and merged to `main`. Deploy-preview checks (redirects, 404 page, cache headers, contact form) were NOT run before the merge. They need to be checked on the live site.**

- [x] 1. Baseline
  - [x] 1.1 Create branch `phase-2-seo-urls` from `main`.
  - [x] 1.2 Build prod and dev, and save the sorted file lists (hashes stripped) to compare later. Prod 44 files, dev 34 files.

- [x] 2. Dependency placement [R8]
  - [x] 2.1 Move `@babel/core` and `babel-loader` to `devDependencies` in `package.json`.
  - [x] 2.2 Run `npm install --package-lock-only`. Only the `dev` flags and the moved entries changed in the lockfile, no versions.
  - [x] 2.3 Commit: `Move @babel/core and babel-loader to devDependencies`.

- [x] 3. 404 page and shared page list [R6, R7]
  - [x] 3.1 Add `src/404.html` (nav, link to home, `noindex`, no canonical or Open Graph tags) and `src/404.js`.
  - [x] 3.2 Add `webpack.pages.js` with `chunk`, `template` and `script` per page, including the 404 entry.
  - [x] 3.3 Use the list in `webpack.prod.config.js` (removes the nested ternary) and `webpack.dev.config.js`. Keep the dev config's CRLF line endings.
  - [x] 3.4 Set `output.publicPath: '/'` in the prod config so the 404 page loads its assets at any URL.
  - [x] 3.5 Add `historyApiFallback.rewrites` to the dev server, generated from the list.
  - [x] 3.6 Compare file lists. Prod gains only `404.html`, `notFound.js`, `notFound.css`. Dev gains `404.html` and `notFound.bundle.js`.
  - [x] 3.7 Commit: `Add 404 page, shared webpack page list, absolute publicPath, dev rewrites for extensionless URLs`.
  - [ ] 3.8 Add a throwaway page to the list and confirm both configs build it [R7.3]. **Not run.**

- [x] 4. Extensionless URLs [R2]
  - [x] 4.1 Strip `.html` from `href` and `content` attributes in the 8 pages. `/index.html` becomes `/`.
  - [x] 4.2 Fix the relative link `qualifications.html` in `about.html` (not in the design).
  - [x] 4.3 Set every `lastmod` in `src/sitemap.xml` to 2026-11-27.
  - [x] 4.4 Set `name` and `short_name` in `site.webmanifest` to "Joanna Oates" (agreed with the user).
  - [x] 4.5 Grep for `.html` in `href` and `content` in `src/` and `dist/`, and for `index.html`. No matches.
  - [x] 4.6 Commit: `Use extensionless URLs in canonical, og:url and links, update sitemap lastmod, name the web manifest`.
  - [x] 4.7 Check in the dev server that nav links work [R2.5]. Done by the user, looked good.

- [x] 5. Favicon links, link preview image and tags [R1, R4]
  - [x] 5.1 Add `scripts/make-og-image.js` and run it. Output `src/media/og-image.jpg`, 1200x630, 41,588 bytes. Opened it and the face is fully in frame.
  - [x] 5.2 In the 8 pages, point `og:image` to `/media/og-image.jpg` and add `og:site_name` and `twitter:card`.
  - [x] 5.3 Add `icon`, `apple-touch-icon` and `manifest` links to the 8 pages (the 404 page already has them).
  - [x] 5.4 Confirm each tag appears in all 8 pages, and each linked file exists in `dist/`.
  - [x] 5.5 Commit: `Add favicon and manifest links, og-image (1200x630, 41.6 KB), og:site_name and twitter:card`.

- [x] 6. `netlify.toml` [R5]
  - [x] 6.1 Add 8 `301` redirects with `force = true` (7 pages plus `/index.html` to `/`).
  - [x] 6.2 Add `Cache-Control: public, max-age=31536000, immutable` for `/*.js` and `/*.css`. HTML uses Netlify's default.
  - [x] 6.3 No security headers or CSP (Phase 7).
  - [x] 6.4 Commit: `Add 301 redirects for .html URLs and immutable cache headers for hashed JS and CSS`.

- [x] 7. `robots.txt` [R3]
  - [x] 7.1 Confirm no `Disallow: /media/` and the `Sitemap:` line is present in `src` and `dist`. Already correct since Phase 0, no edit.

- [x] 8. Verify locally
  - [x] 8.1 `npm run build-prod` compiles. A fresh clone with `npm ci && npm run build-prod` compiles [R8.2].
  - [x] 8.2 Every `src` and `href` path in `dist/*.html` exists in `dist/` (page routes map to `<name>.html`).
  - [x] 8.3 `404` is not in `sitemap.xml`. `dist/404.html` has `noindex`.
  - [x] 8.4 Update `.kiro/steering/project-summary.md` and push the branch.

- [ ] 9. Check on a deployed site (**needs the user**)
  - [ ] 9.1 Each of the 8 `.html` URLs redirects once to the extensionless URL, with no loop and no `/about/` [R2.3].
  - [ ] 9.2 `/does-not-exist` shows the custom 404 page with working styles and nav [R6.3].
  - [ ] 9.3 A hashed `.js` or `.css` file has `cache-control: public, max-age=31536000, immutable`. `/about` has `max-age=0, must-revalidate` [R5.3].
  - [ ] 9.4 A test message on `/contact` submits, and the Forms tab still lists `contact`.
  - [ ] 9.5 If a redirect loops or ends in `/about/`, turn off Pretty URLs in the Netlify dashboard and redeploy.

Lighthouse was not run.
