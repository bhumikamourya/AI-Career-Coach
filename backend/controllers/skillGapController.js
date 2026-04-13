const User = require("../models/User");
const { getSkillGap } = require("../services/skillGapService");

exports.analyzeSkillGap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await getSkillGap(user.skills, user.targetRole);

    res.json({
      user: {
        name: user.name,
        targetRole: user.targetRole,
        skills: user.skills
      },
      analysis: result
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};