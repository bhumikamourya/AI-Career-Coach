const Role = require("../../models/Role");
const { levelMap } = require("../../utils/levelMap");

function emptyGap() {
  return {
    requiredSkills: [],
    matchedSkills: [],
    missingSkills: [],
    weakSkills: []
  };
}

const getSkillGap = async (userSkills = [], targetRole = "") => {
  try {
    const role = await Role.findOne({
      name: new RegExp(`^${targetRole}$`, "i")
    });

    if (!role || !Array.isArray(role.skills)) return emptyGap();

    const required = role.skills;

    const userMap = new Map();

    const effectiveSkills = Array.isArray(userSkills) ? userSkills : [];

    for (const s of effectiveSkills) {
      if (!s?.name) continue;

      userMap.set(
        s.name.trim().toLowerCase(),
        levelMap[s.level] || 1
      );
    }

    const missing = [];
    const weak = [];
    const matched = [];

    for (const skill of required) {
      if (!skill?.name) continue;

      const key = skill.name.trim().toLowerCase();
      const userLevel = userMap.get(key);
      const requiredLevel = levelMap[skill.level] || 1;

      if (userLevel === undefined) {
        missing.push(skill.name);
      }
      else if (userLevel < requiredLevel) weak.push(skill.name);
      else matched.push(skill.name);
    }

    return {
      requiredSkills: required.map(s => s.name),
      matchedSkills: matched,
      missingSkills: missing,
      weakSkills: weak
    };

  } catch (err) {
    console.error("SkillGap Error:", err);
    throw err;
  }
};

module.exports = { getSkillGap };