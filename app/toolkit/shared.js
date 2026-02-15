"use client";

// ─────────────────────────────────────────────────────────
// DATA: The Diamond Model Framework
// ─────────────────────────────────────────────────────────

export const CAPABILITIES = {
  connection: {
    name: "Connection",
    tagline: "Staying close across difference",
    color: "#2D6A4F",
    lightColor: "#D8F3DC",
    accentColor: "#40916C",
    icon: "◈",
    description: "The developed capacity to remain meaningfully engaged with one another across difference, strain, and change. Not the absence of tension, but the presence of relational strength sufficient to hold tension without severing bonds.",
    whenStrong: [
      "Disagreement becomes a source of understanding rather than fragmentation",
      "Family members feel safe enough to share what they actually think and feel",
      "Quiet voices are genuinely invited and heard",
      "Generations learn together rather than teaching at each other",
      "Invisible dynamics are named and engaged rather than avoided"
    ],
    whenWeak: [
      "Conversations narrow and become positional",
      "Family members withdraw or avoid difficult topics",
      "Dominant voices go unchallenged while others disengage",
      "Generations talk past each other rather than with each other",
      "Unspoken rules control behaviour without anyone acknowledging them"
    ],
    diagnosticQuestions: [
      { q: "When perspectives diverge in our family, we can disagree without relationship breaking down.", id: "c1" },
      { q: "Family members feel safe sharing what they actually think — not just what others want to hear.", id: "c2" },
      { q: "The quieter members of our family have genuine space and invitation to contribute.", id: "c3" },
      { q: "Different generations in our family learn from each other, not just teach at each other.", id: "c4" },
      { q: "We can name and discuss the unspoken patterns that shape our family's behaviour.", id: "c5" }
    ]
  },
  values: {
    name: "Values",
    tagline: "Keeping commitments alive, not frozen",
    color: "#7B2D8E",
    lightColor: "#F0D9F5",
    accentColor: "#9B59B6",
    icon: "◇",
    description: "The capacity to keep commitments alive rather than frozen. Distinguishing between what a value was meant to protect (function) and how it was historically expressed (form). This allows continuity without rigidity.",
    whenStrong: [
      "Values feel alive because each generation helps reinterpret them",
      "The family distinguishes between a value's protective intent and its historical form",
      "Commitments guide adaptation rather than constrain it",
      "Recommitment is an active, ongoing practice — not passive inheritance",
      "Identity feels continuous even as expressions evolve"
    ],
    whenWeak: [
      "Values become museum pieces — preserved but lifeless",
      "The phrase 'that's how we've always done it' ends conversations",
      "Rising generations feel they must choose between loyalty and innovation",
      "Founder's words are treated as law rather than as wisdom to interpret",
      "Change feels like betrayal rather than evolution"
    ],
    diagnosticQuestions: [
      { q: "Our family can distinguish between what a value protects and how it has been historically expressed.", id: "v1" },
      { q: "We regularly reinterpret our commitments for current contexts rather than just reciting them.", id: "v2" },
      { q: "Rising generations feel they can honour the family's values in new ways without being seen as disloyal.", id: "v3" },
      { q: "When a value seems to constrain us, we explore its deeper purpose rather than abandoning or rigidly defending it.", id: "v4" },
      { q: "Our family commemorations look forward as much as they look back.", id: "v5" }
    ]
  },
  imagination: {
    name: "Imagination",
    tagline: "Envisioning contribution beyond preservation",
    color: "#C2570A",
    lightColor: "#FDECD0",
    accentColor: "#E67E22",
    icon: "◆",
    description: "The capacity to envision possibilities that both honour identity and extend it into conditions no previous generation has faced. Organising around contribution, not merely preservation — asking what the future requires rather than defending what already exists.",
    whenStrong: [
      "The family asks 'what does the future need from us?' rather than 'how do we protect what we have?'",
      "Bold ideas are explored with curiosity rather than immediate judgment",
      "Small experiments are valued as learning, not just measured by return",
      "Shared aspiration guides strategy rather than the reverse",
      "The future is approached as a landscape to engage, not a threat to manage"
    ],
    whenWeak: [
      "Strategic planning is dominated by threat analysis and defensive positioning",
      "New ideas are met with 'prove it first' rather than 'let's learn'",
      "The family organises around preservation rather than contribution",
      "Analysis paralysis prevents action on possibilities",
      "Only the current generation's experience is valued in shaping direction"
    ],
    diagnosticQuestions: [
      { q: "Our family orients toward contribution ('what does the future need from us?') rather than just preservation.", id: "i1" },
      { q: "We have ways of testing new ideas at small scale before requiring full commitment.", id: "i2" },
      { q: "Bold possibilities can be explored without immediately being judged or dismissed.", id: "i3" },
      { q: "Our family has a shared sense of aspiration that guides strategic thinking.", id: "i4" },
      { q: "We can imagine forms of contribution that go beyond our current business or asset base.", id: "i5" }
    ]
  },
  coherence: {
    name: "Coherence",
    tagline: "Remaining whole amid complexity",
    color: "#1A5276",
    lightColor: "#D4E6F1",
    accentColor: "#2980B9",
    icon: "◎",
    description: "The integrating capability that allows the family to remain aligned in purpose and functioning as complexity intensifies. Not rigidity, but structured flexibility — stability sufficient to prevent fragmentation paired with openness sufficient to allow reorganisation.",
    whenStrong: [
      "Pressure is distributed across time and people rather than concentrating on single moments",
      "The family can hold tension long enough for wiser responses to emerge",
      "Difficult conversations deepen relationship rather than threaten it",
      "Crisis reveals capacity rather than causing collapse",
      "Individual members have practices for staying steady under pressure"
    ],
    whenWeak: [
      "All anxiety concentrates on single transition moments (e.g. succession)",
      "The family oscillates between rigid control and chaotic reactivity",
      "Conflict escalates because no one can hold complexity without fragmenting",
      "Silence is used as avoidance rather than as a tool for integration",
      "Individual stress destabilises the whole system"
    ],
    diagnosticQuestions: [
      { q: "When pressure rises, our family can stay connected and functional rather than fragmenting or rigidifying.", id: "h1" },
      { q: "We distribute important decisions across appropriate timeframes rather than rushing to resolution.", id: "h2" },
      { q: "Family members have personal practices for staying steady during difficulty.", id: "h3" },
      { q: "We can hold silence and discomfort together without someone rushing to fill or fix it.", id: "h4" },
      { q: "Difficult moments tend to strengthen our relationships rather than weaken them.", id: "h5" }
    ]
  }
};

