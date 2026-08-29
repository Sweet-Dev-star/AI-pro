/* Polarity — UI.
   Runs against the local API when served by server.js, and against an embedded
   corpus when the page has been built as a standalone share. Everything below
   the data layer is identical in both. */

const EMBEDDED = window.__POLARITY__ || null;

const app = document.getElementById("app");
const modeChip = document.getElementById("mode");
const navBack = document.getElementById("navback");

let config = { live: false, weights: {}, scoreLabels: {}, examples: [] };
let current = null; // { thesis, variants }

// ---------------------------------------------------------------------------
// data layer
// ---------------------------------------------------------------------------

/* A deployment may be gated behind a shared code, carried in the link as ?k=…
   and kept for the tab so it survives navigation. Absent everywhere else. */
const ACCESS = (() => {
  let code = "";
  try {
    code = new URLSearchParams(location.search).get("k") || "";
  } catch {
    /* no query string to read */
  }
  try {
    if (code) sessionStorage.setItem("polarity.k", code);
    return code || sessionStorage.getItem("polarity.k") || "";
  } catch {
    return code; // private mode, or storage blocked
  }
})();

const headers = (extra) => (ACCESS ? { ...extra, "x-polarity-access": ACCESS } : { ...extra });

const request = async (path, options = {}) => {
  const res = await fetch(path, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || `Request failed (${res.status}).`);
    error.status = res.status;
    throw error;
  }
  return data;
};

const post = (path, body) =>
  request(path, {
    method: "POST",
    headers: headers({ "content-type": "application/json" }),
    body: JSON.stringify(body)
  });

const relevance = (scores) =>
  Math.round(
    Object.keys(config.weights).reduce((sum, k) => sum + (scores[k] ?? 0) * config.weights[k], 0)
  );

const notStocked = (label) => {
  const error = new Error(`No worked analysis of “${label}” in this build.`);
  error.status = 404;
  return error;
};

const api = EMBEDDED
  ? {
      async config() {
        return {
          live: false,
          weights: EMBEDDED.weights,
          scoreLabels: EMBEDDED.scoreLabels,
          examples: EMBEDDED.corpus.map((t) => t.thesis.label)
        };
      },
      async expand(input) {
        const q = input.trim().toLowerCase();
        const entry =
          EMBEDDED.corpus.find((t) => t.thesis.label.toLowerCase() === q) ||
          EMBEDDED.corpus.find((t) => t.id === q);
        if (!entry) throw notStocked(input.trim());
        return {
          thesis: entry.thesis,
          variants: entry.variants
            .map((v) => ({ ...v, relevance: relevance(v.scores) }))
            .sort((a, b) => b.relevance - a.relevance)
        };
      },
      async scheme({ thesis, label }) {
        const entry = EMBEDDED.corpus.find(
          (t) => t.thesis.label.toLowerCase() === thesis.trim().toLowerCase()
        );
        const variant = entry?.variants.find((v) => v.label.toLowerCase() === label.toLowerCase());
        if (!variant) throw new Error("No scheme available for that obligation.");
        return { scheme: variant.scheme };
      }
    }
  : {
      config: () => request("/api/config", { headers: headers() }),
      expand: (thesis) => post("/api/expand", { thesis }),
      scheme: (payload) => post("/api/scheme", payload)
    };

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Split a band name across at most two lines so it stays inside its wedge. */
function twoLines(text, max = 14) {
  const s = String(text);
  if (s.length <= max) return [s];
  const parts = s.split(/(?<=[\s-])/);
  if (parts.length < 2) return [s];
  let best = null;
  for (let i = 1; i < parts.length; i++) {
    const a = parts.slice(0, i).join("").trim();
    const b = parts.slice(i).join("").trim();
    const cost = Math.abs(a.length - b.length) + Math.max(0, Math.max(a.length, b.length) - max) * 3;
    if (!best || cost < best.cost) best = { cost, lines: [a, b] };
  }
  return best.lines;
}

