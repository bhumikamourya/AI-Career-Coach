import { useEffect, useState } from "react";
import { getProfile, updateProfile, getSkillGap, getRoadmap } from "../services/api";
import { useNavigate } from "react-router-dom";
import { markProgress } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    targetRole: "",
    skills: ""
  });

  const [analysis, setAnalysis] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  const [loadingGap, setLoadingGap] = useState(false);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  useEffect(() => {
    // fetchProfile();
    handleSkillGap();
    handleRoadmap();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);

      setForm({
        targetRole: res.data.targetRole || "",
        skills: (res.data.skills || [])
          ?.map((s) => s.name)
          .join(", ") || ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkillGap = async () => {
    try {
      setLoadingGap(true);
      const res = await getSkillGap();
      setAnalysis(res.data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGap(false);
    }
  };

  const total = (user?.progress?.length || 0) * 2;

  const completed = user?.progress
    ? user.progress.reduce((acc, p) => {
      return acc +
        (p.theoryDone ? 1 : 0) +
        (p.practiceDone ? 1 : 0);
    }, 0)
    : 0;

  const percent = total === 0 ? 0 : ((completed / total) * 100).toFixed(0);

  const handleRoadmap = async () => {
    try {
      setLoadingRoadmap(true);
      const res = await getRoadmap();
      setRoadmap(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const handleStartPractice = () => {
    if (!user || !user.progress) {
      alert("User data not loaded yet");
      return;
    }

    const total = user.progress.length * 2;

    const completed = user.progress.reduce((acc, p) => {
      return acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0);
    }, 0);

    const percentage = total === 0 ? 0 : (completed / total) * 100;

    if (percentage < 70) {
      alert(`Complete at least 70% roadmap. Current: ${percentage.toFixed(0)}%`);
      return;
    }
    navigate("/practice");
  };

  const markComplete = async (topic, type) => {
    try {
      await markProgress({ topic, type });
      await fetchProfile();

      const gapRes = await getSkillGap();
      setAnalysis(gapRes.data.analysis);

      const res = await getRoadmap();
      setRoadmap(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
          <h2 className="text-3xl font-bold text-gray-800">
            Career Progress Dashboard
          </h2>          
        <button
              onClick={() => navigate("/profile")}
              className="bg-indigo-500 text-white px-4 py-2 mx-4 rounded-lg"
            >
              Go To Profile
            </button>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={handleSkillGap}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            {loadingGap ? "Analyzing..." : "Analyze Skill Gaps"}
          </button>

          <button
            onClick={handleRoadmap}
            className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            {loadingRoadmap ? "Generating..." : "Generate Learning Roadmap"}
          </button>
        </div>

        {/* SKILL GAP RESULT */}
        {/* <pre>{JSON.stringify(analysis, null, 2)}</pre> */}

        {analysis && (
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Skill Gap Analysis</h3>

            <p><span className="font-semibold">Missing:</span> {analysis?.missingSkills?.join(", ") || "None"}</p>
            <p><span className="font-semibold">Needs Improvement:</span> {analysis?.weakSkills?.join(", ") || "None"}</p>
            <p><span className="font-semibold">Strong Skills:</span> {analysis?.matchedSkills?.join(", ") || "None"}</p>

          </div>
        )}

        {/* ROADMAP RESULT */}
        {/* <pre>{JSON.stringify(roadmap, null, 2)}</pre> */}
        {roadmap?.roadmap?.length > 0 && (
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">
              Personalized Learning Roadmap
            </h3>
            <p className="font-semibold mt-3">Overall Progress</p>

            <p className="text-sm text-gray-600 mb-2">
              Complete both theory and practice for each topic to unlock interview readiness.
            </p>

            <p>
              {user?.progress?.filter((p) => p.theoryDone && p.practiceDone).length} / {user?.progress?.length} topics fully completed
            </p>

            <p className="text-lg font-semibold text-purple-700 mb-3">
              Total Time: {roadmap.totalEstimatedDays} days
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Each topic includes an estimated completion time to help you stay consistent and track your learning pace.
            </p>


            <p className="font-semibold mt-3">Learning Progress</p>

            <div className="w-full bg-gray-200 rounded h-3">
              <div
                className="bg-green-500 h-3 rounded"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              {percent}% of your learning journey completed
            </p>

            <p className="text-sm text-gray-600 mb-2">
              Skill Level shows topic difficulty. Priority is based on your current skill gaps.
            </p>

            {roadmap.roadmap.map((item, index) => {
              const progressItem = user?.progress?.find(
                (p) => p.topic === item.topic
              );

              const isTheoryDone = progressItem?.theoryDone;
              const isPracticeDone = progressItem?.practiceDone;
              return (
                <div key={index} className="border p-3 mb-3 rounded">

                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">
                      {item.topic}
                      <span className="text-sm text-gray-500 ml-2">Skill Level: ({item.level})</span>
                    </p>

                    <div className="mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded 
    ${item.priority === "High" ? "bg-red-200 text-red-800" :
                            item.priority === "Medium" ? "bg-yellow-200 text-yellow-800" :
                              "bg-green-200 text-green-800"}`}
                      >
                        Your Priority: {item.priority}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-sm bg-gray-200 px-2 py-1 rounded">
                        ⏱ {item.remainingDays} days left
                      </p>
                      <p className="text-xs text-gray-500">
                        Total: {item.estimatedDays} days
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 font-medium">
                    Status:{" "}
                    <span
                      className={`${isTheoryDone && isPracticeDone
                        ? "text-green-600"
                        : isTheoryDone || isPracticeDone
                          ? "text-yellow-600"
                          : "text-gray-500"
                        }`}
                    >
                      {isTheoryDone && isPracticeDone
                        ? "Completed"
                        : isTheoryDone || isPracticeDone
                          ? "In Progress"
                          : "Not Started"}
                    </span>
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
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Mark Theory Complete
                      </button>
                    )}

                    {!isPracticeDone && (
                      <button
                        onClick={() => markComplete(item.topic, "practice")}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Mark Practice Complete
                      </button>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleStartPractice}
          className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Start Interview Practice
        </button>

      </div>


      <button
        onClick={() => navigate("/interview")}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Start AI Mock Interview
      </button>
    </div>


  );
};

export default Dashboard;