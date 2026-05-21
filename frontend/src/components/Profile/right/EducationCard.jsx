const EducationCard = ({ education }) => {
    return (
        <div className="bg-gradient-to-br from-[#d9d4ff]/40 to-[#ffecde]/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl min-h-[260px] flex flex-col">

            <h3 className="text-lg font-extrabold text-[#3b3a4a] mb-4">
                Education
            </h3>


            <div className="space-y-3">
                {education && education.length > 0 ? (
                    education.map((edu, i) => (
                        <div key={i} className="p-4 bg-white/60 rounded-2xl border">
                            <p className="font-bold text-sm text-[#3b3a4a]">
                                {edu.college}
                            </p>
                            <p className="text-xs text-slate-500">
                                {edu.degree}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-slate-400 italic">
                        No education added
                    </p>
                )}
            </div>

        </div>
    );
};

export default EducationCard;