const AIInsightsCard = ({ evaluatedSkills }) => {
    return (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl">

            <h3 className="text-lg font-extrabold text-[#3b3a4a] mb-4">
                AI Insights
            </h3>

            <div className="flex flex-wrap gap-2">
                {evaluatedSkills?.length > 0 ? (
                    evaluatedSkills.map((skill, i) => (
                        <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                                skill.level === "Beginner"
                                    ? "bg-rose-100 text-rose-700"
                                    : skill.level === "Intermediate"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-emerald-100 text-emerald-700"
                            }`}
                        >
                            {skill.name} ({skill.level})
                        </span>
                    ))
                ) : (
                    <p className="text-xs text-slate-400 italic">
                        Take a test to generate AI skill evaluation
                    </p>
                )}
            </div>

        </div>
    );
};

export default AIInsightsCard;