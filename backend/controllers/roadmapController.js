const User = require("../models/User");
const { getSkillGap } = require("../services/skillGapService");
const { generateRoadmap } = require("../services/roadmapService");

exports.getRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const gap = getSkillGap(user.skills, user.targetRole);

    const roadmap = generateRoadmap(
      user.targetRole,
      gap.missingSkills,
      gap.weakSkills
    );

    res.json(roadmap);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};