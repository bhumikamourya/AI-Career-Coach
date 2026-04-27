const QuestionCard = ({ question, index }) => {
  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-xl">

      <h2 className="text-sm text-[#9689ff] font-bold mb-2">
        Question {index + 1}
      </h2>

      <p className="text-xl font-semibold text-[#3b3a4a] leading-relaxed">
        {question}
      </p>

    </div>
  );
};

export default QuestionCard;