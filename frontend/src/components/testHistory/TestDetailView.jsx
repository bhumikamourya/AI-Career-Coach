import { motion } from "framer-motion";
import ScoreCards from "./ScoreCards";
import WeakSkills from "./WeakSkills";
import TopicAnalysis from "./TopicAnalysis";
import AnswerReview from "./AnswerReview";

const TestDetailView = ({ data, onBack }) => {
  return (
<>
      {/* BACKGROUND BLOBS (same as profile) */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#d9d4ff] rounded-full blur-[110px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ffecde] rounded-full blur-[110px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          
          <div>
            <h1 className="text-3xl font-extrabold text-[#3b3a4a]">
              Attempt Details
            </h1>
            <p className="text-slate-500 text-sm italic">
              Deep performance breakdown
            </p>
          </div>

          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-white border border-[#d0d2ff] rounded-xl font-bold text-[#9689ff] hover:bg-[#f8f7ff] shadow-sm"
          >
            ← Back
          </button>
        </div>

        {/* INFO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-xl"
        >
          <p className="text-sm text-slate-500">
            {new Date(data.createdAt).toLocaleString()}
          </p>
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ScoreCards data={data} />
          <WeakSkills skills={data.weakSkillsSnapshot} />
          <TopicAnalysis stats={data.topicStats} />
          <AnswerReview answers={data.answers} />
        </motion.div>

      </div>
   </>
  );
};

export default TestDetailView;