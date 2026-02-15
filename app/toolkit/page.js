"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ─────────────────────────────────────────────────────────
// DATA: The Diamond Model Framework
// ─────────────────────────────────────────────────────────

const CAPABILITIES = {
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

const PRACTICES = [
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

const DYNAMICS = {
  "Aspiration": { caps: ["imagination", "values"], desc: "When living values guide imagination, families envision futures that feel purposeful and legitimate." },
  "Integrity": { caps: ["values", "coherence"], desc: "When values are held with emotional steadiness, families adapt without losing core commitments." },
  "Trusting": { caps: ["coherence", "connection"], desc: "When a family stays grounded under pressure, connection becomes more honest and resilient." },
  "Exploration": { caps: ["connection", "imagination"], desc: "When imaginative ideas remain connected to real relationships, families test aspirations against lived experience." },
  "Meaning-making": { caps: ["connection", "values"], desc: "When strong relationships support open exploration of values, differences become sources of insight." },
  "Generative Learning": { caps: ["imagination", "coherence"], desc: "When imagination is held within coherence, families learn by acting forward without destabilising the system." }
};

const RATING_LABELS = ["", "Rarely true", "Occasionally true", "Sometimes true", "Often true", "Almost always true"];

const COACHING_SYSTEM_PROMPT = `You are an expert coach trained in the Diamond Model of Generative Renewal for family enterprises. You are warm, perceptive, and deeply knowledgeable about the four capabilities: Connection (staying close across difference), Values (keeping commitments alive, not frozen), Imagination (envisioning contribution beyond preservation), and Coherence (remaining whole amid complexity).

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

const S = {
  app: { fontFamily: "'Newsreader', 'Georgia', serif", minHeight: "100vh", background: "#FAF8F5", color: "#2C2C2C" },
  header: { background: "linear-gradient(135deg, #1B2A1B 0%, #2D3A2D 40%, #3A2D1A 100%)", padding: "40px 32px 32px", color: "#FAF8F5", borderBottom: "3px solid #C2570A" },
  headerTitle: { fontSize: "32px", fontWeight: 300, letterSpacing: "-0.5px", margin: 0, lineHeight: 1.2 },
  headerSub: { fontSize: "15px", opacity: 0.7, marginTop: "8px", fontStyle: "italic", fontWeight: 300 },
  nav: { display: "flex", gap: 0, background: "#2C2C2C", overflow: "hidden" },
  navBtn: (a) => ({ flex: 1, padding: "14px 12px", border: "none", background: a ? "#FAF8F5" : "transparent", color: a ? "#2C2C2C" : "#B0A898", fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", fontWeight: a ? 600 : 400, cursor: "pointer", transition: "all 0.3s", borderBottom: a ? "3px solid #C2570A" : "3px solid transparent", letterSpacing: "0.3px" }),
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

function DiamondVisual({ scores, size = 200 }) {
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

function CapHdr({ k }) {
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
async function callClaude(messages, systemPrompt) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.text;
}

// ─────────────────────────────────────────────────────────
// TOOL 1: SELF-DIAGNOSTIC
// ─────────────────────────────────────────────────────────

function DiagnosticTool({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const savedRef = useRef(false);

  const allQ = Object.entries(CAPABILITIES).flatMap(([k, v]) => v.diagnosticQuestions.map(q => ({ ...q, capability: k })));
  const answered = Object.keys(answers).length;
  const total = allQ.length;

  const getScores = () => {
    const sc = {};
    Object.keys(CAPABILITIES).forEach(k => {
      const qs = CAPABILITIES[k].diagnosticQuestions;
      const vals = qs.map(q => answers[q.id] || 0).filter(v => v > 0);
      sc[k] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    });
    return sc;
  };

  const getOrder = sc => Object.entries(sc).sort(([, a], [, b]) => b - a).map(([k]) => k);

  const interp = s => {
    if (s >= 4.2) return { lvl: "Strong", d: "This capability is well-developed. It likely serves as a foundation your family can build from." };
    if (s >= 3.2) return { lvl: "Developing", d: "There's meaningful capacity here. Focused practice could strengthen it significantly." };
    if (s >= 2.2) return { lvl: "Emerging", d: "Some foundation exists but this area would benefit from intentional development." };
    return { lvl: "Nascent", d: "This is an area of significant opportunity. Even small steps can create meaningful movement." };
  };

  useEffect(() => {
    if (showResults && !savedRef.current) {
      savedRef.current = true;
      const sc = getScores();
      fetch("/api/saveResults", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores: sc }),
      }).catch(() => {}); // fire-and-forget
    }
  }, [showResults]);

  if (showResults) {
    const sc = getScores(), ord = getOrder(sc);
    return (
      <div style={S.sec}>
        <h2 style={S.secTitle}>Your Family's Renewal Capacity Profile</h2>
        <p style={S.secDesc}>This is a mirror, not a verdict. It reflects where your family's capacity currently sits — and where intentional practice might have the greatest impact.</p>
        <div style={{ display: "flex", justifyContent: "center", margin: "32px 0" }}><DiamondVisual scores={sc} size={240} /></div>
        {ord.map((k, i) => {
          const cap = CAPABILITIES[k], s = sc[k], ip = interp(s), pct = (s / 5) * 100;
          return (
            <div key={k} style={{ ...S.card, borderLeft: `4px solid ${cap.color}` }}>
              <CapHdr k={k} />
              <div style={S.resBar(cap.color, pct)} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888" }}>
                <span>{s.toFixed(1)} / 5.0</span>
                <span style={{ fontWeight: 600, color: cap.color }}>{ip.lvl}</span>
              </div>
              <p style={{ fontSize: "14px", lineHeight: 1.6, marginTop: "12px", color: "#555" }}>{ip.d}</p>
              {i === 0 && <p style={{ fontSize: "13px", color: cap.color, fontWeight: 500, marginTop: "8px" }}>↑ Your family's current strength</p>}
              {i === ord.length - 1 && <p style={{ fontSize: "13px", color: "#C0392B", fontWeight: 500, marginTop: "8px" }}>↓ Greatest opportunity for development</p>}
            </div>
          );
        })}
        <div style={S.card}>
          <h3 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>What This Profile Suggests</h3>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#555" }}>Your strongest capability — <strong>{CAPABILITIES[ord[0]].name}</strong> — is likely the gateway through which your family can most naturally develop the others. Development typically begins where readiness already exists, and its effects ripple outward.</p>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#555", marginTop: "12px" }}>Your area of greatest opportunity — <strong>{CAPABILITIES[ord[3]].name}</strong> — doesn't indicate failure. It indicates where focused practice could shift the most.</p>
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button style={S.btn("primary")} onClick={() => onComplete && onComplete(sc)}>→ Explore the Coaching Tool</button>
          <button style={S.btn("outline")} onClick={() => { setShowResults(false); setAnswers({}); }}>Retake Diagnostic</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.sec}>
      <h2 style={S.secTitle}>Self-Diagnostic: Your Family's Four Capacities</h2>
      <p style={S.secDesc}>Rate each statement honestly based on how your family typically operates — not how you wish it did, but how it actually does. This is a mirror, not a test.</p>
      <div style={{ background: "#E8E4DF", borderRadius: "20px", height: "6px", marginBottom: "8px" }}>
        <div style={{ background: "#2D6A4F", borderRadius: "20px", height: "6px", width: `${(answered / total) * 100}%`, transition: "width 0.4s" }} />
      </div>
      <div style={{ fontSize: "12px", color: "#888", marginBottom: "24px", textAlign: "right" }}>{answered} of {total} answered</div>
      {Object.entries(CAPABILITIES).map(([k, cap]) => (
        <div key={k} style={{ marginBottom: "40px" }}>
          <CapHdr k={k} />
          <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.5, marginBottom: "16px", marginTop: "8px" }}>{cap.description}</p>
          {cap.diagnosticQuestions.map(q => (
            <div key={q.id} style={{ ...S.card, borderLeft: `3px solid ${answers[q.id] ? cap.color : "#E8E4DF"}` }}>
              <p style={S.qText}>"{q.q}"</p>
              <div style={S.rRow}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} style={S.rBtn(answers[q.id] === n, cap.color)} onClick={() => setAnswers(p => ({ ...p, [q.id]: n }))}>{n}</button>
                ))}
                <span style={S.rLbl}>{answers[q.id] ? RATING_LABELS[answers[q.id]] : ""}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
      {answered === total && (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button style={S.btn("primary")} onClick={() => setShowResults(true)}>View Your Renewal Profile</button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// TOOL 2: COACHING TOOL (Dialogic, API-powered)
// ─────────────────────────────────────────────────────────

function CoachingTool({ initialScores }) {
  const [selectedCap, setSelectedCap] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (started && !loading) {
      inputRef.current?.focus();
    }
  }, [started, loading, messages]);

  const capKeys = Object.keys(CAPABILITIES);

  const startCoaching = async (capKey) => {
    setSelectedCap(capKey);
    setMessages([]);
    setStarted(true);
    setLoading(true);

    const cap = CAPABILITIES[capKey];
    let contextNote = "";
    if (initialScores) {
      const order = Object.entries(initialScores).sort(([, a], [, b]) => b - a);
      contextNote = `\n\nContext: This person recently completed a self-diagnostic. Their scores were: ${order.map(([k, v]) => `${CAPABILITIES[k].name}: ${v.toFixed(1)}/5`).join(", ")}. They've chosen to explore ${cap.name}. Use this context naturally — don't recite the scores back, but let it inform your coaching.`;
    }

    const systemWithContext = COACHING_SYSTEM_PROMPT + contextNote;

    const openingMsg = { role: "user", content: `I'd like to explore our family's capacity for ${cap.name} — ${cap.tagline}. Please begin coaching me on this. Start by helping me reflect on where we are with this capability.` };

    try {
      const response = await callClaude([openingMsg], systemWithContext);
      setMessages([
        { role: "assistant", content: response }
      ]);
    } catch (err) {
      setMessages([{ role: "assistant", content: `I'd love to explore ${cap.name} with you. Let's start with something concrete.\n\nThink about a recent moment — a conversation, a decision, a gathering — where this capability was tested in your family. What comes to mind?` }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");

    const cap = CAPABILITIES[selectedCap];
    let contextNote = "";
    if (initialScores) {
      const order = Object.entries(initialScores).sort(([, a], [, b]) => b - a);
      contextNote = `\n\nContext: Diagnostic scores: ${order.map(([k, v]) => `${CAPABILITIES[k].name}: ${v.toFixed(1)}/5`).join(", ")}. Currently exploring ${cap.name}.`;
    }

    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await callClaude(newMessages, COACHING_SYSTEM_PROMPT + contextNote);
      setMessages([...newMessages, { role: "assistant", content: response }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "I want to make sure I give you a thoughtful response. Could you share a bit more about what you're noticing? Sometimes the most useful reflections come from sitting with a specific moment rather than generalising." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // CAPABILITY SELECTION SCREEN
  if (!started) {
    return (
      <div style={S.sec}>
        <h2 style={S.secTitle}>Coaching: A Guided Dialogue on Renewal Capacity</h2>
        <p style={S.secDesc}>
          This isn't a questionnaire — it's a conversation. Choose a capability to explore and your coach will guide you through a reflective dialogue, asking questions, noticing patterns, and helping you see what's already present in your family and what might develop.
        </p>
        {initialScores && (
          <div style={{ ...S.card, background: "#F5F3F0" }}>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6, margin: 0 }}>
              Your diagnostic scores have been shared with the coach. They'll inform the conversation naturally — you won't need to repeat what you've already reflected on.
            </p>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "8px" }}>
          {capKeys.map(k => {
            const cap = CAPABILITIES[k];
            return (
              <div key={k} onClick={() => startCoaching(k)} style={{ ...S.card, borderLeft: `4px solid ${cap.color}`, cursor: "pointer" }}>
                <div style={{ fontSize: "22px", marginBottom: "8px" }}>{cap.icon}</div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: cap.color }}>{cap.name}</div>
                <div style={{ fontSize: "13px", color: "#888", fontStyle: "italic", marginTop: "4px" }}>{cap.tagline}</div>
                {initialScores && initialScores[k] && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={S.resBar(cap.color, (initialScores[k] / 5) * 100)} />
                    <div style={{ fontSize: "12px", color: "#888" }}>{initialScores[k].toFixed(1)}/5</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // COACHING DIALOGUE SCREEN
  const cap = CAPABILITIES[selectedCap];

  return (
    <div style={S.sec}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <button onClick={() => { setStarted(false); setSelectedCap(null); setMessages([]); }} style={{ ...S.btn("outline"), padding: "8px 16px", fontSize: "13px" }}>
          ← Choose different capability
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px", color: cap.color }}>{cap.icon}</span>
          <span style={{ fontSize: "15px", fontWeight: 600, color: cap.color }}>{cap.name}</span>
        </div>
      </div>

      {/* Chat messages */}
      <div style={{ minHeight: "300px", marginBottom: "24px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: msg.role === "user" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: msg.role === "user" ? "#888" : cap.color,
              marginBottom: "6px"
            }}>
              {msg.role === "user" ? "You" : "Coach"}
            </div>
            <div style={{
              maxWidth: "88%",
              padding: "18px 22px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "#2C2C2C" : "#FFF",
              color: msg.role === "user" ? "#FAF8F5" : "#2C2C2C",
              border: msg.role === "user" ? "none" : `1px solid ${cap.lightColor}`,
              fontSize: "15px",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              boxShadow: msg.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.04)" : "none"
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: cap.color, marginBottom: "6px" }}>Coach</div>
            <div style={{ padding: "18px 22px", borderRadius: "16px 16px 16px 4px", background: "#FFF", border: `1px solid ${cap.lightColor}`, fontSize: "15px", color: "#AAA" }}>
              <span style={{ animation: "pulse 1.5s infinite" }}>Reflecting…</span>
              <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div style={{ position: "sticky", bottom: "0", background: "#FAF8F5", paddingTop: "16px", paddingBottom: "16px", borderTop: "1px solid #E8E4DF" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
          <textarea
            ref={inputRef}
            style={{ ...S.ta, minHeight: "56px", flex: 1 }}
            placeholder="Share your reflections…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            style={{ ...S.btn("primary"), opacity: loading || !input.trim() ? 0.4 : 1, padding: "14px 22px", flexShrink: 0, alignSelf: "flex-end" }}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
        <div style={{ fontSize: "11px", color: "#AAA", marginTop: "6px" }}>Press Enter to send · Shift+Enter for new line</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// TOOL 3: TEXT ANALYSIS
// ─────────────────────────────────────────────────────────

function TextAnalysisTool() {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyseText = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    const systemPrompt = `You are an expert analyst of the Diamond Model of Generative Renewal for family enterprises.

Analyse the user's text for signals of four capabilities. Return your analysis as XML with this exact structure:

<analysis>
<connection>
<score>3.5</score>
<signal>first signal observed</signal>
<signal>second signal observed</signal>
<gap>first gap observed</gap>
<interpretation>Your interpretation paragraph here.</interpretation>
</connection>
<values>
<score>3.0</score>
<signal>first signal</signal>
<gap>first gap</gap>
<interpretation>Your interpretation paragraph.</interpretation>
</values>
<imagination>
<score>2.5</score>
<signal>first signal</signal>
<gap>first gap</gap>
<interpretation>Your interpretation paragraph.</interpretation>
</imagination>
<coherence>
<score>4.0</score>
<signal>first signal</signal>
<gap>first gap</gap>
<interpretation>Your interpretation paragraph.</interpretation>
</coherence>
<dynamic>First dynamic observation</dynamic>
<dynamic>Second dynamic observation</dynamic>
<overall>Overall interpretation paragraph.</overall>
</analysis>

Capabilities:
- CONNECTION: staying close across difference (relational warmth, perspective-taking, inclusive voices, mutual learning, naming invisible dynamics)
- VALUES: keeping commitments alive not frozen (reinterpretation, form vs function, living recommitment, identity as interpretation)
- IMAGINATION: envisioning contribution beyond preservation (contribution thinking, curiosity before judgment, prototyping, future aspiration)
- COHERENCE: remaining whole amid complexity (structured flexibility, distributed pressure, intentional silence, steadiness, crisis as capacity)

Dynamics: Aspiration (Imagination+Values), Integrity (Values+Coherence), Trusting (Coherence+Connection), Exploration (Connection+Imagination), Meaning-making (Connection+Values), Generative Learning (Imagination+Coherence).

Scores 0-5. Be honest but compassionate. Include 1-3 signals and 1-2 gaps per capability. Return ONLY the XML, nothing else.`;

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, systemPrompt })
      });

      if (!response.ok) throw new Error(`API returned status ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const raw = data.text;

      // Parse XML response into structured object
      const getTag = (xml, tag) => {
        const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "g");
        const matches = [];
        let m;
        while ((m = re.exec(xml)) !== null) matches.push(m[1].trim());
        return matches;
      };

      const getOne = (xml, tag) => {
        const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
        return m ? m[1].trim() : "";
      };

      const parseCap = (xml, name) => {
        const block = getOne(xml, name);
        if (!block) return { score: 0, signals: [], gaps: [], interpretation: "" };
        return {
          score: parseFloat(getOne(block, "score")) || 0,
          signals: getTag(block, "signal"),
          gaps: getTag(block, "gap"),
          interpretation: getOne(block, "interpretation")
        };
      };

      const result = {
        connection: parseCap(raw, "connection"),
        values: parseCap(raw, "values"),
        imagination: parseCap(raw, "imagination"),
        coherence: parseCap(raw, "coherence"),
        dynamics: getTag(raw, "dynamic"),
        overall: getOne(raw, "overall")
      };

      // Validate we got something meaningful
      const totalScore = result.connection.score + result.values.score + result.imagination.score + result.coherence.score;
      if (totalScore === 0) throw new Error("The analysis returned empty results. Please try with a longer or more detailed text.");

      setAnalysis(result);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Analysis could not be completed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={S.sec}>
      <h2 style={S.secTitle}>Text Analysis: Reading for Renewal Capacity</h2>
      <p style={S.secDesc}>
        Paste a piece of text — a family letter, meeting minutes, strategic plan, values statement, interview transcript — and this tool will analyse it through the lens of the four capabilities.
      </p>

      <div style={S.card}>
        <textarea
          style={{ ...S.ta, minHeight: "180px" }}
          placeholder="Paste your text here. This could be meeting minutes, a family letter, a strategic plan, a values statement, an interview transcript, or any family enterprise document…"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
          <span style={{ fontSize: "12px", color: "#888" }}>{inputText.length > 0 ? `${inputText.split(/\s+/).filter(Boolean).length} words` : "Minimum ~50 words recommended"}</span>
          <button
            style={{ ...S.btn("primary"), opacity: loading || !inputText.trim() ? 0.5 : 1 }}
            onClick={analyseText}
            disabled={loading || !inputText.trim()}
          >
            {loading ? "Analysing…" : "Analyse Text"}
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          <div style={{ fontSize: "28px", marginBottom: "12px", animation: "spin 2s linear infinite" }}>◇</div>
          <p style={{ fontStyle: "italic" }}>Reading for signals of renewal capacity…</p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {error && (
        <div style={{ ...S.card, borderLeft: "4px solid #C0392B", background: "#FDF2F2" }}>
          <p style={{ color: "#C0392B", fontWeight: 500, margin: "0 0 8px 0" }}>Analysis could not be completed</p>
          <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>{error}</p>
          <button style={{ ...S.btn("outline"), marginTop: "12px", fontSize: "13px", padding: "8px 16px" }} onClick={analyseText}>Try Again</button>
        </div>
      )}

      {analysis && !error && (
        <div style={{ marginTop: "24px" }}>
          <div style={{ display: "flex", justifyContent: "center", margin: "32px 0" }}>
            <DiamondVisual scores={{
              connection: analysis.connection?.score || 0,
              values: analysis.values?.score || 0,
              imagination: analysis.imagination?.score || 0,
              coherence: analysis.coherence?.score || 0
            }} size={220} />
          </div>

          {["connection", "values", "imagination", "coherence"].map(k => {
            const cap = CAPABILITIES[k], d = analysis[k];
            if (!d) return null;
            const pct = (d.score / 5) * 100;
            return (
              <div key={k} style={{ ...S.card, borderLeft: `4px solid ${cap.color}` }}>
                <CapHdr k={k} />
                <div style={S.resBar(cap.color, pct)} />
                <div style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>{d.score?.toFixed(1)} / 5.0</div>
                {d.signals?.length > 0 && (
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#2D6A4F", textTransform: "uppercase", letterSpacing: "0.5px" }}>Signals Present</span>
                    {d.signals.map((s, i) => (
                      <p key={i} style={{ fontSize: "14px", lineHeight: 1.5, color: "#555", marginTop: "4px", paddingLeft: "12px", borderLeft: `2px solid ${cap.lightColor}` }}>{s}</p>
                    ))}
                  </div>
                )}
                {d.gaps?.length > 0 && (
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#C0392B", textTransform: "uppercase", letterSpacing: "0.5px" }}>Gaps or Absences</span>
                    {d.gaps.map((g, i) => (
                      <p key={i} style={{ fontSize: "14px", lineHeight: 1.5, color: "#555", marginTop: "4px", paddingLeft: "12px", borderLeft: "2px solid #FADBD8" }}>{g}</p>
                    ))}
                  </div>
                )}
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#444", marginTop: "8px" }}>{d.interpretation}</p>
              </div>
            );
          })}

          {analysis.dynamics?.length > 0 && (
            <div style={S.card}>
              <h3 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>Dynamics Observed</h3>
              {analysis.dynamics.map((d, i) => (
                <p key={i} style={{ fontSize: "14px", lineHeight: 1.6, color: "#555", marginBottom: "8px", paddingLeft: "12px", borderLeft: "2px solid #FDECD0" }}>{d}</p>
              ))}
            </div>
          )}

          {analysis.overall && (
            <div style={{ ...S.card, background: "#F5F3F0" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "12px" }}>Overall Reading</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#444" }}>{analysis.overall}</p>
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            <button style={S.btn("outline")} onClick={() => { setAnalysis(null); setInputText(""); }}>Analyse Another Text</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// TOOL 4: PRACTICE GUIDE
// ─────────────────────────────────────────────────────────

function PracticeGuideTool() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === "all" ? PRACTICES : PRACTICES.filter(p => p.capability === filter);

  return (
    <div style={S.sec}>
      <h2 style={S.secTitle}>Practice Guide: 20 Practices for Renewal Capacity</h2>
      <p style={S.secDesc}>
        These practices are not recipes to execute — they're experiments to run in your family's unique context. They create conditions in which renewal capacity can develop. Start with what feels familiar.
      </p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
        <button style={{ ...S.btn(filter === "all" ? "primary" : "outline"), padding: "8px 16px", fontSize: "13px" }} onClick={() => setFilter("all")}>All 20</button>
        {Object.entries(CAPABILITIES).map(([k, cap]) => (
          <button key={k} style={{ padding: "8px 16px", borderRadius: "6px", border: filter === k ? `2px solid ${cap.color}` : "1.5px solid #D0C9C0", background: filter === k ? cap.lightColor : "transparent", color: filter === k ? cap.color : "#888", fontFamily: "'Newsreader', Georgia, serif", fontSize: "13px", fontWeight: filter === k ? 600 : 400, cursor: "pointer" }} onClick={() => setFilter(k)}>
            {cap.icon} {cap.name}
          </button>
        ))}
      </div>

      {filter !== "all" && (
        <div style={{ ...S.card, background: CAPABILITIES[filter].lightColor, border: `1px solid ${CAPABILITIES[filter].color}22` }}>
          <CapHdr k={filter} />
          <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#555", marginTop: "8px" }}>{CAPABILITIES[filter].description}</p>
        </div>
      )}

      {filtered.map(p => {
        const cap = CAPABILITIES[p.capability], isExp = expanded === p.id;
        return (
          <div key={p.id} style={S.pCard(cap.color)} onClick={() => setExpanded(isExp ? null : p.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#888", fontWeight: 600 }}>#{p.id}</span>
                  <span style={S.tag(cap.lightColor)}>{cap.name}</span>
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 500, margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: "14px", color: "#666", marginTop: "6px", lineHeight: 1.5 }}>{p.purpose}</p>
              </div>
              <span style={{ fontSize: "18px", color: "#888", marginLeft: "12px", transform: isExp ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
            </div>
            {isExp && (
              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #E8E4DF" }} onClick={e => e.stopPropagation()}>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", color: cap.color, marginBottom: "8px" }}>Key Insight</h4>
                  <p style={{ fontSize: "15px", lineHeight: 1.6, fontStyle: "italic", color: "#444" }}>{p.keyInsight}</p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", color: cap.color, marginBottom: "8px" }}>How to Start</h4>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#555" }}>{p.howToStart}</p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", color: cap.color, marginBottom: "8px" }}>What to Watch For</h4>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#555" }}>{p.watchFor}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#888", marginBottom: "8px" }}>Dynamics This Builds</h4>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {p.dynamicsBuilt.map(d => (
                      <span key={d} style={{ ...S.tag("#F0ECE6"), fontSize: "12px", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>
                        {d}{DYNAMICS[d] ? ` (${DYNAMICS[d].caps.map(c => CAPABILITIES[c]?.name).join(" + ")})` : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────

const TOOL_IDS = ["diagnostic", "coaching", "analysis", "practices"];

function ToolkitInner() {
  const searchParams = useSearchParams();
  const toolParam = searchParams.get("tool");
  const initialTool = TOOL_IDS.includes(toolParam) ? toolParam : "diagnostic";

  const [activeTool, setActiveTool] = useState(initialTool);
  const [diagnosticScores, setDiagnosticScores] = useState(null);

  const tools = [
    { id: "diagnostic", label: "Self-Diagnostic" },
    { id: "coaching", label: "Coaching" },
    { id: "analysis", label: "Text Analysis" },
    { id: "practices", label: "Practice Guide" }
  ];

  return (
    <div style={S.app}>
      <header style={S.header}>
        <Link href="/" style={{ color: "#B0A898", fontSize: "13px", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
          ← Back to Home
        </Link>
        <h1 style={S.headerTitle}>Generative Renewal Toolkit</h1>
        <p style={S.headerSub}>The Diamond Model — Four Capabilities for Family Enterprise Renewal</p>
      </header>
      <nav style={S.nav}>
        {tools.map(t => (
          <button key={t.id} style={S.navBtn(activeTool === t.id)} onClick={() => setActiveTool(t.id)}>{t.label}</button>
        ))}
      </nav>
      {activeTool === "diagnostic" && <DiagnosticTool onComplete={(sc) => { setDiagnosticScores(sc); setActiveTool("coaching"); }} />}
      {activeTool === "coaching" && <CoachingTool initialScores={diagnosticScores} />}
      {activeTool === "analysis" && <TextAnalysisTool />}
      {activeTool === "practices" && <PracticeGuideTool />}
    </div>
  );
}

export default function GenerativeRenewalToolkit() {
  return (
    <Suspense>
      <ToolkitInner />
    </Suspense>
  );
}