// ---------------------------------------------------------------------------
// navigation — an explicit stack, so the app bar and the phone's own back
// gesture agree with each other
// ---------------------------------------------------------------------------

const stack = [];
let popping = false;

function syncBack() {
  navBack.hidden = stack.length < 2;
}

function go(render) {
  stack.push(render);
  render();
  syncBack();
  window.scrollTo(0, 0);
  if (!popping) {
    try {
      history.pushState({ depth: stack.length }, "");
    } catch {
      /* history unavailable (sandboxed frame) — the app bar still works */
    }
  }
}

function back() {
  if (stack.length < 2) return;
  try {
    history.back(); // resolves through popstate below
  } catch {
    popLocal();
  }
}

function popLocal() {
  if (stack.length < 2) return;
  stack.pop();
  stack[stack.length - 1]();
  syncBack();
  window.scrollTo(0, 0);
}

window.addEventListener("popstate", () => {
  popping = true;
  popLocal();
  popping = false;
});

navBack.addEventListener("click", back);

/* Transient states (loading, errors) replace the current screen without
   growing the stack. */
function show(render) {
  render();
  syncBack();
  window.scrollTo(0, 0);
}

// ---------------------------------------------------------------------------
// the polarity wheel
// ---------------------------------------------------------------------------

const R_IN = 62;
const R_MID = 138;
const R_OUT = 196;
const R_ARC = 210;
const HALF_POS = 38;
const HALF_NEG = 54;

const pt = (a, r) => {
  const t = (a * Math.PI) / 180;
  return [+(r * Math.sin(t)).toFixed(2), +(-r * Math.cos(t)).toFixed(2)];
};

function band(r0, r1, a0, a1) {
  const [x0, y0] = pt(a0, r1);
  const [x1, y1] = pt(a1, r1);
  const [x2, y2] = pt(a1, r0);
  const [x3, y3] = pt(a0, r0);
  return `M${x0},${y0} A${r1},${r1} 0 0 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 0 0 ${x3},${y3} Z`;
}

function arc(a0, a1, r = R_ARC, marker = false) {
  const [x0, y0] = pt(a0, r);
  const [x1, y1] = pt(a1, r);
  return `<path d="M${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1}" class="w-arc"${
    marker ? ' marker-end="url(#head)"' : ""
  } />`;
}

function bandText(notation, name, yEyebrow, yName) {
  const lines = twoLines(name);
  const longest = Math.max(...lines.map((l) => l.length));
  // The wedge narrows toward the hub, so long names step down a size rather
  // than spilling over the coloured band.
  const size = longest > 16 ? " sm" : longest > 13 ? " md" : "";
  const spans = lines.map((l, i) => `<tspan x="0" y="${yName + i * 17}">${esc(l)}</tspan>`).join("");
  return `<text class="w-note" x="0" y="${yEyebrow}">${esc(notation)}</text>
          <text class="w-name${size}">${spans}</text>`;
}

