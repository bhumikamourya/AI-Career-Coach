import { motion } from "framer-motion";
import { FiPlay, FiGlobe, FiClock } from "react-icons/fi";

const ActionButtons = ({ onPractice, onInterview, navigate }) => (
  <div className="flex flex-col md:flex-row gap-4">

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onPractice}
      className="flex-1 bg-gradient-to-r from-orange-400 to-red-400 
      text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
    >
      <FiPlay /> Start Mock Test
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onInterview}
      className="flex-1 bg-gradient-to-r from-indigo-400 to-purple-400 
      text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
    >
      <FiGlobe /> AI Interview
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/practice-history")}
      className="flex-1 bg-white/40 backdrop-blur border border-white/60 
      text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
    >
      <FiClock /> History
    </motion.button>

  </div>
);

export default ActionButtons;