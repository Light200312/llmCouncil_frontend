/**
 * OpenRouter API utility function
 * Sends a prompt to OpenRouter and returns the response text
 */
export async function callOpenRouter(prompt, imageBase64) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key not found. Please add VITE_OPENROUTER_API_KEY to .env.local"
    );
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: imageBase64
            ? [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                },
              },
            ]
            : prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message || `OpenRouter error: ${response.status}`
    );
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response received";
}