function wheelSVG(scheme) {
  const t = scheme.thesis;
  const a = scheme.antithesis;
  return `
<svg class="wheel" viewBox="-236 -256 472 512" role="img"
     aria-label="Polarity scheme. Thesis ${esc(t.pole)} with constructive band ${esc(t.positive)} and degenerate band ${esc(t.negative)}. Antithesis ${esc(a.pole)} with constructive band ${esc(a.positive)} and degenerate band ${esc(a.negative)}.">
  <defs>
    <marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,1 L9,5 L0,9 z" fill="var(--accent)" />
    </marker>
  </defs>

  <g class="w-bands">
    <path d="${band(R_MID, R_OUT, -HALF_NEG, HALF_NEG)}" class="w-neg" />
    <path d="${band(R_IN, R_MID, -HALF_POS, HALF_POS)}" class="w-pos" />
    <path d="${band(R_IN, R_MID, 180 - HALF_POS, 180 + HALF_POS)}" class="w-pos" />
    <path d="${band(R_MID, R_OUT, 180 - HALF_NEG, 180 + HALF_NEG)}" class="w-neg" />
  </g>

  <g class="w-arcs">
    ${arc(-142, -104)}${arc(-76, -38, R_ARC, true)}
    ${arc(38, 76)}${arc(104, 142, R_ARC, true)}
    <text class="w-op" x="${-R_ARC}" y="4">Re+</text>
    <text class="w-op" x="${R_ARC}" y="4">Ac+</text>
  </g>

  <g class="w-labels-neg">${bandText("T−", t.negative, -180, -160)}</g>
  <g class="w-labels-pos">${bandText("T+", t.positive, -122, -102)}</g>
  <g class="w-labels-pos">${bandText("A+", a.positive, 92, 112)}</g>
  <g class="w-labels-neg">${bandText("A−", a.negative, 146, 162)}</g>

  <circle r="${R_IN}" class="w-hub" />
  <g class="w-centre">
    <circle r="17" cy="-6" />
    <path d="M-12,-18 L12,6 M12,-18 L-12,6" />
  </g>
  <text class="w-hub-note" x="0" y="34">centre</text>

  <text class="w-pole" x="0" y="-224">T = ${esc(t.pole)}</text>
  <text class="w-pole" x="0" y="234">A = ${esc(a.pole)}</text>
</svg>`;
}

const centreMark = `<svg class="mark" viewBox="-22 -22 44 44" aria-hidden="true">
  <circle r="15" fill="var(--mid-fill)" stroke="var(--mid)" stroke-width="1.5" />
  <path d="M-9,-9 L9,9 M9,-9 L-9,9" stroke="var(--mid)" stroke-width="1.5" fill="none" />
</svg>`;

/* The scheme restated as three control relations. */
function relationsBlock(s) {
  const tp = esc(s.thesis.positive);
  const ap = esc(s.antithesis.positive);
  const row = (a, op, b, arrowClass, out, extra = "") => `
    <div class="relation${extra}">
      <span class="good">${a}</span><span class="op">${op}</span><span class="good">${b}</span>
      <span class="arrow">→</span><span class="${arrowClass}">${out}</span>
    </div>`;
  return `<div class="relations">
    ${row(tp, "without", ap, "bad", esc(s.thesis.negative))}
    ${row(ap, "without", tp, "bad", esc(s.antithesis.negative))}
    ${row(tp, "and", ap, "synth", esc(s.center.label), " is-synth")}
  </div>`;
}

// ---------------------------------------------------------------------------
// views
// ---------------------------------------------------------------------------

function viewQuery(prefill = "") {
  const chips = config.examples
    .map((e) => `<button class="chip" data-example="${esc(e)}">${esc(e)}</button>`)
    .join("");

  app.innerHTML = `
    <section class="query">
      <h1>Every thesis carries an obligation it does not name.</h1>
      <p class="lede">Enter a value someone holds, or a statement they keep repeating. Polarity
        surfaces the opposing goods it quietly depends on &mdash; and what it decays into when
        those are dropped.</p>
      <form class="field" id="ask">
        <input id="thesis" type="text" autocomplete="off" autocapitalize="sentences"
               spellcheck="false" enterkeyhint="go"
               placeholder="Safety &mdash; or &ldquo;we need stricter control&rdquo;"
               value="${esc(prefill)}" aria-label="Thesis" />
        <button class="btn" type="submit">Analyse</button>
      </form>
      <div class="examples"><span class="eyebrow">${config.live ? "Try" : "Worked examples"}</span>${chips}</div>

      <div class="primer">
        <div><span class="k">T+ / T&minus;</span>What the thesis becomes when it is realised, and when it overshoots.</div>
        <div><span class="k">A+</span>The hidden obligation: the opposing pole at its best.</div>
        <div><span class="k">Centre</span>The quality that emerges from holding both, which neither names alone.</div>
      </div>
    </section>`;

  const input = document.getElementById("thesis");
  document.getElementById("ask").addEventListener("submit", (e) => {
    e.preventDefault();
    input.blur(); // dismiss the phone keyboard before the loading screen
    runExpand(input.value);
  });
  app.querySelectorAll("[data-example]").forEach((b) =>
    b.addEventListener("click", () => runExpand(b.dataset.example))
  );
}

