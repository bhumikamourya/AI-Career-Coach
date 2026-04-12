const { getSkillGap } = require("./skillGapService");
const { generateRoadmap } = require("./roadmapService");
const { calculateReadiness } = require("./readinessService");

exports.runEngine = async (user, testScore = 0) => {
  //  Merge skills (manual + evaluated)
  const skillMap = new Map();

  user.skills.forEach((s) => {
    skillMap.set(s.name.toLowerCase(), s);
  });

  user.evaluatedSkills.forEach((s) => {
    skillMap.set(s.name.toLowerCase(), s);
  });

  const combinedSkills = Array.from(skillMap.values());

  //  Skill Gap
  const gap = await getSkillGap(combinedSkills, user.targetRole);

  //  Roadmap
  const roadmapData = generateRoadmap(
    user.targetRole,
    gap.missingSkills,
    gap.weakSkills
  );

  //  Readiness
  const readinessScore = calculateReadiness(user, testScore);

  //  Save everything
  user.readinessScore = readinessScore;
  user.roadmap = roadmapData.roadmap;

  await user.save();

  return {
    gap,
    roadmap: roadmapData,
    readinessScore
  };
};