const canUnlockInterview = ({
  readinessScore,
  gap,
  testScore,
  progressPercent
}) => {

  return (
    readinessScore >= 70 &&
    (gap?.weakSkills?.length || 0) <= 2 &&
    testScore >= 60 &&
    progressPercent >= 70
  );
};

module.exports = { canUnlockInterview };