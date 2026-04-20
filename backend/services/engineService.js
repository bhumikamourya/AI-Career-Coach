const { getSkillGap } = require("./skills/skillGapService");
const { generateRoadmap } = require("./roadmap/roadmapService");
const { calculateReadiness } = require("./readinessService");
const { determinePhase } = require("./phaseService");


const { buildCombinedSkills } = require("./skills/skillAggregationService");
const { syncRoadmapWithProgress } = require("./roadmap/roadmapSyncService");
const { calculateProgressPercent } = require("./progressFiles/progressAnalyticsService");

const { canUnlockInterview } = require("./interviewEligibilityService");

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

  // 3. Roadmap
  const roadmapData = await generateRoadmap(
    user.targetRole,
    gap.missingSkills,
    gap.weakSkills
  );

  // 4. Sync roadmap with progress
  const updatedRoadmap = syncRoadmapWithProgress(
    user,
    roadmapData.roadmap || []
  );

  // 5. Progress %
  const progressPercent = calculateProgressPercent(user);

  // 6. Readiness
  const readinessScore = calculateReadiness(user,gap, testScore);

  // 7. Phase (clean now)
  user.currentPhase = determinePhase(user, progressPercent, readinessScore);


    const interviewUnlocked = canUnlockInterview({
  readinessScore,
  gap,
  testScore,
  progressPercent
});
 

  // 8. Save data
  user.skillGap = gap;
  user.roadmap = updatedRoadmap;
  user.readinessScore = readinessScore;

  await user.save();

  return {
    gap,
    roadmap: updatedRoadmap,
    readinessScore,
    currentPhase: user.currentPhase,
    canUnlockInterview: interviewUnlocked
  };
};
