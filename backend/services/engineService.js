const { getSkillGap } = require("./skills/skillGapService");
const { generateRoadmap } = require("./roadmap/roadmapService");
const { calculateReadiness } = require("./readinessService");
const { determinePhase } = require("./phaseService");


const { buildCombinedSkills } = require("./skills/skillAggregationService");
const { syncRoadmapWithProgress } = require("./roadmap/roadmapSyncService");
const { calculateProgressPercent } = require("./progressFiles/progressAnalyticsService");

const { canUnlockInterview } = require("./interviewEligibilityService");

const { generateSkillGapInsight } = require("./skills/skillGapAIService");


exports.runEngine = async (user, testScore = 0) => {
  if (!user) throw new Error("User Not Found");

  if (!user.targetRole) {
    return {
      gap: null,
      roadmap: [],
      readinessScore: 0,
      currentPhase: "PROFILE_SETUP",
    };
  }

  // 1. Skills
  const combinedSkills = buildCombinedSkills(user);

  // 2. Gap
  const gap = await getSkillGap(combinedSkills, user.targetRole);

    // 3. AI Insight (ONLY IF NEEDED)
  let aiInsight = user.aiInsight;

  const shouldRegenerateAI =
    !aiInsight ||
    JSON.stringify(user.skillGap?.weakSkills) !== JSON.stringify(gap.weakSkills) ||
    JSON.stringify(user.skillGap?.missingSkills) !== JSON.stringify(gap.missingSkills);

  if (shouldRegenerateAI) {
    console.log("⚡ Generating AI Insight...");
    aiInsight = await generateSkillGapInsight(gap, user.targetRole);
  }

  // 4. Roadmap
  const roadmapData = await generateRoadmap(
    user.targetRole,
    gap.missingSkills,
    gap.weakSkills
  );

  // 5. Sync roadmap with progress
  const updatedRoadmap = syncRoadmapWithProgress(
    user,
    roadmapData.roadmap || []
  );

  // 6. Progress %
  const progressPercent = calculateProgressPercent(user);

  // 7. Readiness
  const readinessScore = calculateReadiness(user,gap, testScore);

  // 8. Phase (clean now)
  user.currentPhase = determinePhase(user, progressPercent, readinessScore);


    const interviewUnlocked = canUnlockInterview({
  readinessScore,
  gap,
  testScore,
  progressPercent
});
 

  // 9. Save data
  user.skillGap = gap;
  user.roadmap = updatedRoadmap;
  user.readinessScore = readinessScore;
  user.aiInsight = aiInsight;

  await user.save();

  return {
    gap,
    roadmap: updatedRoadmap,
    readinessScore,
    currentPhase: user.currentPhase,
    aiInsight,
    canUnlockInterview: interviewUnlocked
  };
};
