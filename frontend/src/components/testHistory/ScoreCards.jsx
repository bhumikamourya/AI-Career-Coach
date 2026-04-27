import { motion } from "framer-motion";

const Card = ({ label, value, type }) => {
  const styles = {
    score: {
      text: "text-[#9689ff]",
      bg: "bg-[#9689ff]/10",
    },
    readiness: {
      text: "text-[#a78bfa]",
      bg: "bg-[#a78bfa]/10",
    },
    correct: {
      text: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    wrong: {
      text: "text-rose-600",
      bg: "bg-rose-100",
    },
  };

  const style = styles[type];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="relative overflow-hidden bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-xl"
    >
      {/* subtle glow */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-30 ${style.bg}`} />

      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
        {label}
      </p>

      <p className={`text-3xl font-black leading-none ${style.text}`}>
        {value}
      </p>
    </motion.div>
  );
};

const ScoreCards = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Card
        label="Score"
        value={`${data.percentage}%`}
        type="score"
      />

      <Card
        label="Readiness"
        value={`${data.readinessScore}%`}
        type="readiness"
      />

      <Card
        label="Correct"
        value={data.correct}
        type="correct"
      />

      <Card
        label="Wrong"
        value={data.wrong}
        type="wrong"
      />
    </div>
  );
};

export default ScoreCards;