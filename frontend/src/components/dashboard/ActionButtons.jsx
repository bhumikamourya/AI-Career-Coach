import { motion } from "framer-motion";
import { FiPlay, FiGlobe, FiClock } from "react-icons/fi";

const ActionButtons = ({ onPractice, onInterview, navigate }) => {
  const baseBtn =
    "flex-1 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md";

  return (
    <div className="flex flex-col md:flex-row gap-4">

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onPractice}
        className={`${baseBtn} bg-gradient-to-r from-orange-400 to-red-400 text-white`}
      >
        <FiPlay /> Mock Test
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onInterview}
        className={`${baseBtn} bg-gradient-to-r from-indigo-400 to-purple-400 text-white`}
      >
        <FiGlobe /> AI Interview
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/practice-history")}
        className={`${baseBtn} bg-white/30 backdrop-blur border border-white/50 text-slate-700`}
      >
        <FiClock /> History
      </motion.button>

    </div>
  );
};

export default ActionButtons;