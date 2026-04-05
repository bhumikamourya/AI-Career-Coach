import { useEffect, useState } from "react";
import { saveResume, getResume } from "../services/api";

const ResumeBuilder = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    experience: "",
    projects: ""
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await getResume();

      if (res.data) {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          education: res.data.education || "",
          skills: res.data.skills?.join(", ") || "",
          experience: res.data.experience || "",
          projects: res.data.projects || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "")
      };

      await saveResume(payload);
      alert("Resume saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving resume");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Resume Builder
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />

          <input
            name="education"
            value={form.education}
            onChange={handleChange}
            placeholder="Education"
            className="w-full p-2 border rounded"
          />

          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
            className="w-full p-2 border rounded"
          />

          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="w-full p-2 border rounded h-24"
          />

          <textarea
            name="projects"
            value={form.projects}
            onChange={handleChange}
            placeholder="Projects"
            className="w-full p-2 border rounded h-24"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;