import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, Mic2, BarChart3, ChevronRight, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {

  if (token) {
    navigate("/dashboard");
  } else {
    navigate("/register");
  }
};

  const balancedTransition = { duration: 0.7, ease: [0.4, 0, 0.2, 1] };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: balancedTransition }
  };

  return (
    <div className="min-h-screen w-full text-slate-700 font-sans relative flex flex-col bg-[#fcfdff] overflow-x-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/bg2.jpg')` }} 
        />
        <div className="absolute inset-0 opacity-[0.12]" 
             style={{ backgroundImage: `linear-gradient(to right, #dcd6f7 1px, transparent 1px), linear-gradient(to bottom, #f3e3d5 1px, transparent 1px)`, backgroundSize: '45px 45px' }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f2f5]/90 via-[#f5f0ff]/75 to-[#f3e3d5]/90 backdrop-blur-[2px]" />
      </div>

      {/* --- DECORATIVE ORBS --- */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <motion.div animate={{ x: [0, 20, 0], y: [0, 20, 0] }} transition={{ duration: 18, repeat: Infinity }} className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[110px]" />
        <motion.div animate={{ x: [0, -20, 0], y: [0, 20, 0] }} transition={{ duration: 14, repeat: Infinity }} className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-orange-100/15 rounded-full blur-[110px]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />

        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col items-center text-center px-6 pt-10 pb-16"
        >
          <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            ✨ AI-Driven Career Guidance System
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-[5.8rem] font-black mb-6 leading-[1.1] text-slate-900 tracking-tight max-w-5xl">
            Empower Your Future <br />
            <span className="bg-gradient-to-r from-[#818cf8] via-[#a78bfa] to-[#fb923c] bg-clip-text text-transparent">
              With ARYNEXA System.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-500 max-w-2xl text-lg md:text-xl mb-12 font-medium italic opacity-90 leading-relaxed">
            Smart skill extraction and immersive AI interviews to help you <br className="hidden md:block" /> 
            bridge the gap to your dream role.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-24">
            <motion.button 
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl flex items-center gap-3"
            >
              {token ? "Go to Dashboard" : "Get Started"} <ChevronRight size={20} />
            </motion.button>

          </motion.div>

          {/* Feature Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            <FeatureCard 
              icon={<BrainCircuit className="text-[#818cf8]" size={26} />} 
              title="Smart Skill Extraction" 
              desc="AI identifies technical competencies and hidden potentials from your profile." 
              delay={0.4} 
            />
            <FeatureCard 
              icon={<BarChart3 className="text-[#fb923c]" size={26} />} 
              title="AI Gap Analysis" 
              desc="Bridge the gap between your current skills and industry requirements." 
              delay={0.5} 
            />
            <FeatureCard 
              icon={<Sparkles className="text-[#a78bfa]" size={26} />} 
              title="Personalized Roadmap" 
              desc="Get an AI-curated learning path designed for fast-track growth." 
              delay={0.6} 
            />
            <FeatureCard 
              icon={<Mic2 className="text-[#818cf8]" size={26} />} 
              title="Interview Readiness" 
              desc="Simulate interviews and track your readiness score in real-time." 
              delay={0.7} 
            />
          </div>
        </motion.section>

        <Footer />
      </div>
    </div>
  );
};

// FeatureCard with Spring Animation for Maximum Smoothness
const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    // transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ 
    y: -10, 
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
  }}
  // EK HI TRANSITION BLOCK MEIN SAB KUCH MERGE KAR DIYA:
  transition={{ 
    delay, 
    duration: 0.6, 
    ease: [0.4, 0, 0.2, 1],
    type: "spring", 
    stiffness: 300, 
    damping: 20 
  }}
  className="bg-white/30 border border-white p-8 rounded-[2.5rem] backdrop-blur-xl shadow-sm text-left cursor-pointer"
>
    
    <div className="bg-white/80 w-11 h-11 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-white">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight leading-tight">{title}</h3>
    <p className="text-slate-500 text-[11px] leading-relaxed font-medium italic opacity-80">{desc}</p>
  </motion.div>
);

export default Home;