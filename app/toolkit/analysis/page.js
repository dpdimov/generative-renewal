"use client";

import { useState } from "react";
import { CAPABILITIES, S, DiamondVisual, CapHdr } from "../shared";

export default function AnalysisPage() {
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
