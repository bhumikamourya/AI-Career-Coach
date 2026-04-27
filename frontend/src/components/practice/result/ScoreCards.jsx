import { motion } from "framer-motion";

const Card = ({ label, value, color, glow, highlight }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className={`relative bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-lg overflow-hidden transition-all ${
      highlight ? "ring-2 ring-[#9689ff]/20" : ""
    }`}
  >

    {/* Glow */}
    <div
      className={`absolute top-[-40%] right-[-20%] w-[180px] h-[180px] rounded-full blur-[80px] opacity-40 ${glow}`}
    />

    {/* Content */}
    <div className="relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
        {label}
      </p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${
          highlight ? "text-3xl" : "text-2xl"
        } font-black ${color}`}
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
);

const ScoreCards = ({ result }) => {
  if (!result) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

      {/* TOTAL (least priority) */}
      <Card
        label="Total"
        value={result.total}
        color="text-slate-600"
        glow="bg-slate-200"
      />

      {/* CORRECT */}
      <Card
        label="Correct"
        value={result.correct}
        color="text-emerald-600"
        glow="bg-emerald-200"
      />

      {/* WRONG */}
      <Card
        label="Wrong"
        value={result.wrong}
        color="text-rose-500"
        glow="bg-rose-200"
      />

      {/* SCORE (highlighted) */}
      <Card
        label="Score"
        value={`${result.percentage}%`}
        color="text-[#9689ff]"
        glow="bg-purple-200"
        highlight
      />

    </div>
  );
};

export default ScoreCards;