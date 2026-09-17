#!/usr/bin/env node
/**
 * Keep <lastmod> in public/sitemap.xml in step with when each page actually
 * changed.
 *
 * The dates were maintained by hand and had stopped being true: 44 of the 45
 * entries were stale, several by five months. /contact and /about still said
 * 2026-04-28 on the day both were rewritten. lastmod is the signal that tells
 * a crawler a page is worth re-fetching, so a stale one quietly slows down
 * re-indexing of work that has already shipped.
 *
 * WHERE THE DATE COMES FROM
 * The last commit that touched the page's own source, plus any src/data/*.js
 * module that source imports. The data modules matter because a page's content
 * can now live in one: adding a post to src/data/resources.js changes what
 * /blog says without changing blog/index.astro at all.
 *
 * Deliberately NOT counted: the shared layout, header and footer. They touch
 * all 45 pages at once, and bumping every date whenever the footer moves is
 * how a lastmod stops meaning anything. This tracks the page's own content.
 *
 * Falls back to the file's mtime where git has no history for a path (a file
 * that is new and unstaged), so a fresh checkout without .git still works.
 *
 * Usage:
 *   node scripts/sync-sitemap.js          rewrite dates that have drifted
 *   node scripts/sync-sitemap.js --check  report only, exit 1 on drift (CI)
 *
 * Runs from `npm run build`, before astro build, since it reads src/ and
 * writes public/.
 */

import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve, relative } from "node:path";

const SITEMAP = "public/sitemap.xml";
const ORIGIN = "https://www.dg-sdk.com";
const PAGES = "src/pages";
const checkOnly = process.argv.includes("--check");

const GRN = "[32m";
const RED = "[31m";
const DIM = "[2m";
const OFF = "[0m";

/** The source file that renders a URL, or null if nothing matches. */
function sourceFor(url) {
  const path = url.replace(ORIGIN, "").replace(/^\/|\/$/g, "");
  const candidates = path === ""
    ? [join(PAGES, "index.astro")]
    : [join(PAGES, `${path}.astro`), join(PAGES, path, "index.astro")];
  return candidates.find(existsSync) || null;
}

/** Local src/data modules the file imports, resolved to repo-relative paths. */
function dataImports(file) {
  const src = readFileSync(file, "utf8");
  const out = [];
  for (const m of src.matchAll(/from\s+["'](\.[^"']+)["']/g)) {
    const resolved = relative(process.cwd(), resolve(dirname(file), m[1]));
    if (resolved.startsWith("src/data/") && existsSync(resolved)) out.push(resolved);
  }
  return out;
}

/** yyyy-mm-dd of the last commit touching a path, or null if git has none. */
function lastCommit(path) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%ad", "--date=short", "--", path], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function mtime(path) {
  return statSync(path).mtime.toISOString().slice(0, 10);
}

/** The newest date across a page's own source and the data it reads. */
function changedOn(file) {
  const dates = [file, ...dataImports(file)]
    .map((p) => lastCommit(p) || mtime(p))
    .filter(Boolean);
  return dates.sort().pop();
}

const xml = readFileSync(SITEMAP, "utf8");

// Rewritten per <url> block rather than by re-serialising the document: the
// file mixes one-line and indented entries, and a round-trip through an XML
// writer would reformat all 45 of them and bury the real change in noise.
const drift = [];
const missing = [];

const updated = xml.replace(/<url>[\s\S]*?<\/url>/g, (block) => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/);
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/);
  if (!loc || !lastmod) return block;

  const url = loc[1].trim();
  const source = sourceFor(url);
  if (!source) {
    missing.push(url);
    return block;
  }

  const was = lastmod[1].trim();
  const now = changedOn(source);
  if (now === was) return block;

  drift.push({ url: url.replace(ORIGIN, "") || "/", was, now, source });
  return checkOnly ? block : block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${now}</lastmod>`);
});

const total = (xml.match(/<url>/g) || []).length;
console.log(`${DIM}sitemap: ${total} urls   sources resolved: ${total - missing.length}${OFF}`);

if (missing.length) {
  console.error(`${RED}✗${OFF} no page source for ${missing.length} url(s) — these may be dead entries:`);
  missing.forEach((u) => console.error(`    ${u}`));
}

if (drift.length) {
  const width = Math.max(...drift.map((d) => d.url.length));
  drift.forEach((d) => console.log(`    ${d.url.padEnd(width)}  ${d.was} -> ${d.now}`));
}

if (checkOnly) {
  if (drift.length || missing.length) {
    console.error(`${RED}✗${OFF} ${drift.length} stale lastmod, ${missing.length} unresolved url(s)`);
    process.exit(1);
  }
  console.log(`${GRN}✓${OFF} every lastmod matches when its page last changed`);
  process.exit(0);
}

if (drift.length) {
  writeFileSync(SITEMAP, updated);
  console.log(`${GRN}✓${OFF} updated ${drift.length} lastmod date${drift.length > 1 ? "s" : ""} in ${SITEMAP}`);
} else {
  console.log(`${GRN}✓${OFF} every lastmod already matches when its page last changed`);
}

if (missing.length) process.exit(1);
