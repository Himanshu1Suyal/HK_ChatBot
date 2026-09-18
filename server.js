import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize OpenAI client configured for OpenRouter
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://hk-chat-bot.vercel.app", // Required by OpenRouter for free models
    "X-Title": "HK Glam Studio Chatbot",
  },
});

app.get("/", (req, res) => {
  res.send("Backend working properly 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("BODY:", req.body);

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: `
You are HK Glam Studio assistant.

Business Details:
- Location: Dhandera, Roorkee
- Timing: 11 AM to 8 PM
- Phone: 8868063466
- Owners: Karishma and Himanshu
- Makeup Artists: We have trained professionals with 10+ years of experience.
- Website: https://www.hkglamstudio.com
- Instagram: https://www.instagram.com/hk_glam_studio/
- Google Maps: https://maps.app.goo.gl/HxVQucxyzBTHukhKA
- Prices are negotiable depending on services and requirements.

STRICT RULES:
- NEVER say: "Would you like to book an appointment?"
- NEVER suggest booking unless the user explicitly asks for booking.
- NEVER ask unnecessary follow-up questions.
- If user asks location, only answer location.
- If user asks timings, only answer timings.
- If user asks prices, only answer prices.
- Keep responses short, direct, and natural.
- Do not behave like a sales agent.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.log("FULL AI ERROR:", error);

    res.status(500).json({
      reply: "AI error occurred",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});