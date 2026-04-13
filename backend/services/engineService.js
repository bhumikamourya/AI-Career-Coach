const { getSkillGap } = require("./skillGapService");
const { generateRoadmap } = require("./roadmapService");
const { calculateReadiness } = require("./readinessService");
// const { askAI } = require("./geminiService");

exports.runEngine = async (user, testScore = 0) => {
  //  Merge skills (manual + evaluated)
  const skillMap = new Map();

  user.skills.forEach((s) => {
    skillMap.set(s.name.toLowerCase(), s);
  });

  user.evaluatedSkills.forEach((s) => {
    skillMap.set(s.name.toLowerCase(), s);
  });

  const combinedSkills = Array.from(skillMap.values());

  //  Skill Gap
  const gap = await getSkillGap(combinedSkills, user.targetRole);

  //  Roadmap
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


  //  Readiness
  const readinessScore = calculateReadiness(user, testScore);


  const roadmap = roadmapData.roadmap || [];

  // create progress if not exists
  const newTopics = roadmap.map(t => t.topic);

  if (!user.progress || user.progress.length !== newTopics.length) {
    user.progress = newTopics.map(topic => ({
      topic,
      theoryDone: false,
      practiceDone: false
    }));
  }

  // update remainingDays
  const updatedRoadmap = roadmap.map(item => {
    const progress = user.progress.find(p => p.topic === item.topic);

    let remainingDays = item.estimatedDays || 0;

    if (progress?.theoryDone) remainingDays -= 0.5;
    if (progress?.practiceDone) remainingDays -= 0.5;

    return {
      ...item,
      remainingDays: Math.max(0, remainingDays)
    };
  });

  //  Save everything
  user.readinessScore = readinessScore;
  user.roadmap = updatedRoadmap;
  // user.aiInsight = aiInsight;
  user.skillGap = gap;


  await user.save();

  return {
    gap,
    roadmap: updatedRoadmap,
    totalEstimatedDays: roadmapData.totalEstimatedDays,
    // aiInsight,
    readinessScore
  };
};