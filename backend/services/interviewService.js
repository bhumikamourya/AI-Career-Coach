exports.evaluateAnswer = (question, answer) => {
  if (!answer) return { score: 0, feedback: "No answer provided" };

  let score = 0;
  let feedback = [];

  // basic evaluation
  if (answer.length > 20) score += 30;
  else feedback.push("Answer too short");

  if (answer.toLowerCase().includes("example")) score += 20;
  else feedback.push("Try giving examples");

  if (answer.split(" ").length > 30) score += 30;
  else feedback.push("Answer lacks depth");

  // clarity check
  if (answer.includes(".") || answer.includes(",")) score += 20;
  else feedback.push("Improve structure");

  return {
    score,
    feedback: feedback.length ? feedback : ["Good answer"]
  };
};