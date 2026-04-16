const User = require("../models/User");

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

    // USER
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   user.progress = user.progress || [];

    //FIND TOPIC
    let item = user.progress.find((p) => p.topic === topic);

    // AUTO CREATE IF NOT EXISTS (IMPORTANT FIX)
    if (!item) {
      item = {
        topic,
        theoryDone: false,
        practiceDone: false
      };
      user.progress.push(item);
    }

    // UPDATE
    let updated = false;

    if (type === "theory") {
      if (!item.theoryDone) {
        item.theoryDone = true;
        updated = true;
      }
    }

    if (type === "practice") {
      if (!item.practiceDone) {
        item.practiceDone = true;
        updated = true;
      }
    }

    if (!updated) {
      return res.status(200).json({ message: "Already completed" });
    }

    await user.save();

    const { runEngine } = require("../services/engineService");
    const result = await runEngine(user);

    res.json({
      message: "Progress updated",
      updatedUser: user,
      roadmap: result.roadmap,
      gap: result.gap,
      totalEstimatedDays: result.totalEstimatedDays
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};