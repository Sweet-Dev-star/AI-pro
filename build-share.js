/* Builds dist/share.html — one self-contained page carrying the reference
   corpus, for sending to someone who should not have to install anything.
   Same stylesheet and same UI code as the served app, so the two cannot drift. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CORPUS, WEIGHTS, SCORE_LABELS } from "./lib/corpus.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => fs.readFileSync(path.join(here, p), "utf8");

const css = read("public/styles.css");
const js = read("public/app.js");
const data = JSON.stringify({ corpus: CORPUS, weights: WEIGHTS, scoreLabels: SCORE_LABELS })
  .replace(/</g, "\\u003c"); // never let corpus text close the script tag

// No doctype / html / head / body: the artifact host supplies the skeleton.
const page = `<title>Polarity</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Serif:wght@400;500;600&display=swap" />
<style>
${css}
</style>

<div class="shell">
  <header class="topbar">
    <span class="wordmark"><b>Polarity</b></span>
    <span class="tagline">Dialectical analysis of a thesis</span>
    <span class="mode-chip" id="mode">&nbsp;</span>
  </header>
  <main id="app"></main>
</div>

<script>window.__POLARITY__ = ${data};</script>
<script>
${js}
</script>
`;

fs.mkdirSync(path.join(here, "dist"), { recursive: true });
fs.writeFileSync(path.join(here, "dist/share.html"), page);

const variants = CORPUS.flatMap((t) => t.variants).length;
console.log(
  `dist/share.html — ${CORPUS.length} theses, ${variants} schemes, ${(page.length / 1024).toFixed(0)} KB`
);
