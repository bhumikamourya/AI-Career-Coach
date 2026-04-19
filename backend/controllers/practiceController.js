const Question = require("../models/Question");
const Result = require("../models/Result");
const User = require("../models/User");
const { getSkillGap } = require("../services/skillGapService");
const { generateRoadmap } = require("../services/roadmapService");
const { calculateReadiness } = require("../services/readinessService");
const { getRecommendations } = require("../services/recommendationService");

const { runEngine } = require("../services/engineService");
const Role = require("../models/Role");
const TestSession = require("../models/TestSession");

//  GET QUESTIONS
exports.getQuestions = async (req, res) => {
  try {

    const userId = req.user.id;

    // STEP 1: Check if active session already exists
    let existingSession = await TestSession.findOne({
      userId,
      isCompleted: false
    });

    if (existingSession) {
      // Return same questions (NO RANDOM AGAIN)
      return res.json(existingSession);
    }
    //STEP 2 Fetch user + role
    const user = await User.findById(userId);
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

    await runEngine(user);

    // STEP 3: PHASE CHECK (ONLY SOURCE OF TRUTH)
    if (user.currentPhase !== "TEST" && user.currentPhase !== "INTERVIEW_READY") {
      return res.status(403).json({
        message: "You are not eligible for test yet",
        phase: user.currentPhase
      });
    }


    //STEP 4: Generate questions 
    let questions = [];

    // DYNAMIC QUESTION GENERATION
    for (let skill of role.skills) {
      const count = Math.ceil(skill.weight * 1.5);
      // PRIMARY FILTER → topic + role
      let skillQuestions = await Question.aggregate([
        {
          $match: {
            topic: skill.name,
            roles: user.targetRole
          }
        },
        { $sample: { size: count } } // 2 per skill
      ]);

      //  FALLBACK (ONLY topic)
      if (skillQuestions.length === 0) {
        skillQuestions = await Question.aggregate([
          {
            $match: {
              topic: skill.name
            }
          },
          { $sample: { size: count } }
        ]);
      }
      questions.push(...skillQuestions);
    }

    // LIMIT + SHUFFLE
    questions = questions
      .sort(() => Math.random() - 0.5)
      .slice(0, 25);

    // STEP 5: CREATE SESSION (MOST IMPORTANT)
    const newSession = await TestSession.create({
      userId,
      questions,
      answers: [],
      currentIndex: 0
    });

    res.json(newSession);

  } catch (err) {
    console.error("GET QUESTIONS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.saveAnswer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionId, selected } = req.body;

    // find active session
    const session = await TestSession.findOne({
      userId,
      isCompleted: false
    }).sort({ createdAt: -1 });

    if (!session) {
      return res.status(404).json({ message: "No active session found" });
    }

    // IMPORTANT FIX: correct comparison
    const existing = session.answers.find(
      (a) => a.questionId.toString() === questionId.toString()
    );

    if (existing) {
      existing.selected = selected;
    } else {
      session.answers.push({
        questionId: questionId.toString(),
        selected
      });
    }

    await session.save();

    return res.json({
      message: "Answer saved successfully",
      answersCount: session.answers.length
    });

  } catch (err) {
    console.error("SAVE ANSWER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// SUBMIT ANSWERS
exports.submitAnswers = async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await TestSession.findOne({
      userId,
      isCompleted: false
    }).sort({ createdAt: -1 });

    if (!session) {
      return res.status(400).json({ message: "No active test session" });
    }

    const answers = session.answers || [];

    if (answers.length === 0) {
      return res.status(400).json({
        message: "No answers submitted"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const role = await Role.findOne({ name: user.targetRole });
    if (!role) {
      return res.status(400).json({ message: "Invalid role" });
    }

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

    for (const ans of answers) {
      const q = questionMap[ans.questionId];

      if (!q) continue;
      const isCorrect =
        q.answer.trim().toLowerCase() ===
        ans.selected.trim().toLowerCase();

      const skill = role.skills.find(
        s => s.name.toLowerCase() === q.topic.toLowerCase()
      );

      const weight = skill?.weight || 1;

      totalWeight += weight;

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

    const percentage =
      totalWeight === 0
        ? 0
        : Math.round((scoreWeight / totalWeight) * 100);
    console.log("Percentage:", percentage);


    // RUN ENGINE with testScore
    const engineResult = await runEngine(user, percentage);

    // SMART UPDATE PROGRESS BASED ON WEAK SKILLS
    const weakSet = new Set(engineResult.gap.weakSkills.map(s => s.toLowerCase()));

    user.progress = user.progress.map(p => {
      const isWeak = weakSet.has(p.topic.toLowerCase());

      return {
        ...p._doc,
        theoryDone: p.theoryDone, // keep theory
        practiceDone: isWeak ? false : p.practiceDone // reset only weak practice
      };
    });

    // use engine output only
    const updatedGap = engineResult.gap;
    const updatedRoadmap = engineResult.roadmap;
    const readinessScore = engineResult.readinessScore;


    const recommendations = getRecommendations(engineResult.gap);
    // Save result
    await Result.create({
      userId,
      score: scoreWeight,
      total: totalWeight,
      percentage,
      answers: detailed
    });


    // Mark session completed
    await TestSession.findByIdAndUpdate(session._id, {
      isCompleted: true
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
      updatedRoadmap: engineResult.roadmap?.roadmap || engineResult.roadmap || [],
      readinessScore: engineResult.readinessScore,
      currentPhase: user.currentPhase,
      recommendations,
      attempts: user.attempts || [],

    });

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
