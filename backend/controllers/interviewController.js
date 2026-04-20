const { evaluateAnswer } = require("../services/interviewService");

exports.evaluate = async (req, res) => {
  const { question, answer } = req.body;

  const result = evaluateAnswer(question, answer);

  res.json(result);
};
