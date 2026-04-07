const Question = require("../models/Question");
const Result = require("../models/Result");
const User = require("../models/User");

//  GET QUESTIONS
exports.getQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const role = user.targetRole; 

    if (!role) {
      return res.status(400).json({ message: "Set target role first" });
    }

    const questions = await Question.aggregate([
      { $match: { roles: role } },
      { $sample: { size: 20 } }
    ]);

    res.json(questions);

  } catch (err) {
    console.error("GET QUESTIONS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// SUBMIT ANSWERS
exports.submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({ message: "No answers submitted" });
    }

    const user = await User.findById(req.user.id);

    let correct = 0;
    let wrong = 0;
    const detailed = [];
    const topicStats = {};

    for (let ans of answers) {
      const q = await Question.findById(ans.questionId);

      if (!q || !ans.selected) continue;

      const isCorrect =
        q.answer.trim().toLowerCase() ===
        ans.selected.trim().toLowerCase();

      if (isCorrect) correct++;
      else wrong++;

      // Topic tracking
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { correct: 0, total: 0 };
      }

      topicStats[q.topic].total++;
      if (isCorrect) topicStats[q.topic].correct++;

      detailed.push({
        question: q.question,
        selected: ans.selected,
        correct: q.answer,
        isCorrect,
        topic: q.topic
      });
    }

    // 🔥 AUTO SKILL UPDATE
    Object.entries(topicStats).forEach(([topic, data]) => {
      const accuracy = data.correct / data.total;

      const skill = user.skills.find(
        (s) => s.name.toLowerCase() === topic.toLowerCase()
      );

      if (skill) {
        if (accuracy < 0.4) {
          skill.level = "Beginner";
        } else if (accuracy < 0.7) {
          skill.level = "Intermediate";
        } else {
          skill.level = "Advanced";
        }
      }
    });

    await user.save();

    const percentage = ((correct / answers.length) * 100).toFixed(0);

    // Save result
    await Result.create({
      userId: user._id,
      score: correct,
      total: answers.length,
      answers: detailed
    });

    // FINAL RESPONSE
    res.json({
      score: correct,
      total: answers.length,
      correct,
      wrong,
      percentage,
      topicStats,
      answers: detailed
    });

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};