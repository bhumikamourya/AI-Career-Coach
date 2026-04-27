import { motion } from "framer-motion";

const Recommendations = ({ list }) => {
  if (!list || list.length === 0) return null;

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-30%] left-[-10%] w-[250px] h-[250px] bg-indigo-200 rounded-full blur-[100px] opacity-40" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-[#3b3a4a]">
          AI Recommendations
        </h3>
        <span className="text-xs font-bold text-slate-400">
          Personalized Insights
        </span>
      </div>

      {/* List */}
      <div className="space-y-3">
        {list.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-4 bg-white/60 rounded-2xl border border-white hover:shadow-sm transition-all"
          >
            {/* Bullet Icon */}
            <div className="mt-1 w-2 h-2 rounded-full bg-[#9689ff]" />

            {/* Text */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {r}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;