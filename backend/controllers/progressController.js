const User = require("../models/User");
const { updateUserProgress } = require("../services/progressFiles/progressService");
const { runEngine } = require("../services/engineService");
exports.updateProgress = async (req, res) => {
  try {

    // console.log("BODY RECEIVED:", req.body);
    // console.log("HEADERS:", req.headers["content-type"]);
    const { topic, type } = req.body;

    // VALIDATION
    if (!topic || !type) {
      return res.status(400).json({ message: "Topic and type are required" });
    }

    if (!["theory", "practice"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

     const { user, updated } = await updateUserProgress(
      req.user.id,
      topic,
      type
    );

    if (!updated) {
      return res.status(200).json({ message: "Already completed" });
    }

    const result = await runEngine(user);

    res.json({
      message: "Progress updated",
      updatedUser: user,
      roadmap: result.roadmap,
      gap: result.gap,
       currentPhase: user.currentPhase 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};