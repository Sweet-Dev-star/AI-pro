import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

const MODEL = "claude-opus-5";

// Serverless platforms cap function duration (60s on Vercel Hobby). Dropping to
// "medium" roughly halves the expand call at some cost to the ranking.
const EFFORT = process.env.POLARITY_EFFORT || "high";

let client = null;
function getClient() {
  if (!client) client = new Anthropic();
  return client;
}

export function hasCredentials() {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

// ---------------------------------------------------------------------------
// The model, stated once. Both calls share this prefix so it caches.
// ---------------------------------------------------------------------------

const MODEL_BRIEF = `You work with a dialectical polarity model. It has one axis and six positions.

A thesis T is a value, commitment, or goal someone holds. Opposite it stands an
antithesis A: the pole T is defined against. Each pole has a constructive band and
a degenerate band:

  T+  the constructive realisation of T          (Safety -> Protection)
  T-  T pursued past its limit, decoupled from A (Safety -> Stagnation)
  A+  the constructive realisation of A          (Risk   -> Innovation)
  A-  A pursued past its limit, decoupled from T (Risk   -> Recklessness)

Two operations drive the axis. Re+ is the consolidating move that produces T+
("assess risks, implement safeguards"). Ac+ is the probing move that produces A+
("detect falsehood, test risks, experiment"). Sustained alternation between them
holds the system at the centre, where a third quality emerges that neither pole
names on its own (Safety/Risk -> Resilience).

The load-bearing claim: a vice is never the opposite pole. It is your own pole
overshooting, because its counterpart was abandoned. Safety does not fail by
becoming dangerous. It fails by becoming Stagnation.

So A+ is the HIDDEN OBLIGATION of T. Whoever holds T is thereby committed to A+,
whether or not they know it, because T without A+ decays into T-.`;

const TEST = `The test every A+ must pass, stated as one sentence you should be able to write
and defend: "T pursued without A+ degenerates into T-." If that sentence is not
true and non-trivial, the candidate is wrong.`;

const FAILURE_MODES = `Reject your own first answers when they are any of these:

1. NEGATION. A that is just T with a prefix or a "not" (Safety -> Unsafety,
   Transparency -> Non-transparency). Carries no information.
2. THE VICE IN PLACE OF THE VIRTUE. Returning A- where A+ belongs (Safety ->
   Recklessness rather than Safety -> Innovation). This is the most common error.
   Generate A- explicitly for each candidate so you can check A+ is not it.
3. BLAND COMPLEMENT. Something merely adjacent, in no real tension with T
   (Safety -> Comfort). If holding both costs nothing, there is no polarity.
4. SYNONYM FLOODING. Four candidates that are one idea in four words. Each
   variant must come from a genuinely different antithesis pole.
5. CENTRE COLLAPSE. A centre term that is a synonym of T+ dressed up. The centre
   must be un-nameable from either pole alone.

A+ must be defensible as a good in its own right. If a reasonable person would
not want it, you have produced A-.`;

// ---------------------------------------------------------------------------
// Call 1: thesis -> ranked hidden obligations
// ---------------------------------------------------------------------------

const VariantsSchema = z.object({
  thesis: z.object({
    label: z
      .string()
      .describe("The thesis as a short pole name, title case, 1-3 words. Normalise a sentence down to the value it asserts."),
    reading: z
      .string()
      .describe("One sentence: how you are reading this thesis. Under 20 words.")
  }),
  variants: z
    .array(
      z.object({
        antithesis: z.string().describe("The opposing pole A. 1-2 words."),
        label: z.string().describe("A+, the constructive realisation of A. 1-3 words. This is the hidden obligation."),
        degeneration: z.string().describe("T-, what T becomes without this A+. 1-2 words."),
        obligation: z
          .string()
          .describe(
            "One sentence naming the mechanism: T pursued without A+ degenerates into T-, and specifically how. Concrete, not abstract."
          ),
        scores: z.object({
          nonobviousness: z.number().describe("0-100. Would a thoughtful person already have this on their list? Low if yes."),
          tension: z.number().describe("0-100. Is holding T and A+ together genuinely costly? Low if they sit comfortably."),
          positivity: z.number().describe("0-100. Is A+ defensible as a good in itself, rather than a vice in disguise?"),
          actionability: z.number().describe("0-100. Does a concrete Ac+ operation follow from it?")
        })
      })
    )
    .describe("Between 5 and 7 variants, each from a different antithesis pole. Do not pre-sort them.")
});

const EXPAND_SYSTEM = `${MODEL_BRIEF}

${TEST}

Your task: given a thesis T, surface its hidden obligations. Each is one A+,
reached through one antithesis pole A.

${FAILURE_MODES}

Score honestly. Scores are shown to the user with the weighting that combines
them, so a flattering score is a visible mistake rather than a hidden one. Spread
the range: if every candidate scores in the eighties the ranking says nothing.

Write in plain, concrete English. No jargon from the model itself in user-facing
text: say what happens, not "the dialectical inversion of the thesis pole".`;

export async function expandThesis(input) {
  const response = await getClient().messages.parse({
    model: MODEL,
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    system: [{ type: "text", text: EXPAND_SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: `Thesis: ${input}` }],
    output_config: {
      effort: EFFORT,
      format: zodOutputFormat(VariantsSchema, "hidden_obligations")
    }
  });

  assertNotRefused(response);
  const parsed = response.parsed_output;
  if (!parsed) throw new Error("The model returned a response that did not match the expected shape.");
  return parsed;
}

// ---------------------------------------------------------------------------
// Call 2: one chosen obligation -> the full scheme
// ---------------------------------------------------------------------------

const PoleSchema = z.object({
  pole: z.string().describe("The pole name. 1-2 words."),
  positive: z.string().describe("The constructive band. 1-3 words."),
  positiveGloss: z.string().describe("One short sentence, under 15 words."),
  negative: z.string().describe("The degenerate band: this pole overshooting. 1-2 words."),
  negativeGloss: z.string().describe("One short sentence, under 15 words.")
});

const SchemeSchema = z.object({
  thesis: PoleSchema,
  antithesis: PoleSchema,
  operations: z.object({
    rePlus: z.array(z.string()).describe("Exactly 3 operations that produce T+. Imperative verbs. Under 12 words each."),
    acPlus: z.array(z.string()).describe("Exactly 3 operations that produce A+. Imperative verbs. Under 12 words each.")
  }),
  center: z.object({
    label: z.string().describe("The quality that emerges from sustained alternation. 1-3 words. Must not be a synonym of either positive band."),
    gloss: z.string().describe("Two sentences: what it is, and why neither pole produces it alone.")
  }),
  tension: z.string().describe("One sentence naming the real trade-off, in the form of what you give up by moving toward either pole."),
  overshoot: z.object({
    thesisSide: z.string().describe("One observable symptom that the system has overshot into T-. Something you could actually notice."),
    antithesisSide: z.string().describe("One observable symptom that the system has overshot into A-.")
  })
});

const SCHEME_SYSTEM = `${MODEL_BRIEF}

Your task: given a thesis and one of its hidden obligations, write out the full
scheme — both poles with their constructive and degenerate bands, the operations
that drive each side, and the quality that emerges at the centre.

${FAILURE_MODES}

Two things carry most of the value, so spend the care there:

The CENTRE is the payoff. It must be a real third term that neither pole names.
Safety and Risk produce Resilience — not "balanced safety", not "safe innovation".
If you cannot find a word that is genuinely new, you have the wrong pairing.

The OVERSHOOT SIGNALS must be observable. Not "the organisation becomes rigid"
but "reviews get longer and nothing has failed in years, because nothing has been
attempted". Someone should be able to read one and recognise their own week.

Operations are instructions, not descriptions. Start each with a verb.`;

export async function buildScheme({ thesis, antithesis, label }) {
  const response = await getClient().messages.parse({
    model: MODEL,
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    system: [{ type: "text", text: SCHEME_SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [
      {
        role: "user",
        content: `Thesis (T): ${thesis}\nAntithesis pole (A): ${antithesis}\nHidden obligation (A+): ${label}\n\nWrite the scheme.`
      }
    ],
    output_config: {
      effort: EFFORT === "high" ? "medium" : EFFORT,
      format: zodOutputFormat(SchemeSchema, "polarity_scheme")
    }
  });

  assertNotRefused(response);
  const parsed = response.parsed_output;
  if (!parsed) throw new Error("The model returned a response that did not match the expected shape.");
  return parsed;
}

function assertNotRefused(response) {
  if (response.stop_reason === "refusal") {
    const reason = response.stop_details?.explanation || "no explanation given";
    throw new Error(`The model declined this request (${reason}). Try rephrasing the thesis.`);
  }
}
