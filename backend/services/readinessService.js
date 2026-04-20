exports.calculateReadiness = (user, gap, testScore = 0) => {

  // 1. Skill Strength Score
  const totalSkills = gap?.requiredSkills?.length || 1;

  const strong = gap?.matchedSkills?.length || 0;
  const weak = gap?.weakSkills?.length || 0;

  const skillStrengthScore =
    ((strong * 1 + weak * 0.5) / totalSkills) * 100;

  // 2. Progress Score
  const total = (user.progress?.length || 0) * 2;

  const completed = (user.progress || []).reduce((acc, p) => {
    return acc +
      (p.theoryDone ? 1 : 0) +
      (p.practiceDone ? 1 : 0);
  }, 0);

  const progressScore = total === 0 ? 0 : (completed / total) * 100;

  // 3. Test Score
  const testPerformance = testScore || 0;

  // 4. Consistency Score
  const attempts = user.attempts || [];

  const consistencyScore =
    attempts.length >= 3
      ? attempts.slice(-3).reduce((a, b) => a + (b.percentage || 0), 0) / 3
      : 50;

  // 5. Interview Score
  const interviewScore = user.interviewScore || 0;

  // FINAL
  const readiness =
    (skillStrengthScore * 0.35) +
    (progressScore * 0.25) +
    (testPerformance * 0.25) +
    (consistencyScore * 0.1) +
    (interviewScore * 0.05);

  return Math.round(readiness);
};