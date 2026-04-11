import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const navigate = useNavigate();

  const questions = [
    "Explain closure in JavaScript.",
    "What is REST API?",
    "Difference between let and var?",
    "Explain event loop in JS."
  ];

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      alert("Interview Completed");
      navigate("/");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">
        AI Mock Interview
      </h2>

      <p className="text-gray-600 mb-2">
        Question {index + 1} / {questions.length}
      </p>

      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="font-semibold">{currentQuestion}</p>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
        className="w-full border p-3 rounded mb-3 h-32"
      />

      {!result ? (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Evaluating..." : "Submit Answer"}
        </button>
      ) : (
        <div className="mt-4 bg-gray-100 p-4 rounded">

          <h3 className="font-semibold">Score: {result.score}/100</h3>

          <p className="mt-2 font-medium">Feedback:</p>
          {result.feedback.map((f, i) => (
            <p key={i}>• {f}</p>
          ))}

          <button
            onClick={handleNext}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Next Question
          </button>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-4 ml-3 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Exit Interview
      </button>

    </div>
  );
};

export default Interview;