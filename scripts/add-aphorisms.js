/* One-shot edit: inserts the hand-written aphorism into each reference scheme,
   immediately before its `tension:` line. Kept in the repo as the record of how
   the field was seeded; it is idempotent, so re-running it changes nothing. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(here, "..", "lib", "corpus.js");

const APHORISMS = {
  "safety-innovation": "What is never risked is not kept safe. It is only kept still.",
  "safety-competence":
    "Protect someone from every fall and the protection becomes the only thing holding them up.",
  "safety-candour": "An institution that cannot hear what went wrong will go on doing it, safely.",
  "safety-trust":
    "Every check you add says the same thing to the people who pass it, and eventually they believe you.",

  "growth-focus": "Enter every market and you will be present in all of them and formidable in none.",
  "growth-pruning": "A promise kept forever is a hand that can never be used for anything else.",
  "growth-consolidation":
    "Ground taken faster than it can be held is not ground taken. It is ground borrowed.",
  "growth-intimacy":
    "Standardise until every customer is the same customer, and none of them will feel like staying.",

  "transparency-trust":
    "Demand proof of everything and you will get proof of everything, produced for you, instead of the thing itself.",
  "transparency-discretion":
    "Put every room on the record and people will bring only finished thoughts into it.",
  "transparency-curation": "Disclose everything and you have hidden the one thing that mattered, in plain sight.",
  "transparency-safety":
    "What you make visible you make punishable, and what is punishable stops being said out loud.",

  "efficiency-slack":
    "The capacity you cannot justify on any ordinary day is the only capacity you will have on the extraordinary one.",
  "efficiency-craft":
    "Remove every step you cannot measure and you will have removed the ones that were holding the standard.",
  "efficiency-deliberation":
    "An improvement to the wrong thing is not a small gain. It is a faster departure.",
  "efficiency-recovery":
    "A machine run at full capacity is being maintained. The people running it are being spent.",

  "loyalty-dissent":
    "Agree with your side long enough and you will be defending the agreement, not the side.",
  "loyalty-exit": "Staying proves nothing where leaving was never possible.",
  "loyalty-independence":
    "Stand close enough for long enough and the group's blind spot becomes your field of vision.",
  "loyalty-self-respect": "Give without a limit and you will not be valued. You will be budgeted for.",

  "speed-reversibility": "Deciding faster is only an advantage where deciding wrongly can be undone.",
  "speed-reflection": "A shorter cycle does not teach you more. It repeats you more often.",
  "speed-depth":
    "Ship on ground you never laid, and every later thing you ship will cost more than the last.",
  "speed-patience":
    "Force a thing before its conditions and you pay twice: once to do it, once to do it again."
};

let src = fs.readFileSync(file, "utf8");
let added = 0;

for (const [id, text] of Object.entries(APHORISMS)) {
  const at = src.indexOf(`id: "${id}"`);
  if (at === -1) throw new Error(`scheme id not found: ${id}`);

  const marker = "\n          tension:";
  const cut = src.indexOf(marker, at);
  if (cut === -1) throw new Error(`no tension field after ${id}`);

  // Already seeded? Skip.
  if (src.slice(at, cut).includes("aphorism:")) continue;

  const escaped = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const insert = `\n          aphorism:\n            "${escaped}",`;
  src = src.slice(0, cut) + insert + src.slice(cut);
  added++;
}

fs.writeFileSync(file, src);
console.log(`aphorisms inserted: ${added} (of ${Object.keys(APHORISMS).length})`);
