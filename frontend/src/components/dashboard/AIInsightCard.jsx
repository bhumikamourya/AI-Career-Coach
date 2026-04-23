import { motion } from "framer-motion";

const AIInsightCard = ({ aiInsight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 
      border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        🤖 AI Mentor Insight
      </h3>

      {!aiInsight ? (
        <p className="text-indigo-500 animate-pulse">
          ⚡ Generating personalized insight...
        </p>
      ) : (
        <div className="space-y-3 text-sm text-slate-600">

          <p>
            <span className="font-semibold text-slate-800">📊 Summary:</span>{" "}
            {aiInsight.summary}
          </p>

          <p>
            <span className="font-semibold text-slate-800">🎯 Why It Matters:</span>{" "}
            {aiInsight.whyItMatters}
          </p>

          <div>
            <span className="font-semibold text-slate-800">📚 Learning Path:</span>
            <ul className="list-disc ml-5 mt-1">
              {aiInsight.learningOrder?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-semibold text-slate-800">🔥 Priority Skills:</span>
            {aiInsight.prioritySkills?.map((s, i) => (
              <p key={i}>{s.name} → {s.reason}</p>
            ))}
          </div>


          <div className="mt-2">
            <strong className="font-semibold text-slate-800">⚡ Difficulty:</strong>
            {aiInsight.difficulty?.map((d, i) => (
              <p key={i} className="text-sm">
                {d.name} ({d.level})
              </p>
            ))}
          </div>

          <p className="mt-3 font-semibold text-indigo-600">
            {aiInsight.motivation}
          </p>

        </div>
      )}
    </motion.div>
  );
};

export default AIInsightCard;