import { motion } from "framer-motion";

const getStatus = (score) => {
  if (score >= 75)
    return {
      text: "Interview Ready",
      color: "text-emerald-700",
      bg: "bg-emerald-100",
    };

  if (score >= 50)
    return {
      text: "Improving",
      color: "text-amber-700",
      bg: "bg-amber-100",
    };

  return {
    text: "Needs Work",
    color: "text-rose-700",
    bg: "bg-rose-100",
  };
};

const TestHistoryCard = ({ item, index, onClick }) => {
  const status = getStatus(item.readinessScore);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ type: "spring", stiffness: 180 }}
      onClick={onClick}
      className="relative bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2rem] p-6 shadow-xl cursor-pointer overflow-hidden"
    >
      {/* 🔥 Gradient blob (same as ProfilePage style) */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#d9d4ff] to-[#ffecde] opacity-40 rounded-bl-full blur-2xl"></div>

      <div className="relative z-10 flex justify-between items-start gap-4">

        {/* LEFT */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Attempt
          </p>

          <h3 className="text-xl font-extrabold text-[#3b3a4a]">
            #{index}
          </h3>

          <p className="text-xs text-slate-500">
            {new Date(item.createdAt).toLocaleString()}
          </p>

          {/* STATUS */}
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm ${status.bg} ${status.color}`}
          >
            {status.text}
          </span>

          {/* WEAK SKILLS */}
          {item.weakSkillsSnapshot?.length > 0 && (
            <p className="text-xs text-slate-500 mt-2">
              Weak:{" "}
              <span className="font-semibold text-rose-500">
                {item.weakSkillsSnapshot.slice(0, 3).join(", ")}
              </span>
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="text-right space-y-1">
          <p className="text-3xl font-black text-[#9689ff] leading-none">
            {item.percentage}%
          </p>

          <p className="text-xs font-bold text-[#ffbe94]">
            {item.readinessScore}% READY
          </p>

          {/* CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent parent click conflict
              onClick();
            }}
            className="mt-3 px-4 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white shadow-md hover:brightness-105 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TestHistoryCard;