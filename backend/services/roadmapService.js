const roadmapData = require("../utils/roadmapData");

exports.generateRoadmap = (targetRole, missingSkills, weakSkills = []) => {
  const roadmap = roadmapData[targetRole] || [];

  let totalDays = 0;

  const enhancedRoadmap = roadmap.map((item) => {
    let status = "Revise";
    let priority = "Low";
    let days = item.days || 2;

    if (missingSkills.includes(item.topic)) {
      status = "Start Learning";
      priority = "High";
      days += 2;
    } else if (weakSkills.includes(item.topic)) {
      status = "Improve";
      priority = "Medium";
      days += 1;
    }

    totalDays += days;

    return {
      ...item,
      priority,
      status,
      days
    };
  });

  return {
    totalEstimatedDays: totalDays,
    roadmap: enhancedRoadmap
  };
};