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
 * Recalculate only with complete Git history. A shallow boundary can look
 * like the commit that changed every older file; checkout mtimes are not
 * content dates either. Shallow/no-Git builds preserve valid committed dates.
 * A path with no usable history also keeps its existing date, with a warning.
 *
 * Usage:
 *   node scripts/sync-sitemap.js          rewrite dates that have drifted
 *   node scripts/sync-sitemap.js --check  report only, exit 1 on drift (CI)
 *   node scripts/sync-sitemap.js --check --require-full-history
 *                                      also fail if dates cannot be verified
 *
 * Runs from `npm run build`, before astro build, since it reads src/ and
 * writes public/.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve, relative } from "node:path";

const SITEMAP = "public/sitemap.xml";
const ORIGIN = "https://www.dg-sdk.com";
const PAGES = "src/pages";
const checkOnly = process.argv.includes("--check");
const requireFullHistory = process.argv.includes("--require-full-history");

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

function git(args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

// Git commands also work in linked worktrees, where .git is a file.
const shallow = git(["rev-parse", "--is-shallow-repository"]);
const history = shallow === "false" ? "complete" : shallow === "true" ? "shallow" : "unavailable";

function validDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

/** yyyy-mm-dd of the last commit touching a path, or null if unverifiable. */
function lastCommit(path) {
  const date = git(["log", "-1", "--format=%ad", "--date=short", "--", path]);
  return date && validDate(date) ? date : null;
}

/** The newest date across a page's own source and the data it reads. */
function changedOn(file) {
  const dates = [file, ...dataImports(file)].map(lastCommit);
  // One unknown dependency makes the page's latest date unknown as well.
  if (dates.some((date) => date === null)) return null;
  return dates.sort().pop();
}

const xml = readFileSync(SITEMAP, "utf8");

// Rewritten per <url> block rather than by re-serialising the document: the
// file mixes one-line and indented entries, and a round-trip through an XML
// writer would reformat all 45 of them and bury the real change in noise.
const drift = [];
const missing = [];
const invalid = [];
const preserved = [];

const updated = xml.replace(/<url>[\s\S]*?<\/url>/g, (block) => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/);
  const lastmod = block.match(/<lastmod>([^<]*)<\/lastmod>/);
  if (!loc) {
    invalid.push("<url> without a <loc>");
    return block;
  }

  const url = loc[1].trim();
  const source = sourceFor(url);
  if (!source) {
    missing.push(url);
    return block;
  }

  const was = lastmod?.[1].trim();
  if (!was || !validDate(was)) {
    invalid.push(`${url}: missing or invalid lastmod ${JSON.stringify(was ?? "")}`);
    return block;
  }
  const now = history === "complete" ? changedOn(source) : null;
  if (now === null) {
    preserved.push(url);
    return block;
  }
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

if (invalid.length) {
  console.error(`${RED}✗${OFF} invalid sitemap entries:`);
  invalid.forEach((entry) => console.error(`    ${entry}`));
}

if (history !== "complete" || preserved.length) {
  console.warn(`${DIM}sitemap: ${history} Git history; preserved ${preserved.length} existing lastmod date(s), not verified against content history${OFF}`);
  if (history === "complete") preserved.forEach((url) => console.warn(`    no usable history for page or data: ${url}`));
}

// Validate before writing, so one dead route or invalid date cannot leave a
// partially rewritten sitemap behind. Strict verification is opt-in; deploy
// builds can safely use the dates checked and committed with full history.
if (missing.length || invalid.length || (requireFullHistory && (history !== "complete" || preserved.length))) {
  if (requireFullHistory && (history !== "complete" || preserved.length)) {
    console.error(`${RED}✗${OFF} full Git history for every page and data dependency is required to verify lastmod`);
  }
  process.exit(1);
}

if (drift.length) {
  const width = Math.max(...drift.map((d) => d.url.length));
  drift.forEach((d) => console.log(`    ${d.url.padEnd(width)}  ${d.was} -> ${d.now}`));
}

if (checkOnly) {
  if (drift.length) {
    console.error(`${RED}✗${OFF} ${drift.length} stale lastmod`);
    process.exit(1);
  }
  console.log(`${GRN}✓${OFF} sources and dates valid; ${total - preserved.length} lastmod verified, ${preserved.length} preserved`);
  process.exit(0);
}

if (drift.length) {
  writeFileSync(SITEMAP, updated);
  console.log(`${GRN}✓${OFF} updated ${drift.length} lastmod date${drift.length > 1 ? "s" : ""} in ${SITEMAP}`);
} else {
  console.log(`${GRN}✓${OFF} sources and dates valid; ${total - preserved.length} lastmod verified, ${preserved.length} preserved`);
}
