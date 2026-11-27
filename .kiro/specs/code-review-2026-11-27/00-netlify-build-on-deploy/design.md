# Phase 0 Design: Netlify Build on Deploy

Covers R1 to R4 in `requirements.md`.

## What I found in the repo

- `build-prod` copies `src/media`, `src/favicon_io`, `robots.txt` and `sitemap.xml` into `dist/` and then runs webpack. `webpack.prod.config.js` sets `output.clean: true`, so webpack deletes the copied files at the start of its run. The `media/` copy is the exception that matters: the HTML references hashed assets from webpack, but `media/` paths are plain strings and must exist after the build.
- The committed `dist/` has no `robots.txt`, `sitemap.xml` or favicon files in its listing. This matches the cause above (R2.1 still requires a recorded build to confirm it).
- No `netlify.toml` exists. `.gitignore` contains only `node_modules` and `.DS_Store`.
- 80 files under `dist/` and `dev/` are tracked in git.
- `src/contact.html` is the only file with Netlify form markup.
- Local Node is `v26.5.0`. There is no `.nvmrc`.

## Design

### 1. `build-prod` order (R2)

Move the copy steps after webpack:

```
"build-prod": "webpack --config webpack.prod.config.js && mkdirp -p dist/media && cp -r src/media/* dist/media && cp -r src/favicon_io/* dist/ && cp src/robots.txt src/sitemap.xml dist/"
```

Why this and not `copy-webpack-plugin`:

| Option | Pros | Cons |
|---|---|---|
| A. Reorder the script (recommended) | One line changed, no new dependency, webpack config untouched (Phase 2 owns it) | Copy logic lives in an npm script. `cp` is Unix only, which is already true today and matches Netlify's Linux builders |
| B. `copy-webpack-plugin` | Works in `webpack serve`, cross-platform | New dependency, edits the webpack config in Phase 0, which the requirements rule out |

Fallback is option B, per R2.3, and only if A fails verification.

Idempotence (R2.4): `output.clean` empties `dist/` at the start of each webpack run, then the copies repopulate it, so two runs give the same list. Verify by diffing `find dist -type f | sort` from two consecutive runs.

`build-dev` has the same ordering problem if `webpack.dev.config.js` also cleans. It is out of scope here. I'll note it for Phase 6 (R3, clean script and dev server) rather than change it.

### 2. `netlify.toml` (R1)

```toml
[build]
  command = "npm run build-prod"
  publish = "dist"

[build.environment]
  NODE_VERSION = "<value confirmed below>"
```

- No redirects, headers, 404 or `[functions]` block (R1.3). Settings in `netlify.toml` override the dashboard, so the dashboard's `netlify/functions` entry is left as it is. It points at a folder that doesn't exist, which Netlify ignores.
- `NODE_VERSION`: the requirement says to match `node -v` (26.5.0). I can't confirm from here that Netlify's build image supports Node 26. Before committing, check Netlify's supported Node versions. If 26 is not available, pin the newest supported LTS, run the build locally with that version, and tell the user about the difference. Pin to a major (for example `"22"`) rather than a full patch version, so security patches still arrive.
- Add an `.nvmrc` with the same value only if the user wants local and CI to match. It is not required, so I'll ask rather than add it.
- `npm ci` is what Netlify runs when a lockfile exists. Confirm `package-lock.json` is committed. R1.4 is checked locally with `npm ci && npm run build-prod` on a fresh clone.
- Dependency placement (`@babel/core` and `babel-loader` under `dependencies`) is Phase 2 R8. Netlify installs `devDependencies` during the build, so webpack and the loaders are available.

### 3. Recording the old dashboard settings (R1.1)

Put the settings table from `requirements.md` in the commit message of the `netlify.toml` commit. This avoids a README edit that Phase 6 will rewrite anyway.

### 4. Verification on a deploy preview (R3)

1. Branch `phase-0-netlify-build`. Push `netlify.toml` and the `package.json` change.
2. In the preview build log, confirm `npm run build-prod` ran and Node version matches.
3. Check on the preview URL: all 8 pages, `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/site.webmanifest`, and images from `/media/`. Use `curl -sI` for status codes and `content-type`.
4. Forms: Netlify scans the built HTML. Because the HTML is now minified in the Netlify build as well as in the committed `dist/`, confirm the contact form still appears in the Forms tab. That needs the user, as the dashboard is not reachable from here.
5. If the preview fails (R3.4), production stays unchanged. The user chooses between fixing the build and committing a rebuilt `dist/`.
6. After the user approves, merge, then repeat step 3 on the live URL.

Since a preview deploy needs a pushed branch, I will ask before pushing.

### 5. Untracking build output (R4)

Order matters. Only after R3 passes on production:

1. Add `dist/` and `dev/` to `.gitignore`.
2. Ask the user to confirm, stating that `git rm -r --cached dist dev` untracks 80 files and leaves git history unchanged.
3. Run the command on confirmation, commit, push, and confirm Netlify's fresh build still deploys (R4.3).

History purging is not done, per R4.4.

## Risks

| Risk | Mitigation |
|---|---|
| Node version unsupported on Netlify | Check the supported list before pinning, fall back to the newest LTS |
| Build passes locally but fails on Netlify (case sensitive paths, for example `src/media/07-the sunshine-room-5.png` has a space) | Deploy preview before production |
| Forms tab loses the contact form | Check in R3.3 before merging. Production is unchanged until then |
| Untracking `dist/` before Netlify builds correctly leaves production without a site | R4 only starts after R3 passes on production |

## Verification outputs

- The Netlify build log excerpt showing the command and Node version.
- Sorted `dist/` file list from two consecutive local builds, with their diff.
- `curl -sI` status lines for the URLs in R3.2, on the preview and on production.
- The user's note on the Forms tab.
- Lighthouse is not part of this phase.
