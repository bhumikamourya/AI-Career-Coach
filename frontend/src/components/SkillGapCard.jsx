const SkillGapCard = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Skill Gap</h3>

      <p><b>Missing:</b> {analysis.missingSkills.join(", ") || "None"}</p>
      <p><b>Weak:</b> {analysis.weakSkills.join(", ") || "None"}</p>
      <p><b>Strong:</b> {analysis.matchedSkills.join(", ") || "None"}</p>
    </div>
  );
};

export default SkillGapCard;