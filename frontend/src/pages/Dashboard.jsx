import { useEffect, useState } from "react";
import { getDashboardData, markProgress } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();

      setData(res.data);
    } catch (err) {
      console.error(" Dashboard fetch error:", err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!data) return <p>No data found</p>;

  const { roadmap, skillGap, readinessScore, progress, aiInsight, currentPhase } = data;


  //  Progress Calculation
  const total = (progress?.length || 0) * 2;

  const completed = (progress || []).reduce((acc, p) => {
    return acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0);
  }, 0);

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  //  Start Practice Check
  const handleStartPractice = () => {
    if (currentPhase !== "TEST" && currentPhase !== "INTERVIEW_READY") {
      alert(`🚫 Locked: Reach at least 70% Progress to unlock test.\nCurrent: ${percent}%`);
      return;
    }
    navigate("/practice");
  };

  const handleInterview = () => {
    if (readinessScore < 70) {
      alert(`🚫 Interview locked. Required: 70% Readiness\nCurrent Readiness: ${readinessScore}%`);
      return;
    }
    navigate("/interview");
  };

  //  Mark Complete
  const markComplete = async (topic, type) => {
    try {
      const res = await markProgress({ topic, type });


      setData(prev => ({
        ...prev,
        progress: res.data.updatedUser.progress,
        roadmap: res.data.roadmap,
        currentPhase: res.data.updatedUser.currentPhase,
      }));
    } catch (err) {
      console.error("Progress update error:", err);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <h2 className="text-3xl font-bold">Career Dashboard</h2>

        {/* CURRENT PHASE */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Current Phase</h3>
          <p className="text-lg font-bold text-indigo-600">
            {currentPhase}
          </p>
        </div>

        {/* PROFILE BUTTON  */}
        <button
          onClick={() => navigate("/profile")}
          className="bg-indigo-500 text-white px-4 py-2 mx-4 rounded-lg"
        >
          Go To Profile
        </button>

        {/* READINESS */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Readiness Score</h3>

          <div className="w-full bg-gray-200 h-4 rounded mt-2">
            <div
              className={`h-4 rounded ${readinessScore >= 70
                ? "bg-green-500"
                : readinessScore >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
                }`}
              style={{ width: `${readinessScore}%` }}
            />
          </div>

          <p className="mt-2 font-bold">{readinessScore}%</p>

          <p className="text-sm mt-1 text-gray-600">
            {readinessScore >= 75
              ? "🚀 Interview Ready"
              : readinessScore >= 50
                ? "⚡ Almost Ready"
                : "⚠ Needs Improvement"}
          </p>
        </div>

        {/* SKILL GAP */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Skill Gap</h3>
          <p>Missing: {skillGap?.missingSkills?.join(", ") || "None"}</p>
          <p>Weak: {skillGap?.weakSkills?.join(", ") || "None"}</p>


          {/* AI INSIGHT */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">AI Mentor</h3>

            {!aiInsight ? (
              <p className="text-red-500">⚠ AI not available</p>
            ) : (
              <>
                <p><strong>📊 Summary:</strong> {aiInsight.summary}</p>
                <p><strong>🎯 Why It Matters:</strong> {aiInsight.whyItMatters}</p>
                <p><strong>🔥 Motivation:</strong> {aiInsight.motivation}</p>

                <div>
                  <strong>Learning Order:</strong>
                  <ul className="list-disc ml-5">
                    {aiInsight.learningOrder?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold mb-2">Progress</p>
          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="mt-2">{percent}% completed</p>
        </div>

        {/* ROADMAP */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Personalized Learning Roadmap</h3>

          {roadmap.map((item, i) => {
            const p = progress.find(x => x.topic === item.topic);

            const isTheoryDone = p?.theoryDone;
            const isPracticeDone = p?.practiceDone;

            return (
              <div key={i} className="border p-3 mb-2 rounded">

                <div className="flex justify-between">
                  <p className="font-semibold">{item.topic}</p>
                  <span className={`text-xs px-2 py-1 rounded 
    ${item.priority === "High" ? "bg-red-200 text-red-800" :
                      item.priority === "Medium" ? "bg-yellow-200 text-yellow-800" :
                        "bg-green-200 text-green-800"}`}>Your Priority: {item.priority}</span>
                </div>

                <p className="text-sm text-gray-500">
                  Level: {item.level}
                </p>

                <p className="text-sm">
                  Status:{" "}
                  {isTheoryDone && isPracticeDone
                    ? "Completed"
                    : isTheoryDone || isPracticeDone
                      ? "In Progress"
                      : "Not Started"}
                </p>

                {/* RESOURCES */}
                <div className="mt-3 space-y-1">
                  {item.resources?.map((res, i) => (
                    <a
                      key={i}
                      href={res.link}
                      target="_blank"
                      className="block text-blue-600 hover:underline text-sm"
                    >
                      📘 {res.title}
                    </a>
                  ))}
                </div>

                <div className="flex gap-2 mt-2">
                  {!isTheoryDone && (
                    <button
                      onClick={() => markComplete(item.topic, "theory")}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Theory Done
                    </button>
                  )}

                  {!isPracticeDone && (
                    <button
                      onClick={() => markComplete(item.topic, "practice")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Practice Done
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            onClick={handleStartPractice}
            className="flex-1 bg-orange-500 text-white py-2 rounded"
          >
            Start Mock Test
          </button>

          <button
            onClick={handleInterview}
            className="flex-1 bg-indigo-600 text-white py-2 rounded"
          >
            AI Interview
          </button>
          <button
            onClick={() => navigate("/practice-history")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            View Test History
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;