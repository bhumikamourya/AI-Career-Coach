import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiTarget,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const Card = ({ label, value, type }) => {

  const styles = {

    score: {
      text: "text-[#7c6cff]",
      bg: "from-[#9689ff]/20 to-[#c4b5fd]/10",
      border: "border-[#9689ff]/20",
      icon: <FiTrendingUp />,
      glow: "shadow-[#9689ff]/20",
    },

    readiness: {
      text: "text-[#7c6cff]",
      bg: "from-[#a78bfa]/20 to-[#ddd6fe]/10",
      border: "border-[#a78bfa]/20",
      icon: <FiTarget />,
      glow: "shadow-[#a78bfa]/20",
    },

    correct: {
      text: "text-[#7c6cff]",
      bg: "from-[#9689ff]/20 to-[#c4b5fd]/10",
      border: "border-[#9689ff]/20",
      icon: <FiCheckCircle />,
      glow: "shadow-emerald-200/40",
    },

    wrong: {
      text: "text-[#7c6cff]",
      bg: "from-[#f9a8d4]/20 to-[#f48fb1]/10",
      border: "border-[#f9a8d4]/20",
      icon: <FiXCircle />,
      glow: "shadow-[#f9a8d4]/20",
    },

  };

  const style = styles[type];

  return (

    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        type: "spring",
        stiffness: 120,
      }}

      className={`
        relative overflow-hidden
        rounded-[2rem]
        border
        ${style.border}
        bg-white/60
        backdrop-blur-2xl
        p-6
        shadow-xl
        ${style.glow}
      `}
    >

      {/* GRADIENT OVERLAY */}
      <div
        className={`
          absolute inset-0
          bg-gradient-to-br
          ${style.bg}
          opacity-70
        `}
      />

      {/* TOP GLOW */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/30 rounded-full blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* ICON + LABEL */}
        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
              {label}
            </p>

          </div>

          <div
            className={`
              w-11 h-11 rounded-2xl
              flex items-center justify-center
              text-lg
              ${style.text}
              bg-white/70
              shadow-md
            `}
          >
            {style.icon}
          </div>

        </div>

        {/* VALUE */}
        <div className="flex items-end gap-1">

          <p
            className={`
              text-3xl md:text-4xl
              font-black
              leading-none
              tracking-tight
              ${style.text}
            `}
          >
            {value}
          </p>

        </div>

        {/* BOTTOM LINE */}
        <div className="mt-5 w-full h-[5px] rounded-full bg-white/40 overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ duration: 1 }}
            className={`
              h-full rounded-full
              bg-gradient-to-r
              ${
                type === "wrong"
                  ? "from-[#9689ff] to-[#ffbe94]"
                  : type === "correct"
                  ? "from-[#9689ff] to-[#ffbe94]"
                  : "from-[#9689ff] to-[#ffbe94]"
              }
            `}
          />

        </div>

      </div>

    </motion.div>

  );
};

const ScoreCards = ({ data }) => {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

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