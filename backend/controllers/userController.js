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
    const userId = req.user.id;

    let user = await User.findById(userId).select(
      "roadmap skillGap readinessScore evaluatedSkills progress targetRole currentPhase attempts"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Only run engine if data missing
    if (!user.roadmap || user.roadmap.length === 0) {
      const engineResult = await runEngine(user, 0);

      user.roadmap = engineResult.roadmap;
      user.skillGap = engineResult.gap;
      user.readinessScore = engineResult.readinessScore;

      await user.save();
    }

    res.json({
      roadmap: user.roadmap || [],
      skillGap: user.skillGap || {},
      readinessScore: user.readinessScore || 0,
      evaluatedSkills: user.evaluatedSkills || [],
      progress: user.progress || [],
      currentPhase: user.currentPhase,
      attempts: user.attempts || [],
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// exports.getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const user = await User.findById(userId).select(
//       "roadmap skillGap readinessScore evaluatedSkills progress currentPhase"
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       roadmap: user.roadmap || [],
//       skillGap: user.skillGap || {},
//       readinessScore: user.readinessScore || 0,
//       evaluatedSkills: user.evaluatedSkills || [],
//       progress: user.progress || [],
//       currentPhase: user.currentPhase
//     });

//   } catch (err) {
//     console.error("DASHBOARD ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };