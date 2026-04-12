const Question = require("../models/Question");
const Result = require("../models/Result");
const User = require("../models/User");
const { getSkillGap } = require("../services/skillGapService");
// const { generateRoadmap } = require("../services/roadmapService");
// const { calculateReadiness } = require("../services/readinessService");
const { getRecommendations } = require("../services/recommendationService");

const { runEngine } = require("../services/engineService");
const Role = require("../models/Role");

//  GET QUESTIONS
exports.getQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.targetRole) {
      return res.status(400).json({ message: "Set target role first" });
    }

    const role = await Role.findOne({ name: user.targetRole });

    if (!role) {
      return res.status(400).json({ message: "Role not configured" });
    }

    // CHECK PROGRESS
    const total = user.progress.length;

    const completed = user.progress.filter((p) => p.theoryDone && p.practiceDone).length;
    const percentage = total === 0 ? 0 : (completed / total) * 100;

    if (percentage < 70) {
      return res.status(403).json({
        message: "Complete at least 70% of roadmap before taking test",
        progress: percentage.toFixed(0)
      });
    }

    let questions = [];

    // DYNAMIC QUESTION GENERATION
    for (let skill of role.skills) {
      const count = skill.weight >= 4 ? 4 : 2; // dynamic
      const skillQuestions = await Question.aggregate([
        {
          $match: {
            topic: skill.name,
            roles: user.targetRole
          }
        },
        { $sample: { size: count } } // 2 per skill
      ]);

      questions.push(...skillQuestions);
    }

    // LIMIT TOTAL QUESTIONS
    questions = questions.slice(0, 25);

    // SHUFFLE
    questions.sort(() => Math.random() - 0.5);

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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fetch role once
    const role = await Role.findOne({ name: user.targetRole });
    if (!role) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // get all question ids
    const questionIds = answers.map(a => a.questionId);

    // fetch all questions at once
    const questions = await Question.find({ _id: { $in: questionIds } });

    // create map
    const questionMap = {};
    questions.forEach(q => {
      questionMap[q._id.toString()] = q;
    });

    let correct = 0;
    let wrong = 0;
    let totalWeight = 0;
    let scoreWeight = 0;

    const detailed = [];
    const topicStats = {};

    for (let ans of answers) {
      const q = questionMap[ans.questionId];

      if (!q || !ans.selected) continue;

      const skill = role.skills.find(
        s => s.name.toLowerCase() === q.topic.toLowerCase()
      );

      const weight = skill?.weight || 1;

      totalWeight += weight;

      const isCorrect =
        q.answer.trim().toLowerCase() ===
        ans.selected.trim().toLowerCase();

      if (isCorrect) {
        correct++;
        scoreWeight += weight;
      } else {
        wrong++;
      }

      // topic tracking (keep your existing logic)
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

    Object.entries(topicStats).forEach(([topic, data]) => {
      const accuracy = data.correct / data.total;

      let level = "Beginner";
      if (accuracy >= 0.7) level = "Advanced";
      else if (accuracy >= 0.4) level = "Intermediate";

      const existing = user.evaluatedSkills.find(
        (s) => s.name.toLowerCase() === topic.toLowerCase()
      );

      if (existing) {
        // update existing skill
        existing.level = level;
        existing.accuracy = accuracy; // optional upgrade
      } else {
        // add new evaluated skill
        user.evaluatedSkills.push({
          name: topic,
          level,
          accuracy
        });
      }
    });

    await user.save();

    const percentage = Math.round((scoreWeight / totalWeight) * 100); console.log("Percentage:", percentage);

    const engineResult = await runEngine(user, percentage);

    // use engine output only
    const updatedGap = engineResult.gap;
    const updatedRoadmap = engineResult.roadmap;
    const readinessScore = engineResult.readinessScore;

    const recommendations = getRecommendations(engineResult.gap);
    // Save result
    await Result.create({
      userId: user._id,
      score: scoreWeight,
      total: totalWeight,
      percentage,
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
      answers: detailed,
      evaluatedSkills: user.evaluatedSkills,
      updatedGap: engineResult.gap,
      updatedRoadmap: engineResult.roadmap,
      readinessScore: engineResult.readinessScore,
      recommendations
    });

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};