import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";

import GlassCard from "../dashboard/ui/GlassCard";

import ScoreCards from "./ScoreCards";
import WeakSkills from "./WeakSkills";
import TopicAnalysis from "./TopicAnalysis";
import AnswerReview from "./AnswerReview";

const TestDetailView = ({ data, onBack }) => {

  return (

    <div className="min-h-screen w-full  relative overflow-hidden p-4 md:p-8">

      {/* Background blobs */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none overflow-hidden">

        <div
          className="
            absolute top-[-8%] left-[-8%]
            w-[520px] h-[520px]
            bg-[#d9d4ff]
            rounded-full
            blur-[120px]
          "
        />

        <div
          className="
            absolute bottom-[-10%] right-[-6%]
            w-[520px] h-[520px]
            bg-[#ffe7d6]
            rounded-full
            blur-[120px]
          "
        />

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">

        {/* HEADER */}
        <GlassCard className="p-4 sm:p-5 md:p-8 overflow-hidden">

  <motion.div
    initial={{
      opacity: 0,
      y: 15,
    }}

    animate={{
      opacity: 1,
      y: 0,
    }}
  >

    <div
      className="
        flex items-center justify-between
        gap-4 sm:gap-6
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">

        {/* ICON */}
        <div
          className="
            shrink-0
            w-11 h-11
            sm:w-12 sm:h-12
            rounded-2xl
            bg-gradient-to-br
            from-[#9689ff]
            to-[#ffbe94]
            flex items-center justify-center
            text-white
            text-lg sm:text-xl
            shadow-lg
          "
        >
          <FiActivity />
        </div>

        {/* TEXT */}
        <div className="min-w-0 flex-1">

          <h1
            className="
              text-[1.35rem]
              sm:text-3xl
              md:text-4xl
              font-black
              tracking-tight
              text-[#35344a]
              truncate
            "
          >
            Attempt Details
          </h1>

          <p
            className="
              text-[11px]
              sm:text-sm
              text-slate-500
              mt-1
              truncate
            "
          >
            Deep AI-powered performance analytics
          </p>

          {/* DATE */}
          <div
            className="
              mt-3
              inline-flex items-center gap-2
              max-w-full
              px-3 sm:px-4
              py-2
              rounded-2xl
              bg-white/70
              border border-slate-200/60
              text-slate-600
              text-[10px] sm:text-sm
              font-medium
              overflow-hidden
            "
          >

            <FiCalendar className="text-[#9689ff] shrink-0" />

            <span className="truncate">
              {new Date(data.createdAt).toLocaleString()}
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT BUTTON */}
      <motion.button

        whileHover={{
          scale: 1.04,
        }}

        whileTap={{
          scale: 0.96,
        }}

        onClick={onBack}

        className="
          shrink-0
          group
          flex items-center justify-center gap-2
          px-4 sm:px-6
          py-2.5 sm:py-3
          rounded-2xl
          font-bold
          text-sm sm:text-base
          text-[#7c6cff]
          bg-white/80
          border border-[#d8d3ff]
          shadow-md
          hover:shadow-xl
          hover:bg-[#f8f7ff]
          transition-all
        "
      >

        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />

        <span className="hidden sm:inline">
          Back
        </span>

      </motion.button>

    </div>

  </motion.div>

</GlassCard>

        {/* SCORE SECTION */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.1,
          }}
        >

          <ScoreCards data={data} />

        </motion.div>

        {/* ANALYTICS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.15,
            }}

            className="xl:col-span-4"
          >

            <GlassCard className="h-full p-6">

              <WeakSkills skills={data.weakSkillsSnapshot} />

            </GlassCard>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            className="xl:col-span-8"
          >

            <GlassCard className="h-full p-6">

              <TopicAnalysis stats={data.topicStats} />

            </GlassCard>

          </motion.div>

        </div>

        {/* ANSWERS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.25,
          }}
        >

          <GlassCard className="p-6">

            <AnswerReview answers={data.answers} />

          </GlassCard>

        </motion.div>

      </div>

    </div>

  );
};

export default TestDetailView;