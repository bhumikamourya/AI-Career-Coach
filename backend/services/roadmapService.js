const roadmapData = require("../utils/roadmapData");

exports.generateRoadmap = (targetRole, missingSkills) => {
  const roadmap = roadmapData[targetRole] || [];

  // prioritize missing skills
  const personalized = roadmap.map(item => ({
    ...item,
    status: missingSkills.includes(item.topic)
      ? "Start Learning"
      : "Revise"
  }));

  return personalized;
};