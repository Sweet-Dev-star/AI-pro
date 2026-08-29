# Polarity

Enter a thesis → get its hidden obligations, ranked → click one → get its scheme.

A working prototype of the simple dialectical model: for a thesis **T**, surface the
**A+** variants it quietly depends on, and draw the polarity scheme for any of them.

## Run it

```bash
node server.js          # http://localhost:4173
```

That's it — no install needed. The app starts in **reference mode**: six worked
theses (Safety, Growth, Transparency, Efficiency, Loyalty, Speed), 24 hand-written
schemes, everything clickable. Good enough to demo on a machine with nothing on it.

For **live mode**, where any thesis is analysed on demand:

```bash
npm install
ANTHROPIC_API_KEY=sk-... node server.js
```

On Windows PowerShell: `$env:ANTHROPIC_API_KEY = "sk-..."` then `node server.js`.

## Share it

```bash
node build-share.js     # -> dist/share.html
```

One self-contained page carrying the reference corpus. Same stylesheet and same UI
code as the served app, so the two cannot drift apart. Send it to someone who
should not have to install anything.

## Deploy it (Vercel)

```bash
vercel            # preview
vercel --prod
```

Zero-config: `public/` is served statically, `api/*.js` become functions. The route
logic lives in `lib/handlers.js` and is shared with `server.js`, so local and
production cannot diverge.

**Decide first whether production gets an API key.**

*Without one* (set no env vars) the deployment runs in reference mode: six worked
theses, fully clickable, costs nothing, safe to hand to anyone. This is the right
default for a public demo link.

*With one*, every visitor to the URL spends your Anthropic credits. Protect it:

| Env var | Effect |
|---|---|
| `ANTHROPIC_API_KEY` | Turns on live analysis of any thesis |
| `POLARITY_ACCESS_CODE` | Requires a shared code. Share the link as `?k=<code>`; the browser keeps it for the tab |
| `POLARITY_EFFORT` | `high` (default) or `medium`. See the timeout note below |

Vercel's own Deployment Protection works too, and is stronger if you have it.

**Function timeout.** `vercel.json` sets `maxDuration: 60`, the Hobby ceiling. The
expand call at `effort: high` can run close to that. If you see timeouts, set
`POLARITY_EFFORT=medium` — roughly halves it, at some cost to ranking quality — or
move to Pro, where the ceiling is 300s and you can raise `maxDuration`.

**The cache does not survive cold starts.** It is per-instance and best-effort;
correctness never depends on it. The same thesis may be paid for twice.

## The model

One axis, six positions, two operations.

| | |
|---|---|
| **T** | the thesis: a value, goal, or commitment |
| **T+** | its constructive realisation — Safety → Protection |
| **T−** | T pushed past its limit, having dropped its counterpart — Safety → Stagnation |
| **A** | the antithesis pole |
| **A+** | its constructive realisation — Risk → Innovation. **The hidden obligation.** |
| **A−** | A past its limit — Risk → Recklessness |
| **Re+** | the consolidating operation that produces T+ |
| **Ac+** | the probing operation that produces A+ |
| **centre** | what emerges from sustained alternation — Safety/Risk → Resilience |

Every scheme is also stated as three control relations, which is the same content
in rule form:

```
T+ without A+  →  T−        Protection without Innovation  →  Stagnation
A+ without T+  →  A−        Innovation without Protection  →  Recklessness
T+ and    A+   →  centre    Protection and Innovation      →  Resilience
```

The load-bearing claim: a vice is never the opposite pole, it is your own pole
overshooting because its counterpart was abandoned. Which gives the test every
candidate A+ has to pass, and which the generator is prompted against:

> **T pursued without A+ degenerates into T−.**

If that sentence isn't true and non-trivial, the candidate is wrong.

## Install on a phone

It is a PWA. Open the deployed URL on a phone and use **Add to Home Screen**; it
installs with an icon, launches full-screen with no browser chrome, and keeps its
own back stack (the app bar arrow and the phone's back gesture agree).

The service worker caches the app shell, and the reference corpus ships inside
`app.js`, so an installed copy opens and runs **offline** on the built-in theses.
Analysis calls are never cached — a stale scheme is worse than none.

Icons are generated, not committed by hand: `node scripts/make-icons.js` writes the
192/512/maskable/apple PNGs from a hand-rolled PNG writer, so the project keeps zero
image dependencies.

## Ranking

`relevance = 0.30 non-obvious + 0.30 tension + 0.20 positivity + 0.20 actionable`

The four sub-scores are shown as bars on every row. The formula itself used to be
printed above the list and was removed — it read as a claim about the numbers on
screen rather than an explanation of them. The weights live in `lib/corpus.js`.

## Layout

```
lib/handlers.js    the three routes, shared by both front doors
lib/generate.js    prompts + schemas + the two Claude calls
lib/corpus.js      24 reference schemes, the weights, the ranking function
server.js          front door 1 — local HTTP server + static files
api/*.js           front door 2 — Vercel functions
public/            index.html, styles.css, app.js (incl. the wheel SVG)
public/sw.js       app-shell cache; manifest + icons alongside
scripts/           icon generation
build-share.js     bundles the standalone page
vercel.json        function runtime limits
```

The UI is mobile-first: the base CSS is the phone layout and the `min-width`
blocks widen it. On a phone the scheme is one column — wheel, control relations,
centre, then the two operation sets; from 900px the operations flank the wheel.

Two calls, not one: the ranked list on submit, the full scheme lazily on click.
Cheaper, faster first paint, and it matches the interaction. The top-ranked scheme
is prefetched as soon as the list renders, so the first click in a demo is instant.

## Known limits

- **Reference mode only covers the six built-in theses.** Anything else needs a key.
- **No persistence.** The cache is in-process and dies with the server.
- **Vocabulary drifts between runs** in live mode — the same thesis can come back
  with different words for the same structure. Worth measuring before it is worth
  fixing.
- **Server-side refusal fallbacks are not wired up.** Deliberate: this content will
  not trip a classifier, and the fallback path is not exercised here. A `refusal`
  stop reason is checked and surfaced as a normal error.

## What to test next

The generator is prompted against five specific failure modes, in `lib/generate.js`:
plain negation, returning A− where A+ belongs, bland complements with no real
tension, synonym flooding, and a centre that collapses into a synonym of T+. The
second one is the common failure and the one worth watching.

The highest-value next step is a gold standard: 15–20 theses with schemes written
by hand, to compare live output against. That turns "are the results useful?" from
an opinion into a comparison, and separates getting the *structure* wrong from
getting the *vocabulary* wrong — which decides whether the next move is prompt work
or a rethink. The 24 schemes in `lib/corpus.js` are the start of that set.