function viewLoading(title, steps) {
  show(() => {
    app.innerHTML = `
      <section class="loading">
        <span class="eyebrow">${esc(title)}</span>
        <div class="steps">
          ${steps.map((s, i) => `<div class="step${i === 0 ? " on" : ""}"><span class="tick">${String(i + 1).padStart(2, "0")}</span><span>${esc(s)}</span></div>`).join("")}
        </div>
        <div class="sweep"><i></i></div>
      </section>`;
  });

  const els = [...app.querySelectorAll(".step")];
  let i = 0;
  const timer = setInterval(() => {
    i += 1;
    if (i >= els.length) return clearInterval(timer);
    els[i].classList.add("on");
  }, 2600);
  return () => clearInterval(timer);
}

/* Reference builds only carry the worked theses. Say so as an offer, not a wall. */
function viewUnavailable(label, message, retry) {
  show(() => {
    const chips = config.examples
      .map((e) => `<button class="chip" data-example="${esc(e)}">${esc(e)}</button>`)
      .join("");
    const offline = !config.live;
    app.innerHTML = `
      <section>
        <div class="notice${offline ? "" : " bad"}">
          <span class="eyebrow">${offline ? "Not in this build" : "Could not analyse that"}</span>
          <p>${esc(message)}</p>
          ${offline ? `<p>Live analysis of any thesis needs an API key on the server. These are ready now:</p>` : ""}
        </div>
        ${offline ? `<div class="examples" style="margin-top:16px">${chips}</div>` : ""}
        <div style="margin-top:22px"><button class="btn-ghost" id="again">Try another thesis</button></div>
      </section>`;

    document.getElementById("again").addEventListener("click", () => show(() => viewQuery(label)));
    app.querySelectorAll("[data-example]").forEach((b) =>
      b.addEventListener("click", () => runExpand(b.dataset.example))
    );
  });
}

function viewList(data) {
  const rows = data.variants
    .map((v, i) => {
      const bars = Object.keys(config.weights)
        .map(
          (k) =>
            `<div class="bar"><span>${esc(config.scoreLabels[k] || k)}</span><i style="--v:${Math.max(0, Math.min(100, v.scores[k] ?? 0))}%"></i></div>`
        )
        .join("");
      return `
      <button class="row" data-index="${i}">
        <div class="rank">${String(i + 1).padStart(2, "0")}</div>
        <div class="head">
          <div class="label">${esc(v.label)}</div>
          <div class="via">via <b>${esc(v.antithesis)}</b></div>
        </div>
        <div class="score">${v.relevance}</div>
        <p class="obligation">${esc(v.obligation)}</p>
        <div class="bars">${bars}</div>
      </button>`;
    })
    .join("");

  app.innerHTML = `
    <section>
      <div class="result-head">
        <span class="eyebrow">Hidden obligations of</span>
        <h2>${esc(data.thesis.label)}</h2>
        <p class="reading">${esc(data.thesis.reading)}</p>
      </div>
      <div class="rows">${rows}</div>
      <div style="margin-top:24px"><button class="btn-ghost" id="again">New thesis</button></div>
    </section>`;

  document.getElementById("again").addEventListener("click", () => go(() => viewQuery(data.thesis.label)));
  app.querySelectorAll(".row").forEach((r) =>
    r.addEventListener("click", () => runScheme(data.variants[Number(r.dataset.index)]))
  );
}

