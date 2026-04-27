import { motion } from "framer-motion";

const getLevelStyle = (level) => {
  if (level === "Advanced") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }
  if (level === "Intermediate") {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }
  return "bg-rose-100 text-rose-700 border-rose-200";
};

const EvaluatedSkills = ({ skills }) => {
  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-extrabold text-[#3b3a4a]">
          AI Skill Evaluation
        </h3>
        <span className="text-xs text-slate-400 font-bold">
          {skills?.length || 0} Skills
        </span>
      </div>

      {/* CONTENT */}
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`px-4 py-2 rounded-xl text-sm font-bold border shadow-sm flex items-center gap-2 ${getLevelStyle(
                s.level
              )}`}
            >
              <span>{s.name}</span>
              <span className="text-xs opacity-70">•</span>
              <span className="text-xs">{s.level}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100px]">
          <p className="text-sm text-slate-400 italic">
            No evaluation available
          </p>
        </div>
      )}
    </div>
  );
};

export default EvaluatedSkills;