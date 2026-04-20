import { useEffect, useState } from "react";
import { getTestHistory } from "../services/api";
import { useNavigate } from "react-router-dom";

const TestHistory = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getTestHistory();

      // sort latest first
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setHistory(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatus = (score) => {
    if (score >= 75) return { text: "Interview Ready 🚀", color: "text-green-600" };
    if (score >= 50) return { text: "Improving ⚠", color: "text-yellow-600" };
    return { text: "Needs Work ❌", color: "text-red-600" };
  };

  
  if (!selected) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto space-y-5">

          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Test History</h2>

            <button
              onClick={() => navigate("/")}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Dashboard
            </button>
          </div>

          {history.length === 0 ? (
            <div className="text-center bg-white p-6 rounded shadow">
              <p className="text-gray-500">No attempts yet</p>

              <button
                onClick={() => navigate("/practice")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Take First Test
              </button>
            </div>
          ) : (
            history.map((item, i) => {
              const status = getStatus(item.readinessScore);

              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">

                    {/* LEFT */}
                    <div>
                      <p className="font-semibold text-lg">
                        Attempt #{history.length - i}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>

                      <p className={`text-sm mt-1 font-medium ${status.color}`}>
                        {status.text}
                      </p>

                      {item.weakSkillsSnapshot?.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          Weak: {item.weakSkillsSnapshot.slice(0, 3).join(", ")}
                        </p>
                      )}
                    </div>

                    {/* RIGHT */}
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        {item.percentage}%
                      </p>

                      <p className="text-sm text-purple-600">
                        Readiness: {item.readinessScore}%
                      </p>

                      <button
                        onClick={() => setSelected(item)}
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        View Details
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  //  DETAIL VIEW
  const status = getStatus(selected.readinessScore);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        <button
          onClick={() => setSelected(null)}
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          ← Back to History
        </button>

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">Attempt Details</h2>

          <p className="text-gray-500 text-sm">
            {new Date(selected.createdAt).toLocaleString()}
          </p>

          <p className={`mt-2 font-semibold ${status.color}`}>
            {status.text}
          </p>
        </div>

        {/* SCORE CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card label="Score" value={`${selected.percentage}%`} />
          <Card label="Readiness" value={`${selected.readinessScore}%`} />
          <Card label="Correct" value={selected.correct} green />
          <Card label="Wrong" value={selected.wrong} red />
        </div>

        {/* WEAK SKILLS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold text-red-600 mb-2">
            Weak Areas
          </h3>

          <div className="flex flex-wrap gap-2">
            {selected.weakSkillsSnapshot?.length > 0 ? (
              selected.weakSkillsSnapshot.map((w, i) => (
                <span
                  key={i}
                  className="bg-red-100 px-3 py-1 rounded-full text-sm"
                >
                  {w}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No weak areas</p>
            )}
          </div>
        </div>

        {/* TOPIC ANALYSIS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-3">
            Topic Analysis
          </h3>

          {Object.entries(selected.topicStats || {}).map(([topic, data]) => (
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

        {/* ANSWERS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-3">
            Answer Review
          </h3>

          <details className="cursor-pointer">
            <summary className="text-blue-600 font-medium">
              View Answers
            </summary>

            <div className="mt-4 space-y-3">
              {selected.answers.map((a, i) => (
                <div key={i} className="border p-3 rounded-lg">
                  <p className="font-semibold">{a.question}</p>

                  <p>
                    Your Answer:{" "}
                    <span className={a.isCorrect ? "text-green-600" : "text-red-600"}>
                      {a.selected}
                    </span>
                  </p>

                  {!a.isCorrect && (
                    <p className="text-green-600">
                      Correct: {a.correct}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </details>
        </div>

      </div>
    </div>
  );
};

// REUSABLE CARD
const Card = ({ label, value, green, red }) => (
  <div className="bg-white p-4 rounded-xl shadow text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-xl font-bold ${green ? "text-green-600" : red ? "text-red-500" : ""}`}>
      {value}
    </p>
  </div>
);

export default TestHistory;