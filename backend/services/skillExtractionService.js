const skillDictionary = require("../utils/skillDictionary");

exports.extractSkills = (text) => {
  const lowerText = text.toLowerCase();

  const foundSkills = skillDictionary.filter(skill =>
    lowerText.includes(skill)
  );

  return [...new Set(foundSkills.map(s => s.toLowerCase()))];
};