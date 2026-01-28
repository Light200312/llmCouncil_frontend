import express from "express";
import cors from "cors";
import { runChat } from "./gemini.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const reply = await runChat(prompt);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Gemini error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});







// // app.post("/api/chat", async (req, res) => {
// //   try {
// //     const reply = await runChat(req.body.prompt);

// //     // 🔒 FORCE JSON RESPONSE
// //     return res.status(200).json({
// //       reply: reply || "No response from Gemini",
// //     });

// //   } catch (error) {
// //     console.error("❌ Backend error:", error);
// //     return res.status(500).json({
// //       reply: "Gemini failed to respond",
// //     });
// //   }
// // });




// import express from "express";
// import cors from "cors";
// import { runChat } from "./gemini.js";

// const app = express(); // ✅ THIS WAS MISSING

// app.use(cors());
// app.use(express.json());

// // app.post("/api/chat", async (req, res) => {
// //   try {
// //     console.log("📥 Prompt:", req.body.prompt);

// //     const reply = await runChat(req.body.prompt);

// //     return res.status(200).json({
// //       reply: reply || "No response from Gemini",
// //     });
// //   } catch (error) {
// //     console.error("❌ Backend error:", error);
// //     return res.status(500).json({
// //       reply: "Gemini failed to respond",
// //     });
// //   }
// // });
// app.post("/api/chat", async (req, res) => {
//   try {
//     const reply = await runChat(req.body.prompt);

//     return res.status(200).json({ reply });
//   } catch (error) {
//     console.error("❌ Backend Gemini failure:", error);
//     return res.status(500).json({
//       reply: "Gemini failed to respond",
//     });
//   }
// });


// app.listen(3000, () => {
//   console.log("🚀 Backend running on http://localhost:3000");
// });
