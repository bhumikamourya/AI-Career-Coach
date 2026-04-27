import { motion } from "framer-motion";

const WeakAreas = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-30%] right-[-10%] w-[250px] h-[250px] bg-rose-200 rounded-full blur-[100px] opacity-40" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-[#3b3a4a]">
          Needs Improvement
        </h3>
        <span className="text-xs font-bold text-slate-400">
          Focus Areas
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="px-4 py-2 rounded-xl bg-rose-100 text-rose-700 text-sm font-bold border border-rose-200 shadow-sm"
          >
            {skill}
          </motion.div>
        ))}
      </div>

      {/* Insight Message */}
      <div className="mt-6 p-4 bg-white/60 border border-white rounded-2xl text-sm text-slate-600">
        These topics are holding back your performance. Focus on them first to improve your readiness score faster.
      </div>
    </div>
  );
};

export default WeakAreas;