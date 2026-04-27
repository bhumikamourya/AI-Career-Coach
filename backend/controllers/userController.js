const userService = require("../services/userService");
const User = require("../models/User");
const { runEngine } = require("../services/engineService");


// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json({user});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUserProfile(
      req.user.id,
      req.body
    );
//     console.log(" PROFILE UPDATE INPUT:", req.body);
// console.log(" BEFORE ENGINE USER:", user);

    const result = await runEngine(user);

    res.json({
      user,
      ...result
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SKILL
exports.deleteSkill = async (req, res) => {
  try {

    const user = await userService.deleteUserSkill(
      req.user.id,
      req.params.name
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email roadmap skillGap readinessScore evaluatedSkills progress currentPhase attempts, aiInsight"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
       user: {
        name: user.name,
        email: user.email
      },
      roadmap: user.roadmap || [],
      skillGap: user.skillGap || {},
      readinessScore: user.readinessScore || 0,
      evaluatedSkills: user.evaluatedSkills || [],
      progress: user.progress || [],
      currentPhase: user.currentPhase,
      attempts: user.attempts || [],
      aiInsight: user.aiInsight || null 
        });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};