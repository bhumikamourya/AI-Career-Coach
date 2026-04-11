exports.calculateReadiness = (user, testScore = 0) => {
  const total = (user.progress?.length || 0) * 2;

  const completed = user.progress?.reduce((acc, p) => {
    return acc +
      (p.theoryDone ? 1 : 0) +
      (p.practiceDone ? 1 : 0);
  }, 0);

  const roadmapCompletion = total === 0 ? 0 : completed / total;

  // mock test score normalized (0–1)
  const testPerformance = testScore / 100;

  // interview placeholder (we add later)
  const interviewScore = 0.5;

  const readiness =
    (roadmapCompletion * 0.4) +
    (testPerformance * 0.4) +
    (interviewScore * 0.2);

  return Math.round(readiness * 100);
};