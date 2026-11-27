# Phase 2: SEO Files, Netlify Config and Webpack Page List

Review items: #3 (favicon links), #6, #7, #8, #18 (page list, ternary, dependency placement), plus redirects, 404 page and cache headers.

## Introduction
Phase 0 made Netlify build on deploy and fixed the copied static files. This phase makes the site's URLs and SEO files consistent, adds the rest of `netlify.toml`, and lets pages be added in one place in webpack. It edits the webpack config once.

## Assumptions
- Phase 0 is complete: `netlify.toml` exists and `dist/` is built on Netlify.
- `src/favicon_io/` contains `favicon.ico`, 16 and 32 px PNGs, `apple-touch-icon.png`, two Android Chrome PNGs and `site.webmanifest`.

## Requirements

### R1: Favicon and manifest links [Review #3]
**User story:** As a visitor, I want a tab icon and a home screen icon.

**Acceptance criteria**
1. THE SYSTEM SHALL include `<link rel="icon">`, `<link rel="apple-touch-icon">` and `<link rel="manifest">` in the `<head>` of all 8 pages.
2. WHEN each linked file is requested from the built `dist/`, THE SYSTEM SHALL find it.

### R2: One URL form everywhere [Review #6]
**User story:** As a site owner, I want one URL per page, so that search engines don't see duplicates.

**Acceptance criteria**
1. THE SYSTEM SHALL use extensionless URLs (`/about`, `/contact`, and so on) and `/` for the home page in the sitemap, `rel="canonical"`, `og:url` and all nav links.
2. WHEN `src/` is searched for `.html` in `href` and `content` attributes that point to site pages, THE SYSTEM SHALL return no matches.
3. WHEN a visitor requests `/about.html` (or any other `.html` page, or `/index.html`), THE SYSTEM SHALL redirect to the extensionless URL with a 301, set in `netlify.toml`.
4. THE SYSTEM SHALL update `lastmod` in `sitemap.xml` to the date of the change.
5. WHEN the dev server is used, THE SYSTEM SHALL keep the nav links working. If extensionless URLs don't resolve there, the dev server config is adjusted and the change is recorded.

### R3: `robots.txt` allows images and lists the sitemap [Review #7]
**Acceptance criteria**
1. THE SYSTEM SHALL NOT contain `Disallow: /media/` in `robots.txt`.
2. THE SYSTEM SHALL contain `Sitemap: https://joannaoates.com/sitemap.xml`.

### R4: Link preview image and tags [Review #8]
**User story:** As a visitor who receives a shared link, I want a clear preview.

**Acceptance criteria**
1. THE SYSTEM SHALL provide a 1200x630 `og:image` file under about 300 KB, produced with `sharp`. Its size is reported after creation.
2. THE SYSTEM SHALL set `og:image`, `og:site_name` and `twitter:card` on all 8 pages.
3. WHERE a page has its own relevant image, THE SYSTEM MAY use it as that page's `og:image`.

### R5: Rest of `netlify.toml` [Review #18]
**Acceptance criteria**
1. THE SYSTEM SHALL add the redirects from R2.3.
2. THE SYSTEM SHALL set `Cache-Control: public, max-age=31536000, immutable` for the hashed JS and CSS files, and a short or revalidating cache for HTML.
3. WHEN headers are checked on a deploy preview, THE SYSTEM SHALL show the cache headers on a hashed file and on an HTML page. Without a deploy preview, the result is recorded as "not checked on a live deployment".
4. THE SYSTEM SHALL NOT add security headers or a CSP here. They are in Phase 7.

### R6: Custom 404 page
**User story:** As a visitor who follows a bad link, I want a way back to the site.

**Acceptance criteria**
1. THE SYSTEM SHALL provide `404.html` in `dist/`, with the site nav and a link to home, and with `noindex`.
2. THE SYSTEM SHALL NOT list `404` in `sitemap.xml`.
3. WHEN a visitor requests a URL that doesn't exist on a deploy preview, THE SYSTEM SHALL show this page.

### R7: One shared page list in webpack [Review #18]
**User story:** As a developer, I want to add a page in one place.

**Acceptance criteria**
1. THE SYSTEM SHALL define the page list once and use it in both `webpack.dev.config.js` and `webpack.prod.config.js`.
2. THE SYSTEM SHALL give each page item a `script` field and SHALL NOT use the nested ternary at `webpack.prod.config.js:15`.
3. WHEN a page is added to the list, THE SYSTEM SHALL build it in both dev and prod.
4. WHEN both configs are built, THE SYSTEM SHALL produce the same set of pages as before this change.
5. WHERE the 404 page needs an entry, THE SYSTEM SHALL add it through the same list.

### R8: Dependency placement [Review #18]
**Acceptance criteria**
1. THE SYSTEM SHALL list `@babel/core` and `babel-loader` under `devDependencies`.
2. WHEN `npm ci && npm run build-prod` is run on a clean checkout and on Netlify, THE SYSTEM SHALL succeed.

## Verification
- A clean prod build, followed by a file listing of `dist/` that shows every expected file.
- `grep` shows no `.html` page links and no `/index.html`.
- Redirect and 404 checks on a deploy preview.
- Report the file size of the new `og:image`.
- Lighthouse results only if Lighthouse was run.
