const skillDictionary = require("../../utils/skillDictionary");
const Role = require("../../models/Role");

const normalizeText = (text) => String(text || "").toLowerCase();

// dictionary matching
const matchFromDictionary = (text) => {
  return skillDictionary
    .filter(item =>
      (item.aliases || []).some(alias =>
        typeof alias === "string" &&
        new RegExp(`\\b${alias}\\b`, "i").test(text)
      )
    )
    .map(item => String(item.name || "").toLowerCase())
    .filter(Boolean);
};

exports.extractSkills = async (text, targetRole) => {
  const lowerText = normalizeText(text);

  let roleSkills = [];

  //  1. FETCH ROLE FROM DB
  if (targetRole) {
    const role = await Role.findOne({ name: targetRole });

    if (role && role.skills?.length > 0) {
      roleSkills = (role.skills || [])
        .map(s => typeof s === "string" ? s : s?.name || s?.skill || "")
        .filter(Boolean)
        .map(s => s.toLowerCase());
    }
  }

  //  2. ROLE-BASED MATCHING
const matchedRoleSkills = roleSkills.filter(skill =>
  new RegExp(`\\b${skill}\\b`, "i").test(lowerText)
);

  //  3. DICTIONARY MATCHING (fallback + aliases)
  const dictionarySkills = matchFromDictionary(lowerText);

  //  4. MERGE + REMOVE DUPLICATES
const finalSkills = [...new Set([
  ...matchedRoleSkills,
  ...dictionarySkills
])].filter(Boolean);

return finalSkills;
};