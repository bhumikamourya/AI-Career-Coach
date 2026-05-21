import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  Eye,
  EyeOff,
  ArrowLeft,
  Brain,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Target,
  ClipboardCheck,
} from "lucide-react";

import { getInterviewResult } from "../services/api";

const InterviewResult = () => {

  const { sessionId } = useParams();

  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await getInterviewResult(sessionId);

        setResult(res);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, [sessionId]);

  // LOADING UI

  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] flex items-center justify-center p-6 relative overflow-hidden">

        {/* BLOBS */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-300/30 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-200/30 blur-[140px] rounded-full"></div>

        <div className="relative z-10 bg-white/60 backdrop-blur-2xl border border-white/70 rounded-[2.5rem] shadow-2xl px-8 py-12 w-full max-w-xl text-center">

          <div className="w-20 h-20 border-[5px] border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-8"></div>

          <h1 className="text-3xl md:text-4xl font-black text-[#2f2f46]">

            Evaluating Interview

          </h1>

          <p className="text-slate-500 mt-3 text-lg">

            AI is analyzing your technical performance...

          </p>

        </div>

      </div>
    );
  }

  // NO RESULT

  if (!result) {

    return (

      <div className="min-h-screen bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] flex items-center justify-center p-6">

        <div className="bg-white/30 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-2xl p-10 text-center max-w-lg w-full">

          <AlertCircle size={70} className="mx-auto text-red-400 mb-6" />

          <h2 className="text-3xl font-black text-[#2f2f46] mb-3">

            No Result Found

          </h2>

          <p className="text-slate-500 mb-8">

            We couldn’t find any interview result for this session.

          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              px-8 py-4
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              to-indigo-500
              text-white
              font-black
              shadow-xl
              hover:scale-[1.03]
              transition-all
            "
          >

            Back To Dashboard

          </button>

        </div>

      </div>
    );
  }

  // STATUS

  const statusBg =
    result.status === "completed"
      ? "bg-emerald-100 text-emerald-700"
      : result.status === "submitted"
      ? "bg-amber-100 text-amber-700"
      : "bg-indigo-100 text-indigo-700";

  return (

    <div className="min-h-screen relative overflow-hidden bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] px-4 md:px-8 py-6 md:py-8">

      {/* BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-300/30 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-200/30 blur-[140px] rounded-full"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px]"></div>

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
  className="
    rounded-[2rem] md:rounded-[2.5rem]
    p-4 sm:p-5 md:p-7
  "
>

  <div
    className="
      flex items-center justify-between
      gap-3 md:gap-5
    "
  >

    {/* LEFT */}
    <div
      className="
        flex items-center
        gap-3 sm:gap-4
        min-w-0
        flex-1
      "
    >

      {/* ICON */}
      <div
        className="
          shrink-0
          w-11 h-11
          sm:w-14 sm:h-14
          rounded-2xl
          bg-gradient-to-br
          from-[#9689ff]
          to-[#ffbe94]
          flex items-center justify-center
          shadow-xl
        "
      >

        <Brain
          className="text-white"
          size={22}
        />

      </div>

      {/* TEXT */}
      <div className="min-w-0">

        <h1
          className="
            text-[1.25rem]
            sm:text-3xl
            md:text-5xl
            font-black
            text-[#53535fce]
            tracking-tight
            leading-tight
            truncate
          "
        >

          Interview Result

        </h1>

        <p
          className="
            hidden sm:block
            text-slate-500
            mt-1
            text-sm md:text-base
          "
        >

          Deep AI-powered performance analysis

        </p>

      </div>

    </div>

    {/* BUTTONS */}
    <div
      className="
        flex items-center
        gap-2 sm:gap-3
        shrink-0
      "
    >

      {/* DASHBOARD */}
      <motion.button

        whileHover={{
          scale: 1.03,
        }}

        whileTap={{
          scale: 0.97,
        }}

        onClick={() => navigate("/dashboard")}

        className="
          flex items-center justify-center gap-2

          px-3 sm:px-5
          py-2.5 sm:py-3

          rounded-xl sm:rounded-2xl

          bg-white/80
          border border-white

          text-violet-600
          font-black

          text-xs sm:text-sm md:text-base

          shadow-lg
          hover:bg-white
          transition-all
          whitespace-nowrap
        "
      >

        <ArrowLeft size={16} />

        <span className="hidden sm:inline">
          Dashboard
        </span>

      </motion.button>

      {/* ATTEMPTS */}
      <motion.button

        whileHover={{
          scale: 1.03,
        }}

        whileTap={{
          scale: 0.97,
        }}

        onClick={() => navigate("/interview/history")}

        className="
          px-3 sm:px-5
          py-2.5 sm:py-3

          rounded-xl sm:rounded-2xl

          bg-gradient-to-r
          from-violet-500
          to-indigo-500

          text-white
          font-black

          text-xs sm:text-sm md:text-base

          shadow-xl
          whitespace-nowrap
        "
      >

        <span className="hidden sm:inline">
          View Attempts
        </span>

        <span className="sm:hidden">
          Attempts
        </span>

      </motion.button>

    </div>

  </div>

</motion.div>

        {/* STATS */}
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
          className="
            bg-white/30
            backdrop-blur-2xl
            border border-white/70
            rounded-[2.5rem]
            p-6 md:p-8
            
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          "
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* STATUS */}
            <div className="bg-white/50 rounded-3xl p-6 border border-white shadow-lg">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black">

                  Status

                </p>

                <ClipboardCheck className="text-indigo-500" size={20} />

              </div>

              <div className={`mt-5 inline-flex px-4 py-2 rounded-full text-sm font-black ${statusBg}`}>

                {result.status}

              </div>

            </div>

            {/* ATTEMPTED */}
            <div className="bg-white/50 rounded-3xl p-6 border border-white shadow-lg">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black">

                  Attempted

                </p>

                <Target className="text-violet-500" size={20} />

              </div>

              <h2 className="mt-5 text-5xl font-black text-violet-600">

                {result.attempted}

              </h2>

              <p className="text-slate-400 mt-2 text-sm">

                answered questions

              </p>

            </div>

            {/* TOTAL */}
            <div className="bg-white/50 rounded-3xl p-6 border border-white shadow-lg">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black">

                  Total Questions

                </p>

                <CheckCircle2 className="text-orange-500" size={20} />

              </div>

              <h2 className="mt-5 text-5xl font-black text-orange-500">

                {result.totalQuestions}

              </h2>

              <p className="text-slate-400 mt-2 text-sm">

                interview length

              </p>

            </div>

            {/* READINESS */}
            <div className="bg-white/50 rounded-3xl p-6 border border-white shadow-lg">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black">

                  Readiness

                </p>

                <Trophy className="text-emerald-500" size={20} />

              </div>

              <h2 className="mt-5 text-5xl font-black text-emerald-500">

                {result.readinessScore || 0}%

              </h2>

              <div
                className={`mt-3 inline-flex px-4 py-1 rounded-full text-sm font-black ${
                  result.readinessStatus === "READY"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-500"
                }`}
              >

                {result.readinessStatus === "READY"
                  ? "READY"
                  : "NOT READY"}

              </div>

            </div>

          </div>

          {/* VERDICT */}
          <div
            className="
              mt-8
              rounded-[2.5rem]
             bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40
              border border-white
              p-7
              shadow-lg
            "
          >

            <h3 className="text-xl md:text-2xl font-black text-[#2f2f4696] mb-3">

              Final AI Verdict

            </h3>

            <p className="text-slate-600 leading-8 text-md font-medium">

              {result.readinessStatus === "READY"
                ? `You are currently ready for the ${result.role} role based on your interview performance and technical readiness.`
                : `You are not fully ready for the ${result.role} role yet. Focus on weak areas, improve communication, and practice more.`}

            </p>

          </div>

          {/* EXTRA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

            <div className="bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 rounded-3xl p-5 border border-white shadow-lg">

              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black mb-2">

                Session

              </p>

              <p className="text-xl font-black text-[#2f2f4693]">

                {result.sessionNumber}.

              </p>

            </div>

            <div className="bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 rounded-3xl p-5 border border-white shadow-lg">

              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black mb-2">

                Role

              </p>

              <p className="text-xl font-black text-[#2f2f4693]">

                {result.role}

              </p>

            </div>

            <div className="bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 rounded-3xl p-5 border border-white shadow-lg">

              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black mb-2">

                Backend Status

              </p>

              <p className="text-xl font-black text-green-500 capitalize">

                {result.status}

              </p>

            </div>

          </div>

        </motion.div>

        {/* ANSWER REVIEWS */}
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
          className="
            bg-white/30
            backdrop-blur-2xl
            border border-white/70
            rounded-[2.5rem]
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            p-6 md:p-8
          "
        >

          {/* HEADER */}
          <div
  className="
    flex items-center justify-between
    gap-3 md:gap-5
    mb-8
  "
>

  {/* LEFT */}
  <div className="min-w-0 flex-1">

    <h2
      className="
        text-[1.4rem]
        sm:text-2xl
        md:text-3xl
        font-black
        text-[#2f2f4693]
        leading-tight
        truncate
      "
    >

      Answer Reviews

    </h2>

    <p
      className="
        text-slate-500
        mt-1.5
        text-xs sm:text-sm md:text-base
        leading-relaxed
        line-clamp-2
      "
    >

      AI evaluation, feedback & ideal professional answers

    </p>

  </div>

  {/* RIGHT BUTTON */}
  <div className="shrink-0">

    <button
      onClick={() => setShowReviews(!showReviews)}
      className="
        flex items-center justify-center gap-2

        px-3 sm:px-5
        py-2.5 sm:py-3

        rounded-xl sm:rounded-2xl

        bg-gradient-to-r
        from-violet-500
        to-indigo-500

        text-white
        font-black

        text-xs sm:text-sm md:text-base

        shadow-lg
        focus:outline-none

        hover:scale-[1.03]
        transition-all

        whitespace-nowrap
      "
    >

      <span className="hidden sm:inline">
        {showReviews ? "Hide Reviews" : "View Reviews"}
      </span>

      <span className="sm:hidden">
        {showReviews ? "Hide" : "View"}
      </span>

      {showReviews
        ? <EyeOff size={16} />
        : <Eye size={16} />
      }

    </button>

  </div>

</div>

          {/* REVIEW LIST */}
          <AnimatePresence>

            {showReviews && result.feedback?.length > 0 && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="space-y-6"
              >

                {result.feedback.map((f, i) => (

                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: i * 0.05,
                    }}
                    className="
                      bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 
                      backdrop-blur-xl
                      border border-white
                      rounded-[2.3rem]
                      p-6 md:p-8
                      shadow-lg
                    "
                  >

                    {/* QUESTION */}
                    <div className="mb-6">

                      <div className="flex items-center gap-3 mb-4">

                        <div
                          className="
                            w-11 h-11
                            rounded-2xl
                            bg-gradient-to-br
                            from-violet-500
                            to-indigo-500
                            text-white
                            font-black
                            flex items-center justify-center
                            shadow-lg
                          "
                        >

                          {i + 1}

                        </div>

                        <div>

                          <p className="text-xs uppercase tracking-[0.2em] text-violet-500 font-black">

                            Technical Question

                          </p>

                          <p className="text-slate-400 text-sm">

                            Interview Review

                          </p>

                        </div>

                      </div>

                      <p className="text-[#2f2f46d5] text-md md:text-lg font-bold leading-8">

                        {f.question}

                      </p>

                    </div>

                    {/* USER ANSWER */}
                    <div className="mb-5">

                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black mb-3">

                        Your Answer

                      </p>

                      <div className="bg-white/45 border border-slate-100 rounded-3xl p-5">

                        <p className="text-slate-700 leading-8 whitespace-pre-wrap">

                          {f.answer?.trim()
                            ? f.answer
                            : "No answer submitted"}

                        </p>

                      </div>

                    </div>

                    {/* FEEDBACK */}
                    <div className="mb-5">

                      <p className="text-xs uppercase tracking-[0.2em] text-amber-500 font-black mb-3">

                        AI Evaluation

                      </p>

                      <div className="bg-amber-50/75 border border-amber-100 rounded-3xl p-5">

                        <p className="text-slate-700 leading-8 whitespace-pre-wrap">

                          {f.feedback}

                        </p>

                      </div>

                    </div>

                    {/* IDEAL */}
                    <div>

                      <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-black mb-3">

                        Ideal Answer

                      </p>

                      <div className="bg-emerald-50/75 border border-emerald-100 rounded-3xl p-5">

                        <p className="text-slate-700 leading-8 whitespace-pre-wrap">

                          {f.correctAnswer || "No ideal answer generated"}

                        </p>

                      </div>

                    </div>

                  </motion.div>

                ))}

              </motion.div>

            )}

          </AnimatePresence>

          {/* HIDDEN */}
          {!showReviews && (

            <div className="text-center py-20">

              <EyeOff size={60} className="mx-auto text-slate-300 mb-5" />

              <h3 className="text-2xl font-black text-slate-400">

                Reviews Hidden

              </h3>

              <p className="text-slate-400 mt-2">

                Click “View Reviews” to see detailed AI feedback

              </p>

            </div>

          )}

        </motion.div>

      </div>

    </div>
  );
};

export default InterviewResult;