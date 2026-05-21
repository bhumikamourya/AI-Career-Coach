import { useDashboard } from "../hooks/useDashboard";

import CurrentPhaseCard from "../components/dashboard/CurrentPhaseCard";
import ReadinessCard from "../components/dashboard/ReadinessCard";
import SkillGapCard from "../components/dashboard/SkillGapCard";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import ProgressBar from "../components/dashboard/ProgressBar";
import RoadmapList from "../components/dashboard/RoadmapList";
import ActionButtons from "../components/dashboard/ActionButtons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlassCard from "../components/dashboard/ui/GlassCard";
import Loader from "../components/common/Loader";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import {
  FiBook, FiCheckCircle, FiStar, FiClock, FiLayout,
  FiTrendingUp, FiAward, FiTarget, FiZap, FiCalendar,
  FiBarChart2, FiPieChart, FiActivity, FiUserCheck,
  FiArrowRight, FiPlay, FiBriefcase, FiCpu, FiGlobe
} from "react-icons/fi";

import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Tooltip, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

const Dashboard = () => {

  const {
    data,
    loading,
    percent,
    markComplete,
    handleStartPractice,
    handleInterview,
    navigate
  } = useDashboard();

  // LOCAL UI TAB STATE
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!data) return <p className="p-6">No data found</p>;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] p-6">
<ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="light"
/>
      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] bg-indigo-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-orange-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Header Section - Glassmorphism like login box */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-2"
>

  <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-4 sm:p-5 md:p-6 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">

    <div className="flex flex-row justify-between items-center gap-3">

      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0 flex-1">

        <div className="min-w-[45px] w-[45px] h-[45px] sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] flex items-center justify-center text-white font-bold text-lg shadow-md">

          {data?.user?.name?.charAt(0) || "D"}

        </div>

        <div className="min-w-0">

          <h1 className="text-lg sm:text-2xl md:text-4xl font-bold text-slate-500 tracking-tight truncate">

            Welcome {data?.user?.name?.split(" ")[0] || "Developer"}!

          </h1>

          <p className="text-[10px] sm:text-xs md:text-base text-slate-500 mt-1 flex items-center gap-1 italic leading-relaxed truncate">

            <FiActivity className="text-indigo-400 min-w-fit" />

            <span className="truncate">
              Your AI-powered career transformation journey
            </span>

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex-shrink-0">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/profile")}
          className="group relative px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white/60 backdrop-blur border border-indigo-200 rounded-2xl font-semibold text-indigo-600 hover:border-indigo-500 hover:shadow-lg transition-all flex items-center justify-center gap-2 overflow-hidden"
        >

          <FiLayout className="relative z-10 text-sm sm:text-base" />

          <span className="relative z-10 text-xs sm:text-sm md:text-base">
            Profile
          </span>

        </motion.button>

      </div>

    </div>
  </div>
</motion.div>


        {/* TABS UI */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg shadow-gray-200"
                : "bg-white/30 backdrop-blur text-slate-500 border border-white/40"
            }`}
          >
            Overview
          </button>

          

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
              activeTab === "roadmap"
                ? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg border border-black/10"
                : "bg-white/30 backdrop-blur text-slate-500 border border-white/40"
            }`}
          >
            Roadmap
          </button>

        </div>


        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

              <GlassCard>
                <CurrentPhaseCard phase={data.currentPhase} />
              </GlassCard>

              <GlassCard>
                <ProgressBar percent={percent} />
              </GlassCard>

              <GlassCard>
                <ReadinessCard score={data.readinessScore} />
              </GlassCard>

              <GlassCard>
                <AIInsightCard aiInsight={data.aiInsight} />
              </GlassCard>

            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">

              {/* LEFT */}
              <div className="space-y-6">

                <GlassCard>
                  <SkillGapCard skillGap={data.skillGap} />
                </GlassCard>

              </div>

            </div>

          </>
        )}


        {/* ROADMAP TAB */}
        {activeTab === "roadmap" && (
          <GlassCard>
            <RoadmapList
              roadmap={data.roadmap}
              progress={data.progress}
              markComplete={markComplete}
            />
          </GlassCard>
        )}


        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 z-20"
        >
          <GlassCard className="p-4">
            <ActionButtons
              onPractice={handleStartPractice}
              onInterview={handleInterview}
              navigate={navigate}
            />
          </GlassCard>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;