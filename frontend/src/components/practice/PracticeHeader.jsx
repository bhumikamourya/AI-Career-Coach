import { motion } from "framer-motion";

const PracticeHeader = ({ index, total }) => {
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-lg">

      {/* TOP ROW */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-[#3b3a4a]">
          AI Skill Assessment
        </span>

        <span className="text-sm font-black text-[#9689ff]">
          {index + 1} / {total}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#9689ff] to-[#ffbe94]"
        />
      </div>

    </div>
  );
};

export default PracticeHeader;