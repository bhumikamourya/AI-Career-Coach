const User = require("../models/User");
const { runEngine } = require("../services/engineService");

exports.getRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Run engine (single source of truth)
    const result = await runEngine(user, 0); // no test happening her, so we don't change readiness artificially

    const roadmap = result.roadmap;
    const newTopics = roadmap.roadmap.map((item) => item.topic);

    // Progress initialization
    const isDifferent =
      !user.progress ||
      user.progress.length !== newTopics.length ||
      user.progress.some((p) => !newTopics.includes(p.topic));

    if (isDifferent) {
      user.progress = newTopics.map((topic) => ({
        topic,
        theoryDone: false,
        practiceDone: false
      }));
      await user.save();
    }


     // Remaining days calculation
    roadmap.roadmap = roadmap.roadmap.map((item) => {
      const progress = user.progress?.find(
        (p) => p.topic === item.topic
      );

      let remainingDays = item.estimatedDays;

      if (progress?.theoryDone) remainingDays -= 0.5;
      if (progress?.practiceDone) remainingDays -= 0.5;

      if (remainingDays < 0) remainingDays = 0;

      return {
        ...item,
        remainingDays
      };
    });
    res.json(roadmap);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};