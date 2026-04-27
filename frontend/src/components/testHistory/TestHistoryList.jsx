import TestHistoryCard from "./TestHistoryCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TestHistoryList = ({ history, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">

      {/* HEADER (ProfilePage style) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div>
          <h1 className="text-4xl font-extrabold text-[#3b3a4a] tracking-tight">
            Test History
          </h1>
          <p className="text-slate-500 font-medium italic">
            Track your progress and performance over time
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-xl shadow-lg hover:brightness-105 transition"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-xl border border-white/60 p-10 rounded-[2.5rem] shadow-xl text-center"
        >
          <p className="text-slate-400 text-sm font-semibold italic mb-4">
            No test attempts yet
          </p>

          <button
            onClick={() => navigate("/practice")}
            className="px-6 py-3 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-xl shadow-lg hover:brightness-105 transition"
          >
            Take Your First Test
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {history.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TestHistoryCard
                item={item}
                index={history.length - i}
                onClick={() => onSelect(item)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestHistoryList;