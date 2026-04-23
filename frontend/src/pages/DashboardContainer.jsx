import { useDashboard } from "../hooks/useDashboard";

import CurrentPhaseCard from "../components/dashboard/CurrentPhaseCard";
import ReadinessCard from "../components/dashboard/ReadinessCard";
import SkillGapCard from "../components/dashboard/SkillGapCard";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import ProgressBar from "../components/dashboard/ProgressBar";
import RoadmapList from "../components/dashboard/RoadmapList";
import ActionButtons from "../components/dashboard/ActionButtons";

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

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <h2 className="text-3xl font-bold">Career Dashboard</h2>

        <CurrentPhaseCard phase={data.currentPhase} />

        <button
          onClick={() => navigate("/profile")}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          Go To Profile
        </button>

        <ReadinessCard score={data.readinessScore} />

        <SkillGapCard skillGap={data.skillGap} />

        <AIInsightCard aiInsight={data.aiInsight} />

        <ProgressBar percent={percent} />

        <RoadmapList
          roadmap={data.roadmap}
          progress={data.progress}
          markComplete={markComplete}
        />

        <ActionButtons
          onPractice={handleStartPractice}
          onInterview={handleInterview}
          navigate={navigate}
        />

      </div>
    </div>
  );
};

export default Dashboard;





//FOR UI
// import { useEffect, useState } from "react";
// import { getProfile, getSkillGap, getRoadmap, markProgress } from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FiBook, FiCheckCircle, FiStar, FiClock, FiLayout, 
//   FiTrendingUp, FiAward, FiTarget, FiZap, FiCalendar,
//   FiBarChart2, FiPieChart, FiActivity, FiUserCheck,
//   FiArrowRight, FiPlay, FiBriefcase, FiCpu, FiGlobe
// } from "react-icons/fi";
// import { 
//   LineChart, Line, AreaChart, Area, BarChart, Bar, 
//   PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, 
//   PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, 
//   Tooltip, XAxis, YAxis, CartesianGrid, Legend 
// } from "recharts";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [analysis, setAnalysis] = useState(null);
//   const [roadmap, setRoadmap] = useState(null);
//   const [loadingGap, setLoadingGap] = useState(false);
//   const [loadingRoadmap, setLoadingRoadmap] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     fetchProfile();
//     handleSkillGap();
//     handleRoadmap();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await getProfile();
//       setUser(res.data);
//     } catch (err) { console.error(err); }
//   };

//   const handleSkillGap = async () => {
//     try {
//       setLoadingGap(true);
//       const res = await getSkillGap();
//       setAnalysis(res.data.analysis);
//     } catch (err) { console.error(err); } 
//     finally { setLoadingGap(false); }
//   };

//   const handleRoadmap = async () => {
//     try {
//       setLoadingRoadmap(true);
//       const res = await getRoadmap();
//       setRoadmap(res.data);
//     } catch (err) { console.error(err); } 
//     finally { setLoadingRoadmap(false); }
//   };

//   const markComplete = async (topic, type) => {
//     try {
//       await markProgress({ topic, type });
//       await fetchProfile();
//       const gapRes = await getSkillGap();
//       setAnalysis(gapRes.data.analysis);
//       const res = await getRoadmap();
//       setRoadmap(res.data);
//     } catch (err) { console.error(err); }
//   };

//   const total = (user?.progress?.length || 0) * 2;
//   const completed = user?.progress ? user.progress.reduce((acc, p) => acc + (p.theoryDone ? 1 : 0) + (p.practiceDone ? 1 : 0), 0) : 0;
//   const percent = total === 0 ? 0 : ((completed / total) * 100).toFixed(0);

//   // Prepare chart data
//   const skillGapData = analysis ? [
//     { name: "Matched", value: analysis.matchedSkills?.length || 0, color: "#10b981" },
//     { name: "Missing", value: analysis.missingSkills?.length || 0, color: "#ef4444" },
//     { name: "Weak", value: analysis.weakSkills?.length || 0, color: "#f59e0b" }
//   ] : [];

//   const weeklyProgress = [
//     { day: "Mon", completed: 15, total: 20 },
//     { day: "Tue", completed: 22, total: 25 },
//     { day: "Wed", completed: 18, total: 22 },
//     { day: "Thu", completed: 25, total: 28 },
//     { day: "Fri", completed: 20, total: 24 },
//     { day: "Sat", completed: 12, total: 15 },
//     { day: "Sun", completed: 8, total: 10 }
//   ];

//   const radarData = analysis ? [
//     { skill: "Technical", value: 75 },
//     { skill: "Problem Solving", value: 60 },
//     { skill: "Communication", value: 45 },
//     { skill: "System Design", value: 30 },
//     { skill: "Algorithms", value: 55 },
//     { skill: "Frameworks", value: 65 }
//   ] : [];

//   const handleStartPractice = () => {
//     if (percent < 70) {
//       alert(`Complete at least 70% roadmap. Current: ${percent}%`);
//       return;
//     }
//     navigate("/practice");
//   };

//   // Stats cards data with login page color scheme
//   const statsCards = [
//     { 
//       title: "Overall Progress", 
//       value: `${percent}%`, 
//       icon: <FiTrendingUp />, 
//       color: "from-indigo-400 to-purple-400",
//       bgColor: "bg-indigo-100",
//       textColor: "text-indigo-600"
//     },
//     { 
//       title: "Skills Mastered", 
//       value: analysis?.matchedSkills?.length || 0, 
//       icon: <FiAward />, 
//       color: "from-emerald-400 to-teal-400",
//       bgColor: "bg-emerald-100",
//       textColor: "text-emerald-600"
//     },
//     { 
//       title: "Learning Streak", 
//       value: "12", 
//       suffix: "days", 
//       icon: <FiCalendar />, 
//       color: "from-orange-400 to-amber-400",
//       bgColor: "bg-orange-100",
//       textColor: "text-orange-600"
//     },
//     { 
//       title: "Completion Rate", 
//       value: completed, 
//       suffix: `/${total}`, 
//       icon: <FiCheckCircle />, 
//       color: "from-blue-400 to-cyan-400",
//       bgColor: "bg-blue-100",
//       textColor: "text-blue-600"
//     }
//   ];

//   return (
//     // Login page jaisa background gradient
//     <div className="min-h-screen w-full bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] text-slate-700 font-sans overflow-x-hidden">
      
//       {/* Background Decorative Blobs - Same as login page */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px]"></div>
//         <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[100px]"></div>
//         <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        
//         {/* Header Section - Glassmorphism like login box */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-12 h-12 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] rounded-2xl flex items-center justify-center shadow-lg">
//                     <FiCpu className="text-white text-2xl" />
//                   </div>
//                   <div>
//                     <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
//                       Welcome  {user?.name?.split(" ")[0] || "Developer"}!
//                     </h1>
//                     <p className="text-slate-500 mt-1 flex items-center gap-2 italic">
//                       <FiActivity className="text-indigo-400" />
//                       Your AI-powered career transformation journey
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate("/profile")}
//                   className="group relative px-6 py-3 bg-white/60 backdrop-blur border border-indigo-200 rounded-2xl font-semibold text-indigo-600 hover:border-indigo-500 hover:shadow-lg transition-all flex items-center gap-2 overflow-hidden"
//                 >
//                   <FiLayout className="relative z-10" />
//                   <span className="relative z-10">Profile</span>
//                 </motion.button>
                
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => localStorage.removeItem("token") && navigate("/login")}
//                   className="px-6 py-3 bg-white/40 backdrop-blur rounded-2xl font-semibold text-slate-600 hover:bg-white/60 transition-all"
//                 >
//                   Logout
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Tab Navigation - Soft colors */}
//         <div className="flex gap-2 mb-8 bg-white/20 backdrop-blur-sm rounded-2xl p-1 w-fit">
//           {["overview", "analytics", "roadmap"].map((tab) => (
//             <motion.button
//               key={tab}
//               whileHover={{ y: -2 }}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-3 font-semibold capitalize transition-all rounded-xl ${
//                 activeTab === tab 
//                   ? "bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white shadow-md" 
//                   : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               {tab}
//             </motion.button>
//           ))}
//         </div>

//         <AnimatePresence mode="wait">
//           {/* OVERVIEW TAB */}
//           {activeTab === "overview" && (
//             <motion.div
//               key="overview"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               className="space-y-8"
//             >
//               {/* Stats Grid - Glassmorphism cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {statsCards.map((card, idx) => (
//                   <motion.div
//                     key={idx}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: idx * 0.1 }}
//                     whileHover={{ y: -5, scale: 1.02 }}
//                     onHoverStart={() => setHoveredCard(idx)}
//                     onHoverEnd={() => setHoveredCard(null)}
//                     className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 overflow-hidden group cursor-pointer"
//                   >
//                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-20 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500`}></div>
//                     <div className="relative z-10">
//                       <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center mb-4 ${card.textColor}`}>
//                         <div className="text-2xl">{card.icon}</div>
//                       </div>
//                       <p className="text-slate-500 text-sm font-medium mb-1">{card.title}</p>
//                       <div className="flex items-baseline gap-1">
//                         <span className="text-3xl font-bold text-slate-800">{card.value}</span>
//                         {card.suffix && <span className="text-slate-400 text-sm">{card.suffix}</span>}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Main Content Grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Skill Gap Analysis - Glass card */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60"
//                 >
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//                       <FiTarget className="text-indigo-500" />
//                       Skill Gap Analysis
//                     </h3>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       onClick={handleSkillGap}
//                       className="text-sm text-indigo-500 font-semibold hover:text-indigo-600"
//                     >
//                       Refresh Analysis
//                     </motion.button>
//                   </div>

//                   {loadingGap ? (
//                     <div className="flex items-center justify-center h-64">
//                       <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//                     </div>
//                   ) : analysis ? (
//                     <>
//                       <div className="h-64 mb-4">
//                         <ResponsiveContainer width="100%" height="100%">
//                           <PieChart>
//                             <Pie
//                               data={skillGapData}
//                               cx="50%"
//                               cy="50%"
//                               innerRadius={60}
//                               outerRadius={80}
//                               paddingAngle={5}
//                               dataKey="value"
//                               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                             >
//                               {skillGapData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={entry.color} />
//                               ))}
//                             </Pie>
//                             <Tooltip />
//                           </PieChart>
//                         </ResponsiveContainer>
//                       </div>
//                       <div className="grid grid-cols-3 gap-4 mt-4">
//                         {skillGapData.map((item) => (
//                           <div key={item.name} className="text-center p-3 rounded-xl bg-white/30 backdrop-blur">
//                             <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
//                             <div className="text-xs text-slate-500 font-medium mt-1">{item.name}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center py-12 text-slate-400">
//                       <FiTarget className="text-4xl mx-auto mb-3 opacity-50" />
//                       <p>Click refresh to analyze your skill gaps</p>
//                     </div>
//                   )}
//                 </motion.div>

//                 {/* Progress Chart - Glass card */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.1 }}
//                   className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60"
//                 >
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
//                       <FiBarChart2 className="text-indigo-500" />
//                       Weekly Activity
//                     </h3>
//                     <span className="text-xs text-slate-400">Tasks Completed</span>
//                   </div>
//                   <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={weeklyProgress}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.3} />
//                         <XAxis dataKey="day" stroke="#94a3b8" />
//                         <YAxis stroke="#94a3b8" />
//                         <Tooltip />
//                         <Bar dataKey="completed" fill="#818cf8" radius={[8, 8, 0, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Radar Chart & Quick Actions */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="lg:col-span-2 bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60"
//                 >
//                   <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
//                     <FiPieChart className="text-indigo-500" />
//                     Skills Assessment Radar
//                   </h3>
//                   <div className="h-80">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RadarChart data={radarData}>
//                         <PolarGrid stroke="#cbd5e1" strokeOpacity={0.3} />
//                         <PolarAngleAxis dataKey="skill" stroke="#64748b" tick={{ fontSize: 12 }} />
//                         <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
//                         <Radar name="Your Score" dataKey="value" stroke="#818cf8" fill="#818cf8" fillOpacity={0.3} />
//                         <Tooltip />
//                       </RadarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="bg-gradient-to-r from-[#818cf8] to-[#a78bfa] rounded-[2rem] p-6 shadow-xl text-white"
//                 >
//                   <div className="mb-4">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
//                       <FiZap className="text-3xl" />
//                     </div>
//                     <h3 className="text-2xl font-bold mb-2">Ready for Practice?</h3>
//                     <p className="text-indigo-100 text-sm mb-6">
//                       {percent >= 70 
//                         ? "You're ready! Start your mock interview practice now."
//                         : `Complete ${70 - percent}% more to unlock practice mode`}
//                     </p>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleStartPractice}
//                     className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
//                       percent >= 70 
//                         ? "bg-white text-indigo-600 hover:shadow-lg" 
//                         : "bg-slate-200/30 text-white/70 cursor-not-allowed"
//                     }`}
//                     disabled={percent < 70}
//                   >
//                     <FiPlay /> Start Practice
//                   </motion.button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}

//           {/* ANALYTICS TAB */}
//           {activeTab === "analytics" && (
//             <motion.div
//               key="analytics"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="space-y-8"
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60">
//                   <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
//                     <FiTrendingUp className="text-indigo-500" />
//                     Learning Progress Trend
//                   </h3>
//                   <div className="h-80">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={weeklyProgress}>
//                         <defs>
//                           <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
//                             <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
//                         <XAxis dataKey="day" stroke="#94a3b8" />
//                         <YAxis stroke="#94a3b8" />
//                         <Tooltip />
//                         <Area type="monotone" dataKey="completed" stroke="#818cf8" fillOpacity={1} fill="url(#colorProgress)" />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60">
//                   <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
//                     <FiActivity className="text-indigo-500" />
//                     Performance Metrics
//                   </h3>
//                   <div className="space-y-6">
//                     <div>
//                       <div className="flex justify-between mb-2">
//                         <span className="text-sm font-medium text-slate-600">Theory Completion</span>
//                         <span className="text-sm font-bold text-indigo-600">
//                           {user?.progress?.filter(p => p.theoryDone).length || 0}/{user?.progress?.length || 0}
//                         </span>
//                       </div>
//                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                         <motion.div 
//                           initial={{ width: 0 }}
//                           animate={{ width: `${((user?.progress?.filter(p => p.theoryDone).length || 0) / (user?.progress?.length || 1)) * 100}%` }}
//                           className="h-full bg-gradient-to-r from-[#818cf8] to-[#a78bfa] rounded-full"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between mb-2">
//                         <span className="text-sm font-medium text-slate-600">Practice Completion</span>
//                         <span className="text-sm font-bold text-indigo-600">
//                           {user?.progress?.filter(p => p.practiceDone).length || 0}/{user?.progress?.length || 0}
//                         </span>
//                       </div>
//                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                         <motion.div 
//                           initial={{ width: 0 }}
//                           animate={{ width: `${((user?.progress?.filter(p => p.practiceDone).length || 0) / (user?.progress?.length || 1)) * 100}%` }}
//                           className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* ROADMAP TAB */}
//           {activeTab === "roadmap" && (
//             <motion.div
//               key="roadmap"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               className="space-y-6"
//             >
//               {loadingRoadmap ? (
//                 <div className="flex items-center justify-center h-96">
//                   <div className="text-center bg-white/40 backdrop-blur-xl rounded-[2rem] p-12">
//                     <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-slate-500">Generating your personalized roadmap...</p>
//                   </div>
//                 </div>
//               ) : roadmap?.roadmap?.length > 0 ? (
//                 <>
//                   <div className="bg-gradient-to-r from-[#818cf8] to-[#a78bfa] rounded-[2rem] p-6 text-white">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-2xl font-bold mb-2">Your Learning Roadmap</h3>
//                         <p className="text-indigo-100">Estimated completion: {roadmap.totalEstimatedDays} days</p>
//                       </div>
//                       <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
//                         <FiClock className="text-3xl" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 gap-4">
//                     {roadmap.roadmap.map((item, index) => {
//                       const progressItem = user?.progress?.find((p) => p.topic === item.topic);
//                       const isTheoryDone = progressItem?.theoryDone;
//                       const isPracticeDone = progressItem?.practiceDone;
//                       const itemProgress = ((isTheoryDone ? 1 : 0) + (isPracticeDone ? 1 : 0)) / 2 * 100;

