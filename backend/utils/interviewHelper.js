const crypto = require("crypto");

// 🔑 cache key generator
const generateCacheKey = (role, skills) => {
  return crypto
    .createHash("md5")
    .update(role + skills.sort().join(","))
    .digest("hex");
};

// 🎯 role skills → weighted distribution
const buildInterviewSkills = (roleSkills = []) => {
  return roleSkills.map(skill => ({
    name: skill.name,
    weight: skill.weight || 1,
    count: Math.ceil((skill.weight || 1) * 2)
  }));
};

// 🧠 70-30 AI PROMPT
const buildPrompt = (role, skills) => {
  const skillText = skills
    .map(s => `${s.name} (${s.count})`)
    .join(", ");

  return `
You are an expert technical interviewer.

Role: ${role}

Skills:
${skillText}

Generate interview questions in JSON format.

RULES:
- 70% THEORY questions
- 30% CODING questions
- Cover all skills
- No explanation

FORMAT:
[
  {
    "type": "theory",
    "question": "Explain closures in JavaScript"
  },
  {
    "type": "coding",
    "question": "Find sum of array",
    "input": "[1,2,3]",
    "output": "6",
    "testCases": [
      { "input": "[1,2]", "output": "3" },
      { "input": "[5,5]", "output": "10" }
    ]
  }
]
`;
};

module.exports = {
  generateCacheKey,
  buildInterviewSkills,
  buildPrompt
};