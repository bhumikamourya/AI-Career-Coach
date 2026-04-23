import { useState, useEffect } from "react";
import { registerUser, getRoles } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    targetRole: "",
    skills: ""
  });
  const [error, setError] = useState("");

  const [activeSlide, setActiveSlide] = useState(0);

  // Register page specific content for the right side
  const onboardingSteps = [
    {
      title: "Begin Your Journey",
      desc: "Join thousands of developers using Aura AI to map out their dream careers."
    },
    {
      title: "Set Your Target",
      desc: "Tell us your dream role, and our AI will build the bridge to get you there."
    },
    {
      title: "Skill Up Fast",
      desc: "Identify exactly which technologies you need to master for today's market."
    },
    {
      title: "Ready to Launch?",
      desc: "Your future self will thank you for taking this first step today."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === onboardingSteps.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [onboardingSteps.length]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      setRoles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.targetRole) {
      return alert("Please select a target role");
    }

    const payload = {
      ...form,
      skills: form.skills
        ? form.skills.split(",").map((s) => ({
          name: s.trim(),
          level: "Beginner"
        }))
        : []
    };

    try {
      const res = await registerUser(payload);

      localStorage.setItem("token", res.token);

      alert("Registered successfully");

      navigate("/profile");


    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] text-slate-700 flex items-center justify-center p-4 md:p-10 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl bg-white/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row z-10 border border-white/60"
      >

        {/* LEFT SIDE: REGISTER FORM */}
        <div className="flex-1 p-6 md:p-12 flex flex-col justify-center bg-white/10">
          <div className="mb-10">
            <span className="text-indigo-400 font-bold tracking-[0.2em] text-[10px] uppercase">Join ARYNEXA</span>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <h2 className="text-3xl font-bold text-slate-800 mt-1 mb-1 tracking-tight">Create Account</h2>
            <p className="text-slate-500 text-sm font-medium italic">Start your professional transformation.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border rounded-lg text-gray-700 focus:outline-none shadow-md bg-indigo-100 placeholder:text-gray-500 cursor-pointer appearance-none "
                ></input>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 border rounded-lg text-gray-700 focus:outline-none shadow-md bg-indigo-100 placeholder:text-gray-500 cursor-pointer appearance-none "
                ></input>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                placeholder="Enter Password Here"
                className="w-full px-4 py-2.5 border rounded-lg text-gray-700 focus:outline-none shadow-md bg-indigo-100 placeholder:text-gray-500 cursor-pointer appearance-none "
              ></input>
            </div>

            <div className="space-y-1 ">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Role</label>
              <select
                name="targetRole"
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg text-gray-700 focus:outline-none shadow-md bg-indigo-100 placeholder:text-gray-500 cursor-pointer appearance-none "
              >
                <option value="">Select Role</option>

                {roles?.map((role) => (
                  <option key={role._id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>



            <motion.button
              whileHover={{
                background: "linear-gradient(to right, #818cf8, #a78bfa)"
                , boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.6) "
              }}

              whileTap={{ scale: 0.98 }}
              type="submit"
              // Button is soft indigo-to-lavender, not too dark or harsh
              className="w-full bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold py-3 rounded-lg mt-6 transition-all text-lg shadow-lg shadow-indigo-100"
            >
              Create Account
            </motion.button>
          </form>

          <div className="mt-6 flex justify-center border-t border-indigo-50 pt-6">
            <p className="text-slate-400 text-sm">
              Already a member?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-500 font-bold hover:text-orange-400 transition-colors underline underline-offset-4"
              >
                Login here
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: VISUAL SECTION */}
        <div
          className="hidden md:flex flex-1 p-16 flex-col justify-end relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(129, 140, 248, 0.4), rgba(251, 146, 60, 0.1)), url('/assets/bg1.avif')`
          }}
        >
          <div className="bg-white/20 backdrop-blur-md border border-white/30 p-8 rounded-[2rem] shadow-xl">
            <div className="w-10 h-1 bg-white/60 mb-6 rounded-full"></div>

            <div className="h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{onboardingSteps[activeSlide].title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed font-medium italic">{onboardingSteps[activeSlide].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-2.5 mt-6">
              {onboardingSteps.map((_, i) => (
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

export default Register;