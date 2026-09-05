#!/usr/bin/env node
/**
 * Minifies src/styles/*.css into public/css/.
 *
 * nav.css is hand-written and heavily commented, so the readable copy stays the
 * source of truth in src/styles/ and this writes the copy the browser actually
 * downloads. Runs from `npm run build`; the generated files are committed so
 * `astro dev` serves them straight out of public/ too.
 *
 * The transform is deliberately conservative — it strips comments and collapses
 * whitespace, and leaves selectors, values and operators alone — then checks its
 * own output before writing: same braces, same set of selectors, no surviving
 * comment. Anything off aborts rather than shipping broken CSS.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src/styles';
const OUT = 'public/css';

/**
 * Pull string literals out of harm's way before the regex passes run. The
 * placeholder is bare word characters on purpose: the whitespace and structure
 * passes below must not be able to chew off its edges, or a string inside an
 * attribute selector comes back mangled.
 */
function protectStrings(css) {
  const stash = [];
  const masked = css.replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, (m) => {
    stash.push(m);
    return `__CSSSTR${stash.length - 1}__`;
  });
  return [masked, stash];
}

const restoreStrings = (css, stash) =>
  css.replace(/__CSSSTR(\d+)__/g, (_, i) => stash[Number(i)]);

/**
 * The source with comments gone but formatting intact. This, not the raw file,
 * is what the output has to match: nav.css writes braces inside its comment
 * banners, so counting them in the raw text compares two different things.
 */
function stripComments(css) {
  const [masked, stash] = protectStrings(css);
  return restoreStrings(masked.replace(/\/\*[\s\S]*?\*\//g, ''), stash);
}

function minify(css) {
  const [masked, stash] = protectStrings(stripComments(css));
  const out = masked
    .replace(/\s+/g, ' ')                // whitespace runs
    .replace(/\s*([{};,])\s*/g, '$1')    // padding around structure
    .replace(/;}/g, '}')                 // trailing semicolons
    .trim();
  return restoreStrings(out, stash);
}

/**
 * Selector text is everything before a `{` — compare it across the transform.
 * Formatting is normalised away on both sides, comma padding included, so the
 * check reads selector identity rather than re-flagging the very whitespace the
 * minifier is meant to remove.
 */
const selectors = (css) =>
  (css.match(/[^{}]+(?=\{)/g) || [])
    .map((s) => s.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ',').trim())
    .filter(Boolean);

const count = (s, ch) => s.split(ch).length - 1;

mkdirSync(OUT, { recursive: true });

for (const name of readdirSync(SRC).filter((f) => f.endsWith('.css'))) {
  const src = readFileSync(join(SRC, name), 'utf8');
  const out = minify(src);
  const ref = stripComments(src);

  const checks = [
    ['opening braces', count(ref, '{'), count(out, '{')],
    ['closing braces', count(ref, '}'), count(out, '}')],
    ['selectors', selectors(ref).join('|'), selectors(out).join('|')],
  ];
  for (const [what, before, after] of checks) {
    if (before !== after) {
      console.error(`minify-css: ${name} — ${what} changed, refusing to write.`);
      process.exit(1);
    }
  }
  if (out.includes('/*')) {
    console.error(`minify-css: ${name} — comment survived, refusing to write.`);
    process.exit(1);
  }

  writeFileSync(join(OUT, name), out);
  const saved = Math.round((1 - out.length / src.length) * 100);
  console.log(`minify-css: ${name}  ${src.length} -> ${out.length} bytes (-${saved}%)`);
}
