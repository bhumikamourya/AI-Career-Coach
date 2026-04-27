import { FiCpu } from "react-icons/fi";

const AIInsightCard = ({ aiInsight }) => {
  if (!aiInsight) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FiCpu className="text-indigo-500" />
          AI Coach Insight
        </h3>

        <p className="mt-3 text-sm text-slate-400 animate-pulse">
          Analyzing your progress...
        </p>
      </div>
    );
  }

  return (
    <>

      {/* HEADER */}
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <FiCpu className="text-indigo-500" />
        AI Coach Insight
      </h3>

      {/* SUMMARY (PRIMARY) */}
      <p className="mt-4 text-base font-medium text-slate-900 leading-snug">
        {aiInsight.summary}
      </p>

      {/* PROBLEM */}
      {aiInsight.problem && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100">
          <p className="text-xs font-semibold text-red-500">
            Problem
          </p>
          <p className="text-sm text-red-700 mt-1">
            {aiInsight.problem}
          </p>
        </div>
      )}

      {/* STRATEGY */}
      {aiInsight.strategy && (
        <div className="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-500">
            Next Step
          </p>
          <p className="text-sm text-indigo-700 mt-1">
            {aiInsight.strategy}
          </p>
        </div>
      )}

      {/* MOTIVATION */}
      {aiInsight.motivation && (
        <p className="mt-4 text-xs text-slate-400 italic">
          {aiInsight.motivation}
        </p>
      )}

      
</>
  );
};

export default AIInsightCard;