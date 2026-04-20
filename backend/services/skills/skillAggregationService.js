const buildCombinedSkills = (user) => {
  const skillMap = new Map();

  (user.skills || []).forEach(s => {
    if (s?.name) {
      skillMap.set(s.name.toLowerCase(), s);
    }
  });

  (user.evaluatedSkills || []).forEach(s => {
    if (s?.name) {
      skillMap.set(s.name.toLowerCase(), s);
    }
  });

  return Array.from(skillMap.values());
};

module.exports = { buildCombinedSkills };