import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

const ReadinessCard = ({ score }) => {

  const getStatus = () => {
    if (score >= 70) return "Interview Ready";
    if (score >= 50) return "Almost Ready";
    return "Needs Improvement";
  };

  const getColor = () => {
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getBarColor = () => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getAction = () => {
    if (score >= 70) return "You can start giving interviews";
    if (score >= 50) return "Improve weak areas to reach readiness";
    return "Focus on fundamentals before testing";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={` flex flex-col`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 >Readiness Score</h3>
        <FiTrendingUp className="text-indigo-500" />
      </div>

      {/* SCORE + STATUS */}
      <div className="mt-4 flex items-end justify-between">
        <p className="text-3xl font-bold text-slate-800">
          {score}%
        </p>

        <span className={`text-sm font-semibold ${getColor()}`}>
          {getStatus()}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full mt-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8 }}
          className={`h-2.5 rounded-full ${getBarColor()}`}
        />
      </div>

      {/* ACTION INSIGHT */}
      <p className="mt-4 text-sm text-indigo-600 font-medium">
        👉 {getAction()}
      </p>

      {/* FOOTER CONTEXT */}
      <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
        <span>
          Target: <strong className="text-slate-700">70%+</strong>
        </span>
      </div>

    </motion.div>
  );
};

export default ReadinessCard;