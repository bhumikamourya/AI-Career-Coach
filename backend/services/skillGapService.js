const Role = require("../models/Role");

const levelMap = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3
};

exports.getSkillGap = async (userSkills, targetRole) => {
  const role = await Role.findOne({ name: targetRole });

  if (!role) {
    return {
      requiredSkills: [],
      matchedSkills: [],
      missingSkills: [],
      weakSkills: []
    };
  }

   const required = role.skills;

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