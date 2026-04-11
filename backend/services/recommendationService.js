exports.getRecommendations = (gap) => {
  const recommendations = [];

  if (gap.missingSkills.length > 0) {
    recommendations.push("Start learning: " + gap.missingSkills.join(", "));
  }

  if (gap.weakSkills.length > 0) {
    recommendations.push("Improve: " + gap.weakSkills.join(", "));
  }

  if (gap.missingSkills.length === 0 && gap.weakSkills.length === 0) {
    recommendations.push("You are strong in required skills. Focus on practice tests.");
  }

  return recommendations;
};