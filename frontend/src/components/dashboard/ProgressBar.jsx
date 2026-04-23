import { motion } from "framer-motion";
import { glassCard } from "../../styles/cardStyles";

const ProgressBar = ({ percent }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={glassCard}
  >
    <p className="text-slate-500 text-sm">Overall Progress</p>

    <div className="w-full bg-slate-200 h-3 rounded-full mt-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        className="bg-gradient-to-r from-indigo-400 to-purple-400 h-3 rounded-full"
      />
    </div>

    <p className="mt-2 font-bold text-indigo-600">{percent}%</p>
  </motion.div>
);

export default ProgressBar;