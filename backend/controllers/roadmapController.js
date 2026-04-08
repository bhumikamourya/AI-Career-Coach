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


    const newTopics = roadmap.roadmap.map((item) => item.topic);

    // check if topics changed
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