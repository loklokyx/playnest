import { getPendingGameRequests } from './api';
import OpenAI from "openai";
import { NextResponse } from "next/server";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function GET() {
  try {
    // Fetch pending game requests from Appwrite
    const gameRequests = await getPendingGameRequests();

    if (!gameRequests.length) {
      return NextResponse.json({ message: "No pending game requests found." }, { status: 200 });
    }

    // Construct OpenAI prompt
    const prompt = `
    You are a game match assistant. Follow these rules for matching players:
    - Players with the same type, location, and time can be grouped.
    - The sum of numplayer must exactly match the capacity.
    - Return only the matched user ID groups in JSON format, e.g., [[2,3,5], [1,4,7]].

    Here is the player data:
    ${JSON.stringify(gameRequests, null, 2)}

    Please return the result strictly as a JSON array, without any extra text.
    `;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    // Parse response
    const matchedGroups = JSON.parse(response.choices[0].message.content || "[]");

    return NextResponse.json({ matchedGroups });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}