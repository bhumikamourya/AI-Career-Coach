import { useEffect, useState, useRef } from "react";
import { getQuestions, submitAnswers, saveAnswer } from "../services/api";
import { useNavigate } from "react-router-dom";

import PracticeHeader from "../components/practice/PracticeHeader";
import QuestionCard from "../components/practice/QuestionCard";
import OptionsList from "../components/practice/OptionsList";
import NavigationButtons from "../components/practice/NavigationButtons";
import ResultView from "../components/practice/ResultView";

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

  const handlePrev = () => {
  if (index > 0) {
    setIndex((prev) => prev - 1);
  }
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

   // BLOCKED STATE
  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4fb]">
        <p className="text-lg font-semibold">
          Current Phase: {blocked.phase}
        </p>
      </div>
    );
  }

   if (result) {
    return <ResultView result={result} />;
  }

   if (!current) return <p>Loading...</p>;


  return (
    <div className="min-h-screen bg-[#f3f4fb] p-6">

      <div className="max-w-4xl mx-auto space-y-6">

        <PracticeHeader
          index={index}
          total={questions.length}
        />

        <QuestionCard
          question={current.question}
          index={index}
        />

        <OptionsList
          options={current.options}
          selected={selectedAnswers[current._id]}
          onSelect={(opt) => handleOptionClick(current._id, opt)}
        />

        <NavigationButtons
          index={index}
          total={questions.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          submitting={submitting}
        />

      </div>
    </div>
  );
};

export default Practice;
