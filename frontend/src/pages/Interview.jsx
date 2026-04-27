import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDashboardData, evaluate } from "../services/api";

const Interview = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [finalScore, setFinalScore] = useState([]);

  useEffect(() => {
    initInterview();
  }, []);

  const initInterview = async () => {
    try {
      const res = await getDashboardData();

      const readiness = res.data.readinessScore;
      const weakSkills = res.data.skillGap?.weakSkills || [];

      // LOCK INTERVIEW
      if (readiness < 70) {
        setBlocked(true);
        return;
      }

      // 🎯 GENERATE QUESTIONS BASED ON WEAK SKILLS
      const dynamicQuestions =
        weakSkills.length > 0
          ? weakSkills.map(
              (skill) => `Explain ${skill} with real-world example.`
            )
          : [
              "Explain your main project.",
              "What are your strengths?",
              "Explain a challenging bug you solved.",
            ];

      setQuestions(dynamicQuestions);
    } catch (err) {
      console.error(err);
    }
  };

  const currentQuestion = questions[index];

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Write your answer first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/interview/evaluate",
        {
          question: currentQuestion,
          answer
        }
      );

      setResult(res.data);

      // STORE SCORE
      setFinalScore((prev) => [...prev, res.data.score]);

    } catch (err) {
      console.error(err);
      alert("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setAnswer("");
    setResult(null);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = async () => {
    const avg =
      finalScore.reduce((a, b) => a + b, 0) / finalScore.length;

    try {
      await axios.post(
        "http://localhost:5000/api/interview/save-score",
        { score: Math.round(avg) }
      );

      alert(`Interview Completed! Final Score: ${Math.round(avg)}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  //  BLOCKED UI
  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-xl p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold text-red-500">
            Interview Locked
          </h2>
          <p className="mt-2 text-gray-600">
            Reach at least <b>75% readiness</b> to unlock interview
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="bg-white p-5 rounded-xl shadow mb-4">
          <h2 className="text-2xl font-bold">
            AI Mock Interview
          </h2>
          <p className="text-gray-500">
            Question {index + 1} / {questions.length}
          </p>
        </div>

        {/* QUESTION */}
        <div className="bg-white p-6 rounded-xl shadow mb-4">
          <p className="text-lg font-semibold">
            {currentQuestion}
          </p>
        </div>

        {/* ANSWER */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Explain clearly with examples..."
          className="w-full border p-3 rounded h-32"
        />

        {/* ACTION */}
        {!result ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Evaluating..." : "Submit Answer"}
          </button>
        ) : (
          <div className="mt-4 bg-gray-100 p-4 rounded">

            <h3 className="font-semibold text-lg">
              Score: {result.score}/100
            </h3>

            <div className="mt-2">
              <p className="font-medium">Feedback:</p>
              {result.feedback.map((f, i) => (
                <p key={i}>• {f}</p>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Next Question
            </button>
          </div>
        )}

        {/* EXIT */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 ml-3 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Exit Interview
        </button>
      </div>
    </div>
  );
};

export default Interview;