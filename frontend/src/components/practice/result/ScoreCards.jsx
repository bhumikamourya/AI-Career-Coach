import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiXCircle,
  FiTarget,
  FiLayers,
} from "react-icons/fi";

const Card = ({
  label,
  value,
  color,
  glow,
  icon,
  highlight,
  iconBg,
}) => (

  <motion.div

    whileHover={{
      y: -5,
      scale: 1.02,
    }}

    transition={{
      type: "spring",
      stiffness: 180,
    }}

    className={`
      group
      relative
      overflow-hidden
      rounded-[2rem]
      border border-white/60
      bg-white/50
      backdrop-blur-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      p-5 md:p-6
      transition-all
      ${
        highlight
          ? "ring-2 ring-[#9689ff]/20"
          : ""
      }
    `}
  >

    {/* GRADIENT GLOW */}
    <div
      className={`
        absolute
        top-[-35%]
        right-[-15%]
        w-[180px]
        h-[180px]
        rounded-full
        blur-[80px]
        opacity-40
        ${glow}
      `}
    />

    {/* TOP ROW */}
    <div className="relative z-10 flex items-start justify-between">

      {/* LABEL */}
      <div>

        <p
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.22em]
            text-slate-400
          "
        >
          {label}
        </p>

        <motion.p

          initial={{
            opacity: 0,
            y: 10,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.05,
          }}

          className={`
            mt-3
            font-black
            leading-none
            tracking-tight
            ${
              highlight
                ? "text-4xl md:text-5xl"
                : "text-3xl md:text-4xl"
            }
            ${color}
          `}
        >

          {value}

        </motion.p>

      </div>

      {/* ICON */}
      <div
        className={`
          shrink-0
          w-12 h-12
          rounded-2xl
          flex items-center justify-center
          shadow-lg
          border border-white/50
          ${iconBg}
        `}
      >

        <span className="text-xl text-white">
          {icon}
        </span>

      </div>

    </div>

    {/* BOTTOM LINE */}
    
  </motion.div>
);

const ScoreCards = ({ result }) => {

  if (!result) return null;

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      {/* TOTAL */}
      <Card
        label="Total"
        value={result.total}
        color="text-[#9689ff]"
        glow="bg-purple-200"
        icon={<FiLayers />}
        iconBg="bg-gradient-to-br from-[#9689ff] to-[#ffbe94]"
        highlight
      />

      {/* CORRECT */}
      <Card
        label="Correct"
        value={result.correct}
        color="text-[#9689ff]"
        glow="bg-purple-200"
        icon={<FiCheckCircle />}
        iconBg="bg-gradient-to-br from-[#9689ff] to-[#ffbe94]"
        highlight
      />

      {/* WRONG */}
      <Card
        label="Wrong"
        value={result.wrong}
        color="text-[#9689ff]"
        glow="bg-purple-200"
        icon={<FiXCircle />}
        iconBg="bg-gradient-to-br from-[#9689ff] to-[#ffbe94]"
        highlight
      />

      {/* SCORE */}
      <Card
        label="Score"
        value={`${result.percentage}%`}
        color="text-[#9689ff]"
        glow="bg-purple-200"
        icon={<FiTarget />}
        iconBg="bg-gradient-to-br from-[#9689ff] to-[#ffbe94]"
        highlight
      />

    </div>

  );

};

export default ScoreCards;