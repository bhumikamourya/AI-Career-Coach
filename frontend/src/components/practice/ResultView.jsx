import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import ResultHeader from "./result/ResultHeader";
import ScoreCards from "./result/ScoreCards";
import ReadinessCard from "./result/ReadinessCard";
import Recommendations from "./result/Recommendations";
import EvaluatedSkills from "./result/EvaluatedSkills";
import WeakAreas from "./result/WeakAreas";
import TopicAnalysis from "./result/TopicAnalysis";
import RoadmapPreview from "./result/RoadmapPreview";
import AnswerReview from "./result/AnswerReview";

const ResultView = ({ result }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#f3f4fb] text-slate-800 p-4 md:p-10 relative overflow-x-hidden">

      {/* BACKGROUND BLOBS (same as profile) */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>
            <h1 className="text-4xl font-extrabold text-[#3b3a4a] tracking-tight">
              Assessment Result
            </h1>
            <p className="text-slate-500 font-medium">
              AI-powered performance analysis
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white font-bold rounded-xl shadow-lg hover:brightness-105 transition-all"
          >
            Back to Dashboard
          </button>
        </div>

        {/* MAIN RESULT HEADER */}
        <ResultHeader result={result} />

        {/* SCORE SECTION */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ScoreCards result={result} />
          </div>

          <ReadinessCard score={result.readinessScore} />
        </div>

        {/* AI INSIGHTS SECTION */}
        <div className="grid md:grid-cols-2 gap-6">
          <Recommendations list={result.recommendations} />
          <WeakAreas skills={result.updatedGap?.weakSkills} />
        </div>

        {/* SKILLS + TOPIC */}
        <div className="grid md:grid-cols-2 gap-6">
          <EvaluatedSkills skills={result.evaluatedSkills} />
          <TopicAnalysis stats={result.topicStats} />
        </div>

        {/* ROADMAP */}
        <RoadmapPreview roadmap={result.updatedRoadmap} />

        {/* ANSWER REVIEW */}
        <AnswerReview answers={result.answers} />

        {/* FINAL CTA */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="w-full py-4 bg-gradient-to-r from-[#818cf8] to-[#a78bfa] text-white rounded-2xl font-bold shadow-xl hover:brightness-105 transition-all"
        >
          Go to Dashboard
        </motion.button>

      </div>
    </div>
  );
};

export default ResultView;