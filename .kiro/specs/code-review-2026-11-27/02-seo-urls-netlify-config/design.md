# Phase 2 Design: SEO Files, Netlify Config and Webpack Page List

Covers R1 to R8 in `requirements.md`.

## What I found in the repo

- Phase 0 and 1 are merged. `netlify.toml` has only `[build]` and `NODE_VERSION = "26"`. `.gitignore` already lists `dist/` and `dev/`.
- **R3 is already done.** `src/robots.txt` is `User-agent: *`, `Allow: /`, `Sitemap: https://joannaoates.com/sitemap.xml`. There is no `Disallow: /media/`. R3 needs a check only, no edit.
- **The sitemap is already extensionless** (`/`, `/about`, ...). Only `lastmod` (2025-02-03) needs updating.
- Canonical and `og:url` use `.html` on all 8 pages (home is `/index.html`). The nav links and the footer link also use `.html` (for example `/index.html`, `/contact.html`).
- `og:image` is set on all 8 pages, but to full-size photos: `JoImageHome.jpg` on 6 pages, `JoImageAbout.jpg` on `about`, `JoImageNutrition.jpg` on `nutritional-therapy`. `JoImageHome.jpg` is 508 KB and 3300x3301 px (square). There is no `og:site_name`, no `twitter:card`, no `<link rel="icon">`, no `apple-touch-icon` and no manifest link.
- `src/favicon_io/` has `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, two `android-chrome` PNGs and `site.webmanifest`. All reach `dist/` after Phase 0. The manifest's `name` and `short_name` are empty strings.
- `dist/index.html` injects assets with **relative** paths (`src="index.4b640c6a.js"`, `href="index.335d6522.css"`) because `output.publicPath` is unset. A 404 page is served at whatever URL the visitor typed (for example `/a/b`), so relative asset paths would break there. This forces a webpack change that the requirements did not list. See section 3.
- `webpack.prod.config.js` already has a `pages` array with `name`, `template` and `chunk`. `name` duplicates `chunk`. The nested ternary at line 15 maps chunk to script name. `webpack.dev.config.js` repeats 8 `entry` lines and 8 `HtmlWebpackPlugin` blocks.
- `webpack.dev.config.js` has no `historyApiFallback`. Pages live in memory at `/about.html`, so `/about` will not resolve in `npm start` once nav links lose the extension.
- The contact form is `<form name="contact" method="POST" data-netlify="true">` with no `action`. It posts to the page's own URL, so it will post to `/contact`.
- `@babel/core` and `babel-loader` are in `dependencies` in `package.json`.
- No browser, Lighthouse or deploy preview is reachable from here.

## Design

### 1. One URL form: extensionless (R2)

| Option | Pros | Cons |
|---|---|---|
| A. Extensionless, `/` for home (recommended) | Sitemap already uses it. Shorter URLs. Netlify serves `about.html` at `/about` | Dev server needs rewrites. Needs 301 rules for the old URLs |
| B. Keep `.html` everywhere | No dev server change | Rewrites the sitemap. Netlify still serves `/about`, so duplicates stay unless redirected the other way |

A also matches review item #6.

**Edits (8 HTML files).** Two `sed` passes, scoped to `href` and `content` attributes that point at this site, so external links are not touched:

```
sed -i -E 's#(href|content)="((https://joannaoates\.com)?)/index\.html"#\1="\2/"#' src/*.html
sed -i -E 's#(href|content)="((https://joannaoates\.com)?/[a-z-]+)\.html"#\1="\2"#' src/*.html
```

The first turns `/index.html` into `/` (and `https://joannaoates.com/index.html` into `https://joannaoates.com/`). The second strips `.html` from the other 7 names. The 404 page is written with extensionless links from the start, so the `sed` passes have nothing to change in it.

**Sitemap.** Set every `lastmod` to the date of the change, in `YYYY-MM-DD` form (valid W3C datetime). The existing generator comment stays. `404` is not listed.

**Redirects (R2.3, in `netlify.toml`).** Eight rules, all with `status = 301` and `force = true`:

```toml
[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301
  force = true

[[redirects]]
  from = "/about.html"
  to = "/about"
  status = 301
  force = true
```

...and the same for `eating-disorders`, `nutritional-therapy`, `consultations`, `qualifications`, `podcast` and `contact`.

- `force = true` is required. Netlify's docs say a redirect does not fire when a file exists at the `from` path, and `about.html` exists in `dist/`.
- There is no splat form. Netlify does not allow `*` in the middle of a path (`/*.html` is not valid in redirects), so the rules are written out. Adding a page now means one entry in `webpack.pages.js`, one redirect rule here, a nav link on every page and a sitemap entry.
- **Risk: Pretty URLs.** Netlify's Pretty URLs feature (on by default) can rewrite `/about.html` itself, and the docs say it moves paths toward a trailing slash (`/about/`). If it fights these rules, a visitor could get a redirect loop or land on `/about/` instead of `/about`. I can't test this offline. The deploy preview check below looks at the `Location` header of every rule. If it loops or ends in `/about/`, the fix is a dashboard change (turn Pretty URLs off under Project configuration, then redeploy), which needs the user.
- **Form side effect.** A 301 turns a POST into a GET. The contact form posts to its own URL. After this phase the form is served at `/contact`, so it posts to `/contact`, which has no rule. Only a visitor who kept the page open from before the change could POST to `/contact.html`. That case is rare and fails safely (they see the page again). The preview check includes a test submission, which needs the user.

**Dev server (R2.5).** `webpack-dev-server` serves the generated pages from memory at `/about.html`. Add `historyApiFallback.rewrites`, generated from the shared page list, so `/about` serves `about.html`:

```js
historyApiFallback: {
  rewrites: pages.filter(p => p.template !== 'index.html').map(p => ({
    from: new RegExp(`^/${p.template.replace('.html', '')}$`),
    to: `/${p.template}`,
  })),
},
```

`/` already serves `index.html`. In dev, `/about.html` keeps working and is not redirected. Only Netlify enforces the 301. I'll record that in the commit message.

### 2. One shared page list (R7)

New file `webpack.pages.js`, loaded by both configs:

```js
module.exports = [
  { chunk: 'index',              template: 'index.html',              script: 'index.js' },
  { chunk: 'about',              template: 'about.html',              script: 'about.js' },
  { chunk: 'eatingDisorders',    template: 'eating-disorders.html',   script: 'eating-disorders.js' },
  { chunk: 'consultations',      template: 'consultations.html',      script: 'consultations.js' },
  { chunk: 'qualifications',     template: 'qualifications.html',     script: 'qualifications.js' },
  { chunk: 'contact',            template: 'contact.html',            script: 'contact.js' },
  { chunk: 'nutritionalTherapy', template: 'nutritional-therapy.html', script: 'nutritional-therapy.js' },
  { chunk: 'podcast',            template: 'podcast.html',            script: 'podcast.js' },
  { chunk: 'notFound',           template: '404.html',                script: '404.js' },
];
```

- `name` is dropped. It was the same string as `chunk` on every item and nothing else read it.
- Both configs build `entry` with `Object.fromEntries(pages.map(p => [p.chunk, `./src/${p.script}`]))` and `plugins` with `pages.map(...)`. The nested ternary disappears.
- The two configs keep their different options (minify and `contenthash` in prod, `style-loader` and `[name].bundle.js` in dev). Only the list is shared.
- The 404 entry goes through the same list (R7.5). The dev config will build `dev/404.html` too. That is harmless and keeps both configs identical in page set.
- Same-set check (R7.4): file lists before and after must differ only by `404.html` and its `notFound.*` JS and CSS. Take the "before" lists from `main` before editing: `find dist -type f | sort > /tmp/prod-before.txt` after a build, and the same for `dev`. Hashes in names will change because `publicPath` alters the output, so compare with hashes stripped (`sed -E 's/\.[0-9a-f]{8}\././'`).

### 3. Custom 404 page (R6)

Two new files and one config setting.

- `src/404.html`. Same head as other pages (viewport, title `Page not found | Joanna Oates`, favicon links) plus `<meta name="robots" content="noindex">`. No canonical and no Open Graph tags. Body: the same `<nav class="topnav">` with 8 links and no `active` item, then:

  ```html
  <div class="container defaultMargin">
      <div class="center">
          <h1>Page not found</h1>
          <div class="purpleLine"></div>
          <p>The page you were looking for does not exist or has moved.</p>
          <p><a href="/">Go to the home page</a></p>
      </div>
  </div>
  ```

  One link to home is the page's single call to action. The footer is omitted because its "Book a discovery call" link would compete with it.
- `src/404.js`. Copy of the other entry files: imports `normalize.css` and `main.css`, no page CSS, then the burger and resize wiring. The wiring is the existing copy-pasted block. Removing that duplication is Phase 6.
- **`output.publicPath: '/'` in `webpack.prod.config.js`.** Injected asset URLs change from `index.4b640c6a.js` to `/index.4b640c6a.js` on all 9 pages. This is needed because Netlify serves `404.html` at the requested URL. It is safe for this site, which is deployed at the domain root. It is not applied to the dev config.
- Any URL inside the 404 page must be root-absolute. Today the page has no images, so `media/...` is not an issue. Other pages keep their relative `media/` paths, which work at the root-level URLs they are served from.
- Netlify uses `404.html` from the publish directory automatically. No redirect rule is needed (per Netlify's docs).

### 4. Favicon and manifest links (R1)

Add to the `<head>` of all 8 pages and the 404 page, directly after the last `og:` tag (on the 404 page, after the `robots` meta):

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

This is the set the favicon.io pack is designed for. Five small tags cost about 340 bytes per page. R1.2 is checked by listing `dist/` for each file.

`site.webmanifest` has `"name":""` and `"short_name":""`, so an installed icon would have no label. This is outside the requirements, so I'm asking before changing it (see Open questions).

### 5. Link preview image and tags (R4)

**One shared image for all 8 pages.** Recommended over per-page images (R4.3 is "may"):

| Option | Pros | Cons |
|---|---|---|
| A. One `og-image.jpg` on all pages (recommended) | One file to make and check. Same preview everywhere | Pages share one preview |
| B. Per-page images | Different preview per page | Today's per-page images are 472 to 811 KB each. Each would need its own 1200x630 crop and check |

**Making the file.** A one-off script, `scripts/make-og-image.js`, committed so the crop can be repeated:

```js
sharp('src/media/JoImageHome.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile('src/media/og-image.jpg');
```

- The source is square (3300x3301), so a 1200x630 crop keeps about half of the height. `position: 'attention'` asks `sharp` to keep the most detailed region. I'll open the result and check that the face is not cut off. If it is, I'll change to an explicit `extract` region and say so.
- Output goes in `src/media/`, which `build-prod` already copies to `dist/media/`. Expected size is 60 to 150 KB, which I can't state until it exists. I'll report the real number (target under 300 KB).
- `sharp` is already a `devDependency`, so there is no new dependency.
- I'm not adding an npm script for it. It runs once. The commit message and a comment at the top of the file say how to rerun it.

**Tags (all 8 pages).** The existing `og:image` line changes to `https://joannaoates.com/media/og-image.jpg`. Two lines follow it:

```html
<meta property="og:site_name" content="Joanna Oates">
<meta name="twitter:card" content="summary_large_image">
```

Link-preview tools cache images and the old `JoImageHome.jpg` previews may linger for a while after the change. That needs no action here.

### 6. `netlify.toml` (R5)

Added to the existing file, with `[build]` unchanged:

```toml
[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- Netlify's header paths allow `*` inside a segment, so `/*.js` and `/*.css` match the hashed files at the site root. Every JS and CSS file in `dist/` is webpack output with an 8-character content hash, so a long cache is safe.
- **HTML uses Netlify's default**, which is `Cache-Control: public, max-age=0, must-revalidate`. That is the "revalidating cache" R5.2 asks for. I'm not adding an HTML rule: the extensionless URLs (`/about`) would not match a `/*.html` pattern, and a `/*` catch-all would merge its `Cache-Control` with the immutable rule on JS and CSS. The check on the deploy preview confirms the default (R5.3).
- Images in `/media/` keep the default revalidation. Their names are not hashed, so a long cache would serve stale images after a replacement. Revisit in Phase 3 if images get hashed names.
- No security headers or CSP (R5.4, Phase 7).

### 7. Dependencies (R8)

Move `@babel/core` and `babel-loader` from `dependencies` to `devDependencies` by editing `package.json`, then run `npm install --package-lock-only` so only the `dev` flags in `package-lock.json` change and no versions move. Check with `git diff --stat package-lock.json`.

The `dependencies` object ends up empty. I'll leave it as `{}` rather than remove the key.

Netlify installs dev dependencies (webpack, `css-loader` and others already live there and the build works), so the Netlify build is not affected.

## Order of work

Each step is its own commit on a branch `phase-2-seo-urls`, so any one can be reverted alone.

1. **R8.** `package.json` and lockfile.
2. **R6 and R7 together.** `src/404.html`, `src/404.js`, `webpack.pages.js`, `publicPath` and the dev rewrites, so the webpack configs are edited once. Record the "before" file lists first.
3. **R2.** `sed` on the HTML, sitemap `lastmod`.
4. **R1.** Favicon links on 9 pages.
5. **R4.** Run the script, check the image, then the tags.
6. **R5.** `netlify.toml` redirects and headers.
7. **R3.** Check only.
8. Update the "adding a page" line in `.kiro/steering/project-summary.md` (line 107, which still says "an entry in both webpack configs") to the checklist in section 1. The README has no such section and Phase 6 rewrites it, so I'm not touching the README.

## Risks

| Risk | Mitigation |
|---|---|
| Netlify Pretty URLs conflicts with the redirects (loop or `/about/`) | Check each `Location` header on the deploy preview. Fix is a dashboard setting, which needs the user |
| `publicPath: '/'` breaks asset loading | Build, then grep `dist/*.html` for every `src=` and `href=`, and check each target exists in `dist/` |
| The sed passes miss an unusual link, or change an external one | Scoped to this site's host and root paths. The grep check below runs on `src/` and `dist/` |
| Cropped `og-image.jpg` cuts off the face | Open the file before committing and adjust the crop |
| Form no longer submits at `/contact` | Test submission on the preview, by the user. Netlify only reads the form from the built HTML, so also check the Forms tab still lists `contact` |
| `npm install --package-lock-only` changes versions | Review `git diff package-lock.json`. Only `"dev": true` lines should change |
| Sitemap `lastmod` says changed when only head tags changed | Accepted. The requirement asks for the date of the change |

## Verification

From the repo root, after `npm run build-prod`:

```
# R2.2: no .html page links or index.html left
grep -rnE '(href|content)="[^"]*\.html' src/ dist/
grep -rn "index.html" src/ dist/
# R2.1: canonical and og:url match the sitemap form
grep -rhoE 'rel="canonical" href="[^"]+"|og:url" content="[^"]+"' src/ | sort | uniq -c
# R1.1, R4.2: counts should be 8 for each (9 for the icon links, which include the 404 page)
for t in 'rel="icon"' 'rel="apple-touch-icon"' 'rel="manifest"' 'og:image' 'og:site_name' 'twitter:card'; do echo "$t $(grep -l "$t" src/*.html | wc -l)"; done
# R1.2, R4.1, R6.1: files exist, with sizes
ls -l dist/favicon.ico dist/favicon-16x16.png dist/favicon-32x32.png dist/apple-touch-icon.png dist/site.webmanifest dist/media/og-image.jpg dist/404.html dist/robots.txt dist/sitemap.xml
# R6.2, R3
grep -c 404 src/sitemap.xml; grep -n "Disallow\|Sitemap" dist/robots.txt
# R7.4
find dist -type f | sed -E 's/\.[0-9a-f]{8}\././' | sort > /tmp/prod-after.txt
diff /tmp/prod-before.txt /tmp/prod-after.txt
```

Expected: the first two greps print nothing, the canonical list shows 8 distinct URLs with no `.html`, the counts match, every file is listed, the sitemap has no `404`, and the diff shows only `404.html`, `notFound.js` and `notFound.css`.

- **R7.3:** temporarily add a throwaway page entry to `webpack.pages.js`, confirm both configs build it, then remove it.
- **R8.2:** clone the repo to a temp folder and run `npm ci && npm run build-prod` there. This leaves the working `node_modules` untouched.
- **R2.5:** start the dev server and request `/about`, `/` and `/contact` with `curl -sI`. Expect 200 for each.

**Netlify deploy preview (needs a pushed branch, so I'll ask first).** Using `curl -sI`:

1. For each of the 8 `.html` URLs: status 301 and `Location` ends in the extensionless form with no loop.
2. `/about`: 200. `/does-not-exist`: 404 and the custom page body, with the nav and the home link loading CSS and JS.
3. A hashed `.js` and `.css` file: `cache-control: public, max-age=31536000, immutable`. `/about`: `max-age=0, must-revalidate`.
4. The user submits a test message on `/contact` and confirms the Forms tab still lists `contact`.

If no preview is available, I'll record R2.3, R5.3 and R6.3 as "not checked on a live deployment". An optional offline check is `npx netlify-cli dev`, which applies the `netlify.toml` rules locally. It downloads a package, so I'll only run it if you agree, and I'll label the result "local emulation".

## Open questions

1. `site.webmanifest` has an empty `name` and `short_name`. Should I set both to "Joanna Oates"? It is a two-word edit in a file this phase links to. I'll leave it unchanged unless you say yes.
2. Is the portrait in `JoImageHome.jpg` the right image for link previews? I'll use it unless you name another source.
3. Can I push the branch to get a Netlify deploy preview?

Lighthouse is not part of this phase and was not run.
