import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchResume,
  saveResumeData
} from "../redux/slices/resumeSlice";

const ResumeBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resume, source, loading } = useSelector(
    (state) => state.resume
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    experience: "",
    projects: ""
  });

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  useEffect(() => {
    if (resume) {
      setForm({
        name: resume.name || "",
        email: resume.email || "",

        education: Array.isArray(resume.education)
          ? resume.education[0]?.college || ""
          : resume.education || "",

        skills: Array.isArray(resume.skills)
          ? resume.skills.join(", ")
          : resume.skills || "",

        experience: resume.experience || "",

        projects: Array.isArray(resume.projects)
          ? resume.projects
              .map((p) => {
                let line = p.title || "";

                if (p.description) {
                  line += " - " + p.description;
                }

                return line;
              })
              .join("\n")
          : resume.projects || ""
      });
    }
  }, [resume]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,

        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      };

      await dispatch(saveResumeData(payload)).unwrap();

      alert("✅ Resume saved successfully");

      navigate("/profile");
    } catch (err) {
      console.error(err);

      alert("❌ Error saving resume");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4fb] p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]" />

        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10 space-y-6"
      >

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-4xl font-extrabold text-[#3b3a4a]">
              Resume Builder
            </h2>

            <p className="text-slate-500 text-sm italic">
              Build & manage your resume professionally
            </p>

            {source === "upload" && (
              <p className="text-xs text-[#9689ff] mt-1">
                Pre-filled from uploaded resume
              </p>
            )}

            {source === "builder" && (
              <p className="text-xs text-emerald-500 mt-1">
                Editing your saved resume
              </p>
            )}
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 bg-white border border-[#d0d2ff] rounded-xl font-bold text-[#9689ff] hover:bg-[#f8f7ff]"
          >
            Profile
          </button>
        </div>

        {/* MAIN FORM CARD */}
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl space-y-6">

          {/* BASIC INFO */}
          <Section title="Basic Information">
            <div className="grid md:grid-cols-2 gap-4">

              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
              />

              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />

            </div>
          </Section>

          {/* EDUCATION */}
          <Section title="Education">
            <Input
              name="education"
              value={form.education}
              onChange={handleChange}
              placeholder="College / Degree"
            />
          </Section>

          {/* SKILLS */}
          <Section title="Skills">
            <Input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="React, Node, MongoDB..."
            />
          </Section>

          {/* EXPERIENCE */}
          <Section title="Experience">
            <Textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Describe your experience..."
            />
          </Section>

          {/* PROJECTS */}
          <Section title="Projects">
            <Textarea
              name="projects"
              value={form.projects}
              onChange={handleChange}
              placeholder="One project per line"
            />
          </Section>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg hover:brightness-105 transition-all disabled:opacity-50"
          >
            {loading ? "Saving Resume..." : "Save Resume"}
          </button>

        </div>
      </motion.div>
    </div>
  );
};

/* 🔹 REUSABLE UI COMPONENTS */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-extrabold text-[#3b3a4a] mb-3">
      {title}
    </h3>

    {children}
  </div>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-5 py-4 rounded-2xl bg-indigo-100/30 shadow-md text-slate-700 outline-none focus:ring-2 focus:ring-[#9689ff]/20"
  />
);

const Textarea = ({ ...props }) => (
  <textarea
    {...props}
    className="w-full px-5 py-4 rounded-2xl bg-indigo-100/30 shadow-md text-slate-700 outline-none focus:ring-2 focus:ring-[#9689ff]/20 h-28"
  />
);

export default ResumeBuilder;