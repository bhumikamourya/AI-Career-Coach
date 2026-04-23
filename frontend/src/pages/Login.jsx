import { useState, useEffect } from "react";

import { loginUser, updatePassword } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const features = [
    {
      title: "Smart Skill Extraction",
      desc: "Our AI engine parses your resume to identify core technical competencies and hidden potentials."
    },
    {
      title: "AI Gap Analysis",
      desc: "Bridge the gap between your current profile and industry requirements with precision."
    },
    {
      title: "Personalized Roadmap",
      desc: "Get an AI-curated learning path designed to fast-track your professional growth."
    },
    {
      title: "Interview Readiness",
      desc: "Simulate real-world interviews and track your hiring readiness score in real-time."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [features.length]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    // Pura page ka background soft gradient hai, ekdum white nahi
    <div className="h-screen w-full bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] text-slate-700 flex items-center justify-center p-4 md:p-10 font-sans relative overflow-hidden">

      {/* Background Decorative Blobs - Inki opacity kam hai taaki distract na karein */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        // Login Box: Ab ye pure dark nahi hai, light lavender-gray mix hai with glass effect
        className="w-full max-w-6xl  bg-white/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row z-10 border border-white/60"
      >

        {/* LEFT SIDE: LOGIN FORM */}
        <div className="flex-1 p-6 md:p-13 flex flex-col justify-center bg-white/10">
          <div className="mb-10">
            <span className="text-indigo-400 font-bold tracking-[0.2em] text-[10px] uppercase">ARYNEXA System</span>
            <h2 className="text-4xl font-bold text-slate-800 mt-2 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium italic">Your personalized career path awaits.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none shadow-md bg-indigo-100 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none shadow-md bg-indigo-100 placeholder:text-gray-500"
              />
            </div>

            <motion.button
              whileHover={{
                background: "linear-gradient(to right, #818cf8, #a78bfa)"
                , boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.6) "
              }}

              whileTap={{ scale: 0.98 }}
              type="submit"
              // Button is soft indigo-to-lavender, not too dark or harsh
              className="w-full bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold py-4 rounded-2xl mt-4 transition-all text-lg shadow-lg shadow-indigo-100"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-10 flex justify-center border-t border-indigo-50 pt-8">
            <p className="text-slate-400 text-sm">
              New here?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-indigo-500 font-bold hover:text-orange-400 transition-colors underline underline-offset-4"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: VISUAL SECTION */}
        <div
          className="hidden md:flex flex-1 p-16 flex-col justify-end relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(129, 140, 248, 0.5), rgba(251, 146, 60, 0.1)), url('/assets/bg1.avif')`
          }}
        >
          {/* Glass Card for Workflow Steps - Light and clear */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-[2rem] shadow-xl">
            <div className="w-10 h-1 bg-white/60 mb-6 rounded-full"></div>

            <div className="h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{features[activeSlide].title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed font-medium italic">{features[activeSlide].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2.5 mt-6">
              {features.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${activeSlide === i ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </div>


    );
};

export default Login;