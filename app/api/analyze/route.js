export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  const { text, systemPrompt } = await request.json();

  // Enforce 6000-char text truncation server-side
  const truncatedText = text.substring(0, 6000);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: truncatedText }],
    }),
  });

  const data = await response.json();

  if (data.error) {
    return Response.json(
      { error: data.error.message || "API error" },
      { status: response.status }
    );
  }

  const resultText = data.content
    .map((c) => c.text || "")
    .filter(Boolean)
    .join("");

  return Response.json({ text: resultText });
}
