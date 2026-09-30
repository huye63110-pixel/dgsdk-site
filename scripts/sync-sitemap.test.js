import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, utimesSync, chmodSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const script = fileURLToPath(new URL("./sync-sitemap.js", import.meta.url));
const root = mkdtempSync(join(tmpdir(), "dgsdk-sitemap-test-"));
const seed = join(root, "seed");
const sitemap = "public/sitemap.xml";
const origin = "https://www.dg-sdk.com";
const initialXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><lastmod>2026-09-01</lastmod></url>
  <url><loc>${origin}/privacy</loc><lastmod>2026-09-05</lastmod></url>
  <url><loc>${origin}/guides</loc><lastmod>2026-09-03</lastmod></url>
</urlset>
`;

function put(repo, path, text) {
  writeFileSync(join(repo, path), text);
}
function git(repo, args, env = {}) {
  return execFileSync("git", args, {
    cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, GIT_CONFIG_NOSYSTEM: "1", ...env },
  }).trim();
}
function commit(repo, date, message, committerDate = date) {
  git(repo, ["add", "."]);
  git(repo, ["-c", "user.name=Sitemap test", "-c", "user.email=sitemap@example.invalid",
    "-c", "commit.gpgsign=false", "commit", "--quiet", "--allow-empty", "-m", message], {
    GIT_AUTHOR_DATE: `${date}T12:00:00+00:00`,
    GIT_COMMITTER_DATE: `${committerDate}T12:00:00+00:00`,
  });
}
function fixture(t, mode = "full") {
  const repo = mkdtempSync(join(root, "case-"));
  if (mode === "none") {
    cpSync(seed, repo, { recursive: true, filter: (path) => !path.split(/[\\/]/).includes(".git") });
  } else {
    git(root, ["clone", "--quiet", ...(mode === "shallow" ? ["--depth=10"] : []), pathToFileURL(seed).href, repo]);
  }
  t.after(() => rmSync(repo, { recursive: true, force: true }));
  return repo;
}
function run(repo, args = [], env = {}) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: repo, encoding: "utf8", env: { ...process.env, ...env },
  });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}
function xml(repo) { return readFileSync(join(repo, sitemap), "utf8"); }
function passes(result) { assert.equal(result.status, 0, result.output); }
function fails(result) { assert.equal(result.status, 1, result.output); }

before(() => {
  for (const dir of ["public", "src/pages/guides", "src/data", "src/components"]) {
    mkdirSync(join(seed, dir), { recursive: true });
  }
  git(seed, ["init", "--quiet"]);
  put(seed, "src/pages/index.astro", "<h1>Home</h1>\n");
  put(seed, "src/pages/privacy.astro", "<h1>Privacy</h1>\n");
  put(seed, "src/pages/guides/index.astro", "---\nimport items from '../../data/items.js';\nimport Header from '../../components/Header.astro';\n---\n<Header />{items}\n");
  put(seed, "src/data/items.js", "export default ['a'];\n");
  put(seed, "src/components/Header.astro", "<header>Navigation</header>\n");
  put(seed, sitemap, initialXML);
  commit(seed, "2026-09-01", "initial content");
  put(seed, "src/data/items.js", "export default ['a', 'b'];\n");
  commit(seed, "2026-09-03", "guide data changed");
  put(seed, "src/pages/privacy.astro", "<h1>Updated privacy</h1>\n");
  commit(seed, "2026-09-05", "privacy changed");
  for (let day = 10; day <= 24; day++) {
    put(seed, "unrelated.txt", `${day}\n`);
    commit(seed, `2026-09-${day}`, "unrelated change");
  }
});
after(() => rmSync(root, { recursive: true, force: true }));

test("complete history verifies page and imported-data dates without changing XML", (t) => {
  const repo = fixture(t);
  passes(run(repo, ["--check", "--require-full-history"]));
  passes(run(repo));
  assert.equal(xml(repo), initialXML);
});

test("page and data commits update only their URLs; check never writes", (t) => {
  const repo = fixture(t);
  put(repo, "src/pages/index.astro", "<h1>New home</h1>\n");
  commit(repo, "2026-09-27", "home changed", "2026-09-29");
  put(repo, "src/data/items.js", "export default ['a', 'b', 'c'];\n");
  commit(repo, "2026-09-28", "guide data changed");
  fails(run(repo, ["--check"]));
  assert.equal(xml(repo), initialXML);
  passes(run(repo));
  assert.equal(xml(repo), initialXML.replace("2026-09-01", "2026-09-27").replace("2026-09-03", "2026-09-28"));
  passes(run(repo, ["--check", "--require-full-history"]));
});

test("full history can correct an erroneously newer stored date", (t) => {
  const repo = fixture(t);
  put(repo, sitemap, initialXML.replace("2026-09-01", "2026-09-24"));
  passes(run(repo));
  assert.equal(xml(repo), initialXML);
});

test("shared components and checkout mtimes do not bump content dates", (t) => {
  const repo = fixture(t);
  put(repo, "src/components/Header.astro", "<header>Changed navigation</header>\n");
  commit(repo, "2026-09-29", "header changed");
  utimesSync(join(repo, "src/pages/index.astro"), new Date("2030-01-01"), new Date("2030-01-01"));
  passes(run(repo, ["--check", "--require-full-history"]));
  assert.equal(xml(repo), initialXML);
});

test("real depth-10 clone preserves all dates, including recently changed pages", (t) => {
  const repo = fixture(t, "shallow");
  assert.equal(git(repo, ["rev-parse", "--is-shallow-repository"]), "true");
  assert.equal(git(repo, ["rev-list", "--count", "HEAD"]), "10");
  put(repo, "src/pages/index.astro", "<h1>Recent page</h1>\n");
  commit(repo, "2026-09-29", "recent page, sitemap not yet synced");
  for (const args of [[], ["--check"]]) {
    const result = run(repo, args);
    passes(result);
    assert.match(result.output, /shallow Git history; preserved 3/);
    assert.equal(xml(repo), initialXML);
  }
  fails(run(repo, ["--check", "--require-full-history"]));
});

test("no-Git archive preserves dates rather than taking checkout mtimes", (t) => {
  const repo = fixture(t, "none");
  utimesSync(join(repo, "src/pages/privacy.astro"), new Date("2030-01-01"), new Date("2030-01-01"));
  for (const args of [[], ["--check"]]) {
    const result = run(repo, args);
    passes(result);
    assert.match(result.output, /unavailable Git history; preserved 3/);
    assert.equal(xml(repo), initialXML);
  }
  fails(run(repo, ["--check", "--require-full-history"]));
});

test("an unavailable Git executable preserves existing dates", (t) => {
  const repo = fixture(t);
  passes(run(repo, [], { PATH: join(repo, "no-programs") }));
  assert.equal(xml(repo), initialXML);
});

test("an uncommitted data dependency preserves the whole page's date", (t) => {
  const repo = fixture(t);
  put(repo, "src/pages/guides/index.astro", "---\nimport items from '../../data/new.js';\n---\n{items}\n");
  git(repo, ["add", "src/pages/guides/index.astro"]);
  // Commit the importer before creating its new, untracked dependency.
  commit(repo, "2026-09-29", "new importer");
  put(repo, "src/data/new.js", "export default ['new'];\n");
  const result = run(repo);
  passes(result);
  assert.match(result.output, /complete Git history; preserved 1/);
  assert.equal(xml(repo), initialXML);
  fails(run(repo, ["--check", "--require-full-history"]));
});

test("a Git log failure preserves the page instead of using only known dependency dates", (t) => {
  const repo = fixture(t);
  // Resolve the actual command without depending on a platform-specific Git installation path.
  const actualGit = execFileSync("/usr/bin/which", ["git"], { encoding: "utf8" }).trim();
  const bin = join(repo, "test-bin");
  mkdirSync(bin);
  put(repo, "test-bin/git", `#!${process.execPath}\nconst {spawnSync}=require('node:child_process');\nconst args=process.argv.slice(2);\nif(args[0]==='log' && args.at(-1)==='src/data/items.js') process.exit(128);\nconst r=spawnSync(${JSON.stringify(actualGit)},args,{stdio:'inherit'});\nprocess.exit(r.status ?? 1);\n`);
  chmodSync(join(bin, "git"), 0o755);
  const result = run(repo, [], { PATH: `${bin}:${process.env.PATH}` });
  passes(result);
  assert.match(result.output, /preserved 1/);
  assert.equal(xml(repo), initialXML);
});

