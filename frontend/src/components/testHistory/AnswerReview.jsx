import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnswerReview = ({ answers }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-extrabold text-[#3b3a4a]">
          Answer Review
        </h3>

        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-1.5 text-sm font-bold rounded-xl bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
        >
          {open ? "Hide" : "View"}
        </button>
      </div>

      {/* CONTENT */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {answers.map((a, i) => {
              const isCorrect = a.isCorrect;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-5 rounded-2xl bg-white/60 border border-white shadow-sm"
                >
                  {/* QUESTION */}
                  <p className="font-bold text-[#3b3a4a] mb-2">
                    Q{i + 1}. {a.question}
                  </p>

                  {/* USER ANSWER */}
                  <p className="text-sm">
                    <span className="font-semibold text-slate-500">
                      Your Answer:
                    </span>{" "}
                    <span
                      className={`font-bold ${
                        isCorrect
                          ? "text-green-600"
                          : "text-[#ff8a8a]"
                      }`}
                    >
                      {a.selected}
                    </span>
                  </p>

                  {/* CORRECT ANSWER */}
                  {!isCorrect && (
                    <p className="text-sm mt-1">
                      <span className="font-semibold text-slate-500">
                        Correct Answer:
                      </span>{" "}
                      <span className="font-bold text-green-600">
                        {a.correct}
                      </span>
                    </p>
                  )}

                  {/* STATUS BADGE */}
                  <div className="mt-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isCorrect
                          ? "bg-green-100 text-green-600"
                          : "bg-rose-100 text-rose-500"
                      }`}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <p className="text-sm text-slate-400 italic">
          Click "View" to analyze your answers
        </p>
      )}
    </motion.div>
  );
};

export default AnswerReview;