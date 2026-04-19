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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!data) return <p>No data found</p>;

  const { roadmap, skillGap, readinessScore, progress } = data;

  //  Progress Calculation
  const total = (progress?.length || 0) * 2;

  const completed = (progress || []).reduce((acc, p) => {
    return acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0);
  }, 0);

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  //  Start Practice Check
  const handleStartPractice = () => {
    if (data.currentPhase !== "TEST" && data.currentPhase !== "INTERVIEW_READY") {
      alert(`Complete learning at least 70%. cycle before taking test. Current: ${percent}%`);
      return;
    }
    navigate("/practice");
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
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <h2 className="text-3xl font-bold">Career Dashboard</h2>

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
          <p className="text-2xl font-bold text-indigo-600">
            {readinessScore}%
          </p>
        </div>

        {/* SKILL GAP */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Skill Gap</h3>
          <p>Missing: {skillGap?.missingSkills?.join(", ") || "None"}</p>
          <p>Weak: {skillGap?.weakSkills?.join(", ") || "None"}</p>
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold mb-2">Progress</p>
          <h3 className="text-lg font-semibold mb-2">Personalized Learning Roadmap</h3>
          <p className="font-semibold mt-3">Overall Progress</p>

          <p className="text-lg font-semibold text-purple-700 mb-3">
            Total Time: {roadmap.totalEstimatedDays} days
          </p>

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
          <h3 className="font-semibold mb-3">Learning Roadmap</h3>

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
            onClick={() => navigate("/interview")}
            className="flex-1 bg-indigo-600 text-white py-2 rounded"
          >
            AI Interview
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;