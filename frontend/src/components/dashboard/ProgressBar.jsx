import { motion } from "framer-motion";

const ProgressBar = ({ percent }) => {

  const getStatus = () => {
    if (percent >= 80) return "On Track";
    if (percent >= 50) return "Making Progress";
    return "Needs Focus";
  };

  return (
    <>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 blur-2xl rounded-full" />

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">
          Progress
        </p>

        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
          {getStatus()}
        </span>
      </div>

      {/* MAIN VISUAL */}
      <div className="mt-6 flex items-center justify-between">

        {/* LEFT: BIG % */}
        <div>
          <p className="text-4xl font-bold text-slate-800 tracking-tight">
            {percent}
            <span className="text-lg text-slate-400">%</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            completion
          </p>
        </div>

        {/* RIGHT: MINI PROGRESS RING */}
        <div className="relative w-16 h-16">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#e5e7eb"
              strokeWidth="5"
              fill="none"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="5"
              fill="none"
              strokeDasharray={175}
              strokeDashoffset={175 - (175 * percent) / 100}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 175 }}
              animate={{ strokeDashoffset: 175 - (175 * percent) / 100 }}
              transition={{ duration: 0.8 }}
            />
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>

      {/* PROGRESS BAR (SECONDARY) */}
      <div className="mt-6">
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </div>
      </div>

    </>
  );
};

export default ProgressBar;