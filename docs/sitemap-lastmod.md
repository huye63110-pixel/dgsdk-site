# Sitemap dates in local and deployment builds

`scripts/sync-sitemap.js` uses the last author date committed for a page and
its directly imported `src/data` modules. Shared layouts, headers and footers
remain excluded. It does not set Article `dateModified`.

A shallow Git boundary can make unchanged, older files appear to have changed
on the boundary date. File mtimes also change during checkout or extraction.
Neither is a reliable content date.

- **Complete history:** calculate dates as before. A missing or failed history
  lookup preserves that page's existing date and reports it as unverified.
- **Shallow or unavailable Git history:** preserve existing valid dates and
  report that history was not verified. The production build needs no network
  fetch or Git credentials.
- **Every environment:** unresolved page URLs, missing dates and invalid
  calendar dates fail before any rewrite. No fallback invents a date.

## Before opening a PR

Use a checkout with complete history. Commit page/data edits **before** syncing,
because Git cannot date uncommitted content:

```sh
npm run sync-sitemap
npm run check-sitemap-history
npm run test-sitemap
npm run build
npm run check-search
```

Commit any resulting `public/sitemap.xml` change too. Then verify the final
checkout with `npm run check-sitemap-history`. This strict command fails when
history is incomplete or a page/data path has no usable history; a pass from
the ordinary `check-sitemap` in a shallow checkout only validates the preserved
dates and source paths, not when the content changed.

`npm run build` keeps the ordinary sync command, so shallow deployment clones
can publish the dates already checked and committed in the full-history PR.
If source changes but its committed sitemap is stale, a shallow build cannot
discover that; the strict pre-merge check remains necessary.

The regression tests use isolated local repositories, including an actual
depth-10 clone and a linked worktree. They exercise date changes, preserved
dates, missing history, invalid dates, dead URLs, and non-writing checks.
