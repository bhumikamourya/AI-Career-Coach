import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  getDashboardData,
  evaluate
} from "../services/api";

const Interview = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [blocked, setBlocked] = useState(false);

  const [finalScore, setFinalScore] = useState([]);

  const [starting, setStarting] = useState(true);

  useEffect(() => {
    initInterview();
  }, []);

  // ======================
  // INIT
  // ======================

  const initInterview = async () => {

    try {

      const dash = await getDashboardData();

      const readiness =
        dash.readinessScore || 0;

      const weakSkills =
        dash.skillGap?.weakSkills || [];

      // LOCK INTERVIEW

      if (readiness < 70) {

        setBlocked(true);
        return;

      }

      // DYNAMIC QUESTIONS

      const dynamicQuestions =
        weakSkills.length > 0
          ? weakSkills.map(
              (skill) =>
                `Explain ${skill} with real-world example.`
            )
          : [
              "Explain your main project.",
              "What are your strengths?",
              "Explain a challenging bug you solved.",
            ];

      setQuestions(dynamicQuestions);

    } catch (err) {

      console.error(err);
      alert("Failed to start interview");

    } finally {

      setStarting(false);

    }
  };

  const currentQuestion = questions[index];

  // ======================
  // SUBMIT ANSWER
  // ======================

  const handleSubmit = async () => {

    if (!answer.trim()) {
      alert("Write your answer first");
      return;
    }

    try {

      setLoading(true);

      // SAVE ANSWER LOCALLY

      const updatedAnswers = [...answers];

      updatedAnswers[index] = answer;

      setAnswers(updatedAnswers);

      // EVALUATE

      const res = await evaluate({
        question: currentQuestion,
        answer
      });

      setResult(res);

      // STORE SCORE

      setFinalScore((prev) => [
        ...prev,
        res.score || 0
      ]);

    } catch (err) {

      console.error(err);
      alert("Evaluation failed");

    } finally {

      setLoading(false);

    }
  };

  // ======================
  // NEXT QUESTION
  // ======================

  const handleNext = async () => {

    setAnswer("");
    setResult(null);

    // NEXT QUESTION

    if (index < questions.length - 1) {

      setIndex((prev) => prev + 1);

    } else {

      // FINAL SCORE

      const avg =
        finalScore.reduce((a, b) => a + b, 0) /
        finalScore.length;

      try {

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/interview/save-score`,
          {
            score: Math.round(avg)
          }
        );

        alert(
          `Interview Completed! Final Score: ${Math.round(avg)}`
        );

        navigate("/");

      } catch (err) {

        console.error(err);

      }
    }
  };

  // ======================
  // BLOCKED UI
  // ======================

  if (blocked) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="bg-white shadow-xl p-6 rounded-xl text-center">

          <h2 className="text-xl font-bold text-red-500">
            Interview Locked
          </h2>

          <p className="mt-2 text-gray-600">
            Reach at least <b>70% readiness</b> to unlock interview
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

  // ======================
  // LOADING
  // ======================

  if (starting || !currentQuestion) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading Interview...</p>
      </div>
    );
  }

  // ======================
  // UI
  // ======================

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
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          placeholder="Write your answer..."
          className="w-full border p-3 rounded h-32"
        />

        {/* ACTION */}

        {!result ? (

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading
              ? "Evaluating..."
              : "Submit Answer"}
          </button>

        ) : (

          <div className="bg-green-100 p-4 mt-4 rounded">

            <h3 className="font-semibold text-lg">
              Score: {result.score}/100
            </h3>

            <div className="mt-2">

              <p className="font-medium">
                Feedback:
              </p>

              {(result.feedback || []).map(
                (f, i) => (
                  <p key={i}>• {f}</p>
                )
              )}

            </div>

            <button
              onClick={handleNext}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              {index < questions.length - 1
                ? "Next Question"
                : "Finish Interview"}
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