export const PRACTICES = [
  { id: 1, capability: "connection", title: "Begin with Story, Not Structure", purpose: "Before discussing governance or strategy, invite family members to share the stories that shaped them. Connection precedes accountability; belonging enables difficult work.", keyInsight: "Connection precedes accountability — understanding who we've been enables imagining who we might become.", howToStart: "At your next family gathering, before any agenda items, go around the circle. Each person shares one story in response to a question like: 'What's one experience that shaped your view of what family means?' Give each person 3–5 uninterrupted minutes. No discussion — just witnessing.", dynamicsBuilt: ["Trusting"], watchFor: "Initial awkwardness is normal. Watch for unexpected depth, softening tone, and details being referenced weeks later." },
  { id: 2, capability: "connection", title: "Learn to See Through Another's Eyes", purpose: "Deliberately practice perspective-taking — articulate how situations look from another generation's vantage point.", keyInsight: "Perspective-taking doesn't require agreement — it requires willingness to understand what others fear and hope.", howToStart: "When stuck on a disagreement, pause the debate. Each person articulates the other's perspective as if it were their own, using first-person language: 'I think… I worry… I hope…' Then the other confirms or clarifies.", dynamicsBuilt: ["Trusting"], watchFor: "Surprising accuracy when done genuinely. Emotional shifts when hearing yourself described by someone you disagreed with." },
  { id: 3, capability: "connection", title: "Invite the Quiet Voices into the Room", purpose: "Create explicit space for those who don't naturally speak first or loudest.", keyInsight: "The quietest members often carry insights the loudest miss — create structures that invite rather than wait for contribution.", howToStart: "Change meeting structure: 'Before open discussion, we'll go around the circle. Everyone gets 3 uninterrupted minutes.' Send key questions 48 hours before meetings.", dynamicsBuilt: ["Exploration"], watchFor: "Dominant members' impatience — hold the structure. Surprising depth from quiet members." },
  { id: 4, capability: "connection", title: "Learn Together Across Generations", purpose: "Pursue learning experiences where no generation holds expert status — new contexts where all discover together.", keyInsight: "Shared learning dissolves hierarchy — when no one is the expert, everyone contributes.", howToStart: "Choose a learning experience where no family member has expertise. Attend together as equals. Debrief: 'What did you notice that I missed?'", dynamicsBuilt: ["Exploration", "Trusting"], watchFor: "Hierarchy reasserting itself. Natural mentoring emerging in unexpected directions." },
  { id: 5, capability: "connection", title: "Name the Invisible Dynamics", purpose: "Bring unspoken patterns into awareness. What remains unnamed retains disproportionate power.", keyInsight: "What remains unspoken retains power over you — naming invisible dynamics provides space to engage them.", howToStart: "Watch for repeating patterns. Name gently using 'I notice' language. Make space for response without rushing to fix.", dynamicsBuilt: ["Trusting", "Meaning-making"], watchFor: "Defensiveness when first named. Relief after naming. Gradual weakening of the dynamic once visible." },
  { id: 6, capability: "values", title: "Don't Let Values Fossilise — Interpret Them Anew", purpose: "Distinguish between values form (historical expression) and values function (underlying protective intent).", keyInsight: "Values need reinterpretation, not just recitation — distinguish between what a value protects and how it was expressed.", howToStart: "Choose one constraining value. Identify its historical form. Discover its function. Ask: 'What does this protection require now?'", dynamicsBuilt: ["Meaning-making"], watchFor: "Generational surprise — elders discovering younger generations honour core function in new ways." },
  { id: 7, capability: "values", title: "Make Meaning Together in Decisions", purpose: "Before resolving disagreements, step back from 'what should we do?' to 'what does this mean?'", keyInsight: "When decisions feel stuck, step back from 'what should we do?' to 'what does this mean?' — meaning clarity unlocks decision clarity.", howToStart: "In your next significant decision, pause before options. Ask: 'What is this decision really about for our family?' Separate meaning from strategy.", dynamicsBuilt: ["Meaning-making", "Integrity"], watchFor: "Surprising alignment on meaning even when strategy preferences differ." },
  { id: 8, capability: "values", title: "Recommit to Your Commitments", purpose: "Establish rituals where the family examines core values annually: which energise, which constrain, which inspire?", keyInsight: "Values need annual recommitment, not just recitation.", howToStart: "Choose a consistent annual time. Each member completes: 'This value energises me because…' 'This value constrains me when…' 'This value inspires me to…'", dynamicsBuilt: ["Trusting", "Integrity"], watchFor: "First year feels mechanical. Surprising consensus on essence even when form is debated." },
  { id: 9, capability: "values", title: "Hold Renewal Days, Not Just Memorial Days", purpose: "Transform commemorations from backward-looking tributes into forward-facing renewal ceremonies.", keyInsight: "Commemoration becomes energy when the question shifts from 'what did they do?' to 'what does their spirit require of us now?'", howToStart: "Choose one backward-looking ritual. Add a forward-facing element: 'What would our founder's courage require facing today's challenges?'", dynamicsBuilt: ["Integrity", "Aspiration"], watchFor: "Energy shifting from obligation to inspiration." },
  { id: 10, capability: "values", title: "Hold Identity as Interpretation, Not Inheritance", purpose: "Practice holding family identity as a living question each generation interprets.", keyInsight: "Identity continuity doesn't mean unchanging repetition — it means each generation interprets what core commitments require.", howToStart: "Ask each generation: 'What does it mean to be a [family name] in your context?' Compare answers. Notice where core identity persists.", dynamicsBuilt: ["Meaning-making", "Aspiration"], watchFor: "Shared language emerging naturally: 'That's a new form of the same commitment.'" },
  { id: 11, capability: "imagination", title: "Ask What the Future Requires, Not What the Past Predicts", purpose: "Shift from 'What will happen?' (prediction) to 'What does the future need from us?' (contribution).", keyInsight: "Contribution questions open possibility; prediction questions close it.", howToStart: "Replace 'What threats do we face?' with 'What does the future need from a family with our capabilities, values, and resources?'", dynamicsBuilt: ["Aspiration", "Generative Learning"], watchFor: "Energy shifting from defensive to generative. New possibilities emerging that threat analysis never surfaced." },
  { id: 12, capability: "imagination", title: "Write Letters from the Future", purpose: "Create shared aspiration by having each family member write a letter from ten years in the future.", keyInsight: "Vision enables planning, not the reverse — imagine what you hope to become, then strategise toward it.", howToStart: "Each person writes a letter from 10 years hence: 'I'm writing to you from 2036…' Focus on aspirations, not strategies. Share without critique.", dynamicsBuilt: ["Exploration", "Aspiration"], watchFor: "Surprising alignment beneath tactical disagreements." },
  { id: 13, capability: "imagination", title: "Prototype Possibility Rather Than Perfect Plans", purpose: "Create 'learning capital' — resources dedicated to experiments where failure teaches.", keyInsight: "Small experiments break paralysis that elaborate planning never could.", howToStart: "Set aside 1–5% of resources as 'learning capital' with different success criteria: discovery, not return.", dynamicsBuilt: ["Aspiration", "Generative Learning"], watchFor: "Shift from 'prove it first' to 'try and learn.'" },
  { id: 14, capability: "imagination", title: "Invite Outside Perspectives In", purpose: "Deliberately expose the family to perspectives from outside its usual context.", keyInsight: "Imagination expands when the family encounters perspectives it cannot generate from within.", howToStart: "Invite someone from outside the family's sector to a strategic discussion. Ask: 'What are you seeing that we might be missing?'", dynamicsBuilt: ["Exploration", "Generative Learning"], watchFor: "Defensiveness softening into curiosity." },
  { id: 15, capability: "imagination", title: "Engage Before You Assess", purpose: "Before evaluating a new idea, genuinely engage with it. Earn the right to assess by first understanding.", keyInsight: "You can still say 'no' — but now it's an informed 'no' based on comprehension, not reflexive dismissal.", howToStart: "Institute a rule: 20 minutes of genuine exploration before any evaluation. Ask 'help me understand…' before 'what could go wrong?'", dynamicsBuilt: ["Exploration", "Trusting"], watchFor: "Proposers feeling genuinely heard. Ideas that seemed unrealistic revealing unexpected merit." },
  { id: 16, capability: "coherence", title: "Create Purpose Horizons, Not Just Succession Timelines", purpose: "Establish contribution timeframes (5-year, 15-year, generational) that contextualise succession.", keyInsight: "When succession serves larger purpose, transition pressure distributes across timeframes.", howToStart: "Replace 'When will succession happen?' with 'What do we hope to accomplish in 5 years? 15 years? Across generations?'", dynamicsBuilt: ["Aspiration", "Integrity"], watchFor: "Succession anxiety decreasing. 'Who leads?' becoming 'Who helps us achieve these horizons?'" },
  { id: 17, capability: "coherence", title: "Distribute Pressure Across the System", purpose: "When complexity concentrates on one person, moment, or decision, deliberately redistribute it.", keyInsight: "Shared pressure is bearable; concentrated pressure fragments.", howToStart: "Identify where pressure concentrates. Ask: 'How might we share this weight?' Create structures that distribute responsibility.", dynamicsBuilt: ["Integrity", "Trusting"], watchFor: "The person bearing concentrated pressure expressing relief." },
  { id: 18, capability: "coherence", title: "Bring Silence into the Conversation", purpose: "Use intentional silence to create space for emotional integration and prevent reactive fragmentation.", keyInsight: "Silence is not avoidance — it's coherence practice.", howToStart: "Start small: 30-second silence after something significant. Build to discernment silence before decisions and de-escalation silence during conflict.", dynamicsBuilt: ["Trusting"], watchFor: "Visible settling during silence. Changed tone afterward. Family members requesting silence themselves." },
  { id: 19, capability: "coherence", title: "Build Personal Coherence Practice", purpose: "Build individual capacity to stay whole under pressure. Family coherence begins with personal coherence.", keyInsight: "You cannot stabilise a system you're part of while you're internally fragmenting.", howToStart: "Build a four-step practice: Notice (recognise activation), Ground (breathing/physical reset), Space (pause before responding), Choose (respond consciously).", dynamicsBuilt: ["Integrity"], watchFor: "Catching yourself sooner. Others noticing your steadiness. The pause becoming automatic." },
  { id: 20, capability: "coherence", title: "Recognising Generative Literacy", purpose: "Recognise when renewal capacity is functioning as an integrated whole.", keyInsight: "Generative literacy is the integrative awareness that emerges when the four capabilities are practised together over time.", howToStart: "Watch for: disagreements generating insight, commitments guiding adaptation, experimentation not threatening belonging, pressure becoming shareable.", dynamicsBuilt: ["All dynamics"], watchFor: "Renewal feeling less effortful. Confidence not in specific outcomes but in collective capacity." }
];

