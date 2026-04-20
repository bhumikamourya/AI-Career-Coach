const { askAI } = require("./ai.service");

exports.generateSkillGapInsight = async (gap, role) => {
  try {
    const response = await askAI(`
User role: ${role}

Missing skills: ${gap.missingSkills.join(", ")}
Weak skills: ${gap.weakSkills.join(", ")}

Return JSON:
{
  "summary": "",
  "whyItMatters": "",
  "learningOrder": [],
  "motivation": ""
}
`);

    return JSON.parse(
      response.replace(/```json/g, "").replace(/```/g, "").trim()
    );

  } catch (err) {
    console.error("AI SkillGap Error:", err.message);
    return null;
  }
};