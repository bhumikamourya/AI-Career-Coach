const User = require("../models/User");

exports.updateProgress = async (req, res) => {
  try {
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

    if (!user.progress || user.progress.length === 0) {
      return res.status(400).json({ message: "Progress not initialized" });
    }

    //FIND TOPIC
    const item = user.progress.find((p) => p.topic === topic);

    if (!item) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // UPDATE
    let updated = false;

    if (type === "theory" && !item.theoryDone) {
      item.theoryDone = true;
      updated = true;
    }

    if (type === "practice" && !item.practiceDone) {
      item.practiceDone = true;
      updated = true;
    }

    if (!updated) {
      return res.status(200).json({ message: "Already completed" });
    }

    await user.save();
//response
    res.json({
      message: "Progress updated",
      topic,
      type
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};