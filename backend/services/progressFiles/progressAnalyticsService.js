const calculateProgressPercent = (user) => {
  const progress = user.progress || [];

  const total = progress.length * 2;

  const completed = progress.reduce((acc, p) => {
    return acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0);
  }, 0);

  return total === 0 ? 0 : (completed / total) * 100;
};

module.exports = { calculateProgressPercent };