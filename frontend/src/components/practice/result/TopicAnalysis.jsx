import { motion } from "framer-motion";

const TopicAnalysis = ({ stats }) => {
  if (!stats) return null;

  const getPerformance = (correct, total) => {
    const percent = (correct / total) * 100;
    if (percent >= 75) return "good";
    if (percent >= 50) return "average";
    return "weak";
  };

  const getColor = (type) => {
    if (type === "good") return "bg-emerald-500";
    if (type === "average") return "bg-amber-400";
    return "bg-rose-500";
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-30%] left-[-10%] w-[250px] h-[250px] bg-indigo-200 rounded-full blur-[100px] opacity-40" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-[#3b3a4a]">
          Topic Analysis
        </h3>
        <span className="text-xs font-bold text-slate-400">
          Performance Breakdown
        </span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {Object.entries(stats).map(([topic, data], i) => {
          const percent = Math.round((data.correct / data.total) * 100);
          const performance = getPerformance(data.correct, data.total);

          return (
            <motion.div
              key={topic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="space-y-2"
            >
              {/* Top Row */}
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-[#3b3a4a]">
                  {topic}
                </span>
                <span className="text-slate-500 font-medium">
                  {data.correct}/{data.total} ({percent}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${getColor(performance)}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicAnalysis;