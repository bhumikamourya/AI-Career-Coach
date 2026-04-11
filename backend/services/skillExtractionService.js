const skillDictionary = require("../utils/skillDictionary");
exports.extractSkills = (text) => {
  const lowerText = text.toLowerCase();
  const foundSkills = [];

  skillDictionary.forEach(skillObj => {
    const matched = skillObj.aliases.some(alias =>
      new RegExp(`\\b${alias}\\b`, "i").test(lowerText)
    );

    if (matched) {
      foundSkills.push(skillObj.name);
    }
  });

  return [...new Set(foundSkills)];
};