const Role = require("../../models/Role");

exports.generateRoadmap = async (targetRole, missingSkills = [], weakSkills = []) => {
  const role = await Role.findOne({
    name: new RegExp(`^${targetRole}$`, "i")
  });

  if (!role || !Array.isArray(role.skills)) {
    throw new Error(`Role not found or invalid skills for: ${targetRole}`);
  }

  const missingSet = new Set((missingSkills || []).map(s => s.toLowerCase()));
  const weakSet = new Set((weakSkills || []).map(s => s.toLowerCase()));

  const roadmap = role.skills.map((skill) => {
    const skillName = skill.name.toLowerCase();

    let status = "Revise";
    let priority = "Low";

    if (missingSet.has(skillName)) {
      status = "Start Learning";
      priority = "High";
    } else if (weakSet.has(skillName)) {
      status = "Improve";
      priority = "Medium";
    }

    return {
      topic: skill.name,
      level: skill.level,
      status,
      priority,
      resources: [
        {
          title: `${skill.name} Tutorial`,
          link: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill.name)}`
        }
      ]
    };
  });

  return {
    roadmap
    };
};