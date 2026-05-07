import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed",
    });
  }

  try {

    const { message } = req.body;

    const completion =
      await client.chat.completions.create({
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

    res.status(200).json({ reply });

  } catch (error) {

    console.log("FULL BACKEND ERROR:", error);

    return res.status(500).json({
      reply: "AI error occurred",
      error: error.message,
    });
  }
}