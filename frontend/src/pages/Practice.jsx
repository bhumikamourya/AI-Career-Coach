import { useEffect, useState, useRef } from "react";
import { getQuestions, submitAnswers, saveAnswer } from "../services/api";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false); //  NEW
  const [blocked, setBlocked] = useState(null);

  const saveTimeout = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions();

      setQuestions(res.data.questions);
      setIndex(res.data.currentIndex || 0);
      const formatted = {};
      (res.data.answers || []).forEach(a => {
        formatted[a.questionId] = a.selected;
      });
      setSelectedAnswers(formatted);

    } catch (err) {
      if (err.response?.status === 403) {
        setBlocked(err.response.data);
      } else {
        console.error(err);
      }
    }
  };


  const current = questions[index];

  const handleOptionClick = (questionId, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      saveAnswer({ questionId, selected: option });
    }, 300);
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

    try {
      setSubmitting(true);
      const res = await submitAnswers();
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm mb-4">
          Current Phase: <b>{blocked.phase}</b>
        </p>
      </div>
    );
  }

  // RESULT SCREEN
  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* HEADER */}
          <div className="bg-white border shadow-sm rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Test Completed
            </h2>
            <p className="text-gray-500 mt-1">
              Your AI evaluation has been generated successfully.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-gray-500">Total</p>
              <p className="text-xl font-bold">{result.total}</p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-gray-500">Correct</p>
              <p className="text-xl font-bold text-green-600">
                {result.correct}
              </p>
            </div>
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-gray-500">Wrong</p>
              <p className="text-xl font-bold text-red-500">
                {result.wrong}
              </p>
            </div>
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="text-gray-500">Score</p>
              <p className="text-xl font-bold text-red-500">
                {result.percentage}%
              </p>
            </div>
          </div>


          {/* READINESS */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-xl p-6">
            <h3 className="font-semibold text-gray-800">
              Readiness Score
            </h3>
            <p className="text-3xl font-bold mt-2">
              {result.readinessScore}%
            </p>
            <p className="text-gray-600 mt-1">
              {result.readinessScore >= 75
                ? "You are interview ready 🚀"
                : "Needs more preparation"}
            </p>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Recommendations</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {(result.recommendations || []).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Go to Dashboard
          </button>

          {/* UPDATED SKILLS */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              AI System Evaluation
            </h3>

            <div className="flex flex-wrap gap-2">
              {(result.evaluatedSkills || []).length > 0 ? (
                result.evaluatedSkills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-blue-50 border text-sm"
                  >
                    {s.name} → {s.level}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No evaluation available</p>
              )}
            </div>
          </div>

          {/* WEAK AREAS FROM GAP */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Needs Improvement
            </h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {(result.updatedGap?.weakSkills || []).length > 0 ? (
                  result.updatedGap.weakSkills.map((w, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-red-50 border text-sm"
                    >
                      {w}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No weak areas detected</p>
                )}
              </div>
            </div>
          </div>

          {/* TOPIC ANALYSIS */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Topic Analysis
            </h3>
            <div className="space-y-2">
              {Object.entries(result.topicStats || {}).map(([topic, data]) => (
                <div
                  key={topic}
                  className="flex justify-between border-b py-2 text-sm"
                >
                  <span>{topic}</span>
                  <span className="font-medium">
                    {data.correct}/{data.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* UPDATED ROADMAP */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">
              AI Generated Roadmap
            </h3>
            <div className="space-y-3">
              {(result.updatedRoadmap || []).length > 0 ? (
                (result.updatedRoadmap || []).slice(0, 5).map((item, i) => (
                  <p key={i} className="flex justify-between p-3 bg-purple-50 rounded-lg border">
                    <span>{item.topic}</span>
                    <span className="text-sm text-gray-600">
                      {item.status} • {item.priority}
                    </span>
                  </p>
                ))
              ) : (
                <p>No roadmap available</p>
              )}
            </div>
          </div>

          {/* ANSWER REVIEW */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">
              Answer Review
            </h3>

            <details className="cursor-pointer">
              <summary className="text-blue-600 font-medium">
                View detailed answers
              </summary>

              <div className="mt-4 space-y-3">
                {result.answers.map((item, i) => (
                  <div key={i} className="border p-3 rounded-lg">
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
            </details>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!current) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">

      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>AI Skill Assessment</span>
          <span>{index + 1} / {questions.length}</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

        <h2 className="text-sm text-indigo-600 font-semibold mb-2">
          Question {index + 1}
        </h2>

        <p className="text-xl font-semibold mb-6 leading-relaxed">
          {current.question}
        </p>
      </div>

      <div className="space-y-3 mt-4">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(current._id, opt)}
            className={`w-full text-left p-4 rounded-xl border transition-all
        ${selectedAnswers[current._id] === opt
                ? "bg-indigo-50 border-indigo-400"
                : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
          >
            <span className="text-gray-400 mr-2">
              {String.fromCharCode(65 + i)}.
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* PREVIOUS */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setIndex((prev) => prev - 1)}
          disabled={index === 0}
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40"      >
          Previous
        </button>

        {/* NEXT / SUBMIT */}
        {index < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting} // disable
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Test"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Practice;
