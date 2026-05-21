import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchPracticeQuestions,
  submitPractice,
  clearPracticeState,
} from "../redux/slices/practiceSlice";

import { saveAnswer } from "../services/api";

import PracticeHeader from "../components/practice/PracticeHeader";
import QuestionCard from "../components/practice/QuestionCard";
import OptionsList from "../components/practice/OptionsList";
import NavigationButtons from "../components/practice/NavigationButtons";
import ResultView from "../components/practice/ResultView";
import GlassCard from "../components/dashboard/ui/GlassCard";
import Loader from "../components/common/Loader";

const Practice = () => {
  const dispatch = useDispatch();

  const {
    questions,
    result,
    loading,
  } = useSelector((state) => state.practice);

  const [index, setIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [blocked, setBlocked] = useState(null);

  const saveTimeout = useRef(null);

  useEffect(() => {

    // ✅ IMPORTANT FIX
    // old result remove
    dispatch(clearPracticeState());

    loadQuestions();

  }, []);

  const loadQuestions = async () => {
    try {
      const res = await dispatch(
        fetchPracticeQuestions()
      ).unwrap();

      setIndex(res.currentIndex || 0);

      const formatted = {};

      (res.answers || []).forEach((a) => {
        formatted[a.questionId] = a.selected;
      });

      setSelectedAnswers(formatted);

    } catch (err) {

      console.error(err);

      if (err?.phase) {
        setBlocked(err);
      }
    }
  };

  const current = questions[index];
  

// console.log("Questions:", questions);
// console.log("Index:", index);
// console.log("Current:", current);



  const handleOptionClick = (questionId, option) => {

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {

      saveAnswer({
        questionId,
        selected: option,
      });

    }, 300);
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {

    if (submitting) return;

    try {

      setSubmitting(true);

      await dispatch(
        submitPractice()
      ).unwrap();

    } catch (err) {

      console.error(err);
      toast.error("Submission failed");

    } finally {

      setSubmitting(false);

    }
  };

  // BLOCKED STATE
  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] ">
        <p className="text-lg font-semibold">
          Current Phase: {blocked.phase}
        </p>
      </div>
    );
  }

  // RESULT PAGE
  if (result) {
    return <ResultView result={result} />;
  }

  // LOADING
  // if (loading || !current) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }
if (loading) {
  return (
    // <div className="min-h-screen flex items-center justify-center">
     <Loader/>
    // </div>
  );
}

if (!questions?.length) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] ">
      <p className="text-lg font-semibold text-slate-600">
        No practice questions found
      </p>
    </div>
  );
}

if (!current) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5] ">
      <p className="text-lg font-semibold text-slate-600">
        Unable to load question
      </p>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f2f5] via-[#f5f0ff] to-[#f3e3d5]  p-6">
<GlassCard className="max-w-4xl mx-auto p-6">
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
          onSelect={(opt) =>
            handleOptionClick(current._id, opt)
          }
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
      </GlassCard>
      {/* TOAST CONTAINER */}
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
      
    </div>
  );
};

export default Practice;