function viewScheme(variant, scheme) {
  app.innerHTML = `
    <section>
      <div class="scheme-head">
        <span class="eyebrow">${esc(current.thesis.label)} &rarr; hidden obligation</span>
        <h2>${esc(variant.label)}</h2>
        <p class="obligation">${esc(variant.obligation)}</p>
      </div>

      <div class="diagram">
        <div class="ops re">
          <h3>Re+</h3>
          <p class="sub">Consolidating moves that produce ${esc(scheme.thesis.positive)}</p>
          <ul>${scheme.operations.rePlus.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
        </div>
        ${wheelSVG(scheme)}
        <div class="ops ac">
          <h3>Ac+</h3>
          <p class="sub">Probing moves that produce ${esc(scheme.antithesis.positive)}</p>
          <ul>${scheme.operations.acPlus.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
        </div>
      </div>

      ${relationsBlock(scheme)}

      <div class="centre">
        ${centreMark}
        <div>
          <span class="eyebrow">Emerges at the centre</span>
          <h3>${esc(scheme.center.label)}</h3>
          <p>${esc(scheme.center.gloss)}</p>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail tension">
          <span class="eyebrow">The live trade-off</span>
          <p>${esc(scheme.tension)}</p>
        </div>
        <div class="detail warn-t">
          <span class="eyebrow">Overshot into ${esc(scheme.thesis.negative)}</span>
          <p>${esc(scheme.overshoot.thesisSide)}</p>
        </div>
        <div class="detail warn-a">
          <span class="eyebrow">Overshot into ${esc(scheme.antithesis.negative)}</span>
          <p>${esc(scheme.overshoot.antithesisSide)}</p>
        </div>
      </div>

      <div style="margin-top:24px"><button class="btn-ghost" id="backlist">All obligations of ${esc(current.thesis.label)}</button></div>
    </section>`;

  document.getElementById("backlist").addEventListener("click", back);
}

// ---------------------------------------------------------------------------
// flows
// ---------------------------------------------------------------------------

async function runExpand(input) {
  const value = String(input || "").trim();
  if (!value) return;

  const stop = viewLoading("Analysing", [
    "Reading the thesis as a pole",
    "Finding the poles it is defined against",
    "Testing each candidate for genuine tension",
    "Discarding negations and vices in disguise",
    "Scoring and ranking"
  ]);

  try {
    const data = await api.expand(value);
    stop();
    current = data;
    go(() => viewList(data));
    prefetchTop(data);
  } catch (error) {
    stop();
    viewUnavailable(value, error.message);
  }
}

/* The first click in a demo should feel instant. */
function prefetchTop(data) {
  const top = data.variants[0];
  if (!top || top.scheme) return;
  api
    .scheme({ thesis: data.thesis.label, antithesis: top.antithesis, label: top.label })
    .then((r) => {
      top.scheme = r.scheme;
    })
    .catch(() => {});
}

async function runScheme(variant) {
  if (variant.scheme) return go(() => viewScheme(variant, variant.scheme));

  const stop = viewLoading("Building the scheme", [
    "Placing the constructive and degenerate bands",
    "Deriving the operations for each side",
    "Naming what emerges at the centre",
    "Writing the overshoot signals"
  ]);

  try {
    const { scheme } = await api.scheme({
      thesis: current.thesis.label,
      antithesis: variant.antithesis,
      label: variant.label
    });
    stop();
    variant.scheme = scheme;
    go(() => viewScheme(variant, scheme));
  } catch (error) {
    stop();
    show(() => viewList(current));
    viewUnavailable(variant.label, error.message);
  }
}

// ---------------------------------------------------------------------------

(async function start() {
  try {
    config = await api.config();
  } catch (error) {
    modeChip.textContent = "Unavailable";
    app.innerHTML = `<section><div class="notice bad">
      <span class="eyebrow">Cannot reach the analyser</span>
      <p>${esc(error.message)}</p>
    </div></section>`;
    return;
  }

  modeChip.textContent = config.live ? "Live" : "Examples";
  modeChip.title = config.live
    ? "Any thesis is analysed on demand."
    : "This build carries hand-checked reference analyses. Live analysis of any thesis needs an API key on the server.";

  go(() => viewQuery());

  if (!EMBEDDED && "serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
})();
