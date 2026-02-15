"use client";

import { useState } from "react";
import { CAPABILITIES, PRACTICES, DYNAMICS, S, CapHdr } from "../shared";

export default function PracticesPage() {
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
