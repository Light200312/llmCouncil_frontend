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
      // Optional: Helps with routing to better models if using 'auto'
      "HTTP-Referer": window.location.origin, 
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      // Lower temperature ensures more deterministic, structured formatting
      temperature: 0.3, 
      messages: [
        {
          role: "system",
          // CRITICAL CHANGE: Stricter instructions for raw Markdown
          content: `You are a Markdown content generator. 
            1. Return the response in strict raw Markdown format.
            2. Do NOT wrap the entire response in a code block (like \`\`\`markdown ... \`\`\`).
            3. Use clear headers (#, ##), bullet points (-), and bold text (**) for structure.
            4. Ensure distinct line breaks between paragraphs.`,
        },
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
  // Ensure we return a string, even if the API returns null/undefined
  return data.choices?.[0]?.message?.content || "";
}