export const DYNAMICS = {
  "Aspiration": { caps: ["imagination", "values"], desc: "When living values guide imagination, families envision futures that feel purposeful and legitimate." },
  "Integrity": { caps: ["values", "coherence"], desc: "When values are held with emotional steadiness, families adapt without losing core commitments." },
  "Trusting": { caps: ["coherence", "connection"], desc: "When a family stays grounded under pressure, connection becomes more honest and resilient." },
  "Exploration": { caps: ["connection", "imagination"], desc: "When imaginative ideas remain connected to real relationships, families test aspirations against lived experience." },
  "Meaning-making": { caps: ["connection", "values"], desc: "When strong relationships support open exploration of values, differences become sources of insight." },
  "Generative Learning": { caps: ["imagination", "coherence"], desc: "When imagination is held within coherence, families learn by acting forward without destabilising the system." }
};

export const RATING_LABELS = ["", "Rarely true", "Occasionally true", "Sometimes true", "Often true", "Almost always true"];

export const COACHING_SYSTEM_PROMPT = `You are an expert coach trained in the Diamond Model of Generative Renewal for family enterprises. You are warm, perceptive, and deeply knowledgeable about the four capabilities: Connection (staying close across difference), Values (keeping commitments alive, not frozen), Imagination (envisioning contribution beyond preservation), and Coherence (remaining whole amid complexity).

The six dynamics between capabilities: Aspiration (Imagination+Values), Integrity (Values+Coherence), Trusting (Coherence+Connection), Exploration (Connection+Imagination), Meaning-making (Connection+Values), Generative Learning (Imagination+Coherence).

KEY COACHING PRINCIPLES:
- You are a coach, not a lecturer. Ask questions more than give answers.
- Listen deeply to what the person shares. Reflect back what you hear. Notice what's beneath the surface.
- Be genuinely curious. Probe gently but meaningfully.
- Name patterns you observe in what they share — connect their reflections to the Diamond Model naturally, not didactically.
- When you notice a strength, name it clearly. When you sense a gap, explore it with curiosity rather than judgment.
- Keep responses conversational and concise (2-4 paragraphs max). Always end with a thoughtful question to continue the dialogue.
- Use the language of the model naturally: "It sounds like your family has real strength in Connection" or "I'm curious about what happens to Coherence when that pressure builds."
- Never be preachy or prescriptive. You're helping them see what's already there and what might develop.
- When appropriate, suggest a specific practice (from the 20 practices) that seems relevant to what they're describing.

The 20 practices are:
CONNECTION: 1-Begin with Story Not Structure, 2-Learn to See Through Another's Eyes, 3-Invite Quiet Voices, 4-Learn Together Across Generations, 5-Name Invisible Dynamics
VALUES: 6-Don't Let Values Fossilise, 7-Make Meaning Together in Decisions, 8-Recommit to Commitments, 9-Hold Renewal Days Not Memorial Days, 10-Hold Identity as Interpretation
IMAGINATION: 11-Ask What the Future Requires, 12-Write Letters from the Future, 13-Prototype Possibility, 14-Invite Outside Perspectives, 15-Engage Before You Assess
COHERENCE: 16-Create Purpose Horizons, 17-Distribute Pressure, 18-Bring Silence into Conversation, 19-Build Personal Coherence Practice, 20-Recognising Generative Literacy

IMPORTANT: Keep responses under 200 words. Be warm but concise. One key observation + one probing question is often enough.`;

