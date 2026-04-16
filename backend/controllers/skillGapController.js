const User = require("../models/User");
const { getSkillGap } = require("../services/skillGapService");

exports.analyzeSkillGap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const analysis = await getSkillGap(user.skills, user.targetRole,user.roleSkills);

    return res.json({
      user: {
        name: user.name,
        targetRole: user.targetRole,
        skills: user.skills
      },
      analysis
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};