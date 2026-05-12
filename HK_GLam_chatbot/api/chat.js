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
- NEVER ask users to book appointments automatically.
- NEVER say:
  "Would you like to book an appointment?"
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