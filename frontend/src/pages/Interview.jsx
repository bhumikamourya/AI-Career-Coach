import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  generateInterview,
  submitInterview,
  getDashboardData
} from "../services/api";

const Interview = () => {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  const [started, setStarted] = useState(false);

  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(true);

  const [sessionId, setSessionId] = useState(null);

  const [blocked, setBlocked] = useState(false);

  useEffect(() => {

    if (started) return;

    setStarted(true);

    initInterview();

  }, []);

  useEffect(() => {

    setAnswer(answers[index] || "");

  }, [index]);

  const initInterview = async () => {

    try {

      const dash = await getDashboardData();

      if (dash.readinessScore < 70) {

        setBlocked(true);

        return;
      }

      const role = dash.user.targetRole;

      const res = await generateInterview({ role });

      setQuestions(res.questions);

      setSessionId(res.sessionId);

    } catch (err) {

      alert("Failed to start interview");

    } finally {

      setStarting(false);

    }
  };

  const handlePrev = () => {

    if (index > 0) {

      const updated = [...answers];

      updated[index] = answer;

      setAnswers(updated);

      setIndex(index - 1);
    }
  };

  const handleNext = async () => {

    const updated = [...answers];

    updated[index] = answer;

    setAnswers(updated);

    if (index < questions.length - 1) {

      setIndex(index + 1);

      return;
    }

    setLoading(true);

    try {

      await submitInterview({
        sessionId,
        answers: updated
      });

      navigate(`/interview/result/${sessionId}`);

       const answeredCount =
      updated.filter(a => a?.trim()).length;

    if (answeredCount === 0) {

      alert("Please answer at least one question.");

      setLoading(false);

      return;
    }

    } catch (err) {

      alert("Submit failed");

    } finally {

      setLoading(false);

    }
  };

  const currentQuestion = questions[index];

  const progress =
    questions.length > 0
      ? ((index + 1) / questions.length) * 100
      : 0;

  // BLOCKED UI

  if (blocked) {

    return (

      <div className="min-h-screen w-full bg-[#f3f4fb] p-4 md:p-10 relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">

          <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>

          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>

        </div>

        <div className="max-w-3xl mx-auto relative z-10">

          <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-10 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] flex items-center justify-center text-4xl shadow-lg mb-6">

              🔒

            </div>

            <h1 className="text-3xl font-extrabold text-[#3b3a4a] mb-4">

              Interview Locked

            </h1>

            <p className="text-slate-500 font-medium mb-8">

              You need at least

              <span className="text-[#9689ff] font-bold">
                {" "}70% readiness{" "}
              </span>

              to unlock AI Interview Mode.

            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold shadow-lg"
            >

              Go To Dashboard

            </button>

          </div>

        </div>

      </div>
    );
  }

  // LOADING UI

  if (starting || !currentQuestion) {

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

              Preparing Your Interview

            </h2>

            <p className="text-slate-500">

              AI is generating personalized technical questions...

            </p>

          </div>

        </div>

      </div>
    );
  }

  // MAIN UI

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

              AI Interview

            </h1>

            <p className="text-slate-500 font-medium italic">

              Simulate a real-world technical interview

            </p>

          </div>

        </div>

        {/* PROGRESS SECTION */}

        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-lg mb-8">

          {/* TOP ROW */}
          <div className="flex justify-between items-center mb-3">

            <span className="text-sm font-bold text-[#3b3a4a]">

              AI Interview Progress

            </span>

            <span className="text-sm font-black text-[#9689ff]">

              {index + 1} / {questions.length}

            </span>

          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#9689ff] to-[#ffbe94]"
            />

          </div>

        </div>

        {/* MAIN CARD */}

        <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl p-6 md:p-8">

          {/* QUESTION HEADER */}

          <div className="flex items-center gap-4 mb-8">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#9689ff] to-[#ffbe94] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">

              {index + 1}

            </div>

            <div>

              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">

                Technical Question

              </p>

              <h2 className="text-2xl font-extrabold text-[#3b3a4a]">

                Solve Carefully

              </h2>

            </div>

          </div>

          {/* QUESTION */}

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 border border-white rounded-[2rem] p-8 shadow-sm"
          >

            <p className="text-lg leading-8 text-[#3b3a4a] font-semibold">

              {currentQuestion}

            </p>

          </motion.div>

          {/* ANSWER */}

          <div className="mt-8">

            <div className="flex justify-between items-center mb-3">

              <h3 className="text-lg font-extrabold text-[#3b3a4a]">

                Your Answer

              </h3>

              <span className="text-xs text-slate-400 font-semibold">

                Be practical & detailed

              </span>

            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={10}
              placeholder="Write your technical answer here..."
              className="w-full p-6 rounded-[2rem] bg-white/70 border border-white shadow-md outline-none resize-none text-slate-700 placeholder:text-slate-400 focus:ring-4 focus:ring-[#d9d4ff] focus:border-[#9689ff] transition-all duration-300"
            />

            <div className="flex justify-end mt-3">

              <p className="text-xs text-slate-400 font-medium">

                Answer auto-saved locally

              </p>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">

            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="px-8 py-4 rounded-2xl bg-white border border-slate-200 font-bold text-slate-600 disabled:opacity-40 shadow-sm"
            >

              Previous Question

            </button>

            <button
              onClick={handleNext}
              disabled={loading}
              className={`px-8 py-4 rounded-2xl text-white font-bold shadow-lg disabled:opacity-70 ${index === questions.length - 1
                  ? "bg-gradient-to-r from-emerald-500 to-green-400"
                  : "bg-gradient-to-r from-[#818cf8] to-[#a78bfa]"
                }`}
            >

              {loading
                ? "Submitting..."
                : index === questions.length - 1
                  ? "Finish Interview"
                  : "Next Question"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Interview;