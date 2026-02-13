export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  const { messages, systemPrompt } = await request.json();

  // Enforce 20-turn conversation cap (count user messages)
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  if (userMessageCount > 20) {
    return Response.json(
      { error: "Conversation limit reached (20 turns)" },
      { status: 400 }
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return Response.json(
      { error: data.error.message || "API error" },
      { status: response.status }
    );
  }

  const text = data.content
    .map((c) => c.text || "")
    .filter(Boolean)
    .join("\n");

  return Response.json({ text });
}
