const { askAI } = require("../services/geminiService");

exports.evaluate = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
You are a professional interviewer.

Question: ${question}
Answer: ${answer}

Evaluate:
- Correctness (0-10)
- Clarity (0-10)
- Depth (0-10)

Give:
1. Total score (/30)
2. Short feedback
3. Improvement suggestion
`;

    const aiResponse = await askAI(prompt);

    res.json({ result: aiResponse });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};