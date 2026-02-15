"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TOOLS = [
  { id: "diagnostic", label: "Self-Diagnostic", href: "/toolkit/diagnostic" },
  { id: "coaching", label: "Coaching", href: "/toolkit/coaching" },
  { id: "analysis", label: "Text Analysis", href: "/toolkit/analysis" },
  { id: "practices", label: "Practice Guide", href: "/toolkit/practices" }
];

export default function ToolkitLayout({ children }) {
  const pathname = usePathname();

  return (
    <div style={{ fontFamily: "'Newsreader', 'Georgia', serif", minHeight: "100vh", background: "#FAF8F5", color: "#2C2C2C" }}>
      <nav style={{
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #1B2A1B 0%, #2D3A2D 40%, #3A2D1A 100%)",
        borderBottom: "3px solid #C2570A",
        padding: "0 16px",
        gap: "0",
        overflow: "hidden"
      }}>
        <Link href="/" style={{
          color: "#B0A898",
          fontSize: "13px",
          textDecoration: "none",
          padding: "16px 16px 16px 8px",
          whiteSpace: "nowrap",
          flexShrink: 0
        }}>
          ← Home
        </Link>
        <div style={{
          width: "1px",
          height: "24px",
          background: "rgba(176, 168, 152, 0.3)",
          flexShrink: 0
        }} />
        {TOOLS.map(t => {
          const active = pathname.startsWith(t.href);
          return (
            <Link key={t.id} href={t.href} style={{
              flex: 1,
              padding: "16px 12px",
              textAlign: "center",
              textDecoration: "none",
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "13px",
              fontWeight: active ? 600 : 400,
              color: active ? "#FAF8F5" : "#B0A898",
              borderBottom: active ? "3px solid #C2570A" : "3px solid transparent",
              marginBottom: "-3px",
              transition: "all 0.2s",
              letterSpacing: "0.3px",
              whiteSpace: "nowrap"
            }}>
              {t.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
