"use client";

import { useState, useEffect, useRef } from "react";
import { CAPABILITIES, COACHING_SYSTEM_PROMPT, S, callClaude } from "../shared";

export default function CoachingPage() {
  const [initialScores, setInitialScores] = useState(null);
  const [selectedCap, setSelectedCap] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load diagnostic scores from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("diagnosticScores");
      if (stored) setInitialScores(JSON.parse(stored));
    } catch {}
  }, []);

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
      setMessages([{ role: "assistant", content: response }]);
    } catch {
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
    } catch {
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
