const axios = require("axios");

exports.askAI = async (prompt) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

  const rawText =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return rawText;


  } catch (err) {
    console.error("Gemini Error:", err.response?.data || err.message);
    throw new Error("AI request failed");
  }
};