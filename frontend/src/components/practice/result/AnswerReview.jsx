import { motion } from "framer-motion";

const AnswerReview = ({ answers }) => {
  if (!answers || answers.length === 0) return null;

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-extrabold text-[#3b3a4a]">
          Answer Review
        </h3>
        <span className="text-xs text-slate-400 font-bold">
          {answers.length} Questions
        </span>
      </div>

      {/* COLLAPSIBLE */}
      <details className="group cursor-pointer">
        <summary className="text-[#9689ff] font-bold text-sm flex items-center justify-between">
          View Detailed Answers
          <span className="group-open:rotate-180 transition-transform">⌄</span>
        </summary>

        {/* ANSWERS LIST */}
        <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {answers.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-5 rounded-2xl border shadow-sm ${
                item.isCorrect
                  ? "bg-emerald-50/60 border-emerald-200"
                  : "bg-rose-50/60 border-rose-200"
              }`}
            >
              {/* QUESTION */}
              <p className="font-bold text-[#3b3a4a] mb-2 text-sm">
                Q{i + 1}. {item.question}
              </p>

              {/* USER ANSWER */}
              <p className="text-sm">
                Your Answer:{" "}
                <span
                  className={`font-bold ${
                    item.isCorrect
                      ? "text-emerald-600"
                      : "text-rose-500"
                  }`}
                >
                  {item.selected}
                </span>
              </p>

              {/* CORRECT ANSWER */}
              {!item.isCorrect && (
                <p className="text-sm mt-1">
                  Correct Answer:{" "}
                  <span className="text-emerald-600 font-bold">
                    {item.correct}
                  </span>
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default AnswerReview;