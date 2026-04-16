import { useEffect, useState } from "react";
import { saveResume, getResume } from "../services/api";
import { useNavigate } from "react-router-dom";

const ResumeBuilder = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    experience: "",
    projects: ""
  });
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await getResume();

      const data = res.data.data;
      setSource(res.data.source);

      setForm({
  name: data.name || "",
  email: data.email || "",

  education: Array.isArray(data.education)
    ? data.education[0]?.college || ""
    : data.education || "",

  skills: Array.isArray(data.skills)
    ? data.skills.join(", ")
    : data.skills || "",

  experience: data.experience || "",

  projects: Array.isArray(data.projects)
    ? data.projects
        .map(p => {
          let line = p.title || "";
          if (p.description) {
            line += " - " + p.description;
          }
          return line;
        })
        .join("\n")
    : data.projects || ""
});
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      };

      await saveResume(payload);
      alert("✅ Resume saved successfully");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("❌ Error saving resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Resume Builder
          </h2>

          {source === "upload" && (
            <p className="text-sm text-blue-500 mt-1">
              Pre-filled from uploaded resume
            </p>
          )}

          {source === "builder" && (
            <p className="text-sm text-green-500 mt-1">
              Editing your built resume
            </p>
          )}
        </div>

        {/* SECTION: BASIC INFO */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">
            Basic Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* SECTION: EDUCATION */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">
            Education
          </h3>

          <input
            name="education"
            value={form.education}
            onChange={handleChange}
            placeholder="College / Degree"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* SECTION: SKILLS */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">
            Skills
          </h3>

          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Node, MongoDB..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* SECTION: EXPERIENCE */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">
            Experience
          </h3>

          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Describe your experience..."
            className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* SECTION: PROJECTS */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700">
            Projects
          </h3>

          <textarea
            name="projects"
            value={form.projects}
            onChange={handleChange}
            placeholder="One project per line"
            className="w-full p-2 border rounded-lg h-28 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/*SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Saving..." : "Save Resume"}
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;