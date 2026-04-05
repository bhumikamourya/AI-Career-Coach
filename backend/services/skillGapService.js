const roleSkills = require("../utils/roleSkills");

const normalize = (arr) => arr.map(s => s.toLowerCase().trim());

exports.getSkillGap = (userSkills, targetRole) => {
  // fallback safety
  if (!userSkills || !targetRole) {
    return {
      requiredSkills: [],
      matchedSkills: [],
      missingSkills: [],
      weakSkills: []
    };
  }

  const requiredSkills = roleSkills[targetRole] || [];

  const normalizedUser = normalize(userSkills);
  const normalizedRequired = normalize(requiredSkills);

  const matched = [];
  const missing = [];

  normalizedRequired.forEach((skill, index) => {
    if (normalizedUser.includes(skill)) {
      matched.push(requiredSkills[index]);
    } else {
      missing.push(requiredSkills[index]);
    }
  });

  // simple weak logic (can improve later)
  const weak = matched.filter(skill =>
    ["html", "css", "git"].includes(skill.toLowerCase())
  );

  return {
    requiredSkills,
    matchedSkills: matched,
    missingSkills: missing,
    weakSkills: weak
  };
};