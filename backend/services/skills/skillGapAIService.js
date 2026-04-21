const { askAI } = require("../ai.Service");

// SAFE JSON PARSER
const cleanJSON = (text) => {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON Parse Failed:", text);
    return null;
  }
};

// MAIN AI FUNCTION
exports.generateSkillGapInsight = async (gap, role) => {
  try {
    const prompt = `
You are an AI career mentor.

User role: ${role}

Missing skills: ${gap.missingSkills.join(", ") || "None"}
Weak skills: ${gap.weakSkills.join(", ") || "None"}

STRICT RULES:
- Return ONLY JSON

FORMAT:
{
  "summary": "",
  "whyItMatters": "",
  "learningOrder": [],
  "prioritySkills": [
    { "name": "", "reason": "" }
  ],
  "difficulty": [
    { "name": "", "level": "Easy/Medium/Hard" }
  ],
  "motivation": ""
}
`;


    const response = await askAI(prompt);

    const parsed = cleanJSON(response);

    if (!parsed) throw new Error("Invalid AI response");

    return parsed;

  } catch (err) {
    console.error("AI SkillGap Error:", err.message);

    // FALLBACK SYSTEM (CRITICAL)
    return {
      summary: "You need to improve your weak and missing skills to become job-ready.",
      whyItMatters: "These skills are critical for performing well in your target role.",
      learningOrder: [...gap.weakSkills, ...gap.missingSkills].slice(0, 5),
      motivation: "Stay consistent. Small daily progress leads to big success."
    };
  }
};