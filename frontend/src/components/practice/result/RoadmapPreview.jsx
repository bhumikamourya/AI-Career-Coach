import { motion } from "framer-motion";

const RoadmapPreview = ({ roadmap }) => {
  if (!roadmap || roadmap.length === 0) return null;

  const getPriorityStyle = (priority) => {
    if (priority === "High") return "text-rose-600 bg-rose-100";
    if (priority === "Medium") return "text-amber-700 bg-amber-100";
    return "text-emerald-700 bg-emerald-100";
  };

  const getStatusStyle = (status) => {
    if (status === "Pending") return "text-slate-500";
    if (status === "In Progress") return "text-indigo-600";
    return "text-emerald-600";
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-30%] right-[-10%] w-[250px] h-[250px] bg-purple-200 rounded-full blur-[100px] opacity-40" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-[#3b3a4a]">
          AI Generated Roadmap
        </h3>
        <span className="text-xs font-bold text-slate-400">
          Next Focus Areas
        </span>
      </div>

      {/* List */}
      <div className="space-y-3">
        {roadmap.slice(0, 5).map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex justify-between items-center p-4 bg-white/60 rounded-2xl border border-white hover:shadow-sm transition-all"
          >
            {/* LEFT */}
            <div>
              <p className="font-semibold text-[#3b3a4a]">
                {item.topic}
              </p>
              <p className={`text-xs mt-1 ${getStatusStyle(item.status)}`}>
                {item.status}
              </p>
            </div>

            {/* RIGHT */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityStyle(item.priority)}`}
            >
              {item.priority}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPreview;