import { motion } from "framer-motion";
import { glassCard, titleStyle } from "../../styles/cardStyles";

const ReadinessCard = ({ score }) => {
  const color =
    score >= 70
      ? "from-green-400 to-emerald-500"
      : score >= 50
      ? "from-yellow-400 to-orange-400"
      : "from-red-400 to-pink-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={glassCard}
    >
      <h3 className={titleStyle}>Readiness Score</h3>

      <div className="w-full bg-slate-200 h-3 rounded-full mt-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className={`h-3 rounded-full bg-gradient-to-r ${color}`}
        />
      </div>

      <p className="mt-3 text-xl font-bold text-indigo-600">
        {score}%
      </p>

      <p className="text-sm text-slate-500 mt-1">
        {score >= 70
          ? "🚀 Interview Ready"
          : score >= 50
          ? "⚡ Almost Ready"
          : "⚠ Needs Improvement"}
      </p>
    </motion.div>
  );
};

export default ReadinessCard;