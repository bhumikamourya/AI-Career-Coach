const { getSkillGap } = require("./skillGapService");
const { generateRoadmap } = require("./roadmapService");
const { calculateReadiness } = require("./readinessService");

exports.runEngine = async (user, testScore = 0) => {
  if (!user) throw new Error("User Not Found");

  if (!user.targetRole) {
    return {
      gap: null,
      roadmap: [],
      totalEstimatedDays: 0,
      readinessScore: 0
    };
  }

  const skillMap = new Map();

  // manual skills
  (user.skills || []).forEach(s => {
    if (s?.name) {
      skillMap.set(s.name.toLowerCase(), s);
    }
  });

  // evaluated skills (override)
  (user.evaluatedSkills || []).forEach(s => {
    if (s?.name) {
      skillMap.set(s.name.toLowerCase(), s);
    }
  });

  const combinedSkills = Array.from(skillMap.values());

  const gap = await getSkillGap(combinedSkills, user.targetRole);

  const roadmapData = await generateRoadmap(
    user.targetRole,
    gap.missingSkills,
    gap.weakSkills
  );


  //   const aiPrompt = `
  // You are a career mentor.

  // Role: ${user.targetRole}
  // Missing Skills: ${gap.missingSkills.join(", ")}

  // Give short motivation + learning strategy.
  // `;

  // let aiInsight = user.aiInsight || "";

  //   try {
  //     aiInsight = await askAI(aiPrompt);
  //   } catch (err) {
  //     console.error("AI FAILED:", err.message);
  //     aiInsight = "AI insight not available right now.";
  //   }

  const roadmap = roadmapData?.roadmap || [];

  const newTopics = roadmap.map(t => t.topic);

  // create map for fast lookup
  const progressMap = new Map(
    (user.progress || []).map(p => [p.topic, p])
  );

  // add missing topics (without deleting old progress)
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
    const p = user.progress.find(x => x.topic === item.topic);

    let remaining = item.estimatedDays || 0;

    if (p?.theoryDone) remaining -= 0.5;
    if (p?.practiceDone) remaining -= 0.5;

    return {
      ...item,
      remainingDays: Math.max(0, remaining)
    };
  });

  const readinessScore = calculateReadiness(user, testScore);

// PHASE MANAGEMENT
const total = (user.progress || []).length * 2;

const completed = (user.progress || []).reduce((acc, p) => {
  return acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0);
}, 0);

const progressPercent = total === 0 ? 0 : (completed / total) * 100;

// FINAL CLEAN FLOW
if (!user.isProfileComplete) {
  user.currentPhase = "PROFILE_SETUP";
} 
else if (progressPercent < 70) {
  user.currentPhase = "PRACTICE";
} 
else if (readinessScore < 70) {
  user.currentPhase = "TEST";
} 
else {
  user.currentPhase = "INTERVIEW_READY";
}

  user.skillGap = gap;
  user.roadmap = updatedRoadmap;
  user.readinessScore = readinessScore;

  await user.save();

  return {
    gap,
    roadmap: updatedRoadmap,
    totalEstimatedDays: roadmapData.totalEstimatedDays,
    readinessScore
  };
};
