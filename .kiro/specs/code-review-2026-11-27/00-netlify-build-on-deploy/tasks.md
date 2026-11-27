# Phase 0 Tasks: Netlify Build on Deploy

Implements `design.md`. Requirement references are in brackets. Tasks marked **(ask first)** need user confirmation before running.

**Status: complete (2026-11-27).** Live on `main` as commits `44c06ac` (netlify.toml, build-prod), `d1eef37` (untrack dist/dev) and `5f0e64b` (robots.txt, requested by the user during this phase).

- [x] 1. Record the baseline [R2.1]
  - [x] 1.1 Run the current `npm run build-prod`. `node_modules` was missing, so `npm ci` ran first.
  - [x] 1.2 Save `find dist -type f | sort` to `/tmp/dist-before.txt`.
  - [x] 1.3 Record what is present. Result: 24 files (8 HTML, 16 JS/CSS). Missing: `robots.txt`, `sitemap.xml`, all favicons, `site.webmanifest` and `media/`. `output.clean` wiped the copied files, so the committed `dist/media/` could not be rebuilt from source.
  - [x] 1.4 Run `git status`. The build showed the 11 tracked `dist/media/` files as deleted. Not committed.

- [x] 2. Reorder `build-prod` [R2.2, R2.3]
  - [x] 2.1 In `package.json`, change `build-prod` to:
    `webpack --config webpack.prod.config.js && mkdirp -p dist/media && cp -r src/media/* dist/media && cp -r src/favicon_io/* dist/ && cp src/robots.txt src/sitemap.xml dist/`
  - [x] 2.2 Leave `webpack.*.config.js` and every other script unchanged.
  - [x] 2.3 Run `npm run build-prod`. Result: 44 files, including `robots.txt`, `sitemap.xml`, 6 favicon files, `site.webmanifest` and 11/11 media files (`07-the sunshine-room-5.png` included).
  - [x] 2.4 No files missing, so `copy-webpack-plugin` was not needed.

- [x] 3. Check idempotence [R2.4]
  - [x] 3.1 Save the sorted file lists from two consecutive runs (`/tmp/dist-run1.txt`, `/tmp/dist-run2.txt`).
  - [x] 3.2 `diff` the two lists. Result: identical.

- [x] 4. Confirm the Node version [R1.2]
  - [x] 4.1 `node -v` gave v26.5.0.
  - [x] 4.2 Netlify's "Available software at build time" page says any version `nvm` can install works (default 24). Node 26 is used, so local and Netlify match.
  - [x] 4.3 Pinned to major `"26"`. Netlify installed v26.13.1.
  - [x] 4.4 Asked about `.nvmrc`. No answer given, so none was added.

- [x] 5. Add `netlify.toml` [R1.2, R1.3, R1.4]
  - [x] 5.1 Created `netlify.toml` with `command`, `publish` and `NODE_VERSION` only.
  - [x] 5.2 Verified a clean build. Deviation: used `git archive HEAD` (excluding `dist/` and `dev/`) plus the two changed files in a `mktemp` folder instead of `git clone`. `npm ci` and `npm run build-prod` succeeded, and the file list matched the local build. `package-lock.json` is tracked.
  - [ ] 5.3 Not done: the delete command was blocked by the tool, so `/tmp/tmp.yCyLRnHCUa` is left behind. It is safe to delete by hand.

- [x] 6. Commit on a branch **(ask first)** [R1.1, R3.1]
  - [x] 6.1 Created branch `phase-0-netlify-build`.
  - [x] 6.2 Committed `netlify.toml` and `package.json` only (`44c06ac`). The dashboard settings table is in the commit message.
  - [x] 6.3 Pushed the branch.

- [ ] 7. Verify the deploy preview [R3.1, R3.2, R3.3]. **Skipped.**
  - No preview was built: Netlify builds Deploy Previews for pull requests, and branch deploys are not enabled. The design's "push a branch" step assumed otherwise.
  - The user chose to push straight to `main` and fix forward. The checks moved to task 8.

- [x] 8. Go live **(ask first)** [R3.5]
  - [x] 8.1 Fast-forwarded `main` to `44c06ac` and pushed, on the user's instruction.
  - [x] 8.2 Production build log: `Config file /opt/build/repo/netlify.toml`, `build.command from netlify.toml`, `$ npm run build-prod`, Node v26.13.1, form `contact` detected (`subject`, `bot-field`, `email`, `message`). `curl` on `https://joannaoates.com`: all 8 pages, `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/apple-touch-icon.png`, `/site.webmanifest` and two `/media/` images returned 200. All 16 referenced JS/CSS files returned 200.

- [x] 9. Stop tracking build output **(ask first)** [R4]
  - [x] 9.1 Started after task 8 passed.
  - [x] 9.2 Added `dist/` and `dev/` to `.gitignore`.
  - [x] 9.3 User confirmed.
  - [x] 9.4 Ran `git rm -r --cached dist dev` (80 files), committed `d1eef37`, pushed. The first push failed with an SSH disconnect, and the retry succeeded.
  - [x] 9.5 The next production build (10:09, which also included `5f0e64b`) deployed with no committed `dist/`. Every check from 8.2 passed again, and all JS, CSS and image references on the 8 pages returned 200 [R4.3].
  - [x] 9.6 History not purged [R4.4].
  - Extra, user requested: deleted local `dist/` (3.0 MB) and `dev/` (4.9 MB). `npm run build-prod` and `npm start` recreate them.

- [x] 10. Hand off
  - [x] 10.1 Reported the build log, the file lists and diff, the `curl` results and the form detection. The form was detected in the build log. The user has not separately confirmed the Forms tab.
  - [x] 10.2 Note for Phase 6: `webpack.dev.config.js` has no `output.clean`, so `build-dev` does not lose its copied files. Also, `npm run clean` runs `rm -R dist/* && rm -R dev/*`, which now fails when those folders don't exist.
  - [x] 10.3 Lighthouse was not run.

## Out-of-phase change made at the user's request
- `src/robots.txt` now reads `User-agent: *`, `Allow: /` and `Sitemap: https://joannaoates.com/sitemap.xml` (`5f0e64b`). It was previously `Disallow: /media/`, which blocked image indexing once the file went live. Confirmed live.

## Follow-ups for later phases
- Phase 2: serve `site.webmanifest` as `application/manifest+json`. It is currently `application/octet-stream`.
- Optional: set the Netlify dashboard build command to `npm run build-prod` so it matches `netlify.toml`. `netlify.toml` takes precedence either way.
- Build log warning: caniuse-lite data is 6 months old (`npx update-browserslist-db@latest`).
