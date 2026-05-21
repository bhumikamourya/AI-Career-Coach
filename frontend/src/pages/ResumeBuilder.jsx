import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

      toast.success("✅ Resume saved successfully");

      navigate("/profile");
    } catch (err) {
      console.error(err);

      toast.error("❌ Error saving resume");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5]  px-4 sm:px-6 py-6 md:py-10">
<ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="light"
/>
      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #dcd6f7 1px, transparent 1px), linear-gradient(to bottom, #f3e3d5 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 pointer-events-none z-0">

        <div className="absolute top-[-10%] left-[-8%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#d9d4ff]/50 rounded-full blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[-8%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#ffecde]/50 rounded-full blur-[120px]" />

      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto relative z-10"
      >

        {/* HEADER */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-5 sm:p-7 mb-6">

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5">

            <div>

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  R
                </div>

                <div>

                  <h2 className="text-3xl sm:text-4xl font-black text-[#3b3a4a] tracking-tight">
                    Resume Builder
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Build a modern ATS-ready resume professionally
                  </p>

                  {source === "upload" && (
                    <p className="text-xs text-[#9689ff] mt-2 font-medium">
                      ✨ Auto-filled from uploaded resume
                    </p>
                  )}

                  {source === "builder" && (
                    <p className="text-xs text-emerald-500 mt-2 font-medium">
                      ✨ Editing your saved resume
                    </p>
                  )}

                </div>

              </div>

            </div>

            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-3 rounded-2xl bg-white/70 border border-indigo-100 text-[#6d63ff] font-bold hover:shadow-lg hover:bg-white transition-all"
            >
              Back to Profile
            </button>

          </div>

        </div>

        {/* MAIN BUILDER */}
        <div className="bg-white/35 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">

          {/* TOP STRIP */}
          <div className="px-6 sm:px-10 py-5 border-b border-white/40 bg-gradient-to-r from-[#f4f2ff]/80 to-[#fff5ee]/80">

            <div className="flex flex-wrap items-center gap-3">

              <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                ATS Optimized
              </span>

              <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold">
                Professional Layout
              </span>

              <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                AI Assisted
              </span>

            </div>

          </div>

          {/* FORM */}
          <div className="p-5 sm:p-8 md:p-10 space-y-8">

            {/* BASIC INFO */}
            <Section title="Basic Information">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                  placeholder="Email Address"
                />

              </div>

            </Section>

            {/* EDUCATION */}
            <Section title="Education">

              <Input
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="College / University / Degree"
              />

            </Section>

            {/* SKILLS */}
            <Section title="Skills">

              <Input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Python..."
              />

            </Section>

            {/* EXPERIENCE */}
            <Section title="Experience">

              <Textarea
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Describe your internships, freelance work, achievements..."
              />

            </Section>

            {/* PROJECTS */}
            <Section title="Projects">

              <Textarea
                name="projects"
                value={form.projects}
                onChange={handleChange}
                placeholder="Add one project per line with description"
              />

            </Section>

            {/* ACTION BAR */}
            <div className="pt-4 border-t border-white/40">

              <div className="flex flex-col sm:flex-row gap-4">

                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving Resume..." : "Save Resume"}
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="sm:w-[180px] py-4 rounded-2xl bg-white/70 border shadow-lg  border-white/60 text-slate-600 font-bold hover:bg-white transition-all"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
};

/* UI COMPONENTS */

const Section = ({ title, children }) => (
  <div className="bg-white/35 border border-white/40 rounded-[2rem] p-5 sm:p-6 shadow-sm">

    <h3 className="text-lg sm:text-xl font-extrabold text-[#3b3a4a] mb-5">
      {title}
    </h3>

    {children}

  </div>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="
      w-full
      px-5
      py-4
      rounded-2xl
      bg-white/60
      border
      border-white/50
      shadow-sm
      text-slate-700
      outline-none
      transition-all
      focus:ring-4
      focus:ring-[#9689ff]/20
      focus:border-[#9689ff]/30
      placeholder:text-slate-400
    "
  />
);

const Textarea = ({ ...props }) => (
  <textarea
    {...props}
    className="
      w-full
      px-5
      py-4
      rounded-2xl
      bg-white/60
      border
      border-white/50
      shadow-sm
      text-slate-700
      outline-none
      transition-all
      focus:ring-4
      focus:ring-[#9689ff]/20
      focus:border-[#9689ff]/30
      placeholder:text-slate-400
      min-h-[140px]
      resize-none
    "
  />
);

export default ResumeBuilder;