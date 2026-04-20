const syncRoadmapWithProgress = (user, roadmap) => {
    
  const progressMap = new Map(
    (user.progress || []).map(p => [p.topic, p])
  );

  const newTopics = roadmap.map(t => t.topic);

  newTopics.forEach(topic => {
    if (!progressMap.has(topic)) {
      user.progress.push({
        topic,
        theoryDone: false,
        practiceDone: false
      });
    }
  });

  const updatedRoadmap = roadmap.map(item => {
    const p = progressMap.get(item.topic);

    const theoryDone = p?.theoryDone || false;
    const practiceDone = p?.practiceDone || false;

    let status = "NOT_STARTED";

    if (theoryDone && practiceDone) {
      status = "COMPLETED";
    } else if (theoryDone || practiceDone) {
      status = "IN_PROGRESS";
    }

    return {
      ...item,
      status,
      progress: {
        theoryDone,
        practiceDone
      }
    };
  });

  return updatedRoadmap;
};

module.exports = { syncRoadmapWithProgress };