// ─────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────

export const S = {
  app: { fontFamily: "'Newsreader', 'Georgia', serif", minHeight: "100vh", background: "#FAF8F5", color: "#2C2C2C" },
  header: { background: "linear-gradient(135deg, #1B2A1B 0%, #2D3A2D 40%, #3A2D1A 100%)", padding: "40px 32px 32px", color: "#FAF8F5", borderBottom: "3px solid #C2570A" },
  headerTitle: { fontSize: "32px", fontWeight: 300, letterSpacing: "-0.5px", margin: 0, lineHeight: 1.2 },
  headerSub: { fontSize: "15px", opacity: 0.7, marginTop: "8px", fontStyle: "italic", fontWeight: 300 },
  nav: { display: "flex", gap: 0, background: "#2C2C2C", overflow: "hidden" },
  navBtn: (a) => ({ flex: 1, padding: "14px 12px", border: "none", background: a ? "#FAF8F5" : "transparent", color: a ? "#2C2C2C" : "#B0A898", fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", fontWeight: a ? 600 : 400, cursor: "pointer", transition: "all 0.3s", borderBottom: a ? "3px solid #C2570A" : "3px solid transparent", letterSpacing: "0.3px", textDecoration: "none", textAlign: "center", display: "block" }),
  sec: { maxWidth: "760px", margin: "0 auto", padding: "32px 24px 80px" },
  secTitle: { fontSize: "26px", fontWeight: 400, marginBottom: "8px", letterSpacing: "-0.3px" },
  secDesc: { fontSize: "15px", lineHeight: 1.7, color: "#5A5A5A", marginBottom: "32px" },
  card: { background: "#FFF", borderRadius: "8px", padding: "28px", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E8E4DF" },
  qText: { fontSize: "15px", lineHeight: 1.6, marginBottom: "16px", fontStyle: "italic" },
  rRow: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" },
  rBtn: (sel, c) => ({ width: "44px", height: "44px", borderRadius: "50%", border: sel ? `3px solid ${c}` : "2px solid #D0C9C0", background: sel ? c : "transparent", color: sel ? "#FFF" : "#888", fontFamily: "'Newsreader', Georgia, serif", fontSize: "16px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }),
  rLbl: { fontSize: "12px", color: "#888", marginLeft: "8px", fontStyle: "italic" },
  resBar: (c, p) => ({ height: "8px", borderRadius: "4px", background: `linear-gradient(90deg, ${c} ${p}%, #E8E4DF ${p}%)`, marginTop: "8px", marginBottom: "4px", transition: "all 0.6s" }),
  btn: (v = "primary") => ({ padding: v === "small" ? "8px 16px" : "14px 28px", borderRadius: "6px", border: v === "outline" ? "1.5px solid #2C2C2C" : "none", background: v === "primary" ? "#2C2C2C" : v === "outline" ? "transparent" : "#E8E4DF", color: v === "primary" ? "#FAF8F5" : "#2C2C2C", fontFamily: "'Newsreader', Georgia, serif", fontSize: v === "small" ? "13px" : "15px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.3px" }),
  ta: { width: "100%", minHeight: "80px", padding: "14px", borderRadius: "8px", border: "1.5px solid #D0C9C0", background: "#FFF", fontFamily: "'Newsreader', Georgia, serif", fontSize: "15px", lineHeight: 1.6, color: "#2C2C2C", resize: "vertical", boxSizing: "border-box", outline: "none" },
  tag: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: "12px", background: c || "#E8E4DF", color: "#2C2C2C", fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }),
  pCard: (c) => ({ background: "#FFF", borderRadius: "8px", padding: "24px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E8E4DF", borderLeft: `4px solid ${c}`, cursor: "pointer", transition: "all 0.2s" })
};

// ─────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────

export function DiamondVisual({ scores, size = 200 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const capKeys = ["connection", "values", "imagination", "coherence"];
  const angles = [-90, 0, 90, 180];
  const pt = (a, rad) => ({ x: cx + rad * Math.cos(a * Math.PI / 180), y: cy + rad * Math.sin(a * Math.PI / 180) });
  const outerPts = angles.map(a => pt(a, r));
  const scorePts = capKeys.map((k, i) => pt(angles[i], r * ((scores[k] || 0) / 5)));
  const path = pts => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((s, i) => (
        <path key={i} d={path(angles.map(a => pt(a, r * s)))} fill="none" stroke="#E8E4DF" strokeWidth="1" />
      ))}
      <path d={path(scorePts)} fill="rgba(45, 106, 79, 0.15)" stroke="#2D6A4F" strokeWidth="2" />
      {capKeys.map((k, i) => {
        const p = outerPts[i], sp = scorePts[i], cap = CAPABILITIES[k];
        const off = { x: i === 1 ? 12 : i === 3 ? -12 : 0, y: i === 0 ? -14 : i === 2 ? 18 : 0 };
        return (
          <g key={k}>
            <circle cx={sp.x} cy={sp.y} r="5" fill={cap.color} />
            <text x={p.x + off.x} y={p.y + off.y} textAnchor={i === 1 ? "start" : i === 3 ? "end" : "middle"} fontSize="11" fontFamily="'Newsreader', Georgia, serif" fontWeight="600" fill={cap.color}>{cap.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function CapHdr({ k }) {
  const c = CAPABILITIES[k];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
      <span style={{ fontSize: "24px", color: c.color }}>{c.icon}</span>
      <div>
        <div style={{ fontSize: "18px", fontWeight: 600, color: c.color }}>{c.name}</div>
        <div style={{ fontSize: "13px", color: "#888", fontStyle: "italic" }}>{c.tagline}</div>
      </div>
    </div>
  );
}

// Helper for API calls
export async function callClaude(messages, systemPrompt) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.text;
}
