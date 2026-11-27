# Phase 0: Netlify Build on Deploy

Review items: #3 (build output), #18 (build output in git). Done before every other phase.

## Introduction
Netlify currently does not build the site. The dashboard has no build command and publishes `dist/`, so it serves the `dist/` folder committed to git. Source edits therefore don't reach the live site until `dist/` is rebuilt and committed. This phase makes Netlify build on every deploy, so later phases only need `src/` edits and a push.

Known dashboard settings before this phase:

| Setting | Value |
|---|---|
| Runtime | Not set |
| Base directory | `/` |
| Package directory | Not set |
| Build command | Not set |
| Publish directory | `dist` |
| Functions directory | `netlify/functions` (the folder doesn't exist in the repo) |
| Deploy log visibility | Public |

## Assumptions
- Netlify builds from the production branch, and deploy previews are available for other branches.
- This phase changes `netlify.toml`, the `build-prod` script and `.gitignore`. It does not edit `webpack.*.config.js`. Webpack changes are in Phase 2.

## Requirements

### R1: Minimal `netlify.toml`
**User story:** As a developer, I want Netlify to build the site on deploy, so that I don't commit generated files.

**Acceptance criteria**
1. THE SYSTEM SHALL record the dashboard settings above in the commit message or the README before changing anything.
2. THE SYSTEM SHALL add `netlify.toml` with `command = "npm run build-prod"`, `publish = "dist"` and a pinned Node version that matches the one used locally (`node -v`).
3. THE SYSTEM SHALL NOT add redirects, headers or a 404 page in this phase. Those are in Phase 2 and Phase 7.
4. WHEN `npm ci && npm run build-prod` is run on a clean checkout, THE SYSTEM SHALL succeed.

### R2: The prod build keeps static files [Review #3, verify then fix]
**User story:** As a site owner, I want `robots.txt`, `sitemap.xml` and favicons on the live site.

**Acceptance criteria**
1. WHEN the current `npm run build-prod` is run, THE SYSTEM SHALL first record whether `dist/` contains `robots.txt`, `sitemap.xml`, the favicon files and `site.webmanifest`.
2. WHEN `npm run build-prod` completes, THE SYSTEM SHALL have `robots.txt`, `sitemap.xml`, the favicon files, `site.webmanifest` and `media/` in `dist/`.
3. THE SYSTEM SHALL achieve this by copying the files after webpack runs (reordering the steps in the `build-prod` script), so `output.clean` can't delete them and the webpack config stays unchanged. If that fails, THE SYSTEM SHALL propose `copy-webpack-plugin` and explain the trade-off before adding it.
4. WHEN the build runs twice in a row, THE SYSTEM SHALL produce the same file list in `dist/`.

### R3: Verify on a deploy preview, then switch over
**Acceptance criteria**
1. WHEN `netlify.toml` is pushed on a branch, THE SYSTEM SHALL produce a Netlify deploy preview built by Netlify, and its build log SHALL show the `build-prod` command running.
2. WHEN the preview is checked, THE SYSTEM SHALL serve all 8 pages, `/robots.txt`, `/sitemap.xml`, `/favicon.ico` and the images.
3. WHEN the preview is checked, THE SYSTEM SHALL still show the contact form in Netlify's Forms tab after deploy.
4. IF the preview build fails, THEN THE SYSTEM SHALL leave production unchanged and the user decides whether to fix the build or use the fallback of committing a rebuilt `dist/`.
5. WHEN the preview passes and the user approves, THE SYSTEM SHALL merge to the production branch and the live site SHALL be checked against R3.2.

### R4: Stop tracking build output [Review #18]
**Acceptance criteria**
1. WHEN R3 has passed on production, THE SYSTEM SHALL add `dist/` and `dev/` to `.gitignore`.
2. THE SYSTEM SHALL NOT run `git rm -r --cached dist dev` until the user confirms. The request says which paths will be untracked and that git history is unchanged.
3. WHEN the paths are untracked, THE SYSTEM SHALL still deploy correctly from a fresh Netlify build.
4. THE SYSTEM SHALL NOT purge `dist/` or `dev/` from git history. That is a separate decision for the user.

## Verification
- Netlify deploy log excerpt showing the build command.
- `dist/` file list from a clean local build.
- Live URL checks for `/robots.txt`, `/sitemap.xml` and `/favicon.ico`.
- Note whether the Forms tab still lists the contact form.
