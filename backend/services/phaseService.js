const determinePhase = (user, progressPercent, readinessScore) => {
  
  if (!user) throw new Error("User required");

  if (!user.isProfileComplete) {
    return "PROFILE_SETUP";
  }

  if (progressPercent < 70) {
    return "PRACTICE";
  }

  if (readinessScore < 70) {
    return "TEST";
  }

  return "INTERVIEW_READY";
};

module.exports = { determinePhase };