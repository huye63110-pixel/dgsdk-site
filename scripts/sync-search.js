#!/usr/bin/env node
/**
 * Keep the site search index in step with the product pages.
 *
 * The index lives in public/js/scripts.js as a list of
 *   {name, kw, url, cat}
 * objects. `name` must equal the <h1> of the page at `url`. It drifted once
 * already: the pages were renamed to "ST-G Intelligent Ionizing Bar" while
 * the index still said "ST-G Series Intelligent Ion Rod", so the site's own
 * primary keyword returned nothing from the site's own search.
 *
 * This reads the H1s out of the built pages and rewrites the names to match.
 * `kw` is hand-written and is never touched.
 *
 * Usage:
 *   node scripts/sync-search.js          rewrite names that have drifted
 *   node scripts/sync-search.js --check  report only, exit 1 on drift (CI)
 *
 * Run it after `astro build`, since it reads from dist/.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";
const INDEX_FILE = "public/js/scripts.js";
const PRODUCT_ROOT = join(DIST, "products");
const checkOnly = process.argv.includes("--check");

const RED = "\x1b[31m", YEL = "\x1b[33m", GRN = "\x1b[32m", DIM = "\x1b[2m", OFF = "\x1b[0m";
const fail = (m) => { console.error(`${RED}✗${OFF} ${m}`); process.exit(1); };

if (!existsSync(PRODUCT_ROOT)) fail(`${PRODUCT_ROOT} not found — run \`npm run build\` first.`);
if (!existsSync(INDEX_FILE)) fail(`${INDEX_FILE} not found.`);

/* ---------- what the built pages actually say ---------- */

function findIndexHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findIndexHtml(p));
    else if (entry.name === "index.html") out.push(p);
  }
  return out;
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
   .replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&rarr;/g, "→");

const pages = new Map(); // url -> h1
for (const file of findIndexHtml(PRODUCT_ROOT)) {
  const url = "/" + relative(DIST, file).replace(/\/index\.html$/, "").split(/[\\/]/).join("/");
  // Category landing pages are not products; only leaf pages carry a model.
  if (url.split("/").length !== 4) continue;
  const m = readFileSync(file, "utf8").match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!m) { console.warn(`${YEL}!${OFF} no <h1> on ${url}, skipped`); continue; }
  pages.set(url, decode(m[1].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim());
}

/* ---------- what the index says ---------- */

const src = readFileSync(INDEX_FILE, "utf8");
const ENTRY = /\{name:"((?:[^"\\]|\\.)*)",kw:"((?:[^"\\]|\\.)*)",url:"([^"]*)",cat:"([^"]*)"\}/g;
const entries = [...src.matchAll(ENTRY)];

if (!entries.length) {
  fail(`no {name,kw,url,cat} entries found in ${INDEX_FILE}.\n` +
       `  The index shape changed — update the ENTRY pattern in this script.`);
}

/* ---------- compare ---------- */

const drift = [], orphaned = [], missing = [];
for (const e of entries) {
  const [, name, , url] = e;
  if (!pages.has(url)) orphaned.push({ url, name });
  else if (pages.get(url) !== name) drift.push({ url, from: name, to: pages.get(url) });
}
const indexed = new Set(entries.map((e) => e[3]));
for (const [url, h1] of pages) if (!indexed.has(url)) missing.push({ url, h1 });

console.log(`${DIM}index: ${entries.length} entries   pages: ${pages.size} product pages${OFF}`);

for (const o of orphaned)
  console.error(`${RED}✗${OFF} indexed but no such page: ${o.url}  ${DIM}"${o.name}"${OFF}`);

for (const m of missing) {
  console.error(`${RED}✗${OFF} product page missing from search: ${m.url}`);
  console.error(`${DIM}    add, filling in kw yourself:${OFF}`);
  console.error(`    {name:${JSON.stringify(m.h1)},kw:"",url:${JSON.stringify(m.url)},cat:"…"}`);
}

for (const d of drift) {
  console.log(`${YEL}~${OFF} ${d.url}`);
  console.log(`${DIM}    was:${OFF} ${d.from}`);
  console.log(`${DIM}    now:${OFF} ${d.to}`);
}

/* ---------- act ---------- */

// A page that exists but is not indexed, or an entry pointing nowhere, needs a
// person: the first wants hand-written kw, the second wants a decision about
// whether the page was renamed or retired. Neither can be guessed here.
const needsHuman = orphaned.length + missing.length;

if (checkOnly) {
  if (drift.length || needsHuman) {
    console.error(`\n${RED}✗${OFF} search index is out of date — run \`npm run sync-search\``);
    process.exit(1);
  }
  console.log(`${GRN}✓${OFF} search index matches every product page`);
  process.exit(0);
}

if (drift.length) {
  const byUrl = new Map(drift.map((d) => [d.url, d.to]));
  const out = src.replace(ENTRY, (whole, name, kw, url, cat) =>
    byUrl.has(url)
      ? `{name:${JSON.stringify(byUrl.get(url))},kw:"${kw}",url:"${url}",cat:"${cat}"}`
      : whole
  );
  writeFileSync(INDEX_FILE, out);
  console.log(`\n${GRN}✓${OFF} rewrote ${drift.length} name${drift.length > 1 ? "s" : ""} in ${INDEX_FILE}`);
} else {
  console.log(`${GRN}✓${OFF} every name already matches its page H1`);
}

if (needsHuman) {
  console.error(`${RED}✗${OFF} ${needsHuman} entr${needsHuman > 1 ? "ies" : "y"} above need you — names were not the only problem`);
  process.exit(1);
}
