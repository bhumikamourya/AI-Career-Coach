import { useEffect, useState } from "react";
import { getQuestions, submitAnswers } from "../services/api";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false); //  NEW
  const [blocked, setBlocked] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions();
      setQuestions(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setBlocked(err.response.data);
      } else {
        console.error(err);
      }
    }
  };


  const current = questions[index];

  // STORE ANSWER
  const handleOptionClick = (questionId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  // NEXT BUTTON
  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  // SUBMIT TEST (FIXED)
  const handleSubmit = async () => {
    if (submitting) return; //  prevent double click

    //  force complete test
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert("Please answer all questions");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        answers: Object.keys(selectedAnswers).map((qId) => ({
          questionId: qId,
          selected: selectedAnswers[qId]
        }))
      };

      const res = await submitAnswers(payload);
      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (blocked) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Access Restricted
        </h2>

        <p className="mb-2">{blocked.message}</p>

        <p className="mb-4">
          Current Progress: <strong>{blocked.progress}%</strong>
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  // RESULT SCREEN
  if (result) {
    return (
      <div className="p-6 max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-4">Test Result</h2>

        <p className="text-sm text-gray-600">
          Priority updated based on your performance in weak topics.
        </p>
        <button
          onClick={() => { navigate("/"); window.location.reload(); }}
          className="mt-4 ml-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Go to Dashboard (See Skill Update)
        </button>

        {/* SUMMARY */}
        <div className="bg-white p-4 rounded shadow mb-4">

          <p>Total Questions: {result.total}</p>
          <p>
            Correct: <span className="text-green-600">{result.correct}</span>
          </p>
          <p>
            Wrong: <span className="text-red-600">{result.wrong}</span>
          </p>
          <p>Score: {result.percentage}%</p>

          <div className="bg-green-100 p-4 rounded mb-4">
            <h3 className="font-semibold">Readiness Score</h3>
            <p className="text-xl font-bold">{result.readinessScore}%</p>

            <p>
              {result.readinessScore >= 75
                ? "✅ You are ready for interviews"
                : "❌ You need more practice"}
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded mb-4">
            <h3 className="font-semibold">Recommendations</h3>
            {result.recommendations.map((rec, i) => (
              <p key={i}>• {rec}</p>
            ))}
          </div>
        </div>

        {/* 🔥 UPDATED SKILLS */}
        <div className="bg-blue-100 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">System Evaluation</h3>

          {result.evaluatedSkills?.length ? (
            <p>
              {result.evaluatedSkills.map(
                (s) => `${s.name} (${s.level})`
              ).join(", ")}
            </p>
          ) : (
            <p>No skills Evaluated</p>
          )}
        </div>

        {/* 🔥 WEAK AREAS FROM GAP */}
        <div className="bg-red-100 p-4 rounded mb-4">
          <h3 className="font-semibold">Needs Improvement</h3>

          <p>
            {result.updatedGap?.weakSkills?.length
              ? result.updatedGap.weakSkills.join(", ")
              : "None"}
          </p>
        </div>

        {/* 🔥 TOPIC ANALYSIS */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-semibold mb-2">Topic Analysis</h3>

          {Object.entries(result.topicStats || {}).map(([topic, data]) => (
            <div key={topic}>
              <p>
                {topic}: {data.correct}/{data.total}
              </p>
            </div>
          ))}
        </div>

        {/* 🔥 UPDATED ROADMAP */}
        <div className="bg-purple-100 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Updated Roadmap</h3>

          {result.updatedRoadmap?.roadmap?.length ? (
            result.updatedRoadmap.roadmap.slice(0, 5).map((item, i) => (
              <p key={i}>
                {item.topic} → {item.status} ({item.priority})
              </p>
            ))
          ) : (
            <p>No roadmap available</p>
          )}
        </div>

        {/* ANSWER REVIEW */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Answer Review</h3>

          {result.answers.map((item, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <p className="font-semibold">{item.question}</p>

              <p>
                Your Answer:{" "}
                <span className={item.isCorrect ? "text-green-600" : "text-red-600"}>
                  {item.selected}
                </span>
              </p>

              {!item.isCorrect && (
                <p className="text-green-600">
                  Correct Answer: {item.correct}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!current) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="w-full bg-gray-200 h-2 rounded mb-4">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
      <h2 className="text-xl font-bold mb-4">
        Question {index + 1} / {questions.length}
      </h2>

      <p className="mb-4">{current.question}</p>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(current._id, opt)}
            className={`block w-full text-left p-2 border rounded 
              ${selectedAnswers[current._id] === opt
                ? "bg-blue-200"
                : ""
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* PREVIOUS */}
      <button
        onClick={() => setIndex((prev) => prev - 1)}
        disabled={index === 0}
        className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>

      {/* NEXT / SUBMIT */}
      {index < questions.length - 1 ? (
        <button
          onClick={handleNext}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={submitting} // disable
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Test"}
        </button>
      )}
    </div>
  );
};

export default Practice;