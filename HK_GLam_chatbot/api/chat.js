export default async function handler(req, res) {
  try {
    const { message } = req.body;

    // ✅ Hardcoded responses (fast)
    if (message.toLowerCase().includes("time")) {
      return res.status(200).json({
        reply: "🕒 We are open from 11 AM to 8 PM",
      });
    }

    // 🤖 Gemini API call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no response.";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(200).json({
      reply: "Sorry 😔 try again later.",
    });
  }
}