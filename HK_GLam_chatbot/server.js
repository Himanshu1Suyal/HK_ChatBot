import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.get("/", (req, res) => {
  res.send("Backend working properly 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("BODY:", req.body);

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are HK Glam Studio assistant.

Business Details:
- Location: Roorkee
- Timing: 11 AM to 8 PM
- Phone: 8868063466
- Website: https://www.hkglamstudio.com

Be friendly and professional.
Keep answers short and helpful.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.log("FULL AI ERROR:", error);

    res.json({
      reply:
        "Sorry 😔 AI service is temporarily unavailable.",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});