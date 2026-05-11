const axios = require("axios");

// ✅ All keys (3 ya jitni ho)
const keys = [
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3
].filter(Boolean);

// ❌ Agar ek bhi key nahi hai → system fail hona chahiye
if (keys.length === 0) {
  throw new Error("No Gemini API keys found in environment variables");
}

// ✅ Random key
function getRandomKey() {
  return keys[Math.floor(Math.random() * keys.length)];
}

// ✅ Core request function with fallback
async function callGemini(prompt, apiKey) {
  const keyToUse = apiKey || getRandomKey();

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${keyToUse}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  } catch (err) {
    console.error(`❌ Key failed: ${keyToUse}`);

    // 🔥 fallback: try another key
    const remainingKeys = keys.filter(k => k !== keyToUse);

    if (remainingKeys.length === 0) {
      console.error("🚨 All API keys failed");
      throw new Error("All Gemini API keys failed");
    }

    const newKey = remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
    return callGemini(prompt, newKey);
  }
}

//  PUBLIC FUNCTION
exports.askAI = async (prompt, apiKey) => {
  return await callGemini(prompt, apiKey);
};

// 👉 Generate Questions
exports.generateQuestions = async (role, skills = [], apiKey) => {
  const weakPart =
    skills.length > 0
      ? `Give EXTRA focus to these weak skills: ${skills.join(", ")}.`
      : "";

  const prompt = `
You are an expert technical interviewer.

Generate EXACTLY 5 interview questions for the role: ${role}.

Requirements:
- Cover core topics required for this role (balanced coverage)
- ${weakPart}
- No generic HR questions
- Questions should be practical and interview-level

Return ONLY in JSON array:
["Q1","Q2","Q3","Q4","Q5"]
`;

   let data = await callGemini(prompt, apiKey);

  try {
    data = JSON.parse(data);
  } catch {
    data = data
      .split("\n")
      .map(q => q.replace(/^\d+[\).\s-]*/, "").trim())
      .filter(q => q.length > 5);
  }

  return data.slice(0, 5);
};
// 👉 Evaluate Answers
exports.evaluateAnswers = async (qaList, apiKey) => {
  const prompt = `
Evaluate these interview answers:

${JSON.stringify(qaList)}

Return:
- Correct answers
- Feedback
- Ready or Not Ready
- Improvement tips
`;

   return await callGemini(prompt, apiKey);
};

// 👉 export key function
exports.getRandomKey = getRandomKey;