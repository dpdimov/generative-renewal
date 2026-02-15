"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CAPABILITIES, RATING_LABELS, S, DiamondVisual, CapHdr } from "../shared";

function interp(s) {
  if (s >= 4.2) return { lvl: "Strong", d: "This capability is well-developed. It likely serves as a foundation your family can build from." };
  if (s >= 3.2) return { lvl: "Developing", d: "There's meaningful capacity here. Focused practice could strengthen it significantly." };
  if (s >= 2.2) return { lvl: "Emerging", d: "Some foundation exists but this area would benefit from intentional development." };
  return { lvl: "Nascent", d: "This is an area of significant opportunity. Even small steps can create meaningful movement." };
}

export default function DiagnosticPage() {
  return (
    <Suspense fallback={<div style={S.sec}><p style={{ color: "#888" }}>Loading…</p></div>}>
      <DiagnosticInner />
    </Suspense>
  );
}

function DiagnosticInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const savedRef = useRef(false);

  const urlGroup = searchParams.get("group");
  const [groupCode, setGroupCode] = useState("");
  const [groupLocked, setGroupLocked] = useState(false);

  useEffect(() => {
    if (urlGroup) {
      setGroupCode(urlGroup);
      setGroupLocked(true);
    } else {
      const stored = localStorage.getItem("diagnosticGroupCode");
      if (stored) setGroupCode(stored);
    }
  }, [urlGroup]);

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

  useEffect(() => {
    if (showResults && !savedRef.current) {
      savedRef.current = true;
      const sc = getScores();
      localStorage.setItem("diagnosticScores", JSON.stringify(sc));
      if (groupCode) localStorage.setItem("diagnosticGroupCode", groupCode);
      fetch("/api/saveResults", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores: sc, groupCode: groupCode || undefined }),
      }).catch(() => {});
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
          <button style={S.btn("primary")} onClick={() => router.push("/toolkit/coaching")}>→ Explore the Coaching Tool</button>
          <button style={S.btn("outline")} onClick={() => { setShowResults(false); setAnswers({}); savedRef.current = false; }}>Retake Diagnostic</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.sec}>
      <h2 style={S.secTitle}>Self-Diagnostic: Your Family's Four Capacities</h2>
      <p style={S.secDesc}>Rate each statement honestly based on how your family typically operates — not how you wish it did, but how it actually does. This is a mirror, not a test.</p>

      {/* Group Code */}
      <div style={{ ...S.card, borderLeft: "3px solid #B0A898", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <label style={{ fontSize: "14px", fontWeight: 500, color: "#2C2C2C" }}>Group Code</label>
          <span style={{ fontSize: "12px", color: "#AAA" }}>Optional</span>
        </div>
        <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.5, marginBottom: "10px" }}>
          If you're completing this as part of a workshop or cohort, enter the code provided by your facilitator.
        </p>
        <input
          type="text"
          value={groupCode}
          onChange={e => setGroupCode(e.target.value.trim())}
          disabled={groupLocked}
          placeholder="e.g. spring-2026-cohort"
          maxLength={50}
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1.5px solid #D0C9C0",
            background: groupLocked ? "#F0ECE6" : "#FFF",
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: "14px",
            color: "#2C2C2C",
            boxSizing: "border-box",
            outline: "none",
            opacity: groupLocked ? 0.8 : 1,
          }}
        />
        {groupLocked && (
          <p style={{ fontSize: "12px", color: "#888", marginTop: "6px" }}>Set by your facilitator's link — cannot be changed.</p>
        )}
      </div>

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
