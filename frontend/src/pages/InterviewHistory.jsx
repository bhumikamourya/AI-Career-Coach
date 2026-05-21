import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Brain,
  ArrowLeft,
  Eye,
  Sparkles,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { getInterviewHistory } from "../services/api";

const InterviewHistory = () => {

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await getInterviewHistory();

        setHistory(res);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, []);

  // =========================
  // LOADING UI
  // =========================

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          w-full
          bg-gradient-to-tr
          from-[#f0f2f5]
          via-[#f5f0ff]
          to-[#f3e3d5]
          p-4 md:p-8
          relative
          overflow-hidden
        "
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

          <div
            className="
              absolute
              top-[-10%]
              left-[-10%]
              w-[520px]
              h-[520px]
              bg-[#d9d4ff]
              rounded-full
              blur-[120px]
              opacity-70
            "
          />

          <div
            className="
              absolute
              bottom-[-10%]
              right-[-10%]
              w-[520px]
              h-[520px]
              bg-[#ffe7d6]
              rounded-full
              blur-[120px]
              opacity-70
            "
          />

        </div>

        <div className="max-w-4xl mx-auto relative z-10 pt-24">

          <div
            className="
              bg-white/60
              backdrop-blur-2xl
              border border-white/70
              rounded-[2.5rem]
              shadow-[0_20px_70px_rgba(0,0,0,0.08)]
              p-10 md:p-14
              text-center
            "
          >

            <div
              className="
                w-24 h-24
                mx-auto
                rounded-full
                border-[6px]
                border-violet-200
                border-t-violet-500
                animate-spin
                mb-8
              "
            />

            <h2 className="text-3xl md:text-4xl font-black text-[#35344a]">

              Loading Interview History

            </h2>

            <p className="text-slate-500 mt-4 text-lg">

              Fetching your previous AI interview attempts...

            </p>

          </div>

        </div>

      </div>
    );
  }

  return (

    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-gradient-to-tr
        from-[#f0f2f5]
        via-[#f5f0ff]
        to-[#f3e3d5]
        px-4 md:px-8
        py-6 md:py-8
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

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

      {/* GRID */}
      <div
        className="
          absolute inset-0 z-0 opacity-[0.03]
          [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      <div className="max-w-7xl mx-auto relative z-10">

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
          className="
            mb-8
            rounded-[2.5rem]
            p-5 md:p-7
          "
        >

          <div className="flex items-center justify-between gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4 min-w-0">

              <div
                className="
                  shrink-0
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#9689ff]
                  to-[#ffbe94]
                  flex items-center justify-center
                  shadow-xl
                "
              >

                <Brain className="text-white" size={28} />

              </div>

              <div className="min-w-0">

                <h1
                  className="
                    text-[1.7rem]
                    sm:text-3xl
                    md:text-5xl
                    font-black
                    text-[#53535fce]
                    tracking-tight
                    leading-tight
                  "
                >

                  Interview History

                </h1>

                <p
                  className="
                    text-slate-500
                    mt-1.5
                    text-xs
                    sm:text-sm
                    md:text-base
                  "
                >

                  Review all your AI interview sessions

                </p>

              </div>

            </div>

            {/* BUTTON */}
            <motion.button

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.97,
              }}

              onClick={() => navigate("/dashboard")}

              className="
                shrink-0
                flex items-center gap-2
                px-4 sm:px-5
                py-2.5 sm:py-3
                rounded-2xl
                bg-white/80
                border border-white
                text-violet-600
                font-black
                shadow-lg
                hover:bg-white
                transition-all
                whitespace-nowrap
              "
            >

              <ArrowLeft size={18} />

              <span className="hidden sm:inline">
                Dashboard
              </span>

            </motion.button>

          </div>

        </motion.div>

        {/* EMPTY STATE */}
        {history.length === 0 ? (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              bg-white/55
              backdrop-blur-2xl
              border border-white/70
              rounded-[2.8rem]
              shadow-[0_20px_70px_rgba(0,0,0,0.08)]
              p-12 md:p-16
              text-center
            "
          >

            <div
              className="
                w-28 h-28
                mx-auto
                rounded-full
                bg-gradient-to-br
                from-[#9689ff]
                to-[#ffbe94]
                flex items-center justify-center
                shadow-2xl
                mb-8
              "
            >

              <Sparkles className="text-white" size={42} />

            </div>

            <h2 className="text-4xl font-black text-[#35344a] mb-4">

              No Interviews Yet

            </h2>

            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-8">

              Start your first AI-powered mock interview and track
              your technical growth journey.

            </p>

          </motion.div>

        ) : (

          <div className="space-y-7">

            {history.map((h, i) => {

              const attemptedPercentage =
                h.totalQuestions > 0
                  ? Math.round(
                      (h.attempted / h.totalQuestions) * 100
                    )
                  : 0;

              const statusBg =
                h.status === "completed"
                  ? "bg-emerald-100 text-emerald-700"
                  : h.status === "submitted"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-indigo-100 text-indigo-700";

              return (

                <motion.div
                  key={h.sessionId}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: i * 0.05,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden

                    bg-white/55
                    backdrop-blur-2xl
                    border border-white/70

                    rounded-[2.8rem]

                    shadow-[0_20px_70px_rgba(0,0,0,0.07)]

                    p-6 md:p-8

                    hover:-translate-y-1
                    hover:shadow-[0_25px_80px_rgba(0,0,0,0.10)]

                    transition-all duration-300
                  "
                >

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      top-[-20%]
                      right-[-5%]
                      w-[260px]
                      h-[260px]
                      rounded-full
                      bg-gradient-to-br
                      from-[#d9d4ff]/30
                      to-[#ffe7d6]/30
                      blur-[120px]
                      opacity-60
                    "
                  />

                  {/* TOP */}
                  <div
                    className="
                      relative z-10
                      flex flex-col xl:flex-row
                      justify-between
                      gap-6
                    "
                  >

                    {/* LEFT */}
                    <div className="flex gap-5">

                      {/* ICON */}
                      <div
                        className="
                          shrink-0
                          w-16 h-16
                          rounded-2xl
                          bg-gradient-to-br
                          from-[#9689ff]
                          to-[#ffbe94]
                          flex items-center justify-center
                          text-white
                          text-2xl
                          font-black
                          shadow-xl
                        "
                      >

                        {h.sessionNumber}

                      </div>

                      {/* INFO */}
                      <div>

                        <p
                          className="
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-slate-400
                            font-black
                            mb-2
                          "
                        >

                          Interview Session

                        </p>

                        

                        <p className="text-slate-500 font-semibold mt-2">

                          {h.role}

                        </p>

                      </div>

                    </div>

                    {/* STATUS */}
                    

                  </div>

                  {/* STATS */}
                  <div
                    className="
                      relative z-10
                      grid grid-cols-1 md:grid-cols-2
                      gap-5
                      mt-8
                    "
                  >

                    {/* ATTEMPTED */}
                    <div
                      className="
                      bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 
                        rounded-[2rem]
                        p-6
                        border border-white
                        shadow-lg
                      "
                    >

                      <div className="flex items-center gap-2 mb-3">

                        <CheckCircle2
                          size={18}
                          className="text-violet-500"
                        />

                        <p
                          className="
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-slate-400
                            font-black
                          "
                        >

                          Attempted Questions

                        </p>

                      </div>

                      <div className="flex justify-between items-end mb-4">

                        <h3
                          className="
                            text-4xl md:text-5xl
                            font-black
                            text-[#9689ff]
                          "
                        >

                          {h.attempted}

                        </h3>

                        <p className="text-sm font-bold text-slate-500">

                        {h.attempted}  / {h.totalQuestions}

                        </p>

                      </div>

                      <div
                        className="
                          w-full
                          bg-slate-200
                          h-3
                          rounded-full
                          overflow-hidden
                        "
                      >

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${attemptedPercentage}%`,
                          }}
                          transition={{
                            duration: 0.7,
                          }}
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-[#9689ff]
                            to-[#ffbe94]
                          "
                        />

                      </div>

                      <p className="text-xs text-slate-400 mt-3">

                        {attemptedPercentage}% completed

                      </p>

                    </div>

                    {/* FEEDBACK */}
                    <div
                      className="
                        bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 
                        rounded-[2rem]
                        p-6
                        border border-white
                        shadow-lg
                        flex flex-col justify-center
                      "
                    >

                      <div className="flex items-center gap-2 mb-3">

                        <Clock3
                          size={18}
                          className="text-orange-400"
                        />

                        <p
                          className="
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-slate-400
                            font-black
                          "
                        >

                          AI Reviews

                        </p>

                      </div>

                      <h3
                        className="
                          text-4xl md:text-5xl
                          font-black
                          text-violet-500
                        "
                      >

                        {h.feedback?.length || 0}

                      </h3>

                      <p className="text-xs text-slate-400 mt-3">

                        generated evaluations

                      </p>

                    </div>

                  </div>

                  {/* ACTION */}
                  <div className="relative z-10 mt-8">

                    <motion.button

                      whileHover={{
                        scale: 1.02,
                      }}

                      whileTap={{
                        scale: 0.98,
                      }}

                      onClick={() =>
                        navigate(`/interview/result/${h.sessionId}`)
                      }

                      className="
                        w-full sm:w-auto

                        flex items-center justify-center gap-2

                        px-8 py-4

                        rounded-[1.4rem]

                        bg-gradient-to-r
                        from-[#818cf8]
                        to-[#a78bfa]

                        text-white
                        font-black

                        shadow-[0_15px_35px_rgba(129,140,248,0.28)]

                        hover:shadow-[0_20px_45px_rgba(129,140,248,0.35)]

                        transition-all
                      "
                    >

                      <Eye size={18} />

                      View Detailed Result

                    </motion.button>

                  </div>

                </motion.div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default InterviewHistory;