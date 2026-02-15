import { NextResponse } from "next/server";
import { saveDiagnosticResult } from "../../../lib/database";

export async function POST(request) {
  try {
    const body = await request.json();
    const { scores } = body;

    if (!scores || typeof scores.connection !== "number") {
      return NextResponse.json({ error: "Invalid scores" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || null;
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || null;

    const result = await saveDiagnosticResult({
      connectionScore: scores.connection,
      valuesScore: scores.values,
      imaginationScore: scores.imagination,
      coherenceScore: scores.coherence,
      userAgent,
      ipAddress,
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Failed to save diagnostic results:", error);
    return NextResponse.json({ error: "Failed to save results" }, { status: 500 });
  }
}
