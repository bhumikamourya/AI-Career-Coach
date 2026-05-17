import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

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

      <div className="min-h-screen w-full bg-[#f3f4fb] p-4 md:p-10 relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">

          <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>

          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>

        </div>

        <div className="max-w-4xl mx-auto relative z-10">

          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-10 text-center">

            <div className="w-20 h-20 border-4 border-[#d9d4ff] border-t-[#9689ff] rounded-full animate-spin mx-auto mb-6"></div>

            <h2 className="text-2xl font-extrabold text-[#3b3a4a] mb-2">

              Loading Interview History

            </h2>

            <p className="text-slate-500">

              Fetching your previous interview attempts...

            </p>

          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen w-full bg-[#f3f4fb] text-slate-800 p-4 md:p-10 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">

        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>

        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>

      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* TOP BAR */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

          <div>

            <h1 className="text-4xl font-extrabold text-[#3b3a4a] tracking-tight">

              Interview History

            </h1>

            <p className="text-slate-500 font-medium italic">

              Review your previous AI interview sessions

            </p>

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-xl shadow-lg"
          >

           Go To Dashboard

          </button>

        </div>

        {/* EMPTY STATE */}

        {history.length === 0 ? (

          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-12 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] flex items-center justify-center text-4xl shadow-lg mb-6">

              📜

            </div>

            <h2 className="text-3xl font-extrabold text-[#3b3a4a] mb-3">

              No Interviews Yet

            </h2>

            <p className="text-slate-500 mb-8">

              Start your first AI-powered technical interview.

            </p>

          </div>

        ) : (

          <div className="space-y-6">

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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-8"
                >

                  {/* TOP */}

                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    {/* LEFT */}

                    <div className="flex gap-5">

                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] flex items-center justify-center text-white font-black text-xl shadow-lg">

                        {h.sessionNumber}

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">

                          Session

                        </p>

                        <h2 className="text-2xl font-extrabold text-[#3b3a4a] mb-2">

                          #{h.sessionNumber}

                        </h2>

                        <p className="text-slate-500 font-medium">

                          {h.role}

                        </p>

                      </div>

                    </div>

                    {/* STATUS */}

                    <div>

                      <span className={`px-5 py-2 rounded-full text-sm font-bold ${statusBg}`}>

                        {h.status}

                      </span>

                    </div>

                  </div>

                  {/* STATS */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

                    {/* ATTEMPTED */}

                    <div className="bg-white/60 rounded-[2rem] p-5 shadow-sm">

                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">

                        Attempted Questions

                      </p>

                      <div className="flex justify-between items-center mb-3">

                        <h3 className="text-3xl font-black text-[#9689ff]">

                          {h.attempted}

                        </h3>

                        <p className="text-sm font-bold text-slate-500">

                          / {h.totalQuestions}

                        </p>

                      </div>

                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-[#9689ff] to-[#ffbe94]"
                          style={{
                            width: `${attemptedPercentage}%`
                          }}
                        />

                      </div>

                    </div>

                    {/* FEEDBACK */}

                    <div className="bg-white/60 rounded-[2rem] p-5 shadow-sm flex flex-col justify-center">

                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">

                        AI Reviews

                      </p>

                      <h3 className="text-3xl font-black text-[#ff9f6e]">

                        {h.feedback?.length || 0}

                      </h3>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <button
                      onClick={() =>
                        navigate(`/interview/result/${h.sessionId}`)
                      }
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg"
                    >

                      View Detailed Result

                    </button>

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