import { useEffect, useState } from "react";
import { getProfile, updateProfile, getSkillGap, getRoadmap } from "../services/api";
import { useNavigate } from "react-router-dom";

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
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);

      setForm({
        targetRole: res.data.targetRole || "",
        skills: res.data.skills?.join(", ") || ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        targetRole: form.targetRole || undefined,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "")
      };

      const res = await updateProfile(payload);
      setUser(res.data);

      alert("Profile updated");
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

  const handleRoadmap = async () => {
    try {
      setLoadingRoadmap(true);
      const res = await getRoadmap();
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* USER INFO */}
        {user && (
          <div className="bg-white p-5 rounded-lg shadow">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
          </div>
        )}

        {/* PROFILE UPDATE */}
        <div className="bg-white p-5 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-semibold">Update Profile</h3>

          <select
            name="targetRole"
            value={form.targetRole}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>

          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated e.g. HTML, CSS, JS)"
            className="w-full p-2 border rounded-lg"
          />

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>

          <button
          onClick={() => navigate("/resume")}
          className="bg-indigo-500 text-white px-4 py-2 mx-4 rounded-lg"
        >
          Upload Resume
        </button>

        <button
  onClick={() => (window.location.href = "/resume-builder")}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Resume Builder
</button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={handleSkillGap}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            {loadingGap ? "Analyzing..." : "Analyze Skill Gap"}
          </button>

          <button
            onClick={handleRoadmap}
            className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            {loadingRoadmap ? "Generating..." : "Generate Roadmap"}
          </button>
        </div>

        {/* SKILL GAP RESULT */}
        {analysis && (
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Skill Gap Analysis</h3>

            <p><span className="font-semibold">Matched:</span> {analysis?.matchedSkills?.join(", ") || "None"}</p>
            <p><span className="font-semibold">Missing:</span> {analysis?.missingSkills?.join(", ") || "None"}</p>
            <p><span className="font-semibold">Weak:</span> {analysis?.weakSkills?.join(", ") || "None"}</p>
          </div>
        )}

        {/* ROADMAP RESULT */}
        {roadmap && (
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Learning Roadmap</h3>

            {roadmap.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-3 mb-2">
                <p>
                  <span className="font-semibold">{item.topic}</span> ({item.level})
                </p>
                <p className="text-sm text-gray-600">{item.status}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;