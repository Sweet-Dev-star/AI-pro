// Hand-authored reference schemes.
//
// These do two jobs. They let the app run a full demo with no API key, and they
// are the baseline the live generator gets compared against. Every entry follows
// the same eight-field structure the generator is constrained to produce, so a
// generated scheme and a reference scheme render through identical code.

export const CORPUS = [
  {
    id: "safety",
    thesis: {
      label: "Safety",
      reading: "The commitment to prevent harm and preserve what already works."
    },
    variants: [
      {
        id: "safety-innovation",
        label: "Innovation",
        antithesis: "Risk",
        obligation:
          "Safety pursued without Innovation hardens into Stagnation: the system stops adapting and is overtaken by the conditions it was built to protect against.",
        scores: { nonobviousness: 74, tension: 94, positivity: 90, actionability: 88 },
        scheme: {
          thesis: {
            pole: "Safety",
            positive: "Protection",
            positiveGloss: "Harm anticipated and absorbed before it lands.",
            negative: "Stagnation",
            negativeGloss: "Every proposal deferred until it is certain, so nothing is attempted."
          },
          antithesis: {
            pole: "Risk",
            positive: "Innovation",
            positiveGloss: "Exposure accepted deliberately, for what can only be learned by trying.",
            negative: "Recklessness",
            negativeGloss: "Exposure accepted without accounting, so losses arrive faster than lessons."
          },
          operations: {
            rePlus: [
              "Assess risks and rank them by consequence, not by likelihood alone",
              "Implement safeguards at the points of highest exposure first",
              "Rehearse failure until recovery is routine rather than heroic"
            ],
            acPlus: [
              "Detect falsehood in your own standing assumptions",
              "Test risks deliberately, at a scale you can survive",
              "Run experiments that could change the standard, not confirm it"
            ]
          },
          center: {
            label: "Resilience",
            gloss:
              "The capacity to absorb a shock and keep changing. Neither caution nor daring produces it alone; it appears only where both are in play."
          },
          tension:
            "Every safeguard you add removes a surface where learning could have happened.",
          overshoot: {
            thesisSide:
              "Reviews get longer and nothing has failed in years, because nothing has been attempted.",
            antithesisSide:
              "Failures stop teaching you anything, because you can no longer tell which change caused them."
          }
        }
      },
      {
        id: "safety-competence",
        label: "Competence",
        antithesis: "Difficulty",
        obligation:
          "Safety pursued without Competence stagnates into dependence: the protections you install prevent the exposure that would have built the skill to handle it.",
        scores: { nonobviousness: 92, tension: 84, positivity: 88, actionability: 80 },
        scheme: {
          thesis: {
            pole: "Safety",
            positive: "Protection",
            positiveGloss: "The person is shielded from consequences they could not yet survive.",
            negative: "Stagnation",
            negativeGloss: "The shield becomes permanent, and capability never forms behind it."
          },
          antithesis: {
            pole: "Difficulty",
            positive: "Competence",
            positiveGloss: "Capability earned by meeting a demand that was real.",
            negative: "Overwhelm",
            negativeGloss: "Demand pitched past capacity, destroying skill instead of building it."
          },
          operations: {
            rePlus: [
              "Set the floor: name the failures that must never be survivable by luck alone",
              "Supervise the first attempts rather than forbidding them",
              "Keep the safety net visible, so people will use the height"
            ],
            acPlus: [
              "Hand over a task slightly beyond current reach",
              "Withdraw one support each time the previous one stopped being needed",
              "Let recoverable mistakes actually happen, then debrief them"
            ]
          },
          center: {
            label: "Mastery",
            gloss:
              "Earned capability under real conditions. Protection alone produces the untested; difficulty alone produces the broken."
          },
          tension:
            "The exposure you remove to keep someone safe is the exposure that would have made them capable.",
          overshoot: {
            thesisSide:
              "People escalate decisions they are nominally responsible for, having never made one alone.",
            antithesisSide:
              "Turnover and burnout, and the survivors mistake having endured it for having learned from it."
          }
        }
      },
      {
        id: "safety-candour",
        label: "Candour",
        antithesis: "Exposure",
        obligation:
          "Safety pursued without Candour stagnates into concealment: the organisation protects its reputation from the failures it most needs to look at.",
        scores: { nonobviousness: 80, tension: 86, positivity: 86, actionability: 84 },
        scheme: {
          thesis: {
            pole: "Safety",
            positive: "Protection",
            positiveGloss: "People and the institution are shielded from avoidable damage.",
            negative: "Stagnation",
            negativeGloss: "Bad news stops travelling upward, so the same fault recurs indefinitely."
          },
          antithesis: {
            pole: "Exposure",
            positive: "Candour",
            positiveGloss: "What went wrong is said plainly, early, to the people who can act.",
            negative: "Blame",
            negativeGloss: "Disclosure turned into a search for someone to punish, which ends disclosure."
          },
          operations: {
            rePlus: [
              "Separate the incident review from the performance review",
              "Guarantee in advance who is protected when a report is filed",
              "Fix the reported fault visibly, so reporting is seen to work"
            ],
            acPlus: [
              "Ask what is going wrong before asking what is going well",
              "Report your own error first, in the room, at cost to yourself",
              "Publish the near-misses, not only the incidents"
            ]
          },
          center: {
            label: "Trustworthiness",
            gloss:
              "An institution whose account of itself can be relied on. Protection alone yields silence; exposure alone yields fear."
          },
          tension:
            "Every layer of protection you build around people also insulates you from what they know.",
          overshoot: {
            thesisSide:
              "Every status report is green, and problems become visible only once they are unrecoverable.",
            antithesisSide:
              "People disclose defensively, pre-assigning fault, and stop reporting anything ambiguous."
          }
        }
      },
      {
        id: "safety-trust",
        label: "Trust",
        antithesis: "Autonomy",
        obligation:
          "Safety pursued without Trust stagnates into control: each additional check tells people they are not to be relied on, and eventually they are not.",
        scores: { nonobviousness: 76, tension: 82, positivity: 84, actionability: 72 },
        scheme: {
          thesis: {
            pole: "Safety",
            positive: "Protection",
            positiveGloss: "Controls catch the error before it propagates.",
            negative: "Stagnation",
            negativeGloss: "Controls multiply until the work is mostly the demonstrating of compliance."
          },
          antithesis: {
            pole: "Autonomy",
            positive: "Trust",
            positiveGloss: "Judgment delegated to the person closest to the situation.",
            negative: "Abdication",
            negativeGloss: "Delegation without the support or information that would make it fair."
          },
          operations: {
            rePlus: [
              "Define the small set of decisions that genuinely need a second pair of eyes",
              "Instrument outcomes rather than approving steps",
              "Retire a control whenever the risk it covered has been designed out"
            ],
            acPlus: [
              "Move a decision down to where the information already is",
              "State the boundary, then stay out of what is inside it",
              "Back a judgment call publicly when it was made well and turned out badly"
            ]
          },
          center: {
            label: "Reliability",
            gloss:
              "Consistent good outcomes without constant supervision. Controls alone produce compliance; delegation alone produces drift."
          },
          tension:
            "Each control you add buys certainty about one decision and spends a little of the judgment that would have handled the next.",
          overshoot: {
            thesisSide:
              "Approval queues grow, and capable people route around the process rather than through it.",
            antithesisSide:
              "Nobody can say who decided, and the same problem is solved four incompatible ways."
          }
        }
      }
    ]
  },

  {
    id: "growth",
    thesis: {
      label: "Growth",
      reading: "The drive to increase scale, reach, or capability."
    },
    variants: [
      {
        id: "growth-focus",
        label: "Focus",
        antithesis: "Limitation",
        obligation:
          "Growth pursued without Focus sprawls: the organisation becomes larger everywhere and stronger nowhere.",
        scores: { nonobviousness: 70, tension: 90, positivity: 88, actionability: 90 },
        scheme: {
          thesis: {
            pole: "Growth",
            positive: "Expansion",
            positiveGloss: "Reach extended into ground the organisation can actually hold.",
            negative: "Sprawl",
            negativeGloss: "Surface area added faster than the capability to serve it."
          },
          antithesis: {
            pole: "Limitation",
            positive: "Focus",
            positiveGloss: "Deliberate refusal of good options in order to be excellent at one.",
            negative: "Narrowness",
            negativeGloss: "Refusal turned into blindness, defending a single bet past its evidence."
          },
          operations: {
            rePlus: [
              "Open the next segment only once the last one is self-sustaining",
              "Fund expansion from the strength that earned it, not from optimism",
              "Hire ahead of demand in one place at a time"
            ],
            acPlus: [
              "Name what you are explicitly choosing not to serve, in writing",
              "Kill the second-best initiative while it is still healthy",
              "Test whether the constraint is real before designing around it"
            ]
          },
          center: {
            label: "Compounding",
            gloss:
              "Advantage that accumulates instead of resetting. Expansion alone dilutes it; focus alone caps it."
          },
          tension:
            "Every market you enter is attention withdrawn from the one that is currently working.",
          overshoot: {
            thesisSide:
              "Headcount rises while per-team output falls, and nobody can name the top priority.",
            antithesisSide:
              "The single line of business is excellent and the market underneath it has moved."
          }
        }
      },
      {
        id: "growth-pruning",
        label: "Pruning",
        antithesis: "Loss",
        obligation:
          "Growth pursued without Pruning sprawls: commitments accumulate faster than they can be honoured, and new work is starved by old promises.",
        scores: { nonobviousness: 84, tension: 86, positivity: 84, actionability: 88 },
        scheme: {
          thesis: {
            pole: "Growth",
            positive: "Expansion",
            positiveGloss: "New capability, product, and obligation taken on.",
            negative: "Sprawl",
            negativeGloss: "A portfolio nobody would choose today, maintained because it exists."
          },
          antithesis: {
            pole: "Loss",
            positive: "Pruning",
            positiveGloss: "Deliberate removal of what was once right and no longer earns its place.",
            negative: "Destruction",
            negativeGloss: "Cutting driven by cost targets rather than by what the cut enables."
          },
          operations: {
            rePlus: [
              "Attach a sunset date to every new commitment at the moment it is made",
              "Budget maintenance alongside creation, from the same envelope",
              "Count obligations, not just launches"
            ],
            acPlus: [
              "Retire one thing for each thing you begin",
              "Ask of each surviving line what would have to be true to start it today",
              "Move the people first; the work follows or it dies honestly"
            ]
          },
          center: {
            label: "Vitality",
            gloss:
              "Capacity that stays available for what matters now. Addition alone consumes it; subtraction alone hollows it out."
          },
          tension:
            "The commitments that make you credible are the ones that stop you from moving.",
          overshoot: {
            thesisSide:
              "Most capacity goes to keeping decade-old promises to a handful of users.",
            antithesisSide:
              "Customers stop believing anything will still be supported next year."
          }
        }
      },
      {
        id: "growth-consolidation",
        label: "Consolidation",
        antithesis: "Stillness",
        obligation:
          "Growth pursued without Consolidation sprawls: the organisation outruns its own foundations and begins failing at what it already sold.",
        scores: { nonobviousness: 66, tension: 84, positivity: 86, actionability: 82 },
        scheme: {
          thesis: {
            pole: "Growth",
            positive: "Expansion",
            positiveGloss: "Momentum captured while the opportunity is open.",
            negative: "Sprawl",
            negativeGloss: "A front too wide to hold, defended by improvisation."
          },
          antithesis: {
            pole: "Stillness",
            positive: "Consolidation",
            positiveGloss: "A pause spent making the last expansion permanent.",
            negative: "Inertia",
            negativeGloss: "A pause that outlives its purpose and becomes the culture."
          },
          operations: {
            rePlus: [
              "Set the next target from throughput demonstrated, not projected",
              "Expand along the axis where the foundation is already strongest",
              "Keep one team on the frontier while the rest catch up"
            ],
            acPlus: [
              "Freeze scope and pay down the debt the last push created",
              "Document and automate what is currently held by one person",
              "Re-measure the base before adding to it"
            ]
          },
          center: {
            label: "Durability",
            gloss:
              "Gains that survive the next quarter. Advance alone loses ground; pause alone never takes any."
          },
          tension:
            "The quarter you spend making last year's growth solid is a quarter a competitor spends growing.",
          overshoot: {
            thesisSide:
              "Incident volume rises with every release and onboarding takes longer each month.",
            antithesisSide:
              "The platform is immaculate and has shipped nothing customers noticed in a year."
          }
        }
      },
      {
        id: "growth-intimacy",
        label: "Intimacy",
        antithesis: "Smallness",
        obligation:
          "Growth pursued without Intimacy sprawls into anonymity: you scale into a company no individual customer feels known by, and the loyalty that funded the growth quietly ends.",
        scores: { nonobviousness: 90, tension: 80, positivity: 86, actionability: 74 },
        scheme: {
          thesis: {
            pole: "Growth",
            positive: "Expansion",
            positiveGloss: "More people served than could be served before.",
            negative: "Sprawl",
            negativeGloss: "Scale achieved by making every customer generic."
          },
          antithesis: {
            pole: "Smallness",
            positive: "Intimacy",
            positiveGloss: "Specific knowledge of specific people, kept even as the numbers rise.",
            negative: "Parochialism",
            negativeGloss: "Closeness to a few that becomes an excuse not to serve the many."
          },
          operations: {
            rePlus: [
              "Standardise the mechanism, not the relationship",
              "Grow the support surface at the same rate as the customer base",
              "Preserve a named owner for each significant account"
            ],
            acPlus: [
              "Put builders in direct contact with users every week",
              "Keep serving a handful of customers by hand, deliberately, at any scale",
              "Read the raw complaints, unaggregated, before the dashboard"
            ]
          },
          center: {
            label: "Belonging",
            gloss:
              "Scale that people still experience as being for them. Reach alone produces indifference; closeness alone produces a club."
          },
          tension:
            "Everything you standardise to serve more people removes a place where someone was recognised.",
          overshoot: {
            thesisSide:
              "Retention falls while acquisition rises, and nobody internally can describe a real user.",
            antithesisSide:
              "The team is beloved by forty customers and cannot take on the forty-first."
          }
        }
      }
    ]
  },

  {
    id: "transparency",
    thesis: {
      label: "Transparency",
      reading: "The commitment to make information visible and decisions inspectable."
    },
    variants: [
      {
        id: "transparency-trust",
        label: "Trust",
        antithesis: "Opacity",
        obligation:
          "Transparency pursued without Trust becomes performance: proof is demanded because belief is absent, and people optimise for how the record will read.",
        scores: { nonobviousness: 88, tension: 90, positivity: 86, actionability: 78 },
        scheme: {
          thesis: {
            pole: "Transparency",
            positive: "Accountability",
            positiveGloss: "Decisions can be traced to reasons and to the people who held them.",
            negative: "Performance",
            negativeGloss: "Work becomes the visible record of work, staged for whoever is watching."
          },
          antithesis: {
            pole: "Opacity",
            positive: "Trust",
            positiveGloss: "Latitude extended in advance of proof, on the strength of a track record.",
            negative: "Credulity",
            negativeGloss: "Latitude extended where there is no record to justify it."
          },
          operations: {
            rePlus: [
              "Publish the reasoning behind decisions, not only the outcome",
              "Make the record serve the decision, not the audit",
              "Keep one canonical source rather than many partial ones"
            ],
            acPlus: [
              "Extend latitude before it is fully earned, and say so",
              "Stop requiring proof for the class of things that have never gone wrong",
              "Let someone report a result without showing the whole path"
            ]
          },
          center: {
            label: "Credibility",
            gloss:
              "Being believed without having to prove it each time. Disclosure alone produces theatre; trust alone produces exposure."
          },
          tension:
            "Everything you require to be shown is something that will now be produced in order to be shown.",
          overshoot: {
            thesisSide:
              "Real decisions move to private channels, and the documented process records them afterwards.",
            antithesisSide:
              "A confident account goes unchallenged for a year and turns out to have been wrong throughout."
          }
        }
      },
      {
        id: "transparency-discretion",
        label: "Discretion",
        antithesis: "Concealment",
        obligation:
          "Transparency pursued without Discretion becomes performance: every deliberation is staged for an audience, so the tentative thought is never said out loud.",
        scores: { nonobviousness: 82, tension: 88, positivity: 82, actionability: 80 },
        scheme: {
          thesis: {
            pole: "Transparency",
            positive: "Accountability",
            positiveGloss: "What was decided, and why, is available to those affected.",
            negative: "Performance",
            negativeGloss: "Nothing unfinished can be said, so only finished positions are ever expressed."
          },
          antithesis: {
            pole: "Concealment",
            positive: "Discretion",
            positiveGloss: "A protected space where a half-formed idea can be tested before it is owned.",
            negative: "Secrecy",
            negativeGloss: "Protection extended to conclusions, not just to deliberation."
          },
          operations: {
            rePlus: [
              "Publish conclusions and the reasons for them, on a fixed cadence",
              "Name who is accountable for each decision, in advance",
              "Open the inputs, so others can reach their own view"
            ],
            acPlus: [
              "Hold the exploratory conversation off the record, and say that it happened",
              "Distinguish thinking aloud from committing, explicitly, in the room",
              "Protect the draft; expose the decision"
            ]
          },
          center: {
            label: "Openness",
            gloss:
              "An organisation that can be understood from outside and can still think in private. Exposure alone kills deliberation; concealment alone kills accountability."
          },
          tension:
            "The room you open so people can see the thinking is the room in which thinking stops.",
          overshoot: {
            thesisSide:
              "Meetings produce only positions already agreed elsewhere; disagreement never appears.",
            antithesisSide:
              "Decisions surface fully formed and nobody outside can reconstruct how they were reached."
          }
        }
      },
      {
        id: "transparency-curation",
        label: "Curation",
        antithesis: "Noise",
        obligation:
          "Transparency pursued without Curation becomes performance: the important disclosure is buried inside a thousand unimportant ones, and disclosure substitutes for being understood.",
        scores: { nonobviousness: 78, tension: 82, positivity: 84, actionability: 88 },
        scheme: {
          thesis: {
            pole: "Transparency",
            positive: "Accountability",
            positiveGloss: "Nothing material is withheld from those who need it.",
            negative: "Performance",
            negativeGloss: "Volume of disclosure offered as evidence of good faith."
          },
          antithesis: {
            pole: "Noise",
            positive: "Curation",
            positiveGloss: "Selection and ordering that make the material actually legible.",
            negative: "Spin",
            negativeGloss: "Selection that serves the teller rather than the reader."
          },
          operations: {
            rePlus: [
              "Make the full record retrievable, not just the summary",
              "Timestamp and version everything so selection can be audited",
              "Disclose what was left out, and on what rule"
            ],
            acPlus: [
              "Lead with the three things that would change someone's mind",
              "Write the summary for the reader who has ten minutes",
              "Retire dashboards nobody has acted on"
            ]
          },
          center: {
            label: "Legibility",
            gloss:
              "Information that can actually be used by the person receiving it. Volume alone hides; selection alone distorts."
          },
          tension:
            "Every additional thing you disclose lowers the odds the important one is read.",
          overshoot: {
            thesisSide:
              "Everything is technically public and nobody, inside or out, knows the current position.",
            antithesisSide:
              "The summary is clear, confident, and quietly omits the one number that mattered."
          }
        }
      },
      {
        id: "transparency-safety",
        label: "Psychological safety",
        antithesis: "Privacy",
        obligation:
          "Transparency pursued without Psychological safety becomes performance: people disclose what is safe to disclose, which is rarely what is true.",
        scores: { nonobviousness: 72, tension: 86, positivity: 88, actionability: 76 },
        scheme: {
          thesis: {
            pole: "Transparency",
            positive: "Accountability",
            positiveGloss: "What is happening is visible to those who must respond to it.",
            negative: "Performance",
            negativeGloss: "Visibility becomes surveillance, and the report becomes a defence."
          },
          antithesis: {
            pole: "Privacy",
            positive: "Psychological safety",
            positiveGloss: "It is survivable to be the person who says the uncomfortable thing.",
            negative: "Unaccountability",
            negativeGloss: "Protection from consequence extended to outcomes, not just to speech."
          },
          operations: {
            rePlus: [
              "Make the metric visible and the interpretation shared",
              "Attach every disclosure requirement to a decision it informs",
              "Review the system before reviewing the person"
            ],
            acPlus: [
              "Say what you got wrong, first, before asking anyone else to",
              "Respond to the first bad news well enough that a second arrives",
              "Ask for the dissenting view by name and let it stand unpunished"
            ]
          },
          center: {
            label: "Honesty",
            gloss:
              "Reports that correspond to reality. Visibility alone produces caution; protection alone produces comfort."
          },
          tension:
            "What you make visible you also make punishable, and what is punishable stops being reported.",
          overshoot: {
            thesisSide:
              "Metrics are met exactly and the underlying situation is not what the metrics describe.",
            antithesisSide:
              "Everyone speaks freely and nothing that is said ever changes what anyone does."
          }
        }
      }
    ]
  },

  {
    id: "efficiency",
    thesis: {
      label: "Efficiency",
      reading: "The drive to produce more output from less input."
    },
    variants: [
      {
        id: "efficiency-slack",
        label: "Slack",
        antithesis: "Waste",
        obligation:
          "Efficiency pursued without Slack turns brittle: you optimise away the spare capacity that would have absorbed the next surprise.",
        scores: { nonobviousness: 80, tension: 94, positivity: 88, actionability: 86 },
        scheme: {
          thesis: {
            pole: "Efficiency",
            positive: "Leverage",
            positiveGloss: "The same effort produces more of what was wanted.",
            negative: "Brittleness",
            negativeGloss: "A system with no give, where one late input stops everything downstream."
          },
          antithesis: {
            pole: "Waste",
            positive: "Slack",
            positiveGloss: "Unused capacity held deliberately, so variation can be absorbed.",
            negative: "Idleness",
            negativeGloss: "Capacity held with no purpose attached and no trigger for its use."
          },
          operations: {
            rePlus: [
              "Remove the step that no downstream stage consumes",
              "Automate the repetition, keep the judgment",
              "Measure cost per completed unit, not per action"
            ],
            acPlus: [
              "Hold a named buffer and defend it from planning",
              "Run below full utilisation on the constrained resource on purpose",
              "Leave unallocated time in the week and see what fills it"
            ]
          },
          center: {
            label: "Robustness",
            gloss:
              "High output that survives variation. Optimisation alone makes it fragile; spare capacity alone makes it slow."
          },
          tension:
            "The capacity you cannot justify today is the capacity that saves you the day something goes wrong.",
          overshoot: {
            thesisSide:
              "Every small delay becomes a missed deadline, and firefighting is now most of the work.",
            antithesisSide:
              "The buffer is permanent, unexamined, and has quietly become the new baseline cost."
          }
        }
      },
      {
        id: "efficiency-craft",
        label: "Craft",
        antithesis: "Friction",
        obligation:
          "Efficiency pursued without Craft turns brittle: you strip out the slow steps, and quality turns out to have been made in exactly those steps.",
        scores: { nonobviousness: 84, tension: 86, positivity: 86, actionability: 78 },
        scheme: {
          thesis: {
            pole: "Efficiency",
            positive: "Leverage",
            positiveGloss: "Effort concentrated where it changes the outcome.",
            negative: "Brittleness",
            negativeGloss: "Output that meets the specification and fails everywhere the specification was silent."
          },
          antithesis: {
            pole: "Friction",
            positive: "Craft",
            positiveGloss: "Time spent on the part of the work that no measure captures.",
            negative: "Preciousness",
            negativeGloss: "Care spent on what no one will ever encounter."
          },
          operations: {
            rePlus: [
              "Time the steps and find where the hours actually go",
              "Remove handoffs before removing work",
              "Standardise the parts where variation has no value"
            ],
            acPlus: [
              "Protect the slow step that the practitioners say matters",
              "Judge a sample of the output directly, not through its metrics",
              "Let one person own a piece end to end"
            ]
          },
          center: {
            label: "Quality at scale",
            gloss:
              "Output that is both plentiful and good. Speed alone erodes the standard; care alone never reaches volume."
          },
          tension:
            "The step you cannot justify on the throughput numbers is often the one holding the standard.",
          overshoot: {
            thesisSide:
              "Volume is up, rework is up more, and the people who cared have stopped arguing.",
            antithesisSide:
              "The work is beautiful, late, and addresses a need that has already changed."
          }
        }
      },
      {
        id: "efficiency-deliberation",
        label: "Deliberation",
        antithesis: "Delay",
        obligation:
          "Efficiency pursued without Deliberation turns brittle: you get very good at doing the wrong thing, and the improvement compounds in the wrong direction.",
        scores: { nonobviousness: 74, tension: 88, positivity: 86, actionability: 82 },
        scheme: {
          thesis: {
            pole: "Efficiency",
            positive: "Leverage",
            positiveGloss: "Less input consumed for each unit of output.",
            negative: "Brittleness",
            negativeGloss: "A machine tuned so tightly to one goal that it cannot be pointed elsewhere."
          },
          antithesis: {
            pole: "Delay",
            positive: "Deliberation",
            positiveGloss: "Time taken to establish that this is the output worth producing.",
            negative: "Procrastination",
            negativeGloss: "Time taken with no question being resolved by taking it."
          },
          operations: {
            rePlus: [
              "Shorten the loop between doing and seeing the result",
              "Cut the work that no decision depends on",
              "Reuse rather than rebuild"
            ],
            acPlus: [
              "Ask what would make this whole activity unnecessary",
              "Review the goal on the same cadence as the throughput",
              "Stop the line when the output stops matching the intent"
            ]
          },
          center: {
            label: "Effectiveness",
            gloss:
              "Doing the right thing well. Speed alone scales error; reflection alone produces nothing to reflect on."
          },
          tension:
            "Time spent questioning the goal is time not spent hitting it, and hitting it is what gets measured.",
          overshoot: {
            thesisSide:
              "Throughput is at record levels and the outcome it was supposed to produce has not moved.",
            antithesisSide:
              "The strategy is revisited every quarter and nothing has been executed long enough to test it."
          }
        }
      },
      {
        id: "efficiency-recovery",
        label: "Recovery",
        antithesis: "Idleness",
        obligation:
          "Efficiency pursued without Recovery turns brittle: the machine is tuned and the people running it are being spent faster than they are replenished.",
        scores: { nonobviousness: 68, tension: 84, positivity: 90, actionability: 84 },
        scheme: {
          thesis: {
            pole: "Efficiency",
            positive: "Leverage",
            positiveGloss: "Sustained high output from the resources available.",
            negative: "Brittleness",
            negativeGloss: "Output sustained by depleting the people who produce it."
          },
          antithesis: {
            pole: "Idleness",
            positive: "Recovery",
            positiveGloss: "Deliberate replenishment of the capacity that the work consumes.",
            negative: "Disengagement",
            negativeGloss: "Rest that has become withdrawal from the work altogether."
          },
          operations: {
            rePlus: [
              "Remove the interruptions that fragment concentrated work",
              "Give teams the tools that take the toil out of the task",
              "Level the load rather than alternating crunch and lull"
            ],
            acPlus: [
              "Enforce the recovery period after the push, before the next one is planned",
              "Rotate people off the highest-demand rotation on a schedule",
              "Track sustained pace, not peak output"
            ]
          },
          center: {
            label: "Sustainable pace",
            gloss:
              "Output you can still be producing in three years. Intensity alone consumes the source; rest alone never starts."
          },
          tension:
            "The hours you reclaim from rest are real output this quarter and a smaller team next year.",
          overshoot: {
            thesisSide:
              "Your best people leave one at a time and each departure is explained individually.",
            antithesisSide:
              "The pace is comfortable and the work no longer holds anyone's attention."
          }
        }
      }
    ]
  },

  {
    id: "loyalty",
    thesis: {
      label: "Loyalty",
      reading: "The commitment to stand by a person, group, or cause through cost."
    },
    variants: [
      {
        id: "loyalty-dissent",
        label: "Dissent",
        antithesis: "Betrayal",
        obligation:
          "Loyalty pursued without Dissent decays into Complicity: you protect the group from the truth it most needs to hear.",
        scores: { nonobviousness: 78, tension: 92, positivity: 88, actionability: 82 },
        scheme: {
          thesis: {
            pole: "Loyalty",
            positive: "Fidelity",
            positiveGloss: "Staying when it costs something to stay.",
            negative: "Complicity",
            negativeGloss: "Staying by agreeing, until the agreement is what is being defended."
          },
          antithesis: {
            pole: "Betrayal",
            positive: "Dissent",
            positiveGloss: "Contradicting the group in the group's own interest.",
            negative: "Treachery",
            negativeGloss: "Contradicting the group in someone else's interest, or outside it."
          },
          operations: {
            rePlus: [
              "Show up for the group when the cost is real and visible",
              "Argue inside the room and carry the decision outside it",
              "Defend the person while opposing the position"
            ],
            acPlus: [
              "Say the objection at the time, not afterwards",
              "Ask for the case against, and make it yourself if nobody will",
              "Name the thing everyone has privately agreed not to mention"
            ]
          },
          center: {
            label: "Allegiance",
            gloss:
              "Commitment to what the group is for rather than to what it currently thinks. Agreement alone is complicity; opposition alone is exit."
          },
          tension:
            "The disagreement that would most help the group is the one most likely to be read as disloyalty.",
          overshoot: {
            thesisSide:
              "Decisions are unanimous, and everyone can privately name the reason they will fail.",
            antithesisSide:
              "Every meeting relitigates first principles and no commitment survives contact."
          }
        }
      },
      {
        id: "loyalty-exit",
        label: "Freedom to leave",
        antithesis: "Departure",
        obligation:
          "Loyalty pursued without a credible Freedom to leave is not loyalty but captivity: staying means nothing when going was never possible.",
        scores: { nonobviousness: 94, tension: 88, positivity: 82, actionability: 76 },
        scheme: {
          thesis: {
            pole: "Loyalty",
            positive: "Fidelity",
            positiveGloss: "A chosen, renewed commitment to stay.",
            negative: "Complicity",
            negativeGloss: "Presence sustained by cost of leaving rather than by reason to stay."
          },
          antithesis: {
            pole: "Departure",
            positive: "Freedom to leave",
            positiveGloss: "A real, non-punishing exit that makes staying a genuine choice.",
            negative: "Flight",
            negativeGloss: "Exit taken at the first cost, so no commitment is ever tested."
          },
          operations: {
            rePlus: [
              "Give people reasons to stay that survive being examined",
              "Honour the commitments that made staying reasonable",
              "Invest in the person on a horizon longer than the current role"
            ],
            acPlus: [
              "Remove the penalties that make leaving expensive rather than sad",
              "Ask directly what would make someone leave, and take the answer seriously",
              "Let people go well, publicly, so the door is visibly open"
            ]
          },
          center: {
            label: "Commitment",
            gloss:
              "Staying that means something because going was available. Attachment alone becomes capture; mobility alone becomes indifference."
          },
          tension:
            "Making it easy to leave is the only thing that makes staying evidence of anything.",
          overshoot: {
            thesisSide:
              "Tenure is long, engagement is low, and nobody can afford to test the market.",
            antithesisSide:
              "Nothing lasts long enough to compound, and every project is someone's first month."
          }
        }
      },
      {
        id: "loyalty-independence",
        label: "Independence",
        antithesis: "Distance",
        obligation:
          "Loyalty pursued without Independence decays into Complicity: you have no ground to stand on at the moment the group is wrong.",
        scores: { nonobviousness: 80, tension: 84, positivity: 84, actionability: 74 },
        scheme: {
          thesis: {
            pole: "Loyalty",
            positive: "Fidelity",
            positiveGloss: "Identification with the group's fate as your own.",
            negative: "Complicity",
            negativeGloss: "Identification so complete that the group's error cannot be perceived."
          },
          antithesis: {
            pole: "Distance",
            positive: "Independence",
            positiveGloss: "A view formed from outside the group's own account of itself.",
            negative: "Detachment",
            negativeGloss: "A view formed from outside and never brought back inside."
          },
          operations: {
            rePlus: [
              "Take on the group's obligations as personally binding",
              "Represent the group faithfully to outsiders",
              "Carry your share of its costs, not only its benefits"
            ],
            acPlus: [
              "Maintain relationships and standing outside the group",
              "Check the group's claims against a source it does not control",
              "Keep a position you would hold if you left tomorrow"
            ]
          },
          center: {
            label: "Integrity",
            gloss:
              "Belonging without dissolution. Attachment alone erases judgment; distance alone forfeits standing."
          },
          tension:
            "The closer you are to the group, the less able you are to see what it is getting wrong.",
          overshoot: {
            thesisSide:
              "The group's framing is the only one available internally, and outside criticism is heard as attack.",
            antithesisSide:
              "You are correct about the group, uninvolved in it, and unable to change anything."
          }
        }
      },
      {
        id: "loyalty-self-respect",
        label: "Self-respect",
        antithesis: "Self-interest",
        obligation:
          "Loyalty pursued without Self-respect decays into Complicity: devotion becomes a debt that can never be repaid, and the relationship stops being mutual.",
        scores: { nonobviousness: 76, tension: 82, positivity: 86, actionability: 70 },
        scheme: {
          thesis: {
            pole: "Loyalty",
            positive: "Fidelity",
            positiveGloss: "Giving more than is strictly owed, because the relationship warrants it.",
            negative: "Complicity",
            negativeGloss: "Giving without limit, until being used is indistinguishable from being valued."
          },
          antithesis: {
            pole: "Self-interest",
            positive: "Self-respect",
            positiveGloss: "A floor below which you will not go, stated and held.",
            negative: "Selfishness",
            negativeGloss: "A floor raised until nothing is ever given at cost."
          },
          operations: {
            rePlus: [
              "Give beyond the contract where it is genuinely needed",
              "Stay through the period when the return is not yet visible",
              "Assume good faith first, and repair rather than withdraw"
            ],
            acPlus: [
              "State the limit before it is crossed, not after",
              "Notice whether the giving runs in both directions, and count",
              "Decline once, early, and see how it is received"
            ]
          },
          center: {
            label: "Mutuality",
            gloss:
              "A bond that both sides are strengthened by. Devotion alone invites exploitation; self-protection alone prevents the bond."
          },
          tension:
            "The limit you set to protect yourself is the moment the relationship discovers whether it was mutual.",
          overshoot: {
            thesisSide:
              "You are indispensable, exhausted, and the arrangement is now assumed by everyone.",
            antithesisSide:
              "Every request is weighed for return, and nobody asks you for anything difficult any more."
          }
        }
      }
    ]
  },

  {
    id: "speed",
    thesis: {
      label: "Speed",
      reading: "The commitment to reduce the time between deciding and acting."
    },
    variants: [
      {
        id: "speed-reversibility",
        label: "Reversibility",
        antithesis: "Caution",
        obligation:
          "Speed pursued without Reversibility churns: every fast decision becomes permanent, so the cost of being wrong rises exactly as your rate of deciding does.",
        scores: { nonobviousness: 90, tension: 92, positivity: 88, actionability: 92 },
        scheme: {
          thesis: {
            pole: "Speed",
            positive: "Momentum",
            positiveGloss: "Decisions reached and acted on while they still matter.",
            negative: "Churn",
            negativeGloss: "Motion that has to be undone, at a cost greater than the delay avoided."
          },
          antithesis: {
            pole: "Caution",
            positive: "Reversibility",
            positiveGloss: "Building so that a wrong decision can be cheaply withdrawn.",
            negative: "Hesitation",
            negativeGloss: "Preparing to undo instead of deciding at all."
          },
          operations: {
            rePlus: [
              "Set a decision deadline and decide on the information available at it",
              "Push the decision to whoever can make it without a meeting",
              "Ship the smallest version that produces real feedback"
            ],
            acPlus: [
              "Sort decisions by whether they can be undone, and slow only the ones that cannot",
              "Build the rollback before the rollout",
              "Keep the interface stable so the thing behind it can change"
            ]
          },
          center: {
            label: "Agility",
            gloss:
              "Moving fast and being able to change direction. Pace alone accumulates irreversible error; reversibility alone never commits."
          },
          tension:
            "The work that makes a decision reversible is work that could have gone into making it sooner.",
          overshoot: {
            thesisSide:
              "Roadmaps are dominated by consequences of choices nobody would make again and nobody can unwind.",
            antithesisSide:
              "Everything is behind a flag, nothing is committed, and the system carries every past option at once."
          }
        }
      },
      {
        id: "speed-reflection",
        label: "Reflection",
        antithesis: "Stillness",
        obligation:
          "Speed pursued without Reflection churns: the same mistake is repeated at a higher frequency, and the cycle time improvement makes it worse.",
        scores: { nonobviousness: 72, tension: 88, positivity: 86, actionability: 84 },
        scheme: {
          thesis: {
            pole: "Speed",
            positive: "Momentum",
            positiveGloss: "Short cycles, so reality answers back quickly.",
            negative: "Churn",
            negativeGloss: "Cycles too short to contain the learning they were supposed to produce."
          },
          antithesis: {
            pole: "Stillness",
            positive: "Reflection",
            positiveGloss: "A pause long enough to see the pattern across cycles.",
            negative: "Rumination",
            negativeGloss: "A pause that revisits without concluding."
          },
          operations: {
            rePlus: [
              "Cut the wait states between steps, not the steps",
              "Decide with the person who has the context, immediately",
              "Default to acting where the action is cheap"
            ],
            acPlus: [
              "Hold a retrospective that changes something before the next cycle starts",
              "Look at the last ten decisions together rather than one at a time",
              "Write down the prediction, then check it"
            ]
          },
          center: {
            label: "Learning rate",
            gloss:
              "How fast you actually get better, not how fast you move. Speed alone repeats; reflection alone has nothing to reflect on."
          },
          tension:
            "The time you take to understand the last cycle is time the next cycle is not running.",
          overshoot: {
            thesisSide:
              "Velocity is high and the same class of incident has recurred every month for a year.",
            antithesisSide:
              "The retrospective document is excellent and the actions from it are three quarters old."
          }
        }
      },
      {
        id: "speed-depth",
        label: "Depth",
        antithesis: "Slowness",
        obligation:
          "Speed pursued without Depth churns: you ship surfaces nothing can be built on, and the next ten things each take longer than the last.",
        scores: { nonobviousness: 76, tension: 86, positivity: 84, actionability: 78 },
        scheme: {
          thesis: {
            pole: "Speed",
            positive: "Momentum",
            positiveGloss: "Visible progress, early, against a real problem.",
            negative: "Churn",
            negativeGloss: "A growing base of work that must be redone before anything new can rest on it."
          },
          antithesis: {
            pole: "Slowness",
            positive: "Depth",
            positiveGloss: "Time spent on the layer that everything above it will depend on.",
            negative: "Over-engineering",
            negativeGloss: "Foundations laid for a building nobody has agreed to construct."
          },
          operations: {
            rePlus: [
              "Ship a thin slice end to end before widening it",
              "Timebox the exploration and commit at the boundary",
              "Prefer the version you can put in front of a user this week"
            ],
            acPlus: [
              "Invest properly in the parts three other things will sit on",
              "Fix the cause once rather than the symptom five times",
              "Ask what this will need to support in a year, then build for that only where it is cheap"
            ]
          },
          center: {
            label: "Progress",
            gloss:
              "Movement that accumulates. Pace alone builds a base that collapses; depth alone builds a base nothing sits on."
          },
          tension:
            "The foundation work that will make everything faster is the work that makes this week slower.",
          overshoot: {
            thesisSide:
              "Each feature takes longer than the last, and estimates are correct only in the worst case.",
            antithesisSide:
              "The architecture is elegant, general, and has one caller."
          }
        }
      },
      {
        id: "speed-patience",
        label: "Patience",
        antithesis: "Delay",
        obligation:
          "Speed pursued without Patience churns: you force outcomes that were going to arrive anyway, and pay for the forcing in rework and goodwill.",
        scores: { nonobviousness: 68, tension: 80, positivity: 84, actionability: 72 },
        scheme: {
          thesis: {
            pole: "Speed",
            positive: "Momentum",
            positiveGloss: "Acting while the opportunity is open.",
            negative: "Churn",
            negativeGloss: "Acting before the conditions that would make the action work exist."
          },
          antithesis: {
            pole: "Delay",
            positive: "Patience",
            positiveGloss: "Waiting for a specific, nameable condition to arrive.",
            negative: "Passivity",
            negativeGloss: "Waiting without a condition, which is indistinguishable from not acting."
          },
          operations: {
            rePlus: [
              "Act on the parts that do not depend on the missing condition",
              "Set the trigger in advance so the wait ends automatically",
              "Reduce the cost of acting, so acting early stops being expensive"
            ],
            acPlus: [
              "Name the condition you are waiting for, and the date you stop waiting",
              "Let the slow process complete rather than restarting it",
              "Distinguish what you can cause from what you can only be ready for"
            ]
          },
          center: {
            label: "Timing",
            gloss:
              "Acting at the moment the action works. Urgency alone arrives early; patience alone arrives late."
          },
          tension:
            "The urgency that gets things started is the same urgency that will not let them finish.",
          overshoot: {
            thesisSide:
              "Launches land before the thing they depend on is ready, and each is quietly relaunched later.",
            antithesisSide:
              "The conditions are being waited for, have been for two quarters, and were never written down."
          }
        }
      }
    ]
  }
];

// Relevance is computed, never stored, so reference and generated schemes are
// ranked by exactly the same rule. Weights are surfaced in the UI on purpose:
// the criteria are the thing reviewers should be arguing with.
export const WEIGHTS = {
  nonobviousness: 0.3,
  tension: 0.3,
  positivity: 0.2,
  actionability: 0.2
};

export const SCORE_LABELS = {
  nonobviousness: "Non-obvious",
  tension: "Tension",
  positivity: "Positivity",
  actionability: "Actionable"
};

export function relevance(scores) {
  let total = 0;
  for (const key of Object.keys(WEIGHTS)) {
    total += (scores[key] ?? 0) * WEIGHTS[key];
  }
  return Math.round(total);
}

export function findThesis(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return null;
  return (
    CORPUS.find((t) => t.thesis.label.toLowerCase() === q) ||
    CORPUS.find((t) => t.id === q) ||
    null
  );
}
