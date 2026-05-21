import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      toast.error("Failed to start interview");

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

  const answeredCount =
    updated.filter(a => a?.trim()).length;

  if (answeredCount === 0) {

    toast.error("Please answer at least one question.");

    setLoading(false);

    return;
  }

  await submitInterview({
    sessionId,
    answers: updated
  });

  navigate(`/interview/result/${sessionId}`);

} catch (err) {

  toast.error("Submit failed");

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

      <div className="min-h-screen w-full bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5]  p-4 md:p-10 relative overflow-hidden">

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

      <div className="min-h-screen w-full bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5]  p-4 md:p-10 relative overflow-hidden">

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

  {/* MAIN UI */}

return (

  <div

    className="
      min-h-screen
      w-full
      relative
      overflow-hidden
      bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5]
      text-slate-800
      px-4 md:px-6
      py-6 md:py-10
    "
  > <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="light"
/>

    {/* BACKGROUND */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

      <div
        className="
          absolute
          top-[-120px]
          left-[-120px]
          w-[380px]
          h-[380px]
          md:w-[520px]
          md:h-[520px]
          rounded-full
          
          blur-[120px]
          opacity-70
        "
      />

      <div
        className="
          absolute
          bottom-[-120px]
          right-[-120px]
          w-[380px]
          h-[380px]
          md:w-[520px]
          md:h-[520px]
          rounded-full
    
          blur-[120px]
          opacity-70
        "
      />

    </div>

    {/* GRID OVERLAY */}
    <div
      className="
        absolute inset-0 z-0 opacity-[0.03]
        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        [background-size:40px_40px]
      "
    />

    <div className="max-w-6xl mx-auto relative z-10">

      {/* HEADER */}
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
          
          backdrop-blur-2xl
          
          rounded-[2.5rem]
          
          p-6 md:p-8
          mb-8
        "
      >

        <div
          className="
            flex flex-col lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
        >

          {/* LEFT */}
          <div className="flex items-center gap-5">

            {/* ICON */}
            <div
              className="
                relative
                shrink-0
                w-16 h-16
                rounded-[1.7rem]
                bg-gradient-to-br
                from-[#9689ff]
                to-[#ffbe94]
                flex items-center justify-center
                shadow-[0_15px_40px_rgba(150,137,255,0.35)]
              "
            >

              <span className="text-3xl text-white">
                🎤
              </span>

              {/* pulse */}
              <div
                className="
                  absolute inset-0
                  rounded-[1.7rem]
                  border-2 border-[#9689ff]/30
                  animate-pulse
                "
              />

            </div>

            {/* TEXT */}
            <div>

              <h1
                className="
                  text-2xl md:text-4xl
                  font-black
                  tracking-tight
                  text-[#818191]
                "
              >
                AI Interview
              </h1>

              <p
                className="
                  mt-2
                  text-slate-500
                  font-medium
                  text-sm md:text-base
                "
              >
                Simulate a real-world technical interview experience
              </p>

            </div>

          </div>

          </div>

      </motion.div>

      {/* PROGRESS */}
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
          bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 
          backdrop-blur-2xl
          border border-white/60
          rounded-[2rem]
          shadow-xl
          p-6
          mb-8
        "
      >

        {/* TOP */}
        <div className="flex items-center justify-between mb-4">

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black">
              Interview Progress
            </p>

            <h3 className="text-lg font-extrabold text-[#3b3a4a] mt-1">
              Question {index + 1} of {questions.length}
            </h3>

          </div>

          <div
            className="
              px-4 py-2
              text-[#9689ff]
              font-black
              text-2xl
            "
          >

            {Math.round(progress)}%

          </div>

        </div>

        {/* BAR */}
        <div
          className="
            w-full
            h-4
            rounded-full
            bg-slate-200/70
            overflow-hidden
            relative
          "
        >

          <motion.div

            initial={{
              width: 0,
            }}

            animate={{
              width: `${progress}%`,
            }}

            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}

            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#9689ff]
              via-[#a78bfa]
              to-[#ffbe94]
              relative
            "
          >

            <div
              className="
                absolute inset-0
                bg-white/20
                animate-pulse
              "
            />

          </motion.div>

        </div>

      </motion.div>

      {/* MAIN INTERVIEW CARD */}
      <motion.div

        key={index}

        initial={{
          opacity: 0,
          y: 25,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.35,
        }}

        className="
          relative overflow-hidden
          bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 
          backdrop-blur-2xl
          border border-white/60
          rounded-[2.8rem]
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          p-6 md:p-10
        "
      >

        {/* INNER GLOW */}
        <div
          className="
            absolute
            top-[-20%]
            right-[-10%]
            w-[260px]
            h-[260px]
            rounded-full
            bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 
            blur-[110px]
            opacity-40
          "
        />

        {/* QUESTION HEADER */}
        <div className="relative z-10 flex items-center gap-5 mb-8">

          {/* NUMBER */}
          <div
            className="
              w-16 h-16
              rounded-[1.8rem]
              bg-gradient-to-br
              from-[#9689ff]
              to-[#ffbe94]
              flex items-center justify-center
              text-white
              text-2xl
              font-black
              shadow-[0_15px_35px_rgba(150,137,255,0.35)]
            "
          >

            {index + 1}

          </div>

          {/* TEXT */}
          <div>

            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-black">
              Technical Question
            </p>

            <h2 className="text-2xl md:text-3xl font-black text-[#35344a] mt-1">
              Solve Carefully
            </h2>

          </div>

        </div>

        {/* QUESTION */}
        <div
          className="
            relative z-10
            bg-white/40
            border border-white
            rounded-[2rem]
            p-6 md:p-8
            shadow-lg
          "
        >

          <p
            className="
              text-lg md:text-[1.35rem]
              leading-8 md:leading-10
              text-[#3b3a4a]
              font-semibold
            "
          >

            {currentQuestion}

          </p>

        </div>

        {/* ANSWER */}
        <div className="relative z-10 mt-8">

          <div className="flex justify-between items-center mb-4">

            <div>

              <h3 className="text-xl font-black text-[#3b3a4a]">
                Your Answer
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Explain your approach clearly and professionally
              </p>

            </div>

            

              
          </div>

          <textarea

            value={answer}

            onChange={(e) => setAnswer(e.target.value)}

            rows={10}

            placeholder="Write your technical answer here..."

            className="
              w-full
              resize-none
              rounded-[2rem]
              border border-white
              bg-white/40
              p-6
              text-slate-700
              placeholder:text-slate-400
              shadow-lg
              outline-none
              transition-all duration-300
              
              focus:ring-[#d9d4ff]
              
              text-[15px]
              leading-8
            "
          />

        </div>

        {/* ACTIONS */}
        <div
          className="
            relative z-10
            flex flex-col sm:flex-row
            justify-between
            gap-4
            mt-8
          "
        >

          {/* PREV */}
          <motion.button

            whileHover={{
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.97,
            }}

            onClick={handlePrev}

            disabled={index === 0}

            className="
              px-8 py-4
              rounded-2xl
              bg-white/80
              border border-white
              shadow-md
              font-bold
              text-slate-600
              disabled:opacity-40
            "
          >

            ← Previous Question

          </motion.button>

          {/* NEXT */}
          <motion.button

            whileHover={{
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.97,
            }}

            onClick={handleNext}

            disabled={loading}

            className={`
              px-8 py-4
              rounded-2xl
              text-white
              font-black
              shadow-[0_15px_35px_rgba(0,0,0,0.12)]
              transition-all
              ${
                index === questions.length - 1
                  ? "bg-gradient-to-r from-emerald-500 to-green-400"
                  : "bg-gradient-to-r from-[#818cf8] to-[#a78bfa]"
              }
            `}
          >

            {loading
              ? "Submitting..."
              : index === questions.length - 1
              ? "Finish Interview"
              : "Next Question →"}

          </motion.button>

        </div>

      </motion.div>

    </div>

  </div>

);
};

export default Interview;