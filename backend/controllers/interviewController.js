const TestSession = require("../models/TestSession");
const aiService = require("../services/ai.Service");
const mongoose = require("mongoose");
const Role = require("../models/Role");

// 🧠 In-memory cache
const interviewCache = new Map();

// 🧹 Auto clear cache every 10 min
setInterval(() => {
  console.log("🧹 Clearing interview cache...");
  interviewCache.clear();
}, 10 * 60 * 1000);

// ======================
// 🧠 BUILD PROMPT
// ======================
const buildPrompt = (role, skills) => {
  return `
You are an expert interviewer.

Generate 12 interview questions for:

Role: ${role}

Skills: ${skills.join(", ")}

Rules:
- 70% theory
- 30% coding/output based
- Real interview level
- Coding must include input/output
- Mix difficulty

Return ONLY JSON:

[
  {
    "type": "theory",
    "question": "Explain closures in JavaScript"
  },
  {
    "type": "coding",
    "question": "Reverse a string",
    "input": "hello",
    "output": "olleh"
  }
]
`;
};

// ======================
// 🔑 CACHE KEY
// ======================
const getCacheKey = (role, skills) => {
  return role.toLowerCase() + "_" + skills.join("_").toLowerCase();
};

// ======================
// 🚀 START INTERVIEW
// ======================
exports.startInterview = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    // 🔥 role fetch (case insensitive)
    const roleData = await Role.findOne({
      name: new RegExp(`^${role}$`, "i")
    });

    if (!roleData) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const skills = roleData.skills.map(s => s.name);

    const cacheKey = getCacheKey(role, skills);

    // 🔥 FORCE REFRESH FLAG
    const forceNew = req.query.refresh === "true";

    let questions;

    // ======================
    // 🧠 CACHE CHECK
    // ======================
    if (!forceNew && interviewCache.has(cacheKey)) {
      console.log("⚡ Using cached questions");
      questions = interviewCache.get(cacheKey);
    } else {
      console.log("🤖 Generating new questions");

      const apiKey = aiService.getRandomKey();
      const prompt = buildPrompt(role, skills);

      const response = await aiService.askAI(prompt, apiKey);

      let parsed;
      try {
        parsed = JSON.parse(
          response.replace(/```json|```/g, "").trim()
        );
      } catch (err) {
        console.error("JSON parse error:", err);
        parsed = [];
      }

      questions = Array.isArray(parsed)
        ? parsed.slice(0, 12)
        : [];

      // save in cache
      interviewCache.set(cacheKey, questions);
    }

    // ======================
    // 💾 SAVE SESSION
    // ======================
    const session = await TestSession.create({
      userId: new mongoose.Types.ObjectId(),
      aiQuestions: questions,
      aiAnswers: []
    });

    res.json({
      sessionId: session._id,
      questions
    });

  } catch (err) {
    console.error("START ERROR:", err.message);
    res.status(500).json({ error: "Failed to start interview" });
  }
};

// ======================
// ✍️ SUBMIT ANSWERS
// ======================
exports.submitInterviewAnswers = async (req, res) => {
  try {
    const { sessionId, answers } = req.body;

    const session = await TestSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.aiAnswers = answers;
    await session.save();

    res.json({ message: "Answers saved successfully" });

  } catch (err) {
    console.error("SUBMIT ERROR:", err.message);
    res.status(500).json({ error: "Failed to save answers" });
  }
};

// ======================
// 🤖 EVALUATE
// ======================
exports.evaluateInterview = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await TestSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (!session.aiAnswers || session.aiAnswers.length === 0) {
      return res.status(400).json({ error: "No answers submitted" });
    }

    const qaList = session.aiQuestions.map((q, i) => ({
      question: typeof q === "string" ? q : q.question,
      answer: session.aiAnswers[i] || ""
    }));

    const feedback = await aiService.evaluateAnswers(qaList);

    const isReady = !feedback.toLowerCase().includes("not ready");

    res.json({
      isReady,
      feedback,
      message: isReady
        ? "🎉 You are ready for real interviews!"
        : "⚠️ You are not ready yet. Practice more."
    });

  } catch (err) {
    console.error("EVALUATION ERROR:", err.message);
    res.status(500).json({ error: "Evaluation failed" });
  }
};