import { NextResponse } from "next/server";
import { getMatchResults } from "@/app/utils/openai"; // Import OpenAI function
import { getUserDetailsByMatchResult } from "@/app/utils/api"; // Adjust the import path based on actual location

export async function GET() {
  try {
    // Get match results from OpenAI
    const { matchedGroups } = await getMatchResults();

    if (!matchedGroups.length) {
      return NextResponse.json({ message: "No matches found." }, { status: 200 });
    }

    // Fetch user details for matched users
    const enrichedGroups = await getUserDetailsByMatchResult(matchedGroups);

    return NextResponse.json({ matchedGroups: enrichedGroups });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
