import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { getDashboardData } from "../services/api";

const Interview = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    initInterview();
  }, []);

  // ======================
  // 🚀 INIT
  // ======================
  const initInterview = async () => {
    try {
      const dash = await getDashboardData();

      if (dash.data.readinessScore < 70) {
        setBlocked(true);
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.post(
        "/interview/start?refresh=true",
        { role: user?.targetRole }
      );

      setQuestions(res.data.questions || []);
      setSessionId(res.data.sessionId);

    } catch (err) {
      console.error(err);
      alert("Failed to start interview");
    } finally {
      setStarting(false);
    }
  };

  const currentQuestion = questions[index];

  // ======================
  // 🧠 SAFE PARSER
  // ======================
  const getQuestionText = (q) => {
    if (!q) return "Invalid question";
    if (typeof q === "string") return q;
    return q?.question?.text || q?.question || q?.text || "Invalid question";
  };

  // ======================
  // ➡️ NEXT / SAVE ANSWER
  // ======================
  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Write your answer first");
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);

    setAnswer("");

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      finishInterview(updatedAnswers);
    }
  };

  // ======================
  // 🏁 FINAL SUBMIT + EVALUATE
  // ======================
  const finishInterview = async (finalAnswers) => {
    try {
      setLoading(true);

      await API.post("/interview/submit", {
        sessionId,
        answers: finalAnswers
      });

      const res = await API.post("/interview/evaluate", {
        sessionId
      });

      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // 🔒 BLOCK UI
  // ======================
  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-red-500 font-bold text-xl">
            Interview Locked
          </h2>
          <p>Reach 70% readiness first</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  if (starting) return <p className="p-6">Starting interview...</p>;
  if (!currentQuestion) return <p className="p-6">Loading...</p>;

  // ======================
  // 🎯 UI
  // ======================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="bg-white p-5 rounded shadow mb-4">
          <h2 className="text-2xl font-bold">AI Mock Interview</h2>
          <p>Question {index + 1} / {questions.length}</p>
        </div>

        {/* QUESTION */}
        <div className="bg-white p-5 rounded shadow mb-4">
          <p className="font-semibold text-lg">
            {getQuestionText(currentQuestion)}
          </p>
        </div>

        {/* ANSWER */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer..."
          className="w-full border p-3 rounded h-32"
        />

        {/* BUTTON */}
        {!result ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {index === questions.length - 1
              ? "Finish Interview"
              : "Next Question"}
          </button>
        ) : (
          <div className="bg-green-100 p-4 mt-4 rounded">

            <h3 className="font-bold text-lg">
              {result.message}
            </h3>

            <p className="mt-2 whitespace-pre-line">
              {result.feedback}
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Go Home
            </button>

          </div>
        )}

        {/* EXIT */}
        {!result && (
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Exit
          </button>
        )}

      </div>
    </div>
  );
};

export default Interview;