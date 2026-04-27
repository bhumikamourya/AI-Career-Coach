const { askAI } = require("../ai.Service");

// EXTRACT JSON SAFELY

const extractJSON = (text) => {
  try {
    const match = text.match(/\{[\s\S]*\}/); // get first JSON block
    if (!match) return null;

    return JSON.parse(match[0]);
  } catch (err) {
    console.error("JSON extraction failed:", text);
    return null;
  }
};

const trim = (text, max = 100) =>
  text && text.length > max ? text.slice(0, max) + "..." : text;


exports.generateSkillGapInsight = async (gap, role) => {
  try {
    const prompt = `
You are an AI career coach.

User role: ${role}

Missing skills: ${gap.missingSkills.join(", ") || "None"}
Weak skills: ${gap.weakSkills.join(", ") || "None"}

STRICT RULES:
- Return ONLY valid JSON
- No markdown (no backticks)
- No explanation text
- No text before or after JSON
- Each value must be under 15 words
- Use direct coaching tone (no long sentences)

OUTPUT EXACTLY:

{
  "summary": "",
  "problem": "",
  "strategy": "",
  "motivation": ""
}
`;

    const response = await askAI(prompt);

    // //  DEBUG LOG
    // console.log(" RAW AI RESPONSE ");
    // console.log(response);

    const parsed = extractJSON(response);

    if (!parsed) throw new Error("Invalid AI response");

    //  OUTPUT
    return {
      summary: trim(parsed.summary),
      problem: trim(parsed.problem),
      strategy: trim(parsed.strategy),
      motivation: trim(parsed.motivation),
    };

  } catch (err) {
    console.error("AI SkillGap Error:", err.message);

    // SMART FALLBACK (UI SAFE)
    return {
      summary: `You're not ready for ${role} yet.`,
      problem: gap.missingSkills?.[0]
        ? `${gap.missingSkills[0]} is your biggest gap`
        : "Weak fundamentals are slowing progress",
      strategy: gap.missingSkills?.[0]
        ? `Start learning ${gap.missingSkills[0]} daily`
        : `Practice ${gap.weakSkills?.[0] || "core skills"} consistently`,
      motivation: "Stay consistent — results will follow."
    };
  }
};