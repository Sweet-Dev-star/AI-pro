/* Route logic, shared by the local server and the Vercel functions so the two
   cannot drift. Each handler takes a plain body object and returns plain JSON,
   or throws an Error carrying a `.status`. */

import { CORPUS, WEIGHTS, SCORE_LABELS, relevance, findThesis } from "./corpus.js";

export const LIVE = Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);

// Optional shared-link gate. Inactive unless POLARITY_ACCESS_CODE is set, so it
// changes nothing for a local run or a key-less public demo. When it is set, the
// link you hand out carries the code: https://your-app.vercel.app/?k=<code>
const ACCESS_CODE = process.env.POLARITY_ACCESS_CODE || "";

export const referenceCatalogue = CORPUS.map((t) => t.thesis.label);

const fail = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/* On Vercel each invocation may be a cold start, so this only helps while an
   instance stays warm. Correctness never depends on it. */
const cache = new Map();
const cached = async (key, produce) => {
  if (cache.has(key)) return cache.get(key);
  const value = await produce();
  cache.set(key, value);
  if (cache.size > 200) cache.delete(cache.keys().next().value);
  return value;
};

let generatorPromise = null;
const generator = () => {
  // Imported only when there are credentials to use, so a key-less deployment
  // never needs the SDK installed at all.
  if (!generatorPromise) generatorPromise = import("./generate.js");
  return generatorPromise;
};

const rank = (variants) =>
  variants
    .map((v) => ({ ...v, relevance: relevance(v.scores) }))
    .sort((a, b) => b.relevance - a.relevance);

export function checkAccess(code) {
  if (!ACCESS_CODE) return;
  if (String(code || "") !== ACCESS_CODE) {
    throw fail("This demo needs an access code. Use the full link you were sent.", 401);
  }
}

// --- reference mode -------------------------------------------------------

function referenceExpand(query) {
  const entry = findThesis(query);
  if (!entry) {
    throw fail(
      `Reference mode covers ${referenceCatalogue.join(", ")}. Set ANTHROPIC_API_KEY to analyse any thesis.`,
      404
    );
  }
  return { thesis: entry.thesis, variants: rank(entry.variants) };
}

function referenceScheme({ thesis, label }) {
  const entry = findThesis(thesis);
  const variant = entry?.variants.find((v) => v.label.toLowerCase() === String(label).toLowerCase());
  if (!variant) throw fail("No reference scheme for that obligation.", 404);
  return variant.scheme;
}

// --- handlers -------------------------------------------------------------

export async function config() {
  return {
    live: LIVE,
    gated: Boolean(ACCESS_CODE),
    weights: WEIGHTS,
    scoreLabels: SCORE_LABELS,
    examples: LIVE
      ? [...referenceCatalogue, "Consensus", "Simplicity", "Move fast"]
      : referenceCatalogue,
    catalogue: referenceCatalogue
  };
}

export async function expand(body = {}) {
  const input = String(body.thesis || "").trim();
  if (!input) throw fail("Enter a thesis to analyse.", 400);
  if (input.length > 200) throw fail("Keep the thesis under 200 characters.", 400);

  if (!LIVE) return { ...referenceExpand(input), source: "reference" };

  const { expandThesis } = await generator();
  const result = await cached(`expand:${input.toLowerCase()}`, () => expandThesis(input));
  return { thesis: result.thesis, variants: rank(result.variants), source: "live" };
}

export async function scheme(body = {}) {
  const thesis = String(body.thesis || "").trim();
  const label = String(body.label || "").trim();
  const antithesis = String(body.antithesis || "").trim();
  if (!thesis || !label) throw fail("A thesis and an obligation are both required.", 400);

  if (!LIVE) return { scheme: referenceScheme({ thesis, label }), source: "reference" };

  const { buildScheme } = await generator();
  const key = `scheme:${thesis.toLowerCase()}|${label.toLowerCase()}`;
  return { scheme: await cached(key, () => buildScheme({ thesis, antithesis, label })), source: "live" };
}
