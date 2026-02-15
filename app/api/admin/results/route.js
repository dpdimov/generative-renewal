import { NextResponse } from "next/server";
import { getAnalytics, getRecentResults } from "../../../../lib/database";

export async function POST(request) {
  try {
    const { password, groupCode, dateFrom, dateTo } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filters = {};
    if (groupCode) filters.groupCode = groupCode;
    if (dateFrom) filters.dateFrom = dateFrom;
    if (dateTo) filters.dateTo = dateTo;

    const [analytics, recent] = await Promise.all([
      getAnalytics(filters),
      getRecentResults(50, filters),
    ]);

    return NextResponse.json({ analytics, recent });
  } catch (error) {
    console.error("Admin results error:", error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