test("dead URLs still fail without reliable history and never partially rewrite", (t) => {
  for (const mode of ["full", "shallow", "none"]) {
    const repo = fixture(t, mode);
    const bad = initialXML.replace("/privacy</loc>", "/removed</loc>").replace("2026-09-01", "2026-09-24");
    put(repo, sitemap, bad);
    for (const args of [[], ["--check"]]) {
      fails(run(repo, args));
      assert.equal(xml(repo), bad);
    }
  }
});

test("missing, empty and impossible dates fail rather than inventing a fallback", (t) => {
  for (const mode of ["full", "shallow", "none"]) {
    const repo = fixture(t, mode);
    for (const tag of ["", "<lastmod></lastmod>", "<lastmod>2026-02-30</lastmod>"]) {
      const bad = initialXML.replace("<lastmod>2026-09-01</lastmod>", tag);
      put(repo, sitemap, bad);
      fails(run(repo));
      fails(run(repo, ["--check"]));
      assert.equal(xml(repo), bad);
    }
  }
});

test("linked worktrees are recognized as complete Git history", (t) => {
  const repo = fixture(t);
  const worktree = resolve(root, `worktree-${Date.now()}`);
  git(repo, ["worktree", "add", "--quiet", "--detach", worktree, "HEAD"]);
  t.after(() => rmSync(worktree, { recursive: true, force: true }));
  const result = run(worktree, ["--check", "--require-full-history"]);
  passes(result);
  assert.match(result.output, /3 lastmod verified, 0 preserved/);
});
