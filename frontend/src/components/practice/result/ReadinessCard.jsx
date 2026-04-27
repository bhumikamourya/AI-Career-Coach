import { motion } from "framer-motion";

const ReadinessCard = ({ score }) => {
  if (score === undefined) return null;

  const isGood = score >= 70;

  const safeScore = Math.min(Math.max(score, 0), 100);

  const radius = 40;
  const center = 50;
  const strokeWidth = 8; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * safeScore) / 100;

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">

      {/* Glow */}
      <div
        className={`absolute top-[-30%] right-[-10%] w-[250px] h-[250px] rounded-full blur-[90px] opacity-40 ${
          isGood ? "bg-emerald-200" : "bg-rose-200"
        }`}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-extrabold text-[#3b3a4a]">
          Readiness Score
        </h3>
        <span className="text-xs font-bold text-slate-400">
          AI Evaluation
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* ✅ IMPROVED CIRCLE */}
        <div className="relative w-32 h-32 flex items-center justify-center">

          <svg viewBox="0 0 100 100" className="w-full h-full">

            {/* Background */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Progress */}
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              stroke={isGood ? "#10b981" : "#f43f5e"}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1 }}
            />
          </svg>

          {/*  CENTER TEXT (FIXED SPACING) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black text-[#3b3a4a] tracking-tight">
              {safeScore}%
            </span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-2xl font-extrabold text-[#3b3a4a]">
            {isGood ? "Interview Ready 🚀" : "Needs Improvement"}
          </p>

          <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
            {isGood
              ? "Your performance meets the expected threshold. You can confidently move to interviews."
              : "You need more practice before attempting interviews. Focus on weak areas to improve your score."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReadinessCard;