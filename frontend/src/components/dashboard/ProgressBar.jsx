import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const ProgressBar = ({ percent }) => {

  const getStatus = () => {
    if (percent >= 80) return "On Track";
    if (percent >= 50) return "Making Progress";
    return "Needs Focus";
  };

  // Dynamic radar data based on backend percent
  const radarData = [
    {
      subject: "Skills",
      value: Math.max(percent - 10, 20),
    },
    {
      subject: "Projects",
      value: Math.max(percent - 15, 15),
    },
    {
      subject: "Practice",
      value: Math.max(percent - 5, 25),
    },
    {
      subject: "Interview",
      value: Math.max(percent - 20, 10),
    },
    {
      subject: "Readiness",
      value: percent,
    },
  ];

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
      <div className="mt-6 flex items-center justify-between gap-4">

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

        {/* RIGHT: RADAR CHART */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-40 h-32"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              
              <PolarGrid stroke="#d8d4fe" />

              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 9, fill: "#64748b" }}
              />

              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />

              <Radar
                name="Progress"
                dataKey="value"
                stroke="#818cf8"
                fill="#a78bfa"
                fillOpacity={0.45}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

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