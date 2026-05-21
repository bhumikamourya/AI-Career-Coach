import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiBarChart2,
} from "react-icons/fi";

import ResultHeader from "./result/ResultHeader";
import ScoreCards from "./result/ScoreCards";
import ReadinessCard from "./result/ReadinessCard";
import Recommendations from "./result/Recommendations";
import EvaluatedSkills from "./result/EvaluatedSkills";
import WeakAreas from "./result/WeakAreas";
import TopicAnalysis from "./result/TopicAnalysis";
import RoadmapPreview from "./result/RoadmapPreview";
import AnswerReview from "./result/AnswerReview";

import GlassCard from "../dashboard/ui/GlassCard";

const ResultView = ({ result }) => {

  const navigate = useNavigate();

  return (

    <div
      className=" bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5]
        min-h-screen
        relative
        overflow-hidden
        px-4 md:px-8
        py-6 md:py-8
      "
    >

      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        <div
          className="
            absolute top-[-8%] left-[-8%]
            w-[520px] h-[520px]
            bg-[#d9d4ff]
            rounded-full
            blur-[120px]
            opacity-70
          "
        />

        <div
          className="
            absolute bottom-[-10%] right-[-6%]
            w-[520px] h-[520px]
            bg-[#ffe7d6]
            rounded-full
            blur-[120px]
            opacity-70
          "
        />

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">

        {/* HEADER */}
        

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
                  <FiBarChart2 />
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
                    Assessment Result
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

                </div>

              </div>

              {/* BUTTON */}
              <motion.button

                whileHover={{
                  scale: 1.04,
                }}

                whileTap={{
                  scale: 0.96,
                }}

                onClick={() => navigate("/dashboard")}

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
                  Dashboard
                </span>

              </motion.button>

            </div>

          </motion.div>

      

        {/* RESULT HEADER */}
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
            delay: 0.05,
          }}
        >

          <GlassCard className="p-5 md:p-6">
            <ResultHeader result={result} />
          </GlassCard>

        </motion.div>

        {/* SCORE + READINESS */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LEFT */}
          <motion.div

            initial={{
              opacity: 0,
              x: -15,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.1,
            }}

            className="xl:col-span-8"
          >

            <GlassCard className="p-5 md:p-6 h-full">

              <ScoreCards result={result} />

            </GlassCard>

          </motion.div>

          {/* RIGHT */}
          <motion.div

            initial={{
              opacity: 0,
              x: 15,
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

            <GlassCard className="p-5 md:p-6 h-full">

              <ReadinessCard score={result.readinessScore} />

            </GlassCard>

          </motion.div>

        </div>

        {/* AI INSIGHTS */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* RECOMMENDATIONS */}
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
              delay: 0.2,
            }}

            className="xl:col-span-7"
          >

            <GlassCard className="p-5 md:p-6 h-full">

              <Recommendations list={result.recommendations} />

            </GlassCard>

          </motion.div>

          {/* WEAK AREAS */}
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
              delay: 0.25,
            }}

            className="xl:col-span-5"
          >

            <GlassCard className="p-5 md:p-6 h-full">

              <WeakAreas skills={result.updatedGap?.weakSkills} />

            </GlassCard>

          </motion.div>

        </div>

        {/* SKILLS + TOPIC ANALYSIS */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* SKILLS */}
          <motion.div

            initial={{
              opacity: 0,
              x: -15,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.3,
            }}

            className="xl:col-span-5"
          >

            <GlassCard className="p-5 md:p-6 h-full">

              <EvaluatedSkills skills={result.evaluatedSkills} />

            </GlassCard>

          </motion.div>

          {/* TOPICS */}
          <motion.div

            initial={{
              opacity: 0,
              x: 15,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.35,
            }}

            className="xl:col-span-7"
          >

            <GlassCard className="p-5 md:p-6 h-full">

              <TopicAnalysis stats={result.topicStats} />

            </GlassCard>

          </motion.div>

        </div>

        {/* ROADMAP */}
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
            delay: 0.4,
          }}
        >

          <GlassCard className="p-5 md:p-6">

            <RoadmapPreview roadmap={result.updatedRoadmap} />

          </GlassCard>

        </motion.div>

        {/* ANSWER REVIEW */}
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
            delay: 0.45,
          }}
        >

          <GlassCard className="p-5 md:p-6">

            <AnswerReview answers={result.answers} />

          </GlassCard>

        </motion.div>

        {/* CTA */}
        <motion.button

          whileHover={{
            scale: 1.01,
          }}

          whileTap={{
            scale: 0.98,
          }}

          onClick={() => navigate("/dashboard")}

          className="
            w-full
            py-4
            rounded-[1.7rem]
            bg-gradient-to-r from-indigo-400 to-purple-400
            text-white
            font-black
            text-lg
            shadow-[0_15px_40px_rgba(150,137,255,0.25)]
            
            transition-all
          "
        >

          Continue to Dashboard

        </motion.button>

      </div>

    </div>

  );

};

export default ResultView;