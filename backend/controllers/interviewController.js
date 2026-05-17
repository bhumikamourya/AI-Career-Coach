const Role = require("../models/Role");
const User = require("../models/User");
const { runEngine } = require("../services/engineService");
const InterviewSession = require("../models/InterviewSession");
const { generateQuestions, evaluateAnswers } = require("../services/interviewAI");

// START INTERVIEW
exports.startInterview = async (req, res) => {
  try {
    const userRole = req.body.role;

    const existingSession = await InterviewSession.findOne({
      userId: req.user.id,
      role: userRole,
      status: "active"
    });

    if (existingSession) {
      return res.json({
        sessionId: existingSession._id,
        sessionNumber: existingSession.sessionNumber,
        questions: existingSession.questions
      });
    }

    const lastSession = await InterviewSession.findOne({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    let nextSessionNumber = 1;

    if (lastSession?.sessionNumber) {
      nextSessionNumber = lastSession.sessionNumber + 1;
    }

    const roleData = await Role.findOne({
      name: { $regex: new RegExp(`^${userRole}$`, "i") }
    });

    if (!roleData) {
      return res.status(404).json({ error: "Role not found" });
    }

    const skills = roleData.skills.map((s) => s.name);

const user = await User.findById(
  req.user.id
);

const questions =
  await generateQuestions(
    userRole,
    skills,
    user.readinessScore
  );
    const session = await InterviewSession.create({
      userId: req.user.id,
      role: userRole,
      sessionNumber: nextSessionNumber,
      questions,
      status: "active"
    });

    res.json({
      sessionId: session._id,
      sessionNumber: session.sessionNumber,
      questions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SUBMIT ANSWERS
exports.submitInterviewAnswers = async (req, res) => {
  try {
    const { sessionId, answers } = req.body;

    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

 session.answers = answers;
session.status = "processing";

await session.save();

    const qaList = session.questions.map((q, i) => ({
      question: q,
      answer: answers[i] || ""
    }));

   const result = await evaluateAnswers(qaList);

// FETCH USER
const user = await User.findById(req.user.id);

if (!user) {
  return res.status(404).json({
    error: "User not found"
  });
}

// SAVE INTERVIEW SCORE
user.interviewScore =
  result.interviewScore || 0;

await user.save();

// RUN ENGINE AGAIN
const engineResult =
  await runEngine(user);

// READY STATUS
const readinessStatus =
  engineResult.readinessScore >= 70
    ? "READY"
    : "NOT_READY";

// SAVE SESSION DATA
session.feedback =
  result.feedback || [];

session.interviewScore =
  result.interviewScore || 0;

session.readinessScore =
  engineResult.readinessScore || 0;

session.readinessStatus =
  readinessStatus;

session.status = "completed";

await session.save();

// RESPONSE
res.json({
  message:
    "Interview evaluated successfully",

  sessionId,

  interviewScore:
    result.interviewScore,

  readinessScore:
    engineResult.readinessScore,

  readinessStatus
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RESULT
exports.getInterviewResult = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ error: "Not found" });
    }

  const statusText =
  session.status === "completed"
    ? "Completed"
    : session.status === "processing"
    ? "Evaluating"
    : "Pending";

   res.json({
  sessionId: session._id,

  sessionNumber:
    session.sessionNumber,

  role: session.role,

  status: session.status,

  statusText,

  feedback: session.feedback,

  totalQuestions:
    session.questions.length,

  attempted:
    (session.answers || [])
      .filter(a => a?.trim()).length,

  interviewScore:
    session.interviewScore,

  readinessScore:
    session.readinessScore,

  readinessStatus:
    session.readinessStatus
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// HISTORY
exports.getInterviewHistory = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(
      sessions.map((s) => ({
        sessionId: s._id,
        sessionNumber: s.sessionNumber,
        role: s.role,
        status: s.status,
        totalQuestions: s.questions.length,
        attempted: (s.answers || []).filter(a => a?.trim()).length,
        feedback: s.feedback
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};