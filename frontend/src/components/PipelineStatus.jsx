const PipelineStatus = ({ stage }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">AI Career Pipeline</h3>

      <p>Status: {stage}</p>

      {stage === "analyzing" && <p>🔍 Analyzing skills...</p>}
      {stage === "roadmap_generating" && <p>🧠 Generating roadmap...</p>}
      {stage === "ready" && <p>✅ Ready</p>}
    </div>
  );
};

export default PipelineStatus;