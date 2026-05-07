import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed",
    });
  }

  try {

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const userMessage = req.body.message;

    const prompt = `
You are HK Glam Studio assistant.

Business Info:
- Location: Roorkee
- Timings: 11 AM to 8 PM
- Phone: 8868063466

Customer Message:
${userMessage}

Respond professionally and briefly.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.status(200).json({
      reply: response,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      reply: "AI error occurred",
    });
  }
}