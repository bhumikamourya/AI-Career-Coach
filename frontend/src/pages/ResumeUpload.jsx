import { useState } from "react";
import { uploadResume } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState([]);

  const navigate = useNavigate();


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await uploadResume(formData);

      setText(res.data.text);
      setExtractedSkills(res.data.extractedSkills);

      localStorage.setItem("gap", JSON.stringify(res.data.gap));
      localStorage.setItem("roadmap", JSON.stringify(res.data.roadmap));

      alert("Resume Uploaded & Analyzed");

      navigate("/profile");
      // console.log("GAP:", res.data.gap);
      // console.log("ROADMAP:", res.data.roadmap);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-[#f3f4fb] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#d9d4ff] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#ffecde] rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-8 space-y-6"
      >

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-[#3b3a4a]">
            Upload Resume
          </h2>

          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 bg-white border border-[#d0d2ff] rounded-xl font-bold text-[#9689ff] hover:bg-[#f8f7ff]"
          >
            Profile
          </button>
        </div>

        <p className="text-slate-500 text-sm">
          Upload your resume and let AI analyze your skills & generate roadmap.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-[#d0d2ff] rounded-2xl p-6 text-center bg-white/40">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-500"
          />

          {file && (
            <p className="mt-3 text-sm text-[#3b3a4a] font-medium">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg hover:brightness-105 transition-all disabled:opacity-50"
        >
          {loading ? "Analyzing Resume..." : "Upload & Analyze"}
        </button>

        {/* Extracted Text */}
        {text && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-2xl bg-white/60 border border-white shadow-sm max-h-60 overflow-y-auto"
          >
            <h3 className="font-bold text-[#3b3a4a] mb-2">
              Extracted Content
            </h3>
            <p className="text-xs text-slate-600 whitespace-pre-line">
              {text}
            </p>
          </motion.div>
        )}

        {/* Skills */}
        {extractedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100"
          >
            <h3 className="font-bold text-emerald-700 mb-3">
              Detected Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-white border shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="mt-3 text-xs text-slate-500">
              These skills are automatically added to your profile.
            </p>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default ResumeUpload;