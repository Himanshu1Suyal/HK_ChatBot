import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const callModel = async (modelName, userMessage) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `
You are a friendly assistant for HK Glam Studio 💄

Location: Roorkee
Timings: 11 AM to 8 PM
Phone: 8868063466

User: ${userMessage}
              `,
            },
          ],
        },
      ],
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

const callGemini = async (userMessage, retries = 2) => {
  try {
    // 🔥 Primary (stable)
    return await callModel("gemini-2.0-flash", userMessage);

  } catch (error) {
    const status = error.response?.status;

    // 🔁 Retry if 503
    if (status === 503 && retries > 0) {
      console.log("Retrying...", retries);
      await new Promise((res) => setTimeout(res, 1000));
      return callGemini(userMessage, retries - 1);
    }

    console.log("Switching to fallback model...");

    // 🔄 Fallback model
    return await callModel("gemini-2.5-flash", userMessage);
  }
};

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();

    // ✅ HARD CODED RESPONSES (NO AI NEEDED)

    if (userMessage.includes("time") || userMessage.includes("timing")) {
      return res.json({
        reply: "🕒 Our salon is open from 11 AM to 8 PM 💄",
      });
    }

    if (userMessage.includes("location") || userMessage.includes("where")) {
      return res.json({
        reply: "📍 We are located in Roorkee",
      });
    }

    if (userMessage.includes("phone") || userMessage.includes("contact")) {
      return res.json({
        reply: "📞 Call us at 8868063466",
      });
    }

    if (userMessage.includes("book")) {
      return res.json({
        reply: "booking"
      });
    }

    // 🤖 ONLY CALL AI IF NOT MATCHED
    const reply = await callGemini(userMessage);

    res.json({ reply });

  } catch (error) {
    console.error("FINAL ERROR:", error.response?.data || error.message);

    res.json({
      reply:
        "Sorry 😔 we're facing high demand right now. Please try again later or call us at 8868063466.",
    });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));