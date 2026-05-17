import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { getInterviewResult } from "../services/api";

const InterviewResult = () => {

  const { sessionId } = useParams();

  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);

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

      <div className="min-h-screen w-full bg-[#f3f4fb] p-4 md:p-10 relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">

          <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>

          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>

        </div>

        <div className="max-w-3xl mx-auto relative z-10">

          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-10 text-center">

            <div className="w-20 h-20 border-4 border-[#d9d4ff] border-t-[#9689ff] rounded-full animate-spin mx-auto mb-6"></div>

            <h2 className="text-2xl font-extrabold text-[#3b3a4a] mb-2">

              Evaluating Interview

            </h2>

            <p className="text-slate-500">

              AI is analyzing your technical performance...

            </p>

          </div>

        </div>

      </div>
    );
  }

  // NO RESULT

  if (!result) {

    return (

      <div className="min-h-screen w-full bg-[#f3f4fb] flex items-center justify-center p-4">

        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-10 text-center">

          <h2 className="text-2xl font-extrabold text-[#3b3a4a] mb-4">

            No Result Found

          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg"
          >

            Go To Dashboard

          </button>

        </div>

      </div>
    );
  }

  // STATUS COLORS

  const statusBg =
    result.status === "completed"
      ? "bg-emerald-100 text-emerald-700"
      : result.status === "submitted"
        ? "bg-amber-100 text-amber-700"
        : "bg-indigo-100 text-indigo-700";

  // READINESS STATUS

  const readinessReady =
    result?.readinessStatus === "READY";

  const readinessColor =
    readinessReady
      ? "text-emerald-600"
      : "text-red-500";

  const readinessBg =
    readinessReady
      ? "bg-emerald-100"
      : "bg-red-100";

  return (

    <div className="min-h-screen w-full bg-[#f3f4fb] text-slate-800 p-4 md:p-10 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">

        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>

        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>

      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* TOP BAR */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

          <div>

            <h1 className="text-4xl font-extrabold text-[#3b3a4a] tracking-tight">

              Interview Result

            </h1>

            <p className="text-slate-500 font-medium italic">

              AI-powered performance analysis

            </p>

          </div>

          <div>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg m-4"
            >

              Go To Dashboard

            </button>

            <button
              onClick={() => navigate("/interview/history")}
              className="px-6 py-3 bg-white border border-[#d0d2ff] rounded-xl font-bold text-[#9689ff] hover:bg-[#f8f7ff] shadow-sm"
            >

              View All Attempts

            </button>

          </div>

        </div>

        {/* SCORE CARD */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-8 mb-8"
        >

            {/* SCORE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              {/* STATUS CARD */}
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>

                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  Status
                </p>

                <span className={`mt-4 inline-flex px-4 py-2 rounded-full text-sm font-bold ${statusBg}`}>
                  {result.status}
                </span>

              </div>

              {/* ATTEMPTED */}
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-indigo-500"></div>

                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  Attempted
                </p>

                <h2 className="mt-4 text-4xl font-black text-[#7c3aed]">
                  {result.attempted}
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  answered questions
                </p>

              </div>

              {/* QUESTIONS */}
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 to-pink-400"></div>

                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  Total Questions
                </p>

                <h2 className="mt-4 text-4xl font-black text-[#f97316]">
                  {result.totalQuestions}
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  interview length
                </p>

              </div>

              {/* READINESS */}
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  Readiness Score
                </p>

                <h2 className="mt-4 text-4xl font-black text-emerald-500">
                  {result.readinessScore || 0}%
                </h2>

                <div className={`mt-3 inline-flex px-4 py-1 rounded-full text-sm font-bold
      ${result.readinessStatus === "READY"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-500"
                  }`}
                >
                  {result.readinessStatus === "READY" ? "READY" : "NOT READY"}
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  based on performance
                </p>

              </div>


          </div>

          {/* FINAL VERDICT */}

          <div className="mt-8 rounded-[2rem] bg-gradient-to-r from-[#f8f7ff] to-[#fff7f1] border border-white p-6">

            <h3 className="text-xl font-extrabold text-[#3b3a4a] mb-2">
              Final AI Verdict
            </h3>

            <p className="text-slate-600 leading-7 font-medium">

              {result.readinessStatus === "READY"
                ? `You are currently ready for the ${result.role} role based on your interview performance and technical readiness.`
                : `You are not fully ready for the ${result.role} role yet. Focus on weak areas, improve communication, and practice more.`}

            </p>

          </div>

          {/* EXTRA INFO */}

          <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

            <div className="bg-white/60 rounded-2xl px-5 py-4 border border-white shadow-sm">

              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">

                Session

              </p>

              <p className="font-extrabold text-[#3b3a4a]">

                #{result.sessionNumber}

              </p>

            </div>

            <div className="bg-white/60 rounded-2xl px-5 py-4 border border-white shadow-sm flex-1">

              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">

                Role

              </p>

              <p className="font-extrabold text-[#3b3a4a]">

                {result.role}

              </p>

            </div>

            <div className="bg-white/60 rounded-2xl px-5 py-4 border border-white shadow-sm">

              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">

                Backend Status

              </p>

              <p className="font-extrabold text-[#9689ff] capitalize">

                {result.status}

              </p>

            </div>

          </div>

        </motion.div>

        {/* FEEDBACK SECTION */}

        <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-2xl font-extrabold text-[#3b3a4a]">

                AI Interview Analysis

              </h2>

              <p className="text-slate-500 text-sm mt-1">

                Detailed evaluation, mistakes, and ideal professional answers

              </p>

            </div>

            <div className="px-4 py-2 rounded-full bg-indigo-100 text-[#9689ff] text-sm font-bold">

              {result.feedback?.length || 0} Reviews

            </div>

          </div>

          {result.feedback?.length > 0 ? (

            <div className="space-y-6">

              {result.feedback.map((f, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/60 border border-white rounded-[2rem] p-6 shadow-sm"
                >

                  {/* QUESTION */}
                  <div className="mb-5">

                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">

                      Question

                    </p>

                    <p className="text-[#3b3a4a] font-bold leading-7">

                      {f.question}

                    </p>

                  </div>

                  {/* USER ANSWER */}
                  <div className="mb-5">

                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">

                      Your Answer

                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">

                      <p className="text-slate-600 leading-7 font-medium whitespace-pre-wrap">

                        {f.answer?.trim()
                          ? f.answer
                          : "No answer submitted"}

                      </p>

                    </div>

                  </div>

                  {/* AI FEEDBACK */}
                  <div className="mb-5">

                    <p className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-2">

                      AI Evaluation

                    </p>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">

                      <p className="text-slate-700 leading-7 font-medium whitespace-pre-wrap">

                        {f.feedback}

                      </p>

                    </div>

                  </div>

                  {/* IDEAL ANSWER */}
                  <div>

                    <p className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-2">

                      Ideal Answer

                    </p>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">

                      <p className="text-slate-700 leading-7 font-medium whitespace-pre-wrap">

                        {f.correctAnswer || "No ideal answer generated"}

                      </p>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          ) : (

            <div className="text-center py-10">

              <p className="text-slate-400 italic font-medium">

                No feedback available

              </p>

            </div>

          )}

        </div>

      </div >

    </div >
  );
};

export default InterviewResult;