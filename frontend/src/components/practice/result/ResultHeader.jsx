import { motion } from "framer-motion";

const ResultHeader = ({ result }) => {
  if (!result) return null;

  const isGood = result.readinessScore >= 70;

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">

      {/* Glow Background */}
      <div
        className={`absolute top-[-40%] left-[-10%] w-[300px] h-[300px] rounded-full blur-[110px] opacity-40 ${
          isGood ? "bg-emerald-200" : "bg-rose-200"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        {/* LEFT */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-[#3b3a4a]"
          >
            Test Completed 🎯
          </motion.h2>

          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Your AI evaluation is ready. Review your performance and improve strategically.
          </p>

          <p className="text-xs text-slate-400 mt-3 font-medium">
            Total Questions: {result.total}
          </p>
        </div>

        {/* RIGHT STATS BADGE */}
        <div className="flex items-center gap-4">

          <div className="bg-white/70 border border-white px-5 py-3 rounded-2xl shadow-sm text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              Score
            </p>
            <p className="text-xl font-black text-[#9689ff]">
              {result.percentage}%
            </p>
          </div>

          <div className="bg-white/70 border border-white px-5 py-3 rounded-2xl shadow-sm text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
              Readiness
            </p>
            <p className={`text-xl font-black ${isGood ? "text-emerald-600" : "text-rose-500"}`}>
              {result.readinessScore}%
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultHeader;