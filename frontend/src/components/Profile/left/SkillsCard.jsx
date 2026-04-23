import { motion, AnimatePresence } from "framer-motion";

const SkillsCard = ({ user, onDelete }) => {
    return (
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-xl min-h-[260px] flex flex-col">

            <h3 className="text-lg font-extrabold text-[#3b3a4a] mb-5">
                Technical Stack
            </h3>

            <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[140px] pr-2">
                <AnimatePresence>
                    {user.skills?.map((skill) => (
                        <motion.span
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${
                                skill.level === "Advanced"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : skill.level === "Intermediate"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-700"
                            }`}
                        >
                            {skill.name}

                            <button
                                onClick={() => onDelete(skill.name)}
                                className="hover:text-slate-900 opacity-40 group-hover:opacity-100 transition-opacity"
                            >
                                ✕
                            </button>
                        </motion.span>
                    ))}
                </AnimatePresence>

                {(!user.skills || user.skills.length === 0) && (
                    <p className="text-xs text-slate-400 italic">
                        No skills added yet
                    </p>
                )}
            </div>

        </div>
    );
};

export default SkillsCard;