"use client";

import { useState } from "react";
import Link from "next/link";

const S = {
  page: { fontFamily: "'Newsreader', 'Georgia', serif", minHeight: "100vh", background: "#FAF8F5", color: "#2C2C2C" },
  header: { background: "linear-gradient(135deg, #1B2A1B 0%, #2D3A2D 40%, #3A2D1A 100%)", padding: "32px", color: "#FAF8F5", borderBottom: "3px solid #C2570A" },
  content: { maxWidth: "800px", margin: "0 auto", padding: "32px 24px 80px" },
  card: { background: "#FFF", borderRadius: "8px", padding: "24px", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E8E4DF" },
  input: { width: "100%", padding: "12px 16px", borderRadius: "6px", border: "1.5px solid #D0C9C0", background: "#FFF", fontFamily: "'Newsreader', Georgia, serif", fontSize: "15px", color: "#2C2C2C", boxSizing: "border-box", outline: "none" },
  btn: { padding: "12px 24px", borderRadius: "6px", border: "none", background: "#2C2C2C", color: "#FAF8F5", fontFamily: "'Newsreader', Georgia, serif", fontSize: "15px", fontWeight: 500, cursor: "pointer" },
  bar: (color, pct) => ({ height: "24px", borderRadius: "4px", background: `linear-gradient(90deg, ${color} ${pct}%, #E8E4DF ${pct}%)`, transition: "all 0.6s", display: "flex", alignItems: "center", paddingLeft: "8px", fontSize: "12px", color: pct > 15 ? "#FFF" : "#888", fontWeight: 600 }),
  th: { textAlign: "left", padding: "10px 12px", borderBottom: "2px solid #E8E4DF", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#888" },
  td: { padding: "10px 12px", borderBottom: "1px solid #F0ECE6", fontSize: "14px" },
  filterInput: { padding: "8px 12px", borderRadius: "6px", border: "1.5px solid #D0C9C0", background: "#FFF", fontFamily: "'Newsreader', Georgia, serif", fontSize: "14px", color: "#2C2C2C", outline: "none" },
  filterLabel: { fontSize: "12px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px", display: "block" }
};

const CAP_COLORS = {
  connection: "#2D6A4F",
  values: "#7B2D8E",
  imagination: "#C2570A",
  coherence: "#1A5276"
};

const CAP_NAMES = {
  connection: "Connection",
  values: "Values",
  imagination: "Imagination",
  coherence: "Coherence"
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groupCodes, setGroupCodes] = useState([]);
  const [filterGroup, setFilterGroup] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  const fetchResults = async (pw, filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, ...filters }),
      });
      if (res.status === 401) {
        setError("Incorrect password.");
        setLoading(false);
        return null;
      }
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
      setLoading(false);
      return json;
    } catch (err) {
      setError(err.message || "Failed to load data.");
      setLoading(false);
      return null;
    }
  };

  const fetchGroupCodes = async (pw) => {
    try {
      const res = await fetch("/api/admin/filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const json = await res.json();
      if (json.groupCodes) setGroupCodes(json.groupCodes);
    } catch {}
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await fetchResults(password);
    if (result) {
      setStoredPassword(password);
      fetchGroupCodes(password);
    }
  };

  const handleFilterChange = (newGroup, newDateFrom, newDateTo) => {
    const filters = {};
    if (newGroup) filters.groupCode = newGroup;
    if (newDateFrom) filters.dateFrom = newDateFrom;
    if (newDateTo) filters.dateTo = newDateTo;
    fetchResults(storedPassword, filters);
  };

  const hasActiveFilters = filterGroup || filterDateFrom || filterDateTo;

  const clearFilters = () => {
    setFilterGroup("");
    setFilterDateFrom("");
    setFilterDateTo("");
    fetchResults(storedPassword);
  };

  // LOGIN SCREEN
  if (!data) {
    return (
      <div style={S.page}>
        <div style={S.header}>
          <Link href="/" style={{ color: "#B0A898", fontSize: "13px", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
            ← Back to Home
          </Link>
          <h1 style={{ fontSize: "28px", fontWeight: 300, margin: 0 }}>Admin — Diagnostic Results</h1>
        </div>
        <div style={S.content}>
          <div style={{ ...S.card, maxWidth: "400px", marginTop: "40px", marginLeft: "auto", marginRight: "auto", marginBottom: "40px" }}>
            <form onSubmit={handleLogin}>
              <label style={{ fontSize: "14px", color: "#888", display: "block", marginBottom: "8px" }}>Password</label>
              <input
                type="password"
                style={S.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
              {error && <p style={{ color: "#C0392B", fontSize: "14px", marginTop: "8px" }}>{error}</p>}
              <button type="submit" style={{ ...S.btn, marginTop: "16px", width: "100%", opacity: loading ? 0.5 : 1 }} disabled={loading}>
                {loading ? "Loading…" : "View Results"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  const { analytics, recent } = data;
  const caps = ["connection", "values", "imagination", "coherence"];

  return (
    <div style={S.page}>
      <div style={S.header}>
        <Link href="/" style={{ color: "#B0A898", fontSize: "13px", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: "28px", fontWeight: 300, margin: 0 }}>Admin — Diagnostic Results</h1>
        <p style={{ fontSize: "14px", opacity: 0.6, marginTop: "6px" }}>
          {analytics.total_assessments} completed diagnostic{analytics.total_assessments !== 1 ? "s" : ""}
          {filterGroup && <span> in group "{filterGroup}"</span>}
        </p>
      </div>
      <div style={S.content}>
        {/* Filter Bar */}
        <div style={{ ...S.card, display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
          <div style={{ flex: "1", minWidth: "160px" }}>
            <label style={S.filterLabel}>Group</label>
            <select
              value={filterGroup}
              onChange={e => {
                setFilterGroup(e.target.value);
                handleFilterChange(e.target.value, filterDateFrom, filterDateTo);
              }}
              style={{ ...S.filterInput, width: "100%", boxSizing: "border-box" }}
            >
              <option value="">All Groups</option>
              {groupCodes.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
          <div style={{ minWidth: "140px" }}>
            <label style={S.filterLabel}>From</label>
            <input
              type="date"
              value={filterDateFrom}
              onChange={e => {
                setFilterDateFrom(e.target.value);
                handleFilterChange(filterGroup, e.target.value, filterDateTo);
              }}
              style={S.filterInput}
            />
          </div>
          <div style={{ minWidth: "140px" }}>
            <label style={S.filterLabel}>To</label>
            <input
              type="date"
              value={filterDateTo}
              onChange={e => {
                setFilterDateTo(e.target.value);
                handleFilterChange(filterGroup, filterDateFrom, e.target.value);
              }}
              style={S.filterInput}
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{ ...S.btn, padding: "8px 16px", fontSize: "13px", background: "transparent", color: "#C0392B", border: "1px solid #C0392B" }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Average Scores */}
        <div style={S.card}>
          <h2 style={{ fontSize: "20px", fontWeight: 400, marginBottom: "20px" }}>
            Average Scores{hasActiveFilters ? " (Filtered)" : " Across All Diagnostics"}
          </h2>
          {caps.map(k => {
            const avg = parseFloat(analytics[`avg_${k}`]) || 0;
            const pct = (avg / 5) * 100;
            return (
              <div key={k} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: CAP_COLORS[k] }}>{CAP_NAMES[k]}</span>
                  <span style={{ fontSize: "13px", color: "#888" }}>{avg.toFixed(2)} / 5.0</span>
                </div>
                <div style={S.bar(CAP_COLORS[k], pct)}>{pct > 15 ? avg.toFixed(2) : ""}</div>
              </div>
            );
          })}
          {analytics.first_assessment && (
            <p style={{ fontSize: "12px", color: "#AAA", marginTop: "16px" }}>
              Data from {new Date(analytics.first_assessment).toLocaleDateString()} to {new Date(analytics.last_assessment).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Recent Results Table */}
        <div style={S.card}>
          <h2 style={{ fontSize: "20px", fontWeight: 400, marginBottom: "20px" }}>Recent Results</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={S.th}>Date</th>
                  <th style={S.th}>Group</th>
                  <th style={{ ...S.th, color: CAP_COLORS.connection }}>Conn</th>
                  <th style={{ ...S.th, color: CAP_COLORS.values }}>Val</th>
                  <th style={{ ...S.th, color: CAP_COLORS.imagination }}>Imag</th>
                  <th style={{ ...S.th, color: CAP_COLORS.coherence }}>Coh</th>
                  <th style={S.th}>Avg</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(r => {
                  const avg = (parseFloat(r.connection_score) + parseFloat(r.values_score) + parseFloat(r.imagination_score) + parseFloat(r.coherence_score)) / 4;
                  return (
                    <tr key={r.id}>
                      <td style={S.td}>{new Date(r.completed_at).toLocaleDateString()}</td>
                      <td style={{ ...S.td, fontSize: "12px", color: "#888" }}>{r.group_code || "—"}</td>
                      <td style={S.td}>{parseFloat(r.connection_score).toFixed(1)}</td>
                      <td style={S.td}>{parseFloat(r.values_score).toFixed(1)}</td>
                      <td style={S.td}>{parseFloat(r.imagination_score).toFixed(1)}</td>
                      <td style={S.td}>{parseFloat(r.coherence_score).toFixed(1)}</td>
                      <td style={{ ...S.td, fontWeight: 600 }}>{avg.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {recent.length === 0 && (
            <p style={{ textAlign: "center", color: "#AAA", padding: "24px", fontStyle: "italic" }}>No diagnostic results yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
