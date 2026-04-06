const roleSkills = require("../utils/roleSkills");

const levelMap = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3
};

exports.getSkillGap = (userSkills, targetRole) => {
  if (!userSkills || !targetRole) {
    return {
      requiredSkills: [],
      matchedSkills: [],
      missingSkills: [],
      weakSkills: []
    };
  }

  const required = roleSkills[targetRole] || [];

  const userMap = {};
  userSkills.forEach((s) => {
    userMap[s.name.toLowerCase()] = levelMap[s.level];
  });

  const missing = [];
  const weak = [];
  const matched = [];

  required.forEach((skill) => {
    const userLevel = userMap[skill.name.toLowerCase()];

    if (!userLevel) {
      missing.push(skill.name);
    } else if (userLevel < levelMap[skill.level]) {
      weak.push(skill.name);
    } else {
      matched.push(skill.name);
    }
  });

  return {
    requiredSkills: required.map((s) => s.name),
    matchedSkills: matched,
    missingSkills: missing,
    weakSkills: weak
  };
};