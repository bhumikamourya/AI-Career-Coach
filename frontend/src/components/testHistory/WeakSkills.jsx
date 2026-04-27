import { motion, AnimatePresence } from "framer-motion";

const WeakSkills = ({ skills }) => {
  const hasSkills = skills && skills.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-extrabold text-[#3b3a4a]">
          Weak Areas
        </h3>

        {hasSkills && (
          <span className="text-xs font-bold text-rose-500 bg-rose-100 px-3 py-1 rounded-full">
            Needs Attention
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-wrap gap-2 min-h-[20px]">
        <AnimatePresence>
          {hasSkills ? (
            skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm bg-rose-100 text-rose-700 hover:bg-rose-200 transition-all"
              >
                {skill}

                {/* subtle hover dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </motion.span>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center w-full text-center"
            >
              <p className="text-sm text-emerald-600 font-semibold">
                🎉 No weak areas — you’re doing great!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WeakSkills;