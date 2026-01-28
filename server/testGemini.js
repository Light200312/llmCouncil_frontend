import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function askQuestion(question) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { role: "user", parts: [{ text: question }] },
    ],
  });

  console.log("\nQUESTION:");
  console.log(question);

  console.log("\nANSWER:");
  console.log(response.text);
}

askQuestion("What is React JS? Explain in simple terms.");