//                       return (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 hover:shadow-xl transition-all"
//                         >
//                           <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                             <div className="flex-1">
//                               <div className="flex items-center gap-3 mb-3 flex-wrap">
//                                 <span className="text-2xl font-bold text-indigo-500">#{index + 1}</span>
//                                 <h4 className="font-bold text-slate-800 text-lg">{item.topic}</h4>
//                                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                   item.priority === "High" ? "bg-red-100 text-red-600" :
//                                   item.priority === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
//                                 }`}>
//                                   {item.priority} Priority
//                                 </span>
//                               </div>
                              
//                               <div className="mb-4">
//                                 <div className="flex justify-between mb-1">
//                                   <span className="text-xs text-slate-500">Progress</span>
//                                   <span className="text-xs font-bold text-indigo-600">{itemProgress}%</span>
//                                 </div>
//                                 <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                                   <motion.div 
//                                     initial={{ width: 0 }}
//                                     animate={{ width: `${itemProgress}%` }}
//                                     className="h-full bg-gradient-to-r from-[#818cf8] to-[#a78bfa] rounded-full"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="flex flex-wrap gap-2 mb-4">
//                                 {item.resources?.slice(0, 2).map((res, i) => (
//                                   <a 
//                                     key={i} 
//                                     href={res.link} 
//                                     target="_blank" 
//                                     rel="noreferrer"
//                                     className="text-indigo-500 hover:text-indigo-600 text-sm font-medium flex items-center gap-1"
//                                   >
//                                     <FiBook className="text-xs" /> {res.title}
//                                   </a>
//                                 ))}
//                                 {item.resources?.length > 2 && (
//                                   <span className="text-xs text-slate-400">+{item.resources.length - 2} more</span>
//                                 )}
//                               </div>
//                             </div>

//                             <div className="flex gap-2">
//                               {!isTheoryDone ? (
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => markComplete(item.topic, "theory")}
//                                   className="px-4 py-2 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all"
//                                 >
//                                   Mark Theory Done
//                                 </motion.button>
//                               ) : (
//                                 <div className="px-4 py-2 bg-green-100 text-green-600 rounded-xl text-sm font-bold flex items-center gap-1">
//                                   <FiCheckCircle /> Theory
//                                 </div>
//                               )}

//                               {!isPracticeDone ? (
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => markComplete(item.topic, "practice")}
//                                   className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all"
//                                 >
//                                   Mark Practice Done
//                                 </motion.button>
//                               ) : (
//                                 <div className="px-4 py-2 bg-green-100 text-green-600 rounded-xl text-sm font-bold flex items-center gap-1">
//                                   <FiCheckCircle /> Practice
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center py-20 bg-white/40 backdrop-blur-xl rounded-[2rem]">
//                   <FiBook className="text-6xl text-slate-300 mx-auto mb-4" />
//                   <p className="text-slate-400">No roadmap generated yet</p>
//                   <button onClick={handleRoadmap} className="mt-4 text-indigo-500 font-semibold">Generate Roadmap</button>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Bottom Action Buttons */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="flex flex-col md:flex-row gap-4 pt-8 mt-8 border-t border-white/40"
//         >
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleStartPractice}
//             className="flex-1 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
//           >
//             <FiPlay className="group-hover:animate-pulse" />
//             Start Interview Practice
//           </motion.button>
          
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => navigate("/interview")}
//             className="flex-1 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
//           >
//             <FiGlobe className="group-hover:animate-spin" style={{ animationDuration: "3s" }} />
//             Start AI Mock Interview
//           </motion.button>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;