"use client";

import { useState } from "react";
import Link from "next/link";

const TOOLS = [
  {
    id: "diagnostic",
    title: "Self-Diagnostic",
    icon: "◈",
    color: "#2D6A4F",
    lightColor: "#D8F3DC",
    description: "Map your family's renewal capacity across the four capabilities. A mirror, not a test."
  },
  {
    id: "coaching",
    title: "Coaching",
    icon: "◇",
    color: "#7B2D8E",
    lightColor: "#F0D9F5",
    description: "A guided dialogue to explore and develop your family's generative capabilities."
  },
  {
    id: "analysis",
    title: "Text Analysis",
    icon: "◆",
    color: "#C2570A",
    lightColor: "#FDECD0",
    description: "Analyse family documents — letters, minutes, plans — through the lens of renewal capacity."
  },
  {
    id: "practices",
    title: "Practice Guide",
    icon: "◎",
    color: "#1A5276",
    lightColor: "#D4E6F1",
    description: "Twenty practices for developing the four capabilities. Start with what feels familiar."
  }
];

export default function HubPage() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div style={{ fontFamily: "'Newsreader', 'Georgia', serif", minHeight: "100vh", background: "#FAF8F5", color: "#2C2C2C" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .hub-card { transition: transform 0.2s, box-shadow 0.2s; }
        .hub-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.1) !important; }
        @media (max-width: 640px) {
          .hub-grid { grid-template-columns: 1fr !important; }
          .hub-header-title { font-size: 28px !important; }
          .hub-header-sub { font-size: 14px !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1B2A1B 0%, #2D3A2D 40%, #3A2D1A 100%)",
        padding: "60px 32px 48px",
        color: "#FAF8F5",
        borderBottom: "3px solid #C2570A",
        textAlign: "center"
      }}>
        {/* Decorative diamond */}
        <div style={{ marginBottom: "24px" }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.8 }}>
            <path d="M40 8 L72 40 L40 72 L8 40 Z" fill="none" stroke="#C2570A" strokeWidth="1.5" />
            <path d="M40 18 L62 40 L40 62 L18 40 Z" fill="none" stroke="#B0A898" strokeWidth="1" opacity="0.5" />
            <path d="M40 28 L52 40 L40 52 L28 40 Z" fill="none" stroke="#B0A898" strokeWidth="1" opacity="0.3" />
            <circle cx="40" cy="12" r="3" fill="#2D6A4F" />
            <circle cx="68" cy="40" r="3" fill="#7B2D8E" />
            <circle cx="40" cy="68" r="3" fill="#C2570A" />
            <circle cx="12" cy="40" r="3" fill="#1A5276" />
          </svg>
        </div>
        <h1 className="hub-header-title" style={{
          fontSize: "36px",
          fontWeight: 300,
          letterSpacing: "-0.5px",
          margin: 0,
          lineHeight: 1.2
        }}>
          Generative Renewal Toolkit
        </h1>
        <p className="hub-header-sub" style={{
          fontSize: "16px",
          opacity: 0.7,
          marginTop: "12px",
          fontStyle: "italic",
          fontWeight: 300,
          maxWidth: "480px",
          margin: "12px auto 0",
          lineHeight: 1.5
        }}>
          The Diamond Model — Four Capabilities for Family Enterprise Renewal
        </p>
      </header>

      {/* Tool cards grid */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 60px" }}>
        <div className="hub-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          animation: "fadeIn 0.5s ease-out"
        }}>
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={`/toolkit?tool=${tool.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="hub-card" style={{
                background: "#FFF",
                borderRadius: "10px",
                padding: "28px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                border: "1px solid #E8E4DF",
                borderTop: `4px solid ${tool.color}`,
                cursor: "pointer",
                height: "100%",
                boxSizing: "border-box"
              }}>
                <div style={{
                  fontSize: "28px",
                  marginBottom: "12px",
                  color: tool.color
                }}>
                  {tool.icon}
                </div>
                <h2 style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: tool.color,
                  margin: "0 0 8px 0",
                  fontFamily: "'Newsreader', Georgia, serif"
                }}>
                  {tool.title}
                </h2>
                <p style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#666",
                  margin: 0,
                  fontFamily: "'Newsreader', Georgia, serif"
                }}>
                  {tool.description}
                </p>
                <div style={{
                  marginTop: "16px",
                  fontSize: "13px",
                  color: tool.color,
                  fontWeight: 500
                }}>
                  Open tool →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* About button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => setShowAbout(true)}
            style={{
              padding: "12px 28px",
              borderRadius: "6px",
              border: "1.5px solid #2C2C2C",
              background: "transparent",
              color: "#2C2C2C",
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.3px"
            }}
          >
            About the Diamond Model
          </button>
        </div>
      </div>

      {/* About panel overlay */}
      {showAbout && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center"
          }}
          onClick={() => setShowAbout(false)}
        >
          <div
            style={{
              background: "#FAF8F5",
              borderRadius: "16px 16px 0 0",
              maxWidth: "720px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
              padding: "36px 32px 48px",
              animation: "slideUp 0.3s ease-out",
              boxShadow: "0 -4px 24px rgba(0,0,0,0.15)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 400, margin: 0, fontFamily: "'Newsreader', Georgia, serif" }}>
                The Diamond Model
              </h2>
              <button
                onClick={() => setShowAbout(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  color: "#888",
                  cursor: "pointer",
                  padding: "0 4px",
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#555", marginBottom: "20px" }}>
              The Diamond Model identifies four capabilities that enable family enterprises to renew themselves across generations — not merely to survive, but to remain generative contributors to the world around them.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              {TOOLS.map(tool => (
                <div key={tool.id} style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start"
                }}>
                  <span style={{ fontSize: "20px", color: tool.color, flexShrink: 0, marginTop: "2px" }}>{tool.icon}</span>
                  <div>
                    <span style={{ fontWeight: 600, color: tool.color, fontSize: "15px" }}>{tool.title === "Self-Diagnostic" ? "Connection" : tool.title === "Coaching" ? "Values" : tool.title === "Text Analysis" ? "Imagination" : "Coherence"}</span>
                    <span style={{ color: "#888", fontSize: "14px", fontStyle: "italic" }}>
                      {tool.id === "diagnostic" ? " — Staying close across difference" : tool.id === "coaching" ? " — Keeping commitments alive, not frozen" : tool.id === "analysis" ? " — Envisioning contribution beyond preservation" : " — Remaining whole amid complexity"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#555", marginBottom: "20px" }}>
              These four capabilities interact through six dynamics — Aspiration, Integrity, Trusting, Exploration, Meaning-making, and Generative Learning — forming an integrated system of renewal capacity.
            </p>

            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#555" }}>
              The toolkit offers four ways to engage with this framework: a diagnostic to map where you are, a coaching dialogue to explore what you find, a text analysis tool to read your documents through this lens, and a practice guide with twenty experiments for developing each capability.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
