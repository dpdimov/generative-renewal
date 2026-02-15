import { NextResponse } from "next/server";
import { getDistinctGroupCodes } from "../../../../lib/database";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await getDistinctGroupCodes();
    const groupCodes = rows.map(r => r.group_code);

    return NextResponse.json({ groupCodes });
  } catch (error) {
    console.error("Admin filters error:", error);
    return NextResponse.json({ error: "Failed to fetch filters" }, { status: 500 });
  }
}
