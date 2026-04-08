const roadmapData = require("../utils/roadmapData");

exports.generateRoadmap = (targetRole, missingSkills, weakSkills = []) => {
  const baseRoadmap = roadmapData[targetRole] || [];

  let totalEstimatedDays = 0;

  const roadmap = baseRoadmap.map((item) => {
    let status = "Revise";
    let priority = "Low";

    let estimatedDays = item.estimatedDays || 2;

    let remainingDays = estimatedDays;

    if (missingSkills.includes(item.topic)) {
      status = "Start Learning";
      priority = "High";
      estimatedDays += 2;
    } else if (weakSkills.includes(item.topic)) {
      status = "Improve";
      priority = "Medium";
      estimatedDays += 1;
    }

    totalEstimatedDays += estimatedDays;

    return {
      ...item,
      status,
      priority,
      estimatedDays,
      remainingDays: estimatedDays,
      resources: [
        {
          title: `${item.topic} Tutorial`,
          link: "https://www.youtube.com/results?search_query=" + item.topic
        },
        {
          title: `${item.topic} Practice`,
          link: "https://www.google.com/search?q=" + item.topic + "+practice"
        }
      ]
    };
  });

  return {
    totalEstimatedDays,
    roadmap
